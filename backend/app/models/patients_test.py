from app import db

class PatientTest(db.Model):
    __tablename__ = 'patient_tests'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id', ondelete='CASCADE'))
    test_id = db.Column(db.Integer, db.ForeignKey('tests.id', ondelete='CASCADE'))
    test_date = db.Column(db.Date, nullable=False)
    result_value = db.Column(db.String(100))
    report_file = db.Column(db.String(255))
