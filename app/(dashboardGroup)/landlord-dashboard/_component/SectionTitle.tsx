/* eslint-disable @typescript-eslint/no-explicit-any */
interface SectionTitleProps {
  n: string;
  title: string;
  icon: React.ComponentType<any>;
}

export default function SectionTitle({ n, title, icon: Icon }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
        {n}
      </div>
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-neutral-600" />
        <h3 className="font-semibold">{title}</h3>
      </div>
    </div>
  );
}
