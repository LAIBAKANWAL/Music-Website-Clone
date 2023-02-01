console.log("Welcome to Spotify");

// initial variable
let songIndex = 0;
let audioElement = new Audio("songs/Bilionera.mp3");
let materPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let music_icon = document.getElementById("music_icon");
let songItems = Array.from(document.getElementsByClassName("songItems"));
let masterSongName = document.getElementById("masterSongName");
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let currentMusicTime = document.getElementById("currentTime");
let musicDuration = Array.from(document.getElementsByClassName("durationTime"));
let MainDurationTime = document.getElementById("MainDurationTime");
let currentTime = new Date();
    

let gif = document.createElement("img");
gif.src = "img/playing.gif";
gif.id= "music_icon";
let songInfo = document.getElementById("songInfo");
songInfo.insertBefore(gif,songInfo.childNodes[0]);


// song list
let songs = [
    { songName: "Otilia - Bilionera", songPath: "songs/Bilionera.mp3", CoverPath: "covers/13.jpg" },
    { songName: "Warriyo - Mortals [NCS Release]", songPath: "songs/1.mp3", CoverPath: "covers/1.jpg" },
    { songName: "DJ Snake ft. Justin Bieber - Let Me Love You", songPath: "songs/Let-Me-Love-You.mp3", CoverPath: "covers/14.jpg" },
    { songName: "Humnava Mere | Jubin Nautiyal", songPath: "songs/Humnava Mere.mp3", CoverPath: "covers/11.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]", songPath: "songs/3.mp3", CoverPath: "covers/2.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", songPath: "songs/4.mp3", CoverPath: "covers/5.jpg" },
    { songName: "Janji - Heroes Tonight [NCS Release]", songPath: "songs/7.mp3", CoverPath: "covers/9.jpg" },
    { songName: "Alan Walker - On My Way", songPath: "songs/On My Way.mp3", CoverPath: "covers/15.jpg" },
    { songName: "Runaway (Heuse Remix)", songPath: "songs/9.mp3", CoverPath: "covers/12.jpg" },
    { songName: "Invisible | Zeus X Crona", songPath: "songs/10.mp3", CoverPath: "covers/3.jpg" }
];

songs.forEach((song,i) =>{
    const audio = new Audio(song.songPath);
    audio.addEventListener('loadedmetadata', () => {
        const durationInMinutes = Math.floor(audio.duration / 60);
        const durationInSecs = Math.floor(audio.duration - durationInMinutes *60);
        musicDuration[i].innerHTML = durationInMinutes + ":" + durationInSecs
      });
})

songItems.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = songs[i].CoverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


//  Handle play/pause click
materPlay.addEventListener("click", (e) => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        materPlay.classList.remove("icon-circle-play");
        materPlay.classList.add("icon-circle-pause");
        
        songInfo.style.left = '7vw';
        gif.style.opacity = '1'
    }
    else {
        audioElement.pause();
        materPlay.classList.remove("icon-circle-pause");
        materPlay.classList.add("icon-circle-play");
        songInfo.style.left = '3.5vw';
        gif.style.opacity = '0'
        
        
    }

});

// Listen to events
audioElement.addEventListener("timeupdate", (element , i) => {

    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    progressBar.value = progress;

    // update current song time
    if(audioElement.duration){
        let curmins = Math.floor(audioElement.currentTime / 60);
        let cursecs = Math.floor(audioElement.currentTime - curmins * 60);
        let durmins = Math.floor(audioElement.duration / 60);
        let dursecs = Math.floor(audioElement.duration - durmins * 60);
    
        if(dursecs < 10){
            dursecs = "0" + dursecs;
        }
        if(durmins < 10){
            durmins = "0" + durmins;
        }
        if(curmins < 10){
            curmins = "0" + curmins;
        }
        if(cursecs < 10){
            cursecs = "0" + cursecs;
        }
        currentMusicTime.innerHTML = curmins + ":" + cursecs;
        MainDurationTime.innerHTML = durmins + ":" + dursecs;
        
    }
    else{
        currentMusicTime.innerHTML = "00" + ":" + "00";
        MainDurationTime.innerHTML = "00" + ":" + "00";
    }
    
})

progressBar.addEventListener("change", () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
       
        element.classList.add("icon-circle-play");
        element.classList.remove("icon-circle-pause");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
   
    element.addEventListener("click", (e) => {
       
        makeAllPlays();

        e.target.classList.remove("icon-circle-play");
        e.target.classList.add("icon-circle-pause");
        materPlay.classList.remove("icon-circle-play");
        materPlay.classList.add("icon-circle-pause");
        songInfo.style.left = '7vw';
        gif.style.opacity = '1'
        songIndex = i;
        audioElement.src = songs[songIndex].songPath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
    
        
        element.addEventListener("click", handlePlayButton, false);
        playVideo();
    
        async function playVideo() {
          try { 
            await audioElement.play();
        e.target.classList.remove("icon-circle-play");
        e.target.classList.add("icon-circle-pause");
        materPlay.classList.remove("icon-circle-play");
        materPlay.classList.add("icon-circle-pause");
        songInfo.style.left = '7vw';
        gif.style.opacity = '1'
          } catch (err) {
            
          }
        }
        function handlePlayButton() {
            if (audioElement.paused) {
              playVideo();
            } else {
                audioElement.pause();

                e.target.classList.add("icon-circle-play");
            e.target.classList.remove("icon-circle-pause");
        materPlay.classList.add("icon-circle-play");
        materPlay.classList.remove("icon-circle-pause");
        songInfo.style.left = '3.5vw';
        gif.style.opacity = '0';
            
          
            }
          }

    })
})



document.getElementById("previous").addEventListener("click", () => {

    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].songPath;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    songInfo.style.left = '7vw';
        gif.style.opacity = '1';
    materPlay.classList.remove("icon-circle-play");
    materPlay.classList.add("icon-circle-pause");
    e.target.classList.remove("icon-circle-play");
            e.target.classList.add("icon-circle-pause");
        
})

document.getElementById("next").addEventListener("click", () => {

    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].songPath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    songInfo.style.left = '7vw';
    gif.style.opacity = '1';
    materPlay.classList.remove("icon-circle-play");
    materPlay.classList.add("icon-circle-pause");
    e.target.classList.remove("icon-circle-play");
            e.target.classList.add("icon-circle-pause");
       
    
})

