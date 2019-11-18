import banana from './banana.jpg'

const addImage = () => {
  const img =  document.createElement('img')
  img.src = banana
  img.alt = 'banana'
  img.width = '300'

  const body = document.querySelector('body')
  body.append(img)
}

export default addImage