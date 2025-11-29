// client/src/components/PageContainer.tsx
import React from "react";

export default function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</div>;
}
    