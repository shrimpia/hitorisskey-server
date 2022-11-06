import { Component } from "solid-js";

import { useTitle } from "../../hooks/use-title";
import { $t } from "../../text";

const AdminReports: Component = () => {
  useTitle($t.$settings.$admin.reports);

  return (
    <p>{$t.underDevelopment}</p>
  );
};

export default AdminReports;
