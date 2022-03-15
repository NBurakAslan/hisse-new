import React, { Component } from "react";

import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="">
        <div className="">
          <Link to="/">hisselerim</Link>
          <Link to="/oneri">hisse öneri</Link>
          <Link to="/card">hisse ayrıntı</Link>
        </div>
      </header>
    );
  }
}

export default Navbar;
