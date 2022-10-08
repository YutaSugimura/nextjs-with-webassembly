use std::ffi::CString;
use std::os::raw::c_char;

#[no_mangle]
pub fn multiple_enumeration(n: i32) -> *mut c_char {
    let mut result = Vec::<i32>::new();

    let num: f64 = From::from(n);
    for i in 1..=n {
        let item: f64 = From::from(i);
        if num.sqrt() < item {
            break;
        }

        if n % i == 0 {
            result.push(i);
        }
    }

    for item in result.clone() {
        let cul = n / item;

        if cul != item {
            result.push(n / item);
        }
    }

    result.sort();
    let result_str = result
        .iter()
        .map(|i| i.to_string())
        .collect::<Vec<String>>()
        .join(",");
    return CString::new(result_str).unwrap().into_raw();
}
