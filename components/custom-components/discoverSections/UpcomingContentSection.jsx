import SectionLayout from "../../layout/SectionLayout";

const UpcomingContentSection = ({ data = [], isLoading }) => {
  return (
    <section className="">
      <SectionLayout
        secTitle={"Upcoming Content"}
        data={data}
        isLoading={isLoading}
      />
    </section>
  );
};

export default UpcomingContentSection;
