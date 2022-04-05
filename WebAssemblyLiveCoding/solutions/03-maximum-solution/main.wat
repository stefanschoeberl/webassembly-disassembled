(module
    (import "js" "array" (memory $array 1))
    (import "js" "length" (global $length i32))
    (import "js" "println" (func $println (param i32)))

    (func $findMax (result i32) (local $max i32) (local $i i32)
                                    ;; max = array[0];
        i32.const 0
        i32.load8_u
        local.set $max
                                    ;; i = 1;
        i32.const 1
        local.set $i

        block
            loop
                                    ;; while (i < length) {
                local.get $i
                global.get $length
                i32.lt_u
                i32.eqz
                br_if 1
                                    ;;     if (array[i] > max) {
                local.get $i
                i32.load8_u
                local.get $max
                i32.gt_u
                if
                                    ;;         max = a[i];
                    local.get $i
                    i32.load8_u
                    local.set $max
                                    ;;     }
                end
                                    ;;     i = i + 1;
                local.get $i
                i32.const 1
                i32.add
                local.set $i

                br 0
                                    ;; }
            end
        end

        local.get $max              ;; return max;
    )

    (func $main
        call $findMax
        call $println
    )
    (export "main" (func $main))
)