export class ProxyWatch {
  private _value: any;
  private _isWatch: boolean = false;
  private _execute: Function = () => {};

  constructor(value: any) {
    this._value = value;
  }
  public get value() {
    return this._value;
  }
  public set value(value:any) {
    this._value = value;
    if (this._isWatch) this._execute();
  }
  watch(execute: Function) {
    this._isWatch = true;
    this._execute = execute;
  }
}
