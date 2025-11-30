import { describe, it, expect } from "vitest";

import { StringName } from "./StringName";
import { StringArrayName } from "./StringArrayName";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

describe("StringArrayName Class Invariant Tests", () => {
  it("test class invariant", () => {
    let n = new StringArrayName(["adap", "foss"]);
    n["delimiter"] = "delimiter";
    expect(() => n.clone()).toThrowError(InvalidStateException);
    expect(() => n.asString()).toThrowError(InvalidStateException);
    expect(() => n.asDataString()).toThrowError(InvalidStateException);
    expect(() => n.getDelimiterCharacter()).toThrowError(InvalidStateException);
    expect(() => n.isEqual(new StringName("adap.foss"))).toThrowError(InvalidStateException);
    expect(() => n.getHashCode()).toThrowError(InvalidStateException);
    expect(() => n.isEmpty()).toThrowError(InvalidStateException);
    expect(() => n.getNoComponents()).toThrowError(InvalidStateException);
    expect(() => n.getComponent(0)).toThrowError(InvalidStateException);
    expect(() => n.setComponent(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.insert(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.append("a")).toThrowError(InvalidStateException);
    expect(() => n.remove(0)).toThrowError(InvalidStateException);
    expect(() => n.concat(new StringName("wiso.de"))).toThrowError(InvalidStateException);

    n = new StringArrayName(["adap", "foss"]);
    (n["components"] as any) = "string-instead-of-array";
    expect(() => n.getNoComponents()).toThrowError(InvalidStateException);
    expect(() => n.getComponent(0)).toThrowError(InvalidStateException);
    expect(() => n.setComponent(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.insert(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.append("a")).toThrowError(InvalidStateException);
    expect(() => n.remove(0)).toThrowError(InvalidStateException);

    n = new StringArrayName(["adap", "foss"]);
    (n["components"] as any) = [99, "string", true]; // different types
    expect(() => n.getNoComponents()).toThrowError(InvalidStateException);
    expect(() => n.getComponent(0)).toThrowError(InvalidStateException);
    expect(() => n.setComponent(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.insert(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.append("a")).toThrowError(InvalidStateException);
    expect(() => n.remove(0)).toThrowError(InvalidStateException);

    n = new StringArrayName(["adap", "foss"]);
    (n["components"] as any) = [null, "string"]; 
    expect(() => n.getNoComponents()).toThrowError(InvalidStateException);
    expect(() => n.getComponent(0)).toThrowError(InvalidStateException);
    expect(() => n.setComponent(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.insert(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.append("a")).toThrowError(InvalidStateException);
    expect(() => n.remove(0)).toThrowError(InvalidStateException);

    n = new StringArrayName(["adap", "foss"]);
    (n["components"] as any) = {}; 
    expect(() => n.getNoComponents()).toThrowError(InvalidStateException);
    expect(() => n.getComponent(0)).toThrowError(InvalidStateException);
    expect(() => n.setComponent(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.insert(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.append("a")).toThrowError(InvalidStateException);
    expect(() => n.remove(0)).toThrowError(InvalidStateException);
  });
});

describe("StringName Class Invariant Tests", () => {
  it("test class invariant", () => {
    let n = new StringName("adap.foss");
    n["delimiter"] = "longthan1";
    expect(() => n.clone()).toThrowError(InvalidStateException);
    expect(() => n.asString()).toThrowError(InvalidStateException);
    expect(() => n.asDataString()).toThrowError(InvalidStateException);
    expect(() => n.getDelimiterCharacter()).toThrowError(InvalidStateException);
    expect(() => n.isEqual(new StringArrayName([""]))).toThrowError(InvalidStateException);
    expect(() => n.getHashCode()).toThrowError(InvalidStateException);
    expect(() => n.isEmpty()).toThrowError(InvalidStateException);
    expect(() => n.getNoComponents()).toThrowError(InvalidStateException);
    expect(() => n.getComponent(0)).toThrowError(InvalidStateException);
    expect(() => n.setComponent(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.insert(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.append("a")).toThrowError(InvalidStateException);
    expect(() => n.remove(0)).toThrowError(InvalidStateException);
    expect(() => n.concat(new StringArrayName([""]))).toThrowError(InvalidStateException);

    n = new StringName("adap.foss");
    (n["name"] as any) = [0, 2, 4];
    expect(() => n.getNoComponents()).toThrowError(InvalidStateException);
    expect(() => n.getComponent(0)).toThrowError(InvalidStateException);
    expect(() => n.setComponent(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.insert(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.append("a")).toThrowError(InvalidStateException);
    expect(() => n.remove(0)).toThrowError(InvalidStateException);

    n = new StringName("adap.foss");
    (n["noComponents"] as any) = {};
    expect(() => n.getNoComponents()).toThrowError(InvalidStateException);
    expect(() => n.getComponent(0)).toThrowError(InvalidStateException);
    expect(() => n.setComponent(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.insert(0, "a")).toThrowError(InvalidStateException);
    expect(() => n.append("a")).toThrowError(InvalidStateException);
    expect(() => n.remove(0)).toThrowError(InvalidStateException);
  });


});

describe("Precondition Tests", () => {
  it("test asString()", () => {
    let n = new StringName("adap.foss.wiso.de");
    expect(() => n.asString("longwethan1")).toThrowError(IllegalArgumentException);
  });

  it("test getComponent()", () => {
    // precondition
    let n = new StringName("adap.foss.wiso.de");
    expect(() => n.getComponent(-1)).toThrowError(IllegalArgumentException);
    expect(() => n.getComponent(4)).toThrowError(IllegalArgumentException);

    expect(n.getComponent(0)).toBe("adap");
    expect(n.getComponent(3)).toBe("de");
  });

  it("test setComponent()", () => {
    // precondition
    let n = new StringName("adap.foss.wiso.de");
    expect(() => n.setComponent(4, "sbom")).toThrowError(IllegalArgumentException);
    expect(() => n.setComponent(-1, "sbom")).toThrowError(IllegalArgumentException);
    expect(() => n.setComponent(0, ".")).toThrowError(IllegalArgumentException);

  });

  it("test insert()", () => {
    // precondition
    let n = new StringName("adap.foss.wiso");
    expect(() => n.insert(-1, "study")).toThrowError(IllegalArgumentException);
    expect(() => n.insert(5, "study")).toThrowError(IllegalArgumentException);
    expect(() => n.insert(0, ".")).toThrowError(IllegalArgumentException);
  });

  it("test append()", () => {
    // precondition
    let n = new StringName("");
    expect(() => n.append(".")).toThrowError(IllegalArgumentException);

    n = new StringName("adap.foss.wiso.de", "#");
    expect(() => n.append("#")).toThrowError(IllegalArgumentException);
  });

  it("test remove()", () => {
    // precondition
    let n = new StringName("adap.foss.wiso.de");
    expect(() => n.remove(-1)).toThrowError(IllegalArgumentException);

    n = new StringName("adap.foss.wiso.de");
    expect(() => n.remove(27)).toThrowError(IllegalArgumentException);
  });

  it("test concat()", () => {
    // precondition
    let n = new StringName("adap.foss");
    expect(() => n.concat({} as any)).toThrowError(IllegalArgumentException);
    expect(() => n.concat(Object.setPrototypeOf({}, StringArrayName))).toThrowError(IllegalArgumentException);
  });


  it("test isEqual()", () => {
    // precondition
    let n: AbstractName = new StringName("adap.foss");
    expect(() => n.concat({} as any)).toThrowError(IllegalArgumentException);
    expect(() => n.concat(Object.setPrototypeOf({}, StringArrayName))).toThrowError(IllegalArgumentException);
  });
})