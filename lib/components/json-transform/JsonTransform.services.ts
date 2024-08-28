import { JsonTransformServiceType, JsonTransformType } from "lib/components/json-transform/JsonTransform.type";
import { ElementOpen } from "lib/shared/class/ElementOpen.csl";
import { ESCAPE, Regex } from "lib/shared/constantes/regex.constantes";
import { Validates } from "lib/shared/enums";
import { ITemplate } from "lib/shared/interfaces/Template.interface";

export class JsonTransformService {
  private _templateCls: ITemplate<JsonTransformType>;
  private _elementAttr: ElementOpen;
  private _textArea: HTMLTextAreaElement | null = null;
  private _btnClear: HTMLButtonElement | null = null;
  private _btnCopy: HTMLButtonElement | null = null;
  private _btnFormat: HTMLButtonElement | null = null;

  constructor(jsonTransformServiceType: JsonTransformServiceType) {
    this._templateCls = jsonTransformServiceType.template;
    this._elementAttr = jsonTransformServiceType.elementAttr;
  }

  private onClear() {
    if (!this._textArea) return
    this.validate(Validates.VALIDATE);
    this._textArea.value = "";
  }

  private onCopy() {
    if (!this._textArea) return
    navigator.clipboard.writeText(this._textArea.value);
    const popup: HTMLDivElement = document.createElement("div");
    popup.classList.add(this._templateCls.getClsNames().popup);
    popup.textContent = "¡copiado!";
    this._btnCopy?.appendChild(popup);
    setTimeout(() => {
      this._btnCopy?.removeChild(popup);
    }, 2000);
  }

  private onInput(e: any) {
    const isEscape = !Boolean(e.data);
    e.preventDefault();
    if (isEscape) return;

    if (this._textArea) {
      this._textArea.value = this.formatJson(this._textArea.value);
    }
  }

  private onKeyDown(e: any) {
    if (e.code === "Tab") {
      e.preventDefault();
      if (!this._textArea) return
      const start = this._textArea.selectionStart;
      const end = this._textArea.selectionEnd;
      const value = this._textArea.value;
      this._textArea.value = value.substring(0, start) + "\t" + value.substring(end);
      this._textArea.selectionStart = this._textArea.selectionEnd = start + 1;
      return;
    }
  }

  private onPaste(e: ClipboardEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this._textArea) return
    const clipboard: DataTransfer | null = e.clipboardData;
    const text: string = clipboard?.getData("text/plain") || "";
    this._textArea.value = this.formatJson(text);
  }

  private onFormat() {
    if (this._textArea && this._textArea.value) {
      this._textArea.value = this.formatJson(this._textArea.value);
    }
  }

  private textReplaceScaped(text: string): string {
    return text
      .replace(ESCAPE.newLine.regex, ESCAPE.nothing.value)
      .replace(ESCAPE.doubleQuote.regex, ESCAPE.doubleQuote.value)
      .replace(ESCAPE.tab.regex, ESCAPE.nothing.value)
      .replace(ESCAPE.backSlash.regex, ESCAPE.nothing.value)
  }

  private textReplace(text: string): string {
    return this.textReplaceScaped(text)
      .replace(Regex.COMMA_END, `$1$2${ESCAPE.newLine.value}`)
      .replace(Regex.COMMA_BEFORE_CLOSE, "$1")
      .replaceAll(Regex.OPEN_CONTENT, `$1${ESCAPE.newLine.value}`)
      .replaceAll(Regex.CLOSE_CONTENT, `${ESCAPE.newLine.value}$1`)
      .replaceAll(Regex.NEW_LINE_DUPLICATED, ESCAPE.newLine.value)
      .replace(Regex.LOOK_KEY_OBJECT, '"$2": $4');
  }

  private formatJson(text: string) {
    let textCleared = "";
    try {
      const textReplace = this.textReplace(text);
      const textParsed = JSON.parse(textReplace);
      textCleared = JSON.stringify(textParsed, null, 4);
      this.validate(Validates.VALIDATE);
    } catch (error: any) {
      console.warn(error.message);
      this.validate(Validates.ERROR);
      textCleared = this.textReplaceScaped(text);

    }
    return textCleared;
  }

  private validate(type: Validates) {
    if (!this._textArea) return
    if (type === Validates.ERROR && !this._textArea.nextElementSibling) {
      const error = document.createElement("div");
      error.textContent = "JSON no válido";
      error.classList.add(this._templateCls.getClsNames().errorInput);
      this._textArea.classList.add(this._templateCls.getClsNames().textAreaError);
      this._textArea.after(error);
      return;
    }
    if (type === Validates.VALIDATE && this._textArea.nextElementSibling) {
      this._textArea.classList.remove(this._templateCls.getClsNames().textAreaError);
      this._textArea.nextElementSibling.remove();
      return
    }
  }

  connectedCallback() {
    this._elementAttr.render(this._init.bind(this))
  }

  private _init(): void {
    this._btnClear = this._elementAttr.getElement(`.${this._templateCls.getClsNames().btnClear}`) as HTMLButtonElement;
    if (this._btnClear) this._btnClear.addEventListener("click", this.onClear.bind(this));

    this._btnCopy = this._elementAttr.getElement(`.${this._templateCls.getClsNames().btnCopy}`) as HTMLButtonElement;
    if (this._btnCopy) this._btnCopy.addEventListener("click", this.onCopy.bind(this));

    this._btnFormat = this._elementAttr.getElement(`.${this._templateCls.getClsNames().btnFormat}`) as HTMLButtonElement;
    if (this._btnFormat) this._btnFormat.addEventListener("click", this.onFormat.bind(this));

    this._textArea = this._elementAttr.getElement(`.${this._templateCls.getClsNames().textArea}`) as HTMLTextAreaElement;
    if (this._textArea) {
      this._textArea.addEventListener("keydown", this.onKeyDown.bind(this));
      this._textArea.addEventListener("paste", this.onPaste.bind(this));
    }
  }

  disconnectedCallback() {
    if (this._btnClear) this._btnClear.removeEventListener("click", this.onClear.bind(this));

    if (this._btnCopy) this._btnCopy.removeEventListener("click", this.onCopy.bind(this));

    if (this._btnFormat) this._btnFormat.removeEventListener("click", this.onFormat.bind(this));

    if (this._textArea) {
      this._textArea.removeEventListener("input", this.onInput.bind(this));
      this._textArea.removeEventListener("keydown", this.onKeyDown.bind(this));
      this._textArea.removeEventListener("paste", this.onPaste.bind(this));
    }
  }
}
