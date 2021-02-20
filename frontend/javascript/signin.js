const SIGNIN_URL = 'https://exceed11.cpsk-club.xyz/auth'

const signoutLink = document.querySelector('.signout')
const editRoomLink = document.querySelector('.edit-room')

const token = sessionStorage.getItem('access_token')
if (token) {
  window.location.href = './index.html'
} else {
  signoutLink.parentElement.style.display = 'none'
  editRoomLink.parentElement.style.display = 'none'
}

const handleSignin = ({ username, password }) => {
  return fetch(SIGNIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
}

const inputChangeHandler = (e) => {
  e.target.style.border = '1.5px solid transparent'
  e.target.style.background = '#eee'
  const inputName = e.target.name
  userData[inputName] = e.target.value
}

const displayErrorMessage = (message) => {
  errorMessage.innerText = message
  errorMessage.style.display = 'block'
}

const setInvalidFields = () => {
  userInput.forEach((input) => {
    if (!input.value) {
      input.style.border = '1.5px solid red'
      input.style.background = '#e4baba'
    }
  })
}

let userData = {
  username: '',
  password: '',
}

const usernameInput = document.querySelector('.username-input')
const passwordInput = document.querySelector('.password-input')
const userInput = [usernameInput, passwordInput]
const signinForm = document.querySelector('.signin-form')
const errorMessage = document.querySelector('.error-message')

usernameInput.addEventListener('input', inputChangeHandler)
passwordInput.addEventListener('input', inputChangeHandler)

signinForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (!userData.username || !userData.password) {
    setInvalidFields()
    displayErrorMessage('Username and password cannot be blank.')
    return
  }

  handleSignin(userData)
    .then((response) => response.json())
    .then((responseData) => {
      const token = responseData.access_token
      if (!token) {
        displayErrorMessage('Incorrect username or password.')
        return
      }
      sessionStorage.setItem('access_token', token)
      window.location.href = './index.html'
    })
    .catch((err) => {
      console.log(err)
    })
})
