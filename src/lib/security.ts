/**
 * Checks if a password appears in known data breaches using Have I Been Pwned's
 * Pwned Passwords "range" API (k-Anonymity). The raw password is never sent.
 *
 * Docs: https://haveibeenpwned.com/API/v3#PwnedPasswords
 *
 * Note: This intentionally "fails open" (returns false) if the API is unreachable
 * or browser crypto is unavailable, to avoid blocking signups/resets.
 */
export async function isPasswordLeaked(
  password: string,
  options?: { timeoutMs?: number },
): Promise<boolean> {
  if (!password) return false;

  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.subtle) {
    console.warn("[security] crypto.subtle unavailable; skipping HIBP leak check");
    return false;
  }

  const timeoutMs = options?.timeoutMs ?? 4500;

  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await cryptoObj.subtle.digest("SHA-1", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  const prefix = hashHex.slice(0, 5);
  const suffix = hashHex.slice(5);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn("[security] HIBP range request failed:", response.status, response.statusText);
      return false;
    }

    const text = await response.text();

    for (const line of text.split(/\r?\n/)) {
      const [hashSuffix] = line.split(":");
      if (hashSuffix && hashSuffix.toUpperCase() === suffix) return true;
    }

    return false;
  } catch (error) {
    console.error("[security] HIBP API error:", error);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}


