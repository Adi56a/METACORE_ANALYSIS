from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class AdminUser(db.Model):
    __tablename__ = 'admin_user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def seed_admin():
        if not AdminUser.query.filter_by(email="admin@gmail.com").first():
            admin = AdminUser(
                email="admin@gmail.com",
                password_hash=generate_password_hash("admin")
            )
            db.session.add(admin)
            db.session.commit()
