import SectionLayout from "../../layout/SectionLayout";

const RecommandedSection = ({ data = [], isLoading, emptyTitle }) => {
  return (
    <div>
      <SectionLayout
        data={data}
        secTitle={"Recommended"}
        isLoading={isLoading}
        emptyTitle={emptyTitle}
      />
    </div>
  );
};

export default RecommandedSection;
