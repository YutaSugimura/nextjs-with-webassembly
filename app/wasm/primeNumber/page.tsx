"use client";

import type { NextPage } from "next";
import { PrimeNumberComponent } from "../../../components/primeNumber";

const Page: NextPage = () => {
  return (
    <main>
      <h1>Prime Number</h1>
      <PrimeNumberComponent />
    </main>
  );
};

export default Page;
