import React, {useContext} from "react";
import { Link } from "react-router-dom";

import ProductContext from "../Context/ProductContext"
import ProfileContext from "../Context/ProfileContext"

import { formattedDate } from "../Helpers/Date";

import './CartItems.css'

export default function CartItems () {
    const { data } = useContext(ProductContext)
    const profile = useContext(ProfileContext)

    const cartItems = localStorage.getItem('cart').split(',').filter(x => x !== 'false');

    const cartArr = []
    const uniqueProducts = []
    let total = 0;
    let discount = 0;
    let grand = 0;

    if (data && profile.data) {

        for (let m=0; m<profile.data.productFeatures.length; m++) {
            let up = profile.data.productFeatures[m].match(/(.{1,4})/g);
            if (uniqueProducts.indexOf(up[0]) === -1) uniqueProducts.push(up[0])
        }
        

        for (let i=0; i<data.length; i++) {
            for(let j=0; j<data[i].features.length; j++){
                if(cartItems.includes(data[i].features[j].featureId)){
                    cartArr.push({
                        productId: data[i].productId,
                        featureId: data[i].features[j].featureId,
                        productFeature: data[i].productName + " [" + data[i].features[j].featureName + "]",
                        price: data[i].features[j].price
                    });
                    if (uniqueProducts.indexOf(data[i].productId) === -1) uniqueProducts.push(data[i].productId)
                }
            }
        }

        if (uniqueProducts.length >= 5) {
            discount = 15;
        } else if (uniqueProducts.length === 4) {
            discount = 10;
        } else if (uniqueProducts.length === 3) {
            discount = 8;
        } else if (uniqueProducts.length === 2) {
            discount = 5;
        } else {
            discount = 0;
        }

        total = cartArr.reduce((price, curr) => price + curr.price, 0)
        grand = Math.round(total - (discount/100) * total)

    }

    return <>
        <div className="cart-items">
            <h2>Invoice/Cart Summary</h2>
            <div className="checkout-button">
                <Link to="/products" relative="path">
                    Back to Products
                </Link>
            </div>
            {data && profile.data &&
                <div>
                    <div className="cart-body">

                        <article>       
            
                            <table className="firstTable">
                                <tr>
                                    <th><span >Invoice #</span></th>
                                    <td><span >{Math.floor(Math.random()*90000) + 10000}</span></td>
                                </tr>
                                <tr>
                                    <th><span >Name</span></th>
                                    <td><span >{profile.data.firstname} {profile.data.lastname}</span></td>
                                </tr>
                                <tr>
                                    <th><span >Date</span></th>
                                    <td><span >{formattedDate()}2</span></td>
                                </tr>
                            </table>

                            <table className="secondTable">
                                <thead>
                                    <tr>
                                    <th><span >S.N</span></th>
                                    <th><span>PF Id</span></th>
                                    <th><span >Product [Feature]</span></th>
                                    <th><span >Price</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartArr.map((x, index) =>
                                        <tr>
                                        <td><span >{index}</span></td>
                                        <td><span >{x.featureId}</span></td>
                                        <td><span >{x.productFeature}</span></td>
                                        <td><span data-prefix>$</span><span >{x.price}</span></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <table className="firstTable">
                            <tr>
                                <th><span >Total</span></th>
                                <td><span data-prefix>$</span><span>{total}</span></td>
                            </tr>
                            <tr>
                                <th><span >Discount</span></th>
                                <td><span >{discount}%</span></td>
                            </tr>
                            <tr>
                                <th><span >Grand Total</span></th>
                                <td><span data-prefix>$</span><span>{grand}</span></td>
                            </tr>
                            </table>                      
                        </article>

                    </div>

                    <div className="cart-footer">

                    </div>
                </div>
            }
        </div>
    </>
}