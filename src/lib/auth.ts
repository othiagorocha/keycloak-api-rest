import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
  secret: process.env.NEXTAUTH_SECRET,
};
