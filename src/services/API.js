import { siteConfig } from '../config/en_us';
export function API(type, userData) {
  let apiBaseURL = siteConfig.inDevelopment ? 
                  siteConfig.developmentServiceApiUrl :
                  siteConfig.productionServiceApiUrl;
  return new Promise((resolve, reject) =>{
    fetch(apiBaseURL + type, {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    .then((response) => response.json())
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
  });
}