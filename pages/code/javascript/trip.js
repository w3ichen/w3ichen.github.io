var data = new Object()

// get values from documents
function getUserInputs(){
	try{
		var car = parseInt(document.getElementById("car").value); if (car == NaN){window.alert("User Input Error: Car Range is Blank")}
	}
	catch(err){
		window.alert("ERROR: car range must be an unitless numerical value ")
	}
	try{
		var from = document.getElementById("from").value;
		var to = document.getElementById("to").value;if ((to || from) == ""){window.alert("User Input Error: From or To Location is Blank")}
		var country = document.getElementById("country").value;
		var start = document.getElementById("start").value;if (start == ""){window.alert("User Input Error: Departure Date is Blank")}
		var carType = document.getElementById("carType").value;
	} catch(err){
		window.alert("ERROR: error in user input\n Please Check Your Inputs")
	}
	
	//             (0) (1)  (2)    (3)  (4)   (5)              
	var output = [from,to,country,start,car,carType];
	return output
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function seconds_2_hours(seconds, seven_am = true){
	if (seven_am == true){return [pad(7,2),pad(0,2),0]}
	var hours = pad(parseInt(seconds/3600, 10),2);
	var minutes = pad(parseInt(((seconds/3600)%1)*60,10),2);
	var seconds = pad(parseInt(((((seconds/3600)%1)*60)%1)*60,10),2);
	return [hours,minutes,seconds]
}


function main(){
	var Days = 1;
	const key = 'G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0'
	// (1) get user inputs
	var inputs = getUserInputs();

	document.write('<!DOCTYPE html><head><title>API</title><link rel="stylesheet" type="text/css" href="trip.css"></head><nav><h1>Trip Planner</h1></nav><body><div class="outlineBox"> <div id="main_info"></div>	<div id="main"></div>   <button class="btn" onclick="back()">back</button><script type="text/javascript">function back(){window.location.href="trip.html"}</script></div></body></html>')
	// time array, hours - minutes - seconds
	var time_seconds = 25200; // 7 am
	var time = seconds_2_hours(time_seconds)

	// (2) convert addresses to lat and lon
	var from_address = inputs[0].split(" ").join("%20");
	var to_address = inputs[1].split(" ").join("%20");
	const from_url ='https://api.tomtom.com/search/2/geocode/'+from_address+'.json?limit=1&countrySet='+inputs[2]+'&key='+key;
	const to_url ='https://api.tomtom.com/search/2/geocode/'+to_address+'.json?limit=1&countrySet='+inputs[2]+'&key='+key;

	fetch(from_url)
	.then(data=>{return data.json()})
	.then(res=> { 
		var from_latlon = [(res.results[0].position.lat),(res.results[0].position.lon)];
		var current_location = from_latlon;
		fetch(to_url)
		.then(data=>{return data.json()})
		.then(res=> {
			var to_latlon = [(res.results[0].position.lat),(res.results[0].position.lon)];
			// now have latlon of from and to
			// (3) find the route from from to to
			var route_url = 'https://api.tomtom.com/routing/1/calculateRoute/'+from_latlon[0]+'%2C'+from_latlon[1]+'%3A'+to_latlon[0]+'%2C'+to_latlon[1]+'/json?departAt='+inputs[3]+'T'+time[0]+'%3A'+time[1]+'%3A'+time[2]+'&routeType=fastest&traffic=true&travelMode=car&key='+key;
			fetch(route_url)
			.then(data=>{return data.json()})
			.then(res=> {
				var distace_km = (res.routes[0].summary.lengthInMeters)/1000
				var travel_time_seconds = res.routes[0].summary.travelTimeInSeconds; 
				var route = res.routes[0].legs[0].points
				var numOfPoints = route.length

				document.getElementById("main_info").innerHTML = "<strong>FROM</strong> "+inputs[0]+"  <strong>TO</strong> "+inputs[1]+" ,"+inputs[2]+"<br><strong>Departure Date:</strong> "+inputs[3]+"<br><strong>Distance:</strong> "+distace_km+" km"+"<br><strong>Driving Time:</strong> "+parseInt(travel_time_seconds/3600, 10)+" hours : "+parseInt(((travel_time_seconds/3600)%1)*60,10)+" minutes : "+ parseInt(((((travel_time_seconds/3600)%1)*60)%1)*60,10)+ " seconds";
				
				var coord_index = Math.floor(Math.floor(numOfPoints/distace_km)*inputs[4])
				var interval = coord_index*.85;
				if (distace_km > inputs[4]){
					// if can't be reached in one car range
						document.getElementById("main").innerHTML = "<br><strong>Day 1</strong><br><strong>7:00</strong>	Depart from Home"
						time = seconds_2_hours(time_seconds);			
						var resultFound = false;
						var fetchNow = function() {fetch('https://api.tomtom.com/routing/1/calculateRoute/'+current_location[0]+'%2C'+current_location[1]+'%3A'+route[coord_index].latitude+'%2C'+route[coord_index].longitude+'/json?departAt='+inputs[3]+'T'+time[0]+'%3A'+time[1]+'%3A'+time[2]+'&routeType=fastest&traffic=true&travelMode=car&key='+key)
						.then(data=>{return data.json()})
						.then(res=> {  
							if (coord_index >= numOfPoints){resultFound = true; }// stop if greater than end point}
							else{
								// add the time
								time_seconds += res.routes[0].summary.travelTimeInSeconds
								// change current location to new location
								current_location = [route[coord_index].latitude,route[coord_index].longitude]

								if (inputs[5] == "gas"){
									// find a gas station
									var gas_station_url = 'https://api.tomtom.com/search/2/poiSearch/petrol%20%20station.json?limit=1&countrySet='+inputs[2]+'&lat='+current_location[0]+'&lon='+current_location[1]+'&key='+key;
									try{fetch(gas_station_url)
									.then(data=>{return data.json()})
									.then(res=> {  
										
										var gas_name = res.results[0].poi.name;
										var gas_address = res.results[0].address.freeformAddress;  
										time = seconds_2_hours(time_seconds,false)

										document.getElementById("main").innerHTML += '<div class="station"><br><strong>'+time[0]+":"+time[1]+"</strong>	<u>Gas Station</u> - "+gas_name+'<br>Address: <em>'+gas_address+'</em></div>';
										
										time_seconds += (15*60); // 15 minutes* 60 seconds
										})  }catch(err){ setTimeout(15000);
										fetch(gas_station_url)
										.then(data=>{return data.json()})
										.then(res=> {  
										var gas_name = res.results[0].poi.name;
										var gas_address = res.results[0].address.freeformAddress;  
										time = seconds_2_hours(time_seconds,false)
										document.getElementById("main").innerHTML += '<div class="station"><br><strong>'+time[0]+":"+time[1]+"</strong>	<u>Gas Station</u> - "+gas_name+'<br>Address: <em>'+gas_address+'</em></div>';	
										time_seconds += (15*60); // 15 minutes* 60 seconds
									})
									}  }
								else if (inputs[5] == "electric"){
									// find a electric charging station
									var ev_station_url = 'https://api.tomtom.com/search/2/poiSearch/electric%20vehicle%20station.json?limit=1&countrySet='+inputs[2]+'&lat='+current_location[0]+'&lon='+current_location[1]+'&key='+key;
									try{fetch(ev_station_url)
									.then(data=>{return data.json()})
									.then(res=> {  
										
										var ev_name = res.results[0].poi.name;
										var ev_address = res.results[0].address.freeformAddress; 

										time=seconds_2_hours(time_seconds,false)
										
										document.getElementById("main").innerHTML += '<div class="station"><br><strong>'+time[0]+":"+time[1]+"</strong>	<u>Charging Station</u> - "+ev_name+'<br>Address: <em>'+ev_address+'</em></div>';
										
										time_seconds += (30*60); // 30 minutes*60 seconds
										}) } catch(err){setTimeout(15000);
										fetch(ev_station_url)
										.then(data=>{return data.json()})
										.then(res=> {  
										var ev_name = res.results[0].poi.name;
										var ev_address = res.results[0].address.freeformAddress; 
										time=seconds_2_hours(time_seconds,false)
										document.getElementById("main").innerHTML += '<div class="station"><br><strong>'+time[0]+":"+time[1]+"</strong>	<u>Charging Station</u> - "+ev_name+'<br>Address: <em>'+ev_address+'</em></div>';
										time_seconds += (30*60); // 30 minutes*60 seconds
										})
									}

								}
								if (time_seconds >= 75600){ // if time is past 10 o'clock, look for hotel
									var hotel_url = 'https://api.tomtom.com/search/2/poiSearch/hotel_motel.json?limit=3&countrySet='+inputs[2]+'&lat='+current_location[0]+'&lon='+current_location[1]+'&key='+key;
									try{fetch(hotel_url)
									.then(data=>{return data.json()})
									.then(res=> {
										// name,  address,  phone,  score  
										var hotel1 = [res.results[0].poi.name, res.results[0].address.freeformAddress,  res.results[0].poi.phone, res.results[0].score];
										var hotel2 = [res.results[1].poi.name, res.results[1].address.freeformAddress, res.results[1].poi.phone, res.results[1].score];
										var hotel3 = [res.results[2].poi.name,res.results[2].address.freeformAddress, res.results[2].poi.phone, res.results[2].score];
										time=seconds_2_hours(time_seconds,false)
								
										document.getElementById("main").innerHTML += '<div class="hotels"><br><strong>'+time[0]+":"+time[1]+" -  Nearby <u>Hotels + Motels</u>:</div>";
										document.getElementById("main").innerHTML += '<div class="hotels"><br><strong>	(1) </strong>'+hotel1[0]+'<br>-	  Address: <em>'+hotel1[1]+'</em><br>-	Phone: '+hotel1[2]+'</div>';
										document.getElementById("main").innerHTML += '<div class="hotels"><br><strong>	(2) </strong>'+hotel2[0]+'<br>-	  Address: <em>'+hotel2[1]+'</em><br>-	Phone: '+hotel2[2]+'</div>';
										document.getElementById("main").innerHTML += '<div class="hotels"><br><strong>	(3) </strong>'+hotel3[0]+'<br>-	  Address: <em>'+hotel3[1]+'</em><br>-	Phone: '+hotel3[2]+'</div>';
										Days += 1;
										document.getElementById("main").innerHTML += '<br><br><strong>Day '+Days+'</strong>';
										time = seconds_2_hours(time_seconds,true); // reset time to 7am
										time_seconds = 25200; //reset to 7am
										document.getElementById("main").innerHTML += '<br><strong>'+time[0]+':'+time[1]+' </strong> Depart from Hotel or Motel'
										
									}) } catch(err){setTimeout(15000); 
									fetch(hotel_url)
									.then(data=>{return data.json()})
									.then(res=> {
										// name,  address,  phone,  score  
										var hotel1 = [res.results[0].poi.name, res.results[0].address.freeformAddress,  res.results[0].poi.phone, res.results[0].score];
										var hotel2 = [res.results[1].poi.name, res.results[1].address.freeformAddress, res.results[1].poi.phone, res.results[1].score];
										var hotel3 = [res.results[2].poi.name,res.results[2].address.freeformAddress, res.results[2].poi.phone, res.results[2].score];
										time=seconds_2_hours(time_seconds,false)
										document.getElementById("main").innerHTML += '<div class="hotels"><br><strong>'+time[0]+":"+time[1]+"  End of Day "+Days+" -  Nearby Hotels + Motels:</div>";
										document.getElementById("main").innerHTML += '<div class="hotels"><br><strong>	(1)</strong>'+hotel1[0]+'<br>-	Address: <em>'+hotel1[1]+'</em><br>-	Phone: '+hotel1[2]+'</div>';
										document.getElementById("main").innerHTML += '<div class="hotels"><br><strong>	(2)</strong>'+hotel2[0]+'<br>-	Address: <em>'+hotel2[1]+'</em><br>-	Phone: '+hotel2[2]+'</div>';
										document.getElementById("main").innerHTML += '<div class="hotels"><br><strong>	(3)</strong>'+hotel3[0]+'<br>-	Address: <em>'+hotel3[1]+'</em><br>-	Phone: '+hotel3[2]+'</div>';
										Days += 1;
										document.getElementById("main").innerHTML += '<br><br><strong>Day '+Days+'</strong>';
										time = seconds_2_hours(time_seconds,true); // reset time to 7am
										time_seconds = 25200; //reset to 7am
										document.getElementById("main").innerHTML += '<br><strong>'+time[0]+':'+time[1]+' </strong> Depart from Hotel or Motel'
										
									})}
								}

								coord_index += interval;
								setTimeout(9000);
								try{ fetchNow(); } //recursive
								catch(err){ setTimeout(6000);
									// error when coordinates are over the route range
								
									fetch('https://api.tomtom.com/routing/1/calculateRoute/'+current_location[0]+'%2C'+current_location[1]+'%3A'+route[numOfPoints-1].latitude+'%2C'+route[numOfPoints-1].longitude+'/json?departAt='+inputs[3]+'T'+time[0]+'%3A'+time[1]+'%3A'+time[2]+'&routeType=fastest&traffic=true&travelMode=car&key='+key)
									.then(data=>{return data.json()})
									.then(res=> { 
										time_seconds += res.routes[0].summary.travelTimeInSeconds; 	
										time = seconds_2_hours(time_seconds,false)
										document.getElementById("main").innerHTML += '<br><div><strong>'+time[0]+':'+time[1]+'</strong>  Arrived at '+inputs[1]+'</div>'
									
									})
								} // end of error catch
						} // main else brace
						})
					}// outer fetch function brace	
					fetchNow();		
				}
			}) 
		})
	})

}
// fetch(from_url)
// 	.then(data=>{return data.json()})
// 	.then(res=> {    })
