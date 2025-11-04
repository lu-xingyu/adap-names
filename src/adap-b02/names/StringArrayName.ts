import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        this.components = source;
        if(delimiter != undefined) {
            this.delimiter = delimiter
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        const newComponents =[];
        for (let comp of this.components) {
            let newC = ''
            for (let j = 0; j < comp.length; j++) {
                if(comp[j] === ESCAPE_CHARACTER) {
                    newC = newC + comp[j+1]
                    j++
                } else {
                    newC = newC + comp[j]
                } 
            }
            newComponents.push(newC);
        }        
        return newComponents.join(delimiter);
    }

    public asDataString(): string {
        if (this.delimiter !== DEFAULT_DELIMITER) {
            const newComponents = [];
            for (let comp of this.components) {
                let newC = ''
                for (let j = 0; j < comp.length; j++) {
                    if (comp[j] === DEFAULT_DELIMITER) {
                        newC = newC + ESCAPE_CHARACTER + comp[j];
                    } else if (comp[j] === this.delimiter && comp[j-1] === ESCAPE_CHARACTER) {
                        newC = newC.slice(0, newC.length - 1) + comp[j]
                    } else {
                        newC = newC + comp[j]
                    }
                }
                newComponents.push(newC);
            }
            return newComponents.join(DEFAULT_DELIMITER);
        }
        return this.components.join(DEFAULT_DELIMITER);
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
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        const original = this.components[i];
        return original   
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        this.components[i] = c; 
    }

    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        this.components.splice(i, 1);
    }

    // assume the delimiter is the same
    public concat(other: Name): void {
        if (other.getDelimiterCharacter() === this.delimiter) {
            for (let i = 0; i < other.getNoComponents(); i++) {
                const comp = other.getComponent(i)
                this.append(comp)
            }
        }
    }
}