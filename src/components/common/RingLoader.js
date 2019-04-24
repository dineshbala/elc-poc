import React from 'react';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { siteConfig } from '../../config/en_us';
import '../../styles/common-styles.css'
/**
 * Loading icon displayed till component content is rendered
**/
class LoadingIcon extends React.Component {
  render(){
    return(
      <div className='sweet-loading site-ring-loader'>
        <RingLoader
          sizeUnit={siteConfig.ringLoader.sizeUnit}
          size={siteConfig.ringLoader.size}
          color={siteConfig.ringLoader.color}
        />
      </div>
    )
  }
}
export default LoadingIcon;