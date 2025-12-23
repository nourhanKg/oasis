import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"

import { useDarkMode } from "../context/DarkModeContext"
import ButtonIcon from "./ButtonIcon"


export default function DrakModeToggle() {
    const {darkMode, toggleDarkMode} = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
        {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  )
}