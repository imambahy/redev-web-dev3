import { LinkButton } from "@/components/ui/Button";
import { ContentImage } from "@/components/ui/ContentImage";
import { Container } from "@/components/layout/Container";
import { routes } from "@/lib/constants/routes";

export function DonorTrustSection() {
  return (
    <section
      aria-labelledby="donor-trust-heading"
      className="bg-surface py-section md:py-section-lg"
    >
      <Container>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-12">
          <div className="w-full max-w-md shrink-0">
            <h2
              id="donor-trust-heading"
              className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
            >
              <span className="text-primary">100%</span>{" "}
              <span className="text-text">Didanai Donatur</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-text-muted md:text-base">
              Seluruh kerja UNICEF untuk anak-anak berjalan sepenuhnya dari
              donasi sukarela. Lihat bagaimana donasi Anda digunakan untuk
              mendanai program penting yang meningkatkan kehidupan anak-anak
              yang rentan.
            </p>
            <div className="mt-6">
              <LinkButton href={routes.donationGuide} shape="pill">
                Lihat Penggunaan Donasi
              </LinkButton>
            </div>
          </div>

          <div className="w-full max-w-xs shrink-0 sm:max-w-sm md:max-w-md lg:max-w-lg">
            <ContentImage
              src="/images/donor-trust/puzzle-collage.png"
              alt="Kolase foto anak-anak dan keluarga dalam bentuk puzzle"
              fit="contain"
              width={640}
              height={640}
              className="w-full"
              sizes="(max-width: 1024px) 80vw, 28rem"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
