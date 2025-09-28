import type { FirebaseCompat } from "@/lib/firebase-client";

export {};

declare global {
  interface Window {
    firebase?: FirebaseCompat;
  }
}
