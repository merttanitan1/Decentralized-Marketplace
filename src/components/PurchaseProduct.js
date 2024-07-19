import React, { useState } from "react";
import { ethers } from 'ethers';
import Marketplace from '../contracts/Marketplace.json';

const PurchaseProduct = ({marketplaceWalletAddress}) => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const purchaseProduct = async () => {
        if(!window.ethereum){
            setMessage("Please Install Metamask.");
            return;
        }
        
        setLoading(true);

        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const marketplace = new ethers.Contract(marketplaceWalletAddress, Marketplace.abi, signer);
        }catch(error){
            console.error("Purchase Failed: " + error);
            setMessage("Purchase Failed: " + error);
        }
    };
};

export default PurchaseProduct