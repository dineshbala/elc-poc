import React, { Component } from 'react';
import { Container, Col, FormControl,InputGroup } from 'react-bootstrap';
import './Footer.css';
import { lang } from '../../lang/en_us';

class Footer extends Component {
  render() {
    return (
      <Container fluid className="d-flex flex-row justify-content-center footer">
        <Container className="d-flex flex-row justify-content-center pt-5 pb-5">
          <Col>
            <ul>
              <li><h5>{lang.how_can_we_help}</h5></li>
              <li><a href="/">{lang.chat_with_artist}</a></li>
              <li><a href="/">{lang.text_an_artist}</a></li>
              <li><a href="/">{lang.email_us}</a></li>
              <li><a href="/">{lang.shipping_returns}</a></li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li><h5>{lang.my_bobbi_brown}</h5></li>
              <li><a href="/">{lang.my_account}</a></li>
              <li><a href="/">{lang.my_orders}</a></li>
              <li><a href="/">{lang.bobbi_brown_pro}</a></li>
              <li><a href="/">{lang.store_locator}</a></li>
            </ul>
          </Col>
          <Col>
            <ul>
              <div>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Enter Your Email"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="mail_input" />
                    <InputGroup.Append>
                      <a><InputGroup.Text id="basic-addon2">{lang.submit}</InputGroup.Text></a>
                    </InputGroup.Append>
                </InputGroup>
              </div>
            </ul>
          </Col>
        </Container>
      </Container>
    );
  }
}
export default Footer;