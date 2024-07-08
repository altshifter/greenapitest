function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

async function apiRequest(endpoint, data) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
    document.getElementById('responseOutput').innerText = JSON.stringify(responseData, null, 2);
}

async function getSettings() {
    const data = {
        idInstance: sanitizeInput(document.getElementById('idInstance').value),
        apiTokenInstance: sanitizeInput(document.getElementById('apiTokenInstance').value)
    };
    await apiRequest('/get_settings', data);
}

async function getStateInstance() {
    const data = {
        idInstance: sanitizeInput(document.getElementById('idInstance').value),
        apiTokenInstance: sanitizeInput(document.getElementById('apiTokenInstance').value)
    };
    await apiRequest('/get_state_instance', data);
}

async function sendMessage() {
    const data = {
        idInstance: sanitizeInput(document.getElementById('idInstance').value),
        apiTokenInstance: sanitizeInput(document.getElementById('apiTokenInstance').value),
        phoneNumber: sanitizeInput(document.getElementById('phoneNumber').value),
        message: sanitizeInput(document.getElementById('message').value)
    };
    await apiRequest('/send_message', data);
}

async function sendFileByUrl() {
    const data = {
        idInstance: sanitizeInput(document.getElementById('idInstance').value),
        apiTokenInstance: sanitizeInput(document.getElementById('apiTokenInstance').value),
        phoneNumber: sanitizeInput(document.getElementById('phoneNumberFile').value),
        fileUrl: sanitizeInput(document.getElementById('fileUrl').value)
    };
    await apiRequest('/send_file_by_url', data);
}