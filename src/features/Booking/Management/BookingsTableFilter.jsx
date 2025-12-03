import TableOperations from '../../../components/TableOperations'
import Filter from '../../../components/Filter'
import SortBy from '../../../components/SortBy'
export default function BookingsTableFilter() {
  return (
    <TableOperations>
        <Filter 
            filteredField="status"
            options={["all", "checked-in", "checked-out", "unconfirmed"]}
        />
        <SortBy options={
        [
            {value: "total_price-asc", label: "Price (Low to High)"},
            {value: "total_price-desc", label: "Price (High to Low)"},
            {value: "start_date-asc", label: "Start Date (earlier first)"},
            {value: "start_date-desc", label: "Start Date (later first)"},
        ]}/>
    </TableOperations>
  )
}
