#[no_mangle]
pub extern "C" fn is_prime_number(x: i32) -> bool {
    if x < 2 {
        return false;
    }

    let mut i = 2;
    while i * i <= x {
        if x % i == 0 {
            return false;
        }
        i += 1;
    }
    true
}
