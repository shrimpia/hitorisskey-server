import { Component } from "solid-js";

import { useTitle } from "../../hooks/use-title";
import { $t } from "../../text";

const SettingsAccount: Component = () => {
  useTitle([{
    label: $t.settings,
    link: '/settings',
  }, $t.$settings.account]);

  return (
    <p>wip</p>
  );
};

export default SettingsAccount;
