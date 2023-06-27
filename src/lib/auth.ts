import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import qs from "qs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "keycloak-credentials",
      credentials: {
        username: { label: "Nome do usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Sem credenciais");
        }

        const keycloakCredentials: KeycloakCredentialsBody = {
          client_id: process.env.NEXT_PUBLIC_URL_CLIENT_ID as string,
          client_secret: process.env.NEXT_PUBLIC_URL_CLIENT_SECRET as string,
          username: credentials.username,
          password: credentials.password,
          grant_type: "password",
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL_KEYCLOAK_LOGIN}`,
          qs.stringify(keycloakCredentials),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const user = response.data;

        if (!user) throw new Error("Usuário inválido");

        console.log(user);

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
