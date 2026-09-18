import mysql.connector


def get_db_connection():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="InterviewMate@123",
        database="interview_mate"
    )

    return db