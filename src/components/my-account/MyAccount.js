import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { API } from '../../services/API';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; 
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton,
} from 'react-accessible-accordion';
import OrderList from './OrderList';
import { css } from '@emotion/core';
import LoadingIcon from '../common/RingLoader';
import {lang} from '../../lang/en_us';
import './MyAccount.css';
import '../../styles/react-confirm-alert.css';
import 'react-accessible-accordion/dist/fancy-example.css';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      redirectToReferrer: false,
      FirstName:'',
      LastName:'',
      MobileNumber:'',
      userEmail:'',
      orderList: '',
      showLoading: true,
    };
    this.logout = this.logout.bind(this);
    if(sessionStorage.getItem('userData')){
      let userData = JSON.parse(sessionStorage.getItem("userData"));
      this.state.user_id = userData.userData.user_id;
    }
  }
  componentDidMount() {
    API('orderhistory',this.state).then((result) => {
      let responseJson = result;
      if (responseJson.orderhistory) {
        this.setState({
          orderList: responseJson.orderhistory,
          showLoading: false,
        });
      } else {
        this.setState({
          showLoading: false
        });
      }
    });
  }
  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState({redirectToReferrer: true});
  }
  componentWillMount() {
    if(sessionStorage.getItem('userData')){
      let data = JSON.parse(sessionStorage.getItem("userData"));
      this.setState({
        FirstName: data.userData.firstname,
        LastName: data.userData.lastname,
        MobileNumber: data.userData.mobile,
        userEmail: data.userData.email
      });
    }
  }
  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    if (this.state.showLoading) {
      return <LoadingIcon />;
    }
    var orders = this.state.orderList.map(function(order, i) {
      return (
        <OrderList
          orderNumber={order.orderNumber}
          orderDate={order.orderDate}
          orderStatus={order.orderStatus} />
      );
    });
    return (
      <div className="row site-container">
        <div className="medium-12 columns">
          <div>{lang.welcome} {this.state.FirstName} {this.state.LastName},</div>
          <div><b>{lang.your_email}{lang.colon}</b> {this.state.userEmail},</div>
          <div><a href="/change_password">{lang.change_password}</a></div>
          <div><b>{lang.title_below_order_history}{lang.colon}</b></div>
          <Accordion allowZeroExpanded={true}>
            {orders}
          </Accordion>
        </div>
      </div>
    );
  }
}
export default MyAccount;