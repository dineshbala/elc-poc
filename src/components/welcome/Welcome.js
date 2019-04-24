import React, { Component } from 'react';
import { API } from '../../services/API';
import BannerCarousel from '../../components/banner-carousel/BannerCarousel';
import RecentCategory from '../../components/recent-category/RecentCategory';
import PromotionContent from '../../components/promotion-content/PromotionContent';
import { lang } from '../../lang/en_us';
import { siteConfig } from '../../config/en_us';
import './Welcome.css';

const domain = siteConfig.domain;
class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prodLists:[]
    };
  }
  componentDidMount() {
    API('productlist',this.state).then((result) => {
      let responseJson = result;
      if (responseJson.productData) {
        this.setState({prodLists: responseJson.productData});
      }
    });
  }
  render() {
    var products = this.state.prodLists.map((product, i) => (
      <div className='col-sm' key={i}>
        <RecentCategory
          prodName={product.PROD_RGN_NAME.substr(0,15)}
          prodPrice={product.priceRange}
          prodDesc={product.ATTRIBUTE_DESC_1}
          prodImage={product.defaultSku[0].MEDIUM_IMAGE}
          domain={domain}
          productURL={product.url}/>
      </div>
    ));
    var homeproductlist = products.slice(0,3);
    return (
       <div className="container-fluid welcome-banner">
          <BannerCarousel></BannerCarousel>
          <PromotionContent></PromotionContent>
          <div className="container-fluid">
            <h2 className="text-center mt-3 mb-3 product_heading">{lang.recent_products}</h2>
            <hr />
            <div  className="d-flex flex-row bd-highlight mb-3">
              {homeproductlist}
            </div>
          </div>
       </div>
    );
  }
}
export default Welcome;