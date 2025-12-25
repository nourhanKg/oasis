import Headings from "../components/Headings";
import Row from "../components/Row";
import DashboardFilter from "../features/Dashboard/DashboardFilter";
import DashboardLayout from "../features/Dashboard/DashboardLayout";


function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Headings as="h1">Dashboard</Headings>
        <DashboardFilter  />
      </Row>
      <Row>
        <DashboardLayout />
      </Row>
    </>
  );
}

export default Dashboard;
