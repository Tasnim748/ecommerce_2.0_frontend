import { useEffect } from "react";
import Spinner from "../utils/spinner";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators";

const Orders = () => {
    let session = useSelector((state: any) => state.sessionData);
    let orderLoading: boolean = useSelector((state: any) => state.orderLoading);
    let dispaz: Function = useDispatch();
    let orders = useSelector((state: any) => state.orders);

    useEffect(() => {
        dispaz(fetchOrders(session))
    }, []);

    console.log('from orders component:',orders);
    return !orderLoading ? (
        <div className="container">
            <h1 style={{textAlign: "center", margin: "2rem"}}>Your Orders</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Date Ordered</th>
                        <th scope="col">Net Quantity</th>
                        <th scope="col">Net Price</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Complete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order: any) => (
                            <tr>
                                <th scope="row">{order.id}</th>
                                <td>{order.date_ordered.toLocaleString('default', { month: 'long' })}</td>
                                <td>{order.net_quantity}</td>
                                <td>{order.net_price}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.complete ? "Yes" : "No"}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    ) : <Spinner />;
}

export default Orders;

