type Props = {
  about: string;
};

export default function AuthorAbout({ about }: Props) {
  return (
    <section className="space-y-2 max-w-3xl">
      <h2 className="text-lg font-semibold">About</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {about}
      </p>
    </section>
  );
}
