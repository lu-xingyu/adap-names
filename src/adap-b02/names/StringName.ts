import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    // suppose source is not ''
    constructor(source: string, delimiter?: string) {
        if (delimiter) {
            this.delimiter = delimiter;
        }
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

    public asString(delimiter: string = this.delimiter): string {
        let returnS = ''
        for (let j = 0; j < this.name.length; j++) {
            if (this.name[j] === ESCAPE_CHARACTER) {
                returnS = returnS + this.name[j+1]
                j++
            } else if (this.name[j] === this.delimiter) {
                returnS = returnS + delimiter
            } else {
                returnS = returnS + this.name[j]
            }
        }
        return returnS;
    }

    public asDataString(): string {
        if (this.delimiter !== DEFAULT_DELIMITER) {
                let newS = ''
                for (let j = 0; j < this.name.length; j++) {
                    if (this.name[j] === DEFAULT_DELIMITER) {
                        newS = newS + ESCAPE_CHARACTER + this.name[j];
                    } else if (this.name[j] === this.delimiter && this.name[j-1] === ESCAPE_CHARACTER) {
                        newS = newS.slice(0, newS.length - 1) + this.name[j]
                    } else if (this.name[j] === this.delimiter) {
                        newS = newS + DEFAULT_DELIMITER
                    } else {
                        newS = newS + this.name[j]
                    }  
                }
            return newS
        }
        return this.name
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        if (this.getNoComponents() === 0) {
            return true;
        }
        return false;
    }

    public getNoComponents(): number {
        return this.noComponents;
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

    public getComponent(x: number): string {
        const Comps = this.getComponents()
        return Comps[x]
    }

    public setName(c: string): void {
        this.name = c
    }

    public setComponent(n: number, c: string): void {
        let Comps = this.getComponents()
        Comps[n] = c
        this.setName(Comps.join(this.delimiter))
    }

    public insert(n: number, c: string): void {
        let Comps = this.getComponents()
        Comps.splice(n, 0, c)
        this.setName(Comps.join(this.delimiter))
    }

    public append(c: string): void {
        let Comps = this.getComponents()
        Comps.push(c)
        this.setName(Comps.join(this.delimiter))
    }

    public remove(n: number): void {
        let Comps = this.getComponents()
        Comps.splice(n, 1)
        this.setName(Comps.join(this.delimiter))
    }

    // assume the delimiter is the same
    public concat(other: Name): void {
        let newName = this.name
        for (let i = 0; i < other.getNoComponents(); i++) {
            newName = newName + this.delimiter + other.getComponent(i)
        }
        this.setName(newName);
    }
}