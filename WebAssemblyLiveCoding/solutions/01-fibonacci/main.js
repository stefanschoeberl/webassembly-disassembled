async function main() {
    const imports = {};
    
    const module = await WebAssembly.instantiateStreaming(
        fetch('./main.wasm'), imports);
    const instance = module.instance;
    for (let n = 0; n < 10; n++) {
        demoLog(instance.exports.fib(n));
    }
}
