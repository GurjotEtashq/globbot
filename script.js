function toggleChat() {

    const chatPopup =
        document.getElementById("chatPopup");

    if (
        chatPopup.style.display === "flex"
    ) {

        chatPopup.style.display = "none";

    } else {

        chatPopup.style.display = "flex";
    }
}

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const message =
        input.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user");

    input.value = "";

    /*
    =====================================
    TEMPORARY BOT RESPONSE
    =====================================
    */

    setTimeout(() => {

        addMessage(
            "Thanks for contacting Globbot Support. Salesforce Agentforce integration will be connected next.",
            "bot"
        );

    }, 1000);
}

function addMessage(text, sender) {

    const chatMessages =
        document.getElementById("chatMessages");

    const messageDiv =
        document.createElement("div");

    if (sender === "user") {

        messageDiv.classList.add("user-message");

    } else {

        messageDiv.classList.add("bot-message");
    }

    messageDiv.innerHTML = text;

    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}

/* ENTER KEY SUPPORT */

document
    .getElementById("userInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            sendMessage();
        }
});
