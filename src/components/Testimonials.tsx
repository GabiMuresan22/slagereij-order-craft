import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Mariana Micu",
    rating: 5,
    text: "Fresh meat, delicious traditional dishes, and friendly owners. We'll definitely be back. Until next time!",
    date: "Recent"
  },
  {
    name: "Nicolescu Daniel",
    rating: 5,
    text: "A great experience at Butcher John! We bought mici, chicken skewers with vegetables, beef burgers and chicken burgers - every product was fresh, tasty and top quality. The service was professional, friendly and efficient.",
    date: "4 months ago"
  },
  {
    name: "CezarCDA",
    rating: 5,
    text: "Good food and always fresh!",
    date: "1 month ago"
  },
  {
    name: "Marius - Silviu Plesa",
    rating: 5,
    text: "Good prices, the products are always fresh and of quality. Even though the store seems small and you don't see a pile of products in the window, it's because they always keep the products fresh together with their wife.",
    date: "3 months ago"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
            Wat Onze Klanten Zeggen
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-3xl font-bold text-foreground">4.9</span>
          </div>
          <p className="text-muted-foreground">Gebaseerd op 11 Google recensies</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 min-h-[100px]">"{review.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/place/Bruggestraat+146A,+8750+Zwevezele"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2"
          >
            Bekijk alle recensies op Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
