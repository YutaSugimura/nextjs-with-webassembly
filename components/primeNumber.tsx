import dynamic from "next/dynamic";
import { type ChangeEvent, type FC, useCallback, useState } from "react";

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

export const PrimeNumberComponent: FC = () => {
  const [number, setNumber] = useState<number>(2);

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
      <input type="number" value={number} onChange={reset} />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
