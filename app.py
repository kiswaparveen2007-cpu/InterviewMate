from flask import Flask, request, jsonify
from database import get_db_connection

app = Flask(__name__)


@app.route("/")
def home():
    return "Interview Mate Backend is Running!"


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        db.close()

        return jsonify({
            "message": "Email already registered"
        }), 409

    cursor.execute(
        """
        INSERT INTO users (name, email, password)
        VALUES (%s, %s, %s)
        """,
        (name, email, password)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Registration successful"
    }), 201


if __name__ == "__main__":
    app.run(debug=True)