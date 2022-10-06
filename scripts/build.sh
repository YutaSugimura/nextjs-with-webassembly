mkdir src/build
rustc --target wasm32-unknown-unknown --crate-type=cdylib src/prime_number.rs -o src/build/prime_number.wasm
