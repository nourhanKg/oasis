import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../../../services/apiBookings";

import BookingRow from "./BookingRow";
import Table from "../../../components/Table";
import Menus from "../../../components/Menus";
import Spinner from "../../../components/Spinner";
import Empty from "../../../components/Empty";

function BookingTable() {
  const {data: bookings = [], isPending, error} = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
    staleTime: 0
  })
  console.log(isPending)

  if(isPending) return <Spinner />
  if(!bookings.length) return <Empty resourceName="bookings" />
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
