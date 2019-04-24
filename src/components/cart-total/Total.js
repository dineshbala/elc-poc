import React, {Component} from 'react';
console.clear();

/* Total */
class Total extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayClass: 'overlay-bg hidden'
    };
    this.overLayTimeout = '';
    this._hideOverlay = this._hideOverlay.bind(this);
  }
  componentDidUpdate() {
    if (this.overLayTimeout) {
        clearTimeout(this.overLayTimeout);
    }
    this.overLayTimeout = setTimeout(function() {
        document.querySelectorAll('.js-cart-overlay')[0].classList.remove('slide-in');
    }, 4000);
  }
  _hideOverlay(e) {
    this.setState({
        overlayClass : this.state.overlayClass + ' hidden'
    });
  }
  render() {
    let that = this;
    let total = this.props.total.toFixed(2);
    let tax = (this.props.total * 0.15).toFixed(2);
    let totalIncTax = (+total + +tax).toFixed(2);
    let mystyle = {
      borderTop: "1px solid #ddd",
      marginTop: "10px"
    };
    let cartOverlayClass = 'js-cart-overlay product-list__cart-overlay';
    let cartListProducts = [];
    let buildProductsRow = function(obj, i) {
      function filterProduct(products) {
        if (products.id === i) {
          products.qty = obj.qty;
          products.subtotal = products.qty * products.price;
          return true;
        } else {
          return false;
        }
      }
      cartListProducts.push(that.props.products.find(filterProduct));
    }
    if(this.props.cartList.length) {
        this.props.cartList.map(buildProductsRow);
        document.querySelectorAll('.js-cart-overlay')[0].classList.add('slide-in');
    }
    return (
    <div>
      <div className={cartOverlayClass}>
        <div className="product-list__cart-overlay--item-container">
        {
        cartListProducts.map((data, i) => <div className="product-list__cart-overlay--each-item" key={Date.now()+i}><div className="product-list__cart-overlay--image"><img src={data.img} alt=""/></div><div className="product-list__cart-overlay--name">{data.name}<br/>Qty: {data.qty}</div><div className="product-list__cart-overlay--price">${data.subtotal.toFixed(2)}</div></div>)
        }
        </div>
        <div className="product-list__cart-overlay--total-price" style={{ fontWeight: 400 }}>
          <span className="col-6">total price:</span>
          <span className="col-6 text-right">${total}</span>
        </div>
      </div>
    </div>
    );
  }
}
export default Total;