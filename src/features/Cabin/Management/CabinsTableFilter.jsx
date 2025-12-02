import TableOperations from '../../../components/TableOperations'
import Filter from '../../../components/Filter'
export default function CabinsTableFilter() {
  return (
    <TableOperations>
        <Filter 
            filteredField="discount"
            options={["all", "no-discount", "with-discount"]}
        />
    </TableOperations>
  )
}
