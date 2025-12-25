import styled from "styled-components";

import Tag from "../../../components/Tag";
import {Flag} from "../../../components/Flag";
import Button from "../../../components/Button";
import CheckoutButton from "../../../components/CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({activity}) {
  const {id, status, guests, num_of_nights} = activity
  return (
    <StyledTodayItem>
      {status === "unconfirmed" ? <Tag type="blue">Arriving</Tag> : <Tag type="green">Departing</Tag>}
      <Flag src={guests.country_flag} alt={`Flag of ${guests.full_name}`} />
      <Guest>{guests.full_name}</Guest>
      <div>{num_of_nights} nights</div>
      { status === "unconfirmed" && <Button variant="primary" to={`/checkin/${id}`} size="small">Check in</Button> }
      { status === "checked-in" && <CheckoutButton bookingId={id} /> }
    </StyledTodayItem>
  )
}
