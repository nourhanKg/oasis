import {useSearchParams} from "react-router"

import {useCabins} from "../../../hooks/useCabins"
import CabinRow from "./CabinRow";
import Spinner from "../../../components/Spinner";
import Table  from "../../../components/Table";
import Menus from "../../../components/Menus";
export default function CabinTable() {
  // code splitting
  const {isPending, cabins, cabinsError} = useCabins()
  const [searchParams] = useSearchParams();
  const discountFilter = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "regular_price-asc";
  // 1) filtering
  let filteredCabins = cabins;
  switch(discountFilter) {
    case "with-discount":
      filteredCabins = cabins.filter(cabin => cabin.discount > 0);
      break;
    case "no-discount":
      filteredCabins = cabins.filter(cabin => cabin.discount === 0);
      break;
    default:
    break;
  }
  // 2) sorting
  let sortedCabins = filteredCabins;
  const [field, direction] = sortBy.split("-");
  sortedCabins = filteredCabins.sort((a,b) => a[field] - b[field]);
  if(direction === "desc") {
    sortedCabins = filteredCabins.reverse();
  }
  if(isPending) return <Spinner />
  if(!cabinsError) return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}/>
      </Table>
    </Menus>
  )
}