/**
 * NODE PACKAGES
 */
import React from "react";
import { Star } from "lucide-react";

/**
 * TYPES
 */
import { Review } from "@/types/tutor.types";

/**
 * INTERFACE
 */
interface TutorReviewsProps {
  reviews: Review[];
  averageRating: number;
}

export const TutorReviews: React.FC<TutorReviewsProps> = ({
  reviews,
  averageRating,
}) => {
  return (
    <div className="text-foreground">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Reviews ({reviews.length})</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= averageRating
                    ? "text-primary fill-primary"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold">
            {averageRating.toFixed(1)}
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="p-8 bg-card border border-border rounded-2xl text-center text-muted-foreground">
          No reviews yet
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review: Review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">
                    {review.student?.name || "Anonymous"}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "text-primary fill-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
