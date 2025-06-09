from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from app.models.admin_user import db, AdminUser
from app.models.patient import Patient
from app.models.lab_tests import LabTest

from datetime import datetime


app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

# ✅ Allow CORS for frontend
CORS(app, supports_credentials=True, origins=["http://localhost:5174","http://localhost:5173"])

# ✅ Create all tables (admin_user + patients) and seed admin
with app.app_context():
    db.create_all()
    print("✅ Tables created:", list(db.metadata.tables.keys()))  # Debug
    AdminUser.seed_admin()

# ✅ Home route
@app.route("/")
def home():
    return "Welcome to Pathology Lab API"

# ✅ Login route
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

# ✅ Add Patient route
@app.route("/api/add-patient", methods=["POST"])
def add_patient():
    try:
        data = request.get_json()

        new_patient = Patient(
            name=data['name'],
            age=int(data['age']),
            gender=data['gender'],
            mobile=data['mobile'],
            address=data['address'],
            email=data.get('email'),
            visit_date=datetime.strptime(data['visitDate'], '%Y-%m-%d').date(),
            referred_by=data['referredBy'],
            notes=data.get('notes')
        )

        db.session.add(new_patient)
        db.session.commit()

        return jsonify({"success": True, "message": "Patient added successfully"}), 201

    except Exception as e:
        print(f"❌ Error adding patient: {e}")
        return jsonify({"success": False, "message": str(e)}), 500
    

@app.route("/api/view-patients", methods=["GET"])
def view_patients():
    name = request.args.get("name")
    mobile = request.args.get("mobile")

    query = Patient.query

    if name:
        query = query.filter(Patient.name.ilike(f"%{name}%"))
    if mobile:
        query = query.filter(Patient.mobile.ilike(f"%{mobile}%"))

    patients = query.order_by(Patient.created_at.desc()).all()

    result = []
    for patient in patients:
        result.append({
            "id": patient.id,
            "name": patient.name,
            "age": patient.age,
            "gender": patient.gender,
            "mobile": patient.mobile,
            "address": patient.address,
            "email": patient.email,
            "visitDate": patient.visit_date.strftime("%Y-%m-%d"),
            "referredBy": patient.referred_by,
            "notes": patient.notes,
            "createdAt": patient.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify({"success": True, "patients": result}), 200


@app.route("/api/add-test", methods=["POST"])
def add_test():
    try:
        data = request.get_json()
        name = data.get("name")
        price = data.get("price")

        if not name or not price:
            return jsonify({"success": False, "message": "Test name and price are required"}), 400

        new_test = LabTest(name=name, price=price)
        db.session.add(new_test)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Lab test created successfully",
            "test": {
                "test_id": new_test.test_id,
                "name": new_test.name,
                "price": float(new_test.price)
            }
        }), 201

    except Exception as e:
        print(f"❌ Error adding test: {e}")
        return jsonify({"success": False, "message": str(e)}), 500

    

@app.route("/api/view-tests", methods=["GET"])
def view_tests():
    try:
        tests = LabTest.query.order_by(LabTest.id.desc()).all()
        return jsonify({
            "success": True,
            "tests": [
                {
                    "test_id": test.id,
                    "name": test.name,
                    "price": float(test.price)
                } for test in tests
            ]
        }), 200
    except Exception as e:
        print(f"❌ Error fetching lab tests: {e}")
        return jsonify({"success": False, "message": str(e)}), 500
    
@app.route("/api/patient/<int:patient_id>", methods=["GET"])
def get_patient_detail(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    return jsonify({
        "success": True,
        "patient": {
            "id": patient.id,
            "name": patient.name,
            "age": patient.age,
            "gender": patient.gender,
            "mobile": patient.mobile,
            "address": patient.address,
            "email": patient.email,
            "visitDate": patient.visit_date.strftime("%Y-%m-%d"),
            "referredBy": patient.referred_by,
            "notes": patient.notes,
            "createdAt": patient.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
    })




if __name__ == "__main__":
    app.run(debug=True)
