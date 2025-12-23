import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { HiOutlineUser } from 'react-icons/hi2'

import ButtonIcon from './ButtonIcon'
import Logout from '../features/Authentication/Logout'
import DrakModeToggle from './DrakModeToggle'


const StyledHeaderMenu = styled.ul`
    list-style: none;
    display: flex;
    gap: .4rem;
`
export default function HeaderMenu() {
    const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
        <li>
            <ButtonIcon onClick={() => navigate('/account')}>
                <HiOutlineUser />
            </ButtonIcon>
        </li>
        <li>
            <Logout/>
        </li>
        <li>
            <DrakModeToggle/>
        </li>
    </StyledHeaderMenu>
  )
}
