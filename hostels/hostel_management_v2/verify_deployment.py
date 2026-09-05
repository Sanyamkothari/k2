"""
Production Deployment Verification Script
Tests all critical components before going live
"""
import os
import sys
import requests
from datetime import datetime

def test_database_connection():
    """Test database connectivity"""
    try:
        from db_utils import get_db_connection
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(*) FROM users')
            result = cursor.fetchone()
            count = result[0] if result else 0
            cursor.close()
            conn.close()
            print(f"✅ Database: Connected successfully ({count} users)")
            return True
        else:
            print("❌ Database: Connection failed")
            return False
    except Exception as e:
        print(f"❌ Database: Error - {e}")
        return False

def test_redis_connection():
    """Test Redis connectivity"""
    try:
        import redis
        redis_url = os.environ.get('REDIS_URL')
        if not redis_url:
            print("⚠️  Redis: No REDIS_URL configured")
            return False
        
        r = redis.from_url(redis_url)
        r.ping()
        print("✅ Redis: Connected successfully")
        return True
    except Exception as e:
        print(f"❌ Redis: Error - {e}")
        return False

def test_environment_variables():
    """Test critical environment variables"""
    required_vars = [
        'FLASK_ENV',
        'SECRET_KEY', 
        'DATABASE_URL',
        'DOMAIN_NAME'
    ]
    
    missing = []
    for var in required_vars:
        if not os.environ.get(var):
            missing.append(var)
    
    if missing:
        print(f"❌ Environment: Missing variables: {', '.join(missing)}")
        return False
    else:
        print("✅ Environment: All variables configured")
        return True

def test_application_import():
    """Test application can be imported without errors"""
    try:
        from app import app, socketio
        print("✅ Application: Imports successfully")
        return True
    except Exception as e:
        print(f"❌ Application: Import error - {e}")
        return False

def test_health_endpoint(domain=None):
    """Test health endpoint if domain is provided"""
    if not domain:
        print("⚠️  Health endpoint: No domain provided, skipping")
        return True
    
    try:
        url = f"https://{domain}/health"
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            print(f"✅ Health endpoint: {url} responding")
            return True
        else:
            print(f"❌ Health endpoint: {url} returned {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health endpoint: Error - {e}")
        return False

def run_all_tests():
    """Run all verification tests"""
    print("🔍 Running deployment verification tests...")
    print("=" * 50)
    
    # Load environment
    from dotenv import load_dotenv
    load_dotenv()
    
    # Set production environment
    os.environ['FLASK_ENV'] = 'production'
    
    tests = [
        test_environment_variables,
        test_application_import,
        test_database_connection,
        test_redis_connection,
    ]
    
    results = []
    for test in tests:
        results.append(test())
    
    # Test health endpoint if domain is available
    domain = os.environ.get('DOMAIN_NAME')
    if domain:
        results.append(test_health_endpoint(domain))
    
    print("=" * 50)
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print(f"🎉 All tests passed! ({passed}/{total})")
        print("✅ Your application is ready for production!")
        return True
    else:
        print(f"⚠️  {passed}/{total} tests passed")
        print("❌ Please fix the failing tests before deployment")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
