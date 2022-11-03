import {
  type ChangeEvent,
  type FC,
  useCallback,
  useState,
  useEffect,
} from "react";

const PrimeNumberWasmComponent: FC = () => {
  const [number, setNumber] = useState<number>(2);
  const [output, setOutput] = useState<boolean>();

  const increment = useCallback(() => setNumber((prev) => prev + 1), []);
  const decrement = useCallback(() => setNumber((prev) => prev - 1), []);
  const reset = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (isNaN(num)) return;
    setNumber(num);
  }, []);

  useEffect(() => {
    (async () => {
      // Import the wasm module
      const rustModule = await import("../src/build/prime_number.wasm");

      const isPrimeNumber = rustModule.is_prime_number(number); // 0 or 1
      setOutput(isPrimeNumber ? true : false);
    })();
  }, [number]);

  return (
    <div>
      <input type="number" value={number} onChange={reset} />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <div>
        {output ? (
          <p style={{ color: "cyan" }}>{`${number} is prime number`}</p>
        ) : (
          <p style={{ color: "red" }}>{`${number} is not prime number`}</p>
        )}
      </div>
    </div>
  );
};

export default PrimeNumberWasmComponent;
