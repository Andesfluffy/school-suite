const FIREBASE_SDK_VERSION = "11.0.1";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

type FirebaseConfigKey = keyof typeof firebaseConfig;
const REQUIRED_CONFIG_KEYS: FirebaseConfigKey[] = ["apiKey", "authDomain", "projectId"];

function buildInitialiseConfig(): Record<string, string> {
  return Object.entries(firebaseConfig).reduce<Record<string, string>>((acc, [key, value]) => {
    if (typeof value === "string" && value.length > 0) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export type FirebaseAuthUser = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

export type FirebaseGoogleAuthProvider = {
  setCustomParameters: (customOAuthParameters: Record<string, string>) => void;
};

export type FirebaseAuth = {
  onAuthStateChanged: (
    next: (user: FirebaseAuthUser | null) => void,
    error?: (error: Error) => void,
  ) => () => void;
  signInWithPopup: (provider: FirebaseGoogleAuthProvider) => Promise<unknown>;
  signOut: () => Promise<void>;
  useDeviceLanguage: () => void;
};

export type FirebaseAuthNamespace = (() => FirebaseAuth) & {
  GoogleAuthProvider: new () => FirebaseGoogleAuthProvider;
};

export type FirebaseCompat = {
  apps: unknown[];
  auth: FirebaseAuthNamespace;
  initializeApp: (config: Record<string, string | undefined>) => void;
};

export type FirebaseBundle = {
  firebase: FirebaseCompat;
  auth: FirebaseAuth;
};

let bundlePromise: Promise<FirebaseBundle> | null = null;

function ensureClient() {
  if (typeof window === "undefined") {
    throw new Error("Firebase is only available in the browser context");
  }
}

function loadScript(src: string) {
  ensureClient();
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-firebase-sdk="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    (script as any).dataset.firebaseSdk = src;
    script.addEventListener("load", () => {
      (script as any).dataset.loaded = "true";
      resolve();
    });
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)));
    document.head.appendChild(script);
  });
}

function validateConfig() {
  const missing = REQUIRED_CONFIG_KEYS.filter((key) => {
    const value = firebaseConfig[key];
    return typeof value !== "string" || value.length === 0;
  });

  if (missing.length) {
    throw new Error(`Missing Firebase configuration: ${missing.join(", ")}`);
  }
}

export async function loadFirebaseAuth(): Promise<FirebaseBundle> {
  ensureClient();
  if (bundlePromise) {
    return bundlePromise;
  }

  bundlePromise = (async () => {
    validateConfig();
    const base = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;
    await loadScript(`${base}/firebase-app-compat.js`);
    await loadScript(`${base}/firebase-auth-compat.js`);

    const firebase = (window as any).firebase as FirebaseCompat | undefined;
    if (!firebase) {
      throw new Error("Firebase SDK failed to initialise");
    }

    if (!firebase.apps.length) {
      const initialisationConfig = buildInitialiseConfig();
      firebase.initializeApp(initialisationConfig);
    }

    const auth = firebase.auth();
    auth.useDeviceLanguage();

    return { firebase, auth };
  })();

  return bundlePromise;
}
