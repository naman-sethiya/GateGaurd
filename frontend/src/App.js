import React from 'react';
import './index.css';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import Register from './pages/Register';
import store from './store/store.js';
import NotFound from './pages/NotFound.js';

const App = () => {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App