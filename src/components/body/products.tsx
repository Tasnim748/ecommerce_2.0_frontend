import Product from "./product";
import React from "react";
import { useEffect } from "react";
import Spinner from "../utils/spinner";

import { fetchProducts } from "../../redux/actionCreators";
import { useSelector, useDispatch } from "react-redux";

const Products: React.FC<{'onAddToCart': Function}> = (props) => {
    const dispatch: Function = useDispatch();
    const ProductData: any = useSelector((state: any) => state.products)
    const loading: boolean = useSelector((state: any) => state.loading);

    const userSession: {
        access: string,
        refresh: string
    } | undefined = useSelector((state: any) => state.sessionData);

    useEffect(() => {
        dispatch(fetchProducts(userSession))
    }, []);

    return !loading ? (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4" style={{margin: '3%'}}>
                {
                    ProductData.map((each: any) => (
                        <Product product={each} key={each.id} onAddToCart={props.onAddToCart} />
                    ))
                }
            </div>
        </div>
    ) : <Spinner />;
}

export default Products;