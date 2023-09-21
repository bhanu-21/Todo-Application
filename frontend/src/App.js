import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const info = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(info));

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
