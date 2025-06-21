let ws = new WebSocket("ws://localhost:8765")
// MAKE SURE YOU REFRESH AND FORCE ALL ASSETS TO RELOAD, WITH CTRL+SHIFT+R
// Otherwise the browser loads a cached version, which will be incorrect
// Use onopen to ensure the Websocket is open BEFORE you connect to it.

const form = document.getElementById('login-form');
form.addEventListener('submit', sendLogin)

function sendLogin(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username');
    if (!username) return;


    localStorage.setItem("login_username", username)

    window.location.href = "chatroom.html"
}