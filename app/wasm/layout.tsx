import Link from "next/link";
import { type ReactNode } from "react";
import styles from "./styles.module.css";

const WasmLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}

      <div className={styles.container}>
        <Link href="/" className={styles.link}>
          go back
        </Link>
      </div>
    </>
  );
};

export default WasmLayout;
