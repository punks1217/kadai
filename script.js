document.addEventListener("DOMContentLoaded", function () {
  /* 作業記録機能 */
  document.getElementById("saveTaskButton").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    if (!taskInput.value.trim()) return;
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    const taskSpan = document.createElement("span");
    taskSpan.classList.add("item-text");
    taskSpan.innerText = taskInput.value;
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      const inputPassword = prompt("削除するにはパスワードを入力してください:");
      if (inputPassword === "1234") {
        taskItem.remove();
      }
    });
    iconContainer.appendChild(deleteBtn);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(iconContainer);
    taskList.appendChild(taskItem);
    taskInput.value = "";
  });

  /* チェックリスト機能 */
  document.getElementById("addChecklistButton").addEventListener("click", function () {
    const checklistInput = document.getElementById("checklistInput");
    const checklist = document.getElementById("checklist");
    if (!checklistInput.value.trim()) return;
    const item = document.createElement("div");
    item.classList.add("checklist-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const label = document.createElement("span");
    label.classList.add("item-text");
    label.innerText = checklistInput.value;
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      const inputPassword = prompt("削除するにはパスワードを入力してください:");
      if (inputPassword === "1234") {
        item.remove();
      }
    });
    iconContainer.appendChild(deleteBtn);
    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(iconContainer);
    checklist.appendChild(item);
    checklistInput.value = "";
  });

  /* 共有メモ機能 */
  document.getElementById("shareMemoButton").addEventListener("click", function () {
    const sharedMemoInput = document.getElementById("sharedMemoInput");
    const sharedMemo = document.getElementById("sharedMemo");
    if (!sharedMemoInput.value.trim()) return;
    const memoItem = document.createElement("div");
    memoItem.classList.add("memo-item");
    const memoSpan = document.createElement("span");
    memoSpan.classList.add("item-text");
    memoSpan.innerText = sharedMemoInput.value;
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      const inputPassword = prompt("削除するにはパスワードを入力してください:");
      if (inputPassword === "1234") {
        memoItem.remove();
      }
    });
    const copyButton = document.createElement("button");
    copyButton.innerText = "📋";
    copyButton.classList.add("copy-btn");
    copyButton.addEventListener("click", function () {
      navigator.clipboard.writeText(memoSpan.innerText);
      alert("メモをコピーしました！");
    });
    iconContainer.appendChild(deleteBtn);
    iconContainer.appendChild(copyButton);
    memoItem.appendChild(memoSpan);
    memoItem.appendChild(iconContainer);
    sharedMemo.appendChild(memoItem);
    sharedMemoInput.value = "";
  });

  /* チャット応援システム */
  const chatContainer = document.getElementById("chatContainer");
  const chatInput = document.getElementById("chatInput");
  const sendChatButton = document.getElementById("sendChatButton");

  // チャットウィンドウにメッセージを追加する関数
function addChatMessage(sender, text) {
  const wrapper = document.createElement("div");
  // ラッパーにユーザー／ボット用のクラスを付与
  wrapper.classList.add("message-wrapper", sender === "user" ? "user-wrapper" : "bot-wrapper");
  
  const messageSpan = document.createElement("span");
  messageSpan.classList.add(sender === "user" ? "user-message" : "bot-message");
  messageSpan.innerText = text;
  
  wrapper.appendChild(messageSpan);
  chatContainer.appendChild(wrapper);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}


  // 初回ボット挨拶
  addChatMessage("bot", "こんにちは！今日のこと、何かあった？気軽に話してね 😊");

  // ボット応援メッセージを生成する簡単な関数
  function generateBotReply(userText) {
    if (userText.includes("どうした") || userText.includes("なぜ")) {
      return "いろいろ考える日もあるよね。無理せず、自分のペースで大丈夫だよ 🤗";
    } else if (userText.includes("忙しい") || userText.includes("大変")) {
      return "忙しい中でメッセージくれてありがとう。ゆっくり休むことも大切だよ 🙏";
    } else if (userText.includes("寂しい") || userText.includes("孤独")) {
      return "寂しい気持ち、分かるよ。あなたは一人じゃないからね 💕";
    } else if (userText.includes("元気") || userText.includes("楽しい") || userText.includes("うれしい")) {
      return "それは良かった！そのポジティブな気持ち、しっかり大切にしてね 😊✨";
    } else {
      return "そうなんだ…もう少し詳しく教えてくれるかな？ 🤔";
    }
  }

  // ユーザーがメッセージを送信したときの処理
  function sendChatMessage() {
    const userText = chatInput.value.trim();
    if (!userText) return;
    addChatMessage("user", userText);
    chatInput.value = "";
    setTimeout(() => {
      const botReply = generateBotReply(userText);
      addChatMessage("bot", botReply);
    }, 1000);
  }

  sendChatButton.addEventListener("click", sendChatMessage);
  
  chatInput.addEventListener("keypress", function (e) {
    if(e.key === "Enter") {
      sendChatMessage();
    }
  });
});
