import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchDetail } from "../../redux/actionCreators";

import Spinner from "../utils/spinner";

const ProdDetails = () => {
    const dispatch = useDispatch();

    let params = useParams().id;
    const product = useSelector(state => state.detailProduct);
    const path = "http://localhost:3000/files/images/";

    useEffect(() => {
        dispatch(fetchDetail(params));
    }, []);

    let details = product ? (
        <div className="container" style={{marginTop: '10%'}}>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <img src={`${path}shoes.jpg`} alt="" />
                    </div>
                </div>

                <div className="col-sm-6" style={{padding: '40px'}}>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <br />
                        <p className="card-text">{product.description}</p>
                        <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                    <br />
                    <h5>Price: {product.price}</h5>
                </div>
            </div>
        </div>
    ) : <Spinner />

    return (
        <div>
            {details}
        </div>        
    )
    
}

export default ProdDetails;