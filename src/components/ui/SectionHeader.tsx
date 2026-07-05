type SectionHeaderProps = {
  id?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  highlight?: string;
  className?: string;
};

export function SectionHeader({
  id,
  title,
  description,
  align = "center",
  highlight,
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(highlight);
    if (parts.length === 1) return title;
    return (
      <>
        {parts[0]}
        <span className="text-primary">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      <h2
        id={id}
        className="text-2xl font-semibold leading-tight text-text md:text-3xl lg:text-5xl"
      >
        {renderTitle()}
      </h2>
      {description ? (
        <p className="mt-3 text-sm text-text-muted md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
