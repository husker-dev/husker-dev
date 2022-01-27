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

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send(null);
     
    return xhr.status !== 404;
}

function putCode(element, tag, code){
	element.innerHTML = `<pre><code class="language-${tag}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
	Prism.highlightElement(element.querySelector('code'));
}