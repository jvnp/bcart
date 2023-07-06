import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import ProductContext from "../Context/ProductContext"
import ProfileContext from "../Context/ProfileContext"
import { multiDimensionalArray } from "../Helpers/Math"

import './ProductItems.css'

export default function ProductItems () {
    const { data } = useContext(ProductContext)
    const profile = useContext(ProfileContext)

    const requiredArray = multiDimensionalArray(5, 5);
    const [checkedState, setCheckedState] = useState(requiredArray);

    const handleClick = (a, b, fid) => {
        checkedState[a][b] = (checkedState[a][b] === false) ? fid : false;
        localStorage.setItem('cart', checkedState);
    }

    return <>
        <ul className="product-list">
            {data && profile.data && data.map((x, xIndex) => 
                <li className="product-item" key={x.productName}>
                    <h2>{x.productName}</h2>
                    <ul className="product-feature">
                        <div className="product-feature-item">
                            <div className="product-feature-wrapper product-feature-head">
                                <div className="product-feature-left">
                                    <h4>Title</h4>
                                </div>
                                <div className="product-feature-right">
                                    <h4>Price($)</h4>
                                </div>
                            </div>
                        </div>
                        {x.features.map((y, yIndex) =>
                            <li  className="product-feature-item">
                                <div className="product-feature-wrapper">
                                    <div className="product-feature-left">
                                        <input
                                            type="checkbox"
                                            id={`cc-${xIndex}-${yIndex}`}
                                            name={y.featureId}
                                            value={y.featureId}
                                            onChange={() => handleClick(xIndex, yIndex, y.featureId)}
                                            disabled= { profile.data.productFeatures.includes(y.featureId) ? true : false }
                                        />
                                        &nbsp; <span className="product-feature-name">{y.featureName}</span>
                                    </div>
                                    <div className="product-feature-right">
                                        <span className="product-feature-price">{y.price}</span>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </li>
            )}
        </ul>
        <div className="checkout-button">
            <Link to="/products/cart" relative="path">
                Checkout
            </Link>
        </div>
    </>

}