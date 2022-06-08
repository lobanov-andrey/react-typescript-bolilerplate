import App from 'app'
import image from 'images/image.jpg'
import log from 'modules/module'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.sass'

console.log(image)

const root = createRoot(document.getElementById('app'))
root.render(<App />)
