import TheNav from "./components/header/header";
import Banner from "./components/header/banner";
import Products from "./components/body/products";
import ProdDetails from "./components/body/prodDetails";
import LoginPage from "./components/auths/loginpage";
import PrivateRoute from "./components/auths/privateRoute";
import Orders from "./components/body/orders";

// routing
import { Routes, Route } from 'react-router-dom';

// some necessary hooks
import { useState, useEffect } from "react";

// the redux things
import { useSelector, useDispatch } from "react-redux";
import { loadSession } from "./redux/actionCreators";

import { BACK_URL } from "./Data/productData";

// the main component for this module
function App() {
  const [cart, setCart] = useState<{'id': number, 'name': string, 'quantity': number}[]>([]);
  const [loading, setLoading] = useState(true);

  // session related tasks
  const userSession: {
    access: string,
    refresh: string
  } | undefined = useSelector((state: any) => state.sessionData);

  const dispaz: Function = useDispatch();

  // for adding to the cart functionality
  const onAddToCart = (item: {'id': number, 'name': string}): void => {
    let product = cart.find(prod => prod.name === item.name);
    let position = cart.findIndex(prod => prod.name === item.name);
    if (product) {
      let newCart = [...cart];
      newCart[position] = {'id': product.id, 'name': product.name, 'quantity': product.quantity += 1}
      setCart(newCart);
    } else {
      let newCart = [...cart, {'id': item.id, 'name': item.name, 'quantity': 1}];
      setCart(newCart);
    }
    console.log(cart);
  }

  // updating the token by rotating it
  let updateToken = async () => {
    let response = await fetch(`${BACK_URL}/token/refresh`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'refresh': userSession?.refresh})
    });

    let data = await response.json();

    if (response.status == 200) {
      dispaz(loadSession(data));
      localStorage.setItem('authTokens', JSON.stringify(data));
    } else {
      dispaz(loadSession(undefined));
      localStorage.removeItem('authTokens');
      console.log("you've been logged out, because your session expired")
    }

    if (loading) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let interValId = setInterval(() => {
      if(userSession) {
        updateToken();
        console.log('update token called!');
      }
    }, 1000*60*4);

    return () => clearInterval(interValId)
  }, [userSession, loading])

  return (
    <div>
        <TheNav cartItems={cart} />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="products" element={<PrivateRoute rote="/login"><Products onAddToCart={onAddToCart} /></PrivateRoute>} />
          <Route path="products/:id" element={<ProdDetails />} />
          <Route path="orders" element={<PrivateRoute rote="/login"><Orders /></PrivateRoute>} />
          <Route path="login" element={<LoginPage message="Log in to your account" />} />
        </Routes>
    </div>
  );
}

export default App;
