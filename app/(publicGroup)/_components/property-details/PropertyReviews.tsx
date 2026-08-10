/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";
import { Star } from "lucide-react";


interface PropertyReviewsProps {
  propertyId: string;
  rentalId?: string | null;
  initialReviews?: any[];
}

export function PropertyReviews({ propertyId, rentalId, initialReviews }: PropertyReviewsProps) {
  const [reviews, setReviews] = useState<any[]>(initialReviews ?? []);
  const [isLoading, setIsLoading] = useState(!initialReviews);

  // Fetch reviews from backend on mount (only if no initialReviews provided)
  useEffect(() => {
    if (initialReviews) return;
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews/property/${propertyId}`);
        const result = await response.json();
        if (response.ok) {
          setReviews(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId, initialReviews]);


const hasReviewed = rentalId 
    ? reviews.some((review) => review.rentalId === rentalId) 
    : false;
 
    

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
      : "No ratings";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Reviews & Ratings</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-1 text-sm font-semibold bg-amber-500/10 text-amber-600 px-2.5 py-0.5 rounded-full">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{averageRating}</span>
            </div>
          )}
        </div>
        <span className="text-sm text-muted-foreground">{reviews.length} total reviews</span>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading reviews...</p>
      ) : (
        <ReviewList reviews={reviews} />
      )}

    
      {rentalId && !hasReviewed && (
        <ReviewForm 
          propertyId={propertyId} 
          rentalId={rentalId} 
  
        />
      )}

      {rentalId && hasReviewed && (
        <p className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-md">
          You have already submitted a review for this property.
        </p>
      )}
    </div>
  );
}