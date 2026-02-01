/**
 * NODE PACKAGES
 */
import React from "react";
import { Star } from "lucide-react";

/**
 * COMPONENTS
 */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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
      <div className="mb-8 p-6 bg-card border border-border rounded-xl">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-foreground">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= averageRating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Based on {reviews.length} reviews
            </p>
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="p-12 bg-muted/30 border border-dashed border-border rounded-xl text-center">
          <p className="text-muted-foreground font-medium">No reviews yet</p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Be the first to review this tutor!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review: Review, index) => (
            <div key={review.id}>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage
                    src={review.student?.image || ""}
                    alt={review.student?.name || "Student"}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {review.student?.name?.charAt(0) || "S"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">
                        {review.student?.name || "Anonymous Student"}
                      </h4>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-muted-foreground/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
              {index < reviews.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
