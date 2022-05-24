import App from 'app'
import image from 'images/image.jpg'
import log from 'modules/module'
import React from 'react'
import { createRoot } from 'react-dom/client'

console.log(image)

// for edge 17 promise polyfill upload, because edge 17 don't contain finally
Promise.resolve().finally()

log()
const root = createRoot(document.getElementById('app'))
root.render(<App />)
