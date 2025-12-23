import Headings from "../components/Headings";
import SignupForm from "../features/Authentication/SignupForm";

function NewUsers() {
  return <>
    <Headings as="h1">Create a new user</Headings>
    <SignupForm/>
  </>
  ;
}

export default NewUsers;
