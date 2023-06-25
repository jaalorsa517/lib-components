import { describe, it, expect, vi } from "vitest";
import { Types } from "lib/shared/enums";
import { getType, renderDom, renderDomOpen } from "lib/shared/utils/index";

describe("[Utilidades] función getType", () => {
  const mockDOM = {
    innerHTML: "",
  };

  it("Validar que el tipo de dato no está mapeado", () => {
    //Arrange
    const type: string = "Symbol";
    const value: string = "Symbol";
    const response: string = "";

    //Act
    const result = getType(value, type as Types, mockDOM);

    //Assert
    expect(result).toBe(response);
  });

  it("Validar que el tipo sea booleano", () => {
    //Arrange
    const type: Types = Types.BOOLEAN;
    const value: string = "true";
    const response: boolean = true;

    //Act
    const result = getType(value, type, mockDOM);

    //Assert
    expect(result).toBe(response);
  });

  it("Validar que el tipo NO sea booleano", () => {
    //Arrange
    const type: Types = Types.BOOLEAN;
    const value: string = "hello";
    const response: string = "";

    //Act
    const result = getType(value, type, mockDOM);

    //Assert
    expect(result).toBe(response);
  });

  it("Validar que el tipo sea string", () => {
    //Arrange
    const type: Types = Types.STRING;
    const value: string = "hello";
    const response: string = "hello";

    //Act
    const result = getType(value, type, mockDOM);

    //Assert
    expect(result).toBe(response);
  });

  it("Validar que el tipo NO sea string", () => {
    //Arrange
    const type: Types = Types.STRING;
    const value: string = "null";
    const response: string = "";

    //Act
    const result = getType(value, type, mockDOM);

    //Assert
    expect(result).toBe(response);
  });

  it("Validar que el tipo sea number", () => {
    //Arrange
    const type: Types = Types.NUMBER;
    const value: string = "1";
    const response: number = 1;

    //Act
    const result = getType(value, type, mockDOM);

    //Assert
    expect(result).toBe(response);
  });

  it("Validar que el tipo NO sea number", () => {
    //Arrange
    const type: Types = Types.NUMBER;
    const value: string = "1feeq";
    const response: string = "";

    //Act
    const result = getType(value, type, mockDOM);

    //Assert
    expect(result).toBe(response);
  });

  it("Validar que el tipo sea object", () => {
    //Arrange
    const type: Types = Types.OBJECT;
    const value: string = "{}";
    const response: object = {};

    //Act
    const result = getType(value, type, mockDOM);

    //Assert
    expect(result).toStrictEqual(response);
  });

  it("Validar que el tipo NO sea object", () => {
    //Arrange
    const type: Types = Types.OBJECT;
    const value: string = "hello";
    const response: string = "";

    //Act
    const result = getType(value, type, mockDOM);

    //Assert
    expect(result).toBe(response);
  });
});

describe("[Utilidades] funciones renderDom", () => {
  it("Render DOM", () => {
    //Arrange
    const dom = {
      shadowDOM: document.createElement("div"),
      _templateCls: {
        style: "body { color: red; }",
        template: "<div>Hello World</div>",
      },
      setAttribute: vi.fn(),
    };

    //Act
    renderDom(dom);

    //Assert
    expect(dom.shadowDOM.children.length).toEqual(2);
    expect(dom.shadowDOM.children[0].tagName).toEqual("STYLE");
    expect(dom.shadowDOM.children[0].textContent).toEqual("body { color: red; }");
    expect(dom.shadowDOM.children[1].tagName).toEqual("DIV");
    expect(dom.shadowDOM.children[1].textContent).toEqual("Hello World");
    expect(dom.setAttribute).toBeCalled();
  });

  it("Render DOM open", () => {
    const dom = {
      _templateCls: {
        style: "body { color: red; }",
        template: "<div>Hello World</div>",
      },
      append: vi.fn(),
      setAttribute: vi.fn(),
    };

    // Act
    renderDomOpen(dom);

    // Assert
    expect(dom.append).toHaveBeenCalledWith(expect.any(DocumentFragment));
    expect(dom.setAttribute).toHaveBeenCalled();
  });
});
