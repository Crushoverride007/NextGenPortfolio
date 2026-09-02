import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .loader-inner {
    ${({ theme }) => theme.mixins.flexCenter};
  }

  .logo-wrapper {
    /* The name is positioned against this, so the mark itself stays on the
       page's centre line however long the name is. Laying them out as flex
       siblings would centre the pair and push the mark to the left. */
    position: relative;
    flex: 0 0 auto;
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #M {
        opacity: 0;
        transform-box: fill-box;
        transform-origin: center;
      }
    }
  }

  .loader-name {
    position: absolute;
    left: calc(100% + 24px);
    /* Centred by stretching the box and using flex, not a transform - anime
       animates translateX here, and a transform would be overwritten. */
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 0.5ch;

    /* Hidden until anime brings it in, after the mark has finished drawing. */
    opacity: 0;
    white-space: nowrap;
    font-family: var(--font-mono);
    font-size: var(--fz-xxl);
    user-select: none;

    .first {
      color: var(--lightest-slate);
    }

    .last {
      color: var(--green);
      letter-spacing: 0.08em;
    }
  }

  @media (max-width: 768px) {
    .loader-name {
      left: calc(100% + 16px);
      font-size: var(--fz-lg);
    }
  }

  @media (max-width: 480px) {
    .loader-name {
      left: calc(100% + 12px);
      font-size: var(--fz-sm);
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '#logo #hex',
        delay: 300,
        duration: 1500,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #M',
        duration: 700,
        easing: 'easeInOutQuart',
        opacity: 1,
        scale: [0.6, 1],
      })
      // The name arrives once the mark is complete, sliding out from behind it.
      .add({
        targets: '.loader-name',
        duration: 600,
        easing: 'easeOutQuart',
        opacity: [0, 1],
        translateX: [-12, 0],
      })
      // Mark and name leave together, so the lockup reads as one object.
      .add({
        targets: '.loader-inner',
        delay: 600,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="loader-inner">
        <div className="logo-wrapper">
          <IconLoader />

          <div className="loader-name">
            <span className="first">Mouhcine</span>
            <span className="last">MESMOUKI</span>
          </div>
        </div>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
