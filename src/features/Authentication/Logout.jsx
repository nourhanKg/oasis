import { HiArrowRightOnRectangle } from "react-icons/hi2";

import useLogout from "./useLogout";
import ButtonIcon from "../../components/ButtonIcon";
import SpinnerMini from "../../components/SpinnerMini";

export default function Logout() {
    const {logout, isLoginingOut} = useLogout();

  return (
    <ButtonIcon onClick={() => logout()}>
        {isLoginingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  )
}
