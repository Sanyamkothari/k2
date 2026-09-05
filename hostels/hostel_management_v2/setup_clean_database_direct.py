"""
Clean Database Setup Script for Production Deployment (Direct Connection)
- Drops existing tables (if any)
- Creates fresh database schema
- Adds initial user accounts
"""
import os
import psycopg2
from datetime import datetime
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv

# Load environment variables
load_dotenv(override=True)

def get_direct_db_connection():
    """Get direct database connection without Flask context"""
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("❌ DATABASE_URL not found in environment variables")
        return None
    
    try:
        conn = psycopg2.connect(database_url)
        return conn
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return None

def clean_database():
    """Drop all existing tables for a fresh start"""
    
    conn = get_direct_db_connection()
    if not conn:
        print("❌ Could not connect to database")
        return False
    
    cursor = conn.cursor()
    
    try:
        # List of tables to drop (in reverse dependency order)
        tables_to_drop = [
            'fee_payments',
            'fees', 
            'expenses',
            'complaints',
            'students',
            'rooms',
            'hostels',
            'users'
        ]
        
        print("🧹 Cleaning existing database tables...")
        
        for table in tables_to_drop:
            try:
                cursor.execute(f'DROP TABLE IF EXISTS {table} CASCADE')
                print(f"  ✅ Dropped table: {table}")
            except Exception as e:
                print(f"  ⚠️  Could not drop {table}: {e}")
        
        conn.commit()
        print("✅ Database cleaned successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error cleaning database: {e}")
        conn.rollback()
        return False
    
    finally:
        cursor.close()
        conn.close()

def initialize_fresh_database():
    """Initialize database with fresh schema"""
    
    print("🗄️  Initializing fresh database schema...")
    
    conn = get_direct_db_connection()
    if not conn:
        print("❌ Could not connect to database")
        return False
    
    cursor = conn.cursor()
    
    try:
        # Create users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(80) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name VARCHAR(200) NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT 'staff',
                email VARCHAR(120),
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE,
                last_login TIMESTAMP,
                failed_login_attempts INTEGER DEFAULT 0,
                locked_until TIMESTAMP
            )
        ''')
        print("  ✅ Created users table")
        
        # Create hostels table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS hostels (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                address TEXT,
                phone VARCHAR(20),
                email VARCHAR(120),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE
            )
        ''')
        print("  ✅ Created hostels table")
        
        # Create rooms table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS rooms (
                id SERIAL PRIMARY KEY,
                hostel_id INTEGER REFERENCES hostels(id) ON DELETE CASCADE,
                room_number VARCHAR(20) NOT NULL,
                room_type VARCHAR(50),
                capacity INTEGER DEFAULT 1,
                rent_amount DECIMAL(10,2),
                deposit_amount DECIMAL(10,2),
                floor_number INTEGER,
                amenities TEXT,
                is_available BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(hostel_id, room_number)
            )
        ''')
        print("  ✅ Created rooms table")
        
        # Create students table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS students (
                id SERIAL PRIMARY KEY,
                hostel_id INTEGER REFERENCES hostels(id) ON DELETE CASCADE,
                room_id INTEGER REFERENCES rooms(id) ON DELETE SET NULL,
                name VARCHAR(200) NOT NULL,
                father_name VARCHAR(200),
                mother_name VARCHAR(200),
                phone VARCHAR(20),
                emergency_contact VARCHAR(20),
                email VARCHAR(120),
                address TEXT,
                college_name VARCHAR(200),
                course VARCHAR(100),
                year_of_study INTEGER,
                admission_date DATE,
                checkout_date DATE,
                id_proof_type VARCHAR(50),
                id_proof_number VARCHAR(100),
                monthly_rent DECIMAL(10,2),
                security_deposit DECIMAL(10,2),
                deposit_paid DECIMAL(10,2) DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        print("  ✅ Created students table")
        
        # Create expenses table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS expenses (
                id SERIAL PRIMARY KEY,
                hostel_id INTEGER REFERENCES hostels(id) ON DELETE CASCADE,
                category VARCHAR(100) NOT NULL,
                description TEXT,
                amount DECIMAL(10,2) NOT NULL,
                expense_date DATE NOT NULL,
                payment_method VARCHAR(50),
                receipt_number VARCHAR(100),
                created_by INTEGER REFERENCES users(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        print("  ✅ Created expenses table")
        
        # Create complaints table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS complaints (
                id SERIAL PRIMARY KEY,
                hostel_id INTEGER REFERENCES hostels(id) ON DELETE CASCADE,
                student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                category VARCHAR(100),
                priority VARCHAR(20) DEFAULT 'medium',
                status VARCHAR(50) DEFAULT 'pending',
                submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                resolved_date TIMESTAMP,
                resolved_by INTEGER REFERENCES users(id),
                resolution_notes TEXT
            )
        ''')
        print("  ✅ Created complaints table")
        
        # Create fees table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS fees (
                id SERIAL PRIMARY KEY,
                student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
                hostel_id INTEGER REFERENCES hostels(id) ON DELETE CASCADE,
                fee_type VARCHAR(100) NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                due_date DATE NOT NULL,
                month_year VARCHAR(20),
                description TEXT,
                is_paid BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        print("  ✅ Created fees table")
        
        # Create fee_payments table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS fee_payments (
                id SERIAL PRIMARY KEY,
                fee_id INTEGER REFERENCES fees(id) ON DELETE CASCADE,
                student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
                amount_paid DECIMAL(10,2) NOT NULL,
                payment_date DATE NOT NULL,
                payment_method VARCHAR(50),
                transaction_id VARCHAR(100),
                receipt_number VARCHAR(100),
                notes TEXT,
                created_by INTEGER REFERENCES users(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        print("  ✅ Created fee_payments table")
        
        conn.commit()
        print("✅ Database schema created successfully")
        return True
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        conn.rollback()
        return False
    
    finally:
        cursor.close()
        conn.close()

def create_initial_users():
    """Create initial user accounts for owner and managers"""
    
    # User data for initial setup
    users = [
        {
            'username': 'owner',
            'password': 'owner123',  # Change this after first login!
            'name': 'Hostel Owner - K2 Architects',
            'role': 'owner',
            'email': 'owner@k2architects.co.in'
        },
        {
            'username': 'manager1',
            'password': 'manager123',  # Change this after first login!
            'name': 'Manager One',
            'role': 'manager',
            'email': 'manager1@k2architects.co.in'
        },
        {
            'username': 'manager2',
            'password': 'manager123',  # Change this after first login!
            'name': 'Manager Two',
            'role': 'manager',
            'email': 'manager2@k2architects.co.in'
        },
        {
            'username': 'manager3',
            'password': 'manager123',  # Change this after first login!
            'name': 'Manager Three',
            'role': 'manager',
            'email': 'manager3@k2architects.co.in'
        }
    ]
    
    conn = get_direct_db_connection()
    if not conn:
        print("❌ Could not connect to database")
        return False
    
    cursor = conn.cursor()
    
    try:
        print("👥 Creating initial user accounts...")
        
        for user in users:
            # Check if user already exists
            cursor.execute('SELECT id FROM users WHERE username = %s', (user['username'],))
            if cursor.fetchone():
                print(f"  ⚠️  User {user['username']} already exists, skipping...")
                continue
            
            # Hash the password
            hashed_password = generate_password_hash(user['password'])
            
            # Insert user
            cursor.execute('''
                INSERT INTO users (username, password_hash, name, role, email, created_at, is_active)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            ''', (
                user['username'],
                hashed_password,
                user['name'],
                user['role'],
                user['email'],
                datetime.now().isoformat(),
                True
            ))
            
            print(f"  ✅ Created user: {user['username']} ({user['role']})")
        
        conn.commit()
        print("\n🎉 Initial users created successfully!")
        print("\n📋 Login Credentials:")
        print("=" * 50)
        for user in users:
            print(f"Username: {user['username']}")
            print(f"Password: {user['password']}")
            print(f"Role: {user['role']}")
            print("-" * 25)
        
        print("\n⚠️  IMPORTANT: Change these passwords after first login!")
        print("🌐 Access URL: https://hostel.k2architects.co.in")
        return True
        
    except Exception as e:
        print(f"❌ Error creating users: {e}")
        conn.rollback()
        return False
    
    finally:
        cursor.close()
        conn.close()

def setup_production_database():
    """Complete database setup for production"""
    
    print("🚀 Setting up production database for hostel.k2architects.co.in")
    print("=" * 60)
    
    # Step 1: Clean existing data
    if not clean_database():
        print("❌ Failed to clean database")
        return False
    
    # Step 2: Initialize fresh schema
    if not initialize_fresh_database():
        print("❌ Failed to initialize database")
        return False
    
    # Step 3: Create users
    if not create_initial_users():
        print("❌ Failed to create users")
        return False
    
    print("\n" + "=" * 60)
    print("🎉 Production database setup complete!")
    print("✅ Ready for deployment at https://hostel.k2architects.co.in")
    return True

if __name__ == "__main__":
    print("🗄️  Production Database Setup for K2 Architects Hostel Management")
    print("This will create a fresh, clean database with initial users.")
    
    # Confirm before proceeding
    confirm = input("\nProceed with fresh database setup? (y/N): ").lower().strip()
    
    if confirm == 'y':
        success = setup_production_database()
        
        if success:
            print("\n✅ Setup complete! You can now deploy the application.")
        else:
            print("\n❌ Setup failed. Please check your database configuration.")
    else:
        print("❌ Setup cancelled.")
