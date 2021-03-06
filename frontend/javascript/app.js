let data = []
let roomCache = []
let links = []
let roomByFloor = []
const BUILDING_DATA_URL = 'https://exceed11.cpsk-club.xyz'
// from green to red
const colors = ['#63ff00', '#d6ff00', '	#ffff00', '#ffc100', '	#ff0000']
const floorNumber = document.querySelector('.floor-number')
const floorNav = document.querySelector('.floor-nav')
const floorContainer = document.querySelector('.floor')
const signinLink = document.querySelector('.signin')
const signoutLink = document.querySelector('.signout')
const editRoomLink = document.querySelector('.edit-room')

// check authentication
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

const fetchData = () => {
  return fetch(BUILDING_DATA_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      data = responseData.building
    })
}

const changeColor = (room, colorScale) => {
  if (colorScale === 0) {
    room.style.background = colors[0]
  } else if (colorScale === 5) {
    room.style.background = colors[4]
  } else {
    room.style.background = colors[colorScale - 1]
  }
}

const updateElement = () => {
  data.forEach((floor, index) => {
    // add floor selection nav
    const li = document.createElement('li')
    li.innerText = `Floor ${floor.floor_number}`
    floorNav.appendChild(li)

    // create room for each floor
    const rooms = document.createElement('div')
    rooms.classList.add('rooms', `rooms${index}`)
    floor.rooms.forEach((room) => {
      const roomElement = document.createElement('div')
      roomElement.classList.add('room')

      roomElement.addEventListener('click', () => {
        window.location.href = `./graph.html?roomid=${room.room_id}&floor=${
          index + 1
        }`
      })

      const roomName = document.createElement('h3')
      const status = document.createElement('div')
      status.classList.add('status')

      const light = document.createElement('div')
      light.classList.add('light')
      const temp = document.createElement('p')
      temp.classList.add('temp')
      const people = document.createElement('div')
      people.classList.add('people')
      const peopleAmount = document.createElement('p')
      peopleAmount.classList.add('people-amount')
      const peopleStatus = document.createElement('div')
      peopleStatus.classList.add('people-status')

      people.appendChild(peopleStatus)
      people.appendChild(peopleAmount)
      status.appendChild(people)
      status.appendChild(light)
      status.appendChild(temp)
      roomElement.appendChild(roomName)
      roomElement.appendChild(status)
      rooms.appendChild(roomElement)
    })

    floorContainer.appendChild(rooms)

    links = [...floorNav.children]
    roomByFloor = [...floorContainer.children]

    li.addEventListener('click', (e) => {
      toggleActive(e, index)
    })
  })
}

const updateContent = () => {
  data.forEach((floor, floorIndex) => {
    // check the fetched data changed by using cache array
    if (!roomCache.includes(floor.rooms)) {
      const roomsContainer = floorContainer.children[floorIndex]
      const rooms = [...roomsContainer.children]

      floor.rooms.forEach((room, roomIndex) => {
        const roomElement = rooms[roomIndex]
        const percent = (room.current / room.capacity) * 100
        const scale = Math.floor(percent / 20)

        const roomName = roomElement.querySelector('h3')
        const peopleAmount = roomElement.querySelector('.people-amount')
        const peopleStatus = roomElement.querySelector('.people-status')
        const light = roomElement.querySelector('.light')
        const temp = roomElement.querySelector('.temp')

        roomName.innerText = `${room.name}`
        peopleAmount.innerText = `${room.current}/${room.capacity}`
        changeColor(peopleStatus, scale)
        light.innerHTML = `<i class="fa${
          room.light === 1 ? 's' : 'r'
        } fa-lightbulb fa-2x"></i>`
        temp.innerHTML = `${room.temp}&deg;C`
      })

      // save data to cache
      roomCache.push(floor.rooms)
    }
  })
}

const toggleActive = (e, index) => {
  floorNumber.innerText = e.target.innerText

  roomByFloor.forEach(function (rbf) {
    rbf.classList.remove('active')
  })
  links.forEach(function (otherLink) {
    otherLink.classList.remove('active')
  })

  roomByFloor[index].classList.add('active')
  e.target.classList.add('active')
  sessionStorage.setItem('activeIndex', index)
}

// initial
fetchData()
  .then(() => {
    updateElement()
    updateContent()
    let activeIndex = sessionStorage.getItem('activeIndex')
    if (activeIndex) {
      floorNumber.innerText = links[activeIndex].innerText
      links[activeIndex].classList.add('active')
      roomByFloor[activeIndex].classList.add('active')
    } else {
      floorNumber.innerText = 'Please select the floor to display'
    }
  })
  .catch((err) => {
    console.log(err)
  })

// implement short polling
setInterval(() => {
  fetchData()
    .then(() => {
      updateContent()
    })
    .catch((err) => {
      console.log(err)
    })
}, 5000)
