"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { XCircle, ArrowLeft, RefreshCcw, HelpCircle } from "lucide-react";

export default function PaymentCancelContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    return (
        <div className="mx-auto py-12 px-4 max-w-2xl">
            <Card className="border-slate-200 shadow-lg overflow-hidden">
                {/* Cancel Header Banner */}
                <div className="bg-rose-600 text-white p-6 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/20">
                        <XCircle className="w-9 h-9 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Payment Cancelled</h1>
                    <p className="text-rose-100 text-sm mt-1">
                        Your payment was not completed. No charges have been made.
                    </p>
                </div>

                {/* Session ref if available */}
                {sessionId && (
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
                            Session Reference
                        </span>
                        <span className="font-mono text-xs text-slate-700">{sessionId}</span>
                    </CardHeader>
                )}

                <CardContent className="p-6 space-y-4">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 space-y-3">
                        <h2 className="text-sm font-semibold text-slate-800">What happened?</h2>
                        <ul className="text-sm text-slate-600 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                You cancelled or closed the payment window before completing the transaction.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                Your rental request is still pending — you can retry the payment at any time.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                No amount has been deducted from your account.
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                        <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>
                            If you believe this is an error or need help, please contact our support team.
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-6 flex flex-col sm:flex-row gap-3 justify-end">
                    <Button asChild variant="outline" className="w-full sm:w-auto border-slate-200 gap-2">
                        <Link href="/tenant-dashboard/rentals">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Rentals
                        </Link>
                    </Button>
                    <Button asChild className="w-full sm:w-auto gap-2 bg-rose-600 hover:bg-rose-700 text-white">
                        <Link href="/tenant-dashboard/payments">
                            <RefreshCcw className="w-4 h-4" />
                            Retry Payment
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}