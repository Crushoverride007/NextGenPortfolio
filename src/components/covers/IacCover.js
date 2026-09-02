import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CoverFrame from './CoverFrame';

/* Line helper: indent in stage pixels, then [class, text] pairs. */
const L = (pad, ...parts) => ({ pad, parts });
const G = 'g';
const W = 'w';
const M = 'm';

const STAGES = [
  {
    label: 'PLAN',
    status: 'terraform plan → 42 to add',
    files: ['modules/secure-vnet/main.tf', 'variables.tf', 'outputs.tf'],
    lines: [
      L(0, [G, 'resource'], [W, ' "azurerm_virtual_network" "secure"'], [M, ' {']),
      L(28, [M, 'name                 = '], [W, '"vnet-${var.env}-hardened"']),
      L(28, [M, 'address_space        = '], [W, '["10.40.0.0/16"]']),
      L(28, [M, 'ddos_protection_plan { enable = '], [G, 'true'], [M, ' }']),
      L(0, [M, '}']),
      L(0, [M, '']),
      L(0, [G, 'resource'], [W, ' "azurerm_network_security_group" "deny_all"'], [M, ' {']),
      L(28, [M, 'security_rule {']),
      L(56, [M, 'name      = '], [W, '"DenyAllInbound"']),
      L(56, [M, 'priority  = '], [W, '4096']),
      L(56, [M, 'access    = '], [W, '"Deny"']),
      L(28, [M, '}']),
      L(0, [M, '}']),
      L(0, [M, '']),
      L(0, [G, 'module'], [W, ' "policy"'], [M, ' {']),
      L(28, [M, 'source    = '], [W, '"./modules/azure-policy"']),
      L(28, [M, 'baseline  = '], [W, '"CIS-Azure-2.0"']),
      L(0, [M, '}']),
    ],
  },
  {
    label: 'POLICY GATE',
    status: '118 checks · 0 violations',
    files: ['policy/cis-baseline.tf', 'exemptions.tf', 'conftest/'],
    lines: [
      L(0, [G, 'resource'], [W, ' "azurerm_subscription_policy_assignment" "cis"'], [M, ' {']),
      L(28, [M, 'name                 = '], [W, '"cis-azure-2.0"']),
      L(28, [M, 'policy_definition_id = '], [W, 'data.azurerm_policy_set_definition.cis.id']),
      L(28, [M, 'subscription_id      = '], [W, 'data.azurerm_subscription.prod.id']),
      L(28, [M, 'enforce              = '], [G, 'true']),
      L(0, [M, '}']),
      L(0, [M, '']),
      L(0, [M, '# conftest · pre-apply gate (rego)']),
      L(0, [G, 'deny'], [M, '[msg] {']),
      L(28, [W, 'input.resource.storage.https_only'], [M, ' == '], [G, 'false']),
      L(28, [M, 'msg := '], [W, '"storage must enforce HTTPS"']),
      L(0, [M, '}']),
      L(0, [M, '']),
      L(0, [G, 'deny'], [M, '[msg] {']),
      L(28, [W, 'input.resource.nsg.rule.source'], [M, ' == '], [W, '"*"']),
      L(28, [M, 'msg := '], [W, '"no inbound from any"']),
      L(0, [M, '}']),
    ],
  },
  {
    label: 'APPLY',
    status: 'GitHub Actions · OIDC · 4m 12s',
    files: ['.github/workflows/deploy.yml', 'plan.yml', 'destroy.yml'],
    lines: [
      L(0, [G, 'on'], [M, ': { push: { branches: ['], [W, 'main'], [M, '] } }']),
      L(0, [M, '']),
      L(0, [G, 'jobs'], [M, ':']),
      L(28, [W, 'apply'], [M, ':']),
      L(56, [M, 'runs-on: '], [W, 'ubuntu-latest']),
      L(56, [M, 'environment: '], [W, 'production']),
      L(56, [M, 'permissions: { id-token: '], [G, 'write'], [M, ', contents: read }']),
      L(56, [M, 'steps:']),
      L(84, [M, '- uses: '], [W, 'azure/login@v2']),
      L(112, [M, 'with:']),
      L(140, [M, 'client-id: '], [W, '${{ secrets.AZURE_CLIENT_ID }}']),
      L(140, [M, 'tenant-id: '], [W, '${{ secrets.AZURE_TENANT_ID }}']),
      L(84, [M, '- run: '], [W, 'terraform init -backend-config=prod.hcl']),
      L(84, [M, '- run: '], [W, 'terraform apply -auto-approve tfplan']),
      L(84, [M, '- run: '], [W, './scripts/verify-baseline.sh']),
    ],
  },
  {
    label: 'HARDEN',
    status: 'Ansible · 214 tasks · CIS L1 pass',
    files: ['ansible/hardening.yml', 'inventory.azure_rm.yml', 'roles/cis/'],
    lines: [
      L(0, [M, '- name: '], [W, 'CIS baseline · linux hosts']),
      L(28, [M, 'hosts: '], [W, 'vm_prod']),
      L(28, [M, 'become: '], [G, 'true']),
      L(28, [M, 'vars:']),
      L(56, [M, 'admin_pw: '], [W, "\"{{ lookup('hashi_vault', 'secret/prod/admin') }}\""]),
      L(28, [M, 'roles:']),
      L(56, [M, '- '], [W, 'cis_level_1']),
      L(56, [M, '- '], [W, 'azure_monitor_agent']),
      L(28, [M, 'tasks:']),
      L(56, [M, '- name: '], [W, 'Disable password SSH']),
      L(84, [G, 'lineinfile'], [M, ':']),
      L(112, [M, 'path: '], [W, '/etc/ssh/sshd_config']),
      L(112, [M, 'regexp: '], [W, '"^PasswordAuthentication"']),
      L(112, [M, 'line: '], [W, 'PasswordAuthentication no']),
      L(84, [M, 'notify: '], [W, 'restart sshd']),
    ],
  },
  {
    label: 'OBSERVE',
    status: '12 alerts armed · 365d retention',
    files: ['monitoring/diagnostics.tf', 'alerts.tf', 'workbooks/'],
    lines: [
      L(0, [G, 'resource'], [W, ' "azurerm_log_analytics_workspace" "sec"'], [M, ' {']),
      L(28, [M, 'name              = '], [W, '"law-sec-prod"']),
      L(28, [M, 'retention_in_days = '], [W, '365']),
      L(0, [M, '}']),
      L(0, [M, '']),
      L(0, [G, 'resource'], [W, ' "azurerm_monitor_diagnostic_setting" "nsg"'], [M, ' {']),
      L(28, [M, 'target_resource_id         = '], [W, 'azurerm_network_security_group.deny_all.id']),
      L(28, [M, 'log_analytics_workspace_id = '], [W, 'azurerm_log_analytics_workspace.sec.id']),
      L(28, [M, 'enabled_log { category = '], [W, '"NetworkSecurityGroupEvent"'], [M, ' }']),
      L(0, [M, '}']),
      L(0, [M, '']),
      L(0, [G, 'resource'], [W, ' "azurerm_monitor_metric_alert" "nsg_denies"'], [M, ' {']),
      L(28, [M, 'severity  = '], [W, '1']),
      L(28, [M, 'frequency = '], [W, '"PT1M"']),
      L(28, [M, 'action { action_group_id = '], [W, 'azurerm_monitor_action_group.soc.id'], [M, ' }']),
      L(0, [M, '}']),
    ],
  },
];

const StyledIac = styled.div`
  .code {
    position: absolute;
    top: 140px;
    left: 64px;
    width: 800px;
    bottom: 110px;
    border: 1px solid var(--lightest-navy);
    background: var(--dark-navy);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .tabs {
    height: 44px;
    border-bottom: 1px solid var(--lightest-navy);
    display: flex;
    align-items: center;
    padding: 0 18px;
    gap: 20px;
    font-size: 13px;

    span { color: var(--slate); }
    span:first-child { color: var(--lightest-slate); }
  }

  .lines {
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 16px;
    line-height: 1.5;

    div {
      white-space: pre;
      min-height: 24px;
    }
  }

  .stages {
    position: absolute;
    top: 140px;
    left: 912px;
    right: 64px;
    display: flex;
    flex-direction: column;
    gap: 14px;

    .card {
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .st { font-size: 17px; }
  }
`;

const IacCover = ({ cycle }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!cycle) {
      return undefined;
    }
    const id = setInterval(() => setCurrent(c => (c + 1) % STAGES.length), cycle * 1000);
    return () => clearInterval(id);
  }, [cycle]);

  const stage = STAGES[current];

  return (
    <CoverFrame label="Infrastructure as Code: Terraform plan, policy gate, apply, harden and observe stages">
      <StyledIac>
        <div className="glow" />
        <div className="hd">
          <span className="n">06.</span>
          <span className="t">Hardened Azure, as Code</span>
        </div>
        <div className="sub">Terraform · Ansible · CIS</div>

        <div className="code">
          <div className="tabs">
            {stage.files.map(f => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <div className="lines">
            {stage.lines.map((line, i) => (
              <div key={i} style={{ paddingLeft: `${line.pad}px` }}>
                {line.parts.map(([cls, text], j) => (
                  <span key={j} className={cls}>
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="stages">
          {STAGES.map((s, k) => (
            <button
              key={s.label}
              type="button"
              className={`card${k === current ? ' active' : ''}`}
              onClick={() => setCurrent(k)}
              aria-pressed={k === current}>
              <span className="lb">{s.label}</span>
              <span className="st">{s.status}</span>
            </button>
          ))}
        </div>

        <div className="ft-l">DECLARATIVE · REVIEWED · REPRODUCIBLE</div>
        <div className="ft-r">CIS benchmarks by default</div>
      </StyledIac>
    </CoverFrame>
  );
};

IacCover.propTypes = {
  /** Seconds between automatic stage changes; omit to leave it click-driven. */
  cycle: PropTypes.number,
};

export default IacCover;
