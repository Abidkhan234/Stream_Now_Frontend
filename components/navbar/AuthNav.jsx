import Image from "next/image";
import Logo from "@/public/Auth-Page-Image/b72acfc6a71a2b59c6b6f3f8fb3d762aee377cb2.png";
import Link from "next/link";
import { Button } from "../ui/button";

const AuthNav = () => {
  return (
    <div className="absolute top-0 left-0 right-0 w-full lg:px-20 min-[425px]:px-10 px-5 z-20 border-b border-[#ffffff42] bg-transparent flex items-center justify-between">
      <div className="w-fit">
        <Image
          src={Logo}
          alt="Logo"
          className="object-cover min-[375px]:w-[140px] w-[115px] h-[70px]"
          priority
        />
      </div>

      <div className="">
        <Link href={`/login`} replace={false}>
          <Button
            className={`min-[375px]:!py-6 py-5 min-[375px]:px-9 px-7 rounded-[22px]`}
          >
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AuthNav;
