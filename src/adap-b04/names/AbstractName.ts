import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { Exception } from "../common/Exception";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter
    }

    protected isValid() {
        InvalidStateException.assert(typeof(this.delimiter) === "string" && this.delimiter.length === 1)
    }

    abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        IllegalArgumentException.assert(delimiter.length === 1)
        const components = this.getComponents()

        const newComponents =[];
        for (let comp of components) {
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

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        const components = this.getComponents()
        if (this.delimiter !== DEFAULT_DELIMITER) {
            const newComponents = [];
            for (let comp of components) {
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
        return components.join(DEFAULT_DELIMITER); 
    }

    public isEqual(other: Name): boolean {
        return this.getDelimiterCharacter() === other.getDelimiterCharacter() &&
               this.getNoComponents() === other.getNoComponents() &&
               this.asDataString() === other.asDataString()
    }

    public getHashCode(): number {
        const thisString = this.getComponents().join(this.getDelimiterCharacter()) + this.getDelimiterCharacter()
        let hash = 0
        for (let i = 0; i < thisString.length; i++) {
            hash = hash * 31 + thisString.charCodeAt(i) | 0
        }
        return hash
    }

    public isEmpty(): boolean {
        if (this.getNoComponents() === 0) {
            return true;
        }
        return false;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getComponents(): string[];

    abstract getNoComponents(): number;

    public getComponent(i: number): string {
        this.isValid()
        this.checkIndex(i, this.getNoComponents())
        const comps = this.getComponents()
        return comps[i]
    }

    public checkIndex(i: number, max: number): void {
        IllegalArgumentException.assert(i >= 0 && i < max)
    }

    public checkComp(c: string): void {
        IllegalArgumentException.assert(c !== this.getDelimiterCharacter())
    }

    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        IllegalArgumentException.assert(other instanceof AbstractName)
        if (other.getDelimiterCharacter() === this.getDelimiterCharacter()) {
            for (let i = 0; i < other.getNoComponents(); i++) {
                this.append(other.getComponent(i))
            }    
        } else {
            for (let i = 0; i < other.getNoComponents(); i++) {
                const comp = other.getComponent(i)
                let newC = ''
                for (let j = 0; j < comp.length; j++) {
                    if (comp[j] === this.getDelimiterCharacter()) {
                        newC = newC + ESCAPE_CHARACTER + comp[j];
                    } else if (comp[j] === other.getDelimiterCharacter() && comp[j-1] === ESCAPE_CHARACTER) {
                        newC = newC.slice(0, newC.length - 1) + comp[j]
                    } else {
                        newC = newC + comp[j]
                    }
                } 
                this.append(newC)
            }
        }
    }
}