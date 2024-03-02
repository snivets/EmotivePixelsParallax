import React from 'react'
import ReactDOM from 'react-dom/client'
import FullScreenCards from './App.tsx'
import { ParallaxProvider } from 'react-scroll-parallax'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ParallaxProvider>
    <React.StrictMode>
      <FullScreenCards />
    </React.StrictMode>
  </ParallaxProvider>,
)
