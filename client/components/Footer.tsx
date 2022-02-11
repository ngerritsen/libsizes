import React from "react";
import { version } from "../../package.json";

import "../styles/footer.scss";

const Footer = (): JSX.Element => (
  <div className="footer">
    <a
      className="footer__github-link"
      href="https://github.com/ngerritsen/libsizes"
      target="_blank"
      rel="noreferrer"
      title="Check out the Github repository"
    >
      <i className="fa-brands fa-gitlab" /> &nbsp; View on GitLab
    </a>

    <p className="footer-text">
      {String.fromCharCode(169)} Niels Gerritsen 2016 - version {version}
    </p>
  </div>
);

export default Footer;
