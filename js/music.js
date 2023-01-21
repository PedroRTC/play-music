let containerMusic = document.querySelector(".containerMusic");
let audioPrincipal = document.querySelector("#audioPrincipal");
let buttonPrincipal = document.querySelector(".buttonPrincipal");
let minutosPrincipal = document.querySelector(".minutosPrincipal");
let segundosPrincipal = document.querySelector(".segundosPrincipal");
let interval;
let segundosN = 0;
let minutosN = 0;

let todasMusic = [];

function fetchJson(url) {
  return fetch(url).then((response) => {
    return response.json();
  });
}

async function RespMusic() {
  todasMusic = await fetchJson(`http://127.0.0.1:5500/music.json`);
  geraMusic();
}

RespMusic();

function geraMusic() {
  todasMusic.map((item) => {
    let music = document.createElement("section");
    let nomeMusic = document.createElement("p");
    let favoritas = document.createElement("span");
    nomeMusic.textContent = item.nome;
    favoritas.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';

    music.classList.add("music");

    nomeMusic.classList.add("nomeMusic");
    favoritas.classList.add("favoritas");

    music.appendChild(nomeMusic);
    music.appendChild(favoritas);

    containerMusic.appendChild(music);

    music.addEventListener("click", () => reproduzir(item, nomeMusic));
    music.addEventListener("click", () => selectionItem(music));
  });
}

function reproduzir(item, nomeMusic) {
  audioPrincipal.src = item.audio;
  clearInterval(interval)
  minutosN=0
  segundosN=0

  playMusic();
  nomeMusic.style.transform = "translate(-45%)";
  setInterval(() => {
    nomeMusic.style.transform = "translate(0%)";
    
    
  }, 5000);

  buttonPrincipal.addEventListener("click", pauseP);

  function pauseP() {
    pauseMusic();
    buttonPrincipal.removeEventListener("click", pauseP);
    buttonPrincipal.addEventListener("click", playP);
  }

  function playP() {
    clearInterval(interval)
    playMusic();
    buttonPrincipal.addEventListener("click", pauseP);
    buttonPrincipal.removeEventListener("click", playP);
  }
}

function playMusic() {
  audioPrincipal.play();
  buttonPrincipal.classList.remove("fa-play");
  buttonPrincipal.classList.add("fa-pause");

  interval = setInterval(() => {
    
   
      

     if(segundosN < 9){
      segundosN++
      segundosPrincipal.textContent = `0${segundosN}`
     }else{
      segundosN++
      segundosPrincipal.textContent = segundosN
     }
    
   
      
    
   

    if (segundosN > 59) {
      segundosN = 0;
      minutosN++;
      minutosPrincipal.textContent = minutosN;
    }

    if (minutosN < 10) {
      minutosPrincipal.textContent = `0${minutosN}`;
    }
  }, 1000);
}

function pauseMusic() {
  buttonPrincipal.classList.add("fa-play");
  buttonPrincipal.classList.remove("fa-pause");
  audioPrincipal.pause();
  clearInterval(interval);
}

function selectionItem(music) {
  music.setAttribute("id", "selection");

  music.addEventListener("click", removeSelection(music));
}

function removeSelection(music) {
  let selection = document.querySelector("#selection");
  let m = document.querySelectorAll(".music");

  if (selection) {
    for (const iterator of m) {
      iterator.removeAttribute("id", "selection");
      music.setAttribute("id", "selection");
    }
  }
}
