const johnSelectorBtn = document.querySelector("#john-selector");
const janeSelectorBtn = document.querySelector("#jane-selector");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");

const messages = JSON.parse(localStorage.getItem("messages1")) || [];

const createChatMessageElement = (message) => `
<div class="message ${message.sender === "John" ? "blue-bg" : "gray-bg"}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
</div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
};

let messageSender = "John";
const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.textContent = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}`;

  if (name === "John") {
    johnSelectorBtn.classList.add("active-person");
    janeSelectorBtn.classList.remove("active-person");
  }
  if (name === "Jane") {
    janeSelectorBtn.classList.add("active-person");
    johnSelectorBtn.classList.remove("active-person");
  }

  chatInput.focus();
};

johnSelectorBtn.addEventListener("click", () => updateMessageSender("John"));
janeSelectorBtn.addEventListener("click", () => updateMessageSender("Jane"));

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  messages.push(message);
  localStorage.setItem("messages1", JSON.stringify(messages));
  chatMessages.innerHTML += createChatMessageElement(message);
  chatInputForm.reset();
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener("submit", sendMessage);

clearChatBtn.addEventListener('click',()=>{
  localStorage.clear()
  chatMessages.innerHTML=''
})
