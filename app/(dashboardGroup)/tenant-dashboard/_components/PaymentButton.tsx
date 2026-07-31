"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "../_action/paymentAction";

export default function PaymentButton({ rentalRequestId }: { rentalRequestId: string }) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const result = await createCheckoutSession(rentalRequestId);

            if (!result.success || !result.checkoutUrl) {
                toast.error(result.message ?? "Could not initiate payment.");
                return;
            }

            // Redirect to Stripe checkout
            window.location.href = result.checkoutUrl;
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
console.log();

    return (
        <Button
            onClick={handlePayment}
            disabled={loading}
            size="sm"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <CreditCard className="h-4 w-4" />
            )}
            {loading ? "Redirecting..." : "Pay Now"}
        </Button>
    );
}
