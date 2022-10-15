import dynamic from "next/dynamic";
import { type ChangeEvent, type FC, useCallback, useState } from "react";

const MultipleEnumerationWasmComponent = dynamic({
  loader: async () => {
    const rustModule = await import("../build/multiple_enumeration.wasm");
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
        rustModule.multiple_enumeration_str(props.number)
      );

      return (
        <div>
          <p>result: {multiple_enumeration}</p>
        </div>
      );
    };
  },
});

export const MultipleEnumerationComponent: FC = () => {
  const [number, setNumber] = useState<number>(20);

  const reset = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (isNaN(num)) return;
    setNumber(num);
  }, []);

  return (
    <div>
      <h2>multiple enumeration</h2>
      <input type="number" value={number} onChange={reset} />
      <MultipleEnumerationWasmComponent number={number} />
    </div>
  );
};
