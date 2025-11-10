import React from 'react'
import styled from 'styled-components'

import MainNav from './MainNav'
import Logo from './Logo'
const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`
export default function SideBar() {
  return (
    <StyledSidebar>
        <Logo/>
        <MainNav />
    </StyledSidebar>
  )
}
