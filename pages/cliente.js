import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function ClientePage({ initialData }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialData && session) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8080/cliente/${session.user.id}/clientes`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [session, initialData]);

  const handleAddClient = () => {
    router.push('/clientesAlta');
  };

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <h1>Clientes</h1>
      <button id="alta-cliente" onClick={handleAddClient}>
        Agregar cliente
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>CUIT</th>
              <th>Telefono</th>
              <th>Condición AFIP</th>
              <th>Condición IIBB</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.cuit}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.condicionAFIP}</td>
                <td>{cliente.condicionIIBB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay clientes registrados</p>
      )}
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
          text-align: left;
        }
        button {
          margin-bottom: 1rem;
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let initialData = null;
  try {
    const response = await axios.get(`http://localhost:8080/cliente/${session.user.id}/clientes`);
    initialData = response.data;
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }

  return {
    props: { session, initialData },
  };
}
