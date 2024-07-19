import React, { useState } from 'react';
import { ethers } from 'ethers';
import Marketplace from '../contracts/Marketplace.json';

const CreateProduct = ({ marketPlaceAddress }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const createProduct = async () => {
        if(!window.ethereum){
            setMessage("Please Install MetaMask.");
            return;
        }

        setLoading(true);

        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const marketplace = new ethers.Contract(marketPlaceAddress, Marketplace.abi, signer);

            const priceInWei = ethers.parseEther(price);

            const tx = await marketplace.createProduct(name, description, priceInWei);
            await tx.wait();

            setMessage("Product Listed");
            setName('');
            setDescription('');
            setPrice('');
        }catch (err){
            console.error("Product Fail: " + err);
            setMessage("Product Fail: " + err);
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Add new product</h2>
            <form onSubmit={(e) => { e.preventDefault(); createProduct(); }}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Price (ETH):</label>
                    <input
                        type='text'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Product Adding...' : 'Add Product'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateProduct;