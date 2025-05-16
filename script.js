document.addEventListener("DOMContentLoaded", function () {
  // ★ 作業記録機能
  document.getElementById("saveTaskButton").addEventListener("click", function() {
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
    deleteBtn.addEventListener("click", function() {
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

  // ★ チェックリスト機能
  document.getElementById("addChecklistButton").addEventListener("click", function() {
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
    deleteBtn.addEventListener("click", function() {
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

  // ★ 共有メモ機能
  document.getElementById("shareMemoButton").addEventListener("click", function() {
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
    deleteBtn.addEventListener("click", function() {
      const inputPassword = prompt("削除するにはパスワードを入力してください:");
      if (inputPassword === "1234") {
        memoItem.remove();
      }
    });

    const copyButton = document.createElement("button");
    copyButton.innerText = "📋";
    copyButton.classList.add("copy-btn");
    copyButton.addEventListener("click", function() {
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

  // ★ 本日のコンディション機能
  document.getElementById("conditionButton").addEventListener("click", function() {
    const conditionInput = document.getElementById("conditionInput");
    const conditionMessage = document.getElementById("conditionMessage");
    const conditionText = conditionInput.value.trim();
    
    if (!conditionText) return;
    
    let response = "";
    // 簡単なキーワードで応援メッセージを判断
    if (conditionText.includes("不安") || conditionText.includes("落ち込") || conditionText.includes("疲れ")) {
      response = "大丈夫ですか？無理せず、ゆっくり休んでくださいね。";
    } else if (conditionText.includes("元気") || conditionText.includes("調子良") || conditionText.includes("楽しい")) {
      response = "素晴らしいですね！その調子で今日も頑張ってください！";
    } else {
      response = "今日も一日、無理せず頑張りましょう。あなたを応援しています！";
    }
    
    conditionMessage.innerText = response;
    conditionInput.value = "";
  });
});
