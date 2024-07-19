import { signIn, getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LoginPage = ({ session }) => {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  if (session) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <Image src="/amethyst_image.png" alt="Amethyst" width={100} height={100} />
          <h1>Amatista suit</h1>
        </div>
        <div className="login-body">
          <button onClick={() => signIn('google')} className="login-button">
            <Image src="/google-logo.png" alt="Google Logo" width={20} height={20} />
            <span>Iniciar sesión con Google</span>
          </button>
        </div>
      </div>
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #e6e6fa, #dcdcdc);
        }
        .login-box {
          width: 400px;
          padding: 2rem;
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          text-align: center;
        }
        .login-header {
          margin-bottom: 2rem;
        }
        .login-header h1 {
          font-size: 1.5rem;
          color: #4b0082;
          margin-top: 1rem;
        }
        .login-body {
          margin-bottom: 1rem;
        }
        .login-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.5rem;
          background-color: #4285f4;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .login-button:hover {
          background-color: #357ae8;
        }
        .login-button img {
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
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
