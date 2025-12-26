import Input from "@/components/inputs/Input";
import AccountDialogLayout from "@/components/layout/AccountDialogLayout";
import { Button } from "@/components/ui/button";
import { updateCardSchema } from "@/schema/Schema";
import { Form, Formik } from "formik";
import Image from "next/image";
import AtmCardImage1 from "@/public/Account-Page/Group 1321314779.png";
import AtmCardImage2 from "@/public/Account-Page/Group 1321314526.png";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import useCustomMutation from "@/hooks/useCustomMutation";

const UpdatePaymentCard = ({
  activeCreditCard,
  expMonth,
  expYear,
  selectedCardSlug,
  holderName,
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useCustomMutation({
    query_name: ["update_card_mutation"],
    query_url: `/gateway/card`,
  });

  const submitHandler = (values, { resetForm }) => {
    mutate(
      {
        payload: {
          ...values,
          _method: "put",
          is_default: 1,
        },
        slug: selectedCardSlug,
      },
      {
        onSuccess: async ({ data, message }) => {
          toast.success(message);
          queryClient.invalidateQueries({ queryKey: ["card_list"] });
          setIsOpen(false);
        },
        onError: (error) => {
          if (typeof error?.message === "string") {
            toast.error(error.message);
            return;
          }
          Object.entries(error?.message).forEach(([key, message]) => {
            toast.error(`${message}`);
          });
        },
      }
    );
  };

  return (
    <div className="">
      <AccountDialogLayout
        title={`Update Payment Method`}
        isModifiedBtn={false}
        btnText={`Update`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="bg-[#1F1F1F] sm:h-[250px] h-[200px] w-full relative rounded-md overflow-hidden">
            <Image src={AtmCardImage1} fill alt="Atm-Card-Image" sizes="100%" />
            <div className="absolute top-5 left-2">
              <Image
                src={AtmCardImage2}
                width={62}
                height={37}
                alt="atmCardimage2"
              />
            </div>
            <div className="absolute bottom-5 sm:right-10 right-5">
              <span className="font-medium text-sm">
                {expMonth}/{expYear}
              </span>
            </div>
            <div className="absolute bottom-2 left-5 flex flex-col gap-2">
              <span className="font-medium text-sm">{holderName}</span>
              <h3 className="font-semibold text-lg">
                **** **** **** {activeCreditCard}
              </h3>
            </div>
          </div>
          <Formik
            initialValues={{
              name: holderName || "",
              card_year: expYear || "",
              card_month: expMonth || "",
            }}
            validationSchema={updateCardSchema}
            onSubmit={submitHandler}
          >
            <Form className="flex flex-col gap-10 pb-4 pt-2">
              <div className="w-full">
                <Input name={"name"} placeholder={`Account Holder Name`} />
              </div>
              <div className="w-full flex items-center gap-2 sm:flex-nowrap flex-wrap">
                <div className="md:w-[50%] w-full">
                  <Input
                    name={"card_year"}
                    placeholder={`Year`}
                    maxLength={4}
                  />
                </div>
                <div className="md:w-[50%] w-full">
                  <Input
                    name={"card_month"}
                    placeholder={`Month`}
                    maxLength={2}
                  />
                </div>
              </div>
              <Button
                disabled={isPending}
                type={"submit"}
                className={`!py-6 px-10 disabled:opacity-80 disabled:pointer-events-none`}
              >
                {isPending && <Spinner />}
                Save Changes
              </Button>
            </Form>
          </Formik>
        </div>
      </AccountDialogLayout>
    </div>
  );
};

export default UpdatePaymentCard;
