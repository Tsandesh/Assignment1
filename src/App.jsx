
import './App.css'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { Profile } from './pages/Profile'

import useAuth from './hooks/useAuth'

function App() {
    const {isAuth , loading , setLoading} = useAuth()
 return(
    <>
     <Toaster />
        {
            isAuth ? <AuthRoutes/> : <UnAuthRoutes setLoading={setLoading} loading={loading}/>
        }
    </>
 )
}

export default App;

const UnAuthRoutes = ({setLoading , loading})=> {
     return <Routes>
        <Route path="/" element={<Login setLoading={setLoading} loading={loading}/>}/>
     </Routes>
}


const AuthRoutes = ()=> {
        return <Routes>
                    <Route path="/" element={<Profile /> }/>
        </Routes>
    }