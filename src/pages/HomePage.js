import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';
import useProductStore from '../store/product';
import ProductCard from '../componenets/ProductCard';

const HomePage = () => {
    const {fetchProducts,products} =useProductStore();
    useEffect(()=>{
      fetchProducts();
    },[fetchProducts])

  return (
    <div>
        {products.map(product=>(
            <ProductCard key={product._id} product={product}/>
        ))}
       {products.length === 0 && <>
       <h4>Current Products</h4>
       <p>No products found 😢</p>
       <Link to="/create">
            <button>Create Product</button>
        </Link>
        </>}
    </div>
  )
}

export default HomePage
