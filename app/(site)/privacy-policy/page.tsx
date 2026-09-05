import { Grid } from "../../_components/Grid";

const sections: { title: string; content: React.ReactNode }[] = [
  {
    title: "1. Data Controller",
    content: (
      <>
        <p className="mb-6">
          The data controller responsible for the processing of personal
          information collected through this website is:
        </p>
        <p className="mb-6">
          An Studio
          <br />
          Email:{" "}
          <a href="mailto:an@byanstudio.com" className="underline decoration-1">
            an@byanstudio.com
          </a>
          <br />
          Website: [byanstudio.com]
        </p>
        <p>
          For any questions regarding this Privacy Policy or the processing
          of your personal data, you may contact us using the email address
          above.
        </p>
      </>
    ),
  },
  {
    title: "2. Personal Information We Collect",
    content: (
      <>
        <p className="mb-6">
          We may collect personal information when you voluntarily provide
          it to us through the website, by email or through other forms of
          communication.
        </p>
        <p className="mb-6">
          This information may include your name, email address, telephone
          number, company or brand name, website, social media profiles,
          project information, estimated budget, preferred timeline,
          services of interest and any other information you choose to
          include when contacting us or submitting a client application.
        </p>
        <p className="mb-6">
          When you visit the website, certain technical information may
          also be collected automatically. This can include your IP
          address, browser type, device type, operating system,
          approximate location, pages visited, time spent on the website
          and information about how you interact with the site.
        </p>
        <p>
          This technical information may be collected through cookies or
          similar technologies, subject to your consent where required by
          applicable law.
        </p>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <>
        <p className="mb-6">
          Personal information collected through this website may be used
          to respond to inquiries, review project applications, evaluate
          whether a potential project is suitable for An Studio, prepare
          proposals, communicate with prospective and existing clients,
          provide contracted creative services and manage ongoing client
          relationships.
        </p>
        <p className="mb-6">
          We may also use your information for administrative purposes,
          including invoicing, accounting, project management, internal
          records and compliance with legal or regulatory obligations.
        </p>
        <p className="mb-6">
          Where you have provided your consent, we may use your email
          address to send newsletters, studio updates, project
          announcements, availability notices or other communications
          relating to An Studio.
        </p>
        <p>
          We will not use your personal information for purposes that are
          incompatible with those described in this Privacy Policy without
          providing additional information or obtaining your consent where
          required.
        </p>
      </>
    ),
  },
  {
    title: "4. Legal Basis for Processing",
    content: (
      <>
        <p className="mb-6">
          Where the General Data Protection Regulation (GDPR) applies, An
          Studio processes personal data on one or more of the following
          legal bases.
        </p>
        <p className="mb-6">
          Processing may be necessary to take steps at your request before
          entering into a contract, such as when you submit a project
          inquiry or request information about our services.
        </p>
        <p className="mb-6">
          Processing may also be necessary for the performance of a
          contract when you become a client of An Studio.
        </p>
        <p className="mb-6">
          In certain circumstances, we may process information on the
          basis of our legitimate interests, including responding to
          professional inquiries, maintaining the security of our website,
          improving our services and managing our business operations,
          provided those interests do not override your fundamental rights
          and freedoms.
        </p>
        <p className="mb-6">
          Where required, we will rely on your consent, particularly in
          relation to certain marketing communications, cookies and
          analytics technologies.
        </p>
        <p>
          We may also process personal data when necessary to comply with
          legal obligations applicable to An Studio.
        </p>
      </>
    ),
  },
  {
    title: "5. Project Applications and Client Inquiries",
    content: (
      <>
        <p className="mb-6">
          When you submit a client application or contact An Studio
          regarding a potential project, the information you provide will
          be used to understand your business, project requirements,
          goals, timing and budget.
        </p>
        <p className="mb-6">
          Submitting an inquiry does not create a contractual relationship
          between you and An Studio and does not guarantee project
          availability or acceptance.
        </p>
        <p>
          The information contained in unsuccessful or inactive project
          inquiries may be retained for a reasonable period in case you
          contact us again, unless you request its deletion or applicable
          law requires a different retention period.
        </p>
      </>
    ),
  },
  {
    title: "6. Email Communications and Newsletters",
    content: (
      <>
        <p className="mb-6">
          If you subscribe to our newsletter or otherwise consent to
          receive marketing communications, we may send you occasional
          emails relating to studio news, services, recent projects,
          availability or other relevant updates.
        </p>
        <p className="mb-6">
          You may withdraw your consent at any time by using the
          unsubscribe option included in our communications or by
          contacting us directly.
        </p>
        <p className="mb-6">
          Withdrawing your consent will not affect the lawfulness of any
          processing carried out before the withdrawal.
        </p>
        <p>
          Transactional or service-related communications, such as
          messages concerning an active project, proposal, invoice or
          contractual relationship, are not considered marketing
          communications and may continue where necessary.
        </p>
      </>
    ),
  },
  {
    title: "7. Cookies and Analytics",
    content: (
      <>
        <p className="mb-6">
          This website may use cookies and similar technologies to ensure
          that the website functions correctly, remember preferences,
          understand how visitors use the website and improve its
          performance and user experience.
        </p>
        <p className="mb-6">
          Some cookies may be strictly necessary for the operation of the
          website, while others may be used for analytics, functionality
          or marketing purposes.
        </p>
        <p className="mb-6">
          Where required by law, non-essential cookies will only be
          activated after obtaining your consent.
        </p>
        <p className="mb-6">
          You may manage or withdraw your cookie preferences at any time
          through the cookie settings available on the website or through
          your browser settings.
        </p>
        <p>
          For additional information about the cookies used on this
          website, please refer to our Cookie Policy.
        </p>
      </>
    ),
  },
  {
    title: "8. Third-Party Services",
    content: (
      <>
        <p className="mb-6">
          An Studio may use trusted third-party service providers to
          operate the website and manage certain aspects of our business.
        </p>
        <p className="mb-6">
          These providers may include website hosting platforms, email
          services, analytics tools, newsletter platforms, cloud storage
          providers, project management systems, payment processors or
          other professional software used in connection with our
          services.
        </p>
        <p className="mb-6">
          These third parties may process personal data only to the extent
          necessary to provide their services and are expected to handle
          personal information in accordance with applicable data
          protection requirements.
        </p>
        <p>
          Where a third-party provider acts as an independent data
          controller, its own privacy policy will apply to its processing
          activities.
        </p>
      </>
    ),
  },
  {
    title: "9. International Data Transfers",
    content: (
      <>
        <p className="mb-6">
          Some service providers used by An Studio may process or store
          personal information outside the European Economic Area.
        </p>
        <p className="mb-6">
          Where personal data is transferred internationally, we take
          appropriate measures to ensure that the transfer is carried out
          in accordance with applicable data protection law.
        </p>
        <p>
          Such measures may include the use of adequacy decisions approved
          by the European Commission, Standard Contractual Clauses or
          other legally recognized safeguards.
        </p>
      </>
    ),
  },
  {
    title: "10. Data Retention",
    content: (
      <>
        <p className="mb-6">
          We retain personal data only for as long as reasonably necessary
          to fulfil the purposes for which it was collected, maintain our
          professional and contractual relationships, comply with legal
          obligations and resolve potential disputes.
        </p>
        <p className="mb-6">
          The specific retention period will depend on the nature of the
          information and the reason it was collected.
        </p>
        <p className="mb-6">
          Information relating to contractual relationships, invoices or
          accounting records may be retained for the periods required
          under applicable tax, accounting and commercial legislation.
        </p>
        <p>
          Marketing information will generally be retained until you
          withdraw your consent or request to stop receiving
          communications.
        </p>
      </>
    ),
  },
  {
    title: "11. Your Data Protection Rights",
    content: (
      <>
        <p className="mb-6">
          Under applicable data protection legislation, including the
          GDPR where relevant, you may have the right to request access to
          the personal information we hold about you.
        </p>
        <p className="mb-6">
          You may also have the right to request the correction of
          inaccurate or incomplete information, request deletion of your
          personal data, request restriction of processing, object to
          certain forms of processing and request the portability of your
          personal information.
        </p>
        <p className="mb-6">
          Where processing is based on consent, you have the right to
          withdraw that consent at any time.
        </p>
        <p className="mb-6">
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:an@byanstudio.com" className="underline decoration-1">
            an@byanstudio.com
          </a>
          . We may request reasonable information to verify your identity
          before processing your request.
        </p>
        <p>
          You also have the right to lodge a complaint with the competent
          data protection authority. If you are located in Spain, the
          relevant supervisory authority is the Spanish Data Protection
          Agency (Agencia Española de Protección de Datos — AEPD).
        </p>
      </>
    ),
  },
  {
    title: "12. Security of Personal Information",
    content: (
      <>
        <p className="mb-6">
          We take reasonable technical and organizational measures to
          protect personal information against unauthorized access,
          alteration, disclosure, loss or misuse.
        </p>
        <p>
          However, no electronic transmission or digital storage system
          can guarantee absolute security. While we take appropriate
          precautions to protect the information entrusted to us, users
          should also take reasonable steps to protect their own personal
          information when communicating online.
        </p>
      </>
    ),
  },
  {
    title: "13. Links to Third-Party Websites",
    content: (
      <>
        <p className="mb-6">
          Our website may contain links to third-party websites,
          platforms, social networks or other external services.
        </p>
        <p className="mb-6">
          An Studio is not responsible for the privacy practices, content
          or security of third-party websites. We encourage users to
          review the privacy policies of any external website they visit.
        </p>
        <p>
          The inclusion of a third-party link on our website does not
          necessarily imply endorsement of that third party or its privacy
          practices.
        </p>
      </>
    ),
  },
  {
    title: "14. Social Media",
    content: (
      <>
        <p className="mb-6">
          An Studio may maintain profiles on third-party social media
          platforms.
        </p>
        <p className="mb-6">
          When you interact with An Studio through platforms such as
          Instagram, Pinterest, LinkedIn or other social networks, the
          platform itself may collect and process personal information
          according to its own privacy policy and terms of service.
        </p>
        <p>
          An Studio does not control the data processing practices of
          these third-party platforms.
        </p>
      </>
    ),
  },
  {
    title: "15. Children’s Privacy",
    content: (
      <>
        <p className="mb-6">
          This website and the services offered by An Studio are directed
          toward businesses, professionals and adult users.
        </p>
        <p>
          We do not knowingly collect personal information from children.
          If we become aware that personal information relating to a
          minor has been submitted without appropriate authorization, we
          will take reasonable steps to delete it where required.
        </p>
      </>
    ),
  },
  {
    title: "16. Changes to This Privacy Policy",
    content: (
      <>
        <p className="mb-6">
          We may update this Privacy Policy from time to time to reflect
          changes to our services, website functionality, legal
          requirements or data processing practices.
        </p>
        <p className="mb-6">
          Any updated version will be published on this page and the date
          at the top of the Privacy Policy will be revised accordingly.
        </p>
        <p>
          We encourage visitors to review this page periodically to
          remain informed about how An Studio handles personal
          information.
        </p>
      </>
    ),
  },
  {
    title: "17. Contact",
    content: (
      <>
        <p className="mb-6">
          If you have any questions about this Privacy Policy, how your
          personal information is processed or how to exercise your data
          protection rights, you may contact us at:
        </p>
        <p className="mb-6">
          An Studio
          <br />
          Email:{" "}
          <a href="mailto:an@byanstudio.com" className="underline decoration-1">
            an@byanstudio.com
          </a>
          <br />
          Website: [byanstudio.com]
        </p>
        <p>
          We are committed to handling personal information responsibly,
          transparently and with the same level of care and intention
          that we bring to every aspect of our work.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 pb-[30px]">
      <Grid className="items-start">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4 min-[1200px]:pt-[50vh] min-[1200px]:-translate-y-10 mb-16 min-[1200px]:mb-0">
          <p className="text-[32px] min-[1200px]:text-[clamp(24px,1.875vw,36px)]">Privacy Policy</p>
          <p className="italic text-[20px] min-[1200px]:text-[clamp(18px,1.25vw,24px)]">Last updated: [August, 2026]</p>
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-17 min-[1200px]:pt-[50vh] min-[1200px]:-translate-y-10 text-[16px] leading-snug">
          <p className="mb-10">
            At An Studio, we value your privacy and are committed to
            protecting the personal information you share with us. This
            Privacy Policy explains how we collect, use, store and protect
            personal data when you visit our website, contact us, submit a
            project inquiry, subscribe to communications or otherwise
            interact with An Studio.
            <br />
            By using this website, you acknowledge that you have read and
            understood the practices described in this Privacy Policy.
          </p>

          {sections.map((section, i) => (
            <div
              key={section.title}
              className={i === sections.length - 1 ? "" : "mb-10"}
            >
              <p className="underline decoration-1 mb-4">{section.title}</p>
              {section.content}
            </div>
          ))}
        </div>
      </Grid>
    </main>
  );
}
