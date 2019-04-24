import React from 'react';
import './PromotionContent.css'
import Image from 'react-bootstrap/Image'
import { Container, Row, Col} from 'react-bootstrap';
    export default class PromotionContent extends React.Component {
        render() {
            return (
               <Container fluid className="lighten_up"> 
               <h2 className="text-center">Lighten Up</h2>
               <hr></hr>
                <Container >
                <Row className="d-flex align-items-center">
                       <Col>
                        <h1>TREND WITH BENEFITS <br></br> Run Out </h1> 
                        <p>Join our new and improved Auto-Replenishment Program and get 15% off your first order and the next 3 refills, plus free shipping every time.</p>
                        <a href='/' className="learn_more"> Learn More</a>
                        </Col>
                       <Col><img src="https://www.bobbibrowncosmetics.com/media/export/cms/HP_Modules/SS19/SS19_Auto_Replenishment_1206_@2x.jpg" alt="promotioncontent"></img></Col>
                   </Row>
                </Container>
                <Container >
                <Row className="d-flex align-items-center">
                       <Col><img src="https://www.maccosmetics.com/media/export/cms/collections/extendedplaypermmeuplash/extendedplaypermmeuplash_new_secondary_module_pc_675x560.jpg" alt="promotioncontent"></img></Col>
                       <Col>
                        <h1>Extended Play<br></br>Perm Me Up Lash</h1> 
                        <p>Join our new and improved Auto-Replenishment Program and get 15% off your first order and the next 3 refills, plus free shipping every time.</p>
                        <a href='/' className="learn_more"> Learn More</a>
                        </Col>
                   </Row>
                </Container>
                <Container >
                <Row className="d-flex align-items-center">
                       <Col>
                        <h1> FASHION WEEK AW19 <br></br>BEAUTY ROUNDUP</h1> 
                        <p>Join our new and improved Auto-Replenishment Program and get 15% off your first order and the next 3 refills, plus free shipping every time.</p>
                        <a href='/' className="learn_more"> Learn More</a>
                        </Col>
                       <Col><img src="https://www.maccosmetics.com/media/export/cms/collections/3_ways_to_rubywoo/matte_675x560.jpg" alt="promotioncontent"></img></Col>
                   </Row>
                </Container>

                   </Container>

            );
          }
    }

