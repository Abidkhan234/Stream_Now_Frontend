import DiscoveryPageContent from "@/components/admin/components/mini-comps/discovery-page-comps";
import DashBoardPageLayout from "@/components/admin/layout/page-layout";

const DiscoveryManagementPage = () => {
  return (
    <DashBoardPageLayout
      pageTitle="Content Discovery Management"
      isAddBtnShow={false}
      noPagination={true}
    >
      <DiscoveryPageContent />
    </DashBoardPageLayout>
  );
};

export default DiscoveryManagementPage;
