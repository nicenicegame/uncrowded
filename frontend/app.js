// dummy
let data = [
  {
    number: 1,
    rooms: [
      {
        max: 40,
        current: 12,
      },
      {
        max: 20,
        current: 10,
      },
      {
        max: 30,
        current: 28,
      },
      {
        max: 30,
        current: 25,
      },
    ],
  },
  {
    number: 2,
    rooms: [
      {
        max: 10,
        current: 1,
      },
      {
        max: 20,
        current: 15,
      },
      {
        max: 40,
        current: 31,
      },
      {
        max: 20,
        current: 10,
      },
      {
        max: 10,
        current: 9,
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
      const li = `<li>Floor ${floor.number}</li>`
      floorNav.innerHTML += li

      // add room of each floor (just container)
      const rooms = `
        <div class="rooms rooms${index}">
          ${floor.rooms
            .map((room) => {
              return `<div class="room"></div>`
            })
            .join('')}
        </div>
        `

      floorContainer.innerHTML += rooms

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

      roomByFloor[index].classList.add('active')
    })
  })
}

// implement short polling
setInterval(() => {
  updateElement()
  updateContent()
  addClickEvent()
}, 1000)

// update dummy data
setTimeout(() => {
  data = [
    {
      number: 1,
      rooms: [
        {
          max: 40,
          current: 15,
        },
        {
          max: 20,
          current: 5,
        },
        {
          max: 30,
          current: 12,
        },
        {
          max: 30,
          current: 25,
        },
      ],
    },
    {
      number: 2,
      rooms: [
        {
          max: 10,
          current: 10,
        },
        {
          max: 20,
          current: 12,
        },
        {
          max: 40,
          current: 12,
        },
        {
          max: 20,
          current: 14,
        },
        {
          max: 10,
          current: 0,
        },
      ],
    },
  ]
}, 5000)
