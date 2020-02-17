import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CustomerList from './components/customer-list.component'
import VendorList from './components/vendor-list.component'
import VendorView from './components/vendor-view.component'
import VendorViewAdd from './components/vendor-view-add.component'
import CustomerView from './components/customer-view.component'
import Login from './components/login.component'
import CreateUser from './components/create-user.component'
import UsersView from './components/user-view'
import CustomerOrder from './components/customer-view-order'
import CustomerViewOrder from './components/customer-order'


function App() {
  return (
    <Router>
        <Route path="/" exact component={UsersList}/>
        <Route path="/user"  component={Login}/>
        <Route path="/customerget" component={CustomerList}/>
        <Route path="/register" component={CreateUser}/>
        <Route path="/vendorget" component={VendorList}/>
        <Route path="/:id/vendorview" component={VendorView}/>
        <Route path="/:id/addproduct" component={VendorViewAdd}/>
        <Route path="/:id/listproduct" component={VendorList}/>
        <Route path="/:id/customerview" component={CustomerView}/>
        <Route path="/:id/order" component={CustomerOrder}/>
        <Route path="/:id/vieworder" component={CustomerViewOrder}/>
    </Router>
  );
}

export default App;
