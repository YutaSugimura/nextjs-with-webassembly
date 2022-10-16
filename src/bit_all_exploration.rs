use std::mem;
use std::ffi::{CString};
use std::os::raw::{c_char, c_void};

#[no_mangle]
pub extern "C" fn alloc(size: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(size);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn dealloc(ptr: *mut c_void, cap: usize) {
    unsafe  {
        let _buf = Vec::from_raw_parts(ptr, 0, cap);
    }
}

#[no_mangle]
pub fn bit_all_exploration(v: Vec<&str>) -> Vec<Vec<String>> {
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

  result
}

#[no_mangle]
pub fn bit_all_exploration_example() -> *mut c_char {
  let v = vec!["A", "B", "C", "D", "E", "F", "G"];

  let list = bit_all_exploration(v);
  let result = list.iter().map(|x| x.join("")).collect::<Vec<String>>().join(",");
  CString::new(result).unwrap().into_raw()
}

// #[no_mangle]
// pub unsafe fn bit_all_exploration_ptr(ptr: *mut u8, len: usize) -> *mut u8 {
//   let data = Vec::from_raw_parts(ptr, len, len);
//   let input_str = String::from_utf8(data).unwrap();
//   let v = input_str.split(",").collect::<Vec<&str>>();

//   let list = bit_all_exploration(v);
//   let mut result = list.iter().map(|x| x.join("")).collect::<Vec<String>>().join(",").as_bytes().to_owned();
//   let ptr = result.as_mut_ptr();
//   std::mem::forget(result);
//   ptr
// }

#[no_mangle]
pub unsafe fn bit_all_exploration_str(ptr: *mut u8, len: usize) -> *mut c_char {
  let data = Vec::from_raw_parts(ptr, len, len);
  let input_str = String::from_utf8(data).unwrap();
  let v = input_str.split(",").collect::<Vec<&str>>();

  let list = bit_all_exploration(v);
  let mut result = list.iter().map(|x| x.join("")).collect::<Vec<String>>().join(",").as_bytes().to_owned();
  let ptr = result.as_mut_ptr();
  let result_str = format!("{},{}", ptr as usize, result.len());
  std::mem::forget(result);
  CString::new(result_str).unwrap().into_raw()
}
