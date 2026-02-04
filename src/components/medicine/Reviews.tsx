"use client";

import React from "react";
import {
  Star,
  ThumbsUp,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import type { Medicine, Review } from "@/types";

type Props = {
  medicine: Medicine;
};

const Reviews = ({ medicine }: Props) => {
  const reviews = medicine.reviews;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2 pb-8 border-b border-slate-100">
          Customer Reviews{" "}
          <span className="text-slate-400 font-light">
            ({reviews.length})
          </span>
        </h2>

        <div className="lg:col-span-8 space-y-8">
          {/* Individual Reviews */}
          {reviews?.map((review: Review) => {
            const initials =
              review.customer.name?.charAt(0).toUpperCase() ?? "?";

            return (
              <div
                key={review.id}
                className="group animate-in fade-in duration-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                      {initials}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        {review.customer.name}
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase font-black">
                          <CheckCircle2 size={10} /> Verified
                        </span>
                      </h4>

                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < review.rating ? "#EAB308" : "none"}
                            className={
                              i < review.rating
                                ? "text-yellow-500"
                                : "text-slate-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed mb-4 pl-13">
                  {review.comment}
                </p>

                <div className="flex items-center gap-6 pl-13">
                  <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                    <ThumbsUp size={14} /> Helpful
                  </button>
                  <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                    <MessageSquare size={14} /> Reply
                  </button>
                </div>

                <hr className="mt-8 border-slate-50" />
              </div>
            );
          })}

          {reviews.length === 0 && (
            <p className="text-slate-400 text-sm">
              No reviews yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
