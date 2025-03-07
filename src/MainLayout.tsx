import React from 'react';
import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <h2 className="mt-10 mb-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Bem-vindo ao Buddy Budge</h2>
        <p className="mt-8 mb-8 text-pretty text-lg font-medium text-gray-900 sm:text-xl/8">Por favor, faça login ou cadastre-se para continuar.</p>
      </main>
    </>
  );
};

export default MainLayout;