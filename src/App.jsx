import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from './Components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addCartItem } from './config/redux/reducers/cartSlice';




const App = () => {

  const [product , setProduct] = useState(null);

  const selector = useSelector(state => state.cart.cartItems);
  console.log(selector);

  const dispatch = useDispatch();


  useEffect(() => {

    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(res => {
      setProduct(res.products)
      })
      .catch(err => console.log(err))

  } , [])

  const addToCart = (item) => {
    dispatch(addCartItem({
      item
    }));
  };
  


  return (
    <>
    <ResponsiveAppBar />
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        {product ? product.map((item) => {
          return <div style={{
            border: "1px solid black",
            borderRadius: "20px",
            padding: "20px",
            margin: "10px"
          }} key={item.id}>
            <img width="200" src={item.thumbnail} alt="productImg" />
            <h2>{item.title.slice(0, 10) + "..."}</h2>
            <h1>{item.price}</h1>
            <Button variant="primary" onClick={() => addToCart(item)} >Add To Cart</Button>{' '}
          </div>
        }) : <p>Item not found</p>}
      </div>
    </>
  )
}

export default App