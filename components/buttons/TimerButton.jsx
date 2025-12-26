import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const TimerButton = ({ onResend, isPending }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleClick = () => {
    onResend();
    setTimer(60); // restart 60s timer
  };

  return (
    <Button
      type="button"
      size="block"
      onClick={handleClick}
      disabled={isPending || timer > 0}
      className="min-[425px]:py-4 py-3 mt-5 disabled:opacity-80 disabled:pointer-events-none rounded-[18px]!"
    >
      {isPending ? (
        <>
          <Spinner />
          Resend Code
        </>
      ) : timer > 0 ? (
        `Resend in ${timer}s`
      ) : (
        "Resend Code"
      )}
    </Button>
  );
};

export default TimerButton;
