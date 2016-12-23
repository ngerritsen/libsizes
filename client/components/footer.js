import React from 'react'

import '../styles/footer.scss'

function Footer() {
  return (
    <div className="footer">
      <a
        className="footer__github-link"
        href="https://github.com/ngerritsen/libsizes"
        target="_blank"
        title="Check out the Github repository"
      >
        <span className="footer__github-icon octicon octicon-mark-github"/> View on Github
      </a>

      <p className="footer-text">
        {String.fromCharCode(169)} Niels Gerritsen 2016
      </p>
    </div>
  )
}

export default Footer
