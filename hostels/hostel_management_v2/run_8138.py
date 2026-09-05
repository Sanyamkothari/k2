import os
os.environ.setdefault("FLASK_ENV", "development")
from app import socketio, app

if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=8138, debug=True, allow_unsafe_werkzeug=True)
