import { useState } from "react";

import useUpdateUser from "./useUpdateUser";
import Button from "../../components/Button";
import FileInput from "../../components/FileInput";
import Form from "../../components/Form";
import FormControl from "../../components/FormControl";
import Input from "../../components/Input";

import  useUser  from "./useUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { full_name: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isUpdatingUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser({ fullName, avatar }, {
      onSuccess: () => {
        setAvatar(null);
        e.target.reset();
      },
    });
  }
  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
  }; 
  return (
    <Form onSubmit={handleSubmit}>
      <FormControl label="Email address">
        <Input value={email} disabled />
      </FormControl>
      <FormControl label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormControl>
      <FormControl label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormControl>
      <FormControl>
        <Button type="reset" variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update account</Button>
      </FormControl>
    </Form>
  );
}

export default UpdateUserDataForm;
