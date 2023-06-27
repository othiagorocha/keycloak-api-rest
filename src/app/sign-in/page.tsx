"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signIn("credentials", {
      username,
      password,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        alert("Login successful");
        router.push("/");
      }

      if (callback?.error) {
        alert("Error: " + callback.error);
      }
    });
  };

  return (
    <main className="flex h-screen items-center justify-center">
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleLogin} className="flex flex-col">
        <label className="font-bold mb-2">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border rounded text-zinc-700 p-2"
          />
        </label>
        <label className="font-bold mb-2">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border rounded text-zinc-700 p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 mt-4"
        >
          Login
        </button>
      </form>
    </main>
  );
}
