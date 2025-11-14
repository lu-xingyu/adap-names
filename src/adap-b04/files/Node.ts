import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { Exception } from "../common/Exception";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        IllegalArgumentException.assert(typeof(bn) === "string")
        IllegalArgumentException.assert(pn instanceof Directory)
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        IllegalArgumentException.assert(to instanceof Directory)
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        IllegalArgumentException.assert(bn !== '')
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        IllegalArgumentException.assert(bn !== '')
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

}
