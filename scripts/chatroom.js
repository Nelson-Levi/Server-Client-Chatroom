const username = localStorage.getItem("login_username");
const fileInput = document.querySelector("input[type=file]");
fileInput.addEventListener("change", handleFile);
const form = document.getElementById("input-form");
form.addEventListener("submit", sendMessage);

let ws = new WebSocket("ws://localhost:8765");

if (!username) {
  alert("No username set. Redirecting to login.");
  window.location.href = "index.html";
}

// MAKE SURE YOU REFRESH AND FORCE ALL ASSETS TO RELOAD, WITH CTRL+SHIFT+R
// Otherwise the browser loads a cached version, which will be incorrect
// Use onopen to ensure the Websocket is open BEFORE you connect to it.

ws.onopen = () => {
  ws.send(`USER|${username}`);
};

// Receive incoming messages from server
ws.onmessage = (event) => {
  console.log("Message from server:", event.data);
  let message = event.data;
  receiveMessage(message);
};
ws.onerror = (e) => {
  console.error("Websocket error", e);
};
ws.onclose = (e) => {
  console.log("Websocket closed", e);
};

function sendMessage(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const message = formData.get("message");
  if (message.length === 0) {
    return;
  } else {
    ws.send(`MSG|${message}`);
  }
  // This clears the input field after the message is sent
  form.querySelector('input[name="message"]').value = "";
}

function handleFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  // On file load, the reader will create a base 64 string for the image. Then it will send it to the server.
  reader.addEventListener(
    "load",
    () => {
      const base64String = reader.result;
      ws.send(`IMG|${base64String}`);
    },
    false
  );

  // If a file exists, we activate the reader.
  if (file) {
    reader.readAsDataURL(file);
  }
}

function receiveMessage(message) {
const messagesElement = document.querySelector("#messages-container");
  // If the message received is an IMG, we isolate the base64 string from the "IMG|" prefix. Then we make that base64 string the src for a new HTML <img> element.
  if (message.startsWith("IMG|")) {
    const splitMessage = message.split("|");
    const messagesElement = document.querySelector("#messages-container");
    const newFigure = document.createElement("figure");
    const newFigcaption = document.createElement("figcaption");
    const imgSender = splitMessage[1];
    newFigcaption.innerText = `${imgSender}:`;
    const newImg = document.createElement("img");
    newImg.src = splitMessage[2];
    console.log(splitMessage[2]);
    if (imgSender == username) {
      newFigure.classList.add("userMessage");
    } else {
      newFigure.classList.add("message");
    }
    messagesElement.appendChild(newFigure);
    newFigure.appendChild(newFigcaption);
    newFigure.appendChild(newImg);
  }
  // If it isn't an image, we place the message in a new HTML <p> element.
  else if (message.startsWith(`${username}: `)) {
    createPElement(message, "userMessage");
  } else {
    createPElement(message, "message");
  }
  messagesElement.scrollTop = messagesElement.scrollHeight;
}

function createPElement(message, cssClass) {
  const messagesElement = document.querySelector("#messages-container");
  const newP = document.createElement("p");
  newP.classList.add(cssClass);
  newP.textContent = message;
  messagesElement.appendChild(newP);
}
