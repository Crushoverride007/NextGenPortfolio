import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/*
 * The unified canvas every featured cover renders into.
 *
 * Each cover is authored on a fixed 1400x875 stage, so text sizes and
 * positions are absolute and predictable. The frame keeps that aspect ratio
 * at any width and scales the stage down to fit, which is what lets a static
 * PNG and an interactive component sit in the same slot and look identical.
 */
export const STAGE_W = 1400;
export const STAGE_H = 875;

const StyledFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${STAGE_W} / ${STAGE_H};
  overflow: hidden;
  border-radius: var(--border-radius);
  background: var(--navy);
`;

const StyledStage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${STAGE_W}px;
  height: ${STAGE_H}px;
  transform-origin: 0 0;
  overflow: hidden;
  background: var(--navy);
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  user-select: none;

  /* Shared vocabulary the covers use for syntax colouring. */
  .g { color: var(--green); }
  .w { color: var(--lightest-slate); }
  .m { color: var(--slate); }

  .glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(ellipse 60% 50% at 40% 55%, rgba(100, 255, 218, 0.08), transparent 70%);
  }

  .hd {
    position: absolute;
    top: 52px;
    left: 64px;
    display: flex;
    gap: 16px;
    align-items: baseline;

    .n { color: var(--green); font-size: 20px; }
    .t { font-size: 34px; font-weight: 600; letter-spacing: -0.01em; }
  }

  .sub {
    position: absolute;
    top: 62px;
    right: 64px;
    color: var(--slate);
    font-size: 16px;
  }

  .ft-l {
    position: absolute;
    bottom: 40px;
    left: 64px;
    color: var(--green);
    font-size: 14px;
    letter-spacing: 0.15em;
  }

  .ft-r {
    position: absolute;
    bottom: 40px;
    right: 64px;
    color: var(--slate);
    font-size: 14px;
  }

  /* Stage cards are real buttons so they work from the keyboard too. */
  .card {
    appearance: none;
    cursor: pointer;
    border: 1px solid var(--lightest-navy);
    background: var(--light-navy);
    color: inherit;
    font: inherit;
    text-align: left;
    transition: all 0.25s;
    box-sizing: border-box;

    &:focus-visible {
      outline: 2px solid var(--green);
      outline-offset: 2px;
    }

    .lb {
      font-size: 13px;
      letter-spacing: 0.2em;
      color: var(--slate);
    }

    &.active {
      border-color: var(--green);
      background: var(--navy);
      box-shadow: 0 0 40px rgba(100, 255, 218, 0.13);

      .lb { color: var(--green); }
    }
  }
`;

const CoverFrame = ({ children, label }) => {
  const frameRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) {
      return undefined;
    }

    const fit = () => {
      stage.style.transform = `scale(${frame.clientWidth / STAGE_W})`;
    };

    fit();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', fit);
      return () => window.removeEventListener('resize', fit);
    }

    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <StyledFrame ref={frameRef} role="img" aria-label={label}>
      <StyledStage ref={stageRef}>{children}</StyledStage>
    </StyledFrame>
  );
};

CoverFrame.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default CoverFrame;
