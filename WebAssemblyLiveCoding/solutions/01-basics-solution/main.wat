(module
    (import "js" "println" (func $println (param i32)))
    (func $main (local $a i32)
                                    ;; a = 42
        i32.const 42
        local.set $a
                                    ;; println(123)
        i32.const 123
        call $println

                                    ;; println(1 + 2)
        i32.const 1
        i32.const 2
        i32.add
        call $println
                                    ;; println(4 + 2 * 3)
        i32.const 4
        i32.const 2
        i32.const 3
        i32.mul
        i32.add
        call $println
                                    ;; println(a)
        local.get $a
        call $println

    )
    (export "main" (func $main))
)