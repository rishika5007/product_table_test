import Image from "next/image";
import LoginPage from "./login/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {

      const cookieStore = cookies();
      const token = cookieStore.get("authToken");

      if (token) {
        redirect("/products");
      }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginPage />
    </main>
  );
}
