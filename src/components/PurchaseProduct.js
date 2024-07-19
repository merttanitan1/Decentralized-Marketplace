import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import Marketplace from '../contracts/Marketplace.json';

const PurchaseProduct = ({marketplaceWalletAddress}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try{
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const marketplace = new ethers.Contract(marketplaceWalletAddress, Marketplace.abi, signer);

                const productCount = await marketplace.productCount();
                const productArray = [];

                for(let i = 1; i <= productCount; i++){
                    const product = await marketplace.products(i);
                    productArray.push(product);
                }

                setProducts(productArray);
            }catch(error){
                console.error("Product List Failed: " + error);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [marketplaceWalletAddress]);

    const purchaseProduct = async(id, price) => {
        if(!window.ethereum){
            setMessage("Please Install MetaMask");
            return;
        }

        setLoading(true);

        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const marketplace = new ethers.Contract(marketplaceWalletAddress, Marketplace.abi, signer);

            const tx = await marketplace.purchaseProduct(id, { value: price });
            await tx.wait();
            
            setMessage("Product successfully purchased!");
        }catch(err){
            console.error("Product Purchase Failed: " + err);
            setMessage("Product Purchase Failed: " + err); 
        }

        setLoading(false);
    };

    return(
        <div>
            <h2>Products</h2>
            {loading ? (
                <p>Loading Products... </p>
            ) : (
                <div>
                    {products.map((product, index) => (
                        <div key={index}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: {ethers.formatEther(product.price)} ETH</p>
                            <p>Owner: {product.owner}</p>
                            {!product.purchased && (
                                <button onClick={() => purchaseProduct(product.id, product.price)}>
                                    Purchase
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default PurchaseProduct;