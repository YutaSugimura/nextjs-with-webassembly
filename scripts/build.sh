mkdir src/build
rustc --target wasm32-unknown-unknown --crate-type=cdylib src/prime_number.rs -o src/build/prime_number.wasm
rustc --target wasm32-unknown-unknown --crate-type=cdylib src/multiple_enumeration.rs -o src/build/multiple_enumeration.wasm
rustc --target wasm32-unknown-unknown --crate-type=cdylib src/bit_all_exploration.rs -o src/build/bit_all_exploration.wasm