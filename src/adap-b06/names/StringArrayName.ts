import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected readonly components: string[] = [];

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

    public clone(): StringArrayName {
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

    public setComponent(i: number, c: string): StringArrayName {
        this.isValid()
        this.checkIndex(i, this.getNoComponents())
        this.checkComp(c)
        const newComps = this.getComponents()
        newComps[i] = c; 
        return new StringArrayName(newComps, this.getDelimiterCharacter())
    }

    public insert(i: number, c: string): StringArrayName {
        this.isValid()
        this.checkIndex(i, this.getNoComponents() + 1)
        this.checkComp(c)
        const newComps = this.getComponents()
        newComps.splice(i, 0, c);
        return new StringArrayName(newComps, this.getDelimiterCharacter())
    }

    public append(c: string): StringArrayName {
        this.isValid()
        this.checkComp(c)
        const newComps = this.getComponents()
        newComps.push(c)
        return new StringArrayName(newComps, this.getDelimiterCharacter())
    }

    public remove(i: number): StringArrayName {
        this.isValid()
        this.checkIndex(i, this.getNoComponents())
        const newComps = this.getComponents()
        newComps.splice(i, 1);
        return new StringArrayName(newComps, this.getDelimiterCharacter())
    }

    public concat(other: Name): AbstractName {
        this.isValid()
        return super.concat(other)
    }
}