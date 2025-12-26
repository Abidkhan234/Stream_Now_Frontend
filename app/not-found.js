"use client";

import CustomAuthForm from "@/components/Form/CustomAuthForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HomeIcon, TriangleAlert } from "lucide-react"
import Image from "next/image";
import bgImage from '@/public/Auth-Page-Image/Group 1321314770.png'
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full grid place-content-center relative">
            <Image
                src={bgImage}
                alt="background"
                fill
                className="object-cover -z-20"
                priority
            />
            <CustomAuthForm showBackButton={false} className="sm:max-w-[580px] sm:py-10 py-5">
                <div className="text-center flex flex-col items-center gap-4 py-5">
                    <div className="md:text-5xl text-4xl font-bold  flex flex-col items-center gap-3">
                        <TriangleAlert className="size-16 text-[#C40000]" />
                        Page Not Found
                    </div>
                    <p className="text-gray-400 md:text-lg">The page you are looking for does not exist.</p>
                    <div className="flex items-center md:flex-row flex-col w-full gap-2">
                        <Button
                            onClick={() => router.replace("/")}
                            className="mt-4 flex items-center gap-2 text-base py-7 md:w-[50%] w-full"
                        >
                            <HomeIcon className="size-5" />
                            Go Back Home
                        </Button>
                        <Button
                            onClick={() => router.back()}
                            className="mt-4 flex items-center gap-2 text-base py-7 md:w-[50%] w-full"
                        >
                            <ArrowLeft className="size-5" />
                            Go Back
                        </Button>
                    </div>
                </div>
            </CustomAuthForm>
        </div>
    )
}

export default NotFound
