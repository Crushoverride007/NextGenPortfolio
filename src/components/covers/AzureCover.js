import React from 'react';
import CoverFrame, { STAGE_W, STAGE_H } from './CoverFrame';

const box = {
  position: 'absolute',
  border: '1px solid var(--lightest-navy)',
  background: 'var(--light-navy)',
  display: 'flex',
  boxSizing: 'border-box',
};

const AzureCover = () => (
  <CoverFrame label="Zero Trust identity flow: on-prem AD synced to Entra ID Conditional Access, Sentinel above, PowerShell below, out to Microsoft 365">
    <div className="glow" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(100,255,218,.08), transparent 70%)' }} />
    <div className="hd">
      <span className="n">02.</span>
      <span className="t">Zero Trust Identity Flow</span>
    </div>
    <div className="sub">1,500+ users · 0 incidents</div>

    <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} width={STAGE_W} height={STAGE_H} style={{ position: 'absolute', inset: 0 }} fill="none" aria-hidden="true">
      <g stroke="var(--lightest-navy)" strokeWidth="2">
        <line x1="700" y1="300" x2="700" y2="240" />
        <line x1="700" y1="620" x2="700" y2="680" />
      </g>
      <g stroke="var(--green)" strokeWidth="2" opacity=".7" strokeDasharray="6 8">
        <line x1="300" y1="460" x2="540" y2="460" />
        <line x1="860" y1="460" x2="1100" y2="460" />
      </g>
      <circle cx="700" cy="460" r="160" stroke="var(--lightest-navy)" strokeWidth="2" />
      <circle cx="700" cy="460" r="160" stroke="var(--green)" strokeWidth="2" strokeDasharray="754 251" opacity=".8" transform="rotate(-90 700 460)" />
      <g fill="var(--green)">
        <circle cx="540" cy="460" r="5" />
        <circle cx="860" cy="460" r="5" />
      </g>
    </svg>

    <div style={{ ...box, top: 410, left: 80, width: 220, height: 100, flexDirection: 'column', justifyContent: 'center', padding: '0 22px', gap: 4 }}>
      <span style={{ color: 'var(--lightest-slate)', fontSize: 18, fontWeight: 600 }}>On-prem AD</span>
      <span style={{ color: 'var(--slate)', fontSize: 14 }}>Connect sync</span>
    </div>
    <div style={{ ...box, top: 410, left: 1100, width: 220, height: 100, flexDirection: 'column', justifyContent: 'center', padding: '0 22px', gap: 4 }}>
      <span style={{ color: 'var(--lightest-slate)', fontSize: 18, fontWeight: 600 }}>Microsoft 365</span>
      <span style={{ color: 'var(--slate)', fontSize: 14 }}>Graph · workloads</span>
    </div>

    <div style={{ position: 'absolute', top: 380, left: '50%', transform: 'translateX(-50%)', width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
      <span style={{ color: 'var(--green)', fontSize: 15, letterSpacing: '.2em' }}>ENTRA ID</span>
      <span style={{ color: 'var(--lightest-slate)', fontSize: 28, fontWeight: 600, lineHeight: 1.1 }}>
        Conditional
        <br />
        Access
      </span>
      <span style={{ color: 'var(--slate)', fontSize: 14 }}>PIM · MFA · risk policy</span>
    </div>

    {/* Widened from 320px so the label and its caption sit comfortably. */}
    <div style={{ ...box, top: 180, left: '50%', transform: 'translateX(-50%)', width: 420, height: 60, alignItems: 'center', justifyContent: 'center', gap: 14, padding: '0 22px', borderColor: 'var(--green)', background: 'var(--navy)', boxShadow: '0 0 40px rgba(100,255,218,.15)' }}>
      <span style={{ color: 'var(--green)', fontSize: 20, fontWeight: 600 }}>Sentinel</span>
      <span style={{ color: 'var(--slate)', fontSize: 15 }}>SIEM · threat detection</span>
    </div>
    <div style={{ ...box, top: 680, left: '50%', transform: 'translateX(-50%)', width: 420, height: 60, alignItems: 'center', justifyContent: 'center', gap: 14, padding: '0 22px' }}>
      <span style={{ color: 'var(--lightest-slate)', fontSize: 20, fontWeight: 600 }}>PowerShell</span>
      <span style={{ color: 'var(--slate)', fontSize: 15 }}>provisioning · audit</span>
    </div>

    <div className="ft-l">VERIFY EXPLICITLY · LEAST PRIVILEGE · ASSUME BREACH</div>
    <div className="ft-r">99.9% compliance</div>
  </CoverFrame>
);

export default AzureCover;
