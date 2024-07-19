import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>Amatista suit</h1>
        <button onClick={() => signOut()}>Cerrar Sesión</button>
      </header>
      <nav>
        <ul>
          <li>
            <Link href="/clientes">Clientes</Link>
          </li>
          <li>
            <Link href="/opcion2">Opcion 2</Link>
          </li>
          <li>
            <Link href="/opcion3">Opcion 3</Link>
          </li>
          <li>
            <Link href="/opcion4">Opcion 4</Link>
          </li>
        </ul>
      </nav>
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
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #e6e6fa; /* Soft violet color */
          padding: 1rem;
        }
        h1 {
          margin: 0;
          color: #4b0082; /* A darker shade of violet for contrast */
        }
        nav {
          background: #dcdcdc;
          padding: 1rem;
        }
        nav ul {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        nav ul li {
          margin-right: 1rem;
        }
        nav ul li a {
          text-decoration: none;
          color: #4b0082;
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
        button {
          padding: 0.5rem 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default Layout;
