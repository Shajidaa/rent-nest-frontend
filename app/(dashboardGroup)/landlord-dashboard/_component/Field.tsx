import { Label } from "@/components/ui/label";
interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
