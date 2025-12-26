"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OtpInput = ({ setOtpValue, otpValue }) => {
  return (
    <div className="flex flex-col gap-2">
      <InputOTP
        maxLength={6}
        value={otpValue}
        onChange={(val) => setOtpValue(val)}
      >
        <InputOTPGroup
          className={`flex justify-between items-center w-full text-white`}
        >
          <InputOTPSlot
            index={0}
            className={`border border-[#313131] md:rounded-2xl rounded-lg md:size-[60px] min-[425px]:size-[50px] size-[40px] bg-transparent font-bold !text-lg text-white`}
          />
          <InputOTPSlot
            index={1}
            className={`border border-[#313131] md:rounded-2xl rounded-lg md:size-[60px] min-[425px]:size-[50px] size-[40px] bg-transparent font-bold !text-lg text-white`}
          />
          <InputOTPSlot
            index={2}
            className={`border border-[#313131] md:rounded-2xl rounded-lg md:size-[60px] min-[425px]:size-[50px] size-[40px] bg-transparent font-bold !text-lg text-white`}
          />
          <InputOTPSlot
            index={3}
            className={`border border-[#313131] md:rounded-2xl rounded-lg md:size-[60px] min-[425px]:size-[50px] size-[40px] bg-transparent font-bold !text-lg text-white`}
          />
          <InputOTPSlot
            index={4}
            className={`border border-[#313131] md:rounded-2xl rounded-lg md:size-[60px] min-[425px]:size-[50px] size-[40px] bg-transparent font-bold !text-lg text-white`}
          />
          <InputOTPSlot
            index={5}
            className={`border border-[#313131] md:rounded-2xl rounded-lg md:size-[60px] min-[425px]:size-[50px] size-[40px] bg-transparent font-bold !text-lg text-white`}
          />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};
export default OtpInput;
