from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # ✅ Import from app.routes - must match folder name
    from app.routes import patient_routes
    app.register_blueprint(patient_routes.patient_bp, url_prefix="/api/patients")

    return app
