import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRedirect = (path) => {
    router.push(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/vencimientos/${session.user.id}`); // Replace with your actual API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <h1>Welcome, {session.user.name}</h1>
      <div className="panels">
        <div className="panel" id="panel-1" onClick={() => handleRedirect('/cliente')}>
          <h2>Gestionar clientes</h2>
        </div>
        <div className="panel" id="panel-2">
          <h2>Panel 2</h2>
        </div>
        <div className="panel" id="panel-3">
          <h2>Panel 3</h2>
        </div>
        <div className="panel" id="panel-4">
          <h2>Panel 4</h2>
        </div>
        <div className="panel" id="panel-5">
          <h2>Próximos vencimientos</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {data.length === 0 ? (
                <p>No hay próximos vencimientos 😊</p>
              ) : (
                <div className="cards">
                  {data.map((item, index) => (
                    <div className="card" key={index}>
                      <strong>Impuesto:</strong> {item.impuesto}<br />
                      <strong>CUIT Desde:</strong> {item.cuitDesde}<br />
                      <strong>CUIT Hasta:</strong> {item.cuitHasta}<br />
                      <strong>Fecha Vencimiento:</strong> {item.fechaVencimiento}<br />
                      <strong>Clientes:</strong>
                      <ul>
                        {item.clientes.map(cliente => (
                          <li key={cliente.id}>
                            {cliente.nombre} {cliente.apellido} (CUIT: {cliente.cuit})
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .panels {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 1rem;
        }
        .panel {
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        .panel:hover {
          background-color: #f0f0f0;
        }
        #panel-1 {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }
        #panel-2 {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
        #panel-3 {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
        }
        #panel-4 {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }
        #panel-5 {
          grid-column: 3 / 4;
          grid-row: 1 / 3;
          overflow-y: auto;
        }
        .cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .card {
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #f9f9f9;
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

  return {
    props: { session },
  };
}
