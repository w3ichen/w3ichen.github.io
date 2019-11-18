window.onload = function setup(){
	var images = ['archway.jpg','buffalo.jpg','chinesearch.jpg','hill.jpg','iphone.jpg','locks.jpg','lotus.jpg','meat.jpg','monkey.jpg','mountain.jpg','onetree.jpg','path.jpg','post.jpg','profile.jpg','redhouse.jpg','rooftop.jpg','rose.jpg','shadow.jpg','temple.jpg'];
	var randomNumber = Math.floor(Math.random()*images.length);
	var imageFile = images[randomNumber]; var path = 'pages/photo/'+imageFile;
	document.body.style.backgroundImage = 'url('+path+')';

	// auto generate random quote
	var quotes = ['\"Stay Hungry, Stay Foolish\" <br>- Steve Jobs',
	'\"The People Who Are Crazy Enough to Think <br> They Can Change the World are the Ones Who Do\"<br>- Steve Jobs',
	'\"You Can\'t Connect the Dots Looking Forward, <br> You Can Only Connect Them Looking Backwards\"<br>- Steve Jobs',
	'\"Be The Flame That Warms the World, Not Destroy It\"<br>- Henkelman',
	'\"If I Had 3 Hours to Cut Down a Tree, <br>I Would Take 2 Hours to Sharpen The Ax\" <br>- Lincoln ',
	'\"How We Spend Our Days is How We Spend Out Lives\"<br> - Annie Dillard',
	'\"The Heights of Great Men Reached and Kept Were<br> Not Attained by Sudden Flight, But They, While Their Companions Slept,<br> Were Toiling Upward in the Night\"<br>- Henry Wadsworth',
	'\"Sometimes it is the People No One Imagines Anything of <br> Who do the Things That No One Can Imagine\"<br>- Alan Turing',
	'\"What Happens When We Die? <br>I Know That the Ones Who Love Us Will Miss Us\"<br>- Keanu Reeves',
	'\"It Does Not do to Dwell on Dreams and Forget to Live\"<br> - J.K.Rowling',
	'\"It is Our Choices, That Show What We Truly Are, <br> Far More Than Our Abilities\"<br>- J.K.Rowling'];
	var randomNumber = Math.floor(Math.random()*quotes.length);
	document.getElementById("quote").innerHTML = quotes[randomNumber];
};

function search(input){
	var input = String(input);
	input = input.toLowerCase();
	let inputArray = input.split(' ');
	let index = {
		'solidworks':'pages/solidworks/solidworks.html',
		'solidwork':'pages/solidworks/solidworks.html',
		'code':'pages/code/code.html',
		'python':'pages/code/code.html',
		'git':'../code/code.html',
		'github':'../code/code.html',
		'vhdl':'pages/code/code.html',
		'c++':'pages/code/code.html',
		'cpp':'pages/code/code.html',
		'cplusplus':'pages/code/code.html',
		'coding':'pages/code/code.html',
		'matlab':'pages/code/code.html',
		'javascript':'pages/code/code.html',
		'js':'pages/code/code.html',
		'html':'pages/code/code.html',
		'css':'pages/code/code.html',
		'photo':'pages/photo/photo.html',
		'photos':'pages/photo/photo.html',
		'photography':'pages/photo/photo.html',
		'photographer':'pages/photo/photo.html',
		'picture':'pages/photo/photo.html',
		'video':'pages/video/video.html',
		'videos':'pages/video/video.html',
		'youtube':'pages/video/video.html',
		'editing':'pages/video/video.html',
		'sketch':'pages/art/art.html',
		'art':'pages/art/art.html',
		'arts':'pages/art/art.html',
		'drawing':'pages/art/art.html',
		'sketch':'pages/art/art.html',
		'blender':'pages/maya/maya.html',
		'maya':'pages/maya/maya.html',
		'model':'pages/maya/maya.html',
		'3d':'pages/maya/maya.html',
		'modeling':'pages/maya/maya.html',
		'animation':'pages/maya/maya.html',
		'computing':'pages/code/code.html',
		'computer':'pages/code/code.html',
		'mechanical':'pages/solidworks/solidworks.html',
		'design':'pages/solidworks/solidworks.html',
		'artistic':'pages/art/art.html',
		'artist':'pages/art/art.html',
		'artsy':'pages/art/art.html',
		'pencil':'pages/art/art.html',
		'draw':'pages/art/art.html',
		'artwork':'pages/art/art.html',
		'hobby':'pages/searchall.html',
		'hobbies':'pages/searchall.html',
		'interest':'pages/searchall.html',
		'interests':'pages/searchall.html',
		'create':'pages/searchall.html',
		'creative':'pages/searchall.html',
		'creator':'pages/searchall.html',
		'programmer':'pages/code/code.html',
		'program':'pages/code/code.html',
		'terminal':'pages/code/code.html',
		'bash':'pages/code/code.html',
		'linux':'pages/code/code.html',
		'pc':'pages/code/code.html',
		'website':'pages/code/code.html',
		'software':'pages/code/code.html',
		'developer':'pages/code/code.html',
		'coder':'pages/code/code.html',
		'animate':'pages/maya/maya.html',
		'graphic':'pages/maya/maya.html',
		'camera':'pages/photo/photo.html',
		'pictures':'pages/photo/photo.html',
		'capture':'pages/photo/photo.html',
		'media':'pages/photo/photo.html',
		'film':'pages/video/video.html',
		'premiere':'pages/video/video.html',
		'after effects':'pages/video/video.html',
		'after':'pages/video/video.html',
		'premiere pro':'pages/video/video.html',
		'lightroom':'pages/photo/photo.html',
		'photoshop':'pages/photo/photo.html'
	}
	
	let keys = Object.keys(index);
	for (var i=0;i<inputArray.length;i++){
		for (var o=0;o<keys.length;o++){
			if (inputArray[i]==keys[o]){
				var path = index[keys[o]];
				break;
			}
		}
	} 
	//error checking, if page does not exist
	if (typeof(path)=="undefined"){
		window.alert('Page Unavailable\nPress Search All Button to View Available Pages');
		window.location.href='./index.html';
		}else{
	window.location.replace(path);
	}
	
};


