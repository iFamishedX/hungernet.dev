import { GlassCard, GlassButton, usePageTitle, Icon } from "ifamished-ui"

const tools = [
  {
    name: "SRV Record Generator",
    description:
      "Generate a valid Minecraft SRV record for Cloudflare DNS. Includes full domain parsing, hostname validation, and instant configuration output.",
    stack: ["DNS", "Minecraft", "Cloudflare"],
    features: [
      "Full domain validation",
      "Automatic SRV name extraction",
      "Cloudflare‑ready output",
      "Instant testing links",
    ],
    link: "/tools/srv-generator",
  },
  {
    name: "Email Setup Guide",
    description:
      "Create a personalized Cloudflare or HungerNet email setup guide. Includes SMTP configuration, Gmail integration, forwarding setup, and API token validation.",
    stack: ["Email", "Cloudflare", "SMTP"],
    features: [
      "Gmail send‑mail‑as setup",
      "Cloudflare routing instructions",
      "API token validation",
      "Masked password display",
    ],
    link: "/tools/email",
  },
  {
    name: "DNS Utilities",
    description:
      "A collection of DNS helpers including domain parsing, hostname validation, and lookup tools. Useful for debugging Minecraft servers and web infrastructure.",
    stack: ["DNS", "Utilities"],
    features: [
      "Domain parsing",
      "Hostname validation",
      "Lookup helpers",
    ],
    link: "/tools/dns",
  },
  {
    name: "SRV Debugger",
    description:
      "Test your SRV record using dig, DNSChecker, and MCSRVStat. Provides instant feedback and troubleshooting tips for common misconfigurations.",
    stack: ["DNS", "Minecraft"],
    features: [
      "dig command output",
      "DNSChecker integration",
      "MCSRVStat testing",
    ],
    link: "/tools/srv-debug",
  },
  {
    name: "Security Tools",
    description:
      "Check DMARC, SPF, DKIM, and general email security posture. Helps ensure your domain is properly authenticated and protected.",
    stack: ["Email", "Security"],
    features: [
      "DMARC inspection",
      "SPF validation",
      "DKIM checks",
    ],
    link: "/tools/security",
  },
]

export default function Tools() {
  usePageTitle("HungerNet | Tools")

  return (
    <div className="page">
      <div className="page-header fade-in-up">
        <h1>Tools</h1>
        <p>Utilities for DNS, email, Minecraft servers, and Hunger SMP infrastructure.</p>
      </div>

      <section className="section">
        <div className="projects-grid stagger">
          {tools.map((t, i) => (
            <GlassCard key={t.name} className="project-card" style={{ "--i": i }}>
              <h3 className="project-title">{t.name}</h3>
              <p className="project-desc">{t.description}</p>

              <div className="project-stack">
                {t.stack.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="project-list">
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <div className="project-links">
                <GlassButton to={t.link} size="sm" variant="primary">
                  <Icon name="arrowRight" size={16} />
                  Open Tool
                </GlassButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  )
}
