import React from 'react';
import { Nav } from 'react-bootstrap';
/**
  * Build menu items
**/
class MenuList extends React.Component {
  render() {
    return (
      <Nav.Link href={this.props.productsImagePath + this.props.menuUrl}>{this.props.menuName}</Nav.Link>
    );
  }
}
export default MenuList;