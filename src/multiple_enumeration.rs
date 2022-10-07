use std::convert::TryInto;

#[no_mangle]
pub extern "C" fn multiple_enumeration(n: i32) -> i32 {
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
    return result.len().try_into().unwrap();
}