import SectionLayout from "../../layout/SectionLayout";

const TopTenContentSection = ({ data = [], isLoading }) => {
  return (
    <section>
      <SectionLayout
        data={data}
        secTitle={"Top 10 Content"}
        isLoading={isLoading}
      />
    </section>
  );
};

export default TopTenContentSection;
