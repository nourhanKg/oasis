import Filter from '../../components/Filter';

function DashboardFilter() {
  return (
    <Filter
      filteredField='date'
      options={["last-7-days", "last-30-days", "last-90-days"]}
    />
  );
}

export default DashboardFilter;
