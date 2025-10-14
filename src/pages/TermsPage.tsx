import React from "react";

export const TermsPage: React.FC = () => (
  <div className="text-cyan-200/80 max-w-4xl mx-auto leading-relaxed mt-12 px-4">
    <h1 className="text-3xl md:text-4xl font-semibold text-cyan-300">Terms of Service</h1>
    <p className="mt-3 text-cyan-200/80 max-w-3xl">
      Last updated: October 2025
    </p>

    <p className="mt-6">
      Welcome to <strong>CyberClarityGlobal</strong> (“we”, “us”, or “our”). These Terms of Service (“Terms”)
      govern your access to and use of our website (<strong>www.cyberclarityglobal.com</strong>) and any
      related services, products, or content (collectively, the “Services”). By accessing or using our
      Services, you agree to comply with and be bound by these Terms. If you do not agree, you must not
      use our Services.
    </p>

    <div className="mt-8 space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">1. Who We Are</h2>
        <p>
          CyberClarityGlobal is a cybersecurity and compliance consultancy based in the United Kingdom.
          We deliver advisory, assessment, and compliance services to organisations globally.
        </p>
        <p className="mt-3">
          📧 <strong>Contact:</strong> hello@cyberclarityglobal.com <br />
          🌐 <strong>Website:</strong> www.cyberclarityglobal.com
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">2. Scope of Services</h2>
        <p>
          Our Services include, but are not limited to cybersecurity posture assessments, policy and
          compliance kit development, and third-party risk management advisory. All Services are provided
          for informational and professional purposes only and do not constitute legal advice. We reserve
          the right to modify or discontinue any part of our Services at any time without notice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">3. Use of Services</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Use our Services only for lawful purposes and in compliance with these Terms.</li>
          <li>Do not reproduce, distribute, or modify our materials without prior written consent.</li>
          <li>Do not interfere with or attempt to gain unauthorised access to our systems or data.</li>
          <li>Do not use the Services to violate any applicable laws or regulations.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">4. Client Responsibilities</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Provide accurate and complete information during engagements.</li>
          <li>Cooperate with our team and respond promptly to requests.</li>
          <li>
            Ensure that implementation of our recommendations is performed by authorised personnel within
            your organisation.
          </li>
        </ul>
        <p className="mt-2">
          We are not liable for outcomes resulting from incomplete or inaccurate information provided by
          you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">5. Fees and Payment</h2>
        <p>
          Fees and payment terms are agreed prior to the start of an engagement. Invoices are payable
          within the period stated on the invoice or contract. Late payments may incur statutory interest
          under the <em>Late Payment of Commercial Debts (Interest) Act 1998</em>. All fees are exclusive
          of VAT unless otherwise specified.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">6. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any information exchanged during an engagement and to use
          such information solely for fulfilling contractual obligations. Confidentiality does not apply to
          information that is public, already known to the recipient, or required to be disclosed by law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">7. Intellectual Property</h2>
        <p>
          All deliverables, reports, templates, and other materials created by CyberClarityGlobal remain
          our intellectual property unless otherwise agreed in writing. You are granted a limited,
          non-exclusive licence to use deliverables internally for your business. Redistribution or resale
          is prohibited without written consent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, CyberClarityGlobal shall not be liable for indirect,
          incidental, or consequential damages, including loss of profits, business, or data. Our total
          liability for any claim shall not exceed the total fees paid for the specific engagement giving
          rise to that claim. Nothing in these Terms limits liability for death, personal injury, or fraud.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">9. No Guarantee</h2>
        <p>
          While we apply due care and industry best practices, we do not guarantee that implementing our
          recommendations will prevent all cyber incidents or compliance failures.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">10. Termination</h2>
        <p>
          Either party may terminate an engagement with written notice. Upon termination, you agree to pay
          for all Services rendered up to the termination date. Clauses on confidentiality, intellectual
          property, limitation of liability, and governing law shall survive termination.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">11. Governing Law and Jurisdiction</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of England and Wales. Both
          parties agree to submit to the exclusive jurisdiction of the courts of England and Wales for any
          dispute arising under or in connection with these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">12. Changes to These Terms</h2>
        <p>
          We may update these Terms periodically. The most recent version will always be published on this
          page. Continued use of our Services after updates constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-cyan-300">13. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:{" "}
          <strong>hello@cyberclarityglobal.com</strong>.
        </p>
      </section>
    </div>
  </div>
);

export default TermsPage;
