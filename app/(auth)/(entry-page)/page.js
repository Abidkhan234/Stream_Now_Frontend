import EntryPageEmail from "@/components/custom-components/signUpPages/EntryPageEmail";

const page =() => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center min-[425px]:px-10 px-4 relative">
      <div className="flex flex-col gap-3 items-center text-center w-full">
        <h1 className="font-bold sm:text-5xl min-[425px]:text-4xl text-3xl sm:max-w-[500px] min-[425px]:max-w-[400px]">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="font-medium sm:text-lg text-base">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <EntryPageEmail />
      </div>
    </div>
  );
};

export default page;
