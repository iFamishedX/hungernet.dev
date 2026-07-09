import { useEffect, useState } from "react";
import {
  CopyField,
  GlassCard,
  GlassButton,
  InputBox,
  FaqAccordion,
  Icon,
} from "ifamished-ui";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SRVGenerator() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  // Fields
  const [subdomain, setSubdomain] = useState(params.get("subdomain") || "");
  const [hostname, setHostname] = useState(params.get("hostname") || "");
  const [port, setPort] = useState(params.get("port") || "");

  // Guide visibility
  const [generated, setGenerated] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Validation
  const validSub = /^[a-zA-Z0-9.-]+$/.test(subdomain);
  const validHost = /^[a-zA-Z0-9.-]+$/.test(hostname);
  const validPort = /^\d+$/.test(port) && Number(port) > 0 && Number(port) <= 65535;

  const ready = validSub && validHost && validPort;

  const generate = () => {
    if (!ready) {
      setShowErrors(true);
      return;
    }

    setParams({
      subdomain,
      hostname,
      port,
    });

    setGenerated(true);
  };

  const reset = () => {
    navigate("/tools/srv");
    setSubdomain("");
    setHostname("");
    setPort("");
    setGenerated(false);
    setShowErrors(false);
  };

  return (
    <div className="page">
      <div className="page-header fade-in-up">
        <h1>Minecraft SRV Generator</h1>
        <p>Generate a valid SRV record for Minecraft servers.</p>
      </div>

      <section className="section">
        {!generated && (
          <GlassCard className="fade-in-up" style={{ padding: "var(--space-5)" }}>
            <h3>Enter Your Details</h3>
            <p style={{ marginBottom: "var(--space-4)" }}>
              Fill out the fields below to generate your SRV record.
            </p>

            <div className="input-row">
              <div className="input-field">
                <div className="input-wrapper">
                  <InputBox
                    value={subdomain}
                    onChange={setSubdomain}
                    placeholder="Subdomain (play.example.com)"
                  />
                  {showErrors && !validSub && (
                    <div className="input-error">Invalid subdomain</div>
                  )}
                </div>
              </div>

              <div className="input-field">
                <div className="input-wrapper">
                  <InputBox
                    value={hostname}
                    onChange={setHostname}
                    placeholder="Target Host (mc.example.com)"
                  />
                  {showErrors && !validHost && (
                    <div className="input-error">Invalid hostname</div>
                  )}
                </div>
              </div>

              <div className="input-field">
                <div className="input-wrapper">
                  <InputBox
                    value={port}
                    onChange={setPort}
                    placeholder="Port (25565)"
                  />
                  {showErrors && !validPort && (
                    <div className="input-error">Port must be 1–65535</div>
                  )}
                </div>
              </div>
            </div>

            <GlassButton size="md" variant="primary" onClick={generate}>
              <Icon name="check" size={16} />
              Generate SRV
            </GlassButton>
          </GlassCard>
        )}

        {generated && (
          <GlassCard className="fade-in-up" style={{ padding: "var(--space-5)" }}>
            <div className="section-header">
              <div className="section-label">SRV Record</div>
              <h2>Your Configuration</h2>
              <p>
                SRV record for <strong>{subdomain}</strong>.
              </p>
            </div>

            <div className="faq-list stagger" style={{ marginTop: "var(--space-5)" }}>
              <FaqAccordion
                q="1. DNS Record"
                a={
                  <>
                    <p>Add a new SRV record in Cloudflare DNS:</p>

                    <div className="smtp-grid">
                      <CopyField label="Type" value="SRV" />
                      <CopyField label="Service" value="_minecraft" />
                      <CopyField label="Protocol" value="_tcp" />
                      <CopyField label="Name" value={subdomain} />
                      <CopyField label="Target" value={hostname} />
                      <CopyField label="Port" value={port} />
                      <CopyField label="Priority" value="0" />
                      <CopyField label="Weight" value="0" />
                    </div>

                    <p style={{ marginTop: "var(--space-3)" }}>
                      Save the record. DNS propagation may take up to 5 minutes.
                    </p>
                  </>
                }
              />

              <FaqAccordion
                q="2. Testing"
                a={
                  <>
                    <p>You can test your SRV record using:</p>
                    <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
                      <li>mcsrvstat.org</li>
                      <li>dnschecker.org</li>
                      <li>dig command</li>
                    </ul>
                  </>
                }
              />

              <FaqAccordion
                q="3. Finished"
                a={
                  <>
                    <p>
                      Players can now join using{" "}
                      <strong>{subdomain.replace(/\.$/, "")}</strong> without typing a port.
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
