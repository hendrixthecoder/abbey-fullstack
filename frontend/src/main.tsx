import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext.jsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
<Router>
    <UserContextProvider>
        <App />
    </UserContextProvider>
</Router>
)
