/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { fetchRental } from '../_action/rentalRequest';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default async function Rental() {
    const result = await fetchRental();
    const rentals = result?.data ?? [];
    
    // Function to filter only rented properties
    const getRentedProperties = (rentalsData :any) => {
        return rentalsData.filter((rental: any) => 
            rental.status === 'PAID' && 
            rental.property?.status === 'RENTED'
        );
    };

    const rentedProperties = getRentedProperties(rentals);

    return (
        <div className=" ">
            {/* Header Section */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold ">My Rented Properties</h1>
                    <p className="text-sm  mt-1">Manage and track your active property rentals</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-lg w-fit">
                    Total: {rentedProperties.length} Rented
                </div>
            </div>

            {rentedProperties.length === 0 ? (
                <div className=" rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p>No active rented properties found.</p>
                </div>
            ) : (
                <>
                    {/* Desktop & Tablet Table View */}
                    <div className="hidden md:block  shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-left">
                                <thead className="">
                                    <tr>
                                        <th scope="col" className="px-6 py-3.5 text-xs font-semibold  uppercase tracking-wider">Property</th>
                                        <th scope="col" className="px-6 py-3.5 text-xs font-semibold  uppercase tracking-wider">Location</th>
                                        <th scope="col" className="px-6 py-3.5 text-xs font-semibold  uppercase tracking-wider">Monthly Rent</th>
                                        <th scope="col" className="px-6 py-3.5 text-xs font-semibold  uppercase tracking-wider">Duration</th>
                                        <th scope="col" className="px-6 py-3.5 text-xs font-semibold  uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3.5 text-xs font-semibold  uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-background divide-y divide-gray-200 text-sm">
                                    {rentedProperties.map((rental:any) => {
                                        const prop = rental.property;
                                        const imageUrl = prop?.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=150&q=80';
                                        
                                        return (
                                            <tr key={rental.id} className=" transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <img 
                                                            src={imageUrl} 
                                                            alt={prop?.title || 'Property'} 
                                                            className="h-12 w-12 flex-shrink-0 rounded-lg object-cover bg-gray-100 border border-gray-200"
                                                        />
                                                        <div>
                                                            <div className="font-semibold  max-w-xs truncate">{prop?.title}</div>
                                                            <div className="text-xs ">{prop?.bedrooms} Bed • {prop?.bathrooms} Bath • {prop?.size} {prop?.sizeUnit}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap ">
                                                    <div className="font-medium ">{prop?.area}, {prop?.city}</div>
                                                    <div className="text-xs  max-w-xs truncate">{prop?.fullAddress}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-semibold ">
                                                    ৳{prop?.price_per_month?.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs ">
                                                    <div><span className="">From:</span> {new Date(rental.startDate).toLocaleDateString()}</div>
                                                    <div><span className="">To:</span> {new Date(rental.endDate).toLocaleDateString()}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                                        {rental.status}
                                                    </span>
                                                </td>
                                                 <td className="px-6 py-4 whitespace-nowrap text-xs ">
                                            
                                               <Link href={`/properties/${prop.id}`}>view</Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Card Stack View */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {rentedProperties.map((rental:any) => {
                            const prop = rental.property;
                            const imageUrl = prop?.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=150&q=80';

                            return (
                                <div key={rental.id} className="bg-background rounded-xl shadow-sm border border-gray-200 p-4 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <img 
                                            src={imageUrl} 
                                            alt={prop?.title || 'Property'} 
                                            className="h-16 w-16 rounded-lg object-cover flex-shrink-0 bg-gray-100 border border-gray-200"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="font-semibold text-gray-900 text-sm truncate">{prop?.title}</h3>
                                                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-100 text-emerald-800 flex-shrink-0">
                                                    {rental.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">{prop?.area}, {prop?.city}</p>
                                            <p className="text-xs font-semibold text-gray-900 mt-1">৳{prop?.price_per_month?.toLocaleString()} / month</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50/50 p-2.5 rounded-lg">
                                        <div>
                                            <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Specs</span>
                                            <span className="font-medium text-gray-800">{prop?.bedrooms} Bed • {prop?.size} {prop?.sizeUnit}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Duration</span>
                                            <span className="font-medium text-gray-800">
                                                {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div>
                                          <Link href={`/properties/${prop.id}`}>     
                                               <ExternalLink className="w-4 h-4" />
                                               </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}