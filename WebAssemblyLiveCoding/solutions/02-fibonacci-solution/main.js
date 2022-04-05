async function main() {
    const imports = {};
    
    const module = await WebAssembly.instantiateStreaming(
        fetch('./main.wasm'), imports);
    const instance = module.instance;
    for (let i = 0; i < 10; i++) {
        demoLog(instance.exports.fib(i));
    }
}
