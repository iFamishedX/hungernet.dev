import { useState } from "react";
import { GlassCard, GlassButton, HeroHeader } from "ifamished-ui";

export default function EmailGuide() {
  const [user, setUser] = useState("");
  const [domain, setDomain] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");

  const generated = user && domain && apiToken && smtpPassword;

  return (
    <div className="page">
      <HeroHeader
        title="Email Setup Guide"
        subtitle="Generate a personalized Gmail + Cloudflare SMTP setup guide."
      />

      <section className="section">
        <GlassCard className="input-card">
          <h3>Input Details</h3>
          <p>Fill in the fields below to generate your custom guide.</p>

          <div className="form-grid">
            <label>
              <span>Email Username</span>
              <input
                type="text"
                placeholder="example"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </label>

            <label>
              <span>Domain</span>
              <input
                type="text"
                placeholder="hungernet.ifamished.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </label>

            <label>
              <span>API Token (Cloudflare SMTP Username)</span>
              <input
                type="text"
                placeholder="api_token"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
              />
            </label>

            <label>
              <span>SMTP Password</span>
              <input
                type="text"
                placeholder="cfut_..."
                value={smtpPassword}
                onChange={(e) => setSmtpPassword(e.target.value)}
              />
            </label>
          </div>

          <GlassButton
            size="md"
            variant="primary"
            onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}
          >
            Generate Guide
          </GlassButton>
        </GlassCard>

        {generated && (
          <GlassCard className="guide-card fade-in-up">
            <h3>Your Personalized Email Setup Guide</h3>

            <p>
              This guide walks you through setting up{" "}
              <strong>{user}@{domain}</strong> to send mail through Gmail using
              Cloudflare’s SMTP service.
            </p>

            <hr />

            <h4>1. Initial Setup</h4>
            <p>
              Before you can do anything in Gmail, I need to set up email
              forwarding on my end. DM me your personal Gmail address. Do{" "}
              <strong>NOT</strong> use a school or work email — it will not work.
            </p>

            <p>
              Once I have your email, I will send you a confirmation email from
              Cloudflare. Open it and accept the forwarding request.
            </p>

            <hr />

            <h4>2. Add Your Email to Gmail</h4>
            <p>Open your personal Gmail inbox and follow these steps:</p>

            <ul>
              <li>Settings → See all settings → Accounts and import</li>
              <li>Send mail as → Add another email address</li>
            </ul>

            <p>Enter:</p>

            <ul>
              <li>Name: anything you want</li>
              <li>Email address: <strong>{user}@{domain}</strong></li>
              <li>Uncheck “Treat as an alias”</li>
            </ul>

            <p>Click <strong>Next</strong> and enter the following SMTP values:</p>

            <GlassCard className="smtp-card">
              <pre>
SMTP Server: smtp.mx.cloudflare.net
Port: 465
Username: {apiToken}
Password: {smtpPassword}
Security: SSL
              </pre>
            </GlassCard>

            <p>
              Click <strong>Add account</strong>.  
              Check your inbox for a verification email from Google and confirm it.
            </p>

            <hr />

            <h4>Done!</h4>
            <p>
              You can now send mail from <strong>{user}@{domain}</strong> directly
              through Gmail using Cloudflare’s SMTP service.
            </p>
          </GlassCard>
        )}
      </section>
    </div>
  );
}
