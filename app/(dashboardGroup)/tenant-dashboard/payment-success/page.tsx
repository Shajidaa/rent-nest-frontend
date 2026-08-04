"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPaymentDetails } from "../_action/paymentAction";


export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id"); 
  const [paymentStatus, setPaymentStatus] = useState<any | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (paymentId) {
      const fetchPaymentStatus = async () => {
        // setLoading(true);
        const response = await getPaymentDetails(paymentId);
        if (response.success) {
          setPaymentStatus(response.data);
        }
        // setLoading(false);
      };
      fetchPaymentStatus();
    } 
  }, [paymentId]);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[60vh]">
  //       <p className="text-lg font-medium text-gray-600">Loading payment details...</p>
  //     </div>
  //   );
  // }
console.log(paymentId);
console.log(paymentStatus);

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful! 🎉
      </h2>
      <p className="text-gray-600 mb-6">
        Your payment has been processed successfully using your database payment ID.
      </p>

      {paymentStatus ? (
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Payment ID (DB):</span>
            <span className="text-gray-600">{paymentStatus.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Status:</span>
            <span className="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded">
              {paymentStatus.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Property:</span>
            <span className="text-gray-600">
              {paymentStatus.rental_request?.property?.title}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Could not retrieve payment details for this ID.</p>
      )}
    </div>
  );
}