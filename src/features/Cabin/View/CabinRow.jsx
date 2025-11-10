import styled from "styled-components";
import { useNavigate } from "react-router";

import {formatCurrency} from "../../../utils/helpers";
import { useDeleteCabin } from "../../../hooks/useDeleteCabin";

import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import ConfirmDeletion from "../../../components/ConfirmDeletion";
import Menus from "../../../components/Menus";
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Emphasis = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  font-style: italic;
  color: var(--color-brand-500);
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
export default function CabinRow({ cabin }) {
  const { deleteCabinById, isDeleting } = useDeleteCabin();
  const navigate = useNavigate();
  return (
    <Table.Row>
      <Img src={cabin['image']} />
      <Cabin>{cabin["name"]}</Cabin>
      <Cabin>Fits up to <Emphasis>{cabin["max_capacity"]}</Emphasis> guests</Cabin>
      <Price>{formatCurrency(cabin["regular_price"])}</Price>
      <Discount>{formatCurrency(cabin["discount"])}</Discount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabin["id"]}/>
          <Menus.List id={cabin["id"]}>
            <Menus.Button onClick={() => navigate(`edit/${cabin["id"]}`, {state: {cabin}})}>
              Edit
            </Menus.Button>
            <Modal.Open opens="delete-confirm">
              <Menus.Button>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="delete-confirm">
            <ConfirmDeletion resourceName={cabin["name"]} disabled={isDeleting} onConfirm={() => deleteCabinById(cabin["id"])} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  )
}
