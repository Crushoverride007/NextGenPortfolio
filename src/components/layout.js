import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              {/* Lives with its target rather than above the loader branch:
                  while the loader is up there is no #content to skip to, and a
                  skip link pointing at nothing is exactly what Lighthouse
                  flags. */}
              <a className="skip-to-content" href="#content">
                Skip to Content
              </a>

              <Nav isHome={isHome} />
              <Social isHome={isHome} />
              <Email isHome={isHome} />

              {/* tabIndex makes this a valid target for the skip link above:
                  without it the link scrolls the page but keyboard focus stays
                  behind, which is what Lighthouse flags as an unfocusable skip
                  link. -1 keeps it out of the normal tab order. */}
              <div id="content" tabIndex={-1}>
                {children}
                <Footer />
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
