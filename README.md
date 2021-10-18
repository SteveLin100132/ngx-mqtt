# Wistron i4.0 Angular MQTT

# Install

```
npm i wistroni40-ngx-mqtt --save
```

# Table of Contents

- [Feature](#feature)
- [Quickstart](#quickstart)

# Feature

- 提供 Angular 2 連接 MQTT，並訂閱相關主題

# Quickstart

app.module.ts

```typescript
...
import { NgMqttModule } from 'wistroni40-ngx-mqtt';

@NgModule({
  ...,
  imports: [
    ...,
    // 可以在載入 Module 時加入連線資訊，讓 APP 初始化時進行連線
    NgMqttModule.forRoot({
      host: 'localhost',
      port: 9001,
    }),
  ],
})
export class AppModule {}
```

app.component.ts

```typescript
...
import { Mqtt } from 'wistroni40-ngx-mqtt';

@Component({
  ...
})
export class AppComponent implements OnInit {
  /**
   * @param mqtt MQTT 服務
   */
  constructor(private readonly mqtt: Mqtt) {}

  public async ngOnInit(): Promise<void> {
    // 也可以進到特定元件時才進行 MQTT 連線
    const host = 'localhost';
    const port = 9001;
    this.mqtt.connect({ host, port });

    // 監聽連線狀態
    this.mqtt.connected.subscribe((res) => {
      if (res.status) {
        // 連線成功
      } else {
        // 連線失敗，response 帶有詳細資訊
        console.log(res.response);
      }
    });

    // 訂閱特定主題
    this.mqtt
      .subscribe<Model>('your/topic/#')
      .subscribe((payload) => console.log(payload));
  }

  public ngOnDestroy(): void {
    // 取消訂閱
    this.mqtt.unsubscribe('your/topic/#');
  }
}
```
