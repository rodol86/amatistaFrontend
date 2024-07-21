import { signIn, getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Button, Typography, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Correct import

const LoginPage = ({ session }) => {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  if (session) {
    return <Typography>Redirecting...</Typography>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ background: 'linear-gradient(135deg, #e6e6fa, #dcdcdc)' }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, textAlign: 'center', maxWidth: 400 }}>
        <Box mb={4}>
          <Image src="/amethyst_image.png" alt="Amethyst" width={100} height={100} />
          <Typography variant="h5" component="h1" mt={2} color="primary">
            Amatista suit
          </Typography>
        </Box>
        <Button
          onClick={() => signIn('google')}
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{ backgroundColor: '#4285f4', color: 'white', '&:hover': { backgroundColor: '#357ae8' }, width: '100%' }}
        >
          Iniciar sesión con Google
        </Button>
      </Paper>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default LoginPage;
