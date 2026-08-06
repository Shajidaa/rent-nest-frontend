"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateRentalStatus } from "../../../_action/rental-request";

interface Props {
    requestId: string;
    propertyId: string;
    currentStatus: string;
}

export default function RequestActionButtons({ requestId, propertyId, currentStatus }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState<"APPROVED" | "REJECTED" | null>(null);

    const isDone = currentStatus === "APPROVED" || currentStatus === "REJECTED";

    const handle = async (status: "APPROVED" | "REJECTED") => {
        setLoading(status);
        try {
            const result = await updateRentalStatus(requestId, propertyId, status);
            if (result?.success === false) {
                toast.error("Failed to update status. Please try again.");
            } else {
                toast.success(
                    status === "APPROVED" ? "Request approved!" : "Request REJECTED."
                );
                router.refresh();
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setLoading(null);
        }
    };

    if (isDone) {
        return (
            <span className="text-xs text-muted-foreground italic">No actions available</span>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                onClick={() => handle("APPROVED")}
                disabled={!!loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
            >
                {loading === "APPROVED" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                    <CheckCircle className="h-3.5 w-3.5" />
                )}
                Accept
            </Button>

            <Button
                size="sm"
                variant="destructive"
                onClick={() => handle("REJECTED")}
                disabled={!!loading}
                className="gap-1.5"
            >
                {loading === "REJECTED" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                    <XCircle className="h-3.5 w-3.5" />
                )}
                Cancel
            </Button>
        </div>
    );
}
