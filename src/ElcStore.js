import React from 'react';
import { extendObservable, action } from "mobx";
import remotedev from 'mobx-remotedev/lib';

class elcStore {
    constructor() {
      extendObservable(this, {
        productList: "",
        cartList: "",
        total: 0,
        qsOpenedForItems: [],
        returnURL: '',
        updateProductListPage: action((prodId, status)=>{
            let qsOpenedForItemsArr = this.qsOpenedForItems;
            if (status === 'add-qs-open') {
                qsOpenedForItemsArr.push(prodId);
            } else {
                const indexVal = qsOpenedForItemsArr.indexOf(prodId);
                qsOpenedForItemsArr.splice(indexVal, 1);
            }
            this.qsOpenedForItems = qsOpenedForItemsArr;
        }),
        cartListUpdate: action((total, cartListItems)=>{
          this.cartList = JSON.stringify(cartListItems);
          this.total = total;
        }),
        setReturnUrl: action((url) => {
          this.returnURL = url;
        })
      })
    }
}

export default remotedev(new elcStore());