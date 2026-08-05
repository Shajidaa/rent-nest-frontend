"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Star, MessageSquarePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ReviewButtonProps {
    propertyId: string;
    rentalId: string;
}

export default function ReviewButton({ propertyId, rentalId }: ReviewButtonProps) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ propertyId, rentalId, rating, comment }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to submit review");

            toast.success("Review submitted successfully!");
            setOpen(false);
            setComment("");
            setRating(5);
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full gap-2">
                    <MessageSquarePlus className="h-4 w-4" />
                    Write a Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Rating</p>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <Star
                                        className={`w-6 h-6 transition-colors ${star <= (hover || rating)
                                            ? "fill-amber-500 text-amber-500"
                                            : "text-muted-foreground"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Your experience</p>
                        <Textarea
                            placeholder="Share your experience living here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            required
                        />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {loading ? "Submitting..." : "Submit Review"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
