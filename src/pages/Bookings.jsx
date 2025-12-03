import Headings from "../components/Headings";
import Row from "../components/Row";
import BookingsTableFilter from "../features/Booking/Management/BookingsTableFilter";
import BookingTable from "../features/Booking/View/BookingTable";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Headings as="h1">All bookings</Headings>
        <BookingsTableFilter />
      </Row>
      <Row>
        <BookingTable/>
      </Row>
    </>
  );
}

export default Bookings;
