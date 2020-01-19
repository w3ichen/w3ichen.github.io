// get values from documents
function getUserInputs(){
	try{
		var car = parseInt(document.getElementById("car").value);
	}
	catch(err){
		window.alert("ERROR: car range must be an unitless numerical value ")
	}
	try{
		var from = document.getElementById("from").value;
		var to = document.getElementById("to").value;
		var start = document.getElementById("start").value;
		var end = document.getElementById("end").value;
		var hotels = document.getElementById("hotels").value;
		var rest = document.getElementById("rest").value;
		var country = document.getElementById("country").value;
	} catch(err){
		window.alert("ERROR: error in user input\n Please Check Your Inputs")
	}
	var output = [from,to,country,start,end,car,hotels,rest];
	return output
}

function address_to_latlong(address,country,key){
	address = address.split(" ").join("%20");
	var url = 'https://api.tomtom.com/search/2/geocode/'+address+'.xml?limit=1&countrySet='+country+'&key='+key;
	fetch(url).then(function(response) {
  		response.text().then(function(text) {
  			var parser = new DOMParser();
			var htmlDoc = parser.parseFromString(text, 'text/html');
			var lat = htmlDoc.getElementsByTagName('lat')[0].innerText;
			var lon = htmlDoc.getElementsByTagName('lon')[0].innerText;
			return [lat, lon];
 		 });
	});
}
function latlong_to_address(lat,lon,key){
	var url = 'https://api.tomtom.com/search/2/reverseGeocode/'+lat+'%2C'+lon+'.xml?key='+key;
	fetch(url).then(function(response) {
  		response.text().then(function(text) {
  			var parser = new DOMParser();
			var htmlDoc = parser.parseFromString(text, 'text/html');
			var address = htmlDoc.getElementsByTagName('freeformAddress')[0].innerText;
			return address;
 		 });
	});
}


function main(){
	const key = 'G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0'
	window.location.href = "trip2.html";

	var time;
	var date;
	var month;
}
