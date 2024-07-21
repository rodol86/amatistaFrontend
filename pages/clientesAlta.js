import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { 
  Container, Box, Button, TextField, Typography, Paper, 
  Select, MenuItem, InputLabel, FormControl, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Stepper, Step, StepLabel 
} from '@mui/material';

export default function ClientesAlta() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    cuit: '',
    nombre: '',
    apellido: '',
    telefono: '',
    condicionAFIP: '',
    condicionIIBB: '',
  });
  const [credentialData, setCredentialData] = useState({
    type: 'AFIP',
    usuario: '',
    contrasena: '',
  });
  const [credentialsList, setCredentialsList] = useState([]);

  const steps = ['Crear cliente', 'Agregar credenciales', 'Confirmar datos'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setCredentialData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCredential = () => {
    setCredentialsList([...credentialsList, credentialData]);
    setCredentialData({
      type: 'AFIP',
      usuario: '',
      contrasena: '',
    });
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/cliente/${session.user.id}`, {
        ...formData,
        credentials: credentialsList,
      });
      console.log('Form submitted successfully:', response.data);
      router.push('/cliente');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!session) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Layout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Alta de Cliente
        </Typography>
        <Stepper activeStep={currentStep} sx={{ marginBottom: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
              <Typography variant="h6">Crear cliente</Typography>
              <TextField
                label="CUIT"
                name="cuit"
                value={formData.cuit}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Condición AFIP"
                name="condicionAFIP"
                value={formData.condicionAFIP}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Condición IIBB"
                name="condicionIIBB"
                value={formData.condicionIIBB}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStep}
                disabled={Object.values(formData).some(value => value === '')}
                sx={{ marginTop: 2 }}
              >
                Siguiente
              </Button>
            </Paper>
          )}
          {currentStep === 1 && (
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
              <Typography variant="h6">Agregar credenciales</Typography>
              <Box mb={2}>
                <Typography><strong>CUIT:</strong> {formData.cuit}</Typography>
                <Typography><strong>Nombre:</strong> {formData.nombre}</Typography>
                <Typography><strong>Apellido:</strong> {formData.apellido}</Typography>
                <Typography><strong>Teléfono:</strong> {formData.telefono}</Typography>
                <Typography><strong>Condición AFIP:</strong> {formData.condicionAFIP}</Typography>
                <Typography><strong>Condición IIBB:</strong> {formData.condicionIIBB}</Typography>
              </Box>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo</InputLabel>
                <Select
                  id="type"
                  name="type"
                  value={credentialData.type}
                  onChange={handleCredentialChange}
                >
                  <MenuItem value="AFIP">AFIP</MenuItem>
                  <MenuItem value="AGIP">AGIP</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Usuario"
                name="usuario"
                value={credentialData.usuario}
                onChange={handleCredentialChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Contraseña"
                type="password"
                name="contrasena"
                value={credentialData.contrasena}
                onChange={handleCredentialChange}
                fullWidth
                margin="normal"
                required
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCredential}
                sx={{ marginTop: 2 }}
              >
                Agregar Credencial
              </Button>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Usuario</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {credentialsList.map((cred, index) => (
                      <TableRow key={index}>
                        <TableCell>{cred.type}</TableCell>
                        <TableCell>{cred.usuario}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePrevStep}
                sx={{ marginTop: 2, marginRight: 1 }}
              >
                Anterior
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStep}
                sx={{ marginTop: 2 }}
              >
                Siguiente
              </Button>
            </Paper>
          )}
          {currentStep === 2 && (
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
              <Typography variant="h6">Confirmar datos</Typography>
              <Box mb={2}>
                <Typography><strong>CUIT:</strong> {formData.cuit}</Typography>
                <Typography><strong>Nombre:</strong> {formData.nombre}</Typography>
                <Typography><strong>Apellido:</strong> {formData.apellido}</Typography>
                <Typography><strong>Teléfono:</strong> {formData.telefono}</Typography>
                <Typography><strong>Condición AFIP:</strong> {formData.condicionAFIP}</Typography>
                <Typography><strong>Condición IIBB:</strong> {formData.condicionIIBB}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="h6">Credenciales</Typography>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Usuario</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {credentialsList.map((cred, index) => (
                        <TableRow key={index}>
                          <TableCell>{cred.type}</TableCell>
                          <TableCell>{cred.usuario}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePrevStep}
                sx={{ marginTop: 2, marginRight: 1 }}
              >
                Anterior
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: 2 }}
              >
                Guardar Cliente
              </Button>
            </Paper>
          )}
        </form>
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
