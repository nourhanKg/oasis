import { useNavigate } from "react-router";
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Spinner from "../../../components/Spinner";
import Row from "../../../components/Row";
import Heading from "../../../components/Headings";
import Tag from "../../../components/Tag";
import ButtonGroup from "../../../components/ButtonGroup";
import Button from "../../../components/Button";
import ButtonText from "../../../components/ButtonText";
import Modal from "../../../components/Modal"
import ConfirmDelete from "../../../components/ConfirmDeletion";

import { useMoveBack } from "../../../hooks/useMoveBack";
import useBooking from "../../../hooks/useBooking";
import useCheckout from "../../../hooks/useCheckout";
import {useDeleteBooking} from "../../../hooks/useDeleteBooking";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  
  const {booking, isPending} = useBooking();
  const {checkOut, isCheckingOut} = useCheckout();
  const {deleteBookingById, isDeleting} = useDeleteBooking();
  const status = booking?.status;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if(isPending) return (<Spinner />)
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {
          status === "unconfirmed" && (
            <Button variation="secondary" onClick={() => navigate(`/checkin/${booking?.id}`)}>
              Check In Booking #{booking?.id}
            </Button>
          )
        }
        {
          status === "checked-in" && (
            <Button variation="secondary" disabled={isCheckingOut} onClick={() => checkOut(booking?.id)}>
              Check Out Booking #{booking?.id}
            </Button>
          )
        }
        <Modal>
          <Modal.Open opens="delete">
            <Button variant="danger">
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete disabled={isDeleting} resourceName={booking?.id} onConfirm={() => deleteBookingById(booking?.id, {
              onSettled: () => navigate(-1),
            })} />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
