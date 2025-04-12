import React,{useState} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useProductStore from '../store/product';

const CreatePage = () => {
    const [newProduct,setNewProduct]=useState({
        name:"",
        price:"",
        description:"",
        image:""
    })
   
    const {createNewProduct}=useProductStore();
    const handleCreateProduct= async()=>{
      const {success, message}= await createNewProduct(newProduct);
      if(success){
        toast.success(message)
        setNewProduct(
            {
                name:"",
                price:"",
                description:"",
                image:"" 
            }
        )
      }else{
        toast.error(message)
      }
    }               
  return (
    <div>
        <h1>Create New Product</h1>
        <form action={handleCreateProduct}>
            <input type="text" placeholder='Product Name'
            value={newProduct.name}
            onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}/>
            <input type="text" placeholder='Product Price'
            value={newProduct.price}
            onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}/>
            <input type="text" placeholder='Product Description'
            value={newProduct.description}
            
            onChange={(e)=>setNewProduct({...newProduct,description:e.target.value})}/>
            <input type="text" placeholder='Image URL'
            value={newProduct.image}
            onChange={(e)=>setNewProduct({...newProduct,image:e.target.value})}/>
            <button type='submit'>Add Product</button>
        </form>
        <ToastContainer />
    </div>
  )
}

export default CreatePage;
