import { Suspense } from "react";
import PaymentCancelContent from "../_components/PaymentCancelContent";


export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-4 border-rose-200 border-t-rose-600 animate-spin" />
      </div>
    }>
      <PaymentCancelContent />
    </Suspense>
  );
}
