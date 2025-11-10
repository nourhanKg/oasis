import React from 'react'
import Modal from '../../../components/Modal'
import CreateCabinForm from './CreateCabinForm'
import { useNavigate } from 'react-router'
export default function AddCabin() {
    const navigate = useNavigate();
  return (
    <Modal defaultOpen={"cabin-form"}>
        {/* <Modal.Open opens="cabin-form">
            <Button>Add new cabin</Button>
        </Modal.Open> */}
        <Modal.Window allowClose={false} name="cabin-form" onClose={() => navigate("/cabins")}>
            <CreateCabinForm type='modal'/>
        </Modal.Window>
    </Modal>
  )
}
