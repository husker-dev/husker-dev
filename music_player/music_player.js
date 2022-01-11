var player_currently_playing = 0;
var audio_currently_playing = 0;

class MusicPlayer extends HTMLElement {

	constructor(){
		super();
		let src = this.getAttribute('src');
		let title = this.getAttribute('title');
		let image = this.hasAttribute('image') ? this.getAttribute('image') : src.replace('.mp3', '.jpg');
		let singer = this.getAttribute('singer');

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
					<div id="player_progress_duration" class="noselect">0:00</div>
				</div>
			</div>
		`;
		const instance = this;

		var isPlaying = false;
		var isMouseDown = false;

		const duration = this.querySelector("#player_progress_duration");
		const audio = new Audio(src);
		const play_button = this.querySelector("#player_play_button");
		const player_information = this.querySelector("#player_information");
		const progress = this.querySelector("#player_progress");
		const progress_full = this.querySelector("#player_progress_full");
		const progress_current = this.querySelector("#player_progress_current");
		const progress_slider = this.querySelector("#player_progress_slider");

		audio.preload = 'auto';
		audio.volume = 0.3;
		audio.onloadeddata = updateTime;
		audio.onloadedmetadata = updateTime;
		audio.ontimeupdate = (event) => {
			var percent = audio.currentTime / audio.duration * 100;
			progress_current.style.width = `${percent}%`;
			progress_slider.style.left = `${percent}%`;
			updateTime();
		}
		audio.onplaying = function() {
	  		isPlaying = true;
	  		updatePlaying();
		};
		audio.onpause = function() {
	  		isPlaying = false;
	  		updatePlaying();
		};
		audio.src = src;

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
			if(audio_currently_playing && audio_currently_playing !== audio){
				audio_currently_playing.pause();
				player_currently_playing.classList.remove("player_selected");
			}
			audio_currently_playing = audio;
			player_currently_playing = instance;
			player_currently_playing.classList.add("player_selected");

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
			var time = audio.duration;
			if(isPlaying)
				time = audio.currentTime;
			var minutes = parseInt(time / 60);
			var seconds = parseInt(time % 60);
			if(seconds < 0)
				setPercent(0);
			duration.innerHTML = `${minutes}:${seconds < 10 ? ('0'+seconds) : seconds}`;
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
			updateTime();
		}

		function setClickable(element){
			element.addEventListener("mouseenter", function(){
				instance.classList.add("player_hover");
			});
			element.addEventListener("mouseleave", function(){
				instance.classList.remove("player_hover");
			});
			element.addEventListener("click", function(){
				togglePlay();
			});
		}

		setClickable(play_button);
		setClickable(player_information);
	}
}

window.customElements.define('music-player', MusicPlayer);