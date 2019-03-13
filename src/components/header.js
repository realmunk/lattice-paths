import React, { Fragment } from "react";

import Logo from "./logo.svg";

export const Header = () => {
  return (
    <Fragment>
      <img src={Logo} alt="Logo" className="logo" />
      <h3>Visualisering med React og Redux</h3>
    </Fragment>
  );
};
