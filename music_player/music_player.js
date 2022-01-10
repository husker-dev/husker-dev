var player_currently_playing = 0;

class MusicPlayer extends HTMLElement {

	constructor(){
		super();
		let src = this.getAttribute('src');
		let title = this.getAttribute('title');
		let image = this.hasAttribute('image') ? this.getAttribute('image') : src.replace('.mp3', '.jpg');
		let singer = this.getAttribute('singer');

		let tmpl = document.createElement('template');
		this.innerHTML = `
			<div id="player_image_container">
				<img id="player_logo" src="${image}" class="noselect"/>
				<i id="player_play_button" class="fas fa-play noselect"></i>
			</div>
			<div id="player_information_container">
				<div id="player_information">
					<div id="player_title">${title}</div>
					<div id="player_singer">${singer}</div>
				</div>
				<div id="player_progress">
					<div id="player_progress_bar">
						<div id="player_progress_full"></div>
						<div id="player_progress_current"></div>
						<i id="player_progress_slider" class="fas fa-circle"></i>
					</div>
					<div id="player_progress_duration" class="noselect">-0:00</div>
				</div>
			</div>
		`;
		var instance = this;

		var isPlaying = false;
		var isMouseDown = false;

		var duration = this.querySelector("#player_progress_duration");
		var audio = new Audio(src);
		var play_button = this.querySelector("#player_play_button");
		var progress = this.querySelector("#player_progress");
		var progress_full = this.querySelector("#player_progress_full");
		var progress_current = this.querySelector("#player_progress_current");
		var progress_slider = this.querySelector("#player_progress_slider");

		audio.preload = 'auto';
		audio.volume = 0.5;
		audio.onloadeddata = (event) => {
			updateTime();
		};
		audio.onloadedmetadata = (event) => {
			updateTime();
		};
		audio.ontimeupdate = (event) => {
			var percent = audio.currentTime / audio.duration * 100;
			progress_current.style.width = `${percent}%`;
			progress_slider.style.left = `${percent}%`;
			updateTime();
		}
		audio.src = src;
		audio.onplaying = function() {
	  		isPlaying = true;
	  		updatePlaying();
		};
		audio.onpause = function() {
	  		isPlaying = false;
	  		updatePlaying();
		};

		play_button.onclick = togglePlay;

		progress.onmousedown = (event) => {
			if(!isPlaying)
				return;
			var hitbox = progress_full.getBoundingClientRect();

			setPercent((event.x - hitbox.x) / hitbox.width);
			isMouseDown = true;
		}
		document.addEventListener("mouseup", (event) => {
			isMouseDown = false;
		});

		document.addEventListener("mousemove", (event) => {
			if(isMouseDown){
				var hitbox = progress_full.getBoundingClientRect();
				setPercent((event.x - hitbox.x) / hitbox.width);
			}
		});

		function togglePlay(){
			if(player_currently_playing && player_currently_playing !== audio)
				player_currently_playing.pause();
			player_currently_playing = audio;

			if(isPlaying) audio.pause();
			else audio.play();
		}

		function setPercent(percent){
			if(audio.duration)
				audio.currentTime = Math.floor(audio.duration * percent);
		}

		function updateTime(){
			if(!audio.duration)
				return;
			var time = audio.duration - audio.currentTime;
			var minutes = Math.floor(time / 60);
			var seconds = Math.ceil(time % 60)-1;
			if(seconds < 0)
				setPercent(0);
			duration.innerHTML = `-${minutes}:${seconds < 10 ? ('0'+seconds) : seconds}`;
		}

		function updatePlaying(){
			if(isPlaying){
				instance.classList.add("player_playing");
				play_button.classList.remove("fa-play");
				play_button.classList.add("fa-pause");
			}else{
				instance.classList.remove("player_playing");
				play_button.classList.add("fa-play");
				play_button.classList.remove("fa-pause");
			}
		}
	}


}

window.customElements.define('music-player', MusicPlayer);