const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const song = document.querySelector("#song");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector(".music-cover");
const loading = document.querySelector(".loading");

// loading
setTimeout(() => {
  loading.remove();
}, 5000);

// songs titles
const songs = [
  "Hey there Delilah",
  "Euta manche ko maya le kati",
  "Galti hazar hunchan",
  "Yellow",
  "Maneskin - Beggin",
];

//colours for different backgrounds
const colors = {
  yellow: [255, 255, 0],
  gold: [255, 215, 0],
  red: [255, 0, 0],
  white: [255, 255, 255],
  dodger_blue: [30, 144, 255],
  light_sky_blue: [135, 206, 250],
  medium_sea_green: [60, 179, 113],
  pale_green: [152, 251, 152],
  firebrick: [178, 34, 34],
  coral: [255, 127, 80],
};

//track song
let songIndex = 0;
//colours for background
let color1, color2;

//change background image song wise
function assignBackgroundImage() {
  switch (songIndex) {
    case 0:
      color1 = "rgb(" + colors.light_sky_blue.join(", ") + ")";
      color2 = "rgb(" + colors.dodger_blue.join(", ") + ")";
      break;
    case 1:
      color1 = "rgb(" + colors.pale_green.join(", ") + ")";
      color2 = "rgb(" + colors.medium_sea_green.join(", ") + ")";
      break;
    case 2:
      color1 = "rgb(" + colors.coral.join(", ") + ")";
      color2 = "rgb(" + colors.firebrick.join(", ") + ")";
      break;
    case 3:
      color1 = "rgb(" + colors.yellow.join(", ") + ")";
      color2 = "rgb(" + colors.gold.join(", ") + ")";
      break;
    case 4:
      color1 = "rgb(" + colors.white.join(", ") + ")";
      color2 = "rgb(" + colors.red.join(", ") + ")";
      break;
  }
}

// loading song info in DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(songName) {
  title.innerText = songName;
  song.src = `songs/${songName}.mp3`;
  cover.src = `images/${songName}.jpg`;
  assignBackgroundImage();
  document.body.style.background = `linear-gradient(0deg, ${color1} 23.8%, ${color2} 92%)`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa").classList.remove("fa-play");
  playBtn.querySelector("i.fa").classList.add("fa-pause");
  song.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa").classList.add("fa-play");
  playBtn.querySelector("i.fa").classList.remove("fa-pause");
  song.pause();
}

function nextSong() {
  if (songIndex < 4) {
    songIndex++;
    loadSong(songs[songIndex]);
  } else {
    songIndex = 0;
    loadSong(songs[songIndex]);
  }
  nextBtn.querySelector("i.fa").classList.add("click-highlight");
  setTimeout(() => {
    nextBtn.querySelector("i.fa").classList.remove("click-highlight");
  }, 500);
  playSong();
}

function prevSong() {
  if (songIndex > 0) {
    songIndex--;
    loadSong(songs[songIndex]);
  } else {
    songIndex = 4;
    loadSong(songs[songIndex]);
  }
  prevBtn.querySelector("i.fa").classList.add("click-highlight");
  setTimeout(() => {
    prevBtn.querySelector("i.fa").classList.remove("click-highlight");
  }, 500);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = song.duration;

  song.currentTime = (clickX / width) * duration;
}

//event listeners

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//change songs
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
song.addEventListener("ended", nextSong);
