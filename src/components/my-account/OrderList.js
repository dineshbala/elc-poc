import React from 'react';
import { lang } from '../../lang/en_us';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

// Employee Component
class OrderList extends React.Component {
  render() {
    return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          <span><b>{lang.invoice_number}{lang.colon}</b>{this.props.orderNumber}</span>
          <span className='order-status'><b>{lang.order_status}{lang.colon}</b>{this.props.orderStatus}</span>
          <span className='order-history'><b>{lang.order_date}{lang.colon}</b> {this.props.orderDate}</span>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>{lang.under_development}</p>
      </AccordionItemPanel>
    </AccordionItem>
    );
  }
}
export default OrderList;