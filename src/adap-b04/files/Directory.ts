import { Node } from "./Node";
import { Exception } from "../common/Exception";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        IllegalArgumentException.assert(cn instanceof Node)
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        IllegalArgumentException.assert(cn instanceof Node)
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        IllegalArgumentException.assert(this.hasChildNode(cn))
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }
}