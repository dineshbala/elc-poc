import React, {Component} from 'react';
class NoAddressData extends Component {
  render() {
    return(
      <div className="address--empty-panel">
        <div className="error_message empty-address">No address data available!</div>
      </div>
    )
  }
}

export default NoAddressData;