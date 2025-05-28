from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS only for frontend at localhost:3000
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Simple test route
@app.route("/")
def home():
    return "Welcome to Pathology Lab API"

# Patients route
@app.route("/api/patients", methods=["GET"])
def get_patients():
    return jsonify([
        {"id": 1, "name": "John Doe", "test": "Blood Test"},
        {"id": 2, "name": "Jane Smith", "test": "Urine Test"}
    ])

if __name__ == "__main__":
    app.run(debug=True)
