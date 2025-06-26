from flask import Flask, request, send_from_directory
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

limiter = Limiter(
    key_func=get_remote_address,
    storage_uri="redis://localhost:6379"
)
limiter.init_app(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/report', methods=['POST'])
@limiter.limit("1 per 30 minutes")
def report():
    data = request.form
    print("Received form data:")
    print("Name:", data.get('name'))
    print("Email:", data.get('email'))
    print("Software:", data.get('software'))
    print("Description:", data.get('description'))
    return 'Bug report received', 200

if __name__ == '__main__':
    # For local testing only, not production
    app.run(host='0.0.0.0', port=5000, debug=False)