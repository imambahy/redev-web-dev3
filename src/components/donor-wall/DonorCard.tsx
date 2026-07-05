import Image from "next/image";
import type { DonorWallEntry } from "@/lib/constants/donor-wall";
import { donorWallPageContent } from "@/lib/constants/donor-wall";
import { ContentImage } from "@/components/ui/ContentImage";

type DonorCardProps = {
  entry: DonorWallEntry;
};

export function DonorCard({ entry }: DonorCardProps) {
  const { cardHeaderImageSrc } = donorWallPageContent;

  return (
    <article className="relative flex h-[492px] w-[384px] max-w-full flex-col overflow-hidden rounded-3xl bg-[#294994] shadow-card">
      <div className="relative h-[164px] shrink-0 px-4 pt-5 text-center">
        <Image
          src={cardHeaderImageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="384px"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#294994]/85" aria-hidden="true" />
        <p className="relative z-10 text-xl font-semibold text-white">
          {entry.yearsLabel}
        </p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center rounded-t-[24px] bg-surface px-5 pb-6 pt-[86px]">
        <div className="absolute left-1/2 top-0 z-20 size-[180px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-[6%] overflow-hidden rounded-full">
            <ContentImage
              src={entry.imageSrc}
              alt={entry.name}
              fill
              sizes="180px"
              fit="cover"
              className="object-cover object-center"
            />
          </div>
          <Image
            src="/images/donor-wall/donor-frame.png"
            alt=""
            fill
            className="pointer-events-none object-cover"
            sizes="180px"
            aria-hidden="true"
          />
        </div>

        <div className="max-w-[272px]">
          <h3 className="mt-4 text-center text-base font-semibold leading-tight text-[#003144] md:text-lg">
            {entry.name}
          </h3>
        </div>

        <span className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-[#2653B9] bg-primary-light px-8 py-1.5 text-base font-semibold text-[#2653B9]">
          <Image
            src="/images/donor-wall/pentol-plane.svg"
            alt=""
            width={48}
            height={48}
            className="shrink-0 object-contain"
            aria-hidden="true"
          />
          {entry.badge}
        </span>

        <p className="mt-3 flex items-center gap-1.5 font-semibold text-md text-text-muted">
          <LocationIcon />
          {entry.location}
        </p>
      </div>
    </article>
  );
}

function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
