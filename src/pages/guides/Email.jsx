import { useEffect, useState } from "react";
import { GlassCard, GlassButton, InputBox, Icon } from "ifamished-ui";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function EmailGuide() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState(params.get("username") || "");
  const [domain, setDomain] = useState(params.get("domain") || "");
  const [token, setToken] = useState(params.get("token") || "");
  const [password, setPassword] = useState(params.get("password") || "");

  const ready = username && domain && token && password;

  // Sync URL with inputs
  useEffect(() => {
    if (ready) {
      setParams({
        username,
        domain,
        token,
        password,
      });
    }
  }, [username, domain, token, password]);

  // Clear params + reset
  const reset = () => {
    navigate("/guides/email");
    setUsername("");
    setDomain("");
    setToken("");
    setPassword("");
  };

  return (
    <div className="page">
      <div className="page-header fade-in-up">
        <h1>Email Setup Guide</h1>
        <p>Generate a personalized Gmail + Cloudflare SMTP guide.</p>
    </div>

      <section className="section">
        {!ready && (
          <GlassCard className="fade-in-up" style={{ padding: "var(--space-5)" }}>
            <h3>Enter Your Details</h3>
            <p style={{ marginBottom: "var(--space-4)" }}>
              Fill out the fields below to generate a personalized setup guide.
            </p>

            <InputBox
              value={username}
              onChange={setUsername}
              placeholder="Email username (example)"
            />

            <InputBox
              value={domain}
              onChange={setDomain}
              placeholder="Domain (hungernet.ifamished.com)"
            />

            <InputBox
              value={token}
              onChange={setToken}
              placeholder="Cloudflare API Token"
            />

            <InputBox
              value={password}
              onChange={setPassword}
              placeholder="SMTP Password (cfut_...)"
            />

            <GlassButton
              size="md"
              variant="primary"
              style={{ marginTop: "var(--space-4)" }}
            >
              <Icon name="check" size={16} />
              Generate Guide
            </GlassButton>
          </GlassCard>
        )}

        {ready && (
          <GlassCard className="fade-in-up" style={{ padding: "var(--space-5)" }}>
            <div className="section-header">
              <div className="section-label">Your Guide</div>
              <h2>Setup Instructions</h2>
              <p>
                This guide is customized for{" "}
                <strong>{username}@{domain}</strong>.
              </p>
            </div>

            <hr />

            <h3>1. Forwarding Setup</h3>
            <p>
              Before Gmail can send mail using your domain, forwarding must be
              enabled. I will send you a Cloudflare verification email — open it
              and approve the forwarding request.
            </p>

            <hr />

            <h3>2. Add Your Address in Gmail</h3>
            <p>Inside Gmail:</p>

            <ul>
              <li>Settings → See all settings</li>
              <li>Accounts and import</li>
              <li>Send mail as → Add another email address</li>
            </ul>

            <p>Enter:</p>

            <ul>
              <li>Name: anything</li>
              <li>Email: <strong>{username}@{domain}</strong></li>
              <li>Uncheck “Treat as an alias”</li>
            </ul>

            <p>Click <strong>Next</strong> and enter the SMTP details:</p>

            <GlassCard className="smtp-card" style={{ margin: "var(--space-4) 0" }}>
              <pre>
SMTP Server: smtp.mx.cloudflare.net
Port: 465
Username: {token}
Password: {password}
Security: SSL
              </pre>
            </GlassCard>

            <p>
              Click <strong>Add account</strong>.  
              Google will send a verification email — open it and confirm.
            </p>

            <hr />

            <h3>Done!</h3>
            <p>
              You can now send mail from{" "}
              <strong>{username}@{domain}</strong> directly through Gmail using
              Cloudflare’s SMTP service.
            </p>

            <GlassButton
              variant="ghost"
              size="sm"
              style={{ marginTop: "var(--space-4)" }}
              onClick={reset}
            >
              <Icon name="arrowLeft" size={16} />
              Back
            </GlassButton>
          </GlassCard>
        )}
      </section>
    </div>
  );
}
