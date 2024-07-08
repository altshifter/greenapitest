from flask import Flask, request, jsonify, render_template
from whatsapp_api_client_python import API
from urllib.parse import urlparse

app = Flask(__name__)

def get_green_api(data):
    id_instance = data['idInstance']
    api_token_instance = data['apiTokenInstance']
    return API.GreenAPI(id_instance, api_token_instance)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_settings', methods=['POST'])
def get_settings():
    green_api = get_green_api(request.json)
    response = green_api.account.getSettings()
    return jsonify(response.data)

@app.route('/get_state_instance', methods=['POST'])
def get_state_instance():
    green_api = get_green_api(request.json)
    response = green_api.account.getStateInstance()
    return jsonify(response.data)

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    green_api = get_green_api(data)
    phone_number = data['phoneNumber']
    message = data['message']
    response = green_api.sending.sendMessage(f'{phone_number}@c.us', message)
    return jsonify(response.data)

@app.route('/send_file_by_url', methods=['POST'])
def send_file_by_url():
    data = request.json
    green_api = get_green_api(data)
    phone_number = data['phoneNumber']
    file_url = data['fileUrl']
    file_name = urlparse(file_url).path.split('/')[-1]  # Извлечение имени файла из URL
    response = green_api.sending.sendFileByUrl(f'{phone_number}@c.us', file_url, file_name)
    return jsonify(response.data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)