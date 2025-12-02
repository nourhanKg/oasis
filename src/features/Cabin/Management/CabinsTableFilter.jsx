import TableOperations from '../../../components/TableOperations'
import Filter from '../../../components/Filter'
import SortBy from '../../../components/SortBy'
export default function CabinsTableFilter() {
  return (
    <TableOperations>
        <Filter 
            filteredField="discount"
            options={["all", "no-discount", "with-discount"]}
        />
        <SortBy options={
        [
            {value: "regular_price-asc", label: "Price (Low to High)"},
            {value: "regular_price-desc", label: "Price (High to Low)"},
            {value: "max_capacity-asc", label: "Capacity (Low to High)"},
            {value: "max_capacity-desc", label: "Capacity (High to Low)"},
        ]}/>
    </TableOperations>
  )
}
