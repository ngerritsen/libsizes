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
      <span className="footer__github-icon octicon octicon-mark-github" /> View
      on Github
    </a>

    <p className="footer-text">
      {String.fromCharCode(169)} Niels Gerritsen 2016 - version {version}
    </p>
  </div>
);

export default Footer;
