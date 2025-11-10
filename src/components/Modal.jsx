import { cloneElement, createContext, useContext, useEffect, useState, useRef } from "react";
import {createPortal} from "react-dom";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ButtonModal = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

export default function Modal({children, defaultOpen = ""}) {
  const [openName, setOpenName] = useState(defaultOpen);
  const close = () => setOpenName("");
  const open = setOpenName;
  return <ModalContext.Provider value={{openName, close, open}}>{children}</ModalContext.Provider>
}

function Open({children, opens: windowName}) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {onClick: () => open(windowName)});
}

function Window({ children, name, onClose, allowClose = true }) {
  const { openName, close } = useContext(ModalContext);
  const modalRef = useRef()
  useEffect(() => {
    document.addEventListener("click", handleClick, true); //true for capturing
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      //close the modal if the clicked element is outside of the modal
      if (allowClose && modalRef.current && !modalRef.current.contains(e.target)) {
        close();
      }
    }
  }, [])
  if (name !== openName) return null;
  return createPortal(
      <Overlay>
        <StyledModal ref={modalRef}>
          <ButtonModal onClick={onClose ? () => onClose() : close}>
            <IoMdClose />
          </ButtonModal>
          <div>
            {cloneElement(children, { onCloseModal: close })}
          </div>
        </StyledModal>
      </Overlay>,
    document.body
  )
}

Modal.Open = Open;
Modal.Window = Window;