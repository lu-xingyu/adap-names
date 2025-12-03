import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected readonly name: string = "";
    protected readonly noComponents: number = 0;

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

    public clone(): StringName {
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

    public setComponent(i: number, c: string): StringName {
        this.isValid()
        this.checkIndex(i, this.getNoComponents())
        this.checkComp(c)
        let Comps = this.getComponents()
        Comps[i] = c
        const newName = Comps.join(this.getDelimiterCharacter())
        return new StringName(newName, this.getDelimiterCharacter())
    }

    public insert(i: number, c: string) : StringName {
        this.isValid()
        this.checkIndex(i, this.getNoComponents() + 1)
        this.checkComp(c)
        let Comps = this.getComponents()
        Comps.splice(i, 0, c)
        const newName = Comps.join(this.getDelimiterCharacter())
        return new StringName(newName, this.getDelimiterCharacter())
    }

    public append(c: string): StringName {
        this.isValid()
        this.checkComp(c)
        let Comps = this.getComponents()
        Comps.push(c)
        const newName = Comps.join(this.getDelimiterCharacter())
        return new StringName(newName, this.getDelimiterCharacter())
    }

    public remove(i: number): StringName {
        this.isValid()
        this.checkIndex(i, this.getNoComponents())
        let Comps = this.getComponents()
        Comps.splice(i, 1)
        const newName = Comps.join(this.getDelimiterCharacter())
        return new StringName(newName, this.getDelimiterCharacter())
    }

    public concat(other: Name): AbstractName {
        this.isValid()
        return super.concat(other)
    }

}