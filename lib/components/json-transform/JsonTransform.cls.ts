import { ElementOpen } from "lib/shared/class/ElementOpen.csl";
import { JsonTransformService } from "lib/components/json-transform/JsonTransform.services";
import { JsonTransformTemplate } from "lib/components/json-transform/JsonTransform.tmp";

export class JsonTransform extends ElementOpen {
  private _templateCls: JsonTransformTemplate;
  private _jsonTransformService: JsonTransformService;

  constructor() {
    super();
    this._templateCls = new JsonTransformTemplate();
    this._jsonTransformService = new JsonTransformService({
      template: this._templateCls,
      elementAttr: this
    })
  }

  connectedCallback() {
    this._jsonTransformService.connectedCallback()
  }

  disconnectedCallback() {
    this._jsonTransformService.disconnectedCallback()
  }
}
