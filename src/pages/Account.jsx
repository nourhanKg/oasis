import Headings from "../components/Headings";
import Row from "../components/Row";

function Account() {
  return (
    <>
      <Headings as="h1">Update your account</Headings>

      <Row>
        <Headings as="h3">Update user data</Headings>
        <p>Update user data form</p>
      </Row>

      <Row>
        <Headings as="h3">Update password</Headings>
        <p>Update user password form</p>
      </Row>
    </>
  );
}

export default Account;
