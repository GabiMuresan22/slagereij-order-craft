import { MapPin, Phone, Truck, Euro, Clock } from "lucide-react";
import type { DeliveryMethodValue } from "./OrderTypeToggle";

interface DeliveryInfoCardProps {
  mode: DeliveryMethodValue;
  /** NL copy */
  pickupIntro: string;
  deliveryIntro: string;
  minimumLine: string;
  tier1Free: string;
  tier1Paid: string;
  minimum100: string;
  tier2Free: string;
  tier2Paid: string;
  schedule: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
}

export function DeliveryInfoCard({
  mode,
  pickupIntro,
  deliveryIntro,
  minimumLine,
  tier1Free,
  tier1Paid,
  minimum100,
  tier2Free,
  tier2Paid,
  schedule,
  address,
  phoneDisplay,
  phoneHref,
}: DeliveryInfoCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-md">
      <h2 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Truck className="h-5 w-5 text-primary shrink-0" aria-hidden />
        Info
      </h2>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {mode === "pickup" ? pickupIntro : deliveryIntro}
      </p>
      <ul className="space-y-3 text-sm">
        <li className="flex gap-2">
          <Euro className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
          <span className="text-muted-foreground">{minimumLine}</span>
        </li>
        <li className="flex gap-2">
          <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
          <span className="text-muted-foreground">{tier1Free}</span>
        </li>
        <li className="flex gap-2 pl-6">
          <span className="text-muted-foreground">{tier1Paid}</span>
        </li>
        <li className="flex gap-2">
          <Euro className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
          <span className="text-muted-foreground">{minimum100}</span>
        </li>
        <li className="flex gap-2 pl-6">
          <span className="text-muted-foreground">{tier2Free}</span>
        </li>
        <li className="flex gap-2 pl-6">
          <span className="text-muted-foreground">{tier2Paid}</span>
        </li>
        <li className="flex gap-2">
          <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
          <span className="text-muted-foreground">{schedule}</span>
        </li>
        <li className="flex gap-2 pt-2 border-t border-border">
          <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
          <a href={phoneHref} className="font-medium text-foreground hover:text-primary transition-colors">
            {phoneDisplay}
          </a>
        </li>
        <li className="flex gap-2">
          <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
          <span className="text-muted-foreground">{address}</span>
        </li>
      </ul>
    </div>
  );
}
