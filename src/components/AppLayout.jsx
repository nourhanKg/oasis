import { Outlet } from 'react-router'
import styled from 'styled-components'
import SideBar from './SideBar'
import Header from './Header'
const Main = styled.main`
    background-color: var(--color-brand-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow-y: scroll;
`
const StyledAppLayout = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
`
const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
`
export default function AppLayout() {
  return (
    <StyledAppLayout>
        <Header />
        <SideBar/>
        <Main>
            <Container>
              <Outlet />
            </Container>
        </Main>
    </StyledAppLayout>
  )
}
