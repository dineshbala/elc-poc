import React from 'react';
import './RecentCategory.css'
import { Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem, NavDropdown,Card } from 'react-bootstrap';
// Employee Component
const cardstyles = {
    width: '25rem',
    padding: '2.5rem 2.5rem 3rem',
    border: 'none'
}
const cardimage = {
    width: '360px',
    height: '360px'
}
class RecentCategory extends React.Component {
  render() {
    return (
        <Card style={cardstyles}>
        <Card.Img  style={cardimage} variant="top" src={this.props.domain + this.props.prodImage}/>
        <Card.Body>
            <Card.Title >{this.props.prodName}</Card.Title>
            <hr></hr>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <p>Price:{this.props.prodPrice}</p>
            <a className="recent_shop_now" href={this.props.productURL}>Shop Now</a>
        </Card.Body>
        </Card>
    );
  }
}

export default RecentCategory;
