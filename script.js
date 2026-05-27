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

async function sendMessage() {

    const input =
        document.getElementById("userInput");

    const message =
        input.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user");

    input.value = "";

    try {

        const accessToken =
            await getSalesforceAccessToken();

        Console.log('AccessToken',accessToken);
        const response =
            await fetch(
                "YOUR_AGENTFORCE_API_ENDPOINT",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${accessToken}`
                    },

                    body: JSON.stringify({

                        message: message,

                        sessionId: "demo-session"

                    })
                }
            );

        const data =
            await response.json();

        /*
        ======================================
        SHOW BOT RESPONSE
        ======================================
        */

        addMessage(
            data.reply ||
            "No response received",
            "bot"
        );

    } catch(error) {

        console.error(error);

        addMessage(
            "Unable to connect to Salesforce Agentforce.",
            "bot"
        );
    }
}

async function getSalesforceAccessToken() {

    const clientId =
        "3MVG9zSy9nAai1xnwCwN0reCi17a.Bg7gJ5SN9tlZW7SVIH5cKYqiDZWd1khISzzcVfVUF8flhJSjFoa5FbjX";

    const clientSecret =
        "3DEB44EFE031E9A0511AD2C112E4234CF16CA50AFA1477758ADEF1632A8F3427";

    const username =
        "rj@etashq.com2025_06_24_19-15-27.demo";

    const password =
        "Etashq@2025";

    const response =
        await fetch(
            "https://login.salesforce.com/services/oauth2/token",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body:
                    `grant_type=password` +
                    `&client_id=${clientId}` +
                    `&client_secret=${clientSecret}` +
                    `&username=${username}` +
                    `&password=${password}`
            }
        );

    const data =
        await response.json();

    Console.log('data',data);

    return data.access_token;
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
