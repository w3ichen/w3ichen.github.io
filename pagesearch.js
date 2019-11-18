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
		'artsy':'pages/art/art.html'
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

