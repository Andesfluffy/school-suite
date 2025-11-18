import { applicationDefault, cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";

type ServiceAccount = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

function decodeServiceAccountKey(raw: string): ServiceAccount | null {
  try {
    const asJson = JSON.parse(raw) as ServiceAccount;
    return asJson;
  } catch (directParseError) {
    try {
      const decoded = Buffer.from(raw, "base64").toString("utf8");
      const asJson = JSON.parse(decoded) as ServiceAccount;
      return asJson;
    } catch (decodeError) {
      console.warn("Failed to parse Firebase service account", {
        directParseError,
        decodeError,
      });
      return null;
    }
  }
}

function resolveFirebaseCredential() {
  const fromEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (fromEnv) {
    const parsed = decodeServiceAccountKey(fromEnv);
    if (parsed) {
      return cert({
        projectId: parsed.project_id,
        clientEmail: parsed.client_email,
        privateKey: parsed.private_key?.replace(/\\n/g, "\n"),
      });
    }
  }
  return applicationDefault();
}

function getFirebaseAdminApp() {
  if (!getApps().length) {
    const credential = resolveFirebaseCredential();
    initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
  return getApp();
}

export async function verifyIdToken(idToken: string): Promise<DecodedIdToken> {
  const app = getFirebaseAdminApp();
  const auth = getAuth(app);
  return auth.verifyIdToken(idToken);
}
