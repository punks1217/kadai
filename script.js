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

  // -----------------------------
  // 固定返答パターン (responses オブジェクト) - 絵文字付き
  // -----------------------------
  const responses = {
    greeting: [
      "おはよう！今日もいい日になるよ！😊",
      "おはよー！朝ごはん食べた？🍳",
      "こんにちは！調子どう？🌟",
      "こんばんは！今日もよく頑張ったね🌙",
      "やあ！何か話したいことある？💬",
      "こんにちは！今日どうだった？何か話してみて！😃"
    ],
    morning: [
      "朝はのんびりスタートでも大丈夫。今日はどんな朝だった？☕️",
      "朝食は何食べた？エネルギー補給は大事だよ！🍞",
      "朝は気持ちを切り替えるチャンス！どんなことを頑張りたい？⚡"
    ],
    workReluctance: [
      "気が乗らない日もあるよね。どんなところが大変？😓",
      "今日は仕事に行きたくない気分かぁ…少し気分転換してみる？🚶",
      "無理せずゆっくりで大丈夫。焦らずいこう！🌿"
    ],
    tired: [
      "今日はよく頑張ったね！休む時間も大切だよ😌",
      "疲れてるみたいだけど、しっかり睡眠取れてる？💤",
      "疲れたら、好きなことしてリフレッシュするのもいいよ🌈"
    ],
    sleepy: [
      "眠いときは無理せずストレッチしたり、コーヒーで目を覚ましたりしてみよう😴",
      "だるいときは、少し休憩するといいかも🛋️",
      "しんどいと感じたら、気分転換に楽しいことしてみたら？🎉"
    ],
    gratitude: [
      "どういたしまして！🙏",
      "こちらこそ、ありがとう！😊",
      "嬉しいです！😃",
      "感謝してます！💖"
    ],
    clarification: [
      "すみません、よくわからなかったので、もう一度教えてくれる？🤔",
      "え？もう少し詳しく説明してくれるかな？😕",
      "どういう意味か教えてもらえますか？❓"
    ],
    emotion: [
      "それは本当に素晴らしいね！あなたの喜びが伝わってくるよ😊",
      "辛いと感じているんだね。無理せず、自分のペースで進もう😢",
      "感情の浮き沈みは誰にでもあるよ。あなたなら乗り越えられるよ💪",
      "嬉しい気持ちが溢れてるね！そのポジティブさ、すごく素敵だよ✨"
    ],
    hobby: [
      "趣味って大事だよね！最近ハマってるもの教えてくれる？🎸",
      "映画や音楽、どっちが好き？僕はどっちも楽しむ派だよ🎬",
      "週末は趣味に没頭する時間も大切だよ！おすすめあればぜひ😊",
      "読書や運動、あなたの好きなことについてもっと聞かせて！🏀📚🍳"
    ],
    casual: [
      "最近、何か面白いことあった？😄",
      "普段のリラックスタイム、どんな感じ？✨",
      "今日はどんなことにワクワクした？😁",
      "散歩やカフェでのひととき、いいよね☕️"
    ],
    general: [
      "ところで、今日の出来事で印象に残ったことは何？🤔",
      "新しい発見や挑戦、何かあったら聞かせて！😊",
      "最近の好きな映画や音楽、教えてくれたら嬉しいな！🎉"
    ],
    // 新規追加：trivia（豆知識・雑学・便利情報）を300個自動生成
    trivia: Array.from({ length: 300 }, (_, i) => `豆知識 ${i + 1}: ここに面白くて便利な雑学や豆知識が詰まっています！🤓`)
  };

  // -----------------------------
  // 追加する補足情報 (季節・天気)
  // -----------------------------
  const seasonalData = {
    spring: [
      "ちなみに、春は桜が咲き始め、外が明るく感じられるね🌸。",
      "春のそよ風が心地よく、新たな始まりを感じるよ🌱。"
    ],
    summer: [
      "ちなみに、夏は暑いから水分補給を忘れずに💦。",
      "夏祭りやビーチで過ごすのが楽しみな季節だね🏖️。"
    ],
    autumn: [
      "ちなみに、秋は紅葉が美しく、穏やかな日々が続くね🍁。",
      "秋の味覚に心躍る季節、楽しもう🍂。"
    ],
    winter: [
      "ちなみに、冬は寒いけど温かい飲み物が恋しくなる季節だよ❄️。",
      "冬は夜が長いから、ゆっくり過ごすのもいいね🔥。"
    ]
  };

  const weatherTemplates = {
    clear: "今日は晴れていてとても快適だね☀️。",
    rain: "外は雨模様。傘を忘れずにね🌧️。",
    clouds: "曇った空だけど、落ち着いた気分になれるよ☁️。",
    snow: "雪が降っているよ。暖かく過ごしてね❄️。",
    default: "今日の天気はちょっと不明だけど、素敵な一日を！🌈"
  };

  // -----------------------------
  // 補足情報取得用の関数
  // -----------------------------
  function getSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
  }

  async function getWeather(city = "Osaka") {
    const apiKey = "YOUR_API_KEY"; // 実際の API キーに置き換えてください
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.weather && data.weather.length > 0) {
        const condition = data.weather[0].main.toLowerCase();
        let key = "default";
        if (condition.includes("clear")) key = "clear";
        else if (condition.includes("rain")) key = "rain";
        else if (condition.includes("cloud")) key = "clouds";
        else if (condition.includes("snow")) key = "snow";
        return weatherTemplates[key];
      }
      return weatherTemplates.default;
    } catch (error) {
      console.error("Weather API エラー:", error);
      return weatherTemplates.default;
    }
  }

  function generateSeasonalMessage(season) {
    if (seasonalData.hasOwnProperty(season)) {
      const messages = seasonalData[season];
      return messages[Math.floor(Math.random() * messages.length)];
    }
    return "";
  }

  // -----------------------------
  // 統合返答生成関数 (固定返答 + 補足情報を連結) 
  // -----------------------------
  async function generateBotReply(userText) {
    const lowerText = userText.trim().toLowerCase();
    let reply = "";

    // 固定返答パターン
    if (/^(おはよ|おはよう|こんにちは|こんちゃ|ばんは|こんばんは)/.test(lowerText)) {
      reply += responses.greeting[Math.floor(Math.random() * responses.greeting.length)] + " ";
    }
    if (lowerText.includes("朝")) {
      reply += responses.morning[Math.floor(Math.random() * responses.morning.length)] + " ";
    }
    if (lowerText.includes("仕事") || lowerText.includes("行きたくない")) {
      reply += responses.workReluctance[Math.floor(Math.random() * responses.workReluctance.length)] + " ";
    }
    if (lowerText.includes("疲れ") || lowerText.includes("くたくた")) {
      reply += responses.tired[Math.floor(Math.random() * responses.tired.length)] + " ";
    }
    if (lowerText.includes("ねむい") || lowerText.includes("眠い") ||
        lowerText.includes("だるい") || lowerText.includes("しんどい")) {
      reply += responses.sleepy[Math.floor(Math.random() * responses.sleepy.length)] + " ";
    }
    if (lowerText.includes("ありがとう") || lowerText.includes("感謝")) {
      reply += responses.gratitude[Math.floor(Math.random() * responses.gratitude.length)] + " ";
    }
    if (lowerText.includes("え？") || lowerText.includes("どういう")) {
      reply += responses.clarification[Math.floor(Math.random() * responses.clarification.length)] + " ";
    }
    // 感情に関する返答
    if (
      lowerText.includes("うれしい") || lowerText.includes("嬉しい") ||
      lowerText.includes("悲しい") || lowerText.includes("寂しい") ||
      lowerText.includes("楽しい") || lowerText.includes("怒った") ||
      lowerText.includes("めんどくさい")
    ) {
      reply += responses.emotion[Math.floor(Math.random() * responses.emotion.length)] + " ";
    }
    // 趣味に関する返答
    if (
      lowerText.includes("趣味") || lowerText.includes("好き") ||
      lowerText.includes("音楽") || lowerText.includes("映画") ||
      lowerText.includes("スポーツ") || lowerText.includes("読書")
    ) {
      reply += responses.hobby[Math.floor(Math.random() * responses.hobby.length)] + " ";
    }
    // カジュアルな雑談
    if (
      lowerText.includes("最近") || lowerText.includes("今日") ||
      lowerText.includes("どうだった") || lowerText.includes("なにかあった")
    ) {
      reply += responses.casual[Math.floor(Math.random() * responses.casual.length)] + " ";
    }
    // 一般的なフォローアップ
    if (!reply.trim()) {
      reply += responses.general[Math.floor(Math.random() * responses.general.length)] + " ";
    }
    // trivia：豆知識・雑学・便利な情報
    if (lowerText.includes("豆知識") || lowerText.includes("雑学") || lowerText.includes("便利")) {
      reply += responses.trivia[Math.floor(Math.random() * responses.trivia.length)] + " ";
    }
    // 追加：天気情報
    if (
      lowerText.includes("天気") || lowerText.includes("晴れ") ||
      lowerText.includes("雨") || lowerText.includes("曇り") || lowerText.includes("雪")
    ) {
      reply += await getWeather() + " ";
    }
    // 追加：季節補足メッセージ
    if (
      lowerText.includes("季節") || lowerText.includes("春") ||
      lowerText.includes("夏") || lowerText.includes("秋") || lowerText.includes("冬")
    ) {
      const season = getSeason();
      reply += generateSeasonalMessage(season) + " ";
    }
    
    if (!reply.trim()) {
      reply = "ちょっと面白い話題でも教えて！😊";
    }
    
    return reply;
  }

  // -----------------------------
  // チャットメッセージ表示用関数
  // -----------------------------
  function addChatMessage(sender, text) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("message-wrapper", sender === "user" ? "user-wrapper" : "bot-wrapper");
    const messageSpan = document.createElement("span");
    messageSpan.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageSpan.innerText = text;
    wrapper.appendChild(messageSpan);
    chatContainer.appendChild(wrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // -----------------------------
  // ユーザー送信処理
  // -----------------------------
  async function sendChatMessage() {
    const userText = chatInput.value.trim();
    if (!userText) return;
    addChatMessage("user", userText);
    chatInput.value = "";
    const botReply = await generateBotReply(userText);
    setTimeout(() => {
      addChatMessage("bot", botReply);
    }, 1000);
  }

  // -----------------------------
  // 初回ボットの挨拶を表示する
  // -----------------------------
  addChatMessage("bot", "こんにちは！今日どうだった？何か話してみて！😃");

  // -----------------------------
  // イベントリスナーの設定
  // -----------------------------
  sendChatButton.addEventListener("click", sendChatMessage);
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendChatMessage();
  });
});