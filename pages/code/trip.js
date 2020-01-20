var data = new Object()

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
		var country = document.getElementById("country").value;
		var start = document.getElementById("start").value;
		var hotels = document.getElementById("hotels").value;
		var rest = document.getElementById("rest").value;
		var carType = document.getElementById("carType").value;
	} catch(err){
		window.alert("ERROR: error in user input\n Please Check Your Inputs")
	}
	var output = [from,to,country,start,car,carType,hotels,rest];
	return output
}
function address_to_latlong(address,country,key){
	address = address.split(" ").join("%20");
	var url = 'https://api.tomtom.com/search/2/geocode/'+address+'.xml?limit=1&countrySet='+country+'&key='+key;

	url2='https://api.tomtom.com/search/2/geocode/'+address+'.json?limit=1&countrySet='+country+'&key='+key;

	// fetch(url2)
	// .then(data=>{return data.json()})
	// .done(res=> {return output=[(res.results[0].position.lat),(res.results[0].position.lon)]})


    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", url,false); // false for synchronous request
    // xmlHttp.send( null );
    // console.log(xmlHttp.responseText)
    // return xmlHttp.responseText;



	// fetch(url).then(function(response) {
 //  		response.text().then(function(text) {
 //  			var parser = new DOMParser();
	// 		var htmlDoc = parser.parseFromString(text, 'text/html');
	// 		var lat = htmlDoc.getElementsByTagName('lat')[0].innerText;
	// 		var lon = htmlDoc.getElementsByTagName('lon')[0].innerText;
	// 		data[address] = [lat,lon];
 // 		 });
	// });



}
// const asynchronousFunction = async (url) => {
//   const response = await fetch(url)
//   console.log(response)
//   return response.responseText
// }
// var abc=asynchronousFunction('https://api.tomtom.com/search/2/geocode/7615%20119%20street.xml?limit=1&countrySet=canada&key=G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0')
// console.log(abc)

	// let results = fetch('https://api.tomtom.com/search/2/geocode/7615%20119%20street.json?limit=1&countrySet=canada&key=G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0')
 //        .then((res) => {
 //            return res.json();
 //        })
 //        .then((data) => {
 //            return data;
 //        })
 //        let printer = results.json()
 //       console.log("results");console.log(printer)




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
function route(from,to,time,date,key){

	var url = 'https://api.tomtom.com/routing/1/calculateRoute/'+data[from][0]+'%2C'+data[from][1]+'%3A'+to[0]+'%2C'+data[to][1]+'json?departAt='+date+'T'+time[0]+'%3A'+time[1]+'%3A'+time[2]+'&routeType=fastest&traffic=true&travelMode=car&key='+key;
	fetch(url).then(function(response){
		response.json()
		console.log(response)
	})
}


function main(){
	const key = 'G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0'
	// window.location.href = "trip2.html";
	// (1) get user inputs
	var a =address_to_latlong('edmonton','canada',key)
	// address_to_latlong('calgary','canada',key)
	var inputs = getUserInputs();
	// console.log(inputs)
	// console.log(data)
	// time array, hours - minutes - seconds
	var time = [8,0,0];
	// route('edmonton','calgary',time,inputs[3],key)
	console.log('a');
	console.log(a)
}
