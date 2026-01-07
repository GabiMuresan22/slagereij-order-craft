import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { getGoogleMapsDirectionsUrl } from "@/lib/maps";

const reviews = [
  {
    name: "Andrei Grigoras",
    rating: 5,
    text: "Produse de nota 10! Toate produsele sunt proaspete, gustoase și de o calitate impecabilă. Personalul este foarte amabil, oferă mereu recomandări utile și se vede că își respectă clienții. De fiecare dată când cumpăr de aici, mă întorc acasă mulțumit. Recomand cu toată încrederea!",
    date: "1 month ago"
  },
  {
    name: "Ana Maria Airinei",
    rating: 5,
    text: "Recomandăm cu drag și încredere! Produse excelente și super proaspete!",
    date: "1 month ago"
  },
  {
    name: "Lieselotte Valcke",
    rating: 5,
    text: "Super vriendelijk en lekker vers vlees. Proef zeker ook hun roemeense ambachtelijke specialiteiten.",
    date: "1 month ago"
  },
  {
    name: "Mariana Micu",
    rating: 5,
    text: "Fresh meat, delicious traditional dishes, and friendly owners. We'll definitely be back. Until next time!",
    date: "2 months ago"
  }
];

export default function Testimonials() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-3xl font-bold text-foreground">4.9</span>
          </div>
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
            href={getGoogleMapsDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2"
          >
            {t('testimonials.viewAll')}
          </a>
        </div>
      </div>
    </section>
  );
}
