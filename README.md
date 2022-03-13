# Pulsoid to VRChat OSC
![Snipaste_2022-02-27_02-58-43.png](https://vip2.loli.io/2022/02/27/L8DqeOMBpbQ7T2A.png)
minasaki

## 这是什么？
这是一个允许你使用手环通过 Pulsoid 发送心率到 VRChat OSC。

## 支持的设备？
理论可支持小米手环 3/4/5/6

## 操作方法？
1. 打开小米运动，选择要用的手环，打开蓝牙广播和运动心率广播<br>
![20220227-031824757.jpg](https://vip2.loli.io/2022/02/27/7CKeypYB3AQHo2z.jpg)
2. 手机安装Pulsoid并注册帐号
3. 连接要使用的手环<br>
![20220227-031829402.jpg](https://vip1.loli.io/2022/02/27/ik9vORBDCKHMZmr.jpg)
4. 登录 [Pulsoid.net](https://pulsoid.net/) 打开 [Widgets](https://pulsoid.net/ui/configuration) 随便选一个 Widgets，复制其 URL<br>
![2022-02-27_03-23-42.png](https://vip2.loli.io/2022/02/27/pNXmt8CgcndbhoK.png)
5. 在新窗口打开控制台，粘贴 Widgets URL 到地址栏，把 Websocket 类型的 URL 复制下来<br>
![2022-02-27_03-27-21.png](https://vip1.loli.io/2022/02/27/PQadv38y5OstGlR.png)
6. run.bat
7. 把 Websocket URL 粘贴上去。
![2022-03-11_11-41-48.png](https://vip2.loli.io/2022/03/11/jMRU5XFLzH3C6mI.png)

## 示例 Avatar
[Vard](https://twitter.com/VardFree) 制作了该 Avatar，你可以使用他的 Avatar 来测试：[Example_Avatar.unitypackage](https://github.com/vard88508/vrc-osc-miband-hrm/releases) (该 Avatar 使用了 RED_SIM 的 [Simple counter shader](https://patreon.com/posts/simple-counter-62864361) 来显示数字)

该 Avatar 使用的值为`Heartrate`，类型为浮点(Float)，范围为 -1(0bpm) 到 1(255bpm)。

## 参考了以下代码：
[Mi Band/Amazfit OSC heart rate monitor for VRChat](https://github.com/vard88508/vrc-osc-miband-hrm)
[Mi Band Heartrate](https://github.com/mkc1370/miband-heartrate-osc)