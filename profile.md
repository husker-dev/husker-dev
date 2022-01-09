<style>
	.short-description {
		width: 100%;
		overflow: hidden !important;
		justify-content: center;
	}

	.short-description .avatar-container {
		width: 200pt;
	}

	.short-description img {
		width: 200pt;
		height: 200pt;
		display: inline-block;
		vertical-align: top;
		background: rgba(0, 0, 0, 0) !important;
		border-radius: 50%;
		object-fit: cover;

		object-position: -170px 0;

		animation-duration: 0.8s;
  		animation-name: fade;
	}

	.short-description .info-container {
		vertical-align: top;
		padding-left: 7pt !important;
		transition: all 0.3s ease;
	}

	.short-description .info-container .title {
		color: var(--color-text-1); 
		font-size: 30pt;
	}

	.short-description .info-container .subtitle {
		color: var(--color-text-3); 
		font-size: 16pt;
	}

	.short-description .info-container .location {
		margin-top: 14pt !important;
		margin-bottom: 19pt !important;
	}

	.short-description .info-container .location td {
		padding-top: 7pt !important;
	}

	.short-description .info-container .location i {
		color: var(--color-text-1); 
		text-align: center;
		width: 20pt;
	}

	.social {
		gap: 5pt; 
	}

	.social i {
		background: rgba(0, 0, 0, 0) !important;
		color: var(--color-text-3);
		font-size: 30pt;
		margin-right: 5pt;
		vertical-align: middle;
		cursor: hand;

  		transition: all 0.2s ease;
	}

	.social i:hover{
		color: var(--color-text-2);
	}

	.social-icon:hover {
		color: var(--color-text-1);
	}

	.project {
		width: 196pt !important;
		border-radius: 8pt;
		padding-bottom: 5pt;
		cursor: pointer;
		box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.14);
		background: var(--color-4);

		animation-duration: 0.8s;
  		animation-name: fade;
		transition: all 0.2s ease;
	}

	.project:hover {
		background: var(--color-5);
		transform: scale(1.015);
	}

	.project img {
		background: rgba(0, 0, 0, 0) !important;
		width: 100%;
		height: 120pt;
		object-fit: cover;
		border-radius: 10px 10px 0px 0px;
	}

	.project div:nth-of-type(1) {
		color: var(--color-text-1);
		font-size: 20pt;
		font-weight: 500;
		border-radius: 8pt; 
		margin: 8pt;
	}

	.project div:nth-of-type(2) {
		color: var(--color-text-3);
		font-size: 12pt;
		border-radius: 8pt; 
		margin: 8pt;
	}

	.featured {
		cursor: pointer;
		background: var(--color-5);
		color: var(--color-text-2);
		width: 196pt !important;
		border-radius: 5px; 
		display: flex;
    	align-items: center;
    	justify-content: center;
    	font-size: 15pt;
    	height: 50pt;
    	transition: all 0.15s ease;
	}

	.featured:hover {
		box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.10);
		transform: scale(1.01);
	}

	.language {
		background: var(--color-5);
		color: var(--color-text-2);
		width: 196pt !important;
		border-radius: 5px; 
		font-size: 15pt;

		display: flex;
    	align-items: center;

		animation-duration: 0.8s;
  		animation-name: fade;
	}

	.language img {
		margin: 5pt 0pt 5pt 10pt;
		width: 50pt; 
		height: 50pt;
		background: rgba(0, 0, 0, 0) !important;
		border-radius: 5px;
		object-fit: scale-down;
	}

	.language a {
		margin-left: 20pt;
		color: var(--color-text-1);
	}
</style>

<div class="short-description table">
	<div class="avatar-container">
		<img src="resources/avatar.jpg"/>
	</div>
	<div class="info-container">
		<div class="title">Nikita Shtengauer <a class="subtitle">aka Husker</a></div>
		<div class="subtitle">Java Desktop developer</div>
		<table class="transparent-table location">
			<tr>
				<td><i class="fas fa-map-marker-alt"></i></td>
				<td>
					Russia, Karelia, Kostomuksha<br/>
					Russia, Saint Petersburg
				</td>
			</tr>
			<tr>
				<td><i class="far fa-envelope"></td>
				<td><a href="mailto:redfancoestar@gmail.com" class="transparent-link">redfancoestar@gmail.com</a></td>
			</tr>
			<tr>
				<td><i class="fab fa-discord"></td>
				<td>Husker<span style="color: var(--color-text-3)">#7956</span></td>
			</tr>
		</table>
		<div class="social table noselect" style="justify-content: space-around">
			<a target="_blank" href="https://vk.com/shtengauer_nikita"><i class="fab fa-vk"></i></a>
			<a target="_blank" href="https://github.com/husker-dev"><i class="fab fa-github"></i></a>
			<a target="_blank" href="https://www.reddit.com/user/Husker___"><i class="fab fa-reddit"></i></a>
			<a target="_blank" href="https://steamcommunity.com/id/Husker41/"><i class="fab fa-steam"></i></a>
			<a target="_blank" href="https://www.youtube.com/channel/UC-g8GtCo3uksikWi9dwjw3w"><i class="fab fa-youtube"></i></a>
			<a target="_blank" href="https://open.spotify.com/user/i8fal2tft42g83r4uzqrnax7d"><i class="fab fa-spotify"></i></a>
			<a target="_blank" href="https://instagram.com/shtengauer_nikita"><i class="fab fa-instagram"></i></a>
		</div>
	</div>
</div>

<div class="page-separator-close"></div>

# About

Hi, my name is Nikita, and I am a programmer (what a surprise). I am from a small Finnish town in Russia - Kostomuksha. I have been programming in Java since 2015. For all the time I managed to use a huge number of other languages, such as C#, Python or C++. But at the moment, Kotlin is the main one. I prefer to create desktop programs. It means no Spring or other backend frameworks.

# Featured
<div class="table-triple">
	<div class="featured noselect" onmousedown="selectPage('profile/music')">Music</div>
	<div class="featured noselect" onmousedown="selectPage('profile/books')">Books</div>
	<div class="featured noselect" onmousedown="selectPage('profile/videos')">Videos</div>
	<div class="featured noselect" onmousedown="selectPage('profile/games')">Games</div>
</div>

# Main projects
<div class="table-triple noselect">
	<div class="project" onmousedown="selectPage('projects/openglfx')">
		<img src="resources/projects/openglfx/preview.jpg">
		<div>OpenGLFX</div>
		<div>OpenGL implementation for JavaFX, that uses LWJGL or JOGL</div>
	</div>
	<div class="project" onmousedown="selectPage('projects/minui')">
		<img src="resources/projects/minui/preview.jpg">
		<div>MinUI</div>
		<div>Lightweight crossplatform UI framework for Kotlin/Java</div>
	</div>
	<div class="project" onmousedown="selectPage('projects/launcher')">
		<img src="resources/projects/launcher/preview.jpg">
		<div>Minecraft Launcher</div>
		<div>Beautiful Minecraft launcher wtitten in Kotlin</div>
	</div>
	<div class="project" onmousedown="selectPage('projects/nativejava')">
		<img src="resources/projects/nativejava/preview.jpg">
		<div>Java Native Plugin</div>
		<div>Gradle plugin for native Java compilation using GraalVM</div>
	</div>
</div>
<br/>

# Languages
<div class="table-triple">
	<div class="language">
		<img src="resources/languages/kotlin.png"/>
		<a>Kotlin</a>
	</div>
	<div class="language">
		<img src="resources/languages/java.png"/>
		<a>Java</a>
	</div>
	<div class="language">
		<img src="resources/languages/cs.png"/>
		<a>C#</a>
	</div>
	<div class="language">
		<img src="resources/languages/cpp.png"/>
		<a>C++</a>
	</div>
	<div class="language">
		<img src="resources/languages/python.png"/>
		<a>Python</a>
	</div>
	<div class="language">
		<img src="resources/languages/groovy.png"/>
		<a>Groovy</a>
	</div>
	<div class="language">
		<img src="resources/languages/pascal.png"/>
		<a>Pascal</a>
	</div>
	<div class="language">
		<img src="resources/languages/html.png"/>
		<a>Html</a>
	</div>
	<div class="language">
		<img src="resources/languages/javascript.png"/>
		<a>Java Script</a>
	</div>
	<div class="language">
		<img src="resources/languages/arduino.png"/>
		<a>Arduino</a>
	</div>
	<div class="language">
		<img src="resources/languages/php.png"/>
		<a>PHP</a>
	</div>
	<div class="language">
		<img src="resources/languages/brainfuck.png"/>
		<a>Brainfuck</a>
	</div>
</div>