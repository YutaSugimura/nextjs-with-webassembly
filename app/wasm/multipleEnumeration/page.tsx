"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const MultipleEnumerationComponent = dynamic(
  () => import("../../../components/multipleEnumeration"),
  { suspense: true }
);

export default function MultipleEnumerationPage() {
  return (
    <main>
      <h1>Multiple Enumeration</h1>
      <Suspense fallback={`Loading...`}>
        <MultipleEnumerationComponent />
      </Suspense>
    </main>
  );
}
