Brand-Stone School Suite

Brand-Stone School Suite is a matte-black Next.js workspace where school administrators coordinate students, staff, finance, events, and performance under a single Google Workspace sign-on. The landing experience introduces the platform, outlines every module, and invites schools to authenticate using Firebase-backed SSO.

Features

Marketing-first landing page – explains the platform, highlights module capabilities, and shows the Workspace + Firebase authentication journey for schools and their staff teams.

Google Workspace authentication – Firebase Auth (loaded from Google’s CDN) powers real Google sign-in so only verified school domains can access the cockpit.

Role-aware dashboards – once authenticated, users land on the control centre with quick links, summaries, and operational analytics.

Getting Started

Install dependencies with your preferred package manager:

pnpm install
# or
npm install


Create a Firebase project and enable Google sign-in in Authentication → Sign-in method.

Generate a Web App within Firebase and copy the configuration keys.

Provide environment variables in a .env.local file (or copy .env.example). The first three Firebase keys are required for authentication; the rest are optional and can be configured later. The Prisma database connection string is required before running migrations or starting the app:

DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
# Optional: enable additional Firebase services as you configure them
NEXT_PUBLIC_FIREBASE_APP_ID=your-web-app-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
# Optional: lock sign-in to a specific Google Workspace domain
NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN=brandstone.edu


Create and migrate the database (requires DATABASE_URL):

pnpm prisma migrate dev

Optionally seed demo data so the dashboards have example schools, staff, and students:

pnpm prisma db seed


Start the development server:

pnpm dev
# or
npm run dev


Open the app at http://localhost:3000
. The landing page describes the suite and offers Google Workspace login. After sign-in, you’ll be redirected to the authenticated dashboard experience.

Authentication Flow

A school administrator selects Launch school login. Firebase Auth loads from Google’s CDN, enforcing your configured Workspace domain (optional) and completing Google SSO.

Firebase exchanges the Google credential for a secure session token. The client stores this token using Firebase’s built-in persistence so the session follows Google’s revocation rules.

Inside the suite, administrators invite staff into role-based groups (academics, operations, finance). Each invite uses the same Workspace-backed identity, so staff retain their existing Google accounts.

When someone leaves the school, disable them in Google Workspace; Firebase automatically revokes the session and access to the Brand-Stone dashboards closes.

Additional Scripts

pnpm lint – run ESLint against the project.

pnpm build – generate a production build.

License

This project is provided for demonstration purposes within the Brand-Stone narrative.