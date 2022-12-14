import { type ReactNode } from "react";
import "./globals.css";
import styles from "./styles.module.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <div className={styles.container}>
          <h1>Wasm Components</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
