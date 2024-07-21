import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Button, List, ListItem, ListItemText } from '@mui/material';

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
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {session.user.name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card onClick={() => handleRedirect('/cliente')} style={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6">Gestionar clientes</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Panel 2</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Panel 3</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Panel 4</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Próximos vencimientos</Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    {data.length === 0 ? (
                      <Typography>No hay próximos vencimientos 😊</Typography>
                    ) : (
                      <div>
                        {data.map((item, index) => (
                          <Card key={index} variant="outlined" style={{ marginTop: '1rem' }}>
                            <CardContent>
                              <Typography variant="body1"><strong>Impuesto:</strong> {item.impuesto}</Typography>
                              <Typography variant="body1"><strong>CUIT Desde:</strong> {item.cuitDesde}</Typography>
                              <Typography variant="body1"><strong>CUIT Hasta:</strong> {item.cuitHasta}</Typography>
                              <Typography variant="body1"><strong>Fecha Vencimiento:</strong> {item.fechaVencimiento}</Typography>
                              <Typography variant="body1"><strong>Clientes:</strong></Typography>
                              <List>
                                {item.clientes.map(cliente => (
                                  <ListItem key={cliente.id}>
                                    <ListItemText primary={`${cliente.nombre} ${cliente.apellido} (CUIT: ${cliente.cuit})`} />
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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

  return {
    props: { session },
  };
}
