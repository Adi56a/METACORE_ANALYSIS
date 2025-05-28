from flask import Blueprint, jsonify

patient_bp = Blueprint("patients", __name__)

@patient_bp.route("/", methods=["GET"])
def get_patients():
    return jsonify({"message": "List of patients"})
