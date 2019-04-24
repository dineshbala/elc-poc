import React from 'react';
import { observer, inject } from 'mobx-react';
import Product from './Product';
import { API } from '../../services/API';
import CartOverlay from '../cart-overlay/CartOverlay';
import LoadingIcon from '../common/RingLoader';
import { siteConfig } from '../../config/en_us';
import { lang } from '../../lang/en_us';
import '../../styles/common-styles.css';
import './Product.css';
import './RecommendedProducts.css';

console.clear();

const domain = siteConfig.domain;
/**
  * Recommended products component displays
  * only three products in the viewcart page
**/
class RecommendedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      productList: "",
      cartList: [],
      showLoading: true,
      qsOpenedForItems: [],
      qsSelectedProductSkus: {},
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.qsSelectedProductSkus = this.qsSelectedProductSkus.bind(this);
  }
  /**
    * Product listed from DB
  **/
  componentDidMount() {
    API('productlist',this.state).then((result) => {
      let responseJson = result;
      if (responseJson.productData) {
          this.setState({
            productList: responseJson.productData.slice(0,3),
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
    * Quick shop add to bag action
    * triggers calculate cart total
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
    });
  }

  render() {
    /**
      * Show loading till products are rendered
    **/
    if (this.state.showLoading) {
      return <LoadingIcon />;
    }
    /**
      * Build product partials
    **/
    var component = this;
    var products = this.state.productList.map(function(product, i) {
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
          refreshComponent={component.refreshComponent}
          updateProductListPage={component.props.elcStore.updateProductListPage}
          qsOpenedForItems={component.props.elcStore.qsOpenedForItems}
          qsSelectedProductSkus={component.state.qsSelectedProductSkus}
          updateQsSelectedProductSkus={component.qsSelectedProductSkus} />
      );
    });

    return (
      <div>
        <div className="mpp js-mpp-wrapper recommended-products">
          <h2 className="mpp__header ">{lang.recommended_products}</h2>
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
export default inject("elcStore")(observer(RecommendedProducts));