import './App.css';
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Login from './Pages/Auth/Login';


function App() {
  return (


    <BrowserRouter>
      <Routes>

        //Authentication
        <Route path='/' element={<Login/>}/>


      </Routes>
    </BrowserRouter>

  )
}

export default App;
