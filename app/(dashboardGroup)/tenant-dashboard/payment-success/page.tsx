import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import PaymentSuccessContent from "../_components/PaymentSuccessContent";


export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}