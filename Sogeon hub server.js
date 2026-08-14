<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Sigeon AI</title>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #ffd21c, #fff06a);
    min-height: 100vh;
    overflow-x: hidden;
}

/* Hintergrund-Animation */
body::before {
    content: "";
    position: fixed;
    width: 500px;
    height: 500px;
    background: rgba(255,255,255,0.25);
    border-radius: 50%;
    top: -150px;
    left: -150px;
    animation: float 6s infinite alternate ease-in-out;
}

@keyframes float {
    from {
        transform: translate(0,0);
    }

    to {
        transform: translate(100px,80px);
    }
}

/* HEADER */

header {
    height: 70px;
    background: rgba(0,0,0,0.85);
    color: white;
    display: flex;
    align-items: center;
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 10;
}

.logo {
    font-size: 25px;
    font-weight: bold;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%,100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-7px);
    }
}

/* MENU */

.menu {
    margin-left: auto;
    display: flex;
    gap: 8px;
}

.menu button {
    background: #292929;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.25s;
}

.menu button:hover {
    transform: scale(1.08);
    background: #444;
}

/* MAIN */

.container {
    max-width: 900px;
    margin: auto;
    padding: 40px 15px;
}

/* WELCOME */

.welcome {
    text-align: center;
    animation: appear 1s ease;
}

.welcome h1 {
    font-size: 42px;
    margin-bottom: 10px;
}

.welcome p {
    font-size: 18px;
}

/* CHAT */

.chat {
    margin-top: 35px;
    min-height: 350px;
}

.message {
    padding: 16px 20px;
    border-radius: 18px;
    margin: 15px 0;
    max-width: 75%;
    animation: messageIn 0.4s ease;
}

.ai {
    background: rgba(255,255,255,0.8);
    margin-right: auto;
}

.user {
    background: #111;
    color: white;
    margin-left: auto;
}

@keyframes messageIn {
    from {
        opacity: 0;
        transform: translateY(15px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* INPUT */

.input-area {
    position: sticky;
    bottom: 10px;
}

.input-box {
    display: flex;
    align-items: center;
    background: white;
    padding: 8px;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}

.input-box input {
    flex: 1;
    border: none;
    outline: none;
    padding: 14px;
    font-size: 16px;
}

.action {
    border: none;
    background: transparent;
    font-size: 22px;
    padding: 10px;
    cursor: pointer;
    transition: 0.2s;
}

.action:hover {
    transform: scale(1.2) rotate(5deg);
}

.send {
    background: #111;
    color: white;
    border-radius: 13px;
}

/* LOADING */

.loading {
    display: inline-block;
}

.loading span {
    display: inline-block;
    width: 7px;
    height: 7px;
    background: #111;
    border-radius: 50%;
    margin: 2px;
    animation: dots 1s infinite;
}

.loading span:nth-child(2) {
    animation-delay: 0.15s;
}

.loading span:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes dots {
    0%,100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-7px);
    }
}

/* MOBILE */

@media(max-width:600px) {

    .welcome h1 {
        font-size: 32px;
    }

    .message {
        max-width: 90%;
    }

    .menu button {
        padding: 8px;
        font-size: 12px;
    }
}
</style>
</head>

<body>

<header>

    <div class="logo">
        🐦 Sigeon AI
    </div>

    <div class="menu">

        <button onclick="newChat()">
            ＋ New
        </button>

        <button onclick="alert('Settings coming soon!')">
            ⚙️
        </button>

    </div>

</header>


<div class="container">

    <div class="welcome">

        <h1>🐦 Sigeon AI</h1>

        <p>Your creative AI assistant</p>

    </div>


    <div class="chat" id="chat">

        <div class="message ai">
            👋 Hey! I'm Sigeon AI.<br>
            What would you like to create?
        </div>

    </div>


    <div class="input-area">

        <div class="input-box">

            <button class="action" onclick="uploadImage()">
                📎
            </button>

            <button class="action" onclick="generateImage()">
                🖼️
            </button>

            <input
                id="input"
                placeholder="Message Sigeon AI..."
                onkeydown="enter(event)"
            >

            <button
                class="action send"
                onclick="send()">
                ➤
            </button>

        </div>

    </div>

</div>


<script>

function send() {

    let input = document.getElementById("input");

    let text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    let loading = document.createElement("div");

    loading.className = "message ai";

    loading.id = "loading";

    loading.innerHTML = `
        <div class="loading">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    document.getElementById("chat").appendChild(loading);

    setTimeout(function() {

        loading.remove();

        addMessage(
            "🤖 Sigeon AI: I received your message! Real AI will be connected next.",
            "ai"
        );

    }, 1200);

}


function addMessage(text, type) {

    let message = document.createElement("div");

    message.className = "message " + type;

    message.textContent = text;

    document.getElementById("chat").appendChild(message);

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}


function enter(event) {

    if (event.key === "Enter") {
        send();
    }

}


function newChat() {

    document.getElementById("chat").innerHTML = `
        <div class="message ai">
            🐦 New chat started!
        </div>
    `;

}


function generateImage() {

    addMessage(
        "🖼️ Image generator selected! Real image generation can be connected later.",
        "ai"
    );

}


function uploadImage() {

    let file = document.createElement("input");

    file.type = "file";

    file.accept = "image/*";

    file.click();

    file.onchange = function() {

        if (file.files.length > 0) {

            addMessage(
                "📷 Image selected: " + file.files[0].name,
                "user"
            );

        }

    };

}

</script>

</body>
</html>Sigeon AI Website
       ↓
   server.js
       ↓
    KI-API
       ↓
Sigeon bekommt echte Antwort
