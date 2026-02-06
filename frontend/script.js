async function sendChatMessage() {
    const inputField = document.getElementById('user-input');
    const display = document.getElementById('chat-display');
    const message = inputField.value;

    if (!message) return;

    // Add user message to UI
    display.innerHTML += `<p style="color: #00d2ff"><b>You:</b> ${message}</p>`;
    inputField.value = '';

    try {
        // CHANGED: Removed "http://127.0.0.1:8000" prefix.
        // Now it works on both localhost and Render automatically.
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        // Add bot message to UI
        if (data.response) {
            display.innerHTML += `<p><b>AI:</b> ${data.response}</p>`;
        } else {
             display.innerHTML += `<p style="color: red">Error: ${JSON.stringify(data)}</p>`;
        }
        display.scrollTop = display.scrollHeight;
    } catch (error) {
        display.innerHTML += `<p style="color: red">Error: Could not connect to backend.</p>`;
        console.error(error);
    }
}