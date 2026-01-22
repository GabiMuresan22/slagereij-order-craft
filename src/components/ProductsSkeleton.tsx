import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center space-y-4 px-4">
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Product Categories Skeleton */}
        <div className="space-y-20 mb-20">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-0">
                <Skeleton className="h-80 md:h-[500px] w-full" />
                <CardContent className="p-8 md:p-12 space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="space-y-3 mt-6">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-10 w-32 mt-6" />
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Final CTA Skeleton */}
        <section className="bg-muted/30 rounded-lg p-12 md:p-16 text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
          <Skeleton className="h-12 w-40 mx-auto" />
        </section>
      </div>
    </div>
  );
};

export default ProductsSkeleton;
