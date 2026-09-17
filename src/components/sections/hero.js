import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  /* Phones matched neither arm of the query above - they are tall, and wider
     than 360px - so the section kept a fixed 100vh with no clearance for the
     fixed nav. Content taller than the viewport then overflowed in both
     directions and the first line sat underneath the header. Let the section
     grow instead, and reserve the nav's height. */
  @media (max-width: 768px) {
    /* No min-height here. Reserving a full screen leaves a screenful of empty
       space below the button whenever the content is shorter, which reads as
       the page having failed to load rather than as breathing room. */
    height: auto;
    min-height: auto;
    /* The nav is 100px and carries a blur and shadow past its own box, so
       padding equal to its height left the first line sitting under that
       haze. Clear it properly. */
    padding-top: calc(var(--nav-height) + 40px);
    padding-bottom: 60px;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  /* These used to mount only after navDelay, so the hero stood empty for a
     second and then grew, pushing every section below it down ~590px on a
     phone - the whole of the page's 0.46 layout shift. They are always in the
     layout now; only opacity and transform animate, which never reflows. */
  .hero-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }

  .hero-item.is-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Mouhcine MESMOUKI</h2>;
  const three = <h3 className="big-heading">A Cyber Security Researcher.</h3>;
  const four = (
    <>
      <p>
        I'm a Cloud Security Engineer at{' '}
        <a href="https://jaas.ma/" target="_blank" rel="noreferrer">
          Jaas
        </a>
        , working across Azure identity, Zero Trust and DevSecOps. Alongside that I founded
        Kortlabs, where I build{' '}
        <a href="https://kliper.dev/" target="_blank" rel="noreferrer">
          Kliper
        </a>
        {' '}&mdash; a PCI DSS v4.0.1 platform that QSA firms use to run assessments and produce
        the Report on Compliance, taken from zero to production in ten months.
      </p>
      <br></br>
    </>
  );

  const five = (
    <a
      className="email-link"
      href="#contact">
      Get in touch!
    </a>
  );


  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <>
          {items.map((item, i) => (
            <div
              key={i}
              className={`hero-item${isMounted ? ' is-in' : ''}`}
              style={{ transitionDelay: `${i + 1}00ms` }}>
              {item}
            </div>
          ))}
        </>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
