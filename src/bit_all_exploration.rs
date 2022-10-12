use std::ffi::{CString};
use std::os::raw::c_char;

#[no_mangle]
pub fn bit_all_exploration() -> *mut c_char {
  let v = vec!["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  let mut result: Vec<Vec<String>> = Vec::new();

  for i in 0..1 << v.len() {

    let mut tmp: Vec<String> = Vec::new();
    for j in 0..v.len() {
      if(1 << j) & i == 0 {
        tmp.push(v[j].to_string());
      }
    }

    result.push(tmp);
  }

  let result = result.iter().map(|x| x.join("")).collect::<Vec<String>>().join(",");
  CString::new(result).unwrap().into_raw()
}
