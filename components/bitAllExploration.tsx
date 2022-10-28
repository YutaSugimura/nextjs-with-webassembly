import dynamic from "next/dynamic";
import { type ChangeEvent, type FC, useCallback, useState } from "react";

const BitAllExplorationWasmComponent = dynamic({
  loader: async () => {
    const rustModule = await import("../src/build/bit_all_exploration.wasm");
    return (props: { str: string }) => {
      const decodeCstr = (ptr: number) => {
        let m = new Uint8Array(rustModule.memory.buffer);
        let s = "";
        while (m[ptr] != 0) {
          s += String.fromCharCode(m[ptr]);
          ptr++;
        }

        return s;
      };

      const copyMemory = (data: any) => {
        let ptr = rustModule.alloc(data.length);
        let mem = new Uint8Array(rustModule.memory.buffer, ptr, data.length);
        mem.set(new Uint8Array(data));
        return ptr;
      };

      const deallocGuestMemory = (ptr: any, len: number) => {
        rustModule.dealloc(ptr, len);
      };

      const readString = (ptr: any, len: number) => {
        let m = new Uint8Array(rustModule.memory.buffer, ptr, len);
        let decoder = new TextDecoder("utf-8");
        return decoder.decode(m.slice(0, len));
      };

      // main
      let bytes = new TextEncoder().encode(props.str);
      let ptr = copyMemory(bytes);
      let result_str = decodeCstr(
        rustModule.bit_all_exploration_str(ptr, bytes.length)
      );
      const [result_ptr, len] = result_str.split(",").map((v) => parseInt(v));

      let bitAllExploration = readString(result_ptr, len).replace(/,/g, "\n");
      deallocGuestMemory(result_ptr, len);

      return (
        <div>
          <p>output: {bitAllExploration}</p>
        </div>
      );
    };
  },
});

export const BitAllExplorationComponent: FC = () => {
  const [text, setText] = useState<string>("A,B,C,D,E,F");

  const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  return (
    <div>
      <input type="text" value={text} onChange={onChangeValue} />
      <BitAllExplorationWasmComponent str={text} />
    </div>
  );
};
