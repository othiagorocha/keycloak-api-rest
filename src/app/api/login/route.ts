import axios from "axios";
import { NextResponse } from "next/server";
import qs from "qs";

type KeycloakCredentialsBody = {
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
  grant_type: "password" | "client_credentials";
};

type RequestBody = {
  username: string;
  password: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RequestBody;

  const credentials: KeycloakCredentialsBody = {
    client_id: process.env.NEXT_PUBLIC_URL_CLIENT_ID as string,
    client_secret: process.env.NEXT_PUBLIC_URL_CLIENT_SECRET as string,
    username: body.username,
    password: body.password,
    grant_type: "password",
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_KEYCLOAK_LOGIN}`,
      qs.stringify(credentials),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const user = response.data;

    if (user) {
      return NextResponse.json("deu certo!", { status: 200 });
    }
  } catch (error) {
    return NextResponse.json("não autorizado", { status: 401 });
  }
}
