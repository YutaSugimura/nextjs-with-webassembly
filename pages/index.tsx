import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { type FC, useState, useCallback, ChangeEvent } from "react";
import styles from "../styles/Home.module.css";

const PrimeNumberWasmComponent = dynamic({
  loader: async () => {
    // Import the wasm module
    const rustModule = await import("../src/build/prime_number.wasm");
    return (props: { number: number }) => {
      const isPrimeNumber = rustModule.is_prime_number(props.number);
      if (isPrimeNumber) {
        return <div>{`${props.number} is prime number`}</div>;
      }

      return <div>{`${props.number} is not prime number`}</div>;
    };
  },
});

const MultipleEnumerationWasmComponent = dynamic({
  loader: async () => {
    const rustModule = await import("../src/build/multiple_enumeration.wasm");
    return (props: { number: number }) => {
      const decodeCstr = (ptr: number) => {
        let m = new Uint8Array(rustModule.memory.buffer);
        let s = "";
        while (m[ptr] != 0) {
          s += String.fromCharCode(m[ptr]);
          ptr++;
        }

        return s;
      };

      const multiple_enumeration = decodeCstr(
        rustModule.multiple_enumeration(props.number)
      );

      return (
        <div>
          <p>multiple enumeration</p>
          <p>input number: {props.number}</p>
          <p>result: {multiple_enumeration}</p>
        </div>
      );
    };
  },
});

const PrimeNumberComponent: FC = () => {
  const [number, setNumber] = useState<number>(1);

  const increment = useCallback(() => setNumber((prev) => prev + 1), []);
  const decrement = useCallback(() => setNumber((prev) => prev - 1), []);
  const reset = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (isNaN(num)) return;
    setNumber(num);
  }, []);

  return (
    <div>
      <PrimeNumberWasmComponent number={number} />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <input type="number" value={number} onChange={reset} />
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PrimeNumberComponent />
        <MultipleEnumerationWasmComponent number={2050} />
      </main>
    </div>
  );
};

export default Home;
