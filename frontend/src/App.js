import './App.css';
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Login from './Pages/Auth/Login';
import HodHome from './Pages/HOD/HodHome';

import { useSelector, useDispatch } from 'react-redux';
import setIsLogged from './States/action-creators/index'



function App() {

  const user = useSelector(state=>state.User)
  console.log(user)

  return (


      <Routes>

        //Authentication
        <Route path='/' element={ user.isAuthticated ? <HodHome /> : <Login/>}/>

      </Routes>

  )
}

export default App;
