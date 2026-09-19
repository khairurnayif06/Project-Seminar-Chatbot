const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");


let conversation = [];

function appendMessage(role, text) {
  const msgEl = document.createElement("div");
  msgEl.className = `message ${role}`;
  msgEl.textContent = text;
  chatBox.appendChild(msgEl);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msgEl;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  conversation.push({ role: "user", text: userMessage });
  input.value = "";

  const thinkingEl = appendMessage("bot", "Gemini is thinking...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation }),
    });

    const data = await response.json();

    if (data && data.result) {
      thinkingEl.textContent = data.result;
      conversation.push({ role: "model", text: data.result });
    } else {
      thinkingEl.textContent = "Sorry, no response received.";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    thinkingEl.textContent = "Failed to get response from server.";
  }
});
