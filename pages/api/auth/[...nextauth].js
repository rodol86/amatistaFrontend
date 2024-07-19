import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.name = token.name;
      session.user.id = token.sub;
      return session;
    },
    async signIn({ user, account, profile }) {

      if (account.provider === 'google') {
        try {
          await axios.post('http://localhost:8080/usuario/register', {
            name: user.name,
            email: user.email,
            image: user.image,
            googleId: profile.sub,
          });
        } catch (error) {
          console.error('User registration failed:', error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add this line to reference the secret
  debug: true,
});
