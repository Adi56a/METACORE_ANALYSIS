from app import db
from datetime import datetime

class Test(db.Model):
    __tablename__ = 'tests'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50))
    price = db.Column(db.Numeric(10, 2), nullable=False)
    sample_required = db.Column(db.String(100))
    normal_range = db.Column(db.String(100))
    unit = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    patient_tests = db.relationship('PatientTest', backref='test', cascade='all, delete')
    invoice_tests = db.relationship('InvoiceTest', backref='test', cascade='all, delete')
