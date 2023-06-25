import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "keycloak-credentials",
      credentials: {
        username: { label: "Nome do usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("/api/login", credentials);

          const user = res.data;
          return user;
        } catch (error) {}
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      console.log(`token: ${token}, session: ${session}`);

      return session;
    },
  },
};
