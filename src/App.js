import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import MakeTransfer from './Components/MakeTransfer/MakeTransfer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  const[user, setUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);

  const defaultRouting = () => {
    if (!signedIn) {
      return <Home />
    } else {
      return <LandingPage user={user} /> 
    }
  }

  const fetchUser = () => {
    fetch('http://localhost:8001/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(data => data.json())
    .then(data => {
      if (data) {
        console.log(data);
        setUser(data);
        setSignedIn(true);
      }
    });
  }

  useEffect(() => {
    fetchUser();
    }, []);

  return (
    <Router>
    <div className="App">
      <Navbar setSignedIn={setSignedIn} signedIn={signedIn} setUser={setUser} />
      <Routes>
        <Route path="/" element={ defaultRouting() }/>
        <Route path="/login" exact element={<Login fetchUser={fetchUser} />}/>
        <Route path="/maketransfer" exact element={<MakeTransfer setUser={setUser} />}/>
        </Routes>
    </div>
  </Router>
  );
}

export default App;
