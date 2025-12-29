import SectionLayout from "../../layout/SectionLayout";

const ContinueWatchingSection = ({ data = [], isLoading, emptyTitle }) => {
  return (
    <div className="py-10">
      <SectionLayout
        secTitle={"Continue watching"}
        data={data}
        isLoading={isLoading}
        emptyTitle={emptyTitle}
      />
    </div>
  );
};

export default ContinueWatchingSection;
