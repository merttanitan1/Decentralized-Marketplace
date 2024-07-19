import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setWalletAddress }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const connectWallet = async () => {
        if(window.ethereum){
            try{
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
            }catch(err){
                setErrorMessage("Connection Failed: " + err);
            }
        }else {
            setErrorMessage("Please Install MetaMask.");
        }
    };

    return(
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default WalletConnect;