let userData = {
  username: '',
  password: '',
}

const signup = ({ username, password }) => {
  // send post request to backend and create a user
  console.log(username, password)
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
const signupForm = document.querySelector('.signup-form')

usernameInput.addEventListener('input', inputChangeHandler)
passwordInput.addEventListener('input', inputChangeHandler)
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (!userData.username || !userData.password) {
    userInput.forEach((input) => {
      if (!input.value) {
        input.style.border = '1.5px solid red'
        input.style.background = '#e4baba'
      }
    })
  }

  signup(userData)
})
