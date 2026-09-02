import React from 'react';
import PropTypes from 'prop-types';
import CoverFrame, { STAGE_W, STAGE_H, cardNumber } from './CoverFrame';

const box = {
  position: 'absolute',
  border: '1px solid var(--lightest-navy)',
  background: 'var(--light-navy)',
  display: 'flex',
  boxSizing: 'border-box',
};

const beat = { ...box, left: 40, width: 260, height: 60, alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '0 20px' };
const beatName = { color: 'var(--lightest-slate)', fontSize: 17, fontWeight: 600 };
const beatMeta = { color: 'var(--slate)', fontSize: 13 };

const ElasticCover = ({ number }) => (
  <CoverFrame label="SIEM log pipeline: Filebeat, Winlogbeat and Packetbeat into Logstash, Elasticsearch and Kibana, with a brute-force detection rule">
    <div className="glow" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(100,255,218,.08), transparent 70%)' }} />
    <div className="hd">
      <span className="n">{cardNumber(number)}</span>
      <span className="t">SIEM Log Pipeline</span>
    </div>
    <div className="sub">Elastic Stack · SOC</div>

    <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} width={STAGE_W} height={STAGE_H} style={{ position: 'absolute', inset: 0 }} fill="none" aria-hidden="true">
      <g stroke="var(--lightest-navy)" strokeWidth="2">
        <line x1="300" y1="300" x2="360" y2="300" />
        <line x1="300" y1="440" x2="360" y2="440" />
        <line x1="300" y1="580" x2="360" y2="580" />
        <line x1="360" y1="300" x2="360" y2="580" />
        <line x1="360" y1="440" x2="430" y2="440" />
        <line x1="1040" y1="440" x2="1100" y2="440" />
      </g>
      <g stroke="var(--green)" strokeWidth="2" strokeDasharray="6 8" opacity=".7">
        <line x1="670" y1="440" x2="750" y2="440" />
        <line x1="960" y1="440" x2="1040" y2="440" />
      </g>
      <g fill="var(--green)">
        <circle cx="430" cy="440" r="5" />
        <circle cx="1040" cy="440" r="5" />
      </g>
    </svg>

    <div style={{ ...beat, top: 270 }}><span style={beatName}>Filebeat</span><span style={beatMeta}>linux · web</span></div>
    <div style={{ ...beat, top: 410 }}><span style={beatName}>Winlogbeat</span><span style={beatMeta}>AD · hosts</span></div>
    <div style={{ ...beat, top: 550 }}><span style={beatName}>Packetbeat</span><span style={beatMeta}>network</span></div>

    <div style={{ ...box, top: 380, left: 430, width: 240, height: 120, flexDirection: 'column', justifyContent: 'center', padding: '0 22px', gap: 6 }}>
      <span style={{ color: 'var(--lightest-slate)', fontSize: 20, fontWeight: 600 }}>Logstash</span>
      <span style={{ color: 'var(--slate)', fontSize: 14 }}>parse · enrich · geoip</span>
    </div>
    <div style={{ ...box, top: 365, left: 750, width: 210, height: 150, flexDirection: 'column', justifyContent: 'center', padding: '0 22px', gap: 6, borderColor: 'var(--green)', background: 'var(--navy)', boxShadow: '0 0 40px rgba(100,255,218,.15)' }}>
      <span style={{ color: 'var(--green)', fontSize: 20, fontWeight: 600 }}>Elasticsearch</span>
      <span style={{ color: 'var(--slate)', fontSize: 14 }}>3 nodes · ILM</span>
    </div>
    <div style={{ ...box, top: 380, left: 1100, width: 220, height: 120, flexDirection: 'column', justifyContent: 'center', padding: '0 22px', gap: 6 }}>
      <span style={{ color: 'var(--lightest-slate)', fontSize: 20, fontWeight: 600 }}>Kibana</span>
      <span style={{ color: 'var(--slate)', fontSize: 14 }}>dashboards · alerts</span>
    </div>

    <div style={{ ...box, top: 640, left: 750, width: 570, background: 'var(--navy)', padding: '18px 22px', flexDirection: 'column', gap: 8, fontSize: 13, lineHeight: 1.5 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <span className="m">rule</span>
        <span className="w">event.code:4625 AND count() &gt; 10 within 5m</span>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <span className="m">tag</span>
        <span className="g">T1110 · brute-force · APT-suspect</span>
      </div>
    </div>

    <div className="ft-l">COLLECT · CORRELATE · DETECT</div>
    <div className="ft-r">real-time threat monitoring</div>
  </CoverFrame>
);

ElasticCover.propTypes = {
  /** Position in the featured section; drives the card number. */
  number: PropTypes.number,
};

ElasticCover.defaultProps = {
  number: 0,
};

export default ElasticCover;
