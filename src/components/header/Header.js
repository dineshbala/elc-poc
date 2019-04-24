import React, { Component } from 'react';
import { API } from '../../services/API';
import { Container, Col, Form, Navbar, Nav, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuList from '../../components/header/MenuList';
import { lang } from '../../lang/en_us';
import { siteConfig } from '../../config/en_us';
import './Header.css';
import "react-responsive-carousel/lib/styles/carousel.css";

let productsImagePath = '/products';
/**
  * Header component that will render in all the
  * pages
**/
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainMenu:[],
      redirectToReferrer: false,
    }; 
    this.logout = this.logout.bind(this);
  }
  /**
   * Build global menu displayed in the header
   * Data fetched from Database
  **/
  componentDidMount() {
    API('menuCatSubcatLists',this.state).then((result) => {
      let responseJson = result;
      if (responseJson.catMenuLists) {
          this.setState({mainMenu: responseJson.catMenuLists});
      }
    });
  }
  /**
   * Logout action
  **/
  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.setItem("orderNumber",'');
    sessionStorage.clear();
    this.setState({redirectToReferrer: true});
  }
  /**
   * Update state based on user details
   * from session
  **/
  componentWillMount() {
    if(sessionStorage.getItem('userData')){
      let data = JSON.parse(sessionStorage.getItem("userData"));
      this.setState({userName: data.userData.name,userEmail: data.userData.email});
    }
  }
  render() {
    if (this.state.redirectToReferrer) {
      window.location.href="/login";
    }
    var strUserName = sessionStorage.getItem('userData');
    const style     = strUserName ? {display: 'none'} : {};
    const style1    = !strUserName ? {display: 'none'} : {};
    /**
     * Build global nav menu items
    **/
    var menu_list = this.state.mainMenu.map(menu => (
      <MenuList 
        menuId={menu.id} 
        menuName={menu.menuName} 
        menuUrl={menu.menuUrl} 
        productsImagePath={productsImagePath}
        key={Date.now()+Math.random()} />
    ));
    return (
      <div className="callout primary" id="Header">
        <div className="container-fluid justify-content-center header-nav__container">
          <Navbar collapseOnSelect fixed="top" className="header_nav d-flex flex-column justify-content-center" expand="lg"  >
            <div className='top_header pt-2 pb-2'>
              <img src={siteConfig.logoImagePath} alt={siteConfig.logoAltText} />
            </div>
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse className="responsive-navbar-nav">
                <Nav>
                  <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                    <InputGroup>
                      <Form.Control
                        className='search_input'
                        type="text"
                        placeholder="Search"
                        aria-describedby="inputGroupPrepend"
                        required />
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend" className="search_icon"><FontAwesomeIcon icon="search" /></InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Form.Group>
                </Nav>
                <Nav className="mx-auto">
                  <Nav.Link href="/">{lang.home}</Nav.Link>
                  {menu_list}
                </Nav>
                <Nav>
                  <Nav.Link href="/login" style={style}><FontAwesomeIcon icon="user" /></Nav.Link> 
                  <Nav.Link href="/signup" style={style}><FontAwesomeIcon icon="user-plus" /></Nav.Link>
                  <Nav.Link href="/my_account" style={style1}>{lang.my_account}</Nav.Link>
                  <Nav.Link href="#" onClick={this.logout} style={style1}>{lang.log_out}</Nav.Link>
                  <Nav.Link href="/viewcart"><FontAwesomeIcon icon="shopping-cart" /></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    );
  }
}
export default Header;