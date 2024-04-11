import Image from "next/image";
import Timer from "./components/Timer";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen flex-row">
      <Sidebar />
      <main className="flex h-screen flex-col w-full bg-[#E5E6E4] p-8 ">
        <div className="flex h-full w-full bg-white ">
          <Timer />
        </div>
      </main>
    </div>
  );
}
