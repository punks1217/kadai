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

  // ★ここから、より自然な会話を生成するためのコードです★

  // ① ランダムな質問リスト（入力にキーワードが見当たらない場合のフォールバック用）
  const randomQuestions = [
    "最近、何か面白いことあった？",
    "今日はどんな気分？",
    "何か聞いてみたいことはある？",
    "最近、どんなことに興味があるの？"
  ];

  // ② 過去の会話内容を記録するための履歴（文脈記憶用）
  let conversationHistory = []; // 例：[ { sender: "user", text: "～" }, { sender: "bot", text: "～" } ]

  // ③ 各テーマの返答パターン定義（感謝や曖昧な入力用のカテゴリーも追加）
  const responses = {
    greeting: [
      "おはよう！今日もいい日になるよ！",
      "おはよー！朝ごはん食べた？",
      "こんにちは！調子どう？",
      "こんばんは！今日もよく頑張ったね。",
      "やあ！何か話したいことある？"
    ],
    morning: [
      "朝はのんびりスタートでも大丈夫。今日はどんな朝だった？",
      "朝食は何食べた？エネルギー補給は大事だね。",
      "朝は気持ちを切り替えるチャンス！どんなことを頑張りたい？"
    ],
    workReluctance: [
      "気が乗らない日もあるよね。どんなところが大変？",
      "今日は仕事に行きたくない気分かぁ…少し気分転換してみる？",
      "無理せずゆっくりで大丈夫。焦らずいこう！"
    ],
    tired: [
      "今日はよく頑張ったね！休む時間も大切だよ。",
      "疲れているみたいだけど、しっかり睡眠はとれている？",
      "疲れたら、好きなことをしてリフレッシュするのがいいかも！"
    ],
    sleepy: [
      "眠いときは無理せずストレッチしたり、コーヒーで目を覚ましたりしてみよう。",
      "だるいときは、少し休憩をとってみるのもいいね。",
      "しんどいと感じたら、気分転換に何か楽しいことをしてみたら？"
    ],
    mistake: [
      "誰でもミスはするもの。大事なのは次に活かすことだよ。",
      "ミスは成長のチャンス。次にどうするか、一緒に考えようか？",
      "失敗しても大丈夫。また挑戦すればもっと上手くいくよ。"
    ],
    relationship: [
      "人間関係がうまくいかないときは、無理せず自分らしくいることが大切だよ。",
      "悩んでいるなら、誰か信用できる人に話してみたらどうかな？",
      "人間関係は難しいけど、あなたは一人じゃないからね。"
    ],
    gratitude: [
      "どういたしまして！",
      "こちらこそ、ありがとう！",
      "嬉しいです！",
      "感謝してます！"
    ],
    clarification: [
      "すみません、よくわからなかったので、もう一度教えてくれる？",
      "え？もう少し詳しく説明してもらえるかな？",
      "どういう意味か教えてもらえますか？"
    ]
  };

  // ④ 文脈（会話の状態）を管理するオブジェクト
  let conversationState = {
    lastCategory: null,    // 前回の返答テーマ
    followUpCount: 0       // 同じテーマでの連続回答回数
  };

  // ⑤ キーワード判定と返答生成関数（正規表現や文脈も活用）
  function generateBotReply(userText) {
    const lowerText = userText.trim().toLowerCase();
    
    // ユーザー発言を履歴に追加
    conversationHistory.push({ sender: "user", text: userText });

    // 入力が短すぎる場合はランダム質問を返す
    if (lowerText.length <= 2) {
      conversationState.lastCategory = null;
      conversationState.followUpCount = 0;
      return randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
    }

    let category = null;
    // 正規表現によるキーワード判定
    if (/^(おはよ|おはよう|こんにちは|こんちゃ|ばんは|こんばんは)/.test(lowerText)) {
      category = "greeting";
    } else if (/ありがとう|感謝/.test(lowerText)) {  // ★「ありがとう」への反応を追加
      category = "gratitude";
    } else if (/^え\?/.test(lowerText)) {            // ★「え？」への反応を追加
      category = "clarification";
    } else if (/朝/.test(lowerText)) {
      category = "morning";
    } else if (/行きたくない|仕事.*嫌/.test(lowerText)) {
      category = "workReluctance";
    } else if (/疲れた|疲く|クタクタ/.test(lowerText)) {
      category = "tired";
    } else if (/眠い|だるい|しんどい/.test(lowerText)) {
      category = "sleepy";
    } else if (/ミス|失敗/.test(lowerText)) {
      category = "mistake";
    } else if (/人間関係|悩む|孤立/.test(lowerText)) {
      category = "relationship";
    }
    
    // 文脈がなかった場合、前回のテーマを引き継ぐ
    if (!category && conversationState.lastCategory) {
      category = conversationState.lastCategory;
    }

    // 返答生成部
    if (category && responses[category] && responses[category].length > 0) {
      // 同じテーマが連続している場合は、フォローアップ質問（最大2回まで）
      if (conversationState.lastCategory === category && conversationState.followUpCount < 2) {
        conversationState.followUpCount++;
        let followUp = "";
        switch (category) {
          case "greeting":
            followUp = "今日はどうだった？";
            break;
          case "morning":
            followUp = "朝ごはんは何を食べたの？";
            break;
          case "workReluctance":
            followUp = "仕事はどの部分が一番大変？";
            break;
          case "tired":
            followUp = "前にしっかり休めた？";
            break;
          case "sleepy":
            followUp = "いつもより疲れてると思うけど、どうしてかな？";
            break;
          case "mistake":
            followUp = "その後、次はどうするつもり？";
            break;
          case "relationship":
            followUp = "信頼できる人と話してみた？";
            break;
          case "gratitude":
            followUp = "こちらこそ、何かあったらいつでも話してね！";
            break;
          case "clarification":
            followUp = "もう一度説明してもらえますか？";
            break;
          default:
            followUp = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
        }
        conversationHistory.push({ sender: "bot", text: followUp });
        conversationState.lastCategory = category;
        return followUp;
      } else {
        // 新たなテーマまたは連続回数が上限の場合は通常の返答
        conversationState.lastCategory = category;
        conversationState.followUpCount = 0;
        const possibleReplies = responses[category];
        let reply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
        conversationHistory.push({ sender: "bot", text: reply });
        return reply;
      }
    } else {
      // どのルールにもマッチしなかった場合はランダムな質問でフォロー
      conversationState.lastCategory = null;
      conversationState.followUpCount = 0;
      let randomReply = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
      conversationHistory.push({ sender: "bot", text: randomReply });
      return randomReply;
    }
  }

  // ★ここまで、新しい対話機能のコードです★

  // 既存のチャットメッセージ表示関数
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

  // 初回ボットの挨拶
  addChatMessage("bot", "こんにちは！今日どうだった？何か話してみて！");

  // ユーザー送信処理
  function sendChatMessage() {
    const userText = chatInput.value.trim();
    if (!userText) return;
    addChatMessage("user", userText);
    chatInput.value = "";
    conversationHistory.push({ sender: "user", text: userText });
    setTimeout(() => {
      const botReply = generateBotReply(userText);
      addChatMessage("bot", botReply);
    }, 1000);
  }

  sendChatButton.addEventListener("click", sendChatMessage);
  chatInput.addEventListener("keypress", function (e) {
    if(e.key === "Enter") sendChatMessage();
  });
});
