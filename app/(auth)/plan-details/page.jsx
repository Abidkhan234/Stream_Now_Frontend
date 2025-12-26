import CustomAuthForm from "@/components/Form/CustomAuthForm";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { FaRegCircleCheck } from "react-icons/fa6"

const page = () => {
  return (
    <CustomAuthForm
      title={`Choose your plan`}
      className={`sm:py-10 py-5 sm:max-w-[555px]`}
      step={2}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-7">
          {[1, 2, 3].map((_, i) => (
            <div className="flex items-center gap-4 text-white" key={i}>
              <div className="">
                <span className="text-2xl">
                  <FaRegCircleCheck />
                </span>
              </div>
              <div className="text-sm max-[375px]:leading-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </div>
            </div>
          ))}
        </div>
        <Link href={"/choose-plan"} className="w-full">
          <Button type={"submit"} className={`py-6 w-full rounded-[18px]!`}>
            Next
          </Button>
        </Link>
      </div>
    </CustomAuthForm>
  );
}

export default page
