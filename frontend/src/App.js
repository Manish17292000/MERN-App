import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CustomerList from './components/customer-list.component'
import VendorList from './components/vendor-list.component'
import VendorView from './components/vendor-view.component'
import CustomerView from './components/customer-view.component'
import Login from './components/login.component'
import CreateUser from './components/create-user.component'
import UsersView from './components/user-view'


function App() {
  return (
    <Router>
        <Route path="/" exact component={UsersList}/>
        <Route path="/user"  component={Login}/>
        <Route path="/customerget" component={CustomerList}/>
        <Route path="/vendorget" component={VendorList}/>
        <Route path="/register" component={CreateUser}/>
        <Route path="/vendorview/:id" component={VendorView}/>
        <Route path="/vendorview/:id/addproduct" component={VendorView}/>
        <Route path="/customerview/:id" component={CustomerView}/>
    </Router>
  );
}

export default App;
