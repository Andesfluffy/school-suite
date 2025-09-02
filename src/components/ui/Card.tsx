import React from "react";

export default function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`card hover:elev-1 transition-shadow ${className}`} {...props} />;
}
