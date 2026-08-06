import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <p className="text-8xl font-bold text-primary">404</p>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground max-w-sm">
        Could not find the requested resource. It may have been moved or
        deleted.
      </p>
      <Link
        href="/"
        className="mt-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}