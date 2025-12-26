"use client";

import TimerButton from "@/components/buttons/TimerButton";
import CustomAuthForm from "@/components/Form/CustomAuthForm";
import OtpInput from "@/components/inputs/OtpInput";
import localHelper from "@/helpers/localStorage";
import useCustomMutation from "@/hooks/useCustomMutation";
import ProtectedWrapper from "@/wrappers/ProtectedWrapper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
    const router = useRouter();
    const [otpValue, setOtpValue] = useState("");

    const { mutate, isPending } = useCustomMutation({
        query_name: ["otp_verification_mutation"],
        query_url: "/user/verify-code"
    })

    const onResend = () => {
        toast.success("OTP resend successfully");
    };

    const onOtpSubmit = async (value) => {
        const otp = value.trim();
        const email = await localHelper.getItem("email");

        if (!/^\d{6}$/.test(otp)) {
            toast.error("OTP must contain only numbers");
            return;
        }

        mutate({ payload: { email, code: otp } }, {
            onSuccess: async ({ data, message }) => {
                toast.success(message);
                setOtpValue("");
                router.replace("/new-password");
            },
            onError: (error) => {
                if (typeof error?.message === "string") {
                    toast.error(error.message);
                    return
                }
                Object.entries(error?.message).forEach(([key, message]) => {
                    toast.error(`${message}`);
                });
            },
        },
        )

    };

    useEffect(() => {
        if (otpValue.length == 6) {
            onOtpSubmit(otpValue);
        }
    }, [otpValue]);

    return (
        <ProtectedWrapper prevRoute={`forget-password`} lookingFor={`email`}>
            <CustomAuthForm title={`One Time Password`} subTitle="Please enter 6 digit code, we have sent you on your registered email." className={`gap-5 sm:py-10 py-5 sm:max-w-[584px]`}>
                <div>
                    <OtpInput setOtpValue={setOtpValue} otpValue={otpValue} />
                </div>
                <div className="">
                    <TimerButton isPending={isPending} onResend={onResend} />
                </div>
            </CustomAuthForm>
        </ProtectedWrapper>
    )
}

export default page