import React from 'react';
import { observer, inject } from 'mobx-react';
import Product from './Product';
import { API } from '../../services/API';
import CartOverlay from '../cart-overlay/CartOverlay';
import LoadingIcon from '../common/RingLoader'
import { siteConfig } from '../../config/en_us';
import '../../styles/common-styles.css';
import './Product.css';

console.clear();
const domain = siteConfig.domain;

/**
  * MPP container which build from product partials
**/
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      productList: "",
      showLoading: true,
      subCategoryId: "",
      qsOpenedForItems: [],
      qsSelectedProductSkus: {},
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.qsSelectedProductSkus = this.qsSelectedProductSkus.bind(this);
  }
  /**
    * MPP products listed from DB
  **/
  componentDidMount() {
	  this.setState({
		  subCategoryId: this.props.match.params.category
    });
    API('productlist',this.state).then((result) => {
      let responseJson = result;
      if (responseJson.productData) {
        this.setState({
          productList: responseJson.productData,
          showLoading: false
        });
      } else {
        this.setState({
          showLoading: false
        });
      }
    });
  }
  /**
    * Add to cart action triggers calculate cart total
  **/
  calculateTotal(price, skuId, qty) {
    let cartListArr = this.props.elcStore.cartList.length ? JSON.parse(this.props.elcStore.cartList) : {};
    if (Object.keys(cartListArr).length && cartListArr[skuId] !== undefined) {
      for (let x in cartListArr) {
        if (x === skuId)  {
          cartListArr[skuId] = {qty: cartListArr[skuId].qty + qty};
        }
      }
    } else {
      cartListArr[skuId] = {qty: qty};
    }
    const total = this.state.total + (price * qty);
    const cartList = cartListArr;
    this.props.elcStore.cartListUpdate(total, cartList);
  }
  /**
    * Maintain the quickshop panel state
    * of the product partials
  **/
  qsSelectedProductSkus(prodId, skuInfo) {
    let qsSelectedProductSkusObj = this.state.qsSelectedProductSkus;
    qsSelectedProductSkusObj[prodId] = skuInfo;
    this.setState({
      qsSelectedProductSkus: qsSelectedProductSkusObj
    })
  }
  render() {
    /**
      * Show loading till data is fetched
      * from DB
    **/
    if (this.state.showLoading) {
      return <LoadingIcon />;
    }
    var component = this;
    let categoryName = '';
    /**
      * Build product partials for MPP
    **/
    var products = this.state.productList.map(function(product, i) {
      if(i == 0) categoryName = product.category;
      return (
        <Product
          category={product.category}
          name={product.PROD_RGN_NAME}
          subHeading={product.PROD_RGN_SUBHEADING}
          priceForDisplay={product.defaultSku[0].formattedPrice}
          price={product.defaultSku[0].PRICE}
          handleTotal={component.calculateTotal}
          image={domain + product.defaultSku[0].MEDIUM_IMAGE.split(',')[0]}
          prodId={product.PRODUCT_ID}
          desc={product.MPP_DESC_1}
          key={Date.now()+i}
          skuBaseId={product.defaultSku[0].SKU_ID}
          skus={product.skus}
          productURL={product.url}
          updateProductListPage={component.props.elcStore.updateProductListPage}
          qsOpenedForItems={component.props.elcStore.qsOpenedForItems}
          qsSelectedProductSkus={component.state.qsSelectedProductSkus}
          updateQsSelectedProductSkus={component.qsSelectedProductSkus} />
      );
    });
    return (
      <div>
        <div className="mpp js-mpp-wrapper">
          <h2 className="mpp__header ">{categoryName}</h2>
          <ul className="mpp__product-grid">
            {products}
          </ul>
        </div>
        <CartOverlay 
          total={component.props.elcStore.total} 
          products={this.state.productList} 
          cartList={component.props.elcStore.cartList} 
          domain={domain}/>
      </div>
    );
  }
}
export default inject("elcStore")(observer(ProductList));