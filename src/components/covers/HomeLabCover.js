import React from 'react';
import CoverFrame, { STAGE_W, STAGE_H } from './CoverFrame';

const box = {
  position: 'absolute',
  border: '1px solid var(--lightest-navy)',
  background: 'var(--light-navy)',
  display: 'flex',
  boxSizing: 'border-box',
};

const vlan = { ...box, top: 500, width: 300, height: 80, flexDirection: 'column', justifyContent: 'center', padding: '0 22px', gap: 4 };
const vlanRow = { display: 'flex', justifyContent: 'space-between' };
const vlanName = { color: 'var(--lightest-slate)', fontSize: 18, fontWeight: 600 };
const vlanTag = { color: 'var(--green)', fontSize: 14 };
const vlanMeta = { color: 'var(--slate)', fontSize: 14 };

const chips = { position: 'absolute', top: 730, width: 300, display: 'flex', gap: 10, flexWrap: 'wrap' };
const chip = { border: '1px solid var(--lightest-navy)', color: 'var(--slate)', fontSize: 13, padding: '5px 10px' };

const HomeLabCover = () => (
  <CoverFrame label="Home lab topology: WAN into pfSense, then three VLANs for management, an AD lab and an attack network">
    <div className="glow" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(100,255,218,.08), transparent 70%)' }} />
    <div className="hd">
      <span className="n">01.</span>
      <span className="t">Home Lab Topology</span>
    </div>
    <div className="sub">10.0.0.0/16 · Proxmox VE</div>

    <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} width={STAGE_W} height={STAGE_H} style={{ position: 'absolute', inset: 0 }} fill="none" aria-hidden="true">
      <g stroke="var(--lightest-navy)" strokeWidth="2">
        <line x1="700" y1="180" x2="700" y2="280" />
        <line x1="700" y1="340" x2="700" y2="430" />
        <line x1="230" y1="430" x2="1170" y2="430" />
        <line x1="230" y1="430" x2="230" y2="500" />
        <line x1="700" y1="430" x2="700" y2="500" />
        <line x1="1170" y1="430" x2="1170" y2="500" />
        <line x1="230" y1="580" x2="230" y2="700" />
        <line x1="700" y1="580" x2="700" y2="700" />
        <line x1="1170" y1="580" x2="1170" y2="700" />
        <line x1="120" y1="700" x2="340" y2="700" />
        <line x1="590" y1="700" x2="810" y2="700" />
        <line x1="1060" y1="700" x2="1280" y2="700" />
      </g>
      <g stroke="var(--green)" strokeWidth="2" strokeDasharray="6 8" opacity=".6">
        <line x1="700" y1="340" x2="700" y2="430" />
      </g>
      <g fill="var(--green)">
        <circle cx="700" cy="180" r="5" />
        <circle cx="700" cy="430" r="5" />
        <circle cx="230" cy="430" r="5" />
        <circle cx="1170" cy="430" r="5" />
      </g>
    </svg>

    <div style={{ position: 'absolute', top: 140, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span style={{ color: 'var(--slate)', fontSize: 15, letterSpacing: '.2em' }}>WAN</span>
    </div>
    <div style={{ ...box, top: 280, left: '50%', transform: 'translateX(-50%)', width: 300, height: 60, alignItems: 'center', justifyContent: 'center', gap: 12, borderColor: 'var(--green)', background: 'var(--navy)', boxShadow: '0 0 40px rgba(100,255,218,.15)' }}>
      <span style={{ color: 'var(--green)', fontSize: 20, fontWeight: 600 }}>pfSense</span>
      <span style={{ color: 'var(--slate)', fontSize: 15 }}>firewall · IDS</span>
    </div>

    <div style={{ ...vlan, left: 80 }}>
      <div style={vlanRow}><span style={vlanName}>VLAN 10</span><span style={vlanTag}>MGMT</span></div>
      <span style={vlanMeta}>Proxmox · Wazuh SIEM · Docker</span>
    </div>
    <div style={{ ...vlan, left: 550 }}>
      <div style={vlanRow}><span style={vlanName}>VLAN 20</span><span style={vlanTag}>AD LAB</span></div>
      <span style={vlanMeta}>Windows Server · AD clients</span>
    </div>
    <div style={{ ...vlan, left: 1020 }}>
      <div style={vlanRow}><span style={vlanName}>VLAN 30</span><span style={vlanTag}>ATTACK</span></div>
      <span style={vlanMeta}>Kali Linux · Malware sandbox</span>
    </div>

    <div style={{ ...chips, left: 80 }}>
      {['wazuh', 'elk', 'docker', 'llm'].map(c => <span key={c} style={chip}>{c}</span>)}
    </div>
    <div style={{ ...chips, left: 550 }}>
      {['dc01', 'ws01', 'ws02', 'vuln-app'].map(c => <span key={c} style={chip}>{c}</span>)}
    </div>
    <div style={{ ...chips, left: 1020 }}>
      {['kali', 'c2', 'sandbox'].map(c => <span key={c} style={chip}>{c}</span>)}
    </div>

    <div className="ft-l">RED TEAM ⟷ BLUE TEAM</div>
    <div className="ft-r">segmented · monitored · logged</div>
  </CoverFrame>
);

export default HomeLabCover;
