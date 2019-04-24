import React, { Component } from 'react';
import { observer,Provider } from 'mobx-react';
import './styles/foundation.min.css';
import './styles/custom.css';
import Routes from './routes';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MobileHeader from './components/mobile-header/MobileHeader';
import elcStore from './ElcStore';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart,faUserPlus,faUser, faSearch} from '@fortawesome/free-solid-svg-icons';
import { siteConfig } from './config/en_us';
library.add(faShoppingCart,faUserPlus,faUser,faSearch)

class AppComponent extends Component {
  constructor(){
    super();
    this.state={
      appName: siteConfig.appName,
      my_account: false
    }
  }
  render() {
    return (
      <div className="container-fluid site-container">
        <MobileHeader name={this.state.appName}/>
        <Header name={this.state.appName}/>
        <Routes name={this.state.appName}/>
        <Footer/>
      </div>
    );
  }
}
const App = observer(() => (
  <Provider elcStore={elcStore}>
    <AppComponent />
  </Provider>
));
export default App;