/**
 * 專案名稱： wistroni40-ng2-mqtt
 * 部門代號： MLD500
 * 檔案說明： 客戶端連線資料實體
 * @CREATE Monday, 18th October 2021 8:50:01 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ClientOption } from './client-option.model';

/**
 * 客戶端連線資料實體
 */
export class ClientOptionEntity implements ClientOption {
  /**
   * MQTT Host
   */
  public host = 'localhost';
  /**
   * MQTT 端口
   */
  public port = 1883;
  /**
   * MQTT 路徑
   */
  public path = '';
  /**
   * MQTT 客戶端 ID
   */
  public clientId?: string;
  /**
   * 清除 Session
   */
  public cleanSession = false;

  /**
   * @param connected 客戶端連線資料
   */
  constructor(connected?: Partial<ClientOption>) {
    Object.assign(this, connected);
  }
}
