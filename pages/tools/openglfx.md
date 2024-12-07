<style>
	.config > .title{
		font-size: 20pt;
		border-bottom: 2px solid var(--color-text-3);
		margin-bottom: 7pt;
		margin-right: 10pt;
	}

	.config > div:not(.title){
		margin-bottom: 4pt;
	}

	.config > label {
		font-size: 12pt;
	}

	.invisible {
		display: none;
	}
</style>
<script>
	function hasNavigation() { return false; }

	var version = "[load error]"

	function onPageLoad(){
		loadURLContent("https://api.github.com/repos/husker-dev/openglfx/releases/latest", text => {
			version = JSON.parse(text)["tag_name"];
			updateCode();
		})
	}

	var maven_dependency = 
`<dependency>
    <groupId>com.huskerdev</groupId>
    <artifactId>openglfx-$module</artifactId>
    <version>$version</version>
</dependency>`

	var gradle_dependency = 
`dependencies {
    // implementation JavaFX
    // implementation $module
    // ...

    implementation 'com.huskerdev:openglfx-$module:$version'
}`
	
	var sbt_dependency = 
`// libraryDependencies += JavaFX
// libraryDependencies += $module
// ...

libraryDependencies += "com.huskerdev" % "openglfx-$module" % "$version"`

	var java_example = 
`GLCanvas canvas = new GLCanvas($module);

canvas.addOnInitializeEvent(event -> {
    $getter
});
canvas.addOnReshapeEvent(event -> {
    $getter
});
canvas.addOnRenderEvent(event -> {
    $getter
});
canvas.addOnDisposeEvent(event -> {
    $getter
});`

	var kotlin_example =
`val canvas = GLCanvas($module)

canvas.addOnInitializeEvent { event ->
    $getter
}
canvas.addOnReshapeEvent { event ->
    $getter
}
canvas.addOnRenderEvent { event ->
    $getter
}
canvas.addOnDisposeEvent { event ->
    $getter
}`

	var java_example_libgdx = `LibGDXCanvas canvas = new LibGDXCanvas(new MyApplicationAdapter());`
	var kotlin_example_libgdx = `val canvas = LibGDXCanvas(MyApplicationAdapter())`

	function updateCode(radio){
		const lwjgl = findById("radio_lwjgl");
		const lwjgl2 = findById("radio_lwjgl2");
		const jogl = findById("radio_jogl");
		const libgdx = findById("radio_libgdx");

		const gradle = findById("radio_gradle");
		const block_gradle = findById("gradle-block");
		const code_gradle = block_gradle.querySelector('#groovy-code');

		const maven = findById("radio_maven");
		const block_maven = findById("maven-block");
		const code_maven = block_maven.querySelector('#maven-code');

		const sbt = findById("radio_sbt");
		const block_sbt = findById("sbt-block");
		const code_sbt = block_sbt.querySelector('#sbt-code');

		const kotlin = findById("radio_kotlin");
		const block_kotlin = findById("kotlin-block");
		const code_kotlin = block_kotlin.querySelector('#kotlin-code');

		const java = findById("radio_java");
		const block_java = findById("java-block");
		const code_java = block_java.querySelector('#java-code');

		if((lwjgl.checked || lwjgl2.checked || jogl.checked || libgdx.checked) && (gradle.checked || maven.checked || sbt.checked) && (kotlin.checked || java.checked)){
			const mavenModule = 
				lwjgl.checked ? "lwjgl" :
				lwjgl2.checked ? "lwjgl2" :
				jogl.checked ? "jogl" :
				libgdx.checked ? "lwjgl, gdx-backend-lwjgl3, gdx-platform:natives-desktop" :
				"null";

			const executorClass = 
				lwjgl.checked ? "LWJGLExecutor" :
				lwjgl2.checked ? "LWJGL2Executor" :
				jogl.checked ? "JOGLExecutor" :
				libgdx.checked ? "LibGDXExecutor" :
				"GLExecutor";

			const executorModule = 
				lwjgl.checked ? "LWJGL_MODULE" :
				lwjgl2.checked ? "LWJGL2_MODULE" :
				jogl.checked ? "JOGL_MODULE" :
				libgdx.checked ? "LIBGDX_MODULE" :
				"NONE_MODULE";
			
			const isGradle = gradle.checked;
			const isMaven = maven.checked;
			const isKotlin = kotlin.checked;

			if(isGradle){
				block_gradle.classList.remove("invisible");
				block_maven.classList.add("invisible");
				block_sbt.classList.add("invisible");

				putCode(code_gradle, "groovy", gradle_dependency
					.replaceAll("$module", mavenModule)
					.replaceAll("$version", version)
				);
			}else if(isMaven){
				block_gradle.classList.add("invisible");
				block_maven.classList.remove("invisible");
				block_sbt.classList.add("invisible");

				putCode(code_maven, "xml", maven_dependency
					.replaceAll("$module", mavenModule)
					.replaceAll("$version", version)
				);
			}else {
				block_gradle.classList.add("invisible");
				block_maven.classList.add("invisible");
				block_sbt.classList.remove("invisible");

				putCode(code_sbt, "scala", sbt_dependency
					.replaceAll("$module", mavenModule)
					.replaceAll("$version", version)
				);
			}

			if(isKotlin){
				block_kotlin.classList.remove("invisible");
				block_java.classList.add("invisible");

				if(libgdx.checked){
					putCode(code_kotlin, "kotlin", kotlin_example_libgdx);
				} else {
					putCode(code_kotlin, "kotlin", kotlin_example
						.replace("$module", executorModule)
						.replaceAll(jogl.checked? "$getter" : null, "val gl = (event as JOGLEvent).gl\n")
						.replaceAll(libgdx.checked? "$getter" : null, "val application = (event as LibGDXEvent).application\n")
						.replaceAll("$getter", "")
					);
				}
			}else{
				block_java.classList.remove("invisible");
				block_kotlin.classList.add("invisible");

				if(libgdx.checked){
					putCode(code_java, "java", java_example_libgdx);
				} else {
					putCode(code_java, "java", java_example
						.replaceAll("$module", `${executorClass}.${executorModule}`)
						.replaceAll(jogl.checked? "$getter" : null, "GL2 gl = ((JOGLEvent) event).getGl();\n")
						.replaceAll(libgdx.checked? "$getter" : null, "Application application = (event as LibGDXEvent).getApplication();\n")
						.replaceAll("$getter", "")
					);
				}
			}
		}
	}
</script>

# OpenGLFX Generator

Tool to create proper OpenGLFX configuration

<div class="page-separator"></div>

<div class="table3">
	<div class="config">
		<div class="title">OpenGL Library</div>
		<div>
			<input name="lib" type="radio" id="radio_lwjgl" onclick="updateCode()">
			<label for="radio_lwjgl">LWJGL</label>
		</div>
		<div>
			<input name="lib" type="radio" id="radio_lwjgl2" onclick="updateCode()">
			<label for="radio_lwjgl2">LWJGL2</label>
		</div>
		<div>
			<input name="lib" type="radio" id="radio_jogl" onclick="updateCode()">
			<label for="radio_jogl">JOGL</label>
		</div>
		<div>
			<input name="lib" type="radio" id="radio_libgdx" onclick="updateCode()">
			<label for="radio_libgdx">LibGDX (beta)</label>
		</div>
	</div>
	<div class="config">
		<div class="title">Build engine</div>
		<div>
			<input name="build-engine" type="radio" id="radio_gradle" onclick="updateCode()">
			<label for="radio_gradle">Gradle</label>
		</div>
		<div>
			<input name="build-engine" type="radio" id="radio_maven" onclick="updateCode()">
			<label for="radio_maven">Maven</label>
		</div>
		<div>
			<input name="build-engine" type="radio" id="radio_sbt" onclick="updateCode()">
			<label for="radio_sbt">Sbt</label>
		</div>
	</div>
	<div class="config">
		<div class="title">Language</div>
		<div>
			<input name="language" type="radio" id="radio_kotlin" onclick="updateCode()">
			<label for="radio_kotlin">Kotlin</label>
		</div>
		<div>
			<input name="language" type="radio" id="radio_java" onclick="updateCode()">
			<label for="radio_java">Java</label>
		</div>
	</div>
</div>

<div id="gradle-block" class="invisible">
	<h2>Gradle</h2>
	<div id="groovy-code"></div>
</div>

<div id="maven-block" class="invisible">
	<h2>Maven</h2>
	<div id="maven-code"></div>
</div>

<div id="sbt-block" class="invisible">
	<h2>Sbt</h2>
	<div id="sbt-code"></div>
</div>

<div id="kotlin-block" class="invisible">
	<h2>Kotlin</h2>
	<div id="kotlin-code"></div>
</div>

<div id="java-block" class="invisible">
	<h2>Java</h2>
	<div id="java-code"></div>
</div>
