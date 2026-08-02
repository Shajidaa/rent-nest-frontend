import { Loader2, Home } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6">
        {/* Animated Brand/Icon Container */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 shadow-sm">
          {/* Pulsing background ring */}
          <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 animate-ping opacity-75" />
          
          <Home className="h-8 w-8 text-emerald-600 dark:text-emerald-400 relative z-10" />
        </div>

        {/* Loading Message and Spinner */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-muted/60 border border-border shadow-xs">
            <Loader2 className="h-4 w-4 animate-spin text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-foreground tracking-wide">
              Loading properties & details...
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Please wait while we set things up for you.
          </p>
        </div>
      </div>
    </div>
  );
}