import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const OrderSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Title Skeleton */}
        <Skeleton className="h-10 w-64 mx-auto mb-8" />

        {/* Progress Steps Skeleton */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-16 mt-2" />
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Delivery Method Selection Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20 rounded-lg" />
                <Skeleton className="h-20 rounded-lg" />
              </div>
            </div>

            {/* Delivery Info Card Skeleton */}
            <Skeleton className="h-40 w-full rounded-lg" />

            {/* Product Selection Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-40" />
              
              {/* Product Item Skeletons */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex gap-4">
                    {/* Product Image Skeleton */}
                    <Skeleton className="h-20 w-20 rounded-md flex-shrink-0" />
                    
                    <div className="flex-1 space-y-2">
                      {/* Product Select Skeleton */}
                      <Skeleton className="h-10 w-full" />
                      
                      {/* Quantity and Unit Row */}
                      <div className="flex gap-2">
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-20" />
                      </div>
                    </div>
                    
                    {/* Remove Button Skeleton */}
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              ))}

              {/* Add Product Button Skeleton */}
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Order Total Skeleton */}
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>

            {/* Allergen Warning Skeleton */}
            <Skeleton className="h-16 w-full rounded-lg" />

            {/* Navigation Button Skeleton */}
            <div className="flex justify-end">
              <Skeleton className="h-12 w-40" />
            </div>
          </CardContent>
        </Card>

        {/* Menu Section Skeleton */}
        <div className="mt-12 space-y-6">
          <Skeleton className="h-8 w-56 mx-auto" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
