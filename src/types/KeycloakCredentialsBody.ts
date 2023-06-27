type KeycloakCredentialsBody = {
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
  grant_type: "password" | "client_credentials";
};
