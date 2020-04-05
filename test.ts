// tests go here; this will not be compiled when this package is used as an extension.
let blocks: binpacker.Block[] = [];
let nn = 0;
function pack() {
    blocks = []
    nn = 0;
    let ni = Math.randomRange(20, 60)
    for(let i = 0; i < ni; ++i) {
        blocks.push({
            w: Math.randomRange(10, 20),
            h: Math.randomRange(10, 60)
        })
    }
    blocks.sort((l, r) => -Math.max(l.w, l.h) + Math.max(r.w, r.h));
    const packer = new binpacker.GrowingPacker();
    packer.fit(blocks);
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    pack();  
})

game.onPaint(function () {
    nn = Math.min(blocks.length, nn + 1);
    for(let n = 0 ; n < nn; n++) {
        const block = blocks[n];
        if (block.fit) {
            screen.fillRect(block.fit.x, block.fit.y, block.w, block.h, 1 + (n % 14));
        }
    }
})

pack();
