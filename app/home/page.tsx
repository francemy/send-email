
import { getServerSession } from "next-auth";
import { LogoutButton } from "../component";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }
  
  return (

    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <header><LogoutButton /></header>
     bem vindo!

    </main>
  );
}
