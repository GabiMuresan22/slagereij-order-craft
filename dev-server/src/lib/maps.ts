export const BUSINESS_ADDRESS = "Bruggestraat 146A, 8750 Zwevezele, Belgium";

export function getGoogleMapsDirectionsUrl(destination: string = BUSINESS_ADDRESS) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function getGoogleMapsEmbedUrl(query: string = BUSINESS_ADDRESS) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
