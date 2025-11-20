const animals = [
  {name:"kucing", clue:"Hewan lucu berbulu lembut, suka mengeong.", img:"k.webp"},
  {name:"kuda", clue:"Hewan cepat, berkaki empat, sering ditunggangi manusia.", img:"D.webp"},
  {name:"penguin", clue:"Burung yang tidak bisa terbang tapi pandai berenang.", img:"ping.jpg"},
  {name:"gajah", clue:"Mamalia terbesar dengan belalai panjang.", img:"G.jpg"},
  {name:"anjing", clue:"Hewan setia, suka menggonggong dan bermain.", img:"A.jpg"},
  {name:"harimau", clue:"Bergaris oranye hitam, predator hutan.", img:"H.jpg"},
  {name:"jerapah", clue:"Lehernya sangat panjang, pemakan daun di pohon tinggi.", img:"J.jpg"},
  {name:"panda", clue:"Beruang hitam-putih, suka makan bambu.", img:"P.jpg"},
  {name:"kelinci", clue:"Hewan kecil berbulu, suka melompat dan makan wortel.", img:"K.jpg"},
  {name:"tikus", clue:"Hewan kecil, suka makan keju dan berlari cepat.", img:"T.png"},
  {name:"unta", clue:"Hewan gurun dengan punuk untuk menyimpan lemak.", img:"unta.avif"},
  {name:"buaya", clue:"Reptil besar pemakan daging, tinggal di sungai.", img:"B.jpg"},
  {name:"singa", clue:"Raja hutan dengan surai besar pada jantan.", img:"s.avif"},
  {name:"zebra", clue:"Mamalia bergaris hitam-putih, mirip kuda.", img:"Z.jpg"},
  {name:"monyet", clue:"Hewan gesit, suka memanjat pohon, pintar.", img:"M.jpg"},
  {name:"lumba-lumba", clue:"Mamalia laut cerdas, suka meloncat di air.", img:"L.jpg"},
  {name:"kangguru", clue:"Hewan Australia, melompat tinggi dengan kantong di perut.", img:"guru.jpg"},
  {name:"kudanil", clue:"Hewan besar, hidup di air dan darat, gigi taring besar.", img:"N.jpg"},
  {name:"merak", clue:"Burung indah berekor panjang dan berwarna cerah.", img:"E.jpg"},
  {name:"rusa", clue:"Hewan bertanduk, lari cepat, hidup di hutan.", img:"R.jpg"}
];

let level = 0;
let lives = 3;
let coins = 10;
let diamonds = 3;

function startGame() {
    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    loadLevel();
}

function loadLevel() {
    const animal = animals[level];
    const img = document.getElementById("animalImg");
    img.src = animal.img;         
    img.classList.remove("revealed");
    document.getElementById("levelNumber").innerText = level + 1;
    document.getElementById("resultText").innerText = "";
    document.getElementById("clueBox").innerText = "";
    document.getElementById("answerInput").value = "";
}

function checkAnswer() {
    const answer = document.getElementById("answerInput").value.toLowerCase();
    const animal = animals[level];
    if (answer === animal.name.toLowerCase()) {
        document.getElementById("resultText").innerText = "✅ Benar!";
        level++;
        if(level < animals.length){
            setTimeout(loadLevel, 1000);
        } else {
            endGame("🎉 Kamu menang!");
        }
    } else {
        lives--;
        document.getElementById("lives").innerText = lives;
        document.getElementById("resultText").innerText = "❌ Salah!";
        if(lives <= 0){
            endGame("💀 Game Over");
        }
    }
}

function buyClueCoin() {
    if(coins >= 2){
        coins -= 2;
        document.getElementById("coins").innerText = coins;
        document.getElementById("clueBox").innerText = animals[level].clue;
    } else alert("Koin tidak cukup!");
}

function buyClueDiamond() {
    if(diamonds >= 1){
        diamonds -= 1;
        document.getElementById("diamonds").innerText = diamonds;
        document.getElementById("animalImg").classList.add("revealed");
    } else alert("Diamond tidak cukup!");
}

function endGame(message) {
    document.getElementById("gameScreen").style.display = "none";
    const endScreen = document.getElementById("endScreen");
    endScreen.style.display = "block";
    endScreen.querySelector("h1").innerText = message;
}

function restart() {
    level = 0;
    lives = 3;
    coins = 10;
    diamonds = 3;
    document.getElementById("lives").innerText = lives;
    document.getElementById("coins").innerText = coins;
    document.getElementById("diamonds").innerText = diamonds;
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("menuScreen").style.display = "block";
}

function toggleGuide() {
    const guide = document.getElementById("guideBox");
    guide.style.display = guide.style.display === "none" ? "block" : "none";
}
