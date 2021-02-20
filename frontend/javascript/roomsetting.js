const signinLink = document.querySelector('.signin')
const signoutLink = document.querySelector('.signout')

const token = sessionStorage.getItem('access_token')
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

let roomstat = [
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
]

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

console.log(roomstat)
console.log(roomstat[floor - 1].rooms[roomid - floor * 100 - 1].roomid)
console.log(roomstat[floor - 1].rooms[roomid - floor * 100 - 1].roomname)
console.log(roomstat[floor - 1].rooms[roomid - floor * 100 - 1].capacity)
console.log(roomstat[floor - 1].rooms[roomid - floor * 100 - 1].mode)

function sendThemBack() {
  /*fetch put back*/
}

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
    document.getElementById('newName').value =
      roomstat[floor - 1].rooms[roomid - floor * 100 - 1].roomname
    document.getElementById('roomNamebtn').innerHTML =
      '<button type="button" class="cfbutton" onclick="nameChange()">Submit</button> <button type="button" class="notbutton" onclick="showSetting()">Cancel</button>'
  } else if (inputtype == 'capa') {
    document.getElementById('roomCapacity').innerHTML =
      '<input type="text" id="newCap">'
    document.getElementById('newCap').value =
      roomstat[floor - 1].rooms[roomid - floor * 100 - 1].capacity
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
  document.getElementById('roomID').innerHTML =
    roomstat[floor - 1].rooms[roomid - floor * 100 - 1].roomid
  document.getElementById('roomName').innerHTML =
    roomstat[floor - 1].rooms[roomid - floor * 100 - 1].roomname
  document.getElementById('roomNamebtn').innerHTML =
    '<button type="button" class="sbutton" onclick="goSetting(nnamee)">Edit</button>'
  document.getElementById('roomCapacity').innerHTML =
    roomstat[floor - 1].rooms[roomid - floor * 100 - 1].capacity
  document.getElementById('roomCapacitybtn').innerHTML =
    '<button type="button" class="sbutton" onclick="goSetting(cap)">Edit</button>'
  document.getElementById('roomSentry').innerHTML = onoffStatus(
    roomstat[floor - 1].rooms[roomid - floor * 100 - 1].mode
  )
  document.getElementById('roomSentrybtn').innerHTML =
    '<button type="button" class="sbutton" onclick="goSetting(mod)">Edit</button>'
}

showSetting()
