"use client";

import Link from "next/link";

const paths = [
  {
    title: "Prime Number",
    href: "primeNumber",
  },
  {
    title: "Multiple Enumeration",
    href: "multipleEnumeration",
  },
  {
    title: "Bit All Exploration",
    href: "bitAllExploration",
  },
];

export default function RootPage() {
  return (
    <main>
      <ul>
        {paths.map((path) => (
          <li key={path.href}>
            <Link href={`/wasm/${path.href}`}>{path.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
