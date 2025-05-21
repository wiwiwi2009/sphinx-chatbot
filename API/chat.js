<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sphinx Assistant</title>
  <style>
    body {
      background: #0d1117;
      color: #ffffff;
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .chatbox {
      width: 90%;
      max-width: 600px;
      background: #161b22;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
    .messages {
      max-height: 400px;
      overflow-y: auto;
      margin-bottom: 15px;
    }
    .message {
      margin-bottom: 10px;
    }
    .user {
      color: #58a6ff;
    }
    .bot {
      color: #8b949e;
    }
    input {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 10px;
      background: #21262d;
      color: white;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="chatbox">
    <div class="messages" id="messages"></div>
    <input type="text" id="input" placeholder="اسأل Sphinx..." onkeypress="handleKey(event)" />
  </div>

  <script>
    const messagesDiv = document.getElementById('messages');
    const input = document.getElementById('input');

    function addMessage(sender, text) {
      const div = document.createElement('div');
      div.className = 'message ' + sender;
      div.textContent = sender === 'user' ? 'أنت: ' + text : 'Sphinx: ' + text;
      messagesDiv.appendChild(div);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function handleKey(event) {
      if (event.key === 'Enter' && input.value.trim() !== '') {
        const userInput = input.value;
        addMessage('user', userInput);
        input.value = '';
        getAIResponse(userInput);
      }
    }

    async function getAIResponse(message) {
      addMessage('bot', '...يتم التفكير');

      const apiKey = "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"; // ← حط مفتاحك هنا

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "أنت مساعد ذكي اسمه Sphinx يساعد المستخدم باللغة العربية." },
              { role: "user", content: message }
            ],
            max_tokens: 1000
          })
        });

        const data = await response.json();
        const aiText = data.choices[0].message.content.trim();
        addMessage('bot', aiText);
      } catch (error) {
        addMessage('bot', "حدث خطأ أثناء الاتصال بـ OpenAI.");
        console.error(error);
      }
    }
  </script>
</body>
</html>
