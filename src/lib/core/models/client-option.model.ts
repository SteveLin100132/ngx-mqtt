/**
 * 專案名稱： wistroni40-ng2-mqtt
 * 部門代號： MLD500
 * 檔案說明： 客戶端連線配置資料模型
 * @CREATE Monday, 18th October 2021 8:47:00 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 客戶端連線配置資料模型
 */
export interface ClientOption {
  /**
   * MQTT Host
   */
  host: string;
  /**
   * MQTT 端口
   */
  port: number;
  /**
   * MQTT 路徑
   */
  path?: string;
  /**
   * MQTT 客戶端 ID
   */
  clientId?: string;
  /**
   * 清除 Session
   */
  cleanSession?: boolean;
}
