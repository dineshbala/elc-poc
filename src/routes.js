import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Welcome from '././components/welcome/Welcome';
import MyAccount from '././components/my-account/MyAccount';
import AddressBook from '././components/my-account/AddressBook';
import Viewcart from '././components/viewcart/Viewcart';
import Login from '././components/login/Login';
import Change_password from '././components/change-password/Change_password';
import Forgot_Password from '././components/forgot-password/Forgot_Password';
import Signup from '././components/signup/Signup';
import NotFound from '././components/not-found/NotFound';
import ProductList from '././components/products/ProductList';
import Checkout from '././components/checkout/Checkout';
import Payment from '././components/payment/Payment';
import ProductView from '././components/products/ProductView';

const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/my_account" component={MyAccount}/>
          <Route path="/AddressBook" component={AddressBook}/>
          <Route path="/viewcart" component={Viewcart}/>
          <Route path="/login" component={Login}/>
          <Route path="/change_password" component={Change_password}/>
          <Route path="/forgot_password" component={Forgot_Password}/>
          <Route path="/Signup" component={Signup}/>
          <Route path="/products/:category" component={ProductList}/>
          <Route path="/product_view/:id/:sku" component={ProductView}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/payment" component={Payment}/>
          <Route path="*" component={NotFound}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;