import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';

//pages
// import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activate from './pages/Activate';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import {Provider} from 'react-redux'
import store from './store'
//components
import Layout from './hocs/Layout'
import Aura from './hocs/Aura';

import AuthContext from './context/AuthContext';

const App=()=>(
  <Provider store={store}>
    <BrowserRouter>
    
      <Layout>
        <Routes>
          <Route exact path='/*' element={<Aura/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/reset_password' element={<ResetPassword/>}/>
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
          <Route exact path='/activate/:uid/:token' element={<Activate/>}/>

        </Routes>
      </Layout>
      
    </BrowserRouter>
    
  </Provider>
);

export default App;
