import { useSearchParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../../services/apiBookings";

import { PAGE_SIZE } from "../../../utils/constants";
import BookingRow from "./BookingRow";
import Table from "../../../components/Table";
import Menus from "../../../components/Menus";
import Spinner from "../../../components/Spinner";
import Empty from "../../../components/Empty";
import Pagination from "../../../components/Pagination";

function BookingTable() {
  const [searchParams] = useSearchParams();
  //1) filtering
  const status = searchParams.get("status") || "all";
  const filter = (status === "all" || !status) ? null : {field: "status", value: status}
  //2) sorting
  const sortBy = searchParams.get("sortBy") || "start_date-asc";
  const [field, direction] = sortBy.split("-");
  //3) pagination
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  //Query
  const {data, isPending, error} = useQuery({
    queryKey: ['bookings', filter, field, direction, page],
    queryFn: () => getBookings( filter, {field: field, direction: direction}, page),
    staleTime: 0
  })
  // console.log(isPending)
  //Pre-fetching
  const numOfPages = Math.ceil(data?.count / PAGE_SIZE);
  const queryClient = useQueryClient();
  if(page < numOfPages ) {
    console.log("getting next page")
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, field, direction, page + 1],
      queryFn: () => getBookings( filter, {field: field, direction: direction}, page + 1),
    })
  }
  if(page > 1 ) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, field, direction, page - 1],
      queryFn: () => getBookings( filter, {field: field, direction: direction}, page - 1),
    })
  }
  if(isPending) return <Spinner />
  if(!data?.data?.length) return <Empty resourceName="bookings" />
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
          data={data?.data || []}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination 
            totalCount={data?.count || 0}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
