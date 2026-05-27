async function sendMessage() {

    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user");

    input.value = "";

    try {

        /*
        ======================================
        REPLACE THIS URL WITH SALESFORCE URL
        ======================================
        */

        const response = await fetch("YOUR_AGENTFORCE_ENDPOINT", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",

                /*
                NEVER expose real token publicly.
                Use OAuth or Embedded Messaging later.
                */

                "Authorization": "Bearer YOUR_ACCESS_TOKEN"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        addMessage(data.reply || "No response received", "bot");

    } catch (error) {

        console.error(error);

        addMessage(
            "Unable to connect to Salesforce Agentforce.",
            "bot"
        );
    }
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

/*
========================================
PRESS ENTER TO SEND MESSAGE
========================================
*/

document
    .getElementById("userInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            sendMessage();
        }

});
