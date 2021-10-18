/**
 * 專案名稱： wistroni40-ng2-mqtt
 * 部門代號： MLD500
 * 檔案說明： MQTT 服務
 * @CREATE Monday, 18th October 2021 8:30:50 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClientOption, ClientOptionEntity, Mqtt } from './core';

/**
 * MQTT 服務
 */
@Injectable({
  providedIn: 'root',
})
export class NgMqttService extends Mqtt {
  /**
   * MQTT 客戶端
   */
  private client?: Paho.MQTT.Client;
  /**
   * MQTT 資料訂閱
   */
  private subject = new Subject<Paho.MQTT.Message>();
  /**
   * MQTT 訂閱的主題
   */
  private topics: Set<string> = new Set<string>();

  /**
   * 連線
   *
   * @method public
   * @param options 連線配置
   * @return 回傳物件本身
   */
  public connect(options: ClientOption): this {
    // 初始化客戶端
    const config = new ClientOptionEntity(options);
    const { host, port, path, clientId, cleanSession } = config;
    this.client = new Paho.MQTT.Client(host, port, path, clientId || this.uuid);

    // 連線監聽
    this.client.connect({
      cleanSession,
      onSuccess: () => {
        this.connected.next({ status: true });
        this.topics.forEach((topic) => {
          if (this.client) {
            this.client.subscribe(topic, {});
          }
        });
      },
    });

    // 斷線監聽
    this.client.onConnectionLost = (response) =>
      this.connected.next({ status: false, response });

    // 資料監聽
    this.client.onMessageArrived = (message) => this.subject.next(message);

    return this;
  }

  /**
   * 訂閱的資料是否符合當前的 Topic
   *
   * @method public
   * @param message 訂閱的資料
   * @param topic   訂閱的Topic
   * @return 回傳訂閱的資料是否符合當前的 Topic
   */
  public isTopicMatched(message: Paho.MQTT.Message, topic: string): boolean {
    const desintation = message.destinationName;
    const source = topic.replace(/[\#]/g, '').replace(/[\+]/g, '.*');
    return desintation.match(source) !== null;
  }

  /**
   * 訂閱 MQTT 特定主題
   *
   * @method public
   * @param topic 要訂閱的主題
   * @return 回傳訂閱到的資料
   */
  public subscribe<T = any>(topic: string): Observable<T> {
    // 從 MQTT 訂閱該主題
    if (this.client && this.client.isConnected()) {
      this.client.subscribe(topic, {});
    }

    this.topics.add(topic);
    return this.subject.pipe(
      // 只取當前訂閱的主題資料
      filter((message) => this.isTopicMatched(message, topic)),
      // 將資料轉為 JSON
      map((message) => JSON.parse(message.payloadString))
    );
  }

  /**
   * 取消訂閱 MQTT 特定主題
   *
   * @method public
   * @param topic 要取消訂閱的主題
   */
  public unsubscribe(topic: string): void {
    this.topics.delete(topic);
    if (this.client) {
      this.client.unsubscribe(topic, {});
    }
  }
}
