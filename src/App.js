import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import CreateProduct from './components/CreateProduct';
import PurchaseProduct from './components/PurchaseProduct';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const marketPlaceAddress = "0x7FC7061138093c423DA6B023AC62eF826C3967c7";

  return(
    <div className='App'>
      <h1>Decentralized Marketplace</h1>
      <header className='App-header'>
        <WalletConnect setWalletAddress={setWalletAddress}/>
        {walletAddress && <p>Wallet Address: {walletAddress}</p>}
        {walletAddress && <CreateProduct marketPlaceAddress={marketPlaceAddress}/>}
        {walletAddress && <PurchaseProduct marketplaceWalletAddress={marketPlaceAddress} />}
      </header>
    </div>
  );
};

export default App;