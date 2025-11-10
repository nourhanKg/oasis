import Headings from "../components/Headings";
import Row from "../components/Row";
import SettingsForm from "../features/settings/SettingsForm";
function Settings() {
  return <>
    <Row>
      <Headings as="h1">Update hotel settings</Headings>
    </Row>
    <Row>
      <SettingsForm />
    </Row>
  </>;
}

export default Settings;
