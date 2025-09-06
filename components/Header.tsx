import React from 'react';
import { RadioIcon } from './icons/RadioIcon.tsx';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <RadioIcon className="w-8 h-8 text-emerald-400" />
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-400 tracking-wide">
          إذاعات إسلامية
        </h1>
      </div>
    </header>
  );
};

export default Header;