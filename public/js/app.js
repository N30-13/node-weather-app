const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m-1')
const messageTwo = document.querySelector('#m-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  console.log(location)

  messageOne.textContent = 'loading...'




  fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
      messageOne.textContent = ''
      console.log(data)
      if (data.error) {
        return messageTwo.textContent = data.error
      }
      messageTwo.textContent = data.location + data.forecast
    })
  })
})
