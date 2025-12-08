import { useEffect, useState } from "react";
import styled from "styled-components";

import BookingDataBox from "../../Booking/View/BookingDataBox";
import Row from "../../../components/Row";
import Heading from "../../../components/Headings";
import ButtonGroup from "../../../components/ButtonGroup";
import Button from "../../../components/Button";
import ButtonText from "../../../components/ButtonText";
import Spinner from "../../../components/Spinner";
import Checkbox from "../../../components/Checkbox";

import { useMoveBack } from "../../../hooks/useMoveBack";
import useBooking from "../../../hooks/useBooking";
import useCheckin from "../../../hooks/useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPayment, setConfirmPayment] = useState(false);

  const {booking ={}, isPending, error
  } = useBooking();

  useEffect(() => {
    setConfirmPayment(booking?.["has_paid"]);
  }, [booking?.["has_paid"]]);

  const {checkIn, isCheckingIn} = useCheckin();
  if (isPending) return <Spinner />;

  const {
    id: bookingId = undefined,
    status,
    total_price: totalPrice,
    num_of_guests: numGuests,
    has_breakfast: hasBreakfast,
    num_of_nights: numNights,
  } = booking;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} type="checkin"/>
      <Box>
        <Checkbox disabled={booking?.["has_paid"] || isCheckingIn} checked={confirmPayment} onChange={(e) => setConfirmPayment(e.target.checked)}>Confirm guest paid.</Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPayment} onClick={() => checkIn(bookingId)}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
