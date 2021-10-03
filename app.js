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
const songList = document.querySelector(".song-list");

// loading
setTimeout(()=>{
	loading.remove();
},5000);

// songs titles
const songs = [
	"Hey there Delilah",
	"Euta manche ko maya le kati",
	"Galti hazar hunchan",
	"Yellow",
	"Maneskin - Beggin",
    "driver license"
];

//track song
let songIndex = 0;

// loading song info in DOM
loadSong(songs[songIndex]);

// loading song info in DOM
for (let i = 0; i < songs.length; i++) {
    const song = songs[i];

    const li = document.createElement("li");
    li.innerText = song;

    li.onclick = () => {
        document.querySelector(".red-text").classList.remove("red-text")
        li.classList.add("red-text")
        songIndex = i;
		loadSong(songs[songIndex]);
        playSong();
    }

    if (i === 0) {
        li.classList.add("red-text")
    }

    songList.appendChild(li)
}

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
	if (songIndex < 5) {
		songIndex++;
		loadSong(songs[songIndex]);
	} else {
		songIndex = 0;
		loadSong(songs[songIndex]);
	}

    songList.innerHTML = "";

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
    
        const li = document.createElement("li");
        li.innerText = song;

        li.onclick = () => {
            document.querySelector(".red-text").classList.remove("red-text")
            li.classList.add("red-text")
            songIndex = i;
            loadSong(songs[songIndex]);
            playSong();
        }
    
        if (i === songIndex) {
            li.classList.add("red-text")
        }
    
        songList.appendChild(li)
    }
	playSong();
}

function prevSong() {
	if (songIndex > 0) {
		songIndex--;
		loadSong(songs[songIndex]);
	} else {
		songIndex = 5;
		loadSong(songs[songIndex]);
	}
    
    songList.innerHTML = "";

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
    
        const li = document.createElement("li");
        li.innerText = song;

        li.onclick = () => {
            document.querySelector(".red-text").classList.remove("red-text")
            li.classList.add("red-text")
            songIndex = i;
            loadSong(songs[songIndex]);
            playSong();
        }
    
        if (i === songIndex) {
            li.classList.add("red-text")
        }
    
        songList.appendChild(li)
    }
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
