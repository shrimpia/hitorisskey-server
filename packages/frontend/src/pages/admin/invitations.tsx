import { Component } from "solid-js";

import { useTitle } from "../../hooks/use-title";
import { $t } from "../../text";

const AdminInvitations: Component = () => {
  useTitle($t.$settings.$admin.invitations);

  return (
    <p>{$t.underDevelopment}</p>
  );
};

export default AdminInvitations;
