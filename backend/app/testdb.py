# test_db.py
from app.database import engine

try:
    # Try to connect
    conn = engine.connect()
    print("✅ Database connection successful!")
    conn.close()
except Exception as e:
    print("❌ Database connection failed!")
    print(e)
