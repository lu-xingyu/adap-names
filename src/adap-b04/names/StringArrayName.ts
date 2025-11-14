import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    protected isValid() {
        super.isValid()
        const isArray = Array.isArray(this.components)
        let compValid = true
        const type = typeof(this.components[0])
        for (let i = 0; i < this.components.length; i++) {
            if (type !== typeof(this.components[i]) || this.components[i] === null) {
                compValid = false
                break
            }
        }

        InvalidStateException.assert(isArray && compValid)
    }

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }

    public clone(): Name {
        this.isValid()
        const clonedName = new StringArrayName(this.components, this.delimiter)
        return clonedName
    }

    public asString(delimiter: string = this.delimiter): string {
        this.isValid()
        return super.asString(delimiter);
    }

    public asDataString(): string {
        this.isValid()
        return super.asDataString()
    }

    public isEqual(other: Name): boolean {
        this.isValid()
        return super.isEqual(other)
    }

    public getHashCode(): number {
        this.isValid()
        return super.getHashCode()
    }

    public isEmpty(): boolean {
        this.isValid()
        return super.isEmpty()
    }

    public getDelimiterCharacter(): string {
        this.isValid()
        return super.getDelimiterCharacter()
    }

    public getNoComponents(): number {
        this.isValid()
        return this.components.length
    }

    public getComponent(i: number): string {
        this.isValid()
        return super.getComponent(i)
    }

    public getComponents() :string[] {
        this.isValid()
        return [...this.components]
    }

    public setComponent(i: number, c: string) {
        this.isValid()
        this.checkIndex(i, this.getNoComponents())
        this.checkComp(c)
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        this.components[i] = c; 
    }

    public insert(i: number, c: string) {
        this.isValid()
        this.checkIndex(i, this.getNoComponents() + 1)
        this.checkComp(c)
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.isValid()
        this.checkComp(c)
        this.components.push(c);
    }

    public remove(i: number) {
        this.isValid()
        this.checkIndex(i, this.getNoComponents())
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        this.isValid()
        
        super.concat(other)
    }
}