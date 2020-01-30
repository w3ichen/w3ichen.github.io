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
		'coding':'code/code.html',
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
		'computing':'../code/code.html',
		'computer':'../code/code.html',
		'mechanical':'../solidworks/solidworks.html',
		'design':'../solidworks/solidworks.html',
		'artistic':'../art/art.html',
		'artist':'../art/art.html',
		'artsy':'../art/art.html',
		'pencil':'../art/art.html',
		'draw':'../art/art.html',
		'artwork':'../art/art.html',
		'hobby':'../searchall.html',
		'hobbies':'../searchall.html',
		'interest':'../searchall.html',
		'interests':'../searchall.html',
		'create':'../searchall.html',
		'creative':'../searchall.html',
		'creator':'../searchall.html',
		'programmer':'../code/code.html',
		'program':'../code/code.html',
		'terminal':'../code/code.html',
		'bash':'../code/code.html',
		'linux':'../code/code.html',
		'pc':'../code/code.html',
		'website':'../code/code.html',
		'software':'../code/code.html',
		'developer':'../code/code.html',
		'coder':'../code/code.html',
		'animate':'../maya/maya.html',
		'graphic':'../maya/maya.html',
		'camera':'../photo/photo.html',
		'pictures':'../photo/photo.html',
		'capture':'../photo/photo.html',
		'media':'../photo/photo.html',
		'film':'../video/video.html',
		'premiere':'../video/video.html',
		'after effects':'../video/video.html',
		'after':'../video/video.html',
		'premiere pro':'../video/video.html',
		'lightroom':'../photo/photo.html',
		'photoshop':'../photo/photo.html',
		'other':'../other/other.html',
		'others':'../other/other.html',
		'news':'../other/other.html',
		'newspaper':'../other/other.html',
		'newspapers':'../other/other.html',
		'journal':'../other/other.html',
		'theatre':'../other/other.html',
		'tech':'../other/other.html',
		'bring it on':'../other/other.html',
		'drama':'../other/other.html',
		'resume':'../resume/resume.html',
		'cv':'../resume/resume.html',
		'cover':'../resume/cover.html',
		'letter':'../resume/cover.html',
		'cover letter':'../resume/cover.html'
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

