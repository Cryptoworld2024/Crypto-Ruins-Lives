import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Crypto Ruins Lives — React + Tailwind component
// Integrated with a minting smart contract via ethers.js
// Usage: place this component in your React app (Vite / CRA / Next.js) with Tailwind configured.

export default function CryptoRuinsLanding() {
  // --- CONTRACT CONFIG (replace these) ---
  const CONTRACT_ADDRESS = "REPLACE_WITH_YOUR_CONTRACT_ADDRESS";
  // Replace this with your contract ABI array
  const CONTRACT_ABI = [];
  const MINT_PRICE_ETH = "0.01"; // price per NFT in ETH (adjust to your contract)
  // ----------------------------------------

  const [walletAddress, setWalletAddress] = useState(null);
  const [mintAmount, setMintAmount] = useState(1);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setWalletAddress(window.ethereum.selectedAddress);
    }
  }, []);

  async function connectWallet() {
    try {
      if (!window.ethereum) throw new Error("No Web3 wallet found (MetaMask recommended).");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
      setStatus("Wallet connected: " + accounts[0]);
    } catch (err) {
      setStatus("Connection error: " + (err.message || err));
    }
  }

  async function mintNFTs() {
    if (!walletAddress) { setStatus("Please connect your wallet first."); return; }
    try {
      setIsProcessing(true);
      setStatus("Preparing transaction...");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Total price = MINT_PRICE_ETH * mintAmount
      const total = ethers.utils.parseEther((parseFloat(MINT_PRICE_ETH) * mintAmount).toString());

      // NOTE: adapt this call to your contract's mint function signature
      // Common signatures: mint(uint256), mint(uint256 _amount), publicMint(uint256)
      const tx = await contract.mint(mintAmount, { value: total });
      setStatus("Transaction sent: " + tx.hash);
      await tx.wait();
      setStatus("Mint successful: " + tx.hash);
    } catch (err) {
      setStatus("Mint failed: " + (err.message || err));
    } finally {
      setIsProcessing(false);
    }
  }

  const nftCount = 15;
  const images = Array.from({ length: nftCount }, (_, i) => `/mnt/data/opensea_ready_final2/${i + 1}.png`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070719] via-[#070717] to-[#04030a] text-gray-100 font-sans">
      {/* Neon animated background layers */}
      <div className="fixed inset-0 -z-10 animate-gradient bg-[length:300%_300%] bg-gradient-to-r from-[#7a00ff26] via-[#00b4ff26] to-[#ff00c826]"></div>
      <div className="fixed inset-0 -z-20 opacity-30" style={{ backgroundImage: "url('/mnt/data/opensea_ready_final2/1.png')", backgroundRepeat: 'repeat', filter: 'blur(40px) brightness(0.35)' }} />

      <header className="py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#c66bff] to-[#6bf0ff] drop-shadow-xl animate-flicker">Crypto Ruins Lives</h1>
        <p className="mt-4 text-xl text-[#bfc8ff99] max-w-2xl mx-auto">A satirical Web3 dystopia — 15 unique NFTs revealing the dark side of the crypto world.</p>
        <div className="mt-8">
          <a href="#mint" className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-[#b056ff] to-[#6bf0ff] text-black font-semibold shadow-2xl hover:scale-[1.02] transition">Go to Mint</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About the collection</h2>
              <p className="text-[#bfc8ffcc]">Crypto Ruins Lives is an artistic, dystopian, and satirical NFT collection illustrating the emotional and financial impact of crypto culture. Each NFT represents a character standing in the ruins of the Web3 world — featuring unique effects, expressions, motifs, and symbolism.</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0f0b18] border border-[#4a2b7f] shadow-sm">Character Archetypes: Rekt Trader, Hopium Priest, Influencer Ruglord, Lost Hodler, Maximalist Ghost</div>
                <div className="p-4 rounded-xl bg-[#0f0b18] border border-[#2b4a7f] shadow-sm">Key Traits: Liquidation Storm, Rugpull Desert, Moon Cemetery, Burning Portfolio, FOMO Flames</div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#3a1f5b]">
                <img src={images[0]} alt="Hero NFT" className="w-full h-64 object-cover" />
                <div className="p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="text-sm text-[#cfc8ff]">Featured — Crypto Ruins Lives #1</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Roadmap</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#0b0713] rounded-xl border border-[#4b2b7f]"> <strong>Q1</strong>
              <p className="text-sm text-[#aeb7ffcc] mt-2">Collection launch, lore publication, community activation</p>
            </div>
            <div className="p-4 bg-[#0b0713] rounded-xl border border-[#3b7f9f]"> <strong>Q2</strong>
              <p className="text-sm text-[#aeb7ffcc] mt-2">IPFS integration, additional utility NFT drops</p>
            </div>
            <div className="p-4 bg-[#0b0713] rounded-xl border border-[#7f3b6f]"> <strong>Q3</strong>
              <p className="text-sm text-[#aeb7ffcc] mt-2">Web3 mini-game — Survive the Rugpull</p>
            </div>
            <div className="p-4 bg-[#0b0713] rounded-xl border border-[#2b7f4f]"> <strong>Q4</strong>
              <p className="text-sm text-[#aeb7ffcc] mt-2">Partnerships, expanded Crypto Ruins universe</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">NFT Gallery</h3>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-[#1f1036] flex items-center justify-center animate-spin-slow">⚡</div>
              <div className="w-10 h-10 rounded-full bg-[#1a1436] flex items-center justify-center animate-pulse">💎</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {images.map((src, idx) => (
              <div key={src} className="group relative rounded-xl overflow-hidden border border-[#341a5b] bg-[#0d0814]">
                <img src={src} alt={`NFT ${idx + 1}`} className="w-full h-40 object-cover transform transition group-hover:scale-105" />
                <div className="p-3">
                  <div className="text-sm text-[#cfc8ff]">Crypto Ruins Lives #{idx + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="mint" className="mb-24">
          <h3 className="text-2xl font-bold mb-4">Mint</h3>
          <p className="text-[#bfc8ffcc] mb-4">Connect your wallet and mint directly from the contract.</p>

          <div className="flex flex-col gap-4 max-w-sm">
            <button onClick={connectWallet} className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#b056ff] to-[#6bf0ff] text-black font-semibold">
              {walletAddress ? `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(walletAddress.length-4)}` : "Connect Wallet"}
            </button>

            <input
              type="number"
              min="1"
              max="20"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[#0f0b18] border border-[#5b2b8f] text-white"
            />

            <button onClick={mintNFTs} className="px-6 py-3 rounded-lg border border-[#5b2b8f] hover:bg-[#5b2b8f] transition">
              Mint {mintAmount} NFT
            </button>

            {status && <div className="text-sm text-[#9aa7c9] mt-2">{status}</div>}
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-sm text-[#9aa7c9]">© 2025 Crypto Ruins Lives — All rights reserved.</footer>

      <style jsx>{`
        .animate-gradient { animation: gradientMove 12s ease infinite; }
        @keyframes gradientMove { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
        .animate-flicker { animation: flicker 3s infinite; }
        @keyframes flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1}20%,24%,55%{opacity:0.6} }
        .animate-spin-slow { animation: spin 6s linear infinite; }
        @keyframes spin { to{ transform: rotate(360deg);} }
        .animate-pulse { animation: pulse 2.5s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.15)} }
      `}</style>
    </div>
  );
}
