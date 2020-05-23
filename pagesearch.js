function search(input, page="none"){
	var input = String(input);
	input = input.toLowerCase();
	let inputArray = input.split(' ');
	let index = {
		// ART
		'art':'../art/art.html',
		'arts':'../art/art.html',
		'artwork':'../art/art.html',
		'craft':'../art/art.html',
		'drawing':'../art/art.html',
		'drawings':'../art/art.html',
		'sketch':'../art/art.html',
		'artistic':'../art/art.html',
		'artist':'../art/art.html',
		'artsy':'../art/art.html',
		'pencil':'../art/art.html',
		'draw':'../art/art.html',
		'artwork':'../art/art.html',
		'sketches':'../art/art.html',
		'painting':'../art/art.html',
		'illustration':'../art/art.html',

		// CODE
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
		'assembly':'../code/code.html',
		'vhdl':'../code/code.html',
		'js':'../code/code.html',
		'html':'../code/code.html',
		'css':'../code/code.html',
		'programmer':'../code/code.html',
		'program':'../code/code.html',
		'terminal':'../code/code.html',
		'bash':'../code/code.html',
		'linux':'../code/code.html',
		'pc':'../code/code.html',
		'web':'../code/code.html',
		'website':'../code/code.html',
		'software':'../code/code.html',
		'developer':'../code/code.html',
		'development':'../code/code.html',
		'coder':'../code/code.html',
		'computing':'../code/code.html',
		'computer':'../code/code.html',
		'cmput':'../code/code.html',
		'engineer':'../code/code.html',
		'tensorflow':'../code/code.html',
		'keras':'../code/code.html',
		'machine':'../code/code.html',
		'learning':'../code/code.html',
		'django':'../code/code.html',
		'flask':'../code/code.html',
		'sql':'../code/code.html',
		'database':'../code/code.html',
		'frontend':'../code/code.html',
		'backend':'../code/code.html',
		'arduino':'../code/code.html',
		'ide':'../code/code.html',

		// MAYA
		'blender':'../maya/maya.html',
		'maya':'../maya/maya.html',
		'model':'../maya/maya.html',
		'animate':'../maya/maya.html',
		'3d':'../maya/maya.html',
		'3-d':'../code/code.html',
		'modeling':'../maya/maya.html',
		'rendering':'../maya/maya.html',
		'animation':'../maya/maya.html',
		'animated':'../maya/maya.html',
		'motion':'../code/code.html',
		'dimension':'../code/code.html',
		'dimensions':'../code/code.html',
		'dimensional':'../code/code.html',

		// OTHER
		'other':'../other/other.html',
		'others':'../other/other.html',
		'news':'../other/other.html',
		'newspaper':'../other/other.html',
		'newspapers':'../other/other.html',
		'journal':'../other/other.html',
		'theatre':'../other/other.html',
		'tech':'../other/other.html',
		'musical':'../other/other.html',
		'drama':'../other/other.html',
		'miscellaneous':'../other/other.html',
		'more':'../other/other.html',
		'extra':'../other/other.html',
		'additional':'../other/other.html',
		'alternative':'../other/other.html',
		'extracurricular':'../other/other.html',

		// PHOTO
		'camera':'../photo/photo.html',
		'pictures':'../photo/photo.html',
		'picture':'../photo/photo.html',
		'capture':'../photo/photo.html',
		'media':'../photo/photo.html',
		'lightroom':'../photo/photo.html',
		'photoshop':'../photo/photo.html',
		'photo':'../photo/photo.html',
		'photos':'../photo/photo.html',
		'pic':'../photo/photo.html',
		'pics':'../photo/photo.html',
		'photography':'../photo/photo.html',
		'photographer':'../photo/photo.html',
		'canon':'../photo/photo.html',
		'image':'../photo/photo.html',
		'images':'../photo/photo.html',
		'snapshot':'../photo/photo.html',
		'lens':'../photo/photo.html',
		'shoot':'../photo/photo.html',

		// RESUME
		'resume':'../resume/resume.html',
		'cv':'../resume/resume.html',
		'job':'../resume/resume.html',
		'jobs':'../resume/resume.html',
		'work':'../resume/resume.html',
		'working':'../resume/resume.html',
		'employ':'../resume/resume.html',
		'employment':'../resume/resume.html',
		'hire':'../resume/resume.html',
		'hiring':'../resume/resume.html',
		'career':'../resume/resume.html',
		'profession':'../resume/resume.html',
		'occupation':'../resume/resume.html',
		'company':'../resume/resume.html',
		'linkedin':'../resume/resume.html',

		// COVER LETTER
		'cover':'../resume/cover.html',
		'letter':'../resume/cover.html',

		// SEARCHALL
		'hobby':'../searchall.html',
		'hobbies':'../searchall.html',
		'interest':'../searchall.html',
		'interests':'../searchall.html',
		'create':'../searchall.html',
		'creative':'../searchall.html',
		'creator':'../searchall.html',
		'project':'../searchall.html',
		'projects':'../searchall.html',

		// SOLIDWORKS
		'solidworks':'../solidworks/solidworks.html',
		'solidwork':'../solidworks/solidworks.html',		
		'mechanical':'../solidworks/solidworks.html',
		'design':'../solidworks/solidworks.html',
		'cad':'../solidworks/solidworks.html',
		'computer-aided':'../solidworks/solidworks.html',

		// VIDEO
		'video':'../video/video.html',
		'videos':'../video/video.html',
		'youtube':'../video/video.html',
		'editing':'../video/video.html',
		'edits':'../video/video.html',
		'edit':'../video/video.html',
		'film':'../video/video.html',
		'movie':'../video/video.html',
		'premiere':'../video/video.html',
		'after effects':'../video/video.html',
		'after':'../video/video.html',
		'premiere pro':'../video/video.html',
		'cut':'../video/video.html',
		'clip':'../video/video.html',
		'clips':'../video/video.html',
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
		if (page == 'main'){
			window.alert('Page Unavailable\nPress Search All Button to View Available Pages');
			window.location.href='index.html';
		}else if (page == 'code'){
			window.alert('Page Unavailable\nPress Search All Button to View Available Pages');
			window.location.href='../../../index.html';
		}else{
			window.alert('Page Unavailable\nPress Search All Button to View Available Pages');
			window.location.href='../../index.html';
		}
	}else{
		if (page == 'main'){
			window.location.replace(path.replace('../','pages/'))
		}else if (page == 'code'){
			window.location.replace(path.replace('../','../../'))
		}else{
			window.location.replace(path);
		}
	}
};

