// JavaScript Document
const connectlink = 'https://exceed11.cpsk-club.xyz/';

var data = [];

function makedata(item){
	console.log(item);
	var floor = item.floor_number;
	var room;
	for(room in item.rooms){
		console.log(item.rooms[room]);
		var roomdata = [];
		roomdata.push(item.rooms[room].room_id);
		roomdata.push(item.rooms[room].name);
		roomdata.push("./edit-room.html?roomid=" + item.rooms[room].room_id +"&floor=" + floor);
		data.push(roomdata);
		//console.log(data);
	}
}

fetch(connectlink)
  	.then((response) => response.json())
  	.then((json) => {
    	console.log(json)
		json.building.forEach(makedata)
		console.log(data);
		var i;
		var txt = '<table>';
		txt = txt + "<tr><th>RoomID</th><th>Room Name</th><th></th></tr>"
		for(i in data){
			console.log(data[i])
			var command = "document.location='" + data[i][2] + "'";
			console.log(command);
			var button = "<button class=" +'"sbutton"' + "onclick="+ command +">Edit</button>";
			console.log(button);
			txt = txt + "<tr><td>" + data[i][0] + "</td><td>" + data[i][1] + '</td><td>' + button + "</td></tr>"
		}
		txt = txt + "</table>";

		document.getElementById('roomlist').innerHTML = txt;
	})


