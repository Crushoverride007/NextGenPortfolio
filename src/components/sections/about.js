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
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
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
            <iframe
              src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1661945"
              style={{ border: 'none' , width: '100%', height: '100px'}}
              title="TryHackMe Badge"
            ></iframe>
            <p>
              Hi, I am Mouhcine MESMOUKI Cyber Security Researcher with DevSecOps Orientation, I am an avid enthusiast of the field of computer science. I am always on the lookout for new opportunities to enhance my skills and stay at the forefront of the latest technologies.
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://jaas.ma/">Jaas </a>,{' a cybersecurity firm '}
              <a href="https://www.exakis-nelite.com/en/home/">Exakis Nelite ~ Megallan Partners</a>,{' the first pure-play Microsoft partner in France '}
            </p>

            <p>
              - Here are a few technologies in Security I’ve been working with:
            </p>

            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
            <br />

            <p>
              - Here are a few technologies in Cloud & Infrastructure I’ve been working with:
            </p>

            <ul className="skills-list">
              {brevs && brevs.map((brev, i) => <li key={i}>{brev}</li>)}
            </ul>
            <br />

            <p>
              - Certifications:
            </p>

            <ul className="skills-list">
              {certs.map((cert, i) => (
                <li key={i} className="cert-item">
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">
                    {cert.name}
                  </a>
                  <br />
                  <small className="credential">
                    📜 <strong>Credential ID:</strong>{" "}
                    <a href={cert.credentialId} target="_blank" rel="noopener noreferrer" className="credential-link">
                      View Credential
                    </a>
                  </small>
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
