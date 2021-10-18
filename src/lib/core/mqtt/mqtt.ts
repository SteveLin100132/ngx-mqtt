/**
 * 專案名稱： sandbox
 * 部門代號： MLD500
 * 檔案說明： 抽象 MQTT
 * @CREATE Monday, 18th October 2021 11:27:48 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Observable, ReplaySubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ClientConnected, ClientOption } from '../models';

/**
 * 抽象 MQTT
 */
export abstract class Mqtt {
  /**
   * UUID
   */
  public uuid = uuidv4();
  /**
   * MQTT 連線狀態主題
   */
  public connected = new ReplaySubject<ClientConnected>();

  /**
   * 連線
   *
   * @method public
   * @param options 連線配置
   * @return 回傳物件本身
   */
  public abstract connect(options: ClientOption): Mqtt;

  /**
   * 訂閱 MQTT 特定主題
   *
   * @method public
   * @param topic 要訂閱的主題
   * @return 回傳訂閱到的資料
   */
  public abstract subscribe<T = any>(topic: string): Observable<T>;

  /**
   * 取消訂閱 MQTT 特定主題
   *
   * @method public
   * @param topic 要取消訂閱的主題
   */
  public abstract unsubscribe(topic: string): void;
}
