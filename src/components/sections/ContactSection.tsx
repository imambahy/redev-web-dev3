"use client";

import { contactPageContent } from "@/lib/constants/contact";
import { Container } from "@/components/layout/Container";

export function ContactSection() {
  const { info, form } = contactPageContent;

  const email = info.items.find((item) => item.id === "email");
  const donorCare = info.items.find((item) => item.id === "donor-care");
  const whatsapp = info.items.find((item) => item.id === "whatsapp");
  const address = info.items.find((item) => item.id === "address");

  return (
    <section className="bg-primary-light py-section md:py-section-lg">
      <Container>
        <div className="mx-auto w-full max-w-[1176px]">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-4">
              <div className="rounded-2xl bg-surface p-6 shadow-card md:p-8">
                <h2 className="text-xl font-bold leading-snug md:text-2xl">
                  <span className="text-[#003144]">Hubungi Donor Love </span>
                  <span className="text-[#2653ba]">UNICEF</span>
                  <br />
                  <span className="text-[#2653ba]">Indonesia</span>
                </h2>
                <p className="mt-2 text-md font-semibold text-text-muted md:text-base">
                  {info.description}
                </p>

                <hr className="my-6 border-border" />

                <ul className="space-y-5 sm:space-y-6">
                  {email ? (
                    <li>
                      <ContactInfoItem item={email} />
                    </li>
                  ) : null}

                  {donorCare && whatsapp ? (
                    <li className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                      <ContactInfoItem item={donorCare} />
                      <ContactInfoItem item={whatsapp} />
                    </li>
                  ) : null}

                  {address ? (
                    <li>
                      <ContactInfoItem item={address} />
                    </li>
                  ) : null}
                </ul>
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#2653ba] shadow-card">
                <p className="px-1 pt-4 pb-3 text-sm text-white md:px-5 md:pt-2">
                  {info.hours.title}
                </p>
                <div className="w-full rounded-lg bg-white px-5 py-3.5">
                  <p className="text-center text-sm font-semibold text-[#2653ba] md:text-base">
                    {info.hours.schedule}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#2653ba] p-6 md:p-8">
            <h2 className="text-xl font-bold text-white md:text-2xl">
              {form.title}
            </h2>
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <FormField label="Nama Lengkap" id="name" placeholder="Nama Lengkap" />
              <FormField
                label="Email"
                id="email"
                type="email"
                placeholder="nama@gmail.com"
              />
              <FormField
                label="Nomor Handphone (Opsional)"
                id="phone"
                placeholder="08xxxxxxxxxx"
              />
              <FormField label="Topik" id="topic" placeholder="" />
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-white"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Ceritakan bagaimana kami bisa membantu Anda..."
                  className="w-full resize-none rounded-lg bg-white px-4 py-3 text-sm text-text outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark md:text-base"
              >
                {form.submitLabel}
              </button>
            </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

type ContactInfoItemData = (typeof contactPageContent.info.items)[number];

function ContactInfoItem({ item }: { item: ContactInfoItemData }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2653ba] text-white">
        <ContactIcon type={item.id} />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-text-muted">{item.label}</p>
        {"href" in item && item.href ? (
          <a
            href={item.href}
            className="mt-1 block text-sm font-bold text-[#2653ba] hover:underline md:text-base"
          >
            {item.value}
          </a>
        ) : (
          <p
            className={`mt-1 text-sm font-bold leading-relaxed text-[#2653ba] md:text-base ${
              item.id === "address" ? "whitespace-pre-line" : ""
            }`}
          >
            {item.value}
          </p>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  id,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg bg-white px-4 py-3 text-sm text-text outline-none"
      />
    </div>
  );
}

function ContactIcon({ type }: { type: string }) {
  if (type === "email") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6H20V18H4V6ZM20 8L12 13L4 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    );
  }

  if (type === "address" || type === "location") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21C12 21 19 14.2 19 9.5C19 6.46 16.54 4 13.5 4C10.46 4 8 6.46 8 9.5C8 14.2 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 4H9L10 8.5L7.5 10C8.6 12.4 10.6 14.4 13 15.5L14.5 13L19 14V16.5C19 17.3 18.3 18 17.5 18C10.9 18 6 13.1 6 6.5C6 5.7 6.7 5 7.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
