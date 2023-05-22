import { Session } from "@/components/User/Session";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar>
        <p>Damn brother</p>
      </Navbar>
      <h1 className="text-2xl font-bold">Home</h1>
      <Session />
    </main>
  );
}
