/**
 * 專案名稱： wistroni40-ng2-mqtt
 * 部門代號： MLD500
 * 檔案說明： MQTT 模組
 * @CREATE Monday, 18th October 2021 8:30:50 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClientOption, Mqtt } from './core';
import { NgMqttService } from './ng-mqtt.service';

/**
 * MQTT 模組
 */
@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    {
      provide: Mqtt,
      useFactory: () => new NgMqttService(),
    },
  ],
})
export class NgMqttModule {
  /**
   * MQTT 模組
   *
   * @method public
   * @param options MQTT 連線配置
   * @return 回傳 MQTT 模組
   */
  public static forRoot(
    options: ClientOption
  ): ModuleWithProviders<NgMqttModule> {
    return {
      ngModule: NgMqttModule,
      providers: [
        {
          provide: Mqtt,
          useFactory: () => new NgMqttService().connect(options),
        },
      ],
    };
  }
}
