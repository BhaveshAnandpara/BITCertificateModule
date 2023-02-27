import './App.css';
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Login from './Pages/Auth/Login';


function App() {
  return (


      <Routes>

        //Authentication
        <Route path='/' element={<Login/>}/>


      </Routes>

  )
}

export default App;
