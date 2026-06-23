import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/marketing";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${BRAND.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" subtitle="Last updated: 2026" />
      <section className="cx-container py-14">
        <Prose>
          <p>
            These Terms of Service govern your access to and use of {BRAND.name},
            operated by {BRAND.operator}. By using the service you agree to these
            terms.
          </p>

          <h2>Your account</h2>
          <p>
            You are responsible for activity under your account and for keeping
            your credentials secure.
          </p>

          <h2>Acceptable use</h2>
          <ul>
            <li>Only publish proof you have the right to display.</li>
            <li>
              Do not upload unlawful, infringing, deceptive or harmful content.
            </li>
            <li>Do not misrepresent testimonials or fabricate proof.</li>
            <li>Do not attempt to disrupt or reverse engineer the service.</li>
          </ul>

          <h2>Your content</h2>
          <p>
            You retain ownership of the content you add. You grant us a license
            to host and display it as needed to operate the service, including
            rendering your published walls and embeds.
          </p>

          <h2>Plans &amp; billing</h2>
          <p>
            Paid plans and lifetime tiers are described on our pricing pages.
            Billing is not live during the MVP. Plan limits apply as stated.
          </p>

          <h2>Disclaimer &amp; liability</h2>
          <p>
            The service is provided “as is” without warranties. To the maximum
            extent permitted by law, {BRAND.operator} is not liable for indirect
            or consequential damages.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email{" "}
            <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>.
          </p>
        </Prose>
      </section>
    </>
  );
}
