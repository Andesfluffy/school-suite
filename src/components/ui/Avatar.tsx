import Image from "next/image";

export default function Avatar({ name, src, size = 64 }: { name: string; src?: string | null; size?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover border"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-[var(--muted)] text-[var(--foreground)] border flex items-center justify-center font-medium"
    >
      {initials}
    </div>
  );
}

