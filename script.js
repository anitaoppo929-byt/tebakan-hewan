// === Background animasi kebun binatang full ===
const bgAnimalsList = [
  "kucing.png","anjing.png","gajah.png","singa.png",
  "kelinci.png","panda.png","zebra.png","harimau.png",
  "kuda.png","monyet.png","buaya.png","tikus.png",
  "jerapah.png","unta.png","monyet.jpg","lumba-lumba.jpg",
  "pinguin.jpg","kangguru.jpg","kudanil.jpg","rusa.jpg",
  "merak.jpg"
];

const bgContainer = document.getElementById('backgroundAnimals');
const totalBgAnimals = 40; // banyak hewan

for (let i = 0; i < totalBgAnimals; i++) {
  const img = document.createElement("img");
  img.src = bgAnimalsList[Math.floor(Math.random() * bgAnimalsList.length)];
  img.classList.add("bg-animal");

  // posisi acak awal
  img.style.left = Math.random() * window.innerWidth + "px";
  img.style.top = Math.random() * window.innerHeight + "px";

  // speed, scale, blur, opacity random
  img.speedX = 0.2 + Math.random() * 0.6;
  img.speedY = 0.1 + Math.random() * 0.4;
  img.scale = 0.5 + Math.random() * 1.0;
  img.style.transform = `scale(${img.scale})`;
  img.style.opacity = 0.3 + Math.random() * 0.5;
  img.style.filter = `blur(${3 + Math.random()*5}px) brightness(${0.7 + Math.random()*0.3})`;

  bgContainer.appendChild(img);
  animateBgAnimal(img);
}

function animateBgAnimal(animal) {
  function move() {
    let left = parseFloat(animal.style.left);
    let top = parseFloat(animal.style.top);

    left += animal.speedX;
    top += Math.sin(left / 50) * animal.speedY;

    if (left > window.innerWidth + 100) {
      left = -100;
      top = Math.random() * window.innerHeight;
    }
    if (top < -50) top = 0;
    if (top > window.innerHeight + 50) top = window.innerHeight;

    animal.style.left = left + "px";
    animal.style.top = top + "px";

    requestAnimationFrame(move);
  }
  move();
}

// === Game Tebak Hewan ===
const animals = [
  {name:"kucing", clue:"Hewan lucu berbulu lembut, suka mengeong.", img:"K.webp"},
  {name:"kuda", clue:"Hewan cepat, berkaki empat, sering ditunggangi manusia.", img:"D.webp"},
  {name:"penguin", clue:"Burung yang tidak bisa terbang tapi pandai berenang.", img:"ping.jpg"},
  {name:"gajah", clue:"Mamalia terbesar dengan belalai panjang.", img:"G.jpg"},
  {name:"anjing", clue:"Hewan setia, suka menggonggong dan bermain.", img:"A.jpg"},
  {name:"harimau", clue:"Bergaris oranye hitam, predator hutan.", img:"H.jpg"},
  {name:"jerapah", clue:"Lehernya sangat panjang, pemakan daun di pohon tinggi.", img:"J.jpg"},
  {name:"panda", clue:"Beruang hitam-putih, suka makan bambu.", img:"P.jpg"},
  {name:"kelinci", clue:"Hewan kecil berbulu, suka melompat dan makan wortel.", img:"k.jpg"},
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

let currentLevel = 0;
let coins = 10;
let timer;
let timeLeft = 30;

function mulaiGame() {
  document.getElementById('menuContainer').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  loadLevel();
}

function loadLevel() {
  if (currentLevel >= animals.length) {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('gameCompleted').style.display = 'block';
    return;
  }

  const animal = animals[currentLevel];
  const animalImg = document.getElementById('animalImage');
  animalImg.src = animal.image;
  animalImg.classList.remove("revealed");

  document.getElementById('guessInput').value = "";
  document.getElementById('result').innerText = "";
  document.getElementById('clueContainer').style.display = "none";

  updateLevelDisplay();

  timeLeft = 30;
  updateTimer();
  clearInterval(timer);
  timer = setInterval(countdown, 1000);
}

function countdown() {
  timeLeft--;
  updateTimer();
  if (timeLeft <= 0) {
    clearInterval(timer);
    document.getElementById('result').innerText = "⏰ Waktu habis!";
    nextLevel();
  }
}

function updateTimer() {
  document.getElementById('timer').innerText = "⏳ Waktu: " + timeLeft + " detik";
}

function updateLevelDisplay() {
  const container = document.getElementById('levelContainer');
  container.innerHTML = "";
  for (let i = 0; i < animals.length; i++) {
    const circle = document.createElement("div");
    circle.classList.add("level-circle");
    if (i === currentLevel) circle.classList.add("active");
    circle.innerText = i + 1;
    container.appendChild(circle);
  }
}

document.getElementById('guessButton').addEventListener('click', function() {
  const guess = document.getElementById('guessInput').value.trim().toLowerCase();
  const animal = animals[currentLevel];
  const correct = animal.name.toLowerCase();

  if (guess === correct) {
    document.getElementById('result').innerText = "🎉 Benar! Itu " + correct.toUpperCase();
    coins += 5;
    document.getElementById('coins').innerText = coins;

    document.getElementById('animalImage').classList.add("revealed");

    clearInterval(timer);
    setTimeout(nextLevel, 1500);
  } else {
    document.getElementById('result').innerText = "❌ Salah, coba lagi!";
    coins -= 1;
    document.getElementById('coins').innerText = coins;
  }
});

document.getElementById('resetButton').addEventListener('click', function() {
  coins -= 2;
  document.getElementById('coins').innerText = coins;
  nextLevel();
});

document.getElementById('clueButton').addEventListener('click', function() {
  const animal = animals[currentLevel];
  const clueBox = document.getElementById('clueContainer');
  clueBox.innerText = "💡 Petunjuk: " + animal.clue;
  clueBox.style.display = "block";
  coins -= 2;
  document.getElementById('coins').innerText = coins;
});

function nextLevel() {
  currentLevel++;
  loadLevel();
}

function ulangGame() {
  currentLevel = 0;
  coins = 10;
  document.getElementById('coins').innerText = coins;
  document.getElementById('gameCompleted').style.display = 'none';
  document.getElementById('menuContainer').style.display = 'block';
}
