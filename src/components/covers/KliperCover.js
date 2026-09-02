import React from 'react';
import CoverFrame from './CoverFrame';

const dot = { width: 12, height: 12, borderRadius: '50%', background: 'var(--lightest-navy)' };
const navItem = { color: 'var(--slate)' };
const kpi = { border: '1px solid var(--lightest-navy)', background: 'var(--light-navy)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 };
const kpiL = { color: 'var(--slate)', fontSize: 11, letterSpacing: '.2em' };
const kpiN = { color: 'var(--lightest-slate)', fontSize: 26, fontWeight: 600 };
const kpiS = { color: 'var(--slate)', fontSize: 12 };
const row = { display: 'grid', gridTemplateColumns: '110px 1fr 140px 120px', padding: '10px 16px', borderBottom: '1px solid var(--lightest-navy)' };

const ROWS = [
  ['1.2.8', 'NSC configuration files are secured', '7 files', 'In place', true],
  ['3.5.1', 'PAN rendered unreadable anywhere stored', '12 files', 'In place', true],
  ['8.4.2', 'MFA for all non-console access into the CDE', '3 files', 'Gap · high', false],
  ['10.4.1', 'Audit logs reviewed at least once daily', '31 files', 'In place', true],
  ['12.3.1', 'Targeted risk analysis documented', '—', 'Gap · medium', false],
];

const KliperCover = () => (
  <CoverFrame label="Kliper: a Report on Compliance workspace showing controls, gaps, evidence, a requirements table and a Cortex assistant note">
    <div className="glow" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(100,255,218,.08), transparent 70%)' }} />
    <div className="hd">
      <span className="n">00.</span>
      <span className="t">Kliper — PCI DSS assessments, end to end</span>
    </div>
    <div className="sub">founder · sole engineer · 2025→</div>

    <div style={{ position: 'absolute', top: 140, left: 64, right: 64, bottom: 110, border: '1px solid var(--lightest-navy)', background: 'var(--dark-navy)', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '220px 1fr', gridTemplateRows: '44px 1fr' }}>
      <div style={{ gridColumn: '1 / 3', borderBottom: '1px solid var(--lightest-navy)', display: 'flex', alignItems: 'center', gap: 8, padding: '0 18px' }}>
        <span style={dot} /><span style={dot} /><span style={dot} />
        <span style={{ marginLeft: 14, color: 'var(--slate)', fontSize: 13 }}>app.kliper.io / engagements / acme-payments / roc</span>
        <span style={{ marginLeft: 'auto', border: '1px solid var(--lightest-navy)', color: 'var(--slate)', fontSize: 12, padding: '3px 10px' }}>QSA · Acme Assessors</span>
      </div>

      <div style={{ borderRight: '1px solid var(--lightest-navy)', padding: '22px 18px', display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--green)', fontSize: 18, fontWeight: 600 }}>
          <span style={{ display: 'inline-block', width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderRight: '14px solid var(--green)' }} />
          Kliper
        </div>
        <div style={{ height: 1, background: 'var(--lightest-navy)' }} />
        <span style={navItem}>Scoping</span>
        <span style={navItem}>Evidence</span>
        <span style={{ color: 'var(--green)', borderLeft: '2px solid var(--green)', paddingLeft: 10, marginLeft: -12 }}>Report on Compliance</span>
        <span style={navItem}>Gap &amp; Risk</span>
        <span style={navItem}>Client Portal</span>
        <span style={navItem}>Cortex</span>
        <div style={{ marginTop: 'auto', border: '1px solid var(--lightest-navy)', padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={kpiL}>READINESS</span>
          <span style={{ color: 'var(--green)', fontSize: 26, fontWeight: 600 }}>92%</span>
          <span style={kpiS}>448 questions scored</span>
        </div>
      </div>

      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ color: 'var(--lightest-slate)', fontSize: 22, fontWeight: 600 }}>Acme Payments · PCI DSS v4.0.1 · ROC</span>
          <span style={{ color: 'var(--slate)', fontSize: 13 }}>export · DOCX</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div style={kpi}><span style={kpiL}>CONTROLS</span><span style={kpiN}>250</span><span style={kpiS}>guidance layer</span></div>
          <div style={kpi}><span style={kpiL}>IN PLACE</span><span style={{ ...kpiN, color: 'var(--green)' }}>231</span><span style={kpiS}>evidence linked</span></div>
          <div style={kpi}><span style={kpiL}>GAPS</span><span style={kpiN}>19</span><span style={kpiS}>4 high · 15 medium</span></div>
          <div style={kpi}><span style={kpiL}>EVIDENCE</span><span style={kpiN}>1,842</span><span style={kpiS}>via client portal</span></div>
        </div>

        <div style={{ border: '1px solid var(--lightest-navy)', display: 'flex', flexDirection: 'column', fontSize: 14 }}>
          <div style={{ ...row, color: 'var(--slate)', fontSize: 11, letterSpacing: '.2em' }}>
            <span>REQ</span><span>CONTROL</span><span>EVIDENCE</span><span>STATUS</span>
          </div>
          {ROWS.map(([req, control, evidence, status, ok], i) => (
            <div
              key={req}
              style={{
                ...row,
                borderBottom: i === ROWS.length - 1 ? 'none' : row.borderBottom,
                background: req === '8.4.2' ? 'var(--light-navy)' : 'transparent',
              }}>
              <span className="m">{req}</span>
              <span className="w">{control}</span>
              <span className="m">{evidence}</span>
              <span className={ok ? 'g' : 'w'}>{status}</span>
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid var(--green)', background: 'var(--navy)', padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: '0 0 40px rgba(100,255,218,.12)', fontSize: 14, lineHeight: 1.5 }}>
          <span style={{ color: 'var(--green)', fontSize: 11, letterSpacing: '.2em', paddingTop: 4, flex: 'none' }}>CORTEX</span>
          <span className="w">
            For 8.4.2, evidence shows MFA on VPN only. v4.0.1 requires MFA for <span className="g">all</span> non-console CDE access, including admin jump hosts — see methodology §8.4, testing procedure 8.4.2.b.
          </span>
        </div>
      </div>
    </div>

    <div className="ft-l">MULTI-TENANT · ZERO-TRUST · 4m34s RTO</div>
    <div className="ft-r">Next.js · Node · PostgreSQL · Cloudflare</div>
  </CoverFrame>
);

export default KliperCover;
