import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from '../components/Auth';
import LogIn from './LogIn';
import Weather from '../components/Weather';
import HomeSignIn from './HomeSignIn';
import Home from './Home';
import Navigation from './Navigation';

function AppRouter({ isLoggedIn, userObj }: any) {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path='/Scheduler' element={<HomeSignIn userObj={userObj} />} />
                    </>
                ) : (
                    <>
                        <Route path='/Scheduler' element={<Home userObj={userObj} />} />
                        <Route path='/LogIn' element={<LogIn />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;