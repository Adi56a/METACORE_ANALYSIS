from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config
from app.models.admin_user import db, AdminUser
from datetime import datetime


app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

# ✅ Allow all origins or just frontend port (5173)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Create tables and seed admin
with app.app_context():
    db.create_all()
    AdminUser.seed_admin()

@app.route("/")
def home():
    return "Welcome to Pathology Lab API"

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400

    user = AdminUser.query.filter_by(email=email).first()

    if user and user.check_password(password):
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401
    



if __name__ == "__main__":
    app.run(debug=True)
