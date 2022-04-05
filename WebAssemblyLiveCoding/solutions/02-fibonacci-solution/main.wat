(module
    (func $fib (param $n i32) (result i32)
        local.get $n
        i32.const 1
        i32.le_u
                                    ;; if (i <= 1) {
        if (result i32)
                                    ;;     return n;
            local.get $n
                                    ;; } else {
        else
                                    ;;     return fib(n-1) + fib(n-2);
            local.get $n
            i32.const 1
            i32.sub
            call $fib

            local.get $n
            i32.const 2
            i32.sub
            call $fib

            i32.add
                                    ;; }
        end
    )
    (export "fib" (func $fib))
)