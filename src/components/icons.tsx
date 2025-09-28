import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const gradientId = (id: string) => `suite-${id}`;

export function StudentsIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} {...props}>
      <defs>
        <linearGradient id={gradientId("students") } x1="4" y1="6" x2="28" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff6b81" />
          <stop offset="1" stopColor="#ff2d55" />
        </linearGradient>
      </defs>
      <path
        d="M4 11.5 16 6l12 5.5-12 5.5-12-5.5Z"
        fill="none"
        stroke={`url(#${gradientId("students")})`}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7 14.75v4.4c0 2.2 4 4.85 9 4.85s9-2.65 9-4.85v-4.4"
        fill="none"
        stroke="#f5f5f5"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}

export function StaffIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} {...props}>
      <defs>
        <linearGradient id={gradientId("staff") } x1="6" y1="8" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd166" />
          <stop offset="1" stopColor="#ff922b" />
        </linearGradient>
      </defs>
      <circle
        cx="16"
        cy="11"
        r="5"
        fill="none"
        stroke={`url(#${gradientId("staff")})`}
        strokeWidth="1.8"
      />
      <path
        d="M6.5 26c1-4.8 4.9-8 9.5-8s8.5 3.2 9.5 8"
        fill="none"
        stroke="#f8f9fa"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M11.2 18.4C12.4 17 14.1 16 16 16s3.6 1 4.8 2.4"
        fill="none"
        stroke="#f8f9fa"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function PerformanceIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} {...props}>
      <defs>
        <linearGradient id={gradientId("performance") } x1="6" y1="24" x2="26" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4dabf7" />
          <stop offset="1" stopColor="#1971c2" />
        </linearGradient>
      </defs>
      <path
        d="M8 24V16m6 8V10m6 14v-7m6 7V8"
        fill="none"
        stroke={`url(#${gradientId("performance")})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="8 16 14 10 20 17 26 8"
        fill="none"
        stroke="#f8f9fa"
        strokeOpacity="0.7"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EventsIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} {...props}>
      <defs>
        <linearGradient id={gradientId("events") } x1="6" y1="8" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a5b4fc" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect
        x="6"
        y="8"
        width="20"
        height="18"
        rx="4"
        fill="none"
        stroke={`url(#${gradientId("events")})`}
        strokeWidth="1.8"
      />
      <path
        d="M6 12h20"
        stroke="#f8f9fa"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M12 6v4m8-4v4"
        stroke="#f8f9fa"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <rect x="11" y="16" width="4" height="4" rx="1" fill="#f8f9fa" opacity="0.8" />
      <rect x="17" y="18" width="4" height="4" rx="1" fill="#f8f9fa" opacity="0.5" />
    </svg>
  );
}

export function FinancialsIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} {...props}>
      <defs>
        <linearGradient id={gradientId("financials") } x1="8" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#63e6be" />
          <stop offset="1" stopColor="#0ca678" />
        </linearGradient>
      </defs>
      <circle
        cx="16"
        cy="16"
        r="9.5"
        fill="none"
        stroke={`url(#${gradientId("financials")})`}
        strokeWidth="1.8"
      />
      <path
        d="M11 20c1.4 1.4 3.3 2.2 5.3 2.2 3.7 0 6.7-2.2 7.7-6.2"
        fill="none"
        stroke="#f8f9fa"
        strokeOpacity="0.75"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M16 9.5v13"
        fill="none"
        stroke="#f8f9fa"
        strokeOpacity="0.75"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M13.5 13.5c0-1.3 1.1-2.3 2.5-2.3 1.4 0 2.5 1 2.5 2.3 0 1.3-1.1 2.3-2.5 2.3-1.4 0-2.5 1-2.5 2.3s1.1 2.3 2.5 2.3 2.5-1 2.5-2.3"
        fill="none"
        stroke="#f8f9fa"
        strokeOpacity="0.6"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
