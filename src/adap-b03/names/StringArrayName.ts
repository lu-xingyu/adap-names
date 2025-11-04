import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }

    public clone(): Name {
        const clonedName = new StringArrayName(this.components, this.delimiter)
        return clonedName
    }

    public asString(delimiter: string = this.delimiter): string {
        return super.asString(delimiter);
    }

    public asDataString(): string {
        return super.asDataString()
    }

    public isEqual(other: Name): boolean {
        return super.isEqual(other)
    }

    public getHashCode(): number {
        return super.getHashCode()
    }

    public isEmpty(): boolean {
        return super.isEmpty()
    }

    public getDelimiterCharacter(): string {
        return super.getDelimiterCharacter()
    }

    public getNoComponents(): number {
        return this.components.length
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        const original = this.components[i];
        return original   
    }

    public getComponents() :string[] {
        return [...this.components]
    }

    public setComponent(i: number, c: string) {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        this.components[i] = c; 
    }

    public insert(i: number, c: string) {
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        super.concat(other)
    }
}