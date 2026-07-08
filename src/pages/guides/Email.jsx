import { useState } from "react";
import { GlassCard, GlassButton, HeroHeader, InputBox } from "ifamished-ui";

export default function EmailGuide() {
  const [user, setUser] = useState("");
  const [domain, setDomain] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");

  const ready = user && domain && apiToken && smtpPassword;

  return (
    <div className="page">
      <HeroHeader
        title="Email Setup Guide"
        subtitle="Generate a personalized Gmail + Cloudflare SMTP guide."
      />

      <section className="section">
        <GlassCard className="guide-input-card">
          <h3>Enter Your Details</h3>
          <p>These values will be used to generate your custom guide.</p>

          <InputBox
            value={user}
            onChange={setUser}
            placeholder="Email username (example)"
          />

          <InputBox
            value={domain}
            onChange={setDomain}
            placeholder="Domain (hungernet.ifamished.com)"
          />

          <InputBox
            value={apiToken}
            onChange={setApiToken}
            placeholder="Cloudflare API Token (SMTP username)"
          />

          <InputBox
            value={smtpPassword}
            onChange={setSmtpPassword}
            placeholder="SMTP Password (cfut_...)"
          />

          <GlassButton
            size="md"
            variant="primary"
            onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}
          >
            Generate Guide
          </GlassButton>
        </GlassCard>

        {ready && (
          <GlassCard className="generated-guide fade-in-up">
            <h3>Your Personalized Guide</h3>

            <p>
              This guide is for: <strong>{user}@{domain}</strong>
            </p>

            <hr />

            <h4>1. Initial Setup</h4>
            <p>
              DM me your personal Gmail address. Do <strong>NOT</strong> use a
              school or work email — it will not work.
            </p>

            <p>
              You will receive a Cloudflare forwarding confirmation email. Open
              it and accept the request.
            </p>

            <hr />

            <h4>2. Add Your Email to Gmail</h4>

            <ul>
              <li>Settings → See all settings → Accounts and import</li>
              <li>Send mail as → Add another email address</li>
            </ul>

            <p>Enter:</p>

            <ul>
              <li>Name: anything</li>
              <li>Email address: <strong>{user}@{domain}</strong></li>
              <li>Uncheck “Treat as an alias”</li>
            </ul>

            <p>Click <strong>Next</strong> and enter:</p>

            <GlassCard className="smtp-values">
              <pre>
SMTP Server: smtp.mx.cloudflare.net
Port: 465
Username: {apiToken}
Password: {smtpPassword}
Security: SSL
              </pre>
            </GlassCard>

            <p>
              Click <strong>Add account</strong> and verify the email Google
              sends you.
            </p>

            <hr />

            <h4>Done!</h4>
            <p>
              You can now send mail from <strong>{user}@{domain}</strong> using
              Gmail + Cloudflare SMTP.
            </p>
          </GlassCard>
        )}
      </section>
    </div>
  );
}
