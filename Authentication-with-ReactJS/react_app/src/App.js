import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createBrowserHistory } from 'history';

function App() {
  const history = createBrowserHistory();

  return (
    <div className="App">

      <Router history={history}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login history={history} />} />
          <Route exact path="/signup" element={<Signup history={history} />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
