// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ContactList from "./componenets/ContacList";
import SignUp from "./componenets/SignUp";
import SignIn from  "./componenets/SignIn";
import PrivateRoute from "./componenets/PrivateRoute";

function App() {

  return (
    <Provider store={store}>
      <div >
        <h4 style={{paddingLeft:"25em"}}>React Contact App</h4>
        <BrowserRouter>
          <Routes>
            <Route exact path='/list' element={<PrivateRoute/>}>
              <Route exact path='/list' element={<ContactList/>}/>
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
