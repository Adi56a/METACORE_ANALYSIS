from app.models.admin_user import db  # ✅ Shared db instance
from datetime import datetime

class Patient(db.Model):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.Enum('Male', 'Female', 'Other', name='gender_enum'), nullable=False)
    mobile = db.Column(db.String(15), nullable=False)
    address = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(100))
    visit_date = db.Column(db.Date, nullable=False)
    referred_by = db.Column(db.String(100), nullable=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
