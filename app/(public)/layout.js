import Navbar from "@/components/navbar/Navbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <div className="relative">
        <Navbar />
      </div>
      <div className="">
        {children}
      </div>
    </>
  );
}
