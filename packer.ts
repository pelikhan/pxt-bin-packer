namespace binpacker {
    export interface Block {
        w: number;
        h: number;
        fit?: Node;
    }

    export class Node {
        used: boolean;
        data: any;
        down: Node;
        right: Node;
        fit: Node;

        constructor(public x: number, public y: number, public w: number, public h: number) {
        }
    }

    export class GrowingPacker {
        root: Node;
        fit(blocks: Block[]) {
            const len = blocks.length;

            let node: Node;
            const w = len > 0 ? blocks[0].w : 0;
            const h = len > 0 ? blocks[0].h : 0;
            this.root = new Node(0, 0, w, h);
            for (let n = 0; n < len ; n++) {
            const block = blocks[n];
            if (node = this.findNode(this.root, block.w, block.h))
                block.fit = this.splitNode(node, block.w, block.h);
            else
                block.fit = this.growNode(block.w, block.h);
            }
        }

        findNode(root: Node, w: number, h: number): Node {
            if (root.used)
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
            else if ((w <= root.w) && (h <= root.h))
            return root;
            else
            return null;
        }

        splitNode(node: Node, w: number, h: number): Node {
            node.used = true;
            node.down  = new Node(node.x,     node.y + h, node.w,     node.h - h);
            node.right = new Node(node.x + w, node.y,     node.w - w, h)
            return node;
        }

        growNode(w: number, h: number) {
            const canGrowDown  = (w <= this.root.w);
            const canGrowRight = (h <= this.root.h);

            const shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
            const shouldGrowDown  = canGrowDown  && (this.root.w >= (this.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

            if (shouldGrowRight)
            return this.growRight(w, h);
            else if (shouldGrowDown)
            return this.growDown(w, h);
            else if (canGrowRight)
            return this.growRight(w, h);
            else if (canGrowDown)
            return this.growDown(w, h);
            else
            return null; // need to ensure sensible root starting size to avoid this happening
        }

        growRight(w: number, h: number) {
            const down = this.root;
            const right = new Node(this.root.w, 0, w, this.root.h);
            this.root = new Node(0, 0, this.root.w + w, this.root.h);
            this.root.used = true;
            this.root.down = down;
            this.root.right = right;
            let node: Node;
            if (node = this.findNode(this.root, w, h))
            return this.splitNode(node, w, h);
            else
            return null;
        }

        growDown(w: number, h: number): Node {
            const down = new Node(0, this.root.h, this.root.w, h);
            const right = this.root;      
            this.root = new Node(0, 0, this.root.w, this.root.h+h);
            this.root.used = true;
            this.root.down = down;
            this.root.right = right;
            let node: Node;
            if (node = this.findNode(this.root, w, h))
            return this.splitNode(node, w, h);
            else
            return null;
        }
    }
}
