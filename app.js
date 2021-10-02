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
const shuffleButton = document.querySelector('#shuffle');
let isShuffle = false;
let playedIndex = [];
let shuffledSongs = [];
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

    if (!isShuffle) {
        if (songIndex < 4) {
            songIndex++;
            loadSong(songs[songIndex]);
        } else {
            songIndex = 0;
            loadSong(songs[songIndex]);
        }
    } else {
        if (playedIndex.length === songs.length) {
            playedIndex = [playedIndex.pop(4)];
        }

        for (let i = 0; i < shuffledSongs.length; i++) {
            const index = songs.indexOf(shuffledSongs[i])
            if (!playedIndex.includes(index)) {
                songIndex = index;
                loadSong(songs[index]);
                playedIndex.push(index)
                break;
            }
        }

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
    if (!isShuffle) {
        if (songIndex > 0) {
            songIndex--;
            loadSong(songs[songIndex]);
        } else {
            songIndex = 4;
            loadSong(songs[songIndex]);
        }
    }else{
        if(playedIndex.length == 0)
            return;

        songIndex = playedIndex[playedIndex.length -2];
        playedIndex.pop(playedIndex - 1);
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

function shufflePlaylist(playlist) {
    let currentIndex = playlist.length, randomIndex;
    const newList = [...playlist];

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newList[currentIndex], newList[randomIndex]] = [newList[randomIndex], newList[currentIndex]];
    }

    return newList;
}



shuffleButton.addEventListener('click', function () {
    isShuffle = !isShuffle;
    if (isShuffle) {
        const songEl = document.getElementsByClassName('song-list')[0].children;

        shuffledSongs = shufflePlaylist(songs)
        shuffleButton.classList.add('shuffle-active');
        for (let i = 0; i < songEl.length; i++) {
            if (songEl[i].textContent == shuffledSongs[0]) {
                songEl[i].click();
                playedIndex = [i];
                break;
            }
        }
    }else{
        shuffleButton.classList.remove('shuffle-active');
    }
})



//change songs
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
song.addEventListener("ended", nextSong);
