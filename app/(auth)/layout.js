import Image from "next/image";
import bgImage from "@/public/Auth-Page-Image/Group 1321314770.png";
import AuthNav from "@/components/navbar/AuthNav";

export default function AuthLayout({ children }) {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background image */}
        <Image
          src={bgImage}
          alt="background"
          fill
          className="object-cover -z-20"
          loading="lazy"
        />

        {/* Optional Auth Navbar */}
        <AuthNav />

        {/* Content */}
        <div className="flex items-center justify-center min-h-screen px-4">
          {children}
        </div>
      </div>
    </>
  );
}
