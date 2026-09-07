import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

import CalibreRegularWoff2 from '@fonts/Calibre/Calibre-Regular.woff2';
import CalibreMediumWoff2 from '@fonts/Calibre/Calibre-Medium.woff2';
import CalibreSemiboldWoff2 from '@fonts/Calibre/Calibre-Semibold.woff2';
import SFMonoRegularWoff2 from '@fonts/SFMono/SFMono-Regular.woff2';

// https://www.gatsbyjs.com/docs/add-seo-component/

/* The @font-face rules live in the styled-components global style, so the
   browser only discovers the fonts once React has rendered. On the home page
   that is after the loader finishes, about six seconds in, and the fonts then
   swapped in under already-painted text and shifted the whole page (CLS 0.5 on
   a phone). Preloading them in the document head starts the downloads with the
   scripts instead, so they are ready before any content paints. */
const PRELOADED_FONTS = [
  CalibreRegularWoff2,
  CalibreMediumWoff2,
  CalibreSemiboldWoff2,
  SFMonoRegularWoff2,
];

const Head = ({ title, description, image }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `,
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />

      {PRELOADED_FONTS.map(href => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
};
