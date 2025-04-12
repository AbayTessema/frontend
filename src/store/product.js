import {create} from 'zustand';
const apiUrl=process.env.REACT_APP_API_URL;
const useProductStore = create((set) => ({
    products: [],
    setProducts:(products)=>set({products}),
    createNewProduct: async(newProduct)=>{
       if(!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image){
        return {
            success:false, message:"Please fill all the fields"
        }
       } 
       if (isNaN(Number(newProduct.price))) {
        return { success: false, message: "Price should be a number!" };
    }

       const res= await fetch(apiUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newProduct)
    }) 
    const data= await res.json();
    set((state)=>({products:[...state.products,data.data]}))

    return {
        success:true, message:"product created successfully!"
    }
    },

    fetchProducts:async()=>{
        const res= await fetch(apiUrl);
        const data= await res.json();
        set({products:data.data})
    },
    deleteProduct: async(pid)=>{
        const res= await fetch(`${apiUrl}/${pid}`,{
            method:"DELETE",
        });
        const data= await res.json();
        if(!data.success) 
        return {success:false, message: data.message}

        set((state)=>({products:state.products.filter((product)=>product._id !== pid)}));
        return {success:true, message:data.message}
        },

    updateProduct: async(pid,updatedProduct)=>{
        const res= await fetch(`${apiUrl}/${pid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedProduct)
        });
        const data= await res.json();
        if(!data.success){
            return {success:false, message:data.message}
        }else{
            set((state)=>({
                products:state.products.map((product)=>
                product._id === pid ? data.data:product
                )
            }));
            return {success:true, message:data.message}
        }
    }
   
}));

export default useProductStore;
