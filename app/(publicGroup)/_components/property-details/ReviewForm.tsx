/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquarePlus } from "lucide-react";
import { ReviewCreated } from "../../_action/review";


interface ReviewFormProps {
  propertyId: string;
  rentalId: string; 
 
}

export function ReviewForm({ propertyId, rentalId }: ReviewFormProps) {
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsSubmitting(true);
    setError("");

    try {
      const response = await ReviewCreated(
        propertyId, 
        rentalId, 
        newRating, 
        newComment
      );

      if (!response.success) {
        setError(response.message);
        return;
      }

      // Reset form on success
      setNewComment("");
      setNewRating(5);
      
      
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } 
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-base">Write a Review</h3>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Select Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoverRating || newRating)
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Review Comments</label>
            <Textarea
              placeholder="Share your experience living or visiting here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}