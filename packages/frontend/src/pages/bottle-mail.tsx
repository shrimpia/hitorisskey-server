import { Component } from "solid-js";

import { useTitle } from "../hooks/use-title";
import { $t } from "../text";

const BottleMail: Component = () => {
  useTitle($t.bottleMail);

  return (
    <p>TBD</p>
  );
};

export default BottleMail;
