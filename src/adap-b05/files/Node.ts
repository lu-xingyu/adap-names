import { ServiceFailureException } from "../common/ServiceFailureException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { Exception } from "../common/Exception";
import { Name } from "../names/Name";
import { Directory } from "./Directory";


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
        this.isValid()
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

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        IllegalArgumentException.assert(bn !== "")
        this.isValid()
        const nodes = new Set<Node>()
        try {
            if (this.getBaseName() === bn) {
                nodes.add(this)
            }
            if (this.isDirectory()) {
                const children = (this as any).getChildNodes() as Set<Node>;
                for (const child  of children) {
                    const childNodes = child.findNodes(bn)
                    childNodes.forEach(n => nodes.add(n))
                }
            }
        } catch (error) {
            throw new ServiceFailureException("Service failed during findNodes", error as Exception);
        }
        return nodes
    }

    protected isDirectory() {
        return 'getChildNodes' in this && typeof (this as any).getChildNodes === 'function'
    }
}
