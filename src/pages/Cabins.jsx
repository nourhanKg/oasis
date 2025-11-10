import {Routes, Route} from "react-router"

import Headings from "../components/Headings";
import Row from "../components/Row";
import CabinTable from "../features/Cabin/View/CabinTable";
import AddCabin from "../features/Cabin/Management/AddCabin";
import EditCabin from "../features/Cabin/Management/EditCabin";
import Button from "../components/Button";
function Cabins() {
  return (
    <>
      <Row>
        <Headings as="h1">All cabins</Headings>
      </Row>
      <Row type="vertical">
        <Routes>
          <Route index element={
            <>
              <Button to="new" type="link" size="large">Add Another Cabin</Button>
              <CabinTable />
            </>
          } />
          <Route path="new" element={<AddCabin />} />
          <Route path="edit/:cabinId" element={<EditCabin />} />
        </Routes>
      </Row>
    </>
  );
}

export default Cabins;
