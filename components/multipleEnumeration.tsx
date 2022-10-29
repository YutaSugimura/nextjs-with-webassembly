import {
  type ChangeEvent,
  type FC,
  useCallback,
  useState,
  useEffect,
} from "react";

const MultipleEnumerationWasmComponent: FC = () => {
  const [number, setNumber] = useState<number>(20);
  const [output, setOutput] = useState<string>("");

  const reset = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (isNaN(num)) return;
    setNumber(num);
  }, []);

  useEffect(() => {
    (async () => {
      // Import the wasm module
      const rustModule = await import("../src/build/multiple_enumeration.wasm");

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
        rustModule.multiple_enumeration_str(number)
      );
      setOutput(multiple_enumeration);
    })();
  }, [number]);

  return (
    <div>
      <input type="number" value={number} onChange={reset} />
      <div>
        <p>result: {output}</p>
      </div>
    </div>
  );
};

export default MultipleEnumerationWasmComponent;
