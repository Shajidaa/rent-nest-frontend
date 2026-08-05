"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Review {
  id: number | string;
  user: { name: string; image?: string };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export  function ReviewList({ reviews }: ReviewListProps) {
  
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No reviews yet. Be the first to review this property!
      </p>
    );
  }
  
  const reversedReviews = [...reviews].reverse(); 

  return (
    <div className="space-y-4">
      {reversedReviews.map((rev) => (
        <Card key={rev.id}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={rev.user?.image} />
                  <AvatarFallback>{rev.user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{rev.user?.name}</p>
                  <span className="text-xs text-muted-foreground">{rev.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= rev.rating ? "fill-amber-500 text-amber-500" : "text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{rev.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}