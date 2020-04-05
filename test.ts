// tests go here; this will not be compiled when this package is used as an extension.
const blocks: binpacker.Block[] = [];
for(let i = 0; i < 60; ++i) {
    blocks.push({
        w: Math.randomRange(1, 20),
        h: Math.randomRange(1, 60)
    })
}
blocks.sort((l, r) => -Math.max(l.w, l.h) + Math.max(r.w, r.h));
const packer = new binpacker.GrowingPacker();
packer.fit(blocks);

game.onPaint(function () {
    for(let n = 0 ; n < blocks.length ; n++) {
        const block = blocks[n];
        if (block.fit) {
            screen.fillRect(block.fit.x, block.fit.y, block.w, block.h, 1 + (n % 14));
        }
    }
})
