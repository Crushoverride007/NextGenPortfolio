import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import covers from '@components/covers';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-header,
    .project-body,
    .project-footer {
      grid-column: 8 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 1 / -1;
        text-align: left;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 1080px) {
        grid-column: 1 / -1;
        grid-row: 1;
      }
    }
  }

  /* The theme laid this box over the cover. That suited a tinted photo, but
     the designed canvases carry content right to their edges, so any overlap
     hides part of the design. Cover and text now take separate columns, and
     stack below 1080px where five columns of text is too narrow. */
  /* The text column is three grid rows - header, description, footer - so
     the cover can be centred on the description alone. A single column item
     centred the cover on the whole column, which is bottom-heavy, and no fixed
     offset could correct that because description lengths differ per card. */
  .project-header,
  .project-body,
  .project-footer {
    grid-column: 1 / 6;
    z-index: 5;

    @media (max-width: 1080px) {
      grid-column: 1 / -1;
      padding-left: 30px;
      padding-right: 30px;
    }
    @media (max-width: 480px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .project-header {
    grid-row: 1;
    align-self: end;

    @media (max-width: 1080px) {
      grid-row: 2;
      padding-top: 30px;
    }
    @media (max-width: 480px) {
      padding-top: 25px;
    }
  }
  .project-body {
    position: relative;
    grid-row: 2;

    @media (max-width: 1080px) {
      grid-row: 3;
    }
  }
  .project-footer {
    grid-row: 3;
    align-self: start;

    @media (max-width: 1080px) {
      grid-row: 4;
      padding-bottom: 25px;
    }
    @media (max-width: 480px) {
      padding-bottom: 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    /* The theme used to stretch an invisible pseudo-element from this link
       over the whole card on phones, so a tap anywhere opened the project.
       That overlay sat above the cover and swallowed every tap meant for the
       interactive canvases. The link icons in the footer do that job now. */
    @media (max-width: 768px) {
      color: var(--white);
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    /* Seven columns to the cover, five to the text: the cover keeps the width
       it had when the theme overlapped them, without the overlap. */
    grid-column: 6 / -1;
    /* Row 2 is the description. If the cover is taller, the row grows to fit
       it and the description centres inside; either way the two line up. */
    grid-row: 2;
    align-self: center;
    position: relative;
    z-index: 1;

    @media (max-width: 1080px) {
      grid-column: 1 / -1;
      grid-row: 1;
      /* Full strength: it is a card above the text now, not a backdrop. */
      opacity: 1;
    }

    /* Every cover - static PNG or interactive component - renders in this
       box, so all eight share one aspect ratio, radius and shadow. The old
       navy tint and grayscale filter are gone: the covers are authored on the
       site's own palette and are meant to be seen as designed. */
    .cover-box {
      display: block;
      width: 100%;
      aspect-ratio: 1400 / 875;
      border-radius: var(--border-radius);
      overflow: hidden;
      background: var(--navy);
    }

  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              interactive
              tech
              github
              external
              cta
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Deployed & Managed
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cta, interactive } = frontmatter;
            // Every cover is a native canvas now. An unknown key renders an
            // empty box rather than crashing the whole section.
            const Cover = covers[interactive];

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-header">
                  <p className="project-overline">Featured Project</p>

                  <h3 className="project-title">
                    <a href={external}>{title}</a>
                  </h3>
                </div>

                <div className="project-body">
                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>

                <div className="project-footer">
                  {tech && tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {cta && (
                        <a href={cta} aria-label="Course Link" className="cta">
                          Learn More
                        </a>
                      )}
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && !cta && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                  </div>
                </div>

                <div className="project-image">
                  <div className="cover-box">{Cover ? <Cover number={i} /> : null}</div>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
