import React, { useState } from 'react';
import './ProductCard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useProductStore from '../store/product';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Important for accessibility

const ProductCard = ({ product }) => {
    const { deleteProduct, updateProduct } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    const handleUpdateProduct = async () => {
        const { success, message } = await updateProduct(product._id, updatedProduct);
        if (success) {
            toast.success(message);
            setModalIsOpen(false);
        } else {
            toast.error(message);
        }
    };

    return (
        <div className="product-container">
            <div className="product-card">
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <h5>${product.price}</h5>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                <button onClick={() => {
                    setUpdatedProduct(product);
                    setModalIsOpen(true);
                }}>Edit</button>
            </div>

            {/* Edit Modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Edit Product</h2>
                <input
                    type="text"
                    value={updatedProduct.name}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    value={updatedProduct.description}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                    placeholder="Description"
                />
                <input
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                    placeholder="Price"
                />
                <input
                    type="text"
                    value={updatedProduct.image}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                    placeholder="Image URL"
                />
                <button onClick={handleUpdateProduct}>Save</button>
                <button onClick={() => setModalIsOpen(false)}>Cancel</button>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default ProductCard;