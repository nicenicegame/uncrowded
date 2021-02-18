function getUrlVars() {
	var vars = {}
	var parts = window.location.href.replace(
	  /[?&]+([^=&]+)=([^&]*)/gi,
	  function (m, key, value) {
		vars[key] = value
	  }
	)
	return vars
  }
  
  function getUrlParam(parameter, defaultvalue) {
	var urlparameter = defaultvalue
	if (window.location.href.indexOf(parameter) > -1) {
	  urlparameter = getUrlVars()[parameter]
	}
	return urlparameter
  }
  
  
  
  
  /*let roomstat = [
	{
	  floor: 1,
	  rooms: [
		{ roomid: 101, roomname: 'toilet', capacity: 10, mode: 0 },
		{ roomid: 102, roomname: 'beadroom', capacity: 10, mode: 0 },
		{ roomid: 103, roomname: 'dining room', capacity: 10, mode: 0 },
	  ],
	},
	{
	  floor: 2,
	  rooms: [
		{ roomid: 201, roomname: 'toilet', capacity: 10, mode: 0 },
		{ roomid: 202, roomname: 'beadroom', capacity: 10, mode: 0 },
		{ roomid: 203, roomname: 'dining room', capacity: 10, mode: 0 },
	  ],
	},
  ]*/
  
  
  
  
  
  
  var roomid = getUrlParam('roomid', 000)
  var floor = getUrlParam('floor', 0)
  
  console.log(roomid)
  console.log(floor)
  
  
  
  function onoffStatus(statmeter) {
	if (statmeter == 0) {
	  return 'OFF'
	} else {
	  return 'ON'
	}
  }
  
  function sendThemBack() {
	/*fetch put back*/
  }
  
  var wantteddata = []
  const gotData = () => {
	return fetch('https://exceed11.cpsk-club.xyz').then((response) => response.json())
	  .then((responseData) => {
		document.getElementById('roomID').innerHTML = (responseData.data[floor-1].rooms[roomid%(floor*100)-1].room_id);
		document.getElementById('roomName').innerHTML = (responseData.data[floor-1].rooms[roomid%(floor*100)-1].name);
		document.getElementById('roomCapacity').innerHTML = (responseData.data[floor-1].rooms[roomid%(floor*100)-1].capacity);
		 document.getElementById('roomSentry').innerHTML = onoffStatus(responseData.data[floor-1].rooms[roomid%(floor*100)-1].mode);
		
	  })}
  
  
  function nameChange() {
	var newname = document.getElementById('newName').value
	if (newname == '') {
	  alert("Don't make the name blank!!")
	  showSetting()
	} else {
	  roomstat[floor - 1].rooms[roomid - floor * 100 - 1].roomname = newname
	  console.log(newname)
	  sendThemBack()
	  showSetting()
	}
  }
  
  function capChange() {
	var newcap = document.getElementById('newCap').value
	if (isNaN(newcap) || newcap < 1) {
	  alert('Capacity require Number only!!')
	  console.log(newcap)
	  showSetting()
	} else {
	  roomstat[floor - 1].rooms[roomid - floor * 100 - 1].capacity = newcap
	  console.log(newcap)
	  sendThemBack()
	  showSetting()
	}
  }
  
  function modeChange() {
	var newstate = document.getElementById('newMode').value
	roomstat[floor - 1].rooms[roomid - floor * 100 - 1].mode = newstate
	console.log(newstate)
	sendThemBack()
	showSetting()
  }
  
  function goSetting(inputtype) {
	if (inputtype == 'name') {
	  document.getElementById('roomName').innerHTML =
		'<input type="text" id="newName">'
	  document.getElementById('newName')
	  document.getElementById('roomNamebtn').innerHTML =
		'<button type="button" class="cfbutton" onclick="nameChange()">Submit</button> <button type="button" class="notbutton" onclick="showSetting()">Cancel</button>'
	} else if (inputtype == 'capa') {
	  document.getElementById('roomCapacity').innerHTML =
		'<input type="text" id="newCap">'
	  document.getElementById('newCap')
	  document.getElementById('roomCapacitybtn').innerHTML =
		'<button type="button" class="cfbutton" onclick="capChange()">Submit</button> <button type="button" class="notbutton" onclick="showSetting()">Cancel</button>'
	} else if (inputtype == 'mode') {
	  document.getElementById('roomSentry').innerHTML =
		'<select id="newMode"><option value=0>OFF</option><option value=1>ON</option></select>'
	  document.getElementById('roomSentrybtn').innerHTML =
		'<button type="button" class="cfbutton" onclick="modeChange()">Submit</button> <button type="button" class="notbutton" onclick="showSetting()">Cancel</button>'
	}
  }
  var nnamee = 'name'
  var cap = 'capa'
  var mod = 'mode'
  
  function showSetting() {
	gotData();
	 
	document.getElementById('roomNamebtn').innerHTML =
	  '<button type="button" class="sbutton" onclick="goSetting(nnamee)">Edit</button>'
	  
	document.getElementById('roomCapacitybtn').innerHTML =
	  '<button type="button" class="sbutton" onclick="goSetting(cap)">Edit</button>'
   
	document.getElementById('roomSentrybtn').innerHTML =
	  '<button type="button" class="sbutton" onclick="goSetting(mod)">Edit</button>'
  }
  
  showSetting()