import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Context/User.jsx'
import { SongProvider } from './Context/song.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <SongProvider>
        <App />
      </SongProvider>
    </UserProvider>
  </StrictMode>,
)
