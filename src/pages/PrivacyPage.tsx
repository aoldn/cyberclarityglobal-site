import React from "react";

export const PrivacyPage: React.FC = () => (
  <>
    <h1 className="text-3xl md:text-4xl font-semibold text-cyan-300">Privacy Policy</h1>
    <p className="mt-3 text-cyan-200/80 max-w-3xl">
      Last updated: October 2025 <br />
      CyberClarityGlobal (“we”, “our”, “us”) is committed to protecting the privacy and security of the personal information we process.
      This Privacy Policy explains how we collect, use, disclose and safeguard your data when you visit our website or engage our services.
    </p>

    <div className="mt-8 space-y-6 text-cyan-200/80 max-w-4xl leading-relaxed">
      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">1. Introduction</h2>
        <p>
          We are headquartered in the United Kingdom and comply with the UK GDPR and the Data Protection Act 2018.
          We also align our practices with South Africa’s POPIA and U.S. privacy laws such as the CCPA/CPRA.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">2. Information We Collect</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Information you provide directly – e.g., name, company, and contact details.</li>
          <li>Information collected automatically – e.g., IP address, analytics, cookies.</li>
          <li>Information from third parties – e.g., public data or client-provided info for consulting engagements.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">3. How We Use Your Information</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Respond to enquiries and provide cybersecurity and compliance services.</li>
          <li>Manage client relationships and project delivery.</li>
          <li>Improve website performance and service offerings.</li>
          <li>Comply with legal or regulatory obligations.</li>
        </ul>
        <p>We never sell or rent personal data to third parties.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">4. Lawful Basis for Processing</h2>
        <p>
          We process personal data under lawful bases such as consent, contract, legal obligation, and legitimate interest.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">5. U.S. Residents – CCPA/CPRA Rights</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Right to know what data we collect and how it’s used.</li>
          <li>Right to access, correct, or delete personal information.</li>
          <li>Right to opt out of data sale or sharing (we do not sell data).</li>
          <li>Right to non-discrimination for exercising privacy rights.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">6. Data Retention</h2>
        <p>
          We retain data only as long as necessary for the purposes collected and securely delete or anonymise when no longer required.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">7. Data Sharing and Transfers</h2>
        <p>
          We may share limited data with Microsoft 365 (email), Vercel (hosting), and analytics providers. 
          International transfers are protected through Standard Contractual Clauses and equivalent safeguards.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">8. Data Security</h2>
        <p>
          We employ technical and organisational measures to secure your data — including encryption, access control, and monitoring.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">9. Your Rights</h2>
        <p>
          You may have the right to access, correct, delete, restrict or object to the processing of your personal data. 
          To exercise these rights, email <span className="text-cyan-400">privacy@cyberclarityglobal.com</span>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">10. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies to improve site performance and analytics. You can manage cookie preferences via your browser or our cookie settings tool.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">11. Contact Us</h2>
        <p>
          For any questions regarding this Privacy Policy, please contact us at 
          <span className="text-cyan-400"> privacy@cyberclarityglobal.com</span>.
        </p>
      </section>
    </div>
  </>
);
