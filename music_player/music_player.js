var player_currently_playing = 0;
var audio_currently_playing = 0;
var audio_volume = 0.5;

var player_svg_bars = `
<svg id="player_play_anim" width="135" height="140" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="#f0f0f0">
    <rect y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.5s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.5s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="30" y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.25s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.25s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="60" width="15" height="140" rx="6">
        <animate attributeName="height"
             begin="0s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="90" y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.25s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.25s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
    <rect x="120" y="10" width="15" height="120" rx="6">
        <animate attributeName="height"
             begin="0.5s" dur="1s"
             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
             repeatCount="indefinite" />
        <animate attributeName="y"
             begin="0.5s" dur="1s"
             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
             repeatCount="indefinite" />
    </rect>
</svg>
`;

function isDesktop() {
	return !navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
};

class MusicPlayer extends HTMLElement {

	audio = 0;

	constructor(){
		super();
		let src = this.getAttribute('src');
		let title = this.getAttribute('name');
		let image = this.hasAttribute('image') ? this.getAttribute('image') : src.replace('.mp3', '.jpg');
		let singer = this.getAttribute('singer');

		this.innerHTML = `
			<div id="player_image_container">
				<img id="player_logo" src="${image}" class="noselect" onerror="this.onerror=null;this.src='music_player/empty.png';"/>
				<div id="player_logo_dark"></div>
				<i id="player_play_button" class="fas fa-play noselect"></i>
				${player_svg_bars}
			</div>
			<div id="player_information_container">
				<div id="player_head">
					<div id="player_information">
						<div id="player_title">${title}</div>
						<div id="player_singer">${singer}</div>
					</div>
					<div id="player_volume" class="noselect" ${isDesktop()? ``: `style="opacity: 0"`}>
						<i class="fas fa-volume-up"></i>
						<div id="player_volume_bar">
							<div id="player_volume_full"></div>
							<div id="player_volume_current"></div>
						</div>
					</div>
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
		var isVolumeMouseDown = false;

		const duration = this.querySelector("#player_progress_duration");
		const audio = new Audio(src);
		this.audio = audio;
		const play_button = this.querySelector("#player_play_button");
		const player_information = this.querySelector("#player_information");
		const progress = this.querySelector("#player_progress");
		const progress_full = this.querySelector("#player_progress_full");
		const progress_current = this.querySelector("#player_progress_current");
		const progress_slider = this.querySelector("#player_progress_slider");

		const volume = this.querySelector("#player_volume");
		const volume_bar = this.querySelector("#player_volume_bar");
		const volume_current = this.querySelector("#player_volume_current");

		audio.preload = 'metadata';
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

		// Progress
		progress.onmousedown = (event) => {
			if(!isPlaying)
				return;
			var hitbox = progress_full.getBoundingClientRect();

			setProgress((event.x - hitbox.x) / hitbox.width);
			isMouseDown = true;
		}
		document.addEventListener("mouseup", (event) => {
			isMouseDown = false;
		});
		document.addEventListener("mousemove", (event) => {
			if(isMouseDown){
				var hitbox = progress_full.getBoundingClientRect();
				setProgress((event.x - hitbox.x) / hitbox.width);
			}
		});

		// Volume
		volume.onmouseenter = (event) => {
			setVolume(audio_volume);
		}
		volume_bar.onmousedown = (event) => {
			var hitbox = volume_bar.getBoundingClientRect();
			setVolume((event.x - hitbox.x) / hitbox.width);
			isVolumeMouseDown = true;
		}
		document.addEventListener("mouseup", (event) => {
			isVolumeMouseDown = false;
		});
		document.addEventListener("mousemove", (event) => {
			if(isVolumeMouseDown){
				var hitbox = volume_bar.getBoundingClientRect();
				setVolume((event.x - hitbox.x) / hitbox.width);
			}
		});

		// Functions
		function setVolume(percent){
			if(percent > 1)
				percent = 1;
			if(percent < 0)
				percent = 0;
			audio_volume = percent;
			audio.volume = percent;
			if(percent != 0)
				volume_current.style.width = `${percent * 100}%`;
			
		}

		function togglePlay(){
			if(audio_currently_playing && audio_currently_playing !== audio){
				audio_currently_playing.pause();
				player_currently_playing.classList.remove("player_selected");
			}
			audio_currently_playing = audio;
			player_currently_playing = instance;
			player_currently_playing.classList.add("player_selected");

			audio.volume = audio_volume;
			if(isPlaying) audio.pause();
			else audio.play();
		}

		function setProgress(percent){
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
				setProgress(0);
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

	disconnectedCallback() {
		this.audio.pause();
	}
}

window.customElements.define('music-player', MusicPlayer);