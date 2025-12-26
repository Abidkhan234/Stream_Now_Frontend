const AccountLayout = ({
  id,
  title = "",
  para = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  children,
}) => {
  return (
    <section className="flex flex-col gap-4" id={id}>
      <div className="flex flex-col gap-1 text-white">
        <h1 className="sm:text-4xl text-3xl font-bold">{title}</h1>
        <p className="text-sm opacity-70">{para}</p>
      </div>

      <div className="py-3 sm:px-5 px-3 bg-[#181818] rounded-3xl text-white">
        {children}
      </div>
    </section>
  );
};

export default AccountLayout;
