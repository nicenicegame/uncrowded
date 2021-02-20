const connectlink = 'https://exceed11.cpsk-club.xyz'

if (!token) {
  window.location.href = './index.html'
} else {
  signinLink.parentElement.style.display = 'none'
}

signoutLink.addEventListener('click', () => {
  sessionStorage.removeItem('access_token')
})

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

function peopleName(roomname) {
  var a = '<h2>People in ' + roomname + '</h2>'
  document.getElementById('Graphhead').innerHTML = a
}
function peoplebarName(roomname) {
  var a = '<h2>Bargraph that show people in ' + roomname + '</h2>'
  document.getElementById('barhead').innerHTML = a
}
function powerName(roomname) {
  var a = '<h2>Energy in ' + roomname + '</h2>'
  document.getElementById('energyhead').innerHTML = a
}
function tempName(roomname) {
  var a = '<h2>Temperature in ' + roomname + '</h2>'
  document.getElementById('temperaturehead').innerHTML = a
}

var roomid = getUrlParam('roomid', 000)
var floor = getUrlParam('floor', 0)

const gotData = () => {
  return fetch(connectlink)
    .then((response) => response.json())
    .then((responseData) => {
      peopleName(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .name
      )
      peoplebarName(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .name
      )
      powerName(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .name
      )
      tempName(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .name
      )
      document.getElementById('roomID').innerHTML =
        responseData.building[floor - 1].rooms[
          (roomid % (floor * 100)) - 1
        ].room_id
      document.getElementById('roomName').innerHTML =
        responseData.building[floor - 1].rooms[
          (roomid % (floor * 100)) - 1
        ].name
      document.getElementById('roomCapacity').innerHTML =
        responseData.building[floor - 1].rooms[
          (roomid % (floor * 100)) - 1
        ].capacity
      document.getElementById('roomSentry').innerHTML = onoffStatus(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .mode
      )
    })
}

function onoffStatus(statmeter) {
  if (statmeter == 0) {
    return 'OFF'
  } else {
    return 'ON'
  }
}

function sendThemBack(parameter) {
  console.log(parameter)
  /* fetch put back */
  fetch(connectlink, {
    method: 'PUT',
    body: JSON.stringify(parameter),
    headers: {
      'Content-type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        window.location.href = './signin.html'
        sessionStorage.removeItem('access_token')
      }
      gotData()
    })
    .catch((err) => {
      console.log(err)
      showSetting()
    })
}

function nameChange() {
  var newname = document.getElementById('newName').value
  if (newname == '') {
    alert("Don't make the name blank!!")
    showSetting()
  } else {
    fetch(connectlink)
      .then((response) => response.json())
      .then((json) => {
        json.building[floor - 1].rooms[
          (roomid % (floor * 100)) - 1
        ].name = newname
        sendThemBack(json)
      })
    gotData()
    showSetting()
  }
}

function capChange() {
  var newcap = document.getElementById('newCap').value
  if (isNaN(newcap) || newcap < 1) {
    alert('Capacity require Number only!!')
    showSetting()
  } else {
    fetch(connectlink)
      .then((response) => response.json())
      .then((json) => {
        json.building[floor - 1].rooms[
          (roomid % (floor * 100)) - 1
        ].capacity = newcap
        sendThemBack(json)
      })
    gotData()
    showSetting()
  }
}

function modeChange() {
  var newstate = document.getElementById('newMode').value

  fetch(connectlink)
    .then((response) => response.json())
    .then((json) => {
      json.building[floor - 1].rooms[
        (roomid % (floor * 100)) - 1
      ].mode = newstate
      sendThemBack(json)
    })
  gotData()
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
  gotData()
  document.getElementById('roomNamebtn').innerHTML =
    '<button type="button" class="sbutton" onclick="goSetting(nnamee)">Edit</button>'

  document.getElementById('roomCapacitybtn').innerHTML =
    '<button type="button" class="sbutton" onclick="goSetting(cap)">Edit</button>'

  document.getElementById('roomSentrybtn').innerHTML =
    '<button type="button" class="sbutton" onclick="goSetting(mod)">Edit</button>'
}

showSetting()
