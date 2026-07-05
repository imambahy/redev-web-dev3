import type { CampaignDetail } from "@/types/campaign";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format-currency";
import { routes } from "@/lib/constants/routes";

type CampaignQuoteSectionProps = {
  campaign: CampaignDetail;
};

export function CampaignQuoteSection({ campaign }: CampaignQuoteSectionProps) {
  return (
    <section className="bg-surface py-12 md:py-16">
      <Container>
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="text-xl font-medium leading-relaxed text-primary md:text-2xl lg:text-3xl">
            &ldquo;{campaign.quote}&rdquo;
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-text-muted md:text-base">
            {campaign.quoteDescription}
          </p>
        </blockquote>
      </Container>
    </section>
  );
}

type CampaignProgressSectionProps = {
  campaign: CampaignDetail;
};

export function CampaignProgressSection({
  campaign,
}: CampaignProgressSectionProps) {
  const progress = Math.round(
    (campaign.stats.raised / campaign.stats.goal) * 100,
  );

  return (
    <section className="bg-primary-light py-12 md:py-16">
      <Container>
        <div className="rounded-2xl bg-primary-light p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-text md:text-2xl">
                Perkembangan sampai saat ini
              </h2>
              <p className="mt-2 max-w-xl text-sm text-text-muted md:text-base">
                Setiap bulannya, UNICEF akan mengirimkan laporan terkini lewat
                e-mail Anda tentang program-program yang dapat terlaksana berkat
                donasi Anda.
              </p>
            </div>
            <LinkButton
              href={routes.campaign(campaign.id)}
              shape="pill"
              className="shrink-0"
            >
              Bantu Sekarang
            </LinkButton>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StatCard
              label="Orang Berdonasi"
              value={campaign.stats.donors.toLocaleString("id-ID")}
              note={`Berdasarkan laporan terakhir ${campaign.stats.lastReportDate}`}
            />
            <StatCard
              label="Dana Terkumpul"
              value={formatCurrency(campaign.stats.raised)}
              note={`${progress}% dari ${formatCurrency(campaign.stats.goal)}`}
              progress={progress}
            />
            <StatCard
              label="Waktu Tersisa"
              value={`${campaign.stats.daysLeft} Hari`}
              note={`Akan berakhir pada ${campaign.stats.endDate}`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatCard({
  label,
  value,
  note,
  progress,
}: {
  label: string;
  value: string;
  note: string;
  progress?: number;
}) {
  return (
    <div className="rounded-xl bg-hero-overlay p-5 text-white">
      <p className="text-sm text-white/80">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {typeof progress === "number" ? (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
      <p className="mt-3 text-xs text-white/70">{note}</p>
    </div>
  );
}
