// dummy
let data = [
  {
    number: 1,
    rooms: [
      {
        roomid: 101,
        max: 40,
        current: 12,
        temp: 35,
        light: 0,
      },
      {
        roomid: 102,
        max: 20,
        current: 10,
        temp: 35,
        light: 1,
      },
      {
        roomid: 103,
        max: 30,
        current: 28,
        temp: 35,
        light: 1,
      },
      {
        roomid: 104,
        max: 30,
        current: 25,
        temp: 35,
        light: 0,
      },
    ],
  },
  {
    number: 2,
    rooms: [
      {
        roomid: 201,
        max: 10,
        current: 1,
        temp: 35,
        light: 1,
      },
      {
        roomid: 202,
        max: 20,
        current: 15,
        temp: 32,
        light: 0,
      },
      {
        roomid: 203,
        max: 40,
        current: 31,
        temp: 30,
        light: 1,
      },
      {
        roomid: 204,
        max: 20,
        current: 10,
        temp: 40,
        light: 0,
      },
      {
        roomid: 205,
        max: 10,
        current: 9,
        temp: 38,
        light: 1,
      },
    ],
  },
]

const changeColor = (room, colorScale) => {
  room.style.color = 'black'
  if (colorScale === 0) {
    room.style.background = colors[0]
  } else if (colorScale === 5) {
    room.style.background = colors[4]
    room.style.color = 'white'
  } else {
    room.style.background = colors[colorScale - 1]
  }
}

let floorCache = []
let roomCache = []
// from green to red
const colors = ['#63ff00', '#d6ff00', '	#ffff00', '#ffc100', '	#ff0000']

const floorNumber = document.querySelector('.floor-number')
const floorNav = document.querySelector('.floor-nav')
const floorContainer = document.querySelector('.floor')

const updateElement = () => {
  data.forEach((floor, index) => {
    // check the fetched data changed by using cache array
    if (!floorCache.includes(floor.number)) {
      // add floor selection nav
      const li = document.createElement('li')
      li.innerText = `Floor ${floor.number}`
      floorNav.appendChild(li)

      // create room for each floor
      const rooms = document.createElement('div')
      rooms.classList.add('rooms', `rooms${index}`)
      floor.rooms.forEach(() => {
        const roomElement = document.createElement('div')
        roomElement.classList.add('room')
        rooms.appendChild(roomElement)
      })

      floorContainer.appendChild(rooms)

      // save data to cache
      floorCache.push(floor.number)
    }
  })
}

const updateContent = () => {
  data.forEach((floor, floorIndex) => {
    // check the fetched data changed by using cache array
    if (!roomCache.includes(floor.rooms)) {
      const roomsContainer = floorContainer.children[floorIndex]
      const rooms = [...roomsContainer.children]

      floor.rooms.forEach((room, roomIndex) => {
        const percent = (room.current / room.max) * 100
        const scale = Math.floor(percent / 20)
        changeColor(rooms[roomIndex], scale)

        rooms[roomIndex].innerHTML = `${room.current}/${room.max}`
      })

      addClickEvent()
      // save data to cache
      roomCache.push(floor.rooms)
    }
  })
}

const addClickEvent = () => {
  const links = [...floorNav.children]
  const roomByFloor = [...floorContainer.children]
  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      floorNumber.innerText = e.target.innerText

      roomByFloor.forEach(function (rbf) {
        rbf.classList.remove('active')
      })

      links.forEach(function (otherLink) {
        otherLink.classList.remove('active')
      })

      roomByFloor[index].classList.add('active')
      links[index].classList.add('active')
    })
  })
}

// initial
updateElement()
updateContent()

// implement short polling
setInterval(() => {
  updateElement()
  updateContent()
}, 2000)

// update dummy data
setTimeout(() => {
  data = [
    {
      number: 1,
      rooms: [
        {
          roomid: 101,
          max: 40,
          current: 20,
          temp: 34,
          light: 1,
        },
        {
          roomid: 102,
          max: 20,
          current: 19,
          temp: 36,
          light: 1,
        },
        {
          roomid: 103,
          max: 30,
          current: 10,
          temp: 34,
          light: 0,
        },
        {
          roomid: 104,
          max: 30,
          current: 12,
          temp: 36,
          light: 1,
        },
      ],
    },
    {
      number: 2,
      rooms: [
        {
          roomid: 201,
          max: 10,
          current: 10,
          temp: 34,
          light: 0,
        },
        {
          roomid: 202,
          max: 20,
          current: 12,
          temp: 31,
          light: 1,
        },
        {
          roomid: 203,
          max: 40,
          current: 37,
          temp: 35,
          light: 1,
        },
        {
          roomid: 204,
          max: 20,
          current: 5,
          temp: 36,
          light: 1,
        },
        {
          roomid: 205,
          max: 10,
          current: 4,
          temp: 35,
          light: 1,
        },
      ],
    },
  ]
}, 3000)

const signinLink = document.querySelector('.signin')

// signinLink.addEventListener('click', () => {
//   history.pushState({}, '', 'signin.html')
// })
