import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './BannerCarousel.css';
import { siteConfig } from '../../config/en_us';

export default class BannerCarousel extends Component {
  render() {
    let domain = siteConfig.domain;
    /**
     * Fetch the hompage carousel images from configuration
    **/
    let carouselImages = siteConfig.carousel.homepage.map(
      (data, i) => {
        return (<div key={i}>
          <img alt="" src={domain + data}/>
        </div>)
      }
    );
    return (
      <div>
        <Carousel showArrows={false} 
          showThumbs={false} 
          useKeyboardArrows 
          emulateTouch 
          transitionTime={1000} 
          showStatus={false}>
          {carouselImages}
        </Carousel>
      </div>
    );
  }
}