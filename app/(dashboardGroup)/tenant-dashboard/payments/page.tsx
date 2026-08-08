/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';

import { getAllPayments } from '../_action/paymentAction';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog';
import { ExternalLink, CreditCard, Building2, Calendar, Receipt, Eye, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default async function PaymentsPage() {
  const response = await getAllPayments();
  const payments = response?.success ? response.payments : [];

  // Helper function to format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: currency.toUpperCase(),
      maximumFractionDigits: 0,
    }).format(amount);
  };


  return (
    <div className=" mx-auto py-10 px-4 ">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payment History</h1>
        <p className="text-slate-500 text-sm">
          View all your past transactions, payment statuses, and associated rental properties.
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-slate-600" />
            <CardTitle className="text-lg font-semibold text-slate-800">Transactions</CardTitle>
          </div>
          <CardDescription>A comprehensive list of payments made through your account.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {payments.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <CreditCard className="w-12 h-12 mx-auto stroke-1 text-slate-300 mb-3" />
              <p className="font-medium text-slate-700">No payment records found.</p>
              <p className="text-xs text-slate-400 mt-1">When you make payments for rental requests, they will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Property</TableHead>
                    <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Method</TableHead>
                    <TableHead className="font-semibold text-slate-700">Rental Period</TableHead>
                    <TableHead className="font-semibold text-slate-700">Date</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((item: any) => {
                    const property = item.rental_request?.property;
                    const rentalReq = item.rental_request;
                    const propertyImage = property?.images?.[0] || '/placeholder.jpg';

                    return (
                      <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* Property Details + Image */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              {property?.images?.[0] ? (
                                <img
                               
                                  src={propertyImage} 
                                  alt={property?.title || 'Property'}
                                  
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <Building2 className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900 line-clamp-1">
                                {property?.title || 'Unknown Property'}
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="line-clamp-1">{property?.fullAddress || property?.city || 'Location unavailable'}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Amount */}
                        <TableCell className="font-semibold text-slate-900">
                          {formatCurrency(item.amount, item.currency)}
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                        
                          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">  {item.status}</Badge>
                        </TableCell>

                        {/* Payment Method */}
                        <TableCell>
                          <span className="text-xs font-medium uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            {item.payment_method}
                          </span>
                        </TableCell>

                        {/* Rental Dates */}
                        <TableCell className="text-xs text-slate-600">
                          {rentalReq?.startDate && rentalReq?.endDate ? (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>
                                {new Date(rentalReq.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} 
                                {' - '}
                                {new Date(rentalReq.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">Not specified</span>
                          )}
                        </TableCell>

                        {/* Created At Date */}
                        <TableCell className="text-xs text-slate-500">
                          {new Date(item.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </TableCell>

                        {/* Actions: View Details Modal & Property Link */}
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Detailed Modal Trigger */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 gap-1.5 text-xs font-medium border-slate-200 hover:bg-slate-100"
                                >
                                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                                  Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                    <Receipt className="w-5 h-5 text-indigo-600" />
                                    Transaction & Rental Summary
                                  </DialogTitle>
                                  <DialogDescription>
                                    Detailed breakdown of payment ID: <span className="font-mono text-slate-700">{item.id}</span>
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6 my-4 text-sm">
                                  {/* Payment Overview Card */}
                                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                                    <h4 className="font-semibold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                                      <CreditCard className="w-4 h-4 text-slate-600" /> Payment Information
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                      <div>
                                        <span className="text-xs text-slate-500 block">Amount Paid</span>
                                        <span className="font-bold text-slate-900 text-base">{formatCurrency(item.amount, item.currency)}</span>
                                      </div>
                                      <div>
                                        <span className="text-xs text-slate-500 block">Payment Status</span>
                                        <div className="mt-0.5">{item.status}</div>
                                      </div>
                                      <div>
                                        <span className="text-xs text-slate-500 block">Gateway Processor</span>
                                        <span className="font-medium text-slate-700 uppercase">{item.payment_method}</span>
                                      </div>
                                      <div>
                                        <span className="text-xs text-slate-500 block">Transaction Timestamp</span>
                                        <span className="font-medium text-slate-700">
                                          {new Date(item.created_at).toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                    {item.stripe_payment_intent_id && (
                                      <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 truncate">
                                        <span className="font-semibold text-slate-600">Payment Intent:</span> {item.stripe_payment_intent_id}
                                      </div>
                                    )}
                                  </div>

                                  {/* Rented Property Info Card */}
                                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                                    <h4 className="font-semibold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                                      <Building2 className="w-4 h-4 text-slate-600" /> Rented Property Details
                                    </h4>
                                    <div className="flex gap-4 items-start">
                                      {property?.images?.[0] && (
                                        <img 
                                          src={property.images[0]} 
                                          alt="Property" 
                                          className="w-20 h-20 rounded-lg object-cover border border-slate-200 shrink-0"
                                        />
                                      )}
                                      <div className="space-y-1">
                                        <h5 className="font-semibold text-slate-900">{property?.title}</h5>
                                        <p className="text-xs text-slate-500">{property?.fullAddress}, {property?.city}</p>
                                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{property?.description}</p>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-xs">
                                      <div>
                                        <span className="text-slate-500 block">Monthly Rent</span>
                                        <span className="font-semibold text-slate-800">{formatCurrency(property?.price_per_month || 0, item.currency)}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-500 block">Security Deposit</span>
                                        <span className="font-semibold text-slate-800">{formatCurrency(property?.securityDeposit || 0, item.currency)}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-500 block">Property Status</span>
                                        <span className="font-semibold text-emerald-600 uppercase">{property?.status}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <DialogFooter className="gap-2 sm:gap-0">
                                  {property?.id && (
                                    <Button asChild className="w-full sm:w-auto bg-primary text-white gap-1.5">
                                      <Link href={`/properties/${property.id}`}>
                                        Go to Property Listing
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </Link>
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            {/* Direct Property Link Button */}
                            {property?.id && (
                              <Button 
                                asChild 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-slate-500 hover:text-slate-900"
                                title="View Property Page"
                              >
                                <Link href={`/properties/${property.id}`}>
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}