/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { getPaymentDetails } from "../_action/paymentAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Building2, Calendar, CreditCard, ExternalLink, ArrowRight, Loader2 } from "lucide-react";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id"); 
  const [payment, setPayment] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (paymentId) {
      const fetchPaymentStatus = async () => {
        setLoading(true);
        try {
          const response = await getPaymentDetails(paymentId);
          if (response?.success) {
            // Mapping to the inner payment record
            setPayment(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch payment details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPaymentStatus();
    } 
  }, [paymentId]);



  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="text-sm font-medium text-slate-600">Verifying your transaction details...</p>
      </div>
    );
  }

  const property = payment?.data?.rental_request?.property;
  const rentalRequest = payment?.data.rental_request;
  const firstImage = property?.images?.[0] ;

  return (
    <div className=" mx-auto py-12 px-4">
      <Card className="border-slate-200 shadow-lg overflow-hidden">
        {/* Success Header Banner */}
        <div className="bg-emerald-600 text-white p-6 text-center relative">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/20">
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Payment Successful!</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Your rental transaction has been processed securely via Stripe.
          </p>
        </div>

        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">Transaction Reference</span>
              <span className="font-mono text-xs text-slate-700">{payment?.id || paymentId}</span>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-semibold px-3 py-1">
              {payment?.status || 'SUCCEEDED'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {payment ? (
            <>
              {/* Payment Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block">Amount Paid</span>
                  <span className="font-bold text-slate-900 text-base">{payment.data.amount} {payment.data.currency}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Payment Method</span>
                  <span className="font-semibold text-slate-700 uppercase">{payment.data.payment_method}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Date Processed</span>
                  <span className="font-medium text-slate-700">
                    {payment.data.created_at ? new Date(payment.data.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Rented Property Preview Card */}
              {property && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-600" /> Rented Property Overview
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-slate-200 bg-white items-start sm:items-center">
                    <img 
                      src={firstImage} 
                      alt={property.title} 
                      className="w-full sm:w-24 h-24 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{property.title}</h4>
                      <p className="text-xs text-slate-500 truncate">{property.fullAddress}, {property.city}</p>
                      
                      {rentalRequest?.startDate && rentalRequest?.endDate && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>
                            {new Date(rentalRequest.startDate).toLocaleDateString()} - {new Date(rentalRequest.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>We could not find matching payment details for this session.</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-6 flex flex-col sm:flex-row gap-3 justify-end">
          <Button asChild variant="outline" className="w-full sm:w-auto border-slate-200">
            <Link href="/tenant-dashboard/payments">
              View All Payments
            </Link>
          </Button>
          {property?.id && (
            <Button asChild className="w-full sm:w-auto  text-white gap-2">
              <Link href={`/properties/${property.id}`}>
                View Property Details
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}