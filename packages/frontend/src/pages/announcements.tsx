import { Component } from "solid-js";

import { useTitle } from "../hooks/use-title";
import { $t } from "../text";

const Announcements: Component = () => {
  useTitle($t.announcements);

  return (
    <p>TBD</p>
  );
};

export default Announcements;
