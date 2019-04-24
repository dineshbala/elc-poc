import React from 'react';
import {mount, configure} from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Productlist from './components/Products/ProductList';

/**
 * MPP page snap shot test
**/
it('render MPP page correctly', () => {
  var category = {params:{category:"makeup"}};
  const TextInputComponent = renderer.create(<Productlist match={category} />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});

/**
 * Check whether quickshop opens
**/
describe('Quickshop rendering', () => {
  it('quickshop rendering', () => {
    configure({adapter: new Adapter()}); 
    let products = [{"priceRange":"$35.00","ATTRIBUTE_DESC_1":"3 must-haves for daring pink lips.<BR>$75.00 Value.</BR>","DESCRIPTION":null,"MISC_FLAG":2,"ATTRIBUTE_CONCERN":null,"DRUPAL_URL":"/product/14324/64266/product-catalog/whats-new/gifts/bold-beauty/rose-lips","TOTAL_REVIEW_COUNT":null,"SKIN_CONCERN_2":null,"AVERAGE_RATING":null,"FAMILY_CODE":"PA8T01","RATING_RANGE":null,"ATTRIBUTE_BENEFIT":null,"ATTRIBUTE_DESC_3":null,"MPP_DESC_2":"A trio of favorites in rose shades for daring lips.","META_DESCRIPTION":null,"PRODUCT_USAGE":null,"ATTRIBUTE_DESC_4":null,"ATTRIBUTE_DESC_5":null,"SKIN_FILTER_1":null,"ATTRIBUTE_COLLECTION":null,"url":"/product/14324/64266/product-catalog/whats-new/gifts/bold-beauty/rose-lips","SKIN_CONCERN_ATTR":null,"MPP_DESC_1":"3 must-haves for daring pink lips.<BR>$75.00 Value.</BR>","ATTRIBUTE_LABEL_4":null,"worksWith":["PROD64262","PROD64263","PROD64268"],"MPP_LABEL_2":"What's Inside","buildCanonicalURL":"/product/14324/64266/product-catalog/whats-new/gifts/bold-beauty/rose-lips","shaded":0,"VIDEO_FILE":[],"PROD_CAT_DISPLAY_ORDER":0,"PARENT_CAT_ID":"CAT14324","FORMULA":null,"SKIN_CONCERN":[],"PRODUCT_DETAILS_MOBILE":"Includes a trio of makeup essentials in rose shades for daring lips. Comes in an exclusive gift box with: <UL><LI>Pure Color Envy Sculpting Lipstick in Bois de Rose (full-size)</LI><LI>Pure Color Envy Paint-On Liquid LipColor Controversial (full-size)</LI><LI>Double Wear Stay-in-Place Lip Pencil in Rose (deluxe travel size)</LI></UL>For eyes to match, check out <A href=\"/product/14324/64262/product-catalog/whats-new/gifts/bold-beauty/champagne-eyes\"><U>Bold Beauty: Champagne Eyes</A></U>.","ATTRIBUTE_COVERAGE":null,"META_KEYWORDS":null,"ATTRIBUTE_LABEL_1":"BENEFITS","MAKEUP_BENEFIT":null,"DEFAULT_CAT_ID":"CAT14324","ATTRIBUTE_SKINTYPE":null,"RATING_IMAGE":"/images/global/transparent.gif","ATTRIBUTE_LABEL_3":null,"sized":0,"FINISH":null,"COVERAGE":null,"PROD_CAT_IMAGE_NAME":"PA8T01","ATTRIBUTE_LABEL_2":"How to Use","SKINTYPE_DESC":"","SUB_LINE":null,"PRODUCT_ID":"PROD64266","ATTRIBUTE_LABEL_5":null,"BEST_SELL_SKU_BASE_ID":null,"skus":[{"MISC_FLAG":0,"LARGE_SMOOSH":"","isOrderable":1,"XS_SMOOSH":"","SKIN_TYPE":0,"formattedPrice":"$35.00","PRODUCT_SIZE":null,"SKU_BASE_ID":101138,"MEDIUM_IMAGE":["/media/export/cms/products/308x424/el_sku_PA8T01_308x424_0.jpg"],"PRICE2":null,"XL_IMAGE":["/media/export/cms/products/558x768/el_sku_PA8T01_558x768_0.jpg"],"RELEASE_DATE":null,"SKU_ID":"SKU101138","formattedPrice2":"$35.00","formattedFuturePrice":"$35.00","XL_SMOOSH":"","DISPLAY_ORDER":0,"HEX_VALUE_STRING":"","SMALL_IMAGE":"/media/export/cms/products/226x311/el_sku_PA8T01_226x311_0.jpg","SMOOSH_PATH_STRING":null,"FINISH":null,"REFILLABLE":0,"LARGE_IMAGE":["/media/export/cms/products/420x578/el_sku_PA8T01_420x578_0.jpg"],"ATTRIBUTE_COLOR_FAMILY":null,"ATTRIBUTE_FINISH":null,"SMOOSH_DESIGN":null,"SHADENAME":null,"PRODUCT_ID":"PROD64266","PRICE":35,"UNDERTONE":null,"FUTURE_PRICE":null,"INTENSITY":null,"STRENGTH":null,"isPreOrder":0,"SHADE_NUMBER":null,"SHADE_DESCRIPTION":null,"INVENTORY_STATUS":1,"DISPLAY_STATUS":7,"SKIN_TYPE_TEXT":"0b0000"}],"SHORT_DESC":null,"SKIN_CONCERN_1":null,"SKIN_CONCERN_3":null,"PROD_RGN_NAME":"Bold Beauty","PROD_RGN_SUBHEADING":"Rosé Lips","RECOMMENDED_PERCENT":null,"DISPLAY_STATUS":7,"isDisplayable":4,"ATTRIBUTE_DESC_2":"Line your natural lip line with Double Wear Lip Pencil and fill in lips as a base for your lipstick. Layer your lipstick with Liquid LipColor for full-on color.","PROD_BASE_ID":64266,"defaultSku":{"MISC_FLAG":0,"LARGE_SMOOSH":"","isOrderable":1,"XS_SMOOSH":"","SKIN_TYPE":0,"formattedPrice":"$35.00","PRODUCT_SIZE":null,"SKU_BASE_ID":101138,"MEDIUM_IMAGE":["/media/export/cms/products/308x424/el_sku_PA8T01_308x424_0.jpg"],"PRICE2":null,"XL_IMAGE":["/media/export/cms/products/558x768/el_sku_PA8T01_558x768_0.jpg"],"RELEASE_DATE":null,"SKU_ID":"SKU101138","formattedPrice2":"$35.00","formattedFuturePrice":"$35.00","XL_SMOOSH":"","DISPLAY_ORDER":0,"HEX_VALUE_STRING":"","SMALL_IMAGE":"/media/export/cms/products/226x311/el_sku_PA8T01_226x311_0.jpg","SMOOSH_PATH_STRING":null,"FINISH":null,"REFILLABLE":0,"LARGE_IMAGE":["/media/export/cms/products/420x578/el_sku_PA8T01_420x578_0.jpg"],"ATTRIBUTE_COLOR_FAMILY":null,"ATTRIBUTE_FINISH":null,"SMOOSH_DESIGN":null,"SHADENAME":null,"PRODUCT_ID":"PROD64266","PRICE":35,"UNDERTONE":null,"FUTURE_PRICE":null,"INTENSITY":null,"STRENGTH":null,"isPreOrder":0,"SHADE_NUMBER":null,"SHADE_DESCRIPTION":null,"INVENTORY_STATUS":1,"DISPLAY_STATUS":7,"SKIN_TYPE_TEXT":"0b0000"}}]
    var match = {params:{category:"makeup"}};
    const mppComponent = mount(<Productlist  match = {match}/>);
    mppComponent.setState({productList: products, showLoading: false});
    expect(mppComponent.find('.js-mpp_quickshop').length).toBe(1);
    mppComponent.find('.js-mpp_quickshop').simulate('click');
    expect(mppComponent.find('Product').state('displayCurrentQuickShop')).toEqual("true");
  });
});