const msgBox = document.getElementById("messages");
const input = document.getElementById("userInput");
const send = document.getElementById("sendBtn");

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerText = text;
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "me");
    input.value = "";

    addMessage("Typing...", "bot"); // loading feel

    const all = msgBox.querySelectorAll(".bot");
    const loader = all[all.length - 1];

    try {
        // Send to backend server
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();
        loader.remove();
        addMessage(data.reply, "bot");

    } catch (err) {
        loader.remove();
        addMessage("Error connecting to server.", "bot");
    }
}

send.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});
