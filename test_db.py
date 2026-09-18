from database import get_db_connection

db = get_db_connection()

if db.is_connected():
    print("MySQL connection successful!")

db.close()