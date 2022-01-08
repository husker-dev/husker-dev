<script>
	function onPageLoad(){
		addArtist("AsperX", "asperx", "46hLf3g8XwZAeFq4BCFEAO", "3lDAqTHSTQ9sZEKjfLz553", "4gCuolsVspXZFan2Z3Yqi1");
		addArtist("Лжедмитрий IV", "ljedmitry", "0saj0sp5KNIrhukoKG97k1", "3PHl2aox68MHBzBElkw2uo", "5OjDL2xOsa5S0YDfOw3EsM");
		addArtist("Lodoss", "lodoss", "2X8G6hcWfiU4xDviZQNcEA", "06H4sWjMnKxAfrmYJfUo9m", "7FvP74YMkBOVkRBUo1AT2b");
		addArtist("Обстоятельства", "obstoyatelstva", "4FKFBtpUimihqJS6Dcidjk", "0xY4lXjfxOHzgkVhE0pqVJ", "02vHDkck9uQjZnYuEpGoOK");
		addArtist("ZOLOTO", "zoloto", "3JSYOR5ADA4YtkzsSaUxyg", "33roBRBTQ72Y197lGC6yh9", "478X2PsSMONBOJF9q2L6u2");
		addArtist("Jubilee", "jubilee", "0ylzhZTuxB8E3cPtD7olds", "3P9QKSJtcBG9kBfKouZo7y", "2nc9ansSnAOttVlo2MWZA2");
	}

	function addArtist(name, id, mus1, mus2, mus3){
		findById("artists").innerHTML += `
			<div class="artist table">
				<img src="resources/profile/${id}.jpg" />
				<div>
					<h1 id="${id}">${name}</h1>
					<iframe src="https://open.spotify.com/embed/track/${mus1}?utm_source=generator&theme=0" width="400px" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" class="music" onload="spotify(this)"></iframe>
					<iframe src="https://open.spotify.com/embed/track/${mus2}?utm_source=generator&theme=0" width="400px" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" class="music"></iframe>
					<iframe src="https://open.spotify.com/embed/track/${mus3}?utm_source=generator&theme=0" width="400px" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" class="music"></iframe>
				</div>
			</div>
			<hr/>
		`
	}

	function spotify(frame){
		var css = "";
		console.log(frame.contentWindow.document);
	}
</script>

<style>

.artist {
	gap: 5pt 30pt;
	justify-content: center;
}

.artist img {
	width: 260pt;
	height: 260pt;
	display: inline-block;
	vertical-align: top;
	background: rgba(0, 0, 0, 0) !important;
	border-radius: 50%;
	object-fit: cover;
	animation-duration: 0.8s;
	animation-name: fade;
}

.artist h1 {
	font-size: 34pt !important;
	margin-bottom: 0pt !important;
	margin-top: 0pt !important;
}

.artist div {
	width: 270pt;
}

.music {
	border-radius: 7px;
	margin-bottom: 8pt;
	width: 100%;
}

</style>

# About

My favorite genre of music is **pop**, **rock** and **rap**. 

I listen to a lot of singers, but I would like to show the most important ones here. They are associated with certain periods of my life. 

So, I wish you enjoy it. 

<div class="page-separator-close"></div>
<br/>
<div id="artists"></div>
