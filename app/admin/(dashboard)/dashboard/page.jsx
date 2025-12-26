import DashboardDataComp from "./@dashboard-data/page";
import LineChartComp from "./@line-chart/page";
import MultiLineChart from "./@multi-line-chart/page";

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full justify-between pt-22 pb-4 px-6">
      <div className="min-h-[210px]">
        <DashboardDataComp />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[270px]">
        <LineChartComp />
      </div>
      <div className="min-h-[300px]">
        <MultiLineChart />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
