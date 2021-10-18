/**
 * 專案名稱： wistroni40-ng2-mqtt
 * 部門代號： MLD500
 * 檔案說明： 客戶端連線狀態資料模型
 * @CREATE Monday, 18th October 2021 9:04:47 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 客戶端連線狀態資料模型
 */
export interface ClientConnected {
  /**
   * 連線狀態
   */
  status: boolean;
  /**
   * 連線結果
   */
  response?: Object;
}
