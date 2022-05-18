<style>
	img {
		border-radius: 5pt;
	}
	.main-pane {
		display: flex;
		gap: 30px;
		flex-direction: column;
    	align-items: center;
	}
	.main-pane > img {
		width: 300pt;
	}
	.main-pane > div {
		display: flex;
		gap: 10px;
		flex-direction: column;
		min-width: 300pt;
	}
	.field {
		display: flex;
		gap: 15px;
	}
	.field > input {
		width: 100%;
	}
	.button {
		margin-top: 10pt;
	}
</style>
<script>
	function hasNavigation() { return false; }

	function calculate(){
		var a = findById("a");
		var b = findById("b");
		var c = findById("c");

		if(a.value == ""){
			var b1 = myEval(b.value);
			var c1 = myEval(c.value);

			a.value = Math.sqrt(c1*c1 - b1*b1);
		}
		else if(b.value == ""){
			var a1 = myEval(a.value);
			var c1 = myEval(c.value);

			b.value = Math.sqrt(c1*c1 - a1*a1);
		}
		else if(c.value == ""){
			var a1 = myEval(a.value);
			var b1 = myEval(b.value);

			c.value = Math.sqrt(a1*a1 + b1*b1);
		}
	}

	function myEval(text){
		text = text.replace("sqrt(", "Math.sqrt(");
		text = text.replace("pow(", "Math.pow(");
		return parseFloat(eval(text));
	}
</script>

# Теорема Пифагора

Этот калькулятор находит неизвестную сторону по заданным данным


<div class="page-separator"></div>

<div class="main-pane">
	<img src="http://worksbase.ru/upload/files/b5059e2758fe3fb8415788d7678c236d.png">
	<div>
		<div class="field">
			a: <input id="a">
		</div>
		<div class="field">
			b: <input id="b">
		</div>
		<div class="field">
			c: <input id="c">
		</div>
		<div class="button" onclick="calculate()">Посчитать</div>
	</div>
</div>