"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";

interface BanButtonProps {
  userId: string;
  currentStatus: string;
  toggleAction: (userId: string, status: string) => Promise<{ success?: boolean; message?: string }>;
}

export function BanButton({ userId, currentStatus, toggleAction }: BanButtonProps) {
  const [isPending, startTransition] = useTransition();
  const isBanned = currentStatus === "BANNED";

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const res = await toggleAction(userId, currentStatus);

        if (res && res.success === false) {
          toast.error(res.message || "Failed to update user status");
        } else {
          toast.success(
            isBanned
              ? "User unbanned successfully!"
              : "User banned successfully!"
          );
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors inline-flex items-center gap-1.5 disabled:opacity-50 ${
        isBanned
          ? "border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10"
          : "border-destructive/30 text-destructive hover:bg-destructive/10"
      }`}
    >
      {isPending ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          Updating...
        </>
      ) : isBanned ? (
        <>
          <ShieldCheck className="h-3 w-3" />
          Unban
        </>
      ) : (
        <>
          <ShieldAlert className="h-3 w-3" />
          Ban
        </>
      )}
    </button>
  );
}