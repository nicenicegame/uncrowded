const BUILDING_DATA_URL = 'https://exceed11.cpsk-club.xyz'

const signinLink = document.querySelector('.signin')
const signoutLink = document.querySelector('.signout')
const editRoomLink = document.querySelector('.edit-room')

const token = sessionStorage.getItem('access_token')
if (token) {
  signinLink.parentElement.style.display = 'none'
} else {
  signoutLink.parentElement.style.display = 'none'
  editRoomLink.parentElement.style.display = 'none'
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
  var a = '<h2>People in ' + roomname + ' (Bar)</h2>'
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

var roomid = getUrlParam('roomid', 'outside')

var floor = getUrlParam('floor', '0')

var label = []
var people = [0]
var light = [0]
var bgcolor = ['rgba(75, 192, 192, 0.2)']
var bodycolor = ['rgba(75, 192, 192, 1)']
var sumlight = 0
var temperature = [0]
function energyCal(status) {
  if (status == 1) {
    sumlight++
  }
  light.push(sumlight)
}

function coloringGraph(people, cap) {
  if (people < cap * 0.8) {
    bgcolor.push('rgba(75, 192, 192, 0.2)')
    bodycolor.push('rgba(75, 192, 192, 1)')
  } else {
    if (people < cap) {
      bgcolor.push('rgba(255, 206, 86, 0.2)')
      bodycolor.push('rgba(255, 206, 86, 1)')
    } else {
      bgcolor.push('rgba(255, 99, 132, 0.2)')
      bodycolor.push('rgba(255, 99, 132, 1)')
    }
  }
}

const fetchData = () => {
  return fetch(BUILDING_DATA_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      people.push(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .current
      )
      energyCal(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .light
      )
      coloringGraph(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .current,
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .capacity
      )
      temperature.push(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .temp
      )
      peopleName(
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
      peoplebarName(
        responseData.building[floor - 1].rooms[(roomid % (floor * 100)) - 1]
          .name
      )
    })
}

function formatAMPM(date) {
  var sec = date.getSeconds()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  sec = sec < 10 ? '0' + sec : sec
  var strTime = hours + ':' + minutes + ':' + sec + ' ' + ampm
  return strTime
}

function makegraph() {
  var ctx = document.getElementById('Peopleg').getContext('2d')
  var peopleChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [
        {
          label: 'number of people',
          data: people,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  })

  var ctb = document.getElementById('Peoplebar').getContext('2d')
  var peopleChart = new Chart(ctb, {
    type: 'bar',
    data: {
      labels: label,
      datasets: [
        {
          label: 'number of people',
          data: people,
          backgroundColor: bgcolor,
          borderColor: bodycolor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  })

  var pwx = document.getElementById('Powerg').getContext('2d')
  var powerChart = new Chart(pwx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [
        {
          label: 'sum of energy usage',
          data: light,
          backgroundColor: ['rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 206, 86, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  })

  var tmpx = document.getElementById('tempg').getContext('2d')
  var tempChart = new Chart(tmpx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [
        {
          label: 'Temperature in Celcius',
          data: temperature,
          backgroundColor: ['rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(153, 102, 255, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  })
}

fetchData()
label.push(formatAMPM(new Date()))
makegraph()
setInterval(() => {
  fetchData()
  label.push(formatAMPM(new Date()))
  makegraph()
}, 15000)
