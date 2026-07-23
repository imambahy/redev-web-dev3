import { Container } from "@/components/layout/Container";
import { privacyPolicyPageContent } from "@/lib/constants/privacy-policy";

export function PrivacyPolicySection() {
  const { intro, sections } = privacyPolicyPageContent;

  return (
    <section className="bg-surface pb-14 md:pb-20">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-text md:text-base">
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-text-muted">
              {paragraph}
            </p>
          ))}

          {sections.map((section) => (
            <div key={section.id} className="space-y-4">
              <h2 className="text-lg font-bold text-text md:text-xl">
                {section.title}
              </h2>

              {"items" in section && section.items ? (
                <ul className="list-disc space-y-3 pl-5 text-text-muted">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <span className="font-semibold text-text">{item.label}</span>
                      {" — "}
                      {item.text}
                    </li>
                  ))}
                </ul>
              ) : null}

              {"paragraphs" in section && section.paragraphs
                ? section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-text-muted">
                      {paragraph}
                    </p>
                  ))
                : null}

              {"bullets" in section && section.bullets ? (
                <ul className="list-disc space-y-2 pl-5 text-text-muted">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
