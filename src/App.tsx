import './App.css'
import TitleCard from './title-card'
import EpisodePage from './episode-page'
import { Parallax } from 'react-scroll-parallax'

function App() {

  return (
    <>
      <Parallax speed={-75}>
        <TitleCard />
      </Parallax>
      <Parallax speed={0}>
        <EpisodePage text="One!" />
      </Parallax>
    </>
  )
}

export default App
