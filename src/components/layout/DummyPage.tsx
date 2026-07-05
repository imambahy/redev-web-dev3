type DummyPageProps = {
  title: string;
  description: string;
};

export function DummyPage({ title, description }: DummyPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-text md:text-3xl">{title}</h1>
      <p className="mt-3 max-w-md text-text-muted">{description}</p>
      <p className="mt-6 text-sm text-primary">Halaman ini akan dibuat nanti.</p>
    </div>
  );
}
