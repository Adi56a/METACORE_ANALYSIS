from app import db

class InvoiceTest(db.Model):
    __tablename__ = 'invoice_tests'
    id = db.Column(db.Integer, primary_key=True)
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoices.id', ondelete='CASCADE'))
    test_id = db.Column(db.Integer, db.ForeignKey('tests.id'))
    test_price = db.Column(db.Numeric(10, 2))
