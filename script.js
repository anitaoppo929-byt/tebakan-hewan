// === Background animasi kebun binatang ===
const zooAnimalsList=["kucing.png","anjing.png","gajah.png","singa.png","kelinci.png","panda.png","zebra.png","harimau.png"];
const bgContainer=document.getElementById('backgroundZoo');
const totalBg=30;

for(let i=0;i<totalBg;i++){
  const img=document.createElement("img");
  img.src=zooAnimalsList[Math.floor(Math.random()*zooAnimalsList.length)];
  img.classList.add("zoo-animal");
  img.style.left=Math.random()*window.innerWidth+"px";
  img.style.top=Math.random()*window.innerHeight+"px";
  img.speedX=0.1+Math.random()*0.3;
  img.speedY=0.05+Math.random()*0.2;
  img.scale=0.5+Math.random()*1;
  img.style.transform=`scale(${img.scale})`;
  bgContainer.appendChild(img);
  moveBg(img);
}
function moveBg(animal){
  function step(){
    let left=parseFloat(animal.style.left);
    let top=parseFloat(animal.style.top);
    left+=animal.speedX;
    top+=Math.sin(left/50)*animal.speedY;
    if(left>window.innerWidth+100){ left=-100; top=Math.random()*window.innerHeight; }
    animal.style.left=left+"px";
    animal.style.top=top+"px";
    requestAnimationFrame(step);
  }
  step();
}

// === Menu awal bubble petunjuk ===
const menuClueButton=document.getElementById('menuClueButton');
const menuClueBubble=document.getElementById('menuClueBubble');

menuClueButton.addEventListener('click', function(){
  menuClueBubble.innerText="💡 Tebak hewan berdasarkan gambar. Klik 'Mulai' untuk memulai!";
  menuClueBubble.classList.remove("hidden"); menuClueBubble.classList.add("visible");
  const rect=menuClueButton.getBoundingClientRect();
  menuClueBubble.style.left=(rect.left - 20)+"px";
  menuClueBubble.style.top=(rect.bottom + 10)+"px";
});
menuClueBubble.addEventListener('click', function(){
  this.classList.remove("visible"); this.classList.add("hidden");
});

// === Game Tebak Hewan ===
const animals=[
  {name:"kucing", image:"k.jpg", clue:"Hewan berbulu lembut yang suka mengeong."},
  {name:"anjing", image:"A.jpg", clue:"Hewan setia yang suka menggonggong."},
  {name:"gajah", image:"G.jpg", clue:"Hewan besar dengan belalai panjang."},
  {name:"harimau", image:"H.jpg", clue:"Hewan bergaris oranye hitam dan buas."},
  {name:"singa", image:"s.avif", clue:"Raja hutan dengan surai megah."},
  {name:"kelinci", image:"K.webp", clue:"Hewan kecil dengan telinga panjang yang suka wortel."},
  {name:"jerapah", image:"J.jpg", clue:"Hewan tinggi dengan leher panjang."},
  {name:"zebra", image:"Z.jpg", clue:"Hewan belang hitam putih mirip kuda."},
  {name:"kuda", image:"D.webp", clue:"Hewan kuat yang biasa ditunggangi."},
  {name:"panda", image:"P.jpg", clue:"Hewan gemuk hitam putih yang suka bambu."},
  {name:"buaya", image:"B.jpg", clue:"Hewan amfibi bergigi tajam dan kulit keras."},
  {name:"tikus", image:"T.png", clue:"Hewan kecil yang suka keju dan lari cepat."},
  {name:"unta", image:"unta.avif", clue:"Hewan berpunuk yang kuat di padang pasir."},
  {name:"monyet", image:"J.jpg", clue:"Hewan cerdas yang suka memanjat dan makan pisang."}
];

let currentLevel=0, coins=10, timer, timeLeft=30;

function mulaiGame(){
  document.getElementById('menuContainer').style.display='none';
  document.getElementById('gameContainer').style.display='block';
  loadLevel();
}

function loadLevel(){
  if(currentLevel>=animals.length){
    document.getElementById('gameContainer').style.display='none';
    document.getElementById('gameCompleted').style.display='block';
    return;
  }
  const animal=animals[currentLevel];
  const animalImg=document.getElementById('animalImage');
  animalImg.src=animal.image;
  animalImg.classList.remove("revealed");
  document.getElementById('guessInput').value="";
  document.getElementById('result').innerText="";
  const bubble=document.getElementById('clueBubble');
  bubble.innerText=""; bubble.classList.add("hidden");
  updateLevelDisplay();
  timeLeft=30; updateTimer();
  clearInterval(timer); timer=setInterval(countdown,1000);
}

function countdown(){ timeLeft--; updateTimer(); if(timeLeft<=0){ clearInterval(timer); document.getElementById('result').innerText="⏰ Waktu habis!"; nextLevel(); } }
function updateTimer(){ document.getElementById('timer').innerText="⏳ Waktu: "+timeLeft+" detik"; }

function updateLevelDisplay(){
  const container=document.getElementById('levelContainer'); container.innerHTML="";
  for(let i=0;i<animals.length;i++){
    const circle=document.createElement("div"); circle.classList.add("level-circle");
    if(i===currentLevel) circle.classList.add("active");
    circle.innerText=i+1;
    container.appendChild(circle);
  }
}

// Tombol Tebak
document.getElementById('guessButton').addEventListener('click',function(){
  const guess=document.getElementById('guessInput').value.trim().toLowerCase();
  const animal=animals[currentLevel];
  const correct=animal.name.toLowerCase();
  const celebration=document.getElementById('animationCelebration');

  if(guess===correct){
    document.getElementById('result').innerText="🎉 Benar! Itu "+correct.toUpperCase();
    coins+=5; document.getElementById('coins').innerText=coins;
    document.getElementById('animalImage').classList.add("revealed");

    // animasi HORE
    celebration.classList.remove("hidden");
    setTimeout(()=>{celebration.classList.add("hidden");},1000);

    clearInterval(timer); setTimeout(nextLevel,1500);
  } else {
    document.getElementById('result').innerText="❌ Salah, coba lagi!";
    coins-=1; document.getElementById('coins').innerText=coins;
  }
});

// Tombol Lewati
document.getElementById('resetButton').addEventListener('click',function(){
  coins-=2; document.getElementById('coins').innerText=coins;
  nextLevel();
});

// Bubble petunjuk menu
const menuClueButton = document.getElementById('menuClueButton');
const menuClueBubble = document.getElementById('menuClueBubble');

menuClueButton.addEventListener('click', function() {
  menuClueBubble.innerText = "💡 Tebak hewan berdasarkan gambar! Klik 'Mulai' untuk memulai permainan. Kamu akan mendapatkan koin jika menebak dengan benar, dan bisa menggunakan petunjuk jika kesulitan.";
  menuClueBubble.classList.add("visible"); // tampilkan bubble
});

menuClueBubble.addEventListener('click', function() {
  this.classList.remove("visible"); // sembunyikan saat diklik
});
