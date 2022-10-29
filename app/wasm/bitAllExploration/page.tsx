"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const BitAllExplorationComponent = dynamic(
  () => import("../../../components/bitAllExploration"),
  { suspense: true }
);

export default function BitAllExplorationPage() {
  return (
    <main>
      <h1>BitAll Exploration</h1>
      <Suspense fallback={`Loading...`}>
        <BitAllExplorationComponent />
      </Suspense>
    </main>
  );
}
