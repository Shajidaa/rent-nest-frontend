"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, Loader2 } from "lucide-react";
import { paymentCancel } from "../_action/paymentcancel";


export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const rentalRequestId = searchParams.get("rental_request_id");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const cancelSession = async () => {
      try {
        if (!rentalRequestId) {
          throw new Error("Rental Request ID missing in cancel URL");
        }

        await paymentCancel(rentalRequestId, sessionId);

        setStatus("success");
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(err.message || "Something went wrong.");
      }
    };

    if (rentalRequestId) {
      cancelSession();
    } else {
      setStatus("error");
      setErrorMessage("Invalid cancellation link: Missing rental ID.");
    }
  }, [sessionId, rentalRequestId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="p-6 max-w-md w-full bg-card text-card-foreground rounded-xl shadow-md border border-border">
        {status === "loading" && (
          <div className="flex flex-col items-center py-6">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h2 className="text-xl font-semibold text-foreground">Canceling your payment...</h2>
            <p className="text-muted-foreground text-sm mt-1">Please wait a moment.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center py-4">
            <XCircle className="w-16 h-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Payment Canceled</h2>
            <p className="text-muted-foreground mt-2 mb-6 text-sm">
              Your payment session was canceled. No charges were made to your account.
            </p>
            <div className="flex gap-3 w-full">
              <Link
                href="/tenant-dashboard"
                className="flex-1 bg-secondary hover:bg-secondary/85 text-secondary-foreground font-medium py-2 px-4 rounded-lg text-sm transition"
              >
                Dashboard
              </Link>
              <Link
                href="/tenant-dashboard/applications"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg text-sm transition"
              >
                Try Again
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center py-4">
            <XCircle className="w-16 h-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Cancellation Notice</h2>
            <p className="text-muted-foreground mt-2 mb-6 text-sm">
              {errorMessage}
            </p>
            <Link
              href="/tenant-dashboard"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg text-sm transition"
            >
              Return to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}