# Brand-Stone School Suite

Brand-Stone School Suite is a matte-black Next.js workspace where school administrators coordinate students, staff, finance, events, and performance under a single Google Workspace sign-on. The landing experience introduces the platform, outlines every module, and invites schools to authenticate using Firebase-backed SSO.

## Features

- **Marketing-first landing page** – explains the platform, highlights module capabilities, and shows the Workspace + Firebase authentication journey for schools and their staff teams.
- **Google Workspace authentication** – Firebase Auth (loaded from Google&apos;s CDN) powers real Google sign-in so only verified school domains can access the cockpit.
- **Role-aware dashboards** – once authenticated, users land on the control centre with quick links, summaries, and operational analytics.

## Getting Started

1. Install dependencies with your preferred package manager:

   ```bash
   pnpm install
   # or
   npm install
   ```

2. Create a Firebase project and enable Google sign-in in **Authentication → Sign-in method**.
3. Generate a web app within Firebase and copy the configuration keys.
4. Provide the following environment variables in a `.env.local` file. The first three are required for authentication, while the rest enhance other Firebase features and can be configured later:

   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   # Optional: enable additional Firebase services as you configure them
   NEXT_PUBLIC_FIREBASE_APP_ID=your-web-app-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   # Optional: lock sign-in to a specific Google Workspace domain
   NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN=brandstone.edu
   ```

5. Start the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. Navigate to [http://localhost:3000](http://localhost:3000). The landing page describes the suite and offers the Google Workspace login. After sign-in, you are redirected to the authenticated dashboard experience.

## Authentication Flow

1. A school administrator selects **Launch school login**. Firebase Auth loads from Google&apos;s CDN, enforcing your configured Workspace domain (optional) and completing Google SSO.
2. Firebase exchanges the Google credential for a secure session token. The client stores this token using Firebase&apos;s built-in persistence so the session follows Google&apos;s revocation rules.
3. Inside the suite, administrators invite staff into role-based groups (academics, operations, finance). Each invite uses the same Workspace-backed identity, so staff keep their existing Google accounts.
4. When someone leaves the school, disable them in Google Workspace; Firebase automatically revokes the session and access to the Brand-Stone dashboards closes.

## Additional Scripts

- `pnpm lint` – run ESLint against the project.
- `pnpm build` – generate a production build.

## License

This project is provided for demonstration purposes within the Brand-Stone narrative.
