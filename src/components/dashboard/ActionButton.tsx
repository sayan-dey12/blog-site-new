import Link from "next/link";

type ActionButtonProps = {
  label: string;
  href: string;
};

export default function ActionButton({ label, href }: ActionButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-3 py-2 rounded-md border bg-muted hover:bg-muted/70 text-sm"
    >
      {label}
    </Link>
  );
}
