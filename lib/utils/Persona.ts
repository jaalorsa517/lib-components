export default class Persona {
  constructor(private name: string) {}
  get getName(): string {
    return this.name;
  }
}
