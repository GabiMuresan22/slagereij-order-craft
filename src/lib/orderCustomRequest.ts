/**
 * Custom product requests added from the webshop (not in catalog).
 * Persisted in orders.custom_requests (JSONB) and duplicated in notes for email/admin readability.
 */

export type CustomCartRequest = {
  id: string;
  type: "custom_request";
  title: string;
  quantityNote: string;
  note: string;
};

export function formatCustomRequestsForNotes(
  requests: CustomCartRequest[],
  labels: { header: string; qty: string; note: string }
): string {
  if (!requests.length) return "";
  const blocks = requests.map((r) => {
    const lines = [
      `${labels.header}: ${r.title}`,
      r.quantityNote.trim() ? `${labels.qty}: ${r.quantityNote}` : null,
      r.note.trim() ? `${labels.note}: ${r.note}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  });
  return `--- SPECIFIEKE AANVRAGEN ---\n${blocks.join("\n\n")}\n---------------------------`;
}
