import { useNavigate } from "react-router";
import styled from "styled-components";
import { format, isToday } from "date-fns";
import { HiEye, HiPencil, HiArrowCircleUp, HiTrash } from "react-icons/hi";

import { formatCurrency } from "../../../utils/helpers";
import { formatDistanceFromNow } from "../../../utils/helpers";
import useCheckout from "../../../hooks/useCheckout";
import {useDeleteBooking} from "../../../hooks/useDeleteBooking";

import Tag from "../../../components/Tag";
import Table from "../../../components/Table";
import Menus from "../../../components/Menus";
import Modal from "../../../components/Modal";
import ConfirmDelete from "../../../components/ConfirmDeletion";
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    start_date: startDate,
    end_date: endDate,
    num_of_nights: numNights,
    num_of_guests: numGuests,
    total_price:totalPrice,
    status,
    guests: { full_name: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();

  const {checkOut, isCheckingOut} = useCheckout();
  const {deleteBookingById, isDeleting} = useDeleteBooking();
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button onClick={() => navigate(`/bookings/${bookingId}`)}><HiEye /> See Details</Menus.Button>
            {
              status === "unconfirmed" &&
              <Menus.Button onClick={() => navigate(`/checkin/${bookingId}`)}><HiPencil /> Check In</Menus.Button>
            }
            {
              status === "checked-in" &&
              <Menus.Button disabled={isCheckingOut} onClick={() => checkOut(bookingId)}><HiArrowCircleUp /> Check Out</Menus.Button>
            }
            <Modal.Open opens="delete">
              <Menus.Button><HiTrash /> Delete Booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete resourceName={guestName} disabled={isDeleting} onConfirm={() => deleteBookingById(bookingId)} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
