import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  .thm-badge {
    display: inline-block;
    margin-bottom: 20px;
    line-height: 0;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
    }
  }

  .list-heading {
    margin: 30px 0 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    line-height: 1.4;
  }

  ul.skills-list {
    /* Columns rather than grid. Grid makes every row as tall as its tallest
       cell, so one entry that wraps - "Azure Networking (VNet, NSG, Load
       Balancers, ExpressRoute, VPN)" - left a hole beside its short
       neighbour. Columns flow independently, so entries pack tightly however
       long they are. The width is a minimum: the browser fits as many columns
       as it can, which also removes the need for a mobile breakpoint here. */
    column-width: 200px;
    column-gap: 20px;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      /* Never let an entry split across two columns. */
      break-inside: avoid;
      page-break-inside: avoid;
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }

  /* Certificates use a grid rather than columns, the opposite of the skills
     list above, because here alignment matters more than tight packing: a
     grid row is as tall as its tallest cell, so entries sit level with each
     other instead of each column flowing to its own rhythm. */
  ul.skills-list.certs-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 22px 24px;
    column-width: auto;

    li {
      /* Stretch to the row height, so the link can be pinned to the bottom. */
      display: flex;
      flex-direction: column;
      height: 100%;
      margin-bottom: 0;
      line-height: 1.5;
    }

    .cert-link {
      color: var(--lightest-slate);

      &:hover,
      &:focus {
        color: var(--green);
      }
    }

    /* margin-top:auto pushes this to the bottom of a stretched cell, so the
       links line up across a row however many lines the names above take. */
    .credential-link {
      margin-top: auto;
      padding-top: 8px;
      color: var(--green);
      font-size: var(--fz-xxs);
      white-space: nowrap;
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['Elastic Stack', 'OWASP ZAP', 'MERN Stack', 'Burp suite', 'Kali Linux', 'Hashcat, John the ripper', 'Nmap', 'Metasploit'];

  const brevs = ['Azure Virtual Machines', 'Azure Kubernetes Service (AKS)', 'Azure Networking (VNet, NSG, Load Balancers, ExpressRoute, VPN)', 'Azure Storage (Blob, Files, Disks)', 'Azure Active Directory (Azure AD, Entra ID, RBAC, PIM, Conditional Access)', 'Azure Functions', 'Azure App Services', 'Azure Key Vault', 'Azure Security Center', 'Azure Defender for Cloud', 'Azure Policy', 'Terraform', 'Ansible', 'Vagrant', 'Azure Resource Manager (ARM) Templates', 'PowerShell', 'Bash', 'Python', 'Azure DevOps', 'GitHub Actions', 'GitLab CI/CD', 'Jenkins', 'Docker', 'Kubernetes (AKS)', 'Microsoft Defender for Cloud', 'Zero Trust Security', 'Encryption & Key Management']

  // Platform and application-security work, mostly from Kliper. Kept separate
  // from the two lists above: i18n and WebAuthn are neither pentest tooling
  // nor cloud infrastructure. CI/CD and zero trust are omitted as the lists
  // above already carry them.
  const platform = [
    'Multi-tenant architecture',
    'Row-level tenant isolation',
    'OIDC / SAML',
    'WebAuthn & passkeys',
    'RAG & LLM agents',
    'Prompt caching',
    'Disaster recovery (PITR, RTO/RPO)',
    'Security hardening',
    'PCI DSS 4.0.1',
    'SOC 2 readiness',
    'Internationalisation (i18n)',
    'Observability',
  ];

  const certs = [
    {
      name: 'MS-102 - Microsoft 365 Certified: Administrator Expert',
      url: 'https://learn.microsoft.com/en-us/users/mouhcinemes/credentials/6ed84d7a5e99e1b3?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      credentialId: 'https://learn.microsoft.com/en-us/users/mouhcinemes/credentials/6ed84d7a5e99e1b3?ref=https%3A%2F%2Fwww.linkedin.com%2F'
    },
    {
      name: 'AZ-104 - Microsoft Certified: Azure Administrator Associate',
      url: 'https://learn.microsoft.com/en-us/users/mouhcinemes/credentials/71f22fd4cdf5cb04?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      credentialId: 'https://learn.microsoft.com/en-us/users/mouhcinemes/credentials/71f22fd4cdf5cb04?ref=https%3A%2F%2Fwww.linkedin.com%2F'
    },
    {
      name: 'SC-300 - Microsoft Certified: Identity and Access Administrator Associate',
      url: 'https://learn.microsoft.com/en-us/users/mouhcinemes/credentials/8f2d4ce8985d6d10?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      credentialId: 'https://learn.microsoft.com/en-us/users/mouhcinemes/credentials/8f2d4ce8985d6d10?ref=https%3A%2F%2Fwww.linkedin.com%2F'
    },
    {
      name: 'Google Cybersecurity Professional',
      url: 'https://www.coursera.org/account/accomplishments/specialization/TGDR1HGETKXO',
      credentialId: 'https://www.coursera.org/account/accomplishments/specialization/TGDR1HGETKXO'
    }
  ];


  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            {/* Rendered from TryHackMe's badge markup at 4x. The live badge is an
                HTML page whose avatar reference is a broken relative path, so
                framing it showed an empty circle; this carries the real avatar. */}
            <a
              href="https://tryhackme.com/p/Crushoverride007"
              target="_blank"
              rel="noopener noreferrer"
              className="thm-badge"
              aria-label="TryHackMe profile">
              <img src="/tryhackme-badge.png" width="327" height="84" alt="TryHackMe badge: Crushoverride007, rank 0x9" />
            </a>
            <p>
              Hi, I am Mouhcine MESMOUKI Cyber Security Researcher with DevSecOps Orientation, I am an avid enthusiast of the field of computer science. I am always on the lookout for new opportunities to enhance my skills and stay at the forefront of the latest technologies.
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://jaas.ma/">Jaas </a>,{' a cybersecurity firm '}
              <a href="https://www.exakis-nelite.com/en/home/">Exakis Nelite ~ Megallan Partners</a>,{' the first pure-play Microsoft partner in France '}
            </p>

            <p className="list-heading">
              Technologies in Security I’ve been working with
            </p>

            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
            <br />

            <p className="list-heading">
              Technologies in Cloud &amp; Infrastructure I’ve been working with
            </p>

            <ul className="skills-list">
              {brevs && brevs.map((brev, i) => <li key={i}>{brev}</li>)}
            </ul>
            <br />

            <p className="list-heading">
              Platform &amp; application security I&rsquo;ve been working with
            </p>

            <ul className="skills-list">
              {platform && platform.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <br />

            <p className="list-heading">
              Certifications
            </p>

            <ul className="skills-list certs-list">
              {certs.map((cert, i) => (
                <li key={i} className="cert-item">
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">
                    {cert.name}
                  </a>
                  <a
                    href={cert.credentialId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="credential-link">
                    📜 View Credential
                  </a>
                </li>
              ))}
            </ul>


            <br />

          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
