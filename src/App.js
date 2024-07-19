import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  return(
    <div className='App'>
      <h1>Decentralized Marketplace</h1>
      <header className='App-header'>
        <WalletConnect setWalletAddress={setWalletAddress}/>
        {walletAddress && <p>Wallet Address: {walletAddress}</p>}
      </header>
    </div>
  );
};

export default App;