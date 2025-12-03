import Headings from "../components/Headings";
import Row from "../components/Row";
import BookingTable from "../features/Booking/View/BookingTable";

function Bookings() {
  return (
    <>
      <Row>
        <Headings as="h1">All bookings</Headings>
      </Row>
      <Row>
        <BookingTable/>
      </Row>
    </>
  );
}

export default Bookings;
