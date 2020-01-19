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
	} catch(err){
		window.alert("ERROR: error in user input\n Please Check Your Inputs")
	}
	var output = [from,to,start,end,car,hotels,rest];
	return output
}
function main(){
	const key = 'G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0'
	window.location.href = "trip2.html";

	var time;
	var date;
	var month;
}