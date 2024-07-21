import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Button, CircularProgress, Container, Typography, Radio } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function ClientePage({ initialData }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const handleRadioChange = (id) => {
    setSelectedId(id);
  };

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (!session) {
    return <Typography>You need to be logged in to view this page.</Typography>;
  }

  const columns = [
    {
      field: 'select',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <Radio
          checked={selectedId === params.id}
          onChange={() => handleRadioChange(params.id)}
          value={params.id}
          name="radio-button-demo"
          inputProps={{ 'aria-label': params.id }}
        />
      ),
    },
    { field: 'apellido', headerName: 'Apellido', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'cuit', headerName: 'CUIT', width: 150 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    { field: 'condicionAFIP', headerName: 'Condición AFIP', width: 150 },
    { field: 'condicionIIBB', headerName: 'Condición IIBB', width: 150 },
  ];

  const rows = data
    ? data.map((cliente) => ({
        id: cliente.id,
        apellido: cliente.apellido,
        nombre: cliente.nombre,
        cuit: cliente.cuit,
        telefono: cliente.telefono,
        condicionAFIP: cliente.condicionAFIP,
        condicionIIBB: cliente.condicionIIBB,
      }))
    : [];

  return (
    <Layout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Clientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClient}
          sx={{ marginBottom: 2 }}
        >
          Agregar cliente
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </div>
        )}
      </Container>
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
    props: { initialData },
  };
}
