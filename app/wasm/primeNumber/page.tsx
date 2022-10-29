"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PrimeNumberComponent = dynamic(
  () => import("../../../components/primeNumber"),
  { suspense: true }
);

export default function PrimeNumberPage() {
  return (
    <main>
      <h1>Prime Number</h1>
      <Suspense fallback={`Loading...`}>
        <PrimeNumberComponent />
      </Suspense>
    </main>
  );
}
