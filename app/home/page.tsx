
import { useSession } from "next-auth/react";
import { LogoutButton } from "../component";

export default async function Home() {
 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <LogoutButton />
       
      </header>
      bem vindo!
    </main>
  );
}
