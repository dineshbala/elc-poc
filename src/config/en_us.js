export const siteConfig = {
  logoImagePath: '/images/logo.png',
  logoAltText: 'Bobbi Brown',
  domain: 'https://www.esteelauder.com',
  maxProductQtyAllowed: [1, 2, 3, 4, 5, 6],
  appName: "Esteelauder Online",
  inDevelopment: 1,
  developmentServiceApiUrl: 'http://localhost:80/rest_api/api/',
  productionServiceApiUrl: 'http://10.50.24.21/rest_api/api/',
  shipping: [
    {
      price: 0,
      text: 'Standard - FREE'
    },
    {
      price: 10,
      text: 'Second Day - $10.00'
    },
    {
      price: 15,
      text: 'Overnight - $15.00'
    },
  ],
  ringLoader : {
    sizeUnit: 'px',
    size: 75,
    color: '#5A1894'
  },
  carousel: {
    homepage: [
      "/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg",
      "/media/export/cms_2.0/merch-windows/mpp-headers/fall-2018/pure-color-envy-feat-karlie/01_PC_Envy_Extensions_pc_mpp_GlblExAsia_1366x500.jpg",
      "/media/export/cms_2.0/merch-windows/by-campaign/spring2018-perfectionist-pro/pc_mpp_header-perfectionist-pro_product-only.jpg",
      "/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg",
      "/media/export/cms_2.0/merch-windows/mpp-headers/fall-2018/pure-color-envy-feat-karlie/01_PC_Envy_Extensions_pc_mpp_GlblExAsia_1366x500.jpg",
      "/media/export/cms_2.0/merch-windows/by-campaign/spring2018-perfectionist-pro/pc_mpp_header-perfectionist-pro_product-only.jpg",
      "/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg"
    ]
  },
}