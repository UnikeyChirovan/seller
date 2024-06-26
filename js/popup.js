let socket;
let userName;
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatbox");
const toggleChatButton = document.getElementById("toggleChat");
const minimizeChatButton = document.getElementById("minimizeChat");
const nameInputArea = document.getElementById("nameInputArea");
const inputArea = document.getElementById("inputArea");

function startChat() {
  userName = document.getElementById("nameInput").value;
  if (!userName) {
    alert("Please enter your name");
    return;
  }
  nameInputArea.style.display = "none";
  inputArea.style.display = "flex";
  connectWebSocket();
}

function connectWebSocket() {
  // socket = new WebSocket(`ws://localhost:8080?role=seller&name=${userName}`);
  socket = new WebSocket(
    `ws://https://hephucvu-71af3553bec0.herokuapp.com?role=seller&name=${userName}`
  );

  socket.onopen = () => {
    console.log("Connected to the WebSocket server as seller");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "history") {
      data.data.forEach((msgData) => {
        displayMessage(msgData.name, msgData.message, msgData.timestamp);
      });
    } else if (data.type === "message") {
      displayMessage(data.data.name, data.data.message, data.data.timestamp);
    } else if (data.type === "notification") {
      displayNotification(data.data);
    }
  };

  socket.onclose = () => {
    console.log("Disconnected from the WebSocket server");
  };

  socket.onerror = (error) => {
    console.log("WebSocket Error:", error);
  };
}

function sendMessage() {
  const message = messageInput.value;
  if (!message) return;
  const timestamp = new Date().toISOString();
  const messageData = JSON.stringify({
    name: userName,
    message,
    timestamp,
  });
  socket.send(messageData);
  messageInput.value = "";
}

function displayMessage(name, message, timestamp) {
  const messageElem = document.createElement("div");
  messageElem.textContent = `${name}: ${message}`;
  messageElem.classList.add("message");
  messageElem.classList.add(name === userName ? "sender" : "receiver");

  // Định dạng thời gian theo múi giờ Việt Nam và chỉ hiển thị ngày tháng và giờ phút
  const date = new Date(timestamp);
  const options = {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedTimestamp = new Intl.DateTimeFormat("vi-VN", options).format(
    date
  );

  const timestampElem = document.createElement("div");
  timestampElem.textContent = formattedTimestamp;
  timestampElem.classList.add("timestamp");

  messageElem.appendChild(timestampElem);
  messagesDiv.appendChild(messageElem);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Thêm sự kiện click để hiển thị/ẩn thời gian gửi
  messageElem.addEventListener("click", () => {
    const isTimestampVisible = timestampElem.style.display === "block";
    timestampElem.style.display = isTimestampVisible ? "none" : "block";
  });
}

function displayNotification(notification) {
  const notificationElem = document.createElement("div");
  notificationElem.textContent = notification;
  notificationElem.classList.add("message", "notification");
  messagesDiv.appendChild(notificationElem);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function toggleChatbox() {
  chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
  toggleChatButton.style.display =
    chatBox.style.display === "none" ? "flex" : "none";
  minimizeChatButton.classList.remove("active");
}

function minimizeChatbox() {
  chatBox.style.display = "none";
  toggleChatButton.style.display = "flex";
  minimizeChatButton.classList.add("active");
}

messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
