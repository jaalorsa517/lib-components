import { CommandEnum } from "lib/shared/enums/AnimateCommands.enum";

const strategy: Record<string, any> = {
  [CommandEnum.FADE_IN_OUT]: (app: Element) => ({
    in: new FadeInCommand(app),
    out: new FadeOutCommand(app),
  }),
  [CommandEnum.SLIDE_IN_OUT_1]: (app: Element) => ({
    in: new Slide1InCommand(app),
    out: new Slide1OutCommand(app),
  }),
  [CommandEnum.SLIDE_IN_OUT_2]: (app: Element) => ({
    in: new Slide2InCommand(app),
    out: new Slide2OutCommand(app),
  }),
  [CommandEnum.SLIDE_IN_OUT_3]: (app: Element) => ({
    in: new Slide3InCommand(app),
    out: new Slide3OutCommand(app),
  }),
  [CommandEnum.SLIDE_IN_OUT_4]: (app: Element) => ({
    in: new Slide4InCommand(app),
    out: new Slide4OutCommand(app),
  }),
  [CommandEnum.GROW_IN_OUT]: (app: Element) => ({
    in: new GrowUpCommand(app),
    out: new GrowDownCommand(app),
  }),
};

export abstract class Command {
  protected _app: Element;
  constructor(app: Element) {
    this._app = app;
  }
  abstract execute(): Animation;
}

abstract class SlideCommand extends Command {
  constructor(app: Element) {
    super(app);
  }
  protected _animateOption = {
    duration: 400,
    easing: "ease-in-out",
  };
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

abstract class GrowCommand extends Command {
  constructor(app: Element) {
    super(app);
  }
  protected _animateOption = {
    duration: 500,
    easing: "ease-in-out",
  };
}

export class StrategyCommand {
  private _animation: Record<string, any>;

  constructor(app: Element, animation: string) {
    this._animation = strategy[animation](app);
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

export class Slide1InCommand extends SlideCommand {
  execute(): Animation {
    return this._app.animate(
      [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
      this._animateOption
    );
  }
}

export class Slide1OutCommand extends SlideCommand {
  execute(): Animation {
    return this._app.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }],
      this._animateOption
    );
  }
}
export class Slide2InCommand extends SlideCommand {
  execute(): Animation {
    return this._app.animate(
      [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
      this._animateOption
    );
  }
}

export class Slide2OutCommand extends SlideCommand {
  execute(): Animation {
    return this._app.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }],
      this._animateOption
    );
  }
}
export class Slide3InCommand extends SlideCommand {
  execute(): Animation {
    return this._app.animate(
      [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
      this._animateOption
    );
  }
}

export class Slide3OutCommand extends SlideCommand {
  execute(): Animation {
    return this._app.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }],
      this._animateOption
    );
  }
}
export class Slide4InCommand extends SlideCommand {
  execute(): Animation {
    return this._app.animate(
      [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
      this._animateOption
    );
  }
}

export class Slide4OutCommand extends SlideCommand {
  execute(): Animation {
    return this._app.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }],
      this._animateOption
    );
  }
}

export class GrowUpCommand extends GrowCommand {
  execute(): Animation {
    this._app.setAttribute("style", "transform-origin: top;")
    return this._app.animate(
      [
        {
          transform: "scaleY(0)",
        },
        { transform: "scaleY(1)" },
      ],
      this._animateOption
      );
    }
  }
  
  export class GrowDownCommand extends GrowCommand {
    execute(): Animation {
    this._app.setAttribute("style", "transform-origin: top;")
    return this._app.animate(
      [
        {
          transform: "scaleY(1)",
        },
        { transform: "scaleY(0)" },
      ],
      this._animateOption
    );
  }
}
