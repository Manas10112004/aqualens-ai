async function sendChatMessage() {
    const inputField = document.getElementById('user-input');
    const display = document.getElementById('chat-display');
    const message = inputField.value;

    if (!message) return;

    // Add user message to UI
    display.innerHTML += `<p style="color: #00d2ff"><b>You:</b> ${message}</p>`;
    inputField.value = '';

    try {
        const response = await fetch('http://127.0.0.1:8000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        // Add bot message to UI
        display.innerHTML += `<p><b>AI:</b> ${data.response}</p>`;
        display.scrollTop = display.scrollHeight;
    } catch (error) {
        display.innerHTML += `<p style="color: red">Error: Could not connect to backend.</p>`;
    }
}