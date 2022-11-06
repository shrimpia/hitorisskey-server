import { Component } from "solid-js";

import { useTitle } from "../../hooks/use-title";
import { $t } from "../../text";

const AdminPunishees: Component = () => {
  useTitle($t.$settings.$admin.punishees);

  return (
    <p>{$t.underDevelopment}</p>
  );
};

export default AdminPunishees;
