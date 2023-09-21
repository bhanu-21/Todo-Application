import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './authentication/Register';
import Login from './authentication/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
