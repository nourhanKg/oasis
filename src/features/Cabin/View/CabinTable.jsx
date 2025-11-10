import {useCabins} from "../../../hooks/useCabins"
import CabinRow from "./CabinRow";
import Spinner from "../../../components/Spinner";
import Table  from "../../../components/Table";
import Menus from "../../../components/Menus";
export default function CabinTable() {
  // code splitting
  const {isPending, cabins, cabinsError} = useCabins()
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
        <Table.Body data={cabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}/>
      </Table>
    </Menus>
  )
}