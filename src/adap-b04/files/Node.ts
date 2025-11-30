import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { Exception } from "../common/Exception";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    protected isValid() {
        InvalidStateException.assert(
            ( this.parentNode as Node === this ) ||
            this.baseName !== "")
        InvalidStateException.assert(this.parentNode.isDirectory())
    }

    constructor(bn: string, pn: Directory) {
        IllegalArgumentException.assert(typeof(bn) === "string")
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        IllegalArgumentException.assert(to.isDirectory())
        this.isValid()
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        this.isValid()
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        this.isValid()
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        this.isValid()
        return this.baseName;
    }

    public rename(bn: string): void {
        IllegalArgumentException.assert(bn !== '')
        this.isValid()
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        IllegalArgumentException.assert(bn !== '')
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        this.isValid()
        return this.parentNode;
    }
    
    protected isDirectory() {
        return 'getChildNodes' in this && typeof (this as any).getChildNodes === 'function'
    }
}
