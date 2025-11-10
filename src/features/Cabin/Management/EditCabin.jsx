import React from 'react'
import Modal from '../../../components/Modal'
import CreateCabinForm from './CreateCabinForm'
import { useNavigate } from 'react-router'
export default function EditCabin() {
    const navigate = useNavigate();
  return (
    <Modal defaultOpen={"cabin-form"}>
        <Modal.Window allowClose={false} name="cabin-form" onClose={() => navigate("/cabins")}>
            <CreateCabinForm type='modal' isEditMode={true}/>
        </Modal.Window>
    </Modal>
  )
}
