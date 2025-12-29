import SectionLayout from "../../layout/SectionLayout";

const NewReleasesSection = ({ data = [], isLoading }) => {
  return (
    <section>
      <SectionLayout
        data={data}
        secTitle={"New Releases"}
        isLoading={isLoading}
      />
    </section>
  );
};

export default NewReleasesSection;
