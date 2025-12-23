import Headings from "../components/Headings";
import Row from "../components/Row";
import UpdatePasswordForm from "../features/Authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/Authentication/UpdateUserDataForm";

function Account() {
  return (
    <>
      <Headings as="h1">Update your account</Headings>

      <Row>
        <Headings as="h3">Update user data</Headings>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Headings as="h3">Update password</Headings>
        <UpdatePasswordForm/>
      </Row>
    </>
  );
}

export default Account;
