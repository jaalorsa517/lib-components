import { CommandEnum } from "lib/shared/enums/AnimateCommands.enum";

export abstract class Command {
  protected _app: Element;
  constructor(app: Element) {
    this._app = app;
  }
  abstract execute(): Animation;
}

abstract class FadeCommand extends Command {
  constructor(app: Element) {
    super(app);
  }
  protected _animateOption = {
    duration: 600,
    easing: "ease-in",
  };
}

export class StrategyCommand {
  private _animation: Record<string, any>;
  private strategy: Record<string, any> = {
    [CommandEnum.FADE_IN_OUT]: (app: Element) => ({
      in: new FadeInCommand(app),
      out: new FadeOutCommand(app),
    }),
  };
  constructor(app: Element, animation: string) {
    this._animation = this.strategy[animation](app);
  }
  get instances() {
    return this._animation;
  }
}

export class FadeInCommand extends FadeCommand {
  execute(): Animation {
    return this._app.animate([{ opacity: 0 }, { opacity: 1 }], this._animateOption);
  }
}

export class FadeOutCommand extends FadeCommand {
  execute(): Animation {
    return this._app.animate([{ opacity: 1 }, { opacity: 0 }], this._animateOption);
  }
}
