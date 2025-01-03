from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from .azure_services import assess_pronunciation

bp = Blueprint('main', __name__)

@bp.route('/api/assess', methods=['POST', 'OPTIONS'])
@cross_origin()
def assess_audio():
    # Handle preflight request
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    reference_text = request.form.get('text')
    
    try:
        score = assess_pronunciation(audio_file, reference_text)
        response = jsonify({'score': score})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@bp.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response
