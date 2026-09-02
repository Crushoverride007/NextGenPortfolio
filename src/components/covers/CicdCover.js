import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CoverFrame, { STAGE_W, STAGE_H, cardNumber } from './CoverFrame';

const STAGES = [
  {
    label: '01 · COMMIT',
    title: 'Secrets scan',
    tool: 'gitleaks',
    stage: 'commit',
    cmd: 'gitleaks detect --source . --redact --report-format sarif',
    result: '0 secrets · 1,204 commits scanned',
    gate: 'gate passed → sast',
    report: 'artifacts/gitleaks.sarif',
  },
  {
    label: '02 · SAST',
    title: 'Static analysis',
    tool: 'SonarQube',
    stage: 'sast',
    cmd: 'sonar-scanner -Dsonar.qualitygate.wait=true',
    result: '0 blocker · 3 major · 27 minor',
    gate: 'quality gate A → build',
    report: 'sonarqube.local/dashboard?id=app · SARIF uploaded',
  },
  {
    label: '03 · BUILD',
    title: 'Image scan',
    tool: 'Docker · Trivy',
    stage: 'build',
    cmd: 'trivy image --severity CRITICAL,HIGH --exit-code 1 app:$CI_SHA',
    result: '0 critical · 4 high (fixed) · 18 medium',
    gate: 'gate passed → iac',
    report: 'artifacts/trivy-report.json · SBOM attached',
  },
  {
    label: '04 · IAC',
    title: 'IaC scan',
    tool: 'tfsec · Qualys',
    stage: 'iac',
    cmd: 'tfsec ./infra --minimum-severity HIGH && qualys-iac scan',
    result: '0 critical · 1 high · 6 low',
    gate: 'gate passed → dast',
    report: 'artifacts/tfsec.sarif · Qualys policy CIS-1.4',
  },
  {
    label: '05 · DAST',
    title: 'Dynamic test',
    tool: 'OWASP ZAP',
    stage: 'dast',
    cmd: 'zap-baseline.py -t https://staging.app -r report.html',
    result: '0 critical · 2 medium · 9 low',
    gate: 'gate passed → deploy',
    report: 'artifacts/security-report.html · SARIF uploaded',
  },
  {
    label: '06 · DEPLOY',
    title: 'Release',
    tool: 'policy-approved',
    stage: 'deploy',
    cmd: 'helm upgrade --install app ./chart --atomic --wait',
    result: 'all 5 gates passed · signed image',
    gate: 'released → prod',
    report: 'release notes · cosign attestation · audit log',
  },
];

/* The pipeline line runs between x=64 and x=1336; each stage owns a column. */
const COL = (1272 - 100) / 6;
const stageX = k => Math.round(64 + k * (COL + 20) + COL / 2);

const StyledCicd = styled.div`
  .glow {
    background: radial-gradient(ellipse 70% 40% at 50% 50%, rgba(100, 255, 218, 0.08), transparent 70%);
  }

  .gate {
    position: absolute;
    top: 200px;
    left: 64px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .lb { color: var(--slate); font-size: 14px; letter-spacing: 0.2em; }
    .v { font-size: 24px; font-weight: 600; }
  }

  svg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  #prog,
  #dot {
    transition: all 0.3s;
  }

  .grid {
    position: absolute;
    top: 360px;
    left: 64px;
    right: 64px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;

    .card {
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 18px;
      gap: 6px;

      .lb { font-size: 12px; }
      .ti { font-size: 17px; font-weight: 600; color: var(--lightest-slate); }
      .to { color: var(--slate); font-size: 13px; }

      &.active .ti { color: var(--green); }
    }
  }

  .log {
    position: absolute;
    top: 540px;
    left: 64px;
    right: 64px;
    border: 1px solid var(--lightest-navy);
    background: var(--dark-navy);
    padding: 20px 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 15px;
    line-height: 1.5;

    div { display: flex; gap: 16px; }
    .k { color: var(--slate); width: 56px; flex: none; }
  }
`;

const CicdCover = ({ cycle, number }) => {
  const [current, setCurrent] = useState(4);

  useEffect(() => {
    if (!cycle) {
      return undefined;
    }
    const id = setInterval(() => setCurrent(c => (c + 1) % STAGES.length), cycle * 1000);
    return () => clearInterval(id);
  }, [cycle]);

  const s = STAGES[current];
  const x = stageX(current);

  return (
    <CoverFrame label="Security-gated CI/CD pipeline: secrets scan, SAST, image scan, IaC scan, DAST and release stages">
      <StyledCicd>
        <div className="glow" />
        <div className="hd">
          <span className="n">{cardNumber(number)}</span>
          <span className="t">Security-Gated Pipeline</span>
        </div>
        <div className="sub">GitLab CI · GitHub Actions</div>

        <div className="gate">
          <span className="lb">GATE POLICY</span>
          <span className="v">critical &gt; 0 → pipeline blocked</span>
        </div>

        <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} width={STAGE_W} height={STAGE_H} fill="none" aria-hidden="true">
          <line x1="64" y1="420" x2="1336" y2="420" stroke="var(--lightest-navy)" strokeWidth="2" />
          <line
            id="prog"
            x1="64"
            y1="420"
            x2={x}
            y2="420"
            stroke="var(--green)"
            strokeWidth="2"
            strokeDasharray="6 8"
            opacity="0.7"
          />
          <circle cx="120" cy="420" r="5" fill="var(--green)" />
          <circle id="dot" cx={x} cy="420" r="5" fill="var(--green)" />
        </svg>

        <div className="grid">
          {STAGES.map((st, k) => (
            <button
              key={st.label}
              type="button"
              className={`card${k === current ? ' active' : ''}`}
              onClick={() => setCurrent(k)}
              aria-pressed={k === current}>
              <span className="lb">{st.label}</span>
              <span className="ti">{st.title}</span>
              <span className="to">{st.tool}</span>
            </button>
          ))}
        </div>

        <div className="log">
          <div>
            <span className="k">stage</span>
            <span className="w">{s.stage}</span>
            <span className="m">·</span>
            <span className="w">{s.cmd}</span>
          </div>
          <div>
            <span className="k">result</span>
            <span className="g">{s.result}</span>
            <span className="m">·</span>
            <span className="w">{s.gate}</span>
          </div>
          <div>
            <span className="k">report</span>
            <span className="w">{s.report}</span>
          </div>
        </div>

        <div className="ft-l">SHIFT LEFT · FAIL FAST · SHIP SAFE</div>
        <div className="ft-r">SAST · DAST · IaC · containers</div>
      </StyledCicd>
    </CoverFrame>
  );
};

CicdCover.propTypes = {
  /** Seconds between automatic stage changes; omit to leave it click-driven. */
  cycle: PropTypes.number,
  /** Position in the featured section; drives the card number. */
  number: PropTypes.number,
};

CicdCover.defaultProps = {
  number: 0,
};

export default CicdCover;
