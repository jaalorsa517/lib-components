import { Element } from "lib/shared/class/Element.cls";
import { ESCAPE } from "lib/shared/constantes/regex.constantes";
import { renderDom } from "lib/shared/utils";
import { JsonTransformTemplate } from "./JsonTransform.tmp";

export class JsonTransform extends Element {
  private _templateCls: JsonTransformTemplate;
  private _textArea: HTMLTextAreaElement | null = null;
  private _btnClear: HTMLButtonElement | null = null;
  private _btnCopy: HTMLButtonElement | null = null;

  constructor() {
    super();
    this._templateCls = new JsonTransformTemplate();
    this._render();
    this._init();
  }

  private _render() {
    renderDom(this);
  }

  private _init() {
    this._btnClear = this.getElement(`.${this._templateCls.clsNames.btnClear}`) as HTMLButtonElement | null;
    if (this._btnClear) this._btnClear.addEventListener("click", this.onClear.bind(this));

    this._btnCopy = this.getElement(`.${this._templateCls.clsNames.btnCopy}`) as HTMLButtonElement | null;
    if (this._btnCopy) this._btnCopy.addEventListener("click", this.onCopy.bind(this));

    this._textArea = this.getElement(`.${this._templateCls.clsNames.textArea}`) as HTMLTextAreaElement | null;
    if (this._textArea) {
      this._textArea.addEventListener("input", this.onInput.bind(this));
      this._textArea.addEventListener("paste", this.onPaste.bind(this));
    }
  }

  private onClear() {
    if (this._textArea) this._textArea.value = "";
  }
  private onCopy() {
    if (this._textArea) {
      navigator.clipboard.writeText(this._textArea.value);
      const popup: HTMLDivElement = document.createElement("div");
      popup.classList.add(this._templateCls.clsNames.popup);
      popup.textContent = "¡copiado!";
      this._btnCopy?.appendChild(popup);
      setTimeout(() => {
        this._btnCopy?.removeChild(popup);
      }, 2000);
    }
  }
  private onInput() {
    if (this._textArea) {
      this._textArea.value = this.formatJson(this._textArea.value);
    }
  }
  private onPaste(e: ClipboardEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (this._textArea) {
      const clipboard: DataTransfer | null = e.clipboardData;
      const text: string = clipboard?.getData("text/plain") || "";
      this._textArea.value = this.formatJson(text);
    }
  }

  private textReplace(text: string) {
    return text
      .replace(ESCAPE.newLine.regex, ESCAPE.newLine.value)
      .replace(ESCAPE.doubleQuote.regex, ESCAPE.doubleQuote.value)
      .replace(ESCAPE.tab.regex, ESCAPE.tab.value);
  }

  private formatJson(text: string) {
    let textCleared = "";
    try {
      const textParsed = JSON.parse(this.textReplace(text));
      textCleared = JSON.stringify(textParsed, null, 2);
    } catch (error) {
      textCleared = this.textReplace(text);
    }
    return textCleared;
  }

  disconnectedCallback() {
    if (this._btnClear) this._btnClear.removeEventListener("click", this.onClear.bind(this));

    if (this._btnCopy) this._btnCopy.removeEventListener("click", this.onCopy.bind(this));

    if (this._textArea) {
      this._textArea.removeEventListener("input", this.onInput.bind(this));
      this._textArea.removeEventListener("paste", this.onPaste.bind(this));
    }
  }
}
