import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source
        for (let i = 0; i < this.name.length; i++) {
            if (this.name[i] === this.delimiter) {
                if (i >= 1 && this.name[i-1] === ESCAPE_CHARACTER) {
                    continue
                }
                this.noComponents++
            }
        }
        this.noComponents++
    }

    public clone(): Name {
        const clonedName = new StringName(this.name, this.delimiter)
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
        return this.noComponents;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`Component index ${i} out of range`);
        }
        const Comps = this.getComponents()
        return Comps[i]
    }

    public getComponents(): string[] {
        let Comps = []
        let CurrentComp = ''
        for (let i = 0; i < this.name.length; i++) {
            if (this.name[i] === this.delimiter) {
                if (i - 1 < 0 || this.name[i-1] !== ESCAPE_CHARACTER) {
                    Comps.push(CurrentComp);
                    CurrentComp = '';
                    continue;
                }
            }
            CurrentComp = CurrentComp + this.name[i];
        }
        Comps.push(CurrentComp)
        return Comps
    }

    public setComponent(i: number, c: string) {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`Component index ${i} out of range`);
        }
        let Comps = this.getComponents()
        Comps[i] = c
        this.name = Comps.join(this.delimiter)
    }

    public insert(i: number, c: string) {
        let Comps = this.getComponents()
        Comps.splice(i, 0, c)
        this.name = Comps.join(this.delimiter)
    }

    public append(c: string) {
        let Comps = this.getComponents()
        Comps.push(c)
        this.name = Comps.join(this.delimiter)
    }

    public remove(i: number) {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`Component index ${i} out of range`);
        }
        let Comps = this.getComponents()
        Comps.splice(i, 1)
        this.name = Comps.join(this.delimiter)
    }

    public concat(other: Name): void {
        super.concat(other)
    }

}