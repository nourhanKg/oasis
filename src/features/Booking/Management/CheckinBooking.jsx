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
import {useSettings} from "../../../hooks/useSettings";
import {formatCurrency} from "../../../utils/helpers";

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
  const [addBreakfast, setAddBreakfast] = useState(false);

  const {booking ={}, isPending, error
  } = useBooking();
  const {settings} = useSettings();
  const {checkIn, isCheckingIn} = useCheckin();
  useEffect(() => {
    setConfirmPayment(booking?.["has_paid"]);
  }, [booking?.["has_paid"]]);

  if (isPending) return <Spinner />;

  const {
    id: bookingId = undefined,
    total_price: totalPrice,
    num_of_guests: numGuests = 0,
    num_of_nights: numNights = 0,
  } = booking;
  const breakfastPrice = (settings?.breakfast_price || 0) * numNights * numGuests
  const newTotal = addBreakfast ? totalPrice + breakfastPrice : totalPrice;
  const handleCheckin = () => {
    if(addBreakfast) checkIn({bookingId, breakfast: {extras_price: breakfastPrice, has_breakfast: true, total_price: newTotal}});
    else checkIn({bookingId, breakfast: {}});
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={{...booking, total_price: newTotal}} type="checkin"/>
      {
        !booking?.["has_breakfast"] &&
        <Box>
          <Checkbox disabled={isCheckingIn} checked={addBreakfast} onChange={(e) => setAddBreakfast(e.target.checked)}>Add Breakfast for {formatCurrency(breakfastPrice)}.</Checkbox>
        </Box>
      }
      <Box>
        <Checkbox disabled={booking?.["has_paid"] || isCheckingIn} checked={confirmPayment} onChange={(e) => setConfirmPayment(e.target.checked)}>Confirm guest paid.</Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPayment} onClick={() => handleCheckin()}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
