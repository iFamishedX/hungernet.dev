import { useEffect, useState } from "react";
import {
  GlassCard,
  GlassButton,
  InputBox,
  FaqAccordion,
  Icon,
} from "ifamished-ui";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function EmailGuide() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  // Fields
  const [email, setEmail] = useState(params.get("email") || "");
  const [name, setName] = useState(params.get("name") || "");
  const [token, setToken] = useState(params.get("token") || "");
  const [password, setPassword] = useState(params.get("password") || "");

  // Parsed email
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("");

  // Guide visibility
  const [generated, setGenerated] = useState(false);

  // Parse email when changed
  useEffect(() => {
    if (!email.includes("@")) {
      setUsername("");
      setDomain("");
      return;
    }

    const [user, dom] = email.split("@");
    setUsername(user || "");
    setDomain(dom || "");
  }, [email]);

  // If URL params exist → auto-generate
  useEffect(() => {
    if (params.get("email") && params.get("token") && params.get("password")) {
      setGenerated(true);
    }
  }, []);

  // Validate email
  const validEmail =
    email.includes("@") &&
    email.split("@")[0].length > 0 &&
    email.split("@")[1].includes(".");

  const ready = validEmail && name && token && password;

  const generateGuide = () => {
    if (!ready) return;

    setParams({
      email,
      name,
      token,
      password,
    });

    setGenerated(true);
  };

  const reset = () => {
    navigate("/guides/email");
    setEmail("");
    setName("");
    setToken("");
    setPassword("");
    setGenerated(false);
  };

  return (
    <div className="page">
      <div className="page-header fade-in-up">
        <h1>Email Setup Guide</h1>
        <p>Generate a personalized Gmail + Cloudflare SMTP guide.</p>
    </div>

      <section className="section">
        {!generated && (
          <GlassCard className="fade-in-up" style={{ padding: "var(--space-5)" }}>
            <h3>Enter Your Details</h3>
            <p style={{ marginBottom: "var(--space-4)" }}>
              Fill out the fields below to generate a personalized setup guide.
            </p>

            <InputBox
              value={email}
              onChange={setEmail}
              placeholder="Email (example@hungernet.ifamished.com)"
            />

            <InputBox
              value={name}
              onChange={setName}
              placeholder="Name (Display name in Gmail)"
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
              disabled={!ready}
              onClick={generateGuide}
            >
              <Icon name="check" size={16} />
              Generate Guide
            </GlassButton>
          </GlassCard>
        )}

        {generated && (
          <GlassCard className="fade-in-up" style={{ padding: "var(--space-5)" }}>
            <div className="section-header">
              <div className="section-label">Setup Guide</div>
              <h2>Your Configuration</h2>
              <p>
                This guide is customized for{" "}
                <strong>{email}</strong>.
              </p>
            </div>

            <div className="faq-list stagger" style={{ marginTop: "var(--space-5)" }}>
              <FaqAccordion
                q="1. Forwarding Setup"
                a={
                  <>
                    <p>
                      Before Gmail can send mail using your domain, forwarding must be
                      enabled. You will receive a Cloudflare verification email — open it
                      and approve the forwarding request.
                    </p>
                  </>
                }
              />

              <FaqAccordion
                q="2. Add Your Address in Gmail"
                a={
                  <>
                    <p>Inside Gmail:</p>
                    <ul>
                      <li>Settings → See all settings</li>
                      <li>Accounts and import</li>
                      <li>Send mail as → Add another email address</li>
                    </ul>

                    <p>Enter:</p>
                    <ul>
                      <li>Name: <strong>{name}</strong></li>
                      <li>Email: <strong>{email}</strong></li>
                      <li>Uncheck “Treat as an alias”</li>
                    </ul>
                  </>
                }
              />

              <FaqAccordion
                q="3. SMTP Configuration"
                a={
                  <>
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
                      Click <strong>Add account</strong>. Google will send a verification
                      email — open it and confirm.
                    </p>
                  </>
                }
              />

              <FaqAccordion
                q="4. Finished"
                a={
                  <>
                    <p>
                      You can now send mail from{" "}
                      <strong>{email}</strong> directly through Gmail using Cloudflare’s
                      SMTP service.
                    </p>
                  </>
                }
              />
            </div>

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
