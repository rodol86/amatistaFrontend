import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function ClientesAlta() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
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
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
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
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <h1>Alta de Cliente</h1>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="step">
            <h2>Crear cliente</h2>
            <div>
              <label htmlFor="cuit">CUIT:</label>
              <input
                type="text"
                id="cuit"
                name="cuit"
                value={formData.cuit}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="condicionAFIP">Condición AFIP:</label>
              <input
                type="text"
                id="condicionAFIP"
                name="condicionAFIP"
                value={formData.condicionAFIP}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="condicionIIBB">Condición IIBB:</label>
              <input
                type="text"
                id="condicionIIBB"
                name="condicionIIBB"
                value={formData.condicionIIBB}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" onClick={handleNextStep} disabled={Object.values(formData).some(value => value === '')}>
              Siguiente
            </button>
          </div>
        )}
        {currentStep === 2 && (
          <div className="step">
            <h2>Agregar credenciales</h2>
            <div className="panel">
              <p><strong>CUIT:</strong> {formData.cuit}</p>
              <p><strong>Nombre:</strong> {formData.nombre}</p>
              <p><strong>Apellido:</strong> {formData.apellido}</p>
              <p><strong>Teléfono:</strong> {formData.telefono}</p>
              <p><strong>Condición AFIP:</strong> {formData.condicionAFIP}</p>
              <p><strong>Condición IIBB:</strong> {formData.condicionIIBB}</p>
            </div>
            <div className="section" id="credenciales">
              <h2>Credenciales</h2>
              <div>
                <label htmlFor="type">Tipo:</label>
                <select
                  id="type"
                  name="type"
                  value={credentialData.type}
                  onChange={handleCredentialChange}
                >
                  <option value="AFIP">AFIP</option>
                  <option value="AGIP">AGIP</option>
                </select>
              </div>
              <div>
                <label htmlFor="usuario">Usuario:</label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={credentialData.usuario}
                  onChange={handleCredentialChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="contrasena">Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={credentialData.contrasena}
                  onChange={handleCredentialChange}
                  required
                />
              </div>
              <button type="button" onClick={handleAddCredential}>Agregar Credencial</button>
            </div>
            <ul>
              {credentialsList.map((cred, index) => (
                <li key={index}>
                  <p><strong>Tipo:</strong> {cred.type}</p>
                  <p><strong>Usuario:</strong> {cred.usuario}</p>
                </li>
              ))}
            </ul>
            <button type="button" onClick={handlePrevStep}>Anterior</button>
            <button type="button" onClick={handleNextStep}>Siguiente</button>
          </div>
        )}
        {currentStep === 3 && (
          <div className="step">
            <h2>Confirmar datos</h2>
            <div className="panel">
              <p><strong>CUIT:</strong> {formData.cuit}</p>
              <p><strong>Nombre:</strong> {formData.nombre}</p>
              <p><strong>Apellido:</strong> {formData.apellido}</p>
              <p><strong>Teléfono:</strong> {formData.telefono}</p>
              <p><strong>Condición AFIP:</strong> {formData.condicionAFIP}</p>
              <p><strong>Condición IIBB:</strong> {formData.condicionIIBB}</p>
            </div>
            <div className="panel">
              <h2>Credenciales</h2>
              <ul>
                {credentialsList.map((cred, index) => (
                  <li key={index}>
                    <p><strong>Tipo:</strong> {cred.type}</p>
                    <p><strong>Usuario:</strong> {cred.usuario}</p>
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={handlePrevStep}>Anterior</button>
            <button type="submit">Guardar Cliente</button>
          </div>
        )}
      </form>
      <style jsx>{`
        .step {
          margin-bottom: 2rem;
        }
        .panel {
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        .container {
          display: flex;
          justify-content: space-between;
        }
        .section {
          flex: 1;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-right: 1rem;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        div {
          margin-bottom: 1rem;
        }
        label {
          margin-bottom: 0.5rem;
        }
        input, select {
          padding: 0.5rem;
          font-size: 1rem;
          width: 100%;
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          align-self: flex-end;
          margin: 0.5rem 0.5rem 0 0;
        }
        button:hover {
          background-color: #005bb5;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 0.5rem;
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
