import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
/**
  * Single page product template. Each product information 
  * will be displayed in separate page with tabbed specifications
**/
class ProductSpecification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'details'
    };
  }
  render() {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}>
        <Tab eventKey="details" title="Details">
          {this.props.product.PRODUCT_DETAILS_MOBILE}
        </Tab>
        <Tab eventKey="usage" title="Usage">
          <p>{this.props.product.ATTRIBUTE_DESC_3}</p>
        </Tab>
        <Tab eventKey="ingredients" title="Ingredients">
          <p>{this.props.product.ATTRIBUTE_DESC_4}</p>
        </Tab>
      </Tabs>
    );
  }
}
export default ProductSpecification;