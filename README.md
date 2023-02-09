# Pulsoid to VRChat OSC
[中文文档](README_zh.md)

![Snipaste_2022-02-27_02-58-43.png](https://vip2.loli.io/2022/02/27/L8DqeOMBpbQ7T2A.png)
minasaki

## What's this?

This is a software that allows you to use a heart rate bracelet to send heart rate to VRChat OSC via Pulsoid.

## Supported devices?

In theory, it can support Mi Band 3/4/5/6

## how to use?

1. Open Mi Sports, select the heart rate bracelet you want to use, and turn on the Bluetooth broadcast and exercise heart rate broadcast `<br>`
   ![20220227-031824757.jpg](https://vip2.loli.io/2022/02/27/7CKeypYB3AQHo2z.jpg)
2. Install Pulsoid on your mobile phone and register an account
3. Connect the heart rate bracelet to be used `<br>`
   ![20220227-031829402.jpg](https://vip1.loli.io/2022/02/27/ik9vORBDCKHMZmr.jpg)
4. run.bat
5. The program will automatically open the browser and require you to log in for verification. After logging in, click the "Copy to clipboard" button to copy the token
   ![2023-02-09_21-50-221.png](https://vip2.loli.io/2023/02/09/wElqnLTQaVARoK2.png)
6. past Token
   ![2023-02-09_22-08-39.png](https://vip2.loli.io/2023/02/09/kcSqLRln89oOuKT.png)

## Example Avatars

[Vard](https://twitter.com/VardFree) made this Avatar, you can use his Avatar to test: [Example_Avatar.unitypackage](https://github.com/vard88508/vrc-osc-miband-hrm/releases) (This Avatar uses RED_SIM's [Simple counter shader](https://patreon.com/posts/simple-counter-62864361) to display numbers)

The value used by this Avatar is `Heartrate`, which is of type Float and ranges from -1(0bpm) to 1(255bpm).

## The following code is referenced:

[Mi Band/Amazfit OSC heart rate monitor for VRChat](https://github.com/vard88508/vrc-osc-miband-hrm)
[Mi Band Heartrate](https://github.com/mkc1370/miband-heartrate-osc)
