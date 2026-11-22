// =============================
//  おみくじの部分
// =============================

// おみくじの結果の一覧（運勢・メッセージ・文字の色）
const fortunes = [
  { name: "大吉", message: "最高の一日！何でもうまくいきそう✨", color: "#d32f2f" },
  { name: "中吉", message: "いいことがありそう。笑顔でいこう！", color: "#f57c00" },
  { name: "小吉", message: "小さな幸せが見つかるかも🍀", color: "#388e3c" },
  { name: "吉",   message: "おだやかな一日になりそう。", color: "#1976d2" },
  { name: "末吉", message: "あとからいいことがやってくるよ。", color: "#7b1fa2" },
  { name: "凶",   message: "今日は慎重に。明日はきっといい日！", color: "#455a64" }
];

// HTMLの部品を、idを使って取り出しておく
const box = document.getElementById("box");
const drawButton = document.getElementById("drawButton");
const result = document.getElementById("result");
const fortuneText = document.getElementById("fortune");
const messageText = document.getElementById("message");

// 「おみくじを引く」ボタンが押されたときの処理
drawButton.addEventListener("click", function () {
  // 前の結果を隠す
  result.classList.add("hidden");

  // 箱をゆらす（CSSの .shake アニメーションが動く）
  box.classList.add("shake");

  // ゆれている間はボタンを押せないようにする
  drawButton.disabled = true;

  // 1.5秒（1500ミリ秒）待ってから結果を出す
  setTimeout(function () {
    // 箱のゆれを止める
    box.classList.remove("shake");

    // 0〜5のランダムな数字を作り、その番号の結果を選ぶ
    const index = Math.floor(Math.random() * fortunes.length);
    const picked = fortunes[index];

    // 結果を画面に書きこむ
    fortuneText.textContent = picked.name;
    fortuneText.style.color = picked.color;
    messageText.textContent = picked.message;

    // 結果を表示する
    result.classList.remove("hidden");

    // ボタンをもう一度押せるようにして、文字を変える
    drawButton.disabled = false;
    drawButton.textContent = "もう一度引く";
  }, 1500);
});


// =============================
//  おまけ：ラッキーカラーの部分
// =============================

// ラッキーカラーの一覧（色の名前・色のコード）
const colors = [
  { name: "レッド",     code: "#e53935" },
  { name: "オレンジ",   code: "#fb8c00" },
  { name: "イエロー",   code: "#fdd835" },
  { name: "グリーン",   code: "#43a047" },
  { name: "スカイブルー", code: "#29b6f6" },
  { name: "ネイビー",   code: "#283593" },
  { name: "パープル",   code: "#8e24aa" },
  { name: "ピンク",     code: "#f06292" },
  { name: "ホワイト",   code: "#ffffff" },
  { name: "ブラウン",   code: "#6d4c41" }
];

// ラッキーアイテムの一覧（絵文字と名前）
const items = [
  "🖊️ お気に入りのペン",
  "🍫 チョコレート",
  "📒 ノート",
  "🎧 イヤホン",
  "☂️ 折りたたみ傘",
  "🧸 ぬいぐるみ",
  "🍙 おにぎり",
  "📚 本",
  "🎀 リボン",
  "🪞 手鏡",
  "🍬 あめ",
  "👟 スニーカー"
];

const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");
const colorButton = document.getElementById("colorButton");
const colorResult = document.getElementById("colorResult");
const colorSample = document.getElementById("colorSample");
const colorName = document.getElementById("colorName");
const itemName = document.getElementById("itemName");

// 「ラッキーカラーを見る」ボタンが押されたときの処理
colorButton.addEventListener("click", function () {
  // 入力された月と日を数字にする
  const month = Number(monthInput.value);
  const day = Number(dayInput.value);

  // 正しく入力されていないときはお知らせして終わる
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    colorName.textContent = "誕生日を正しく入れてね";
    colorSample.style.background = "transparent";
    itemName.textContent = "";
    colorResult.classList.remove("hidden");
    return;
  }

  // 今日の日付を取り出す
  const today = new Date();
  const todayNumber = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // 誕生日と今日の日付を合わせた数字を作る
  // 同じ誕生日・同じ日なら、何回押しても同じ色になる
  // 日付が変わると色も変わる
  const number = month * 31 + day + todayNumber;

  // 色の数で割ったあまりを使って、色を1つ選ぶ
  const picked = colors[number % colors.length];

  // 結果を画面に表示する
  colorSample.style.background = picked.code;
  colorName.textContent = picked.name;
  colorName.style.color = "#333";

  // ラッキーアイテムも同じように選ぶ
  // 色と同じ組み合わせばかりにならないよう、数字に7をかけてから割ったあまりを使う
  const item = items[(number * 7) % items.length];
  itemName.textContent = "ラッキーアイテム：" + item;

  colorResult.classList.remove("hidden");
});
