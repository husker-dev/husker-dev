function findById(id){
	return document.getElementById(id);
}

function scrollToTop(){
	setTimeout(function() {
		window.scrollTo(0, 0);
	}, 20);
}

function isInViewport(el) {
    var top = el.offsetTop;
	var left = el.offsetLeft;
	var width = el.offsetWidth;
	var height = el.offsetHeight;

	while(el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
		left += el.offsetLeft;
	}

	return (
		top < (window.pageYOffset + window.innerHeight) &&
		left < (window.pageXOffset + window.innerWidth) &&
		(top + height) > window.pageYOffset &&
		(left + width) > window.pageXOffset
	);
}

function loadURLContent(url, callback){
	if(url === undefined || url === null)
		return;
	var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, true);
    rawFile.onreadystatechange = function () {
    	if(rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0))
	        callback(rawFile.responseText);
    }
    rawFile.send(null);
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send(null);
     
    return xhr.status !== 404;
}

function doesFileExistAsync(urlToFile, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, true);
    xhr.onreadystatechange = function () {
    	if(xhr.readyState === 4)
        	callback(xhr.status === 200 || xhr.status == 0);
    }
    xhr.send();
}

function putCode(element, tag, code){
	element.innerHTML = `<pre><code class="language-${tag}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
	Prism.highlightElement(element.querySelector('code'));
}

const specialSymbols = new Map([
  [':x:', '<i class="fas fa-times"></i>'],
  [':heavy_check_mark:', '<i class="fas fa-check"></i>']
])

function replaceSpecialSymbols(text){
	if(text.includes(":")){
		for (const key of specialSymbols.keys()) {
			if(text.includes(key))
		  		text = text.replaceAll(key, specialSymbols.get(key));
		}
	}

	return text;
}