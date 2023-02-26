import React from "react"
import { Link } from "react-router-dom";
import './product.css';

const Product: React.FC<{product: {'id':number, 'name': string, 'description': string, 'category': string, 'price': number}, onAddToCart: Function}> = (props) => {
    const addIt = () => {
        props.onAddToCart({'id': props.product.id, 'name': props.product.name});
    }
    
    return (
        <div className="col">
            <div className="card" style={{margin: '4%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'}}>
                <Link to={props.product.id.toString()}>
                    <img src="./files/images/shoes.jpg" className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                    <h5 style={{display: 'inline'}} className="card-title">{props.product.name}</h5>
                </div>
                <div className="card-footer cardFooter">
                    <button className="btn btn-outline-success" style={{margin: '3%'}} onClick={addIt}>Add to Cart</button>
                    <h6 style={{padding: '6px 12px', margin: '3%'}}>${props.product.price}</h6>
                </div>
            </div>
        </div>
    );
}

export default Product;