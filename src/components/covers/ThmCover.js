import React from 'react';
import PropTypes from 'prop-types';
import CoverFrame, { cardNumber } from './CoverFrame';

const SKILLS = [
  ['Web · OWASP Top 10', 100],
  ['Windows exploitation · Active Directory', 92],
  ['Linux privilege escalation', 88],
  ['Password cracking · John the Ripper', 85],
  ['OSINT investigations', 80],
  ['Incident response', 74],
];

const chip = { border: '1px solid var(--lightest-navy)', color: 'var(--slate)', fontSize: 13, padding: '5px 10px' };
const stat = { display: 'flex', flexDirection: 'column', alignItems: 'center' };
const statN = { color: 'var(--lightest-slate)', fontSize: 34, fontWeight: 600 };
const statL = { color: 'var(--slate)', fontSize: 13 };

const ThmCover = ({ number }) => (
  <CoverFrame label="TryHackMe: top 4% global rank, 70+ rooms, 15+ badges, 6 paths, with skill progress bars">
    <div className="glow" style={{ background: 'radial-gradient(ellipse 50% 60% at 30% 50%, rgba(100,255,218,.08), transparent 70%)' }} />
    <div className="hd">
      <span className="n">{cardNumber(number)}</span>
      <span className="t">Hands-on Security Labs</span>
    </div>
    <div className="sub">TryHackMe</div>

    <svg viewBox="0 0 320 320" width="320" height="320" style={{ position: 'absolute', top: 220, left: 120 }} fill="none" aria-hidden="true">
      <circle cx="160" cy="160" r="140" stroke="var(--lightest-navy)" strokeWidth="10" />
      <circle cx="160" cy="160" r="140" stroke="var(--green)" strokeWidth="10" strokeLinecap="round" strokeDasharray="845 880" transform="rotate(-90 160 160)" />
    </svg>
    <div style={{ position: 'absolute', top: 220, left: 120, width: 320, height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
      <span style={{ color: 'var(--green)', fontSize: 64, fontWeight: 600, lineHeight: 1 }}>TOP 4%</span>
      <span style={{ color: 'var(--slate)', fontSize: 14, letterSpacing: '.2em' }}>GLOBAL RANK</span>
    </div>
    <div style={{ position: 'absolute', top: 600, left: 120, width: 320, display: 'flex', justifyContent: 'space-between' }}>
      <div style={stat}><span style={statN}>70+</span><span style={statL}>rooms</span></div>
      <div style={stat}><span style={statN}>15+</span><span style={statL}>badges</span></div>
      <div style={stat}><span style={statN}>6</span><span style={statL}>paths</span></div>
    </div>

    <div style={{ position: 'absolute', top: 200, left: 560, width: 780, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {SKILLS.map(([name, pct]) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
            <span className="w">{name}</span>
            <span className="g">{pct}%</span>
          </div>
          <div style={{ height: 6, background: 'var(--light-navy)' }}>
            <div style={{ height: 6, width: `${pct}%`, background: 'var(--green)' }} />
          </div>
        </div>
      ))}
    </div>
    <div style={{ position: 'absolute', top: 640, left: 560, width: 780, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {['kali', 'metasploit', 'burp', 'wireshark', 'python', 'bash'].map(c => <span key={c} style={chip}>{c}</span>)}
    </div>

    <div className="ft-l">LEARN BY BREAKING THINGS</div>
    <div className="ft-r">tryhackme.com</div>
  </CoverFrame>
);

ThmCover.propTypes = {
  /** Position in the featured section; drives the card number. */
  number: PropTypes.number,
};

ThmCover.defaultProps = {
  number: 0,
};

export default ThmCover;
