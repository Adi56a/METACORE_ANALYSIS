from app.models.admin_user import db
from datetime import datetime
import uuid

class LabTest(db.Model):
    __tablename__ = 'lab_tests'

    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.String(50), unique=True, nullable=False, default=lambda: f"TEST-{uuid.uuid4().hex[:8].upper()}")
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Optional: if you want backref to patient tests
    patient_tests_assoc = db.relationship('PatientLabTest', back_populates='lab_test', lazy='dynamic')
