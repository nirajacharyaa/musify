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
const randomBtn = document.querySelector("#random");
const repeatBtn = document.querySelector("#repeat");

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

//track song
let songIndex = 0;

//Check random button of music player
let randomMode = 0;

//Check repeat button of music player
let repeatMode = 0;

// loading song info in DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(songName) {
	title.innerText = songName;
	song.src = `songs/${songName}.mp3`;
	cover.src = `images/${songName}.jpg`;
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
	playSong();
}


function randomSongUtil() {
	const totalSongs = songs.length;
	let newSongIndex = Math.floor(Math.random() * totalSongs);
	while (newSongIndex == songIndex) {
		newSongIndex = Math.floor(Math.random() * totalSongs);
	}
	songIndex = newSongIndex;
	loadSong(songs[songIndex]);
	playSong();
}


function repeatSongUtil() {
	loadSong(songs[songIndex]);
	playSong();
}

function randomSong() {
	if (randomMode == 0) {
		randomBtn.querySelector("i.fa").classList.add("fa-expand-arrows-alt");
		randomBtn.querySelector("i.fa").classList.remove("fa-random");

		repeatBtn.querySelector("i.fa").classList.add("fa-redo-alt");
		repeatBtn.querySelector("i.fa").classList.remove("fa-redo");
		randomMode = 1;
		repeatMode = 0;
	} else {
		randomBtn.querySelector("i.fa").classList.add("fa-random");
		randomBtn.querySelector("i.fa").classList.remove("fa-expand-arrows-alt");
		randomMode = 0;
	}
}

function repeatSong() {
	if (repeatMode == 0) {
		randomBtn.querySelector("i.fa").classList.add("fa-random");
		randomBtn.querySelector("i.fa").classList.remove("fa-expand-arrows-alt");

		repeatBtn.querySelector("i.fa").classList.add("fa-redo-alt");
		repeatBtn.querySelector("i.fa").classList.remove("fa-redo");
		randomMode = 0;
		repeatMode = 1;

	} else {
		repeatBtn.querySelector("i.fa").classList.add("fa-redo");
		repeatBtn.querySelector("i.fa").classList.remove("fa-redo-alt");
		repeatMode = 0;
	}
}

function checkMode() {
	if (repeatMode == 0 && randomMode == 1) {
		randomSongUtil();
	} else if (repeatMode == 1 && randomMode == 0) {
		repeatSongUtil();
	} else {
		nextSong();
	}
}

function updateProgress(e) {
	const {
		duration,
		currentTime
	} = e.srcElement;
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
randomBtn.addEventListener("click", randomSong);
repeatBtn.addEventListener("click", repeatSong);
song.addEventListener("ended", checkMode)
