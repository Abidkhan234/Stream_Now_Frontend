import SectionLayout from "../../layout/SectionLayout";

const TrendingSection = ({ data = [], isLoading, emptyTitle }) => {
  return (
    <div>
      <SectionLayout
        data={data}
        secTitle={"Trending"}
        isLoading={isLoading}
        emptyTitle={emptyTitle}
      />
    </div>
  );
};

export default TrendingSection;
