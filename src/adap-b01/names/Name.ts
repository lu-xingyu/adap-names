export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    /** Expects that all Name components are properly masked */
    // @methodtype initialization-method
    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if(delimiter != undefined) {
            this.delimiter = delimiter
        }
    }

    /**
     * Returns a human-readable representation of the Name instance using user-set special characters
     * Special characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */

    /* asString: remove all the masking; 
       if char_j = ESCAPE, skip char_j, concat char_j+1, and continue with char_j+2 
       if cahr_j != ESCAPE, concat char_j, and continue with char_j+1
    */

    // @methodtype conversion-method
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

    /** 
     * Returns a machine-readable representation of Name instance using default special characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The special characters in the data string are the default characters
     */

    /* asDataString: if this.delimiter == default.delimiter, join all comp with default delimiter
       if this.delimiter != default.delimiter, remove the mask before original delimiter, and add mask to default delimiter
    */

    // @methodtype conversion-method
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

    /** Returns properly masked component string */
    // @methodtype get-method
    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        const original = this.components[i];
        return original  
    }

    /** Expects that new Name component c is properly masked */
    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        this.components[i] = c;      
    }

     /** Returns number of components in Name instance */
     // @methodtype get-method
     public getNoComponents(): number {
        return this.components.length;
    }

    /** Expects that new Name component c is properly masked */
    // @methodtype command-method
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    /** Expects that new Name component c is properly masked */
    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Component index ${i} out of range`);
        }
        this.components.splice(i, 1);
    }
}
