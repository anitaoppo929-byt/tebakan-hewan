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
document.getElementById('menuClueButton').addEventListener('click',function(e){
  const bubble=document.getElementById('menuClueBubble');
  bubble.innerText="💡 Tebak hewan berdasarkan gambar yang muncul! Klik 'Mulai' untuk memulai.";
  bubble.classList.remove("hidden"); bubble.classList.add("visible");
  
  const rect=e.target.getBoundingClientRect();
  bubble.style.left=rect.left+"px";
  bubble.style.top=(rect.bottom+10)+"px"; // bubble di bawah tombol
});

document.getElementById('menuClueBubble').addEventListener('click',function(){
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

// (Fungsi loadLevel, countdown, guessButton, resetButton, clueButton, bubble, dll)
// Bisa sama seperti versi sebelumnya dengan bubble clue game

