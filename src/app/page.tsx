"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Link as LinkIcon, Activity, Users, Eye } from 'lucide-react';
// import { useSeraPay } from '@seratech/sdk-react'; // Placeholder for the actual SDK

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connectWallet = () => {
    // Mock connect for now until SDK is wired up
    setIsConnected(true);
    setAddress('0x1234...abcd');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">Solas</h1>
          <p className="text-sm text-gray-500">Global Instant Payment Platform</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500">Balance</p>
            <p className="font-mono font-bold text-lg">$1,240.50</p>
          </div>
          <button onClick={connectWallet} className="btn-primary">
            {isConnected ? `Connected: ${address}` : 'Connect Wallet'}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="glass-card mb-8 bg-gradient-to-br from-primary-light to-white">
        <h2 className="text-3xl font-bold mb-2">Send money anywhere, instantly.</h2>
        <p className="text-gray-600 mb-6">Zero friction. Settled on Sera Pay.</p>
        
        <div className="flex flex-wrap gap-4">
          <Link href="/send" className="btn-primary flex items-center gap-2">
            <ArrowRight size={18} /> Send
          </Link>
          <button className="bg-white hover:bg-gray-50 text-primary-dark font-semibold py-2 px-4 rounded-lg shadow transition-all duration-150 border border-gray-200 flex items-center gap-2">
            <ArrowLeft size={18} /> Request
          </button>
          <button className="bg-white hover:bg-gray-50 text-primary-dark font-semibold py-2 px-4 rounded-lg shadow transition-all duration-150 border border-gray-200 flex items-center gap-2">
            <LinkIcon size={18} /> Create Link
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* RECENT TRANSACTIONS */}
        <section className="md:col-span-2">
          <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
          <div className="glass-card flex flex-col gap-4">
            <TransactionItem type="send" name="Alice" amount="50.00" time="2 mins ago" />
            <TransactionItem type="receive" name="Bob" amount="25.00" time="1 hour ago" />
            <TransactionItem type="send" name="Creator Link" amount="10.00" time="yesterday" />
          </div>
        </section>

        {/* QUICK STATS */}
        <section>
          <h3 className="text-xl font-bold mb-4">Creator Stats</h3>
          <div className="glass-card flex flex-col gap-6">
            <StatItem icon={<Activity className="text-primary" />} label="Earnings" value="$420.00" />
            <StatItem icon={<Users className="text-primary" />} label="Supporters" value="34" />
            <StatItem icon={<Eye className="text-primary" />} label="Link Views" value="1,204" />
          </div>
        </section>
      </div>
    </div>
  );
}

function TransactionItem({ type, name, amount, time }: { type: 'send'|'receive', name: string, amount: string, time: string }) {
  const isSend = type === 'send';
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isSend ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {isSend ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-mono font-bold ${isSend ? 'text-gray-900' : 'text-primary-dark'}`}>
          {isSend ? '-' : '+'}${amount}
        </p>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-primary-light rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-bold text-xl">{value}</p>
      </div>
    </div>
  );
}
