let userData = {
  username: '',
  password: '',
}

const SIGNIN_URL = ''

const signin = ({ username, password }) => {
  // send post request to backend and create a user
  return fetch(SIGNIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { username, password } }),
  })
}

const inputChangeHandler = (e) => {
  e.target.style.border = '1.5px solid transparent'
  e.target.style.background = '#eee'
  const inputName = e.target.name
  userData[inputName] = e.target.value
}

const usernameInput = document.querySelector('.username-input')
const passwordInput = document.querySelector('.password-input')
const userInput = [usernameInput, passwordInput]
const signinForm = document.querySelector('.signin-form')

usernameInput.addEventListener('input', inputChangeHandler)
passwordInput.addEventListener('input', inputChangeHandler)
signinForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (!userData.username || !userData.password) {
    userInput.forEach((input) => {
      if (!input.value) {
        input.style.border = '1.5px solid red'
        input.style.background = '#e4baba'
      }
    })
  }

  signin(userData)
    .then((response) => response.json())
    .then((responseData) => console.log(responseData))
})
