function search(input){
	var input = String(input);
	input = input.toLowerCase();
	let inputArray = input.split(' ');
	let index = {
		'solidworks':'../solidworks/solidworks.html',
		'solidwork':'../solidworks/solidworks.html',
		'code':'../code/code.html',
		'python':'../code/code.html',
		'c++':'../code/code.html',
		'git':'../code/code.html',
		'github':'../code/code.html',
		'cpp':'../code/code.html',
		'cplusplus':'../code/code.html',
		'matlab':'../code/code.html',
		'javascript':'../code/code.html',
		'coding':'pages/code/code.html',
		'vhdl':'../code/code.html',
		'js':'../code/code.html',
		'html':'../code/code.html',
		'css':'../code/code.html',
		'photo':'../photo/photo.html',
		'photos':'../photo/photo.html',
		'photography':'../photo/photo.html',
		'photographer':'../photo/photo.html',
		'picture':'../photo/photo.html',
		'video':'../video/video.html',
		'videos':'../video/video.html',
		'youtube':'../video/video.html',
		'editing':'../video/video.html',
		'sketch':'../art/art.html',
		'art':'../art/art.html',
		'arts':'../art/art.html',
		'drawing':'../art/art.html',
		'sketch':'../art/art.html',
		'blender':'../maya/maya.html',
		'maya':'../maya/maya.html',
		'model':'../maya/maya.html',
		'3d':'../maya/maya.html',
		'modeling':'../maya/maya.html',
		'animation':'../maya/maya.html',
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
	// error checking, if page does not exist
	if (typeof(path)=="undefined"){
		window.alert('Page Unavailable\nPress Search All Button to View Available Pages');
		window.location.href='../../index.html';
		}else{
	window.location.replace(path);
	}
	
};

