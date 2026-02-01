"use client";

import React, { useState } from "react";
import { Star, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { reviewService } from "@/services/review.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


type Props = {
    medicineId: string;
    medicineName: string;
};

const MedicineReview = ({ medicineId, medicineName }: Props) => {
    const router = useRouter();

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            setError("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const toastId = toast.loading("Submitting your review...");


        const { error } = await reviewService.createReview(medicineId, {
            rating,
            comment: reviewText,
        });

        setIsSubmitting(false);

        if (error) {
            toast.error(("Failed to submit review"), {
                id: toastId,
            });
            setIsSubmitting(false);
            return;
        }

        toast.success("Review submitted successfully!", {
            id: toastId,
        });
        setIsSubmitted(true);
        setRating(0);
        setReviewText("");

        router.refresh();
    };

    if (isSubmitted) {
        return (
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                    <CheckCircle2 className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">
                    Review Submitted!
                </h3>
                <p className="text-emerald-700 text-sm mt-2">
                    Thank you for sharing your experience.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-sm font-bold text-emerald-800 underline underline-offset-4"
                >
                    Write another review
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                    Write a Review
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                    Share your experience with{" "}
                    <span className="text-blue-600 font-semibold">
                        {medicineName}
                    </span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                        Your Rating
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className="active:scale-90"
                            >
                                <Star
                                    size={36}
                                    className={
                                        star <= (hover || rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-slate-200"
                                    }
                                />
                            </button>
                        ))}
                        <span className="ml-4 flex items-center text-sm font-bold text-slate-400">
                            {rating > 0 ? `${rating} / 5` : "Select stars"}
                        </span>
                    </div>
                </div>

                {/* Review text */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Your Feedback
                        </label>
                        <span className="text-[10px] font-bold text-slate-400">
                            {reviewText.length} / 500
                        </span>
                    </div>
                    <textarea
                        required
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        maxLength={500}
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 ${isSubmitting || rating === 0
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-slate-900"
                        }`}
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Send size={18} />
                            Submit Review
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default MedicineReview;
