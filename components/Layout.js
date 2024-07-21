import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Amatista suit</p>
      </footer>
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        main {
          flex: 1;
          padding: 1rem;
        }
        footer {
          background: #f5f5f5;
          padding: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Layout;
