import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

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

    protected isValid():void {
        super.isValid()
        InvalidStateException.assert(typeof(this.name) === "string" && typeof(this.noComponents) == "number")
    }

    public clone(): Name {
        this.isValid()
        const clonedName = new StringName(this.name, this.delimiter)
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
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.isValid()
        return super.getComponent(i)
    }

    public getComponents(): string[] {
        this.isValid()
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
        this.isValid()
        this.checkIndex(i, this.getNoComponents())
        this.checkComp(c)
        let Comps = this.getComponents()
        Comps[i] = c
        this.name = Comps.join(this.delimiter)
    }

    public insert(i: number, c: string) {
        this.isValid()
        this.checkIndex(i, this.getNoComponents() + 1)
        this.checkComp(c)
        let Comps = this.getComponents()
        Comps.splice(i, 0, c)
        this.name = Comps.join(this.delimiter)
        this.noComponents++
    }

    public append(c: string) {
        this.isValid()
        this.checkComp(c)
        let Comps = this.getComponents()
        Comps.push(c)
        this.name = Comps.join(this.delimiter)
        this.noComponents++
    }

    public remove(i: number) {
        this.isValid()
        this.checkIndex(i, this.getNoComponents())
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`Component index ${i} out of range`);
        }
        let Comps = this.getComponents()
        Comps.splice(i, 1)
        this.name = Comps.join(this.delimiter)
        this.noComponents--
    }

    public concat(other: Name): void {
        this.isValid()
        super.concat(other)
    }

}