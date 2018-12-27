> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/

<article>

<header class="kratos-entry-header">

# 一键脚本搭建 SS / 搭建 SSR 服务并开启 BBR 加速

2018 年 1 月 20 日 551 条评论 152,870 次阅读 300 人点赞</header>

自己写的一键搭建 shadowsocks / 搭建 shadowsocksR 的 shell 脚本，一键脚本适用 [Vultr](https://www.flyzy2005.com/vps/vultr-deploy/) 上的和[搬瓦工](https://www.flyzy2005.com/vps/bandwagon-coupon-buy/)所有机型（CentOS、Ubuntu、Debian），搭建 ss 服务器支持所有**客户端类型**，本机你是 iOS，Android，Windows，Mac，或者是 Linux，搭建 ss/ssr 都是适用的科学上网方式。一键脚本搭建 SS/SSR 服务器，**绝对没有任何问题**，任何问题欢迎留言。一键脚本内容包括一键搭建 shadowsocks / 一键搭建 shadowsocksR + 一键开启 bbr 加速，适合新手小白。

**纯新手**也可以搭建 ss/ssr，录了个**视频教程**，不想看文字的可以看视频，或者结合起来一起看：[搭建 ss 视频教程](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#vultrss)。

文章目录

<a class="ez-toc-pull-right ez-toc-btn ez-toc-btn-xs ez-toc-btn-default ez-toc-toggle"></a>

<nav>

*   [什么是 shadowsocks](#shadowsocks "什么是shadowsocks")
*   [一键脚本搭建 ss/ssr 支持系统版本](#ssssr "一键脚本搭建ss/ssr支持系统版本")
*   [代理服务器购买](#i "代理服务器购买")
*   [连接远程 Linux 服务器](#Linux "连接远程Linux服务器")
*   [一键搭建 SS / 搭建 SSR 服务](#SSSSR "一键搭建SS/搭建SSR服务")
    *   [一键搭建 shadowsocks](#shadowsocks-2 "一键搭建shadowsocks")
    *   [一键搭建 shadowsocksR](#shadowsocksR "一键搭建shadowsocksR")
*   [一键开启 BBR 加速](#BBR "一键开启BBR加速")
*   [客户端搭建 shadowsocks/shadowsockR 代理实现科学上网](#shadowsocksshadowsockR "客户端搭建shadowsocks/shadowsockR代理实现科学上网")
    *   [客户端搭建 ss 代理](#ss "客户端搭建ss代理")
    *   [客户端搭建 ssr 代理](#ssr "客户端搭建ssr代理")
*   [vultr 搭建 ss 视频教程](#vultrss "vultr搭建ss视频教程")
*   [一键脚本更新日志](#i-2 "一键脚本更新日志")

</nav>

## **什么是 shadowsocks**

shadowsocks 可以指一种 SOCKS5 的加密传输协议，也可以指基于这种加密协议的各种数据传输包。

**shadowsocks 实现科学上网原理？**shadowsocks 正常工作需要服务器端和客户端两端合作实现，首先，客户端（本机）通过 ss（shadowsocks）对正常的访问请求进行 SOCK5 加密，将加密后的访问请求传输给 ss 服务器端，服务器端接收到客户端的加密请求后，解密得到原始的访问请求，根据请求内容访问指定的网站（例如 Google，YouTube，Facebook，instagram 等），得到网站的返回结果后，再利用 SOCKS5 加密并返回给客户端，客户端通过 ss 解密后得到正常的访问结果，于是就可以实现你直接访问该网站的 “假象”。

**为什么选择 shadowsocks？**不限终端（安卓，苹果，Windows，Mac 都可用），流量便宜（服务器 500G 只要 15 元），方便（一键脚本，不需要专业知识）。

**为什么要自己搭建 ss/ssr？**你也许会觉得买 ss 服务也很方便，但是你得要考虑以下几个问题。首先，买的 ss 服务，限制很多，终端可能只能同时在线 2 个，每个月就一点点流量可能价格却不便宜，有时候还被别人做手脚，流量跑的贼快；其次，别人收钱跑路怎么办？很多这种情况的；更重要的是，如第一个问题中描述的 shadowsocks 原理，如果有心人做了一点手脚，是可以得到你的访问记录的；而自己搭建 ss/ssr 服务，一键脚本也就 10 来分钟就可以搞定。

## **一键脚本搭建 ss/ssr 支持系统版本**

脚本系统支持：CentOS 6+，Debian 7+，Ubuntu 12+

注：这个脚本支持的系统版本是指 ss 服务器的版本（都没看过也没关系，不影响搭建），你本机是 Windows、Mac、Linux，或者你想用手机端搭建 ss/ssr 服务器，安卓和苹果，都是可以的。

## **代理服务器购买**

作为跳板的代理服务器推荐 [Vultr](https://www.flyzy2005.com/vps/vultr-deploy/) 和[搬瓦工](https://www.flyzy2005.com/vps/bandwagon-coupon-buy/)，一是因为本脚本在这两家的所有 VPS 都做了测试，二是因为都是老牌 VPS 服务商，不怕跑路。

推荐你们使用 Vultr：[优惠注册链接](https://www.flyzy2005.com/goto/vultr)，购买图解与节点推荐可以参考 [Vultr 购买图解步骤](https://www.flyzy2005.com/vps/vultr-deploy/)，最低月付 2.5 刀，也是目前博主自用以及运行小站的 VPS，月付方便，随时重置。

对于宽带是电信或者是联通的用户，可以试一下搬瓦工的 CN2 **电信 / 联通直连线路**（季付 / 半年付 / 年付），**GT 线路**详情可以参考[搬瓦工洛杉矶 CN2 GT 线路测评](https://www.flyzy2005.com/vps/bandwagon-cn2/)。如果想体验最优的 **GIA 线路**，也可以尝试搬瓦工 CN2 GIA 线路（**强力推荐**，效果爆炸，全程 CN2，年付平均下来一个月 30 元左右，晚上高峰时期线路也不拥堵。2018 年 5 月 15 日正式启动，[搬瓦工洛杉矶 CN2 GIA 线路测评](https://www.flyzy2005.com/vps/bandwagonhost-cn2-gia/)），当然你也可以直接用 [Vultr](https://www.flyzy2005.com/vps/vultr-deploy/)，搬瓦工暂时不支持月付。

Vultr 和搬瓦工上的所有机型是绝对可以一键脚本搭建 shadowsocks / 搭建 shadowsocksR + 开启 bbr 加速成功的，任何问题**欢迎留言**~

## **连接远程 Linux 服务器**

购买完成后根据 [Windows 通过 Xshell 连接 Linux](https://www.flyzy2005.com/tech/linux/xshell-connect-linux/) 或者 [Mac 通过 Terminal 远程连接 Linux](https://www.flyzy2005.com/tech/linux/mac-connect-vps-linux/) 即可。

你如果身边没有电脑，一定要搞什么手机搭建 ss 服务器 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/symbols.png) 也是可以的，毕竟一键脚本只需要复制几行脚本命令就行了。iOS 用户可以使用 Termius 这个工具，直接在 App Store 下载就行。Android 没有用过，反正能 ssh 连接的软件就行~

## **一键搭建 SS / 搭建 SSR 服务**

注意，shadowsocks/shadowsocksR 这两个**只需要搭建一个**就可以了！！！！SS 与 SSR 之间的比较一直是各有各的说法，王婆卖瓜自卖自夸。我用的是 SS，因为 SS 的 iOS 版本比较容易下载，并且被没有觉得 ss 容易被探查到~

### **一键搭建 shadowsocks**

在[购买 VPS](https://www.flyzy2005.com/vps/vultr-deploy/) 并用 [Xshell 连接上你刚购买的 VPS](https://www.flyzy2005.com/tech/linux/xshell-connect-linux/) 后，你将看到如下图所示的界面：

![](https://www.flyzy2005.com/wp-content/uploads/2018/01/vutlr-connect-result.png)

如红框中所示，root@vult（root@ubuntu）说明已经连接成功了，之后你只需要**在绿色光标处直接复制以下代码**就可以了（直接复制即可，如每段代码下方截图中所示）。

1\. 下载一键搭建 ss 脚本文件（直接在绿色光标处复制该行命令回车即可，**只需要执行一次**，卸载 ss 后也不需要重新下载）

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">git clone https://github.com/flyzy2005/ss-fly</textarea>

| 1 | git clone https://github.com/flyzy2005/ss-fly |

![](https://www.flyzy2005.com/wp-content/uploads/2018/01/shadowsocks-ss-fly-clone.png)

如果提示`bash: git: command not found`，则先安装 git：

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">Centos执行这个： yum -y install git Ubuntu/Debian执行这个： apt-get update && apt-get -y install git</textarea>

| 12 | Centos 执行这个： yum -y install gitUbuntu/Debian 执行这个： apt-get update && apt-get -y install git |

2\. 运行搭建 ss 脚本代码

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">ss-fly/ss-fly.sh -i flyzy2005.com 1024</textarea>

| 1 | ss-fly/ss-fly.sh -i flyzy2005.com 1024 |

其中 **flyzy2005.com** 换成你要设置的 shadowsocks 的密码即可（这个 **flyzy2005.com** 就是你 ss 的密码了，是需要填在客户端的密码那一栏的），密码随便设置，最好**只包含字母 + 数字**，一些特殊字符可能会导致冲突。而第二个参数 **1024** 是**端口号**，也可以不加，不加默认是 1024~（**举个例子**，脚本命令可以是 ss-fly/ss-fly.sh -i qwerasd，也可以是 ss-fly/ss-fly.sh -i qwerasd 8585，后者指定了服务器端口为 8585，前者则是默认的端口号 1024，两个命令设置的 ss 密码都是 qwerasd）：

![](https://www.flyzy2005.com/wp-content/uploads/2018/01/shadowsocks-install.png)

界面如下就表示一键搭建 ss 成功了：

![](https://www.flyzy2005.com/wp-content/uploads/2018/01/ss-fly-success-new.png)

注：如果需要改密码或者改端口，只需要重新**再执行一次搭建 ss 脚本代码**就可以了，或者修改`/etc/shadowsocks.json`这个配置文件。

3\. 相关 ss 操作

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">启动：/etc/init.d/ss-fly start 停止：/etc/init.d/ss-fly stop 重启：/etc/init.d/ss-fly restart 状态：/etc/init.d/ss-fly status 查看ss链接：ss-sly/ss-fly.sh -sslink 修改配置文件：vim /etc/shadowsocks.json</textarea>

| 123456 | 启动：/etc/init.d/ss-fly start停止：/etc/init.d/ss-fly stop重启：/etc/init.d/ss-fly restart状态：/etc/init.d/ss-fly status查看 ss 链接：ss-sly/ss-fly.sh -sslink修改配置文件：vim /etc/shadowsocks.json |

4\. 卸载 ss 服务

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">ss-fly/ss-fly.sh -uninstall</textarea>

| 1 | ss-fly/ss-fly.sh -uninstall |

### **一键搭建 shadowsocksR**

**再次提醒**，如果安装了 SS，就不需要再安装 SSR 了，如果要改装 SSR，请按照上一部分内容的教程先卸载 SS！！！

1\. 下载一键搭建 ssr 脚本（**只需要执行一次**，卸载 ssr 后也不需要重新执行）

`git clone https://github.com/flyzy2005/ss-fly`，此步骤与一键搭建 ss 一致，可以参考：[下载脚本](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#shadowsocks)

2\. 运行搭建 ssr 脚本代码

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">ss-fly/ss-fly.sh -ssr</textarea>

| 1 | ss-fly/ss-fly.sh -ssr |

![](https://www.flyzy2005.com/wp-content/uploads/2018/01/ss-fly-insall-ssr.png)

3\. 输入对应的参数

执行完上述的脚本代码后，会进入到输入参数的界面，包括服务器端口，密码，加密方式，协议，混淆。可以直接输入回车选择默认值，也可以输入相应的值选择对应的选项：

![](https://www.flyzy2005.com/wp-content/uploads/2018/01/ss-fly-bbr-options.png)

全部选择结束后，会看到如下界面，就说明搭建 ssr 成功了：

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">Congratulations, ShadowsocksR server install completed! Your Server IP :你的服务器ip Your Server Port :你的端口 Your Password :你的密码 Your Protocol :你的协议 Your obfs :你的混淆 Your Encryption Method:your_encryption_method Welcome to visit:https://shadowsocks.be/9.html Enjoy it!</textarea>

| 12345678910 | Congratulations, ShadowsocksR server install completed!Your Server IP        : 你的服务器 ipYour Server Port      : 你的端口Your Password         : 你的密码Your Protocol         : 你的协议Your obfs             : 你的混淆Your Encryption Method:your_encryption_method Welcome to visit:https://shadowsocks.be/9.htmlEnjoy it! |

4\. 相关操作 ssr 命令

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">启动：/etc/init.d/shadowsocks start 停止：/etc/init.d/shadowsocks stop 重启：/etc/init.d/shadowsocks restart 状态：/etc/init.d/shadowsocks status 配置文件路径：/etc/shadowsocks.json 日志文件路径：/var/log/shadowsocks.log 代码安装目录：/usr/local/shadowsocks</textarea>

| 12345678 | 启动：/etc/init.d/shadowsocks start停止：/etc/init.d/shadowsocks stop重启：/etc/init.d/shadowsocks restart状态：/etc/init.d/shadowsocks status 配置文件路径：/etc/shadowsocks.json日志文件路径：/var/log/shadowsocks.log代码安装目录：/usr/local/shadowsocks |

5\. 卸载 ssr 服务

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">./shadowsocksR.sh uninstall</textarea>

| 1 | ./shadowsocksR.sh uninstall |

## **一键开启 BBR 加速**

BBR 是 Google 开源的一套内核加速算法，可以让你搭建的 shadowsocks/shadowsocksR 速度上一个台阶，本一键搭建 ss/ssr 脚本支持一键升级最新版本的内核并开启 BBR 加速。

BBR 支持 4.9 以上的，如果低于这个版本则会自动下载最新内容版本的内核后开启 BBR 加速并重启，如果高于 4.9 以上则自动开启 BBR 加速，执行如下脚本命令即可自动开启 BBR 加速：

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">ss-fly/ss-fly.sh -bbr</textarea>

| 1 | ss-fly/ss-fly.sh -bbr |

![](https://www.flyzy2005.com/wp-content/uploads/2018/01/ss-fly-bbr-success-new.png)

装完后需要重启系统，输入 y 即可立即重启，或者之后输入`reboot`命令重启。

判断 BBR 加速有没有开启成功。输入以下命令：

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">sysctl net.ipv4.tcp_available_congestion_control</textarea>

| 1 | sysctl net.ipv4.tcp_available_congestion_control |

如果返回值为：

<textarea class="crayon-plain print-no" data-settings="dblclick" readonly="" style="tab-size: 4; font-size: 12px !important; line-height: 15px !important; z-index: 0; opacity: 0; overflow: hidden;">net.ipv4.tcp_available_congestion_control = bbr cubic reno</textarea>

| 1 | net.ipv4.tcp_available_congestion_control = bbr cubic reno |

后面有 bbr，则说明已经开启成功了。

## **客户端搭建 shadowsocks/shadowsockR 代理实现科学上网**

### **客户端搭建 ss 代理**

各种客户端版本下载地址：[各版本 shadowsocks 客户端下载地址](https://www.flyzy2005.com/fan-qiang/shadowsocks/ss-clients-download/)

以 Windows 为例（[shadowsocks 电脑版（windows）客户端配置教程](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-pc-windows-config/)）：

![](https://www.flyzy2005.com/wp-content/uploads/2018/01/shadowsocks-pc-windows.png)

在状态栏右击 shadowsocks，勾选**开机启动**和**启动系统代理**，在**系统代理模式**中选择 **PAC 模式**，**服务器** -> **编辑服务器**，一键安装 shadowsocks 的脚本默认服务器端口是 1024，加密方式是 aes-256-cfb，密码是你设置的密码，ip 是你自己的 VPS ip，保存即可~

**PAC 模式**是指国内可以访问的站点直接访问，不能直接访问的再走 shadowsocks 代理~

OK！一键脚本搭建 shadowsocks 完毕！科学上网吧，兄弟！[Google](https://www.flyzy2005.com/go/go.php?url=https://www.google.com/)

### **客户端搭建 ssr 代理**

各种客户端版本下载地址：[各版本 SS 客户端 & SSR 客户端官方下载地址](https://www.flyzy2005.com/fan-qiang/shadowsocksr/ss-ssr-clients/)

以 Windows 为例：

![](https://www.flyzy2005.com/wp-content/uploads/2018/01/ssr-pc-windows-config.png)

在状态栏右击 shadowsocksR，在**系统代理模式**中选择 **PAC 模式**，再左击两次状态栏的图标打开编辑服务器界面，如上图所示，按照自己的服务器配置填充内容**，**保存即可~

**PAC 模式**是指国内可以访问的站点直接访问，不能直接访问的再走 shadowsocksR 代理~

OK！一键脚本搭建 shadowsocksR 完毕！科学上网吧，兄弟！[Google](https://www.flyzy2005.com/go/go.php?url=https://www.google.com/)

## **vultr 搭建 ss 视频教程**

应读者要求录了个视频教程，如果你觉得这些文字还不够生动，不够清楚的话，可以看一下视频教程。

视频获取方式：关注微信公众号 **flyzy 小站**，发送**视频**即可获得。

![](https://www.flyzy2005.com/wp-content/uploads/2017/12/flyzy.jpg)

## **一键脚本更新日志**

一键脚本源码：[一键搭建 shadowoscks / 搭建 shadowsocksR 并开启 bbr 内核加速](https://www.flyzy2005.com/go/go.php?url=https://github.com/flyzy2005/ss-fly)

2018 年 1 月 20 日，上传一键安装 shadowsocks 脚本

2018 年 1 月 24 日，添加升级内核并开启 BBR 加速功能

2018 年 3 月 28 日，将升级内核 && 开启 BBR 加速集成在一个命令中

2018 年 4 月 4 日，添加一键安装 shadowsocksR 功能（调用的 teddysun 大大的[一键搭建 SSR 脚本](https://www.flyzy2005.com/go/go.php?url=https://shadowsocks.be/9.html) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/eek.png) ）

2018 年 4 月 27 日，支持 Ubuntu/CentOS/Debian

2018 年 5 月 29 日，支持[一键安装 V2Ray](https://www.flyzy2005.com/v2ray/how-to-build-v2ray/)

2018 年 8 月 8 日，增加了一点 ss 状态查看 / 控制的代码（抄的）

2018 年 10 月 14 日，增加显示 ss 链接（默认安装完直接显示，后期调用则通过命令`ss-fly/ss-fly.sh -sslink查看`）

关注公众号 **flyzy 小站**，上面有一些搭建 shadowsocks **常见问题**的总结~ 如果还是不行，欢迎在公众号留言~

**声明**：本文只作为技术分享，请遵守相关法律，严禁做违法乱纪的事情！

<footer class="kratos-entry-footer clearfix">Telegram 频道已经开通，关注 [flyzythink](https://www.flyzy2005.com/go/?https://t.me/flyzythink)，随手分享正能量，了解 VPS 优惠与补货
Telegram 群组已经开通，加入 [flyzy 小站](https://www.flyzy2005.com/go/?https://t.me/flyzyxiaozhan)，FREE TO TALK
QQ 群开通：780593286 [![](https://pub.idqqimg.com/wpa/images/group.png)](https://www.flyzy2005.com/go/?url=https://shang.qq.com/wpa/qunwpa?idkey=1e8e1c9e5c8056b05aaaa5e34f6dc9faa7b655610cc790884043b738ceebb753)
搬瓦工补货通知群：618922256 [![](https://pub.idqqimg.com/wpa/images/group.png)](https://www.flyzy2005.com/go/?url=https://jq.qq.com/?_wv=1027&k=5JS0Hr7)

### 原创声明

该日志由 [flyzy 小站](https://www.flyzy2005.com "flyzy小站") 于 2018 年 01 月 20 日发表在 [shadowsocks](https://www.flyzy2005.com/fan-qiang/shadowsocks/) 分类下， 你可以[发表评论](#respond)，并在保留[原文地址](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/)及作者的情况下转载到你的网站或博客。
转载请注明: [一键脚本搭建 SS / 搭建 SSR 服务并开启 BBR 加速 | flyzy 小站](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/ "本文固定链接 https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/")
关键字: [bbr 一键](https://www.flyzy2005.com/tag/bbr%e4%b8%80%e9%94%ae/), [shadowsock](https://www.flyzy2005.com/tag/shadowsock/), [ss/ssr 脚本](https://www.flyzy2005.com/tag/ss-ssr%e8%84%9a%e6%9c%ac/), [一键搭建 ss 脚本](https://www.flyzy2005.com/tag/%e4%b8%80%e9%94%ae%e6%90%ad%e5%bb%bass%e8%84%9a%e6%9c%ac/), [一键脚本搭建 ssr](https://www.flyzy2005.com/tag/%e4%b8%80%e9%94%ae%e8%84%9a%e6%9c%ac%e6%90%ad%e5%bb%bassr/), [科学上网](https://www.flyzy2005.com/tag/fan-qiang/) ![](https://www.flyzy2005.com/wp-content/uploads/2017/12/flyzy.jpg)**我的微信公众号**"flyzy 小站"：关注 VPS 测评与优惠，玩机教程，技术分享，留言及时回复 [ 打赏](javascript:;) [ 点赞](javascript:;) [ 分享](javascript:;) [  ](javascript:;) [  ](javascript:;) [  ](javascript:;) [  ](javascript:;) [打开微信 “扫一扫”，打开网页后点击屏幕右上角分享按钮](javascript:;) <script type="text/javascript">function share(obj){ var qqShareURL="http://connect.qq.com/widget/shareqq/index.html?"; var weiboShareURL="http://service.weibo.com/share/share.php?"; var facebookShareURL="https://www.facebook.com/sharer/sharer.php?"; var twitterShareURL="https://twitter.com/intent/tweet?"; var googleplusShareURL="https://plus.google.com/share?"; var host_url="https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/"; var title="【一键脚本搭建SS/搭建SSR服务并开启BBR加速】"; var qqtitle="一键脚本搭建SS/搭建SSR服务并开启BBR加速"; var excerpt="自己写的一键搭建shadowsocks/搭建shadowsocksR的shell脚本，一键脚本适用Vultr上的和搬瓦工所有机型（CentOS、Ubuntu、Debian），搭建ss服务器支持所有客户端类型，本机你是iOS，Android，Windows，Mac，或者是Linux，搭建ss/ssr都是适用的科学上网方式。一键脚本搭建SS/……"; var pic="https://www.flyzy2005.com/wp-content/uploads/2018/01/vutlr-connect-result.png"; var _URL; if(obj=="qq"){ _URL=qqShareURL+"url="+host_url+"&title="+qqtitle+"&pics="+pic+"&desc=&summary="+excerpt+"&site=vtrois"; }else if(obj=="weibo"){ _URL=weiboShareURL+"url="+host_url+"&title="+title+excerpt+"&pic="+pic; }else if(obj=="facebook"){ _URL=facebookShareURL+"u="+host_url; }else if(obj=="twitter"){ _URL=twitterShareURL+"text="+title+excerpt+"&url="+host_url; }else if(obj=="googleplus"){ _URL=googleplusShareURL+"url="+host_url; } window.open(_URL); }</script> [bbr 一键](https://www.flyzy2005.com/tag/bbr%e4%b8%80%e9%94%ae/) [shadowsock](https://www.flyzy2005.com/tag/shadowsock/) [ss/ssr 脚本](https://www.flyzy2005.com/tag/ss-ssr%e8%84%9a%e6%9c%ac/) [一键搭建 ss 脚本](https://www.flyzy2005.com/tag/%e4%b8%80%e9%94%ae%e6%90%ad%e5%bb%bass%e8%84%9a%e6%9c%ac/) [一键脚本搭建 ssr](https://www.flyzy2005.com/tag/%e4%b8%80%e9%94%ae%e8%84%9a%e6%9c%ac%e6%90%ad%e5%bb%bassr/) [科学上网](https://www.flyzy2005.com/tag/fan-qiang/)</footer>

<nav class="navigation post-navigation clearfix" role="navigation">[< 上一篇](https://www.flyzy2005.com/fan-qiang/shadowsocks/ss-clients-download/ "各版本shadowsocks客户端下载地址") [下一篇 >](https://www.flyzy2005.com/fan-qiang/shadowsocks/free-ss-account/ "科学上网ss账号分享")</nav>

### 相关文章

*   [科学上网：搭建 shadowsocks(R)/ss/ssr/v2ray 问题汇总](https://www.flyzy2005.com/fan-qiang/build-ss-ssr-v2ray/ "科学上网：搭建shadowsocks(R)/ss/ssr/v2ray问题汇总")
*   [一键脚本搭建 V2Ray V2Ray 配置与优化](https://www.flyzy2005.com/v2ray/how-to-build-v2ray/ "一键脚本搭建V2Ray V2Ray配置与优化")
*   [shadowsocks 无法打开谷歌学术或出现验证码](https://www.flyzy2005.com/tech/shadowsocks-google-scholar/ "shadowsocks无法打开谷歌学术或出现验证码")
*   [shadowsocks 电脑版（Mac）客户端配置教程](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-mac-os-config/ "shadowsocks电脑版（Mac）客户端配置教程")
*   [shadowsocks 手机版（Android / 安卓）客户端影梭配置教程](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-android-config/ "shadowsocks手机版（Android/安卓）客户端影梭配置教程")
*   [shadowsocks 手机版（iOS / 苹果）客户端配置教程](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-iphone-ios-config/ "shadowsocks手机版（iOS/苹果）客户端配置教程")
*   [shadowsocks 电脑版（windows）客户端配置教程](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-pc-windows-config/ "shadowsocks电脑版（windows）客户端配置教程")
*   [各版本 shadowsocks 客户端百度云下载地址](https://www.flyzy2005.com/fan-qiang/shadowsocks/ss-clients-baidu-cloud-download/ "各版本shadowsocks客户端百度云下载地址")

<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

1.  ![](https://cdn.v2ex.com/gravatar/438d147b322736e2e1b72155696cb52f?s=50&d=mm&r=g) <cite class="fn">JLu</cite> 说道： [2018 年 10 月 11 日 下午 6:13](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2421)

    有开机自动重启的命令吗?

    [回复](#comment-2421)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 10 月 12 日 上午 12:07](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2422)

        脚本默认是开机自动启动的

        [回复](#comment-2422)
2.  ![](https://cdn.v2ex.com/gravatar/ea5f2aeb18d4b3939cb97df47b7f26b2?s=50&d=mm&r=g) <cite class="fn">weicong721</cite> 说道： [2018 年 10 月 5 日 下午 4:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2413)

    请问
    500 internal privoxy error 怎么解决？
    140.82.51.66
    小程序上都能通，脚本也按步骤安装完了

    [回复](#comment-2413)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 10 月 5 日 下午 7:32](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2414)

        这个你根据公众号左下角常见问题排查下。

        一般如果小程序检测你的 ss 端口通过了，就是你本地的问题。检查是不是有防火墙，之前有代理设置等等

        [回复](#comment-2414)
3.  ![](https://cdn.v2ex.com/gravatar/babb5821d8ece015542d15ddbe04374c?s=50&d=mm&r=g) <cite class="fn">佛系 D</cite> 说道： [2018 年 10 月 3 日 上午 9:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2410)

    ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png) 如何实现多端口 老铁

    [回复](#comment-2410)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 10 月 3 日 下午 1:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2411)

        参考：[详解 shadowsocks 配置多用户多密码](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-config-multiple-users/)

        [回复](#comment-2411)
4.  ![](https://cdn.v2ex.com/gravatar/1d0c9fe5fad84b0285b8c542677085df?s=50&d=mm&r=g) <cite class="fn">linxuehao</cite> 说道： [2018 年 9 月 27 日 下午 2:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2388)

    老板，我什么都不懂，按照你的步骤就行了吗，不懂编程的也能按照你的用起来吗

    [回复](#comment-2388)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 30 日 下午 3:32](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2400)

        是的，完全不需要编程的。更何况还有视频教程

        [回复](#comment-2400)
5.  ![](https://cdn.v2ex.com/gravatar/58ca8df63bf6ad40691f480f1871acef?s=50&d=mm&r=g) <cite class="fn">水瀑之路</cite>说道： [2018 年 9 月 24 日 下午 1:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2378)

    [https://github.com/flyzy2005/ss-fly](https://www.flyzy2005.com/go/go.php?url=https://github.com/flyzy2005/ss-fly)
    Cloning into 'ss-fly'...
    fatal: unable to access 'https://github.com/flyzy2005/ss-fly/': Couldn't connect to server

    请问楼主，这个问题怎么解决啊？万分感谢

    [回复](#comment-2378)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 24 日 下午 10:52](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2379)

        2.5 的不能用，现在得用 3.5 的

        [回复](#comment-2379)
6.  ![](https://cdn.v2ex.com/gravatar/11c1f6a56133016a9ee60c0bd2131928?s=50&d=mm&r=g) <cite class="fn">[小错](https://www.flyzy2005.com/go/go.php?url=http://oxy.one)</cite>说道： [2018 年 9 月 22 日 下午 10:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2375)

    博主这个脚本确实强大。已经安装好，youtube 4M 左右，不过我拿它来作为备用吧。毕竟保证同一服务器上我的博客的安全为先 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png)
    多谢

    [回复](#comment-2375)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 23 日 下午 4:47](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2377)

        ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png) 我也建议 SS 和博客不要放在同一个服务器上。建站推荐搬瓦工 CN2 GIA：[建站应该如何选择服务器，哪个国外 VPS 适合建站](https://www.flyzy2005.com/build-page/build-page-usa-vps/)

        [回复](#comment-2377)
7.  ![](https://cdn.v2ex.com/gravatar/426f8b112ff1f5219fa9256ca66d1fdc?s=50&d=mm&r=g) <cite class="fn">Tuatara</cite> 说道： [2018 年 9 月 22 日 上午 10:41](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2366)

    请问 ss-fly 的帮助文件怎么打开？
    怎么查看 sshelp 这个文件呢

    [回复](#comment-2366)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 22 日 上午 10:43](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2367)

        `ss-fly/ss-fly.sh -h`

        [回复](#comment-2367)
        1.  ![](https://cdn.v2ex.com/gravatar/426f8b112ff1f5219fa9256ca66d1fdc?s=50&d=mm&r=g) <cite class="fn">Tuatara</cite> 说道： [2018 年 9 月 22 日 上午 10:46](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2370)

            谢谢，回复太及时了

            [回复](#comment-2370)
8.  ![](https://cdn.v2ex.com/gravatar/ff196e001e512da526a4dca264de6f71?s=50&d=mm&r=g) <cite class="fn">chacha</cite> 说道： [2018 年 9 月 21 日 下午 11:49](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2365)

    一直到 BBR 加速成功，什么问题都没有~~ 就是上不了外面的网~~ 根据常见问题 restarted 什么都顺利解决~~~ 我想是不是我对 SS 的密码产生了什么误解？这个密码哪个地方会用到？谢谢！

    [回复](#comment-2365)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 22 日 上午 10:43](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2368)

        restart 成功的话说明服务器没有问题
        密码就是你在 ss 客户端需要配置的密码啊

        [回复](#comment-2368)
9.  ![](https://cdn.v2ex.com/gravatar/0dfe10380d81346af73c2864748bfa0b?s=50&d=mm&r=g) <cite class="fn">单车</cite>说道： [2018 年 9 月 19 日 下午 5:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2357)

    vultr 新加坡 vps
    用自己配置的端口，访问 Google 就积极拒绝，完全照搬代码连错误都没有。
    [2018-09-19 17:01:59] System.Net.Sockets.SocketException: 由于目标计算机积极拒绝，无法连接。 ip:port
    在 System.Net.Sockets.Socket.EndConnect(IAsyncResult asyncResult)
    在 Shadowsocks.Controller.Handler.ConnectCallback(IAsyncResult ar)

    服务端日志：
    2018-09-19 09:26:13 INFO starting server at 0.0.0.0:1024
    2018-09-19 09:27:09 INFO connecting safebrowsing.googleapis.com:443 from 183.194.73.162:2069
    不知道原因在哪儿呀？

    [回复](#comment-2357)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 19 日 下午 8:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2358)

        服务器没有错误啊。你确定本地连上来了？换手机可以吗？

        [回复](#comment-2358)
        1.  ![](https://cdn.v2ex.com/gravatar/0dfe10380d81346af73c2864748bfa0b?s=50&d=mm&r=g) <cite class="fn">单车</cite>说道： [2018 年 9 月 20 日 上午 11:27](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2359)

            已经解决，Chrome 我装了其他翻墙插件，只是关闭代理不行，要关闭插件才行。

            [回复](#comment-2359)
10.  ![](https://cdn.v2ex.com/gravatar/360a91b8fd0a8a590d9faa4ac39716d3?s=50&d=mm&r=g) <cite class="fn">王不撩</cite>说道： [2018 年 9 月 17 日 上午 12:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2330)

    --2018-09-16 16:37:28-- [https://codeload.github.com/shadowsocks/shadowsocks/zip/master](https://www.flyzy2005.com/go/go.php?url=https://codeload.github.com/shadowsocks/shadowsocks/zip/master)
    Resolving codeload.github.com (codeload.github.com)... failed: Temporary failure in name resolution.
    wget: unable to resolve host address ‘codeload.github.com’
    [错误] shadowsocks 安装包文件下载失败!
    额，楼主这是哪里出问题了?

    [回复](#comment-2330)
11.  ![](https://cdn.v2ex.com/gravatar/f7b3bca14d931f602baffa446e10a8f1?s=50&d=mm&r=g) <cite class="fn">zq</cite> 说道： [2018 年 9 月 16 日 下午 4:53](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2328)

    谢谢大神，我已经搭好了。但还有个问题，这个账户密码能分享给朋友吗？我的朋友用我的 ip 和密码就连不上 ss，我自己无论电脑手机都可以，他就电脑手机都不行 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png)

    [回复](#comment-2328)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 16 日 下午 7:00](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2329)

        可以分享的。如果你可以说明服务器没有问题，让他检查电脑防火墙，是不是之前设置过代理等等，或者结合 [SwitchyOmega](https://www.flyzy2005.com/tech/switchyomega-proxy-server/) 来管理代理设置

        [回复](#comment-2329)
        1.  ![](https://cdn.v2ex.com/gravatar/f7b3bca14d931f602baffa446e10a8f1?s=50&d=mm&r=g) <cite class="fn">zq</cite> 说道： [2018 年 9 月 17 日 上午 10:43](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2337)

            谢谢大神，这个问题他解决了。只是现在还有个问题是他上不了 p 站等部分日本网站，我在网上查了一下原因好像是 p 站等网站 ban 了一些服务器的 ip 段，其中就包括 Vultr，而且好像 Netflix 之类的美国网站也 ban 了。想问一下这个有解决的办法吗，难道只能一个一个服务器试自己有没有被网站禁？

            [回复](#comment-2337)
12.  ![](https://cdn.v2ex.com/gravatar/0933f890eb19c91abcf6d47505374d0c?s=50&d=mm&r=g) <cite class="fn">古柳</cite>说道： [2018 年 9 月 9 日 下午 4:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2311)

    博主你好，请问移动用户的话有什么节点推荐？搬瓦工洛杉矶 cn2 的可以直连吗？

    [回复](#comment-2311)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 9 日 下午 4:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2312)

        对于搬瓦工 CN2 机房来说，移动的话也是走的 CN2 优化线路。不过移动用户推荐使用 Vultr 的日本线路，体验很好：[Vultr 日本线路测评](https://www.flyzy2005.com/go/go.php?url=https://www.vultryhw.com/vultr-tokyo-evaluate/)。

        [回复](#comment-2312)
        1.  ![](https://cdn.v2ex.com/gravatar/0933f890eb19c91abcf6d47505374d0c?s=50&d=mm&r=g) <cite class="fn">古柳</cite>说道： [2018 年 9 月 9 日 下午 4:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2313)

            感谢！回复得好快啊。

            [回复](#comment-2313)
13.  ![](https://cdn.v2ex.com/gravatar/c981c087612d3b32cd058ed34b873f22?s=50&d=mm&r=g) <cite class="fn">[sylarli](https://www.flyzy2005.com/go/go.php?url=http://club.xywy.com/static/20150520/67196015.htm)</cite> 说道： [2018 年 9 月 6 日 下午 9:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2299)

    reddit 上不去 博主有什么办法吗

    [回复](#comment-2299)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 7 日 下午 3:50](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2304)

        群里回你的那位？

        [回复](#comment-2304)
14.  ![](https://cdn.v2ex.com/gravatar/59c2cfa957273b872c9f2f098e618b2c?s=50&d=mm&r=g) <cite class="fn">Top7</cite> 说道： [2018 年 9 月 3 日 上午 3:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2289)

    xdeMacBook-Pro:~ x $ git clone [https://github.com/flyzy2005/ss-fly](https://www.flyzy2005.com/go/go.php?url=https://github.com/flyzy2005/ss-fly)
    git: error: unable to read SDK settings for '/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk'
    git: error: unable to read SDK settings for '/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk'
    Cloning into 'ss-fly'...
    这样怎么办
    之后搭 ss 又出现了一堆错误
    make[2]: Nothing to be done for `install-data-am'.
    Making install in src
    Making install in libsodium
    Making install in include
    make[4]: Nothing to be done for` install-exec-am'.
    ../../../build-aux/install-sh -c -d '/usr/include'
    mkdir: /usr/include: Operation not permitted
    make[4]: *** [install-nobase_includeHEADERS] Error 1
    make[3]: *** [install-am] Error 2
    make[2]: *** [install-recursive] Error 1
    make[1]: *** [install-recursive] Error 1
    make: *** [install-recursive] Error 1
    [错误] libsodium 安装失败!
    现在应该卸载 ss 重新搭脚本吗

    [回复](#comment-2289)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 9 月 3 日 下午 7:13](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2292)

        你还在你的 mac 上的，还没有 ssh 到你的服务器上

        [回复](#comment-2292)
15.  ![](https://cdn.v2ex.com/gravatar/65501fff720c8f5a2c4e99439ac1d49a?s=50&d=mm&r=g) <cite class="fn">tx</cite> 说道： [2018 年 8 月 30 日 下午 12:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2278)

    感谢墙内的你都会了墙内的我 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png)

    [回复](#comment-2278)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 8 月 30 日 下午 1:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2280)

        不客气 我不在墙内 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png)

        [回复](#comment-2280)
        1.  ![](https://cdn.v2ex.com/gravatar/ba63ab08846b7ebce71ee3b8533cf43c?s=50&d=mm&r=g) <cite class="fn">ttkea</cite> 说道： [2018 年 9 月 1 日 下午 1:48](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2287)

            羡慕

            [回复](#comment-2287)
16.  ![](https://cdn.v2ex.com/gravatar/28ef23e97ec279a1aee96d585c948031?s=50&d=mm&r=g) <cite class="fn">波泼莫甫</cite>说道： [2018 年 8 月 28 日 下午 6:22](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2272)

    非常感谢博主，按照你那个教程一次成功，刚好今天还有 Vultr 的 3.5 块服务器~ ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png)

    [回复](#comment-2272)
17.  ![](https://cdn.v2ex.com/gravatar/05afcae7ad9c0d40b7dc9318355d74de?s=50&d=mm&r=g) <cite class="fn">lipe</cite> 说道： [2018 年 8 月 24 日 下午 11:24](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2258)

    老哥帮帮忙！
    试水了一下阿里云新加坡 Unable to locate package clone
    Unable to locate package [https://github.com/flyzy200](https://www.flyzy2005.com/go/go.php?url=https://github.com/flyzy200)
    以前用阿里云香港时没问题

    [回复](#comment-2258)
18.  ![](https://cdn.v2ex.com/gravatar/78a14a66136c536422389b8e6052a9f6?s=50&d=mm&r=g) <cite class="fn">66</cite> 说道： [2018 年 8 月 17 日 下午 4:16](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2228)

    您好！我是个小白。请问在 Vnltr 上购买 vps 后，按照您这个脚本安装的 ss，在刷过梅林固件的路由器上也能用吗？如果行的话，路由器上要装什么版本的 ss 呢？

    [回复](#comment-2228)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 8 月 17 日 下午 4:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2229)

        路由器可以用，刷梅林固件。装什么版本的 ss 不太了解，应该都可以的

        [回复](#comment-2229)
        1.  ![](https://cdn.v2ex.com/gravatar/78a14a66136c536422389b8e6052a9f6?s=50&d=mm&r=g) <cite class="fn">66</cite> 说道： [2018 年 8 月 17 日 下午 4:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2231)

            谢谢！！！

            [回复](#comment-2231)
19.  ![](https://cdn.v2ex.com/gravatar/e686439a9627d95e58737b6e1b0fc7d4?s=50&d=mm&r=g) <cite class="fn">Youxij</cite> 说道： [2018 年 8 月 11 日 上午 3:48](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2212)

    博主，根据你的攻略，确实搞出了端口密码，但是没办法上网，我的 VPS 是 vultr 洛杉矶的。用了朋友的 SS 端口密码却可以上网，该怎么解决。

    [回复](#comment-2212)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 8 月 11 日 下午 9:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2213)

        根据公众号左下角常见问题看一下。一般脚本如果提示成功了，就没有问题了，注意端口，加密方式等等

        [回复](#comment-2213)
20.  ![](https://cdn.v2ex.com/gravatar/b57025cce02aaefeddd8b019f234e240?s=50&d=mm&r=g) <cite class="fn">Ferris</cite> 说道： [2018 年 8 月 10 日 下午 9:08](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2208)

    一直出现安装失败，说没有发现这个文件？？？

    [回复](#comment-2208)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 8 月 10 日 下午 9:24](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2209)

        没有发现哪个文件？先要下载脚本的啊 就是那个 clone

        [回复](#comment-2209)
        1.  ![](https://cdn.v2ex.com/gravatar/6bb82efca6db4c953ad6daf11ea2bbbf?s=50&d=mm&r=g) <cite class="fn">星空</cite>说道： [2018 年 8 月 17 日 上午 11:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2226)

            fatal: unable to access 'https://github.com/flyzy2005/ss-fly/': Couldn't connect to server 这是什么情况

            [回复](#comment-2226)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 8 月 17 日 下午 4:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2230)

                这个代码是放在 github 上的，按道理应该肯定可以 connect 到啊

                [回复](#comment-2230)
                1.  ![](https://cdn.v2ex.com/gravatar/6bb82efca6db4c953ad6daf11ea2bbbf?s=50&d=mm&r=g) <cite class="fn">星空</cite>说道： [2018 年 8 月 17 日 下午 10:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2232)

                    就是 connect 不到

                2.  ![](https://cdn.v2ex.com/gravatar/b673fa59b10d7a5d7f65ad8b66f9d28e?s=50&d=mm&r=g) <cite class="fn">Rudy</cite> 说道： [2018 年 8 月 31 日 上午 11:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2283)

                    同问，我也 connect 不到

                3.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 8 月 31 日 下午 7:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2284)

                    用 3.5 的方案

                4.  ![](https://cdn.v2ex.com/gravatar/b673fa59b10d7a5d7f65ad8b66f9d28e?s=50&d=mm&r=g) <cite class="fn">Rudy</cite> 说道： [2018 年 8 月 31 日 下午 9:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2286)

                    是的，就是 only ipv6 连接不到 github，谢谢楼主啦

21.  ![](https://cdn.v2ex.com/gravatar/fc5a1a0f04ead5167fac8dff2929b3de?s=50&d=mm&r=g) <cite class="fn">Da V</cite> 说道： [2018 年 8 月 10 日 下午 5:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2206)

    博主是及时雨般的存在

    [回复](#comment-2206)
22.  ![](https://cdn.v2ex.com/gravatar/882e89bcdfbbd7f0a054ae4b20092286?s=50&d=mm&r=g) <cite class="fn">萌新</cite>说道： [2018 年 7 月 30 日 下午 6:00](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2176)

    站长您好 我按着您的方法搭建出来并使用了一段时间 不过最近好像被墙了 这个脚本能不能继续给别的服务器使用 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/idea.png)

    [回复](#comment-2176)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 30 日 下午 11:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2179)

        当然可以

        [回复](#comment-2179)
        1.  ![](https://cdn.v2ex.com/gravatar/882e89bcdfbbd7f0a054ae4b20092286?s=50&d=mm&r=g) <cite class="fn">qinuen</cite> 说道： [2018 年 7 月 30 日 下午 11:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2180)

            万分感谢

            [回复](#comment-2180)
23.  ![](https://cdn.v2ex.com/gravatar/26994d62981c70c889f6e8c381846087?s=50&d=mm&r=g) <cite class="fn">SXL</cite> 说道： [2018 年 7 月 27 日 下午 3:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2168)

    站长求救！报错信息如下

    [2018-07-27 14:57:08] System.Reflection.TargetInvocationException: 操作过程中出现异常，结果无效。有关异常的详细信息，请查看 InnerException。 ---> System.Net.WebException: 基础连接已经关闭: 发送时发生错误。 ---> System.IO.IOException: 从传输流收到意外的 EOF 或 0 个字节。
    在 System.Net.TlsStream.EndWrite(IAsyncResult asyncResult)
    在 System.Net.PooledStream.EndWrite(IAsyncResult asyncResult)
    在 System.Net.ConnectStream.WriteHeadersCallback(IAsyncResult ar)
    --- 内部异常堆栈跟踪的结尾 ---
    在 System.Net.HttpWebRequest.EndGetResponse(IAsyncResult asyncResult)
    在 System.Net.WebClient.GetWebResponse(WebRequest request, IAsyncResult result)
    在 System.Net.WebClient.DownloadBitsResponseCallback(IAsyncResult result)
    --- 内部异常堆栈跟踪的结尾 ---
    在 System.ComponentModel.AsyncCompletedEventArgs.RaiseExceptionIfNecessary()
    在 System.Net.DownloadStringCompletedEventArgs.get_Result()
    在 Shadowsocks.Controller.UpdateChecker.http_DownloadStringCompleted(Object sender, DownloadStringCompletedEventArgs e)
    [2018-07-27 14:57:23] Shadowsocks started

    [回复](#comment-2168)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 28 日 上午 12:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2169)

        光看这个看不出来错误，你跟着公众号 **flyzy 小站**左下角常见问题自己一步步排查定位下问题在哪里

        [回复](#comment-2169)
    2.  ![](https://cdn.v2ex.com/gravatar/0fe7c5c29f577969ddf63a2fe07049ec?s=50&d=mm&r=g) <cite class="fn">wyang0824</cite> 说道： [2018 年 7 月 28 日 上午 11:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2172)

        楼主，请问一下，你这个脚本在景安 VPS 上能用吗？

        [回复](#comment-2172)
        1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 30 日 上午 12:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2175)

            支持

            [回复](#comment-2175)
            1.  ![](https://cdn.v2ex.com/gravatar/0fe7c5c29f577969ddf63a2fe07049ec?s=50&d=mm&r=g) <cite class="fn">wyang0824</cite> 说道： [2018 年 8 月 22 日 下午 5:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2240)

                请问一下，按照您的教程搭建 SSR，最后我看使用的客户端版本是 V4.9，如果用 V4.7 效果会不会可能差一点？这个客户端版本是不是要和搭建的服务版本符合有个匹配，然后使用的效果才好

                [回复](#comment-2240)
24.  ![](https://cdn.v2ex.com/gravatar/f795f62bc898351c9036616325b7b43f?s=50&d=mm&r=g) <cite class="fn">失去方向</cite>说道： [2018 年 7 月 26 日 下午 6:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2161)

    按照教程搞了一个东京的 但是很慢
    对介绍的那个电信最优线路有兴趣但不知道怎么操作
    是不是买了以后也按这个教程重新来一遍？
    那是不是现在在 vultr 买的这个就作废了？

    [回复](#comment-2161)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 27 日 上午 12:07](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2164)

        Vultr 东京的对于电信确实不行，建议试试洛杉矶和西雅图。如果想用电信优化线路可以参考：[电信 ss 限速 优化线路推荐](https://www.flyzy2005.com/fan-qiang/shadowsocks/telecom-shadowsocks/)，vultr 停止了就不收费了，你可以以后有大流量需求，例如下载视频的时候再开启 Vultr 就可以了，参考：[Vultr 如何摧毁服务器停止计费](https://www.flyzy2005.com/go/go.php?url=https://www.vultryhw.com/vultr-destroy-instance-stop-billing/)。

        [回复](#comment-2164)
25.  ![](https://cdn.v2ex.com/gravatar/cec27f9cbe5c228c933bb5857c5def68?s=50&d=mm&r=g) <cite class="fn">佐佐木</cite>说道： [2018 年 7 月 23 日 下午 1:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2148)

    站长你好，有两个问题想请教下：
    1\. 按照一键搭建 ss 脚本生成的 ss 默认用的加密方式是 aes-256-cfb，如果想要更换加密方式该怎么操作？
    2\. 我看到你在 VPS 测评里的文章，我想知道你用的测速工具是什么？能不能写一篇小白教程教一下我们这些小白该怎么测试 VPS 的速度

    [回复](#comment-2148)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 23 日 下午 10:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2150)

        可以修改的，直接修改配置文件就可以。配置文件位于`/etc/shadowsocks.json`，修改后重启下 ss 即可生效。第二个问题我之后看看有时间写一篇吧

        [回复](#comment-2150)
        1.  ![](https://cdn.v2ex.com/gravatar/505158dbe9e8af6e60af6bbeb292c212?s=50&d=mm&r=g) <cite class="fn">佐佐木</cite>说道： [2018 年 7 月 23 日 下午 10:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2151)

            谢谢站长。之前不知道为什么留言没显示，导致我进行了重复留言，不好意思。

            [回复](#comment-2151)
26.  ![](https://cdn.v2ex.com/gravatar/d080e254a13440dc522792f70fb9b7e7?s=50&d=mm&r=g) <cite class="fn">我一个</cite>说道： [2018 年 7 月 18 日 下午 10:15](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2124)

    想问一下博主 如果想用模拟器安装需要翻墙的 APP 在电脑上用 那么怎么让模拟器走代理？

    [回复](#comment-2124)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 19 日 下午 7:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2129)

        参考 [Proxifier 配合 Shadowsocks 实现全局代理](https://www.flyzy2005.com/fan-qiang/shadowsocks/proxifier-with-shadowsocks/)

        [回复](#comment-2129)
27.  ![](https://cdn.v2ex.com/gravatar/ffa906a52e8d08bf25a811517bc37cb9?s=50&d=mm&r=g) <cite class="fn">王文武</cite>说道： [2018 年 7 月 18 日 下午 8:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2123)

    xshell 连接上了 SSR 也安装好了 ssr 客户端配置好之后 怎么 “科学上网”？谷歌还是打不开

    [回复](#comment-2123)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 19 日 下午 7:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2130)

        参考公众号 **flyzy 小站**左下角常见问题

        [回复](#comment-2130)
28.  ![](https://cdn.v2ex.com/gravatar/e463ce865a81946ce4adae80ddf2471f?s=50&d=mm&r=g) <cite class="fn">cjf1699</cite> 说道： [2018 年 7 月 14 日 下午 10:19](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2105)

    请问楼主，在 vultr 网站上充值后购买服务器时 2.5 刀的显示 ipv6 only 是什么意思？我现在的网不支持 ipv6 是不是就不能用这个？谢谢！

    [回复](#comment-2105)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 14 日 下午 10:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2106)

        [Vultr 2.5 美元 / 月全地区补货 只支持 IPv6](https://www.flyzy2005.com/go/go.php?url=https://www.vultryhw.com/vultr-ipv6-only/)，暂时只能额外买 IPv4 地址，要么直接升级套餐为 5 美刀的

        [回复](#comment-2106)
29.  ![](https://cdn.v2ex.com/gravatar/9040407b4ab9f33fee1e42bb4883b32a?s=50&d=mm&r=g) <cite class="fn">Bottest</cite> 说道： [2018 年 7 月 12 日 下午 2:07](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2095)

    Vultr 建的服务器都是按小时收费的吗？难道每次不用都要 destroy 一次？

    [回复](#comment-2095)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 12 日 下午 2:16](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2096)

        按小时收费。你可以一直开着啊，一个月也就几美元

        [回复](#comment-2096)
30.  ![](https://cdn.v2ex.com/gravatar/a34a594447f14a05ad96e240fdeef191?s=50&d=mm&r=g) <cite class="fn">谢谢大佬</cite>说道： [2018 年 7 月 9 日 下午 4:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2081)

    找了一下午，还是这个靠谱，感谢！稍微打赏一下 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cowboy.png)

    [回复](#comment-2081)
31.  ![](https://cdn.v2ex.com/gravatar/a7694ca21ab2c221fe3dd61e6ca21fe4?s=50&d=mm&r=g) <cite class="fn">wxkxsw</cite> 说道： [2018 年 7 月 9 日 上午 7:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2079)

    任何电脑都可以吗？最近电脑坏了 只能用朋友的电脑 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

    [回复](#comment-2079)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 9 日 上午 11:01](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2080)

        都可以的

        [回复](#comment-2080)
32.  ![](https://cdn.v2ex.com/gravatar/6f2b99ffa77fa06022ef16f88ce0c5c8?s=50&d=mm&r=g) <cite class="fn">龖擠癹</cite>说道： [2018 年 7 月 7 日 下午 7:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2066)

    输入 git clone [https://github.com/flyzy2005/ss-fly](https://www.flyzy2005.com/go/go.php?url=https://github.com/flyzy2005/ss-fly) 后
    显示 fatal: destination path 'ss-fly' already exists and is not an empty directory.

    [回复](#comment-2066)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 7 日 下午 11:13](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2069)

        只要 clone 一次

        [回复](#comment-2069)
33.  ![](https://cdn.v2ex.com/gravatar/5ee92d05dfb7a69ba4ef5b05568878a6?s=50&d=mm&r=g) <cite class="fn">平凡不是梦爱吐槽</cite>说道： [2018 年 7 月 6 日 上午 7:49](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2058)

    你好，我在 vulur 上搭建了酸酸乳 ，想问一下 DDOS 防护是否有必要装？

    [回复](#comment-2058)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 6 日 下午 8:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2061)

        不需要

        [回复](#comment-2061)
34.  ![](https://cdn.v2ex.com/gravatar/993102f3a427914941243a1bcfb72228?s=50&d=mm&r=g) <cite class="fn">楼主小哥哥最棒</cite>说道： [2018 年 7 月 4 日 上午 12:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2055)

    小哥哥，按你的方法搭建好以后为啥还是用不了 Google， IP：45.76.193.226 端口：1024 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

    [回复](#comment-2055)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 4 日 下午 2:48](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2057)

        根据公众号 flyzy 小站左下角常见问题自己排查下哈

        [回复](#comment-2057)
35.  ![](https://cdn.v2ex.com/gravatar/3eaca76f528340e7bf9aefa15b9b6419?s=50&d=mm&r=g) <cite class="fn">Arc</cite> 说道： [2018 年 7 月 3 日 下午 9:27](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2048)

    站长你好，我按照你的教程手机用 SS 能上外网了，速度也 OK，但是 PC 上还是用不了，我 PC 上以前用过别的代理软件，会是这个的关系吗

    [回复](#comment-2048)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 3 日 下午 10:09](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2052)

        检查你的防火墙和浏览器的代理设置 可能那个代理软件把你浏览器的代理设置改了

        [回复](#comment-2052)
        1.  ![](https://cdn.v2ex.com/gravatar/3eaca76f528340e7bf9aefa15b9b6419?s=50&d=mm&r=g) <cite class="fn">Arc</cite> 说道： [2018 年 7 月 4 日 上午 12:15](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2056)

            感谢回复，chrome 的代理设置我已经重置过一次了。我后来在 PC 上又试了下，发现只有 IE 和 chrome 挂了 SS 也没用，或者也不能说完全没用，比如 chrome 挂了 SS 以后能上中文的维基百科了，还有日本的 niconico，pixiv 之类平时上不去的也能上了，但是谷歌油管推特什么的还是用不了。而其他的浏览器，比如火狐，115 什么的就能正常上所有的外网，也不知道是什么原因。

            [回复](#comment-2056)
36.  ![](https://cdn.v2ex.com/gravatar/4c766b297e43138144c3910864b0c4c9?s=50&d=mm&r=g) <cite class="fn">pengzhiqiang</cite> 说道： [2018 年 7 月 2 日 上午 10:09](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2042)

    为什么 我两台 mac 配置都一样 连接的也都一样的服务器 , 一台可以科学上网, 另一台翻不过去. 我朋友的 mac 也好好地 手机也可以连接, 就这台 mac 不行, 好奇怪

    [回复](#comment-2042)
37.  ![](https://cdn.v2ex.com/gravatar/397330d49634b767f2add8a8421ac6b6?s=50&d=mm&r=g) <cite class="fn">fantasyhooky</cite> 说道： [2018 年 7 月 1 日 下午 11:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2037)

    博主，你好，我调出了日志
    [2018-07-01 23:06:38] [Info] Connect [http://www.google.com.hk:443](https://www.flyzy2005.com/go/go.php?url=http://www.google.com.hk:443)
    [2018-07-01 23:06:38] [Info] Disconnect [http://www.google.com.hk:443](https://www.flyzy2005.com/go/go.php?url=http://www.google.com.hk:443)
    [2018-07-01 23:06:39] [Info] Disconnect [http://www.google.com.hk:443](https://www.flyzy2005.com/go/go.php?url=http://www.google.com.hk:443)
    ，然后这个 shadowsocksR 的手机版上登陆没问题，可是一到电脑上就不行，请问是我电脑设置什么原因么？还是缺少了什么运行库？

    [回复](#comment-2037)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 1 日 下午 11:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2041)

        防火墙？代理插件？电脑端是否启动？无外乎这几种。实在不行就换一个客户端版本

        [回复](#comment-2041)
        1.  ![](https://cdn.v2ex.com/gravatar/397330d49634b767f2add8a8421ac6b6?s=50&d=mm&r=g) <cite class="fn">fantasyhooky</cite> 说道： [2018 年 7 月 2 日 上午 10:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2043)

            防火墙全关设置过，代理插件没装过，电脑端启动过，同一个客户端我在别的电脑上试过可行，新电脑上不行。

            [回复](#comment-2043)
38.  ![](https://cdn.v2ex.com/gravatar/9266ebf7650cb4747f4992c3b977555d?s=50&d=mm&r=g) <cite class="fn">gergerwcvf</cite> 说道： [2018 年 6 月 30 日 下午 5:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2020)

    博主您好，在我按照上述方法进行操作的过程中，遇到了一些问题，代码如下：
    git clone [https://github.com/flyzy2005/ss-fly.git](https://www.flyzy2005.com/go/go.php?url=https://github.com/flyzy2005/ss-fly.git)
    Cloning into 'ss-fly'...
    fatal: unable to access 'https://github.com/flyzy2005/ss-fly.git/': Couldn't connect to server
    请问该如何解决？

    [回复](#comment-2020)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 1 日 上午 12:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2030)

        IPv6 only 不可以用 ss

        [回复](#comment-2030)
        1.  ![](https://cdn.v2ex.com/gravatar/9266ebf7650cb4747f4992c3b977555d?s=50&d=mm&r=g) <cite class="fn">gergerwcvf</cite> 说道： [2018 年 7 月 1 日 上午 9:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2032)

            谢谢您的回复，换了个配置 = 问题已经解决了，感谢您的帮助 == 让一个小白也可以科学上网~~

            [回复](#comment-2032)
            1.  ![](https://cdn.v2ex.com/gravatar/000cae85bfb7d00e4fa824a9d15a9034?s=50&d=mm&r=g) <cite class="fn">bobo</cite> 说道： [2018 年 7 月 3 日 上午 9:51](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2044)

                请问你怎么解决的？加钱买了个 ipv4 的 ip 吗

                [回复](#comment-2044)
                1.  ![](https://cdn.v2ex.com/gravatar/9266ebf7650cb4747f4992c3b977555d?s=50&d=mm&r=g) <cite class="fn">gergerwcvf</cite> 说道： [2018 年 7 月 3 日 下午 6:11](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2046)

                    嗯，是的。。毕竟小白嘛。。也没找出别的方案，真的感谢站长这么热心的逐条回复 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/biggrin.png)

39.  ![](https://cdn.v2ex.com/gravatar/9f60da417b7a3b227efe574cef47f4d1?s=50&d=mm&r=g) <cite class="fn">狐仙家</cite>说道： [2018 年 6 月 30 日 下午 1:05](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2015)

    请问 vultr 怎么开启 udp 转发.. 梅林游戏模式用的.. 以前买的 ss 有 UDP 转发, 联机秒进.. 现在 vultr 要等...

    [回复](#comment-2015)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 1 日 上午 12:09](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2025)

        ss 默认开始 udp 转发的

        [回复](#comment-2025)
40.  ![](https://cdn.v2ex.com/gravatar/ad51d2d9994937c14126704dee5fc74f?s=50&d=mm&r=g) <cite class="fn">坎图沙</cite>说道： [2018 年 6 月 28 日 下午 6:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1992)

    貌似现在 2.5 刀 / 月的都是只支持 IPV6 啊

    [回复](#comment-1992)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 28 日 下午 6:52](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1993)

        是的 前两天刚改的 2.5 的只支持 IPv6 了现在

        [回复](#comment-1993)
        1.  ![](https://cdn.v2ex.com/gravatar/7efe9a7f1e8a6895b11b1dad66968523?s=50&d=mm&r=g) <cite class="fn">[大表哥](https://www.flyzy2005.com/go/go.php?url=http://siven.net)</cite>说道： [2018 年 6 月 29 日 下午 4:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2006)

            所以 2.5 美刀一个月的 IPV6, 怎么使用 TAT

            [回复](#comment-2006)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 7 月 1 日 上午 12:11](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2028)

                目前 IPv6 的不可用，需要[手动再分配 IPv4](https://www.flyzy2005.com/vps/vultr-ipv6-only/)

                [回复](#comment-2028)
41.  ![](https://cdn.v2ex.com/gravatar/84050d330e8cee35e217c8c435f89815?s=50&d=mm&r=g) <cite class="fn">峻晨</cite>说道： [2018 年 6 月 28 日 下午 3:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1991)

    执行 git clone [https://github.com/flyzy2005/ss-fly 的时候，](https://www.flyzy2005.com/go/go.php?url=https://github.com/flyzy2005/ss-fly的时候，)
    提示 fatal: unable to access 'https://github.com/flyzy2005/ss-fly/': Could not resolve host: github.com
    之前可以的，就最近两天这样了~
    换过几个主机试过，都是这样的，请问一下什么问题呢、

    [回复](#comment-1991)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 28 日 下午 6:53](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1994)

        这个应该就是你 VPS 的问题啊 怎么 github.com 解析不了

        [回复](#comment-1994)
42.  ![](https://cdn.v2ex.com/gravatar/d237404bcfd5d72dc1222289747cc5f3?s=50&d=mm&r=g) <cite class="fn">德拉卡诺</cite>说道： [2018 年 6 月 28 日 上午 4:19](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1985)

    东京的服务器出了 2.5 刀一个月的套餐 但是仅支持 IPv6 下载一键搭建 ss 脚本文件总是失败 这个有什么解决方法吗

    [回复](#comment-1985)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 28 日 下午 1:47](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1987)

        2.5 的仅支持 IPv6 暂时不能用 本地网络很多不支持 IPv6 的

        [回复](#comment-1987)
43.  ![](https://cdn.v2ex.com/gravatar/602c51321c8491b00983c99f62fc8d14?s=50&d=mm&r=g) <cite class="fn">miwawgp</cite> 说道： [2018 年 6 月 27 日 下午 4:15](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1976)

    我不能 ss，试了好几次了，设置应该都对的，就是怎么也连不上！

    your server ip 216.126.239.136

    your server port 11450

    your password

    your encryption method aes-256-cfb

    [回复](#comment-1976)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 27 日 下午 5:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1979)

        公众号左下角常见问题看一下

        [回复](#comment-1979)
44.  ![](https://cdn.v2ex.com/gravatar/f2d87ce92bbfd2c924f253d28c4281a1?s=50&d=mm&r=g) <cite class="fn">[123](https://www.flyzy2005.com/go/go.php?url=http://cykablyat.com)</cite> 说道： [2018 年 6 月 26 日 下午 11:28](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1974)

    谢谢你啦

    [回复](#comment-1974)
45.  ![](https://cdn.v2ex.com/gravatar/b2a8e857a6060f525cda6041ea7f312a?s=50&d=mm&r=g) <cite class="fn">王逍遥</cite>说道： [2018 年 6 月 26 日 上午 12:41](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1960)

    您好，开启 ss 之后卡在这里：
    Connecting to github-production-release-asset-2e65be.s3.amazonaws.com (github-production-release-asset-2e65be.s3.amazonaws.com)|52.216.82.40|:443... failed: Connection timed out.
    Retrying.

    [回复](#comment-1960)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 26 日 下午 4:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1965)

        VPS 服务商的网络不好导致的吧，过会再试下

        [回复](#comment-1965)
        1.  ![](https://cdn.v2ex.com/gravatar/b2a8e857a6060f525cda6041ea7f312a?s=50&d=mm&r=g) <cite class="fn">王逍遥</cite>说道： [2018 年 6 月 26 日 下午 4:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1967)

            确实是 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/lol.png) 用的腾讯云送的免费的广州的 ecs，换了阿里的香港就可以了。。纯小白，谢谢大神指点回复 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/arrow.png)

            [回复](#comment-1967)
        2.  ![](https://cdn.v2ex.com/gravatar/b2a8e857a6060f525cda6041ea7f312a?s=50&d=mm&r=g) <cite class="fn">王逍遥</cite>说道： [2018 年 6 月 26 日 下午 4:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1968)

            话说阿里的香港节点最便宜的突发式 ecs 还是很便宜啊！包月才 26，流量设置的上限 100m 按流量计费，1g 流量 1 元，用 sstap 连接后玩了一晚上流量费才 3 分钱！而且吃鸡捡枪秒捡开门秒开，比迅游好太多了！真的感谢楼主大大！么么哒 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/rolleyes.png)

            [回复](#comment-1968)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 26 日 下午 4:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1969)

                用的这个？[阿里云国内](https://www.flyzy2005.com/goto/aliyun)？

                [回复](#comment-1969)
                1.  ![](https://cdn.v2ex.com/gravatar/b2a8e857a6060f525cda6041ea7f312a?s=50&d=mm&r=g) <cite class="fn">王逍遥</cite>说道： [2018 年 6 月 26 日 下午 9:00](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1973)

                    是啊，选的香港节点的最便宜的突发型的，很便宜，就是配置服务器的时候有点卡，但是配置完用 sstap 加速吃鸡效果挺好的

            2.  ![](https://cdn.v2ex.com/gravatar/855979ea0f3d8745598c65bc187cdc4d?s=50&d=mm&r=g) <cite class="fn">UnlceHuang</cite> 说道： [2018 年 6 月 27 日 下午 5:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1978)

                ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/biggrin.png) 真的延迟很低吗。大概多少延迟呢。

                [回复](#comment-1978)
            3.  ![](https://cdn.v2ex.com/gravatar/855979ea0f3d8745598c65bc187cdc4d?s=50&d=mm&r=g) <cite class="fn">UnlceHuang</cite> 说道： [2018 年 6 月 30 日 上午 8:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2010)

                你好。你是带宽按量计费还是固定带宽呢。固定带宽 1M 一个月 30 服务器包月 26 一共 56

                [回复](#comment-2010)
                1.  ![](https://cdn.v2ex.com/gravatar/796c13e9e6b679a74c502a1056909715?s=50&d=mm&r=g) <cite class="fn">王逍遥</cite>说道： [2018 年 6 月 30 日 下午 3:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2018)

                    我是选的最大 100m 带宽按量计费的，1g 一块钱

46.  ![](https://cdn.v2ex.com/gravatar/01727629a07ffcba9a4fcab6b533c230?s=50&d=mm&r=g) <cite class="fn">chsword</cite> 说道： [2018 年 6 月 25 日 下午 11:43](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1959)

    老哥，我按着你的教程来安装 ssr，都是能成功安装的，但就是连不上去，防火墙的端口都开放了，下面贴着的是 / var/log/shadowsocksr.log 的日志
    2018-06-25 11:11:55 INFO server.py:48 current process RLIMIT_NOFILE resource: soft 1024 hard 4096
    2018-06-25 11:11:55 INFO asyncdns.py:287 black_hostname_list init as : []
    2018-06-25 11:11:55 INFO asyncdns.py:335 dns server: [('208.67.222.222', 53), ('208.67.220.220', 53)]
    2018-06-25 11:11:55 INFO server.py:108 server start with protocol[auth_sha1_v4] password [Chsword.2018] method [aes-256-ctr] obfs [tls1.2_ticket_auth] obfs_param []
    2018-06-25 11:11:55 INFO server.py:125 starting server at [::]:8888
    2018-06-25 11:11:55 INFO server.py:145 starting server at 0.0.0.0:8888
    2018-06-25 11:14:52 ERROR auth.py:331 auth_sha1_v4 data uncorrect auth HMAC-SHA1

    [回复](#comment-1959)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 26 日 下午 4:22](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1966)

        这个我不太了解，没遇到过

        [回复](#comment-1966)
47.  ![](https://cdn.v2ex.com/gravatar/96bb40e801b4d5042b42b3b151ab15ce?s=50&d=mm&r=g) <cite class="fn">SimonBk</cite> 说道： [2018 年 6 月 24 日 下午 7:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1945)

    博主您好！请教问题，我在 Vultr 上创建了一个实例服务器之后发现 IP 不可用，这就没办法执行后面的安装部署了，后来按网上说的创建了一个快照服务器 更改 IP 地址，用新的快照 IP 可以链接上了 也部署好了 SS 和 BBR，本地设置了快照服务器的 IP 没能成功上 Google 等网站，我应该从哪里检查问题所在呢？ 还有的就是快照那个服务器是没有密码的 那是否要另外收费？

    [回复](#comment-1945)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 24 日 下午 7:37](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1947)

        1\. 问题你这么说我也不知道你的问题在哪里，详细请参考公众号左下角的常见问题，自己排查
        2\. 快照的密码跟你之前的服务器的密码一样的，如果忘记了，可以参考 [Vultr 修改 ROOT 用户密码](https://www.flyzy2005.com/vps/vultr-modify-root-password/)自己修改一下

        [回复](#comment-1947)
        1.  ![](https://cdn.v2ex.com/gravatar/96bb40e801b4d5042b42b3b151ab15ce?s=50&d=mm&r=g) <cite class="fn">SimonBk</cite> 说道： [2018 年 6 月 24 日 下午 8:27](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1948)

            好的，我全部服务器删除了再重新来一次吧，感谢。

            [回复](#comment-1948)
        2.  ![](https://cdn.v2ex.com/gravatar/96bb40e801b4d5042b42b3b151ab15ce?s=50&d=mm&r=g) <cite class="fn">SimonBk</cite> 说道： [2018 年 6 月 24 日 下午 8:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1949)

            另外，快照制作出来的服务器是不是也要收费的？还是只有原本的那个实例服务器收费？

            [回复](#comment-1949)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 24 日 下午 8:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1950)

                你把之前的服务器删了就好了啊 一起收费的。快照就是之前服务器的一个复制品，所以之前的就可以不用了

                [回复](#comment-1950)
                1.  ![](https://cdn.v2ex.com/gravatar/96bb40e801b4d5042b42b3b151ab15ce?s=50&d=mm&r=g) <cite class="fn">SimonBK</cite> 说道： [2018 年 6 月 24 日 下午 9:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1951)

                    全部删除重新搭建一个就好了，虽然在 Mac 上出了点小插曲，密码加密方法选错了，后来找到原因了，感谢博主！ ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/rolleyes.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/rolleyes.png) 希望 SS 比 XX-Net 稳定 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/eek.png)

48.  ![](https://cdn.v2ex.com/gravatar/fa28d5ad820f54fc5c9d84c641f06e87?s=50&d=mm&r=g) <cite class="fn">咸鱼</cite>说道： [2018 年 6 月 24 日 下午 5:27](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1938)

    站长, 我照着教程做, 可是第一步就遇到问题了, 在执行`git clone https://github.com/flyzy2005/ss-fly`的时候, 提示 fatal: destination path 'ss-fly' already exists and is not an empty directory.

    [回复](#comment-1938)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 24 日 下午 5:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1939)

        你之前 clone 过一次了吧？这句命令只需要执行一次（效果是从 github 上下载脚本代码，所以执行一次就可以了）

        [回复](#comment-1939)
        1.  ![](https://cdn.v2ex.com/gravatar/fa28d5ad820f54fc5c9d84c641f06e87?s=50&d=mm&r=g) <cite class="fn">咸鱼</cite>说道： [2018 年 6 月 24 日 下午 5:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1940)

            我之前 destroy 过服务器, 重新 deploy 的, 而且如果我直接执行 ss-fly/ss-fly.sh -i XXX 1024 也会提示'ss-fly' 不是内部或外部命令，也不是可运行的程序.

            [回复](#comment-1940)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 24 日 下午 5:48](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1941)

                `rm -rf ss-fly`，之后重新 clone

                [回复](#comment-1941)
                1.  ![](https://cdn.v2ex.com/gravatar/fa28d5ad820f54fc5c9d84c641f06e87?s=50&d=mm&r=g) <cite class="fn">咸鱼</cite>说道： [2018 年 6 月 24 日 下午 5:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1942)

                    站长, 出大问题了, 可以 ping 通, 但是 xshell 连不上 vps 服务器了 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 24 日 下午 6:06](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1943)

                    [VPS IP 被墙检测](https://www.flyzy2005.com/tech/ip-check/)

                3.  ![](https://cdn.v2ex.com/gravatar/fa28d5ad820f54fc5c9d84c641f06e87?s=50&d=mm&r=g) <cite class="fn">咸鱼</cite>说道： [2018 年 6 月 24 日 下午 6:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1944)

                    检测了 icmp 可用, 但是 tcp 不可用, 换了几个机房的都是这样, 是不是 vultr 被查水表了... ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

                4.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 24 日 下午 7:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1946)

                    没有 还可用的 多试几个

49.  ![](https://cdn.v2ex.com/gravatar/1f48b4c9a94838bc9d9e8b871cb3f186?s=50&d=mm&r=g) <cite class="fn">zbx</cite> 说道： [2018 年 6 月 22 日 下午 4:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1930)

    vultr 服务器 instagram 手机上看 老是很卡 有时候甚至刷不出来 换过很多服务器了 不知道什么问题

    [回复](#comment-1930)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 22 日 下午 8:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1931)

        其他客户端还可以，就手机端 ins 不行吗？是不是你用的客户端需要设置代理规则？

        [回复](#comment-1931)
50.  ![](https://cdn.v2ex.com/gravatar/90c4422e64fea5a61211b44c3193814d?s=50&d=mm&r=g) <cite class="fn">善心的 cat</cite> 说道： [2018 年 6 月 19 日 下午 10:01](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1911)

    ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png) 首先谢谢博主，以后打算自己弄个小油罐，教程也很详细。先跟着教程搭搭试试 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/wink.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/wink.png)

    [回复](#comment-1911)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 19 日 下午 10:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1912)

        邮箱要在公众号留哈

        [回复](#comment-1912)
51.  ![](https://cdn.v2ex.com/gravatar/db673cd21b896cb88e4b5383fde99277?s=50&d=mm&r=g) <cite class="fn">vench</cite> 说道： [2018 年 6 月 19 日 下午 9:41](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1910)

    502 Server dropped connection
    The following error occurred while trying to access [http://google.com/](https://www.flyzy2005.com/go/go.php?url=http://google.com/):

    502 Server dropped connection

    Generated Tue, 19 Jun 2018 21:39:53 中国标准时间 by Polipo on DESKTOP-C8F42I8:8123.。
    你好啊站长，我在公司的电脑可以用，但是回家了电脑就用不了了

    [回复](#comment-1910)
    1.  ![](https://cdn.v2ex.com/gravatar/db673cd21b896cb88e4b5383fde99277?s=50&d=mm&r=g) <cite class="fn">vench</cite> 说道： [2018 年 6 月 20 日 上午 8:51](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1913)

        ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/lol.png) 密码记错了，不好意思

        [回复](#comment-1913)
52.  ![](https://cdn.v2ex.com/gravatar/9f4d3c23a13b040c9a1d7a0f257445dd?s=50&d=mm&r=g) <cite class="fn">[Joy](https://www.flyzy2005.com/go/go.php?url=http://joy.cn)</cite> 说道： [2018 年 6 月 18 日 上午 11:52](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1897)

    博主您好，通过您的教程已经成功搭建 Vultr ss 主机，目前关于扣费的情况想咨询一下您，我看它的计费规则是每小时 0.01 美金？那能否在不用的时候暂停掉服务器让它停止计费呢？具体该怎么操作？谢谢

    [回复](#comment-1897)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 18 日 下午 2:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1898)

        destroy 后不收费，然后你需要 deploy 新的，但是每次 depoly 都需要重新搭建 ss 服务

        [回复](#comment-1898)
53.  ![](https://cdn.v2ex.com/gravatar/f28b6873bc0b6bf78c67cc542e2fcb35?s=50&d=mm&r=g) <cite class="fn">万先生</cite>说道： [2018 年 6 月 17 日 下午 9:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1892)

    关于降低延迟有什么有效方法吗？bbr 加速已经开了，目前云南电信 100m，延迟 250 多 连得是西雅图的服务器。还有就是看 1080 没问题，看 4K 就卡，100M 宽带的话应该支持 4K 在线播放的，目前来看宽带跑不满

    [回复](#comment-1892)
54.  ![](https://cdn.v2ex.com/gravatar/cd4b010a5aaab3553f3b5ed2db3ca2d1?s=50&d=mm&r=g) <cite class="fn">decker</cite> 说道： [2018 年 6 月 17 日 下午 7:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1891)

    [root@TightDrab-VM ~]# git clone [https://github.com/flyzy2005/ss-fly](https://www.flyzy2005.com/go/go.php?url=https://github.com/flyzy2005/ss-fly)
    Cloning into 'ss-fly'...
    fatal: unable to access 'https://github.com/flyzy2005/ss-fly/': Peer reports incompatible or unsupported protocol version.
    这是什么情况，怎么解决

    [回复](#comment-1891)
    1.  ![](https://cdn.v2ex.com/gravatar/d38152baad60305f756007524997bdd4?s=50&d=mm&r=g) <cite class="fn">[huhu](https://www.flyzy2005.com/go/go.php?url=http://baidu.com)</cite> 说道： [2018 年 6 月 24 日 上午 12:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1935)

        yum update -y nss curl libcurl

        不谢

        [回复](#comment-1935)
        1.  ![](https://cdn.v2ex.com/gravatar/9266ebf7650cb4747f4992c3b977555d?s=50&d=mm&r=g) <cite class="fn">Inskye</cite> 说道： [2018 年 6 月 30 日 下午 7:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-2024)

            兄弟谢谢

            [回复](#comment-2024)
55.  ![](https://cdn.v2ex.com/gravatar/5e8064035b391826bc3279691dc79b7d?s=50&d=mm&r=g) <cite class="fn">SSS</cite> 说道： [2018 年 6 月 17 日 上午 11:04](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1888)

    你好，我想问一下 SSR 的速度是根据什么来的？ 我是买了阿里云，想翻回国看世界杯 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png) 。
    但是阿里云的服务器我才发现只给了我 1Mbps, 这个是不是就是我最大的下载速度了？ 加速还有用么？求教求教。

    [回复](#comment-1888)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 17 日 下午 10:37](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1895)

        是的 阿里云的最低配置就是 1M 的最大带宽

        [回复](#comment-1895)
56.  ![](https://cdn.v2ex.com/gravatar/24961f4084415481663342be8594616d?s=50&d=mm&r=g) <cite class="fn">mo</cite> 说道： [2018 年 6 月 15 日 下午 12:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1879)

    为什么我这设置好之后只能访问国内网站，国外的访问不了呀

    [回复](#comment-1879)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 15 日 下午 3:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1881)

        根据公众号左下角常见问题排查下

        [回复](#comment-1881)
57.  ![](https://cdn.v2ex.com/gravatar/b5c6996af6b3f83fa903f7a5538df385?s=50&d=mm&r=g) <cite class="fn">10110</cite> 说道： [2018 年 6 月 14 日 下午 8:09](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1868)

    ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png) xshell 显示 connect failed 是什么情况

    [回复](#comment-1868)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 14 日 下午 8:49](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1872)

        被封了？

        [回复](#comment-1872)
58.  ![](https://cdn.v2ex.com/gravatar/7cbfb6c34bb8f83ef4112057279701d3?s=50&d=mm&r=g) <cite class="fn">schlafengern</cite> 说道： [2018 年 6 月 14 日 下午 4:00](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1866)

    非常感谢 按您的教程完美实现了 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cowboy.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cowboy.png)

    [回复](#comment-1866)
59.  ![](https://cdn.v2ex.com/gravatar/5765c8f277ad7482f058f1284031fa92?s=50&d=mm&r=g) <cite class="fn">起风了</cite>说道： [2018 年 6 月 14 日 下午 2:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1863)

    请教一下博主：搭完一次之后用 vultr - snapshot 功能做备份，重新安装之后需要输入什么命令来启动吗？
    刚刚试了一下，发现不能成功地科学上网，但是这个 IP 地址可以 ping 成功，而且 ss 也表示 “already started”。麻烦博主抽空解答一下，谢谢！

    [回复](#comment-1863)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 14 日 下午 3:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1865)

        应该是不用命令的。你执行下 restart 试试看行不行

        [回复](#comment-1865)
60.  ![](https://cdn.v2ex.com/gravatar/f28b6873bc0b6bf78c67cc542e2fcb35?s=50&d=mm&r=g) <cite class="fn">万先生</cite>说道： [2018 年 6 月 14 日 上午 12:24](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1854)

    搞了好久 总算是弄好了，已经添加 ss 并且能够正常使用，请问我现在要给我基友分享我的服务器流量，如何在已经有一个账号的情况下再创建一个 ss 账号？

    [回复](#comment-1854)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 14 日 上午 9:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1855)

        可以用一个，也可以根据[详解 shadowsocks 配置多用户多密码](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-config-multiple-users/)自己设置。

        [回复](#comment-1855)
61.  ![](https://cdn.v2ex.com/gravatar/99ff9a0ac3a5400ab83b830879b77752?s=50&d=mm&r=g) <cite class="fn">sliver</cite> 说道： [2018 年 6 月 13 日 下午 11:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1853)

    有一下问题想请教博主：
    一. 服务器是自动开启 UDP 转发的吗
    二. 要开启 UDP 转发的话，客户端中 UDP 端口要填多少
    三. 各种协议、加密、混淆应该如何搭配
    四. 如果加速游戏有没有好的解决方案
    问题好多 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/lol.png)

    [回复](#comment-1853)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 14 日 上午 9:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1856)

        ss/ssr 默认开启 UDP 的，端口一样的。加密我基本都是默认的。游戏加速客户端用 sstap

        [回复](#comment-1856)
62.  ![](https://cdn.v2ex.com/gravatar/e134ee5a24543cdc2f8e999aebeeed68?s=50&d=mm&r=g) <cite class="fn">VA-11</cite> 说道： [2018 年 6 月 13 日 下午 8:46](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1847)

    兄弟，目前合肥电信，9 月份学习换移动，请问是搬瓦工还是 Vultra 合适？选哪条线路好一些 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/smile.png)

    [回复](#comment-1847)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 13 日 下午 9:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1849)

        vultr 吧，试试日本或者洛杉矶建议

        [回复](#comment-1849)
63.  ![](https://cdn.v2ex.com/gravatar/f28b6873bc0b6bf78c67cc542e2fcb35?s=50&d=mm&r=g) <cite class="fn">万先生</cite>说道： [2018 年 6 月 12 日 下午 9:46](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1836)

    完全按照你的方法，手机连接速度只有 20 几 K，电脑直接无法访问 YouTube 和 google 等之类的网站，请问是什么原因

    [回复](#comment-1836)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 12 日 下午 9:57](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1837)

        你不是手机没有改成你的配置 而是用的它默认的配置，所以手机能用但是速度很慢？建议根据公众号左下角常见问题结合电脑端的信息排查下问题在哪里

        [回复](#comment-1837)
        1.  ![](https://cdn.v2ex.com/gravatar/f28b6873bc0b6bf78c67cc542e2fcb35?s=50&d=mm&r=g) <cite class="fn">万先生</cite>说道： [2018 年 6 月 12 日 下午 10:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1838)

            不清楚，因为是小白第一次弄帮我看看吗？服务器地址 144.202.*.*，服务器端口 1024，密码 flyzy2005.com, 加密方式就是默认的那个

            [回复](#comment-1838)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 12 日 下午 10:16](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1839)

                我刚才试了下你的这个账号.. 我油管可以看 1080P.. 是你本地网络做了什么限制吗？电脑不能用是防火墙还是之前下过代理插件？

                [回复](#comment-1839)
                1.  ![](https://cdn.v2ex.com/gravatar/f28b6873bc0b6bf78c67cc542e2fcb35?s=50&d=mm&r=g) <cite class="fn">万先生</cite>说道： [2018 年 6 月 12 日 下午 10:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1840)

                    我是 win10 系统，防火墙不知道，但是 360 浏览器之前是下载过科学上网的插件，不过停用了，手机的话并没有下载什么，只是下载了一个用来上网的影梭

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 12 日 下午 10:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1841)

                    停用的话设置不一定取消了，建议可以下载个 chrome 试一下，或者用自带的浏览器试试

                3.  ![](https://cdn.v2ex.com/gravatar/f28b6873bc0b6bf78c67cc542e2fcb35?s=50&d=mm&r=g) <cite class="fn">万先生</cite>说道： [2018 年 6 月 12 日 下午 10:28](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1842)

                    多谢了，试了下，自带的浏览器也不行，上不了，防火墙开着的，实在搞不来

                4.  ![](https://cdn.v2ex.com/gravatar/c0d5e5cca54540b81ea48fd1f36322f7?s=50&d=mm&r=g) <cite class="fn">Quinta</cite> 说道： [2018 年 6 月 13 日 下午 10:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1851)

                    你说的代理插件是指不用自己安装脚本，只要运行一个 ss 客户端就行的那种吗

                5.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 14 日 上午 9:32](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1858)

                    也有那种修改浏览器代理设置的

64.  ![](https://cdn.v2ex.com/gravatar/fbd930e06eb5d138c7b427707ad1f04c?s=50&d=mm&r=g) <cite class="fn">Banny</cite> 说道： [2018 年 6 月 12 日 上午 11:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1833)

    我用阿里云设置一键一键完成了。vps 上也提示成功了。安全策略也部署端口打开了。但是用 ss 客户端就是链接不上 ，手机也是 电脑上网页提示 502 错误

    [回复](#comment-1833)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 12 日 下午 1:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1835)

        这个我不清楚，提示安装好了就说明没有问题了。你用 [IP 检测工具](https://www.flyzy2005.com/tech/ip-check/)检测下你的 ss 端口用别的机子能访问吗

        [回复](#comment-1835)
65.  ![](https://cdn.v2ex.com/gravatar/a8635eb8ea215ecc8f7a43e15a668f27?s=50&d=mm&r=g) <cite class="fn">清玲</cite>说道： [2018 年 6 月 12 日 上午 9:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1828)

    电信宽带可以替代搬瓦工或者 Vultr 服务器搭建 ss 服务或者 ssr 服务吗？

    [回复](#comment-1828)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 12 日 上午 9:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1829)

        没懂你的意思？你要科学上网必须要一个墙外的代理服务器啊，Vultr 或搬瓦工就是这个用处

        [回复](#comment-1829)
        1.  ![](https://cdn.v2ex.com/gravatar/a8635eb8ea215ecc8f7a43e15a668f27?s=50&d=mm&r=g) <cite class="fn">清玲</cite>说道： [2018 年 6 月 12 日 上午 9:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1830)

            好吧，我知道了，谢谢楼主

            [回复](#comment-1830)
66.  ![](https://cdn.v2ex.com/gravatar/b1fe91d75075d981d78e5540a74d2182?s=50&d=mm&r=g) <cite class="fn">快快滴</cite>说道： [2018 年 6 月 11 日 下午 6:49](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1826)

    请问我之前 ss 还可以用，最近电脑就不行了，手机还可以，日志显示 [2018-06-11 18:29:50] Shadowsocks started
    [2018-06-11 18:36:11] System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
    在 System.Net.Sockets.Socket.EndReceive(IAsyncResult asyncResult)
    在 Shadowsocks.Controller.Handler.PipeConnectionReceiveCallback(IAsyncResult ar)
    [2018-06-11 18:36:11] System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
    在 System.Net.Sockets.Socket.EndReceive(IAsyncResult asyncResult)
    在 Shadowsocks.Controller.PortForwarder.Handler.PipeConnectionReceiveCallback(IAsyncResult ar)
    [2018-06-11 18:37:34] System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
    在 System.Net.Sockets.Socket.EndReceive(IAsyncResult asyncResult)
    在 Shadowsocks.Controller.Handler.PipeRemoteReceiveCallback(IAsyncResult ar)
    [2018-06-11 18:37:42] System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
    在 System.Net.Sockets.Socket.EndReceive(IAsyncResult asyncResult)
    在 Shadowsocks.Controller.Handler.PipeRemoteReceiveCallback(IAsyncResult ar)
    这是怎么回事啊

    [回复](#comment-1826)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 12 日 上午 9:41](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1832)

        手机还可以说明服务器没问题，电脑是网络发生变化了吗？

        [回复](#comment-1832)
        1.  ![](https://cdn.v2ex.com/gravatar/b1fe91d75075d981d78e5540a74d2182?s=50&d=mm&r=g) <cite class="fn">快快滴</cite>说道： [2018 年 6 月 12 日 下午 1:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1834)

            不太清楚啊，是代理问题吗，小白不太懂啊，不过后来换成全局模式又好了

            [回复](#comment-1834)
67.  ![](https://cdn.v2ex.com/gravatar/492b8cdcc825a5656182af6f781028be?s=50&d=mm&r=g) <cite class="fn">leeeee</cite> 说道： [2018 年 6 月 11 日 下午 6:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1824)

    140.82.**.**
    1024
    3p#J5qHNQ(-.ANL2
    博主能帮我看下为啥不行么？账号密码如上

    [回复](#comment-1824)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 12 日 上午 9:41](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1831)

        你这个密码是 VPS 的密码吧，不要这么复杂的密码，就用字母 + 数字就行

        [回复](#comment-1831)
        1.  ![](https://cdn.v2ex.com/gravatar/f8c92698c8eef341140f60b777bf1c7d?s=50&d=mm&r=g) <cite class="fn">杨</cite>说道： [2018 年 6 月 14 日 上午 11:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1860)

            请问一下，这个密码如何修改啊？

            [回复](#comment-1860)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 14 日 下午 12:51](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1861)

                1\. 手动修改配置文件：/etc/shadowsocks.json
                2\. 重新执行一次安装脚本命令

                [回复](#comment-1861)
                1.  ![](https://cdn.v2ex.com/gravatar/f8c92698c8eef341140f60b777bf1c7d?s=50&d=mm&r=g) <cite class="fn">杨</cite>说道： [2018 年 6 月 14 日 下午 2:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1862)

                    抱歉，我实在是白痴，请问这个配置文件在哪里？

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 14 日 下午 3:54](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1864)

                    仔细看博客 我有介绍如何修改密码的 配置文件那个就是文件路径

68.  ![](https://cdn.v2ex.com/gravatar/c08e0d9f50073dc540f1818cb01ff17c?s=50&d=mm&r=g) <cite class="fn">woshiainiao</cite> 说道： [2018 年 6 月 10 日 下午 8:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1813)

    configure: error: in `/root/libsodium-1.0.16':
    configure: error: no acceptable C compiler found in $PATH
    See` config.log' for more details
    [错误] libsodium 安装失败! 安装失败

    [回复](#comment-1813)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 10 日 下午 9:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1816)

        搬瓦工修改了 OS 但是没有重启是吗？如果是的话你可以关注下公众号 flyzy 小站，左下角常见问题里有介绍怎么弄

        [回复](#comment-1816)
69.  ![](https://cdn.v2ex.com/gravatar/2d453b907d967bb8cd10436f5831d610?s=50&d=mm&r=g) <cite class="fn">ikk</cite> 说道： [2018 年 6 月 10 日 下午 3:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1809)

    已搭建成功 谢谢

    [回复](#comment-1809)
70.  ![](https://cdn.v2ex.com/gravatar/93866a433b1ecaab8dd63c59e7232dce?s=50&d=mm&r=g) <cite class="fn">一只猪在校</cite>说道： [2018 年 6 月 10 日 下午 3:32](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1808)

    老哥您好，打搅了。我按照你的教程搭建 ss，完成的结果和你截图的一致。能打开谷歌，但是搜索推特都进不去。ip 是 52.15.69.** 端口是 1024 。感谢

    [回复](#comment-1808)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 10 日 下午 4:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1810)

        出于隐私，我已经将你的日志删除，将 IP 打码。
        我测了下你的 ip+1024 端口，似乎并不通，是你已经将 ss 服务关闭了吗？你自己可以根据 [VPS IP 被墙检测](https://www.flyzy2005.com/tech/ip-check/)检测一下你 VPS IP 的可用性。
        之后你说能打开谷歌，但是无法上推特？这个你用全局模式试试看，能上谷歌按道理是已经搭建成功了，推特应该在 PAC 规则里的，要么你换一个客户端版本试试。

        [回复](#comment-1810)
        1.  ![](https://cdn.v2ex.com/gravatar/93866a433b1ecaab8dd63c59e7232dce?s=50&d=mm&r=g) <cite class="fn">一只猪在校</cite>说道： [2018 年 6 月 10 日 下午 8:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1812)

            非常感谢老哥你的回复。我的问题就像这个博客说的 [https://blog.csdn.net/chenside2002/article/details/78339690。](https://www.flyzy2005.com/go/go.php?url=https://blog.csdn.net/chenside2002/article/details/78339690。) 不同的客户端版本的报的错也是不一样的，但是我百度了，按照他们的操作去修改，但是没有效果。
            502 Read from server failed: Unknown error。
            偶尔能打开谷歌搜到东西，但是无法进去。谷歌打不开的情况居多。我用您的小程序对 ip 和端口做了测试，是显示的链接不到。我的 shadowsocks 确认是打开的。

            [回复](#comment-1812)
71.  ![](https://cdn.v2ex.com/gravatar/d4243f2687061dff923b6f5161f9a76c?s=50&d=mm&r=g) <cite class="fn">Marks</cite> 说道： [2018 年 6 月 10 日 下午 2:47](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1806)

    Connecting to 207.148.88.110:22...
    Connection established.
    To escape to local shell, press 'Ctrl+Alt+]'.

    Socket error Event: 32 Error: 10053.
    Connection closing...Socket close.

    Connection closed by foreign host.

    Disconnected from remote host(ÐÂ½¨»á»°) at 14:44:34.

    Type `help' to learn how to use Xshell prompt.
    链接不上啊？

    [回复](#comment-1806)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 10 日 下午 3:04](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1807)

        本地网络不稳定

        [回复](#comment-1807)
72.  ![](https://cdn.v2ex.com/gravatar/d0879772bb2b375dae23a4b80945c0bd?s=50&d=mm&r=g) <cite class="fn">陈枫</cite>说道： [2018 年 6 月 9 日 下午 6:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1802)

    搬瓦工 VPS 地址选择洛杉矶（购买后可以后台自助切换），你好，看了你的文章买的 20G LA CN2 GIA，请问怎么在搬瓦工后台自助切换，切换后搭建的 SS 会不会影响，需不需要切换后还得操作什么？谢谢啦

    [回复](#comment-1802)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 9 日 下午 6:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1803)

        GIA 的不需要切换的

        [回复](#comment-1803)
73.  ![](https://cdn.v2ex.com/gravatar/1441e8b3fa7b951c033a91c244f7e5b9?s=50&d=mm&r=g) <cite class="fn">MalvinChan</cite> 说道： [2018 年 6 月 9 日 上午 8:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1792)

    你好，我在购买 VPS 时忘记勾选了下面的 Enable lpv6 了 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png) 现在已经搭建好了，会有什么影响吗？或者现在还有补救的办法吗？

    [回复](#comment-1792)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 9 日 下午 4:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1797)

        没有影响，可以再开启的

        [回复](#comment-1797)
74.  ![](https://cdn.v2ex.com/gravatar/1ab234cc3bdd565fa21769640e714828?s=50&d=mm&r=g) <cite class="fn">Aria</cite> 说道： [2018 年 6 月 8 日 下午 2:10](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1787)

    大佬，IP 202.182.114.**, 都按你的流程设置过了，自己 cmd ping 谷歌可以连接，但是上 chrome 就不行，什么原因呢？

    [回复](#comment-1787)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 8 日 下午 2:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1788)

        关注下公众号 flyzy 小站，根据左下角常见问题排查下

        [回复](#comment-1788)
75.  ![](https://cdn.v2ex.com/gravatar/3fb79054c81ce283d77ad486ea67e366?s=50&d=mm&r=g) <cite class="fn">JamesL</cite> 说道： [2018 年 6 月 8 日 下午 12:11](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1780)

    连接服务器，安装都没问题。能够连接上谷歌，但是上谷歌学术出现 We're sorry...
    ... but your computer or network may be sending automated queries. To protect our users, we can't process your request right now. 请问怎么解决

    [回复](#comment-1780)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 8 日 下午 12:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1781)

        [shadowsocks 无法打开谷歌学术或出现验证码](https://www.flyzy2005.com/tech/shadowsocks-google-scholar/)

        [回复](#comment-1781)
        1.  ![](https://cdn.v2ex.com/gravatar/3fb79054c81ce283d77ad486ea67e366?s=50&d=mm&r=g) <cite class="fn">JamesL</cite> 说道： [2018 年 6 月 8 日 下午 12:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1782)

            对，无法打开谷歌学术，也没有出现验证码。就出现了:
            Google
            Sorry...
            We're sorry...

            ... but your computer or network may be sending automated queries. To protect our users, we can't process your request right now.
            See Google Help for more information.

            [回复](#comment-1782)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 8 日 下午 12:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1783)

                ... 那是一个链接 你点进去有解决方案

                [回复](#comment-1783)
                1.  ![](https://cdn.v2ex.com/gravatar/3fb79054c81ce283d77ad486ea67e366?s=50&d=mm&r=g) <cite class="fn">JamesL</cite> 说道： [2018 年 6 月 8 日 下午 12:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1784)

                    点击进去后显示:
                    “系统检测到您的计算机网络发出了异常流量”
                    如果我们发现您网络中的设备可能正自动向 Google 发送流量，则您可能会看到以下消息：“系统检测到您的计算机网络发出了异常流量”。

                    Google 会将哪些内容视为自动发送的流量
                    通过机器人、计算机程序、自动化服务或搜索采集器发送搜索请求
                    使用能向 Google 发送搜索请求的软件，以便查看网站或网页在 Google 中的排名
                    看到此消息时如何操作
                    该错误页中很可能会显示人机识别系统图片（即以扭曲形式显示的单词，下面有个框）。要继续使用 Google，请在框中输入扭曲显示的单词。我们会通过这种方式来识别用户是真人，而非机器。正确输入人机识别系统图片上的内容后，系统将不再显示此消息，您就可以继续使用 Google 了。

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 8 日 下午 12:46](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1785)

                    我说 [shadowsocks 无法打开谷歌学术或出现验证码](https://www.flyzy2005.com/tech/shadowsocks-google-scholar/)，这个是个链接...

                3.  ![](https://cdn.v2ex.com/gravatar/3fb79054c81ce283d77ad486ea67e366?s=50&d=mm&r=g) <cite class="fn">JamesL</cite> 说道： [2018 年 6 月 8 日 下午 12:57](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1786)

                    懂了，按照教程能上谷歌学术了。感谢站长！

76.  ![](https://cdn.v2ex.com/gravatar/6a13f024ffc9672627a18b37e94185fc?s=50&d=mm&r=g) <cite class="fn">银鹏</cite>说道： [2018 年 6 月 8 日 上午 9:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1774)

    PC 端正常，但安卓手机端上了几次就上不了，请问是什么问题？
    服务器：207\. 帮你打码
    端口：1024

    [回复](#comment-1774)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 8 日 上午 9:50](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1775)

        上了几次就上不了是不是你手机把它的某些权限禁止了，例如手机管家那些软件不就爱做这些事吗

        [回复](#comment-1775)
        1.  ![](https://cdn.v2ex.com/gravatar/6a13f024ffc9672627a18b37e94185fc?s=50&d=mm&r=g) <cite class="fn">银鹏</cite>说道： [2018 年 6 月 8 日 上午 9:51](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1776)

            谢谢，我删了再试试

            [回复](#comment-1776)
77.  ![](https://cdn.v2ex.com/gravatar/c2ef8655def5831a386bac33f8041b49?s=50&d=mm&r=g) <cite class="fn">BOBI</cite> 说道： [2018 年 6 月 7 日 下午 12:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1767)

    为什么我搭建完了还是不可以，IP:45.32.69.101,PORT:2913

    [回复](#comment-1767)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 7 日 下午 12:54](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1769)

        我检查了下你这个端口，已经开启了，应该 ss 没有问题。是不是你本机防火墙或者是浏览器之前设置过代理的问题？

        [回复](#comment-1769)
78.  ![](https://cdn.v2ex.com/gravatar/dfa35e40c1bed28c41c560bd1b05837c?s=50&d=mm&r=g) <cite class="fn">zzc</cite> 说道： [2018 年 6 月 4 日 下午 2:57](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1741)

    搬瓦工限制在线设备数量
    ，自己搭建是不是不限制啊

    [回复](#comment-1741)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 4 日 下午 3:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1742)

        没听过限制设备数量啊

        [回复](#comment-1742)
79.  ![](https://cdn.v2ex.com/gravatar/8e976eea884da46899f834a6b219c10a?s=50&d=mm&r=g) <cite class="fn">2333</cite> 说道： [2018 年 6 月 3 日 下午 6:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1732)

    感谢博主的教程 但是我输入后 出现了这个错误
    [C:\~]$ sysctl net.ipv4.tcp_available_congestion_control
    'sysctl' 不是内部或外部命令，也不是可运行的程序
    或批处理文件。
    [C:\~]$ ss-fly/ss-fly.sh -bbr
    'ss-fly' 不是内部或外部命令，也不是可运行的程序
    或批处理文件。

    [回复](#comment-1732)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 3 日 下午 9:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1734)

        你这个没有连上 VPS 啊 装完 BBR 会重启的

        [回复](#comment-1734)
80.  ![](https://cdn.v2ex.com/gravatar/78b7451be179b16e901f0e3d01ca2793?s=50&d=mm&r=g) <cite class="fn">123</cite> 说道： [2018 年 6 月 3 日 上午 12:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1730)

    想问一下博主 SS 支持什么加密。。。。
    想换个加密。。。

    [回复](#comment-1730)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 3 日 下午 12:27](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1731)

        aes-256-gcm
        aes-192-gcm
        aes-128-gcm
        aes-256-ctr
        aes-192-ctr
        aes-128-ctr
        aes-256-cfb
        aes-192-cfb
        aes-128-cfb
        camellia-128-cfb
        camellia-192-cfb
        camellia-256-cfb
        xchacha20-ietf-poly1305
        chacha20-ietf-poly1305
        chacha20-ietf
        chacha20
        salsa20
        rc4-md5

        [回复](#comment-1731)
81.  ![](https://cdn.v2ex.com/gravatar/1781263b8f96d3097b98862b52df74da?s=50&d=mm&r=g) <cite class="fn">rui3259</cite> 说道： [2018 年 6 月 2 日 下午 9:01](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1727)

    老师 我搭建以后还是不能上网呢 47.254.76.112 密码 cr201911 端口 3259

    [回复](#comment-1727)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 2 日 下午 9:22](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1729)

        不清楚你的问题 你的 IP 事可用的 但是端口我 ping 不通 是不是 VPS 服务商需要手动开启端口？

        [回复](#comment-1729)
        1.  ![](https://cdn.v2ex.com/gravatar/1781263b8f96d3097b98862b52df74da?s=50&d=mm&r=g) <cite class="fn">rui3259</cite> 说道： [2018 年 6 月 4 日 下午 2:34](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1740)

            感谢楼主，我已经可以了，现在阿里云还需要添加网络安全组规则

            [回复](#comment-1740)
82.  ![](https://cdn.v2ex.com/gravatar/627dc4e1c89cfee63591d78a0ebe2555?s=50&d=mm&r=g) <cite class="fn">Marco</cite> 说道： [2018 年 5 月 30 日 下午 4:50](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1691)

    我使用的是 google cloud；
    安装好之后，服务已经启动，客户端一直连都是 timeout。
    [2018-05-30 16:00:25] *.*.222.1:1024 timed out
    [2018-05-30 16:00:25] System.Net.Sockets.SocketException: 提供了一个无效的参数。

    [回复](#comment-1691)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 30 日 下午 9:24](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1694)

        我试着 ping 了你的 ip，可以通，又试着 tcping 了你的端口，不通。有些服务商的端口是需要你在网站管理页面手动打开的，你看下 google cloud 是不是需要这样？

        [回复](#comment-1694)
83.  ![](https://cdn.v2ex.com/gravatar/d25e885671b8822cef2643aca0f8a4e0?s=50&d=mm&r=g) <cite class="fn">YIP</cite> 说道： [2018 年 5 月 30 日 下午 12:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1681)

    想修改 shadowsocks.json 成多用户多端口不过之后显示 - bash: vim: command not found，要怎么搞呢？ ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png)

    [回复](#comment-1681)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 30 日 下午 1:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1686)

        那就安装 vim 先 按道理 vim 都是内置的啊

        [回复](#comment-1686)
84.  ![](https://cdn.v2ex.com/gravatar/de11f760f5dd4788e27d38c115e06c75?s=50&d=mm&r=g) <cite class="fn">Jeremy Johnson</cite> 说道： [2018 年 5 月 29 日 下午 3:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1663)

    博主您好！如何可以添加多个账户呢？谢谢您的脚本啦！

    [回复](#comment-1663)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 29 日 下午 9:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1670)

        参考[详解 shadowsocks 配置多用户多密码](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-config-multiple-users/)

        [回复](#comment-1670)
        1.  ![](https://cdn.v2ex.com/gravatar/de11f760f5dd4788e27d38c115e06c75?s=50&d=mm&r=g) <cite class="fn">Jeremy Johnson</cite> 说道： [2018 年 5 月 29 日 下午 9:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1673)

            非常感谢非常感谢，随时能回复的大神博主业界良心啊

            [回复](#comment-1673)
85.  ![](https://cdn.v2ex.com/gravatar/19bc4d18aa97e41df3b9b8192545ff45?s=50&d=mm&r=g) <cite class="fn">jeff</cite> 说道： [2018 年 5 月 29 日 上午 10:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1661)

    ssr 的电脑 win7 换了个版本没问题了，ios 的终端好像不行啊，商店里版本很少。那个网际飞梭试了很多次不行，有其他版本吗？

    [回复](#comment-1661)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 29 日 下午 9:24](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1669)

        iOS 最靠谱的现在是电脑下载 PP 助手，手机连上去后会自动把 PP 助手同步到你的手机上（不需要越狱），之后在 PP 助手里下载 shadowrokcet 就行了。

        [回复](#comment-1669)
86.  ![](https://cdn.v2ex.com/gravatar/b36987afc019fb9f485a99639fc3c086?s=50&d=mm&r=g) <cite class="fn">汉江</cite>说道： [2018 年 5 月 28 日 下午 10:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1658)

    首先感谢大佬，通过你的教程搭建成功了 ssr。然后，然后我手贱，想多练习一下，想卸载了，再重装，然后就卡在这里了， ./shadowsocksR.sh uninstall 这个命令后返回 -bash: ./shadowsocksR.sh: No such file or directory。请问我应该怎么解决？

    [回复](#comment-1658)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 29 日 下午 9:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1672)

        要在你一开始执行脚本的那个目录下面执行这个命令

        [回复](#comment-1672)
        1.  ![](https://cdn.v2ex.com/gravatar/b36987afc019fb9f485a99639fc3c086?s=50&d=mm&r=g) <cite class="fn">汉江</cite>说道： [2018 年 5 月 30 日 下午 12:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1682)

            非常感谢，无意中弄成功了，但依然不明白原因。现在有大佬的回复，终于明白了，再次感谢。

            [回复](#comment-1682)
        2.  ![](https://cdn.v2ex.com/gravatar/fb21df1d30421e28f2fe98b180877401?s=50&d=mm&r=g) <cite class="fn">yongji</cite> 说道： [2018 年 6 月 3 日 下午 7:49](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1733)

            你好，老大，我的 IP172.93.38.37，不能上网了，我查了没有被封，那是什么原因呢？

            [回复](#comment-1733)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 3 日 下午 9:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1735)

                [Windows 用 tcping 命令 ping 指定端口](https://www.flyzy2005.com/tech/windows-tcping-ip-port/)，看看你的端口是不是被封了

                [回复](#comment-1735)
                1.  ![](https://cdn.v2ex.com/gravatar/fb21df1d30421e28f2fe98b180877401?s=50&d=mm&r=g) <cite class="fn">yongji</cite> 说道： [2018 年 6 月 4 日 上午 4:54](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1736)

                    如果被封，怎么处理？？

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 6 月 4 日 上午 11:54](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1738)

                    Vultr 可以直接 Deploy 一个新的，或者用 [snapshot](https://www.flyzy2005.com/vps/snapshot-vultr/)。
                    搬瓦工可以自助更换 IP：[搬瓦工免费更换被封 IP](https://www.flyzy2005.com/vps/bandwagon-change-ip-free/)

                3.  ![](https://cdn.v2ex.com/gravatar/fb21df1d30421e28f2fe98b180877401?s=50&d=mm&r=g) <cite class="fn">yongji</cite> 说道： [2018 年 6 月 4 日 下午 12:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1739)

                    今天能用了，我重新设置了密码就可以了。号没有封，反正不知道所以然。

87.  ![](https://cdn.v2ex.com/gravatar/72cd9e2d85a690022414ddea0fb6c852?s=50&d=mm&r=g) <cite class="fn">Developer</cite> 说道： [2018 年 5 月 28 日 下午 1:01](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1657)

    [2018-05-28 11:35:50] System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
    在 System.Net.Sockets.Socket.EndReceive(IAsyncResult asyncResult)

    但是我用 xshell 进去，也能 ping 通 google.com，是怎么回事呢

    [回复](#comment-1657)
88.  ![](https://cdn.v2ex.com/gravatar/4f6eb7b9424471debafeff525aaa74e6?s=50&d=mm&r=g) <cite class="fn">131</cite> 说道： [2018 年 5 月 26 日 下午 10:16](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1651)

    什么时候支持 centos7 啊

    [回复](#comment-1651)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 26 日 下午 10:18](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1652)

        支持 centos7 啊

        [回复](#comment-1652)
89.  ![](https://cdn.v2ex.com/gravatar/72cd9e2d85a690022414ddea0fb6c852?s=50&d=mm&r=g) <cite class="fn">Developer</cite> 说道： [2018 年 5 月 25 日 上午 12:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1638)

    [2018-05-25 00:19:25] System.Net.Sockets.SocketException: 由于目标计算机积极拒绝，无法连接。 149.xxx.XX.XX:1024
    在 System.Net.Sockets.Socket.EndConnect(IAsyncResult asyncResult)
    在 Shadowsocks.Controller.Handler.ConnectCallback(IAsyncResult ar)

    安装教材弄了，还是连不上，报这个错，是什么原因呢

    [回复](#comment-1638)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 26 日 上午 11:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1647)

        这个你要看服务器日志文件显示什么。在公众号左下角常见问题自己排查下

        [回复](#comment-1647)
90.  ![](https://cdn.v2ex.com/gravatar/72cd9e2d85a690022414ddea0fb6c852?s=50&d=mm&r=g) <cite class="fn">Developer</cite> 说道： [2018 年 5 月 25 日 上午 12:16](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1637)

    [成功] 安装成功敬请冲浪! 后面的中文都乱码了，是怎么回事呢

    [回复](#comment-1637)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 26 日 上午 11:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1646)

        乱码是字符编码不一致，没有问题

        [回复](#comment-1646)
91.  ![](https://cdn.v2ex.com/gravatar/06dd3eccbad0c5f1f470459a6d37d498?s=50&d=mm&r=g) <cite class="fn">clark</cite> 说道： [2018 年 5 月 23 日 上午 10:34](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1623)

    手机端，配置都核实过了，服务器也连上了，但是就是访问不了 google，楼主觉得是啥原因呢

    [回复](#comment-1623)
    1.  ![](https://cdn.v2ex.com/gravatar/06dd3eccbad0c5f1f470459a6d37d498?s=50&d=mm&r=g) <cite class="fn">clark</cite> 说道： [2018 年 5 月 23 日 上午 10:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1624)

        android 端 ss 的 log 在哪啊，谁知道呢

        [回复](#comment-1624)
    2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 23 日 下午 3:32](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1629)

        你看看电脑端行不行

        [回复](#comment-1629)
        1.  ![](https://cdn.v2ex.com/gravatar/06dd3eccbad0c5f1f470459a6d37d498?s=50&d=mm&r=g) <cite class="fn">clark</cite> 说道： [2018 年 5 月 23 日 下午 9:15](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1630)

            手机端，pc 端都可以了。

            有个问题，请教下：
            ①ss 已连接成功，且代理模式设置为 [全局模式]
            ②ping [http://www.google.com](https://www.flyzy2005.com/go/go.php?url=http://www.google.com) 不通，为啥啊

            我该怎么做才可以 ping 通 google 呢
            如果了解的话，给个方向

            [回复](#comment-1630)
            1.  ![](https://cdn.v2ex.com/gravatar/06dd3eccbad0c5f1f470459a6d37d498?s=50&d=mm&r=g) <cite class="fn">clark</cite> 说道： [2018 年 5 月 23 日 下午 9:57](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1631)

                [https://www.zhihu.com/question/28028427](https://www.flyzy2005.com/go/go.php?url=https://www.zhihu.com/question/28028427)

                [回复](#comment-1631)
92.  ![](https://cdn.v2ex.com/gravatar/82fb6a52bb10e2a75e719cf237a4d6f1?s=50&d=mm&r=g) <cite class="fn">JK</cite> 说道： [2018 年 5 月 23 日 上午 12:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1620)

    感谢大佬，已经配置成功 SSR 了。
    另外想请问一下关于：协议、协议参数、混淆、混淆参数，这四个该如何选择呢？
    之前我在亚马逊上搭建过 SS，不是 SSR。这四个选项我都是默认选择的。具体也忘了选择的什么了。
    然后用了三四个月后，发现 SS 无法连接。我就 ping 服务器 ip，发现延迟高和丢包。一会儿 ping 得通，一会儿 ping 不通。 XSHELL 也没法连接。 （选择的东京 IP）

    亚马逊官方网也打不开了，之前没挂 SS 的时候，面前能够打开。
    后来网上搜索，貌似我这个结果是 IP 被封，具体我也不知道是否真假，也不知道该如何判断 IP 是否被封。
    还请大佬帮忙解释一下我该如何选择协议、协议参数、混淆、混淆参数，以及如何判断自己 IP 被封。

    [回复](#comment-1620)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 23 日 上午 9:06](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1621)

        你那个亚马逊的应该不是墙了，墙了就根本 ping 不通了而不是延迟高和丢包，只是丢包严重。
        如何判断 IP 是否被封直接 ping 就行，全部超时肯定就是挂了。
        那些默认就可以，我感觉区别不大。

        [回复](#comment-1621)
        1.  ![](https://cdn.v2ex.com/gravatar/82fb6a52bb10e2a75e719cf237a4d6f1?s=50&d=mm&r=g) <cite class="fn">JK</cite> 说道： [2018 年 5 月 23 日 下午 12:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1625)

            这个就纳闷了，既然 ping 得通。只是 ping 几下断一下。然后重复这样，但是连接不上。xshell 也不行。这就有点蛋痛了。不知道咋回事儿。

            [回复](#comment-1625)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 23 日 下午 3:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1627)

                也有可能是被墙了，因为昨天出现了 TCP 阻断，现象就是 ping 可以（ICMP），但是 SS/SSR 不行，端口不通，自然 ssh 也不行。你可以试下能不能 ping 通你的 ssh 端口

                [回复](#comment-1627)
93.  ![](https://cdn.v2ex.com/gravatar/1f48b4c9a94838bc9d9e8b871cb3f186?s=50&d=mm&r=g) <cite class="fn">zbx</cite> 说道： [2018 年 5 月 22 日 下午 3:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1617)

    手机上用自己搭的线路 有时候 instagram 刷不出 不知道什么原因呢

    [回复](#comment-1617)
94.  ![](https://cdn.v2ex.com/gravatar/ccb74ca82ea29a690e90c1f5873d4ee0?s=50&d=mm&r=g) <cite class="fn">Sin9</cite> 说道： [2018 年 5 月 21 日 上午 2:01](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1607)

    1：我用的是月付 2.5 刀，迈阿密服务器，网络延迟在 300-500 左右（白天 500ms, 晚上 300ms），想问问大神，这个延迟算正常么? 一般你们是多少呢,？

    2：IOS 端的 Termius 找不到填 IP 的地方，自己试了两款能用的同大家分享：SuperWingy(6 元 * 界面干净清爽)、SsrconnectPro(免费且干净) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/biggrin.png)

    [回复](#comment-1607)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 21 日 上午 11:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1609)

        迈尔密差不多就是这样的延迟吧 毕竟在美东

        [回复](#comment-1609)
95.  ![](https://cdn.v2ex.com/gravatar/c2648bcf1c3cbeabdf535a8b165fabd7?s=50&d=mm&r=g) <cite class="fn">皮蛋粥加糖</cite>说道： [2018 年 5 月 20 日 下午 5:47](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1603)

    博主，我是个小白，昨天按照你的一键搭建教程做了一遍，我遇到了你公众号里面常见问题的第六点，其他的点应该都没有问题了，可是第六点里面 wrong password 指的是哪里呢？ 需要怎样做才能变成 connecting 呢？
    下面是我检查服务器日志文件的结果：
    2018-05-19 16:11:25 ERROR [Errno 104] Connection reset by peer
    2018-05-20 08:14:23 WARNING unsupported addrtype 224, maybe wrong password or encryption method
    2018-05-20 08:14:23 ERROR can not parse header
    2018-05-20 08:14:23 ERROR can not parse header when handling connection from ----------------
    求大佬解答 Orz

    [回复](#comment-1603)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 20 日 下午 8:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1606)

        确定你本地客户端的密码是输入的对的吗？换用手机试试看行不行

        [回复](#comment-1606)
        1.  ![](https://cdn.v2ex.com/gravatar/c2648bcf1c3cbeabdf535a8b165fabd7?s=50&d=mm&r=g) <cite class="fn">皮蛋粥加糖</cite>说道： [2018 年 5 月 21 日 下午 5:18](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1613)

            博主，我用手机可以登上去了，但是电脑就不行，这是为什么呢？
            我看了下服务器的日志，一开启就是这样
            下面是服务器的日志：
            [2018-05-21 17:11:01] System.Reflection.TargetInvocationException: 操作过程中出现异常，结果无效。有关异常的详细信息，请查看 InnerException。 ---> System.Net.WebException: 基础连接已经关闭: 发送时发生错误。 ---> System.IO.IOException: 由于远程方已关闭传输流，身份验证失败。
            在 System.Net.TlsStream.EndWrite(IAsyncResult asyncResult)
            在 System.Net.PooledStream.EndWrite(IAsyncResult asyncResult)
            在 System.Net.ConnectStream.WriteHeadersCallback(IAsyncResult ar)
            --- 内部异常堆栈跟踪的结尾 ---

            [回复](#comment-1613)
            1.  ![](https://cdn.v2ex.com/gravatar/d28690c393aee226be33878409bfe36a?s=50&d=mm&r=g) <cite class="fn">lu</cite> 说道： [2018 年 5 月 26 日 上午 11:49](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1643)

                我也是这个问题，一直连不上，但可以 PING 通

                [回复](#comment-1643)
96.  ![](https://cdn.v2ex.com/gravatar/f795f62bc898351c9036616325b7b43f?s=50&d=mm&r=g) <cite class="fn">失去方向</cite>说道： [2018 年 5 月 20 日 下午 4:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1601)

    感谢教程，已经连接成功，不过为什么我的速度好慢，看 YTB480P 就断断续续, 720P 直接读不出来，是我设置上出了什么问题么？

    [回复](#comment-1601)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 20 日 下午 5:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1602)

        开启 bbr 了吗。你的网络是什么，买的哪里的服务器？

        [回复](#comment-1602)
        1.  ![](https://cdn.v2ex.com/gravatar/f795f62bc898351c9036616325b7b43f?s=50&d=mm&r=g) <cite class="fn">失去方向</cite>说道： [2018 年 5 月 20 日 下午 5:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1604)

            按视频教程开了 BBR, 我的是电信，买了迈阿密

            [回复](#comment-1604)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 20 日 下午 8:11](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1605)

                迈尔密 2.5 一个月有时候确实线路有点挤，晚上流量高峰可能会有点卡顿，不过我也用的迈尔密，也是电信，大部分还是可以的

                [回复](#comment-1605)
97.  ![](https://cdn.v2ex.com/gravatar/1a4cc9f4328a70b0dc8e7afb792cbe6f?s=50&d=mm&r=g) <cite class="fn">啦啦</cite>说道： [2018 年 5 月 19 日 下午 1:01](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1595)

    ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mad.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mad.png) 为什么我的电脑开启影梭开启之后 火狐能能上谷歌和 youtube 但是谷歌浏览器总是加载错误 显示：无法访问此 网站 说什么连接已重置 博主有什么好的办法 或者说 这是什么情况

    [回复](#comment-1595)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 19 日 下午 1:13](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1597)

        Chrome 之间下过什么插件吗？看看浏览器代理怎么设置的

        [回复](#comment-1597)
        1.  ![](https://cdn.v2ex.com/gravatar/1a4cc9f4328a70b0dc8e7afb792cbe6f?s=50&d=mm&r=g) <cite class="fn">啦啦</cite>说道： [2018 年 5 月 19 日 下午 1:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1598)

            浏览器下过一个 abp 的去广告的插件 代理没有设置过好像没有

            [回复](#comment-1598)
98.  ![](https://cdn.v2ex.com/gravatar/297453229a89093638658a8a8b93063f?s=50&d=mm&r=g) <cite class="fn">童晓亮</cite>说道： [2018 年 5 月 18 日 上午 1:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1578)

    博主 除了 VULTR 还有别的速度快点的 VPS 推荐吗？ VULTR 我现在用的日本服务器，60~70 的 ping.. 看 YOUTUBE 720HD 还是非常卡。

    [回复](#comment-1578)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 18 日 上午 8:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1581)

        你是电信的网吗？电信的不推荐用日本的，尝试下洛杉矶或者是欧洲的服务器。
        或者用下次[搬瓦工 CN2 GT](https://www.flyzy2005.com/vps/bandwagon-cn2/) 以及[搬瓦工 CN2 GIA](https://www.flyzy2005.com/vps/bandwagonhost-cn2-gia/)，对电信 & 联通效果很好。

        [回复](#comment-1581)
        1.  ![](https://cdn.v2ex.com/gravatar/297453229a89093638658a8a8b93063f?s=50&d=mm&r=g) <cite class="fn">童晓亮</cite>说道： [2018 年 5 月 18 日 下午 6:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1586)

            我的是联通的专网.. 洛杉矶的服务器也试过了，180ping 左右.. 用了博主的 ping 批处理.. 最快就是日本的了. 其他都是 150~400 不等的... 搬瓦工没有试用啊 也不知道网速会不会比 VULTYR 好.. 苦恼

            [回复](#comment-1586)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 18 日 下午 6:54](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1588)

                BBR 开了吗？我看 1080 没啥问题啊.. 也有可能是你那时候出国的量太大，换个时间点试试

                [回复](#comment-1588)
                1.  ![](https://cdn.v2ex.com/gravatar/297453229a89093638658a8a8b93063f?s=50&d=mm&r=g) <cite class="fn">童晓亮</cite>说道： [2018 年 5 月 18 日 下午 10:08](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1592)

                    开了 返回值是 net.ipv4.tcp_available_congestion_control = bbr cubic reno
                    我是中国凌晨 4 点多看的 应该不会量太大吧。
                    那博主你 ping 一般是多少啊？

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 18 日 下午 10:19](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1593)

                    延时跟看油管卡不卡关系不大，有的网络不适合用日本的节点，会绕路，你试试洛杉矶的看看会不会好些

99.  ![](https://cdn.v2ex.com/gravatar/d7cf875d6fc0cd94cc99b7471dfed49d?s=50&d=mm&r=g) <cite class="fn">为梦停留</cite>说道： [2018 年 5 月 16 日 下午 2:00](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1562)

    提示：[成功] 安装成功尽情冲浪
    但还是无法访问怎么办

    [回复](#comment-1562)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 16 日 下午 5:41](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1568)

        本机配置对吗？ip 是你 vps 的 ip 密码是你 ss 的密码

        [回复](#comment-1568)
    2.  ![](https://cdn.v2ex.com/gravatar/7eea114e90c713962be53413b0867714?s=50&d=mm&r=g) <cite class="fn">Frank</cite> 说道： [2018 年 5 月 16 日 下午 9:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1569)

        今天遇到同样情况，结果重启电脑就可以了，也不知道什么原因

        [回复](#comment-1569)
100.  ![](https://cdn.v2ex.com/gravatar/1a4cc9f4328a70b0dc8e7afb792cbe6f?s=50&d=mm&r=g) <cite class="fn">啦啦</cite>说道： [2018 年 5 月 16 日 上午 1:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1558)

    卧槽 谷歌和 youtube 还是连不上 哪个服务器也设置成功了 怎么办 有测试方法吗

    [回复](#comment-1558)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 16 日 上午 7:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1560)

        详细描述下你的问题 或者关注公众号 **flyzy 小站**点击左下角常见问题自己排查下

        [回复](#comment-1560)
101.  ![](https://cdn.v2ex.com/gravatar/bc463dc210b743a7f5f407e065beefe4?s=50&d=mm&r=g) <cite class="fn">langya</cite> 说道： [2018 年 5 月 15 日 下午 1:18](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1544)

    您好！我在选择购买搬瓦工时发现已缺货，往下看有一个 Basic VPS - Self-managed - SPECIAL 10G KVM PROMO V3 - LOS ANGELES - CHINA DIRECT ROUTE 配置和您推荐的意见，但不是 CN2 和中国联通，不知道是否能使用，这个价格 19.99，比较合适 ：） 谢谢！

    [回复](#comment-1544)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 15 日 下午 1:22](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1546)

        [搬瓦工购买与优惠码使用](https://www.flyzy2005.com/vps/bandwagon-coupon-buy/)，用这篇文章里的 19.99 的那一款，然后参考[搬瓦工后台自助切换 CN2 线路](https://www.flyzy2005.com/vps/bandwagon-cn2-dc3-dc8/)自己切换成 cn2 线路（流量会只有 1/3），你的那个不要用。

        [回复](#comment-1546)
        1.  ![](https://cdn.v2ex.com/gravatar/bc463dc210b743a7f5f407e065beefe4?s=50&d=mm&r=g) <cite class="fn">langya</cite> 说道： [2018 年 5 月 15 日 下午 1:28](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1547)

            收到，谢谢老大！这个 vps 流量如果不够用，可以付费改套餐升级么？

            [回复](#comment-1547)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 15 日 下午 1:34](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1548)

                可以的，后台自助升级

                [回复](#comment-1548)
102.  ![](https://cdn.v2ex.com/gravatar/3a20dd927b2599a4a6d3f7a9d8d6ab93?s=50&d=mm&r=g) <cite class="fn">peanutzz</cite> 说道： [2018 年 5 月 14 日 下午 5:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1525)

    感谢站主，我搭成了，便宜流量也多效果还很好！ ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png)
    想请问一下如果想把 SS 借给同学用，是可以同时用同一个端口，还是需要在这个 VPS 上另建一个端口给他呢。

    [回复](#comment-1525)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 14 日 下午 7:16](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1528)

        可以直接把你的端口给他用的

        [回复](#comment-1528)
103.  ![](https://cdn.v2ex.com/gravatar/1f72384bc4d6770a446b81411403b86f?s=50&d=mm&r=g) <cite class="fn">eying</cite> 说道： [2018 年 5 月 14 日 上午 11:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1518)

    写的很好。搬瓦工经过 BBR 优化之后，可以轻松上 1080P 的视频

    [回复](#comment-1518)
104.  ![](https://cdn.v2ex.com/gravatar/5f8fc77e48211f51a4be8144368494ed?s=50&d=mm&r=g) <cite class="fn">雍正</cite>说道： [2018 年 5 月 12 日 下午 9:22](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1506)

    尝试成功了，谢谢大神，特地来表示感谢，另外，大神能给个联系方式吗？发我邮箱也好 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png)

    [回复](#comment-1506)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 13 日 上午 12:27](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1509)

        公众号给我留言就好哈 或者在 [Telegram](https://www.flyzy2005.com/go/go.php?url=https://t.me/flyzyxiaozhan) 联系我

        [回复](#comment-1509)
105.  ![](https://cdn.v2ex.com/gravatar/37c06c8e4914bca7f4f35603655af51c?s=50&d=mm&r=g) <cite class="fn">小胖</cite>说道： [2018 年 5 月 12 日 上午 11:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1500)

    请问博主，搭建好了 SSR，什么命令可以查看当前的用户连接数，或者当前连接大 ip？

    [回复](#comment-1500)
    1.  ![](https://cdn.v2ex.com/gravatar/37c06c8e4914bca7f4f35603655af51c?s=50&d=mm&r=g) <cite class="fn">小胖</cite>说道： [2018 年 5 月 12 日 上午 11:49](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1501)

        我很怀疑有人偷用我的流量，上次买的 miami 的线路，搭建好前几天访问速度都还好，过 2 天就突然不行了非常慢，昨天下午搭建了一个日本的线路，速度飞起来了都，今天上午开谷歌首页都费劲，怎么回事呢？
        安全做了端口，禁止了远程

        [回复](#comment-1501)
    2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 12 日 下午 1:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1502)

        这个看不了，你可以看下你的日志文件里有没有什么异常 ip，一般来说不会被偷用的，除非你用的软件被别人留了后门

        [回复](#comment-1502)
        1.  ![](https://cdn.v2ex.com/gravatar/37c06c8e4914bca7f4f35603655af51c?s=50&d=mm&r=g) <cite class="fn">小胖</cite>说道： [2018 年 5 月 12 日 下午 2:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1503)

            谢谢博主，一会去看看那个日志文件
            windows 用的这个
            [https://github.com/shadowsocks/shadowsocks-windows/releases](https://www.flyzy2005.com/go/go.php?url=https://github.com/shadowsocks/shadowsocks-windows/releases)
            ios
            用 PP 助手下载的 Wingy

            [回复](#comment-1503)
106.  ![](https://cdn.v2ex.com/gravatar/2500e7292b38ce132a925857c4cecaed?s=50&d=mm&r=g) <cite class="fn">小燕</cite>说道： [2018 年 5 月 12 日 上午 8:57](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1497)

    楼主你好！看到这个帖子我仿佛找到曙光！我之前购买了 20G KVM -PROMO (location: canada)。新手上路就买了一个月度续费的。一直挺好，youtube 什么的都可以上。但有一次我出国没网络，也忘了续费就被断了。后来觉得有需要就再买一个半年同样的产品。没想到 KiwiVM 界面变了，以前 “file manager“ 和”“shadowsocks server” 都找不到了。所以密码什么的都没法 generate。同时服务器端口，加密，和代理端口有没有变也不知道。反正就是一团糟。不知高手能否给我点建议，万分感谢！

    [回复](#comment-1497)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 12 日 上午 10:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1498)

        可以自己 ssh 远程一下你的服务器，然后用我的一键脚本（推荐），如何查看 ip，ssh 端口和密码参考[搬瓦工购买与优惠码使用](https://www.flyzy2005.com/vps/bandwagon-coupon-buy/)。也可以参考[搬瓦工后台开启 ss server](https://www.flyzy2005.com/go/go.php?url=https://vultr.vultrss.win/%E6%90%AC%E7%93%A6%E5%B7%A5%E4%B8%80%E9%94%AE%E6%90%AD%E5%BB%BAss/) 手动增加一下 shadowsocks server。

        [回复](#comment-1498)
        1.  ![](https://cdn.v2ex.com/gravatar/2500e7292b38ce132a925857c4cecaed?s=50&d=mm&r=g) <cite class="fn">小燕</cite>说道： [2018 年 5 月 12 日 上午 10:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1499)

            太神奇了，我成功了，谢谢你哦

            [回复](#comment-1499)
107.  ![](https://cdn.v2ex.com/gravatar/cb5d083ece3f7652aab20ee0895d1d29?s=50&d=mm&r=g) <cite class="fn">搭建 ss 视频教程</cite>说道： [2018 年 5 月 11 日 上午 1:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1484)

    谢谢视频教程 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/rolleyes.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/rolleyes.png) 很详细，一键脚本很方便！

    [回复](#comment-1484)
108.  ![](https://cdn.v2ex.com/gravatar/176e0c2e3679ecdac5972b9037c1b95f?s=50&d=mm&r=g) <cite class="fn">一诺千金</cite>说道： [2018 年 5 月 10 日 下午 5:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1479)

    博主，我是你的粉丝， ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png) 请教个问题，我想使用一键搭建 ss，使用 ss-bash 实现多用户管理 请问这个命令 ss-fly/ss-fly.sh -i flyzy2005.com 1024 设置的端口 ，在 ss-bash 里能够进行流量控制吗？ 或者删掉这个端口，只使用 ss-bash 里开通的端口可以吗？

    [回复](#comment-1479)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 10 日 下午 10:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1482)

        用 ss-bash 方式管理的话这个默认的 1024 就没有用了，先把这个停止了，然后直接用 ss-bash 管理

        [回复](#comment-1482)
109.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 上午 7:48](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1459)

    [root@host ~]# /etc/init.d/shadowsocks start
    IPv6 support
    ERROR: found an error in config.json: 'utf8' codec can't decode byte 0xe6 in position 150: invalid continuation byte
    Starting ShadowsocksR failed
    [root@host ~]#
    大佬，开启不了…………

    [回复](#comment-1459)
    1.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 上午 8:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1460)

        我卸载重装后，可以运行 ssr 了，但是 iphone 用 wingy，shadowrocket 连上 vpn 却不能刷 ins，显示无网络，大佬求教

        [回复](#comment-1460)
    2.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 上午 8:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1461)

        shadowrocket 测试延迟 197ms，但就是 twitter 都不能刷，显示发生了 ssl 错误，无法建立与该服务器的安全链接

        [回复](#comment-1461)
    3.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 10 日 上午 9:05](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1462)

        你这个错误似乎是在说你配置文件里的内容编码格式有错误，是直接用脚本生成得到的配置文件还是后来你自己改动过？
        脚本安装好 ssr 后，默认是开启的，不需要你再次手动开启。
        这个连不上你看下服务器日志信息是什么，日志文件在`/var/log/shadowsocks.log`

        [回复](#comment-1462)
        1.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 上午 9:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1463)

            现在我重装了 2 遍 ssr，已经可以正常开启 ssr 了，但是我 iphone 用 shadowrocket 和 winky 连我的 ip 可以，并且 shadowrocket 可以测试延迟 190+，但是 twitter 就是打开不了，查了 2 小时百度，还是找不到解决办法，要哭了

            [root@host ~]# /var/log/shadowsocks.log
            -bash: /var/log/shadowsocks.log: No such file or directory
            [root@host ~]# /etc/init.d/shadowsocks restart
            IPv6 support
            2018-05-09 21:27:47 INFO shell.py:74 ShadowsocksR 3.4.0 2017-07-27
            stopped
            Stopping ShadowsocksR success
            IPv6 support
            2018-05-09 21:27:47 INFO util.py:92 loading libcrypto from libcrypto.so.10
            2018-05-09 21:27:47 INFO shell.py:74 ShadowsocksR 3.4.0 2017-07-27
            started
            Starting ShadowsocksR success
            [root@host ~]# /var/log/shadowsocks.log
            -bash: /var/log/shadowsocks.log: No such file or directory
            [root@host ~]#
            找不到你说的那个目录

            [回复](#comment-1463)
        2.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 上午 9:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1464)

            我就按照你的教程你一步一步来的，啥都没改，重装了 2 遍，端口也不是 443，是不是我服务器系统的问题？Operating system: Centos 7 x86_64 bbr

            [回复](#comment-1464)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 10 日 上午 9:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1465)

                `cat /var/log/shadowsocks.log`。是不是你选的 VPS 服务商需要手动开放那个端口？

                [回复](#comment-1465)
                1.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 上午 9:51](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1466)

                    [root@host ~]# cat /var/log/shadowsocks.log
                    cat: /var/log/shadowsocks.log: No such file or directory
                    [root@host ~]#
                    这个文件还是找不到
                    就是搬瓦工啊，应该不要手动开放吧，我也用 443 过了，还是不行

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 10 日 上午 10:08](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1467)

                    你把你搬瓦工的 ssh 密码和端口在公众号留言给我 我帮你看一下吧

        3.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 下午 6:01](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1480)

            老哥，发给你了，看公众号

            [回复](#comment-1480)
110.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 上午 12:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1454)

    [root@host ~]# ss-fly/ss-fly.sh -ssr
    ss-fly/ss-fly.sh: line 146: wget: command not found
    chmod: cannot access ‘shadowsocksR.sh’: No such file or directory
    ss-fly/ss-fly.sh: line 148: ./shadowsocksR.sh: No such file or directory

    [回复](#comment-1454)
    1.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 上午 12:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1455)

        卡在这边了

        [回复](#comment-1455)
    2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 10 日 上午 12:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1457)

        先执行下 yum -y install wget

        [回复](#comment-1457)
        1.  ![](https://cdn.v2ex.com/gravatar/71bfe09b6511f4eecb8e2b74c5558d9a?s=50&d=mm&r=g) <cite class="fn">道生一生道</cite>说道： [2018 年 5 月 10 日 上午 1:09](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1458)

            非常感谢！大晚上的几乎秒回，感谢博主！！！

            [回复](#comment-1458)
111.  ![](https://cdn.v2ex.com/gravatar/60b8e5a447e8518b15ae2502de092265?s=50&d=mm&r=g) <cite class="fn">anyagile</cite> 说道： [2018 年 5 月 9 日 下午 2:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1451)

    2018-05-09 02:27:59 (1.39 MB/s) - ‘shadowsocks-master.zip’ saved [114904/114904]

    checking build system type... x86_64-pc-linux-gnu
    checking host system type... x86_64-pc-linux-gnu
    checking for a BSD-compatible install... /usr/bin/install -c
    checking whether build environment is sane... yes
    checking for a thread-safe mkdir -p... /bin/mkdir -p
    checking for gawk... gawk
    checking whether make sets $(MAKE)... no
    checking whether make supports nested variables... no
    checking whether UID '0' is supported by ustar format... yes
    checking whether GID '0' is supported by ustar format... yes
    checking how to create a ustar tar archive... gnutar
    checking whether make supports nested variables... (cached) no
    checking whether to enable maintainer-specific portions of Makefiles... no
    checking for style of include used by make... none
    checking for gcc... no
    checking for cc... no
    checking for cl.exe... no
    configure: error: in `/root/libsodium-1.0.16':
    configure: error: no acceptable C compiler found in $PATH
    See` config.log' for more details
    [错误] libsodium 安装失败!
    root@ubuntu:~#

    [回复](#comment-1451)
    1.  ![](https://cdn.v2ex.com/gravatar/60b8e5a447e8518b15ae2502de092265?s=50&d=mm&r=g) <cite class="fn">anyagile</cite> 说道： [2018 年 5 月 9 日 下午 2:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1452)

        请问这个安装失败该如何解决呢？ ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

        [回复](#comment-1452)
        1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 9 日 下午 2:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1453)

            是搬瓦工换了 OS 后没有重启吗？
            先执行`dpkg --configure -a`后再执行一键脚本安装 ss

            [回复](#comment-1453)
            1.  ![](https://cdn.v2ex.com/gravatar/00a533cdf4a2e9e7335c77f8f25335d1?s=50&d=mm&r=g) <cite class="fn">waashyy</cite> 说道： [2018 年 5 月 23 日 下午 10:06](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1632)

                同样是这个问题，运行了博主给的这段代码后还是出现 libsodium 安装失败的提示

                [回复](#comment-1632)
                1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 23 日 下午 10:19](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1633)

                    先重启 VPS：`reboot`，之后执行`dpkg --configure -a`，之后再执行一键脚本。如果还是不行，先在 Xsehll 里的文件 -> 日志 -> 启动，打开日志记录，然后把运行脚本的日志发给我看一下，直接发我邮箱 me#flyzy2005.com，# 换成 @

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 23 日 下午 10:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1634)

                    问题已经解决，先执行`apt-get -f install`之后就可以正常安装了。

112.  ![](https://cdn.v2ex.com/gravatar/d01e73433d3ba830de4e95eb9c3848b9?s=50&d=mm&r=g) <cite class="fn">LorryD</cite> 说道： [2018 年 5 月 8 日 下午 3:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1443)

    谢谢楼主！

    [回复](#comment-1443)
113.  ![](https://cdn.v2ex.com/gravatar/97f4d0939afd7cf078fb59d3609c71e0?s=50&d=mm&r=g) <cite class="fn">85153056</cite> 说道： [2018 年 5 月 7 日 下午 3:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1436)

    我需要一个自己用的 SS 什么价格 ，用你的老是被别人拿去共享用。网速能给卡死

    [回复](#comment-1436)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 7 日 下午 3:37](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1437)

        我上面写了，就是服务器价格。
        Vultr 最低 2.5 刀一个月，搬瓦工用我上面的优惠码最低 18.79 一年。电信的可以考虑优化的 cn2 线路，最低 28.19 一年。详情可以看本文服务器购买部分。

        [回复](#comment-1437)
        1.  ![](https://cdn.v2ex.com/gravatar/97f4d0939afd7cf078fb59d3609c71e0?s=50&d=mm&r=g) <cite class="fn">85153056</cite> 说道： [2018 年 5 月 7 日 下午 3:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1438)

            不是这个意思。我已经架设好了，也正在使用，但是我查了下 IP 有四五个 IP 都连我的代理，这个什么原因，是因为端口给扫到了？

            [回复](#comment-1438)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 8 日 上午 10:18](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1440)

                你 ip 不一定是固定的啊，可能都是你的连接，但是 ip 不一样

                [回复](#comment-1440)
                1.  ![](https://cdn.v2ex.com/gravatar/97f4d0939afd7cf078fb59d3609c71e0?s=50&d=mm&r=g) <cite class="fn">85153056</cite> 说道： [2018 年 5 月 8 日 上午 11:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1442)

                    我查了下，有河北的有浙江的，不知道是哪里出问题了，我刚创建好，就我一个连的，然后过一段时间就有其他 IP 连进来

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 8 日 下午 4:15](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1444)

                    会不会是你下的软件被人家留了后门记住了你的密码啥的？我的这个脚本代码都是开源的，没有任何后门，你可以去看源码

114.  ![](https://cdn.v2ex.com/gravatar/12d4fa69380144ba8eeca1d90ff74b1f?s=50&d=mm&r=g) <cite class="fn">幸福</cite>说道： [2018 年 5 月 6 日 下午 7:30](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1422)

    楼主，我安装你这个教程来了之后，好像不管用

    [回复](#comment-1422)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 6 日 下午 7:41](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1423)

        不可能用不了的。安装完 ss 是如我截图所示吗？如果是的话你换用手机看看行不行，很多时候是本机杀毒软件禁了，防火墙禁了或者是以前设置过浏览器代理导致不能用。

        [回复](#comment-1423)
        1.  ![](https://cdn.v2ex.com/gravatar/12d4fa69380144ba8eeca1d90ff74b1f?s=50&d=mm&r=g) <cite class="fn">幸福</cite>说道： [2018 年 5 月 6 日 下午 7:43](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1425)

            是安装你的图示做的，我电脑没有装杀毒软件。我试下手机的

            [回复](#comment-1425)
        2.  ![](https://cdn.v2ex.com/gravatar/12d4fa69380144ba8eeca1d90ff74b1f?s=50&d=mm&r=g) <cite class="fn">幸福</cite>说道： [2018 年 5 月 6 日 下午 7:47](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1428)

            博主，感谢！我刚刚用了 ssr 的那个教程试了下，可以了。太感谢了。我整这个东西整了一下午了。

            [回复](#comment-1428)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 6 日 下午 7:51](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1429)

                ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/smile.png)

                [回复](#comment-1429)
115.  ![](https://cdn.v2ex.com/gravatar/6fab76096ea5c64524d31aeaabe64030?s=50&d=mm&r=g) <cite class="fn">ssg2333</cite> 说道： [2018 年 5 月 5 日 下午 8:19](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1419)

    博主你好
    我在搬瓦工入的 CN2 怎么没有之前的一键安装 SS。。

    [回复](#comment-1419)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 6 日 下午 7:43](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1426)

        搬瓦工也可以用我的一键脚本安装的

        [回复](#comment-1426)
116.  ![](https://cdn.v2ex.com/gravatar/297453229a89093638658a8a8b93063f?s=50&d=mm&r=g) <cite class="fn">童晓亮</cite>说道： [2018 年 5 月 5 日 下午 5:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1409)

    博主。SS 出现日志出现以下代码 是什么问题啊
    [2018-05-05 17:09:27] System.Reflection.TargetInvocationException: 操作过程中出现异常，结果无效。有关异常的详细信息，请查看 InnerException。 ---> System.Net.WebException: 基础连接已经关闭: 发送时发生错误。 ---> System.IO.IOException: 由于远程方已关闭传输流，身份验证失败。
    在 System.Net.TlsStream.EndWrite(IAsyncResult asyncResult)
    在 System.Net.PooledStream.EndWrite(IAsyncResult asyncResult)
    在 System.Net.ConnectStream.WriteHeadersCallback(IAsyncResult ar)
    --- 内部异常堆栈跟踪的结尾 ---
    在 System.Net.HttpWebRequest.EndGetResponse(IAsyncResult asyncResult)
    在 System.Net.WebClient.GetWebResponse(WebRequest request, IAsyncResult result)
    在 System.Net.WebClient.DownloadBitsResponseCallback(IAsyncResult result)
    --- 内部异常堆栈跟踪的结尾 ---
    在 System.ComponentModel.AsyncCompletedEventArgs.RaiseExceptionIfNecessary()
    在 System.Net.DownloadStringCompletedEventArgs.get_Result()
    在 Shadowsocks.Controller.UpdateChecker.http_DownloadStringCompleted(Object sender, DownloadStringCompletedEventArgs e)
    [2018-05-05 17:09:30] Shadowsocks started
    [2018-05-05 17:15:27] System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
    在 System.Net.Sockets.Socket.EndReceive(IAsyncResult asyncResult)
    在 Shadowsocks.Controller.PortForwarder.Handler.PipeRemoteReceiveCallback(IAsyncResult ar)
    [2018-05-05 17:15:28] System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
    在 System.Net.Sockets.Socket.EndReceive(IAsyncResult asyncResult)
    在 Shadowsocks.Controller.Handler.PipeRemoteReceiveCallback(IAsyncResult ar)

    [回复](#comment-1409)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 5 日 下午 7:00](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1410)

        这个你要看服务器日志是什么 根据我公众号左下角的常见问题排查一下才能定位问题

        [回复](#comment-1410)
        1.  ![](https://cdn.v2ex.com/gravatar/297453229a89093638658a8a8b93063f?s=50&d=mm&r=g) <cite class="fn">童晓亮</cite>说道： [2018 年 5 月 13 日 下午 9:18](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1515)

            博主 日志这样：
            2018-05-13 13:01:25 INFO connecting otc-api.huobipro.com:443 from 58.250.xxx.xxx:65178
            2018-05-13 13:01:25 WARNING unsupported addrtype 94, maybe wrong password or encryption method
            2018-05-13 13:01:25 ERROR can not parse header
            2018-05-13 13:01:25 ERROR can not parse header when handling connection from 58.250.xxx.xxx:43812
            2018-05-13 13:01:26 INFO connecting collecter.frontjs.com:443 from 58.250.xxx.xxx:65183
            2018-05-13 13:01:26 WARNING unsupported addrtype 94, maybe wrong password or encryption method
            2018-05-13 13:01:26 ERROR can not parse header
            2018-05-13 13:01:26 ERROR can not parse header when handling connection from 58.250.xxx.xxx:43813
            2018-05-13 13:01:37 INFO connecting video.browser.qq.com:80 from 58.250.xxx.xxx:65202
            2018-05-13 13:01:37 WARNING unsupported addrtype 94, maybe wrong password or encryption method
            2018-05-13 13:01:37 ERROR can not parse header
            2018-05-13 13:01:37 ERROR can not parse header when handling connection from 58.250.xxx.xxx:38130
            IP 我用 XXX 代替了。
            上面有 wrong password，但是我 100% 肯定密码是没错错误的，代理其实也能用，就是有时候会很慢 看 SS 日志就会出现
            System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
            在 System.Net.Sockets.Socket.EndReceive(IAsyncResult asyncResult)
            在 Shadowsocks.Controller.Handler.PipeRemoteReceiveCallback(IAsyncResult ar)

            [回复](#comment-1515)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 13 日 下午 10:13](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1517)

                更新一下 ss 版本试试

                [回复](#comment-1517)
                1.  ![](https://cdn.v2ex.com/gravatar/297453229a89093638658a8a8b93063f?s=50&d=mm&r=g) <cite class="fn">童晓亮</cite>说道： [2018 年 5 月 14 日 下午 8:41](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1531)

                    很尴尬 换了 4.0-2.5 的版本 SS 还是一样 服务器日志 ，SS 稍微日志稍微有点不一样：
                    System.Net.Sockets.SocketException (0x80004005): 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。
                    在 System.Net.Sockets.Socket.EndReceive(IAsyncResult asyncResult)
                    在 Shadowsocks.Controller.Handler.PipeRemoteReceiveCallback(IAsyncResult ar)

    2.  ![](https://cdn.v2ex.com/gravatar/40bc52692b14026e91440870756099cf?s=50&d=mm&r=g) <cite class="fn">boye1258</cite> 说道： [2018 年 5 月 7 日 上午 11:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1433)

        你使用的谷歌浏览器吗？？你可以试试把谷歌浏览器加上 socks5 代理。。

        [回复](#comment-1433)
        1.  ![](https://cdn.v2ex.com/gravatar/297453229a89093638658a8a8b93063f?s=50&d=mm&r=g) <cite class="fn">童晓亮</cite>说道： [2018 年 5 月 13 日 下午 8:53](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1514)

            你好 我用的是 QQ 浏览器。 该怎么做呢？

            [回复](#comment-1514)
117.  ![](https://cdn.v2ex.com/gravatar/f3aa09954fdb907f052e1e4496e765a1?s=50&d=mm&r=g) <cite class="fn">道本真</cite>说道： [2018 年 5 月 4 日 下午 4:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1404)

    站长，请问下我买了 东京和迈阿密的用的 SSR 都上不了 Pixiv，手机电脑都是这样怎么回事。用别人免费的反而能行

    [回复](#comment-1404)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 4 日 下午 4:54](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1406)

        P 站把一些 vultr 的 ip 封禁了（据说是 45 开头的 IP 段），似乎是有人用它爬 p 站的图。
        或者你可以再换几个试试，我的迈尔密的就可以用。
        或者你试试修改 hosts，好像 p 站用这个方法就可以上了。
        或者搬瓦工的 ip 好像是可以上的。

        [回复](#comment-1406)
118.  ![](https://cdn.v2ex.com/gravatar/df2cde92b27dd477c8fbc6f1aac6ae30?s=50&d=mm&r=g) <cite class="fn">刘先生</cite>说道： [2018 年 5 月 2 日 下午 3:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1390)

    博主，我要能链接查看外网，是要购买你的账号吗？
    因为我按照你的操作流程添加 ip 和密码是看不到外网的

    [回复](#comment-1390)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 2 日 下午 3:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1391)

        不需要啊..
        你买了 VPS 后，连上去，用我的一键脚本搭建 ss 就可以了。不是你 VPS 的密码，是 ss 的密码

        [回复](#comment-1391)
119.  ![](https://cdn.v2ex.com/gravatar/7026d5bb9988c3fa15dfbe99a26e9533?s=50&d=mm&r=g) <cite class="fn">tdhbg</cite> 说道： [2018 年 4 月 30 日 下午 8:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1368)

    大兄弟, 厉害了 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png) , 佩服佩服, 谢谢

    [回复](#comment-1368)
120.  ![](https://cdn.v2ex.com/gravatar/19bc4d18aa97e41df3b9b8192545ff45?s=50&d=mm&r=g) <cite class="fn">jeff</cite> 说道： [2018 年 4 月 28 日 上午 11:27](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1351)

    想重新设置，无法 restart，stop.
    ubuntu@ip-172-31-18-101:~$ /etc/init.d/shadowsocks stop
    IPv6 support
    2018-04-28 02:44:44 INFO shell.py:74 ShadowsocksR 3.4.0 2017-07-27
    2018-04-28 02:44:44 ERROR shell.py:49 [Errno 13] Permission denied: '/var/run/shadowsocksr.pid'
    Stopping ShadowsocksR failed

    [回复](#comment-1351)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 28 日 下午 1:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1352)

        似乎是没有权限，加 sudo 看行不行

        [回复](#comment-1352)
121.  ![](https://cdn.v2ex.com/gravatar/86ba88287897eb32b55f751f476c5f8d?s=50&d=mm&r=g) <cite class="fn">magma</cite> 说道： [2018 年 4 月 26 日 下午 11:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1318)

    楼主你好，请问在 CentOS 6 x64 上可以按照教程来吗？网上找了个教程依着做，安装完毕的显示安装一切正常，但就是无法使用 SS。

    [回复](#comment-1318)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 26 日 下午 11:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1319)

        可以的 我今天修改了下脚本 你重新下载的话是支持 centos6 的了 可以试一下

        [回复](#comment-1319)
122.  ![](https://cdn.v2ex.com/gravatar/dc78b38477bc4cc4ca1dcd3fae676b1a?s=50&d=mm&r=g) <cite class="fn">达瓦啊</cite>说道： [2018 年 4 月 25 日 下午 12:16](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1280)

    博主你好，我按照你的教程搭建好了 ss，油管可以正常上，但是 telegram 链接不上。

    [回复](#comment-1280)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 25 日 下午 2:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1281)

        [shadowsocks 编辑并使用本地 PAC](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-local-pac-file/)

        [回复](#comment-1281)
123.  ![](https://cdn.v2ex.com/gravatar/85bddfcd11d4ac16d9aa0e0d3372c02e?s=50&d=mm&r=g) <cite class="fn">luo</cite> 说道： [2018 年 4 月 23 日 下午 9:10](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1250)

    博主你好，我按你的教程搭好后可以正常使用，可是后来我改 dns 后翻不了墙了，改回去也没用，请问有什么办法吗 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/idea.png)

    [回复](#comment-1250)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 23 日 下午 10:32](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1252)

        cmd 里输入`ipconfig /flushdns`试试，可能是本地 DNS 缓存没刷新

        [回复](#comment-1252)
        1.  ![](https://cdn.v2ex.com/gravatar/85bddfcd11d4ac16d9aa0e0d3372c02e?s=50&d=mm&r=g) <cite class="fn">luo</cite> 说道： [2018 年 4 月 25 日 下午 9:24](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1288)

            我发现是改了 pac 的问题，我编辑了本地的 pac，改回去可以用了，不改回去全局代理才能用 我是按照 "ziplib.com": 1, 这种格式加的网站啊，是改错了吗 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png)

            [回复](#comment-1288)
124.  ![](https://cdn.v2ex.com/gravatar/91c768c4810c0ac1013a364b623ab5cf?s=50&d=mm&r=g) <cite class="fn">leta</cite> 说道： [2018 年 4 月 21 日 下午 5:19](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1218)

    你好，今天照着你的教程搭建成功了，地址选了洛杉矶 5$ 一月的那个，之前测试的时候速度很快，但是搭建完实际使用的时候油管看个 480p 的视频也卡的不行，还有救吗

    [回复](#comment-1218)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 21 日 下午 5:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1219)

        不可能啊，开启 bbr 了吗？

        [回复](#comment-1219)
        1.  ![](https://cdn.v2ex.com/gravatar/91c768c4810c0ac1013a364b623ab5cf?s=50&d=mm&r=g) <cite class="fn">leta</cite> 说道： [2018 年 4 月 21 日 下午 5:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1220)

            sysctl net.ipv4.tcp_available_congestion_control
            sysctl net.ipv4.tcp_congestion_control
            这两个命令结果中有 bbr 就可以确定开启了吧，还有我搭的是 ssr，所有步骤都按照教程来中途也没有出错的地方，唯一不同的就是 port 用了默认的 13397 还有加密用了 aes-256-cfb，应该不是这两个的影响

            [回复](#comment-1220)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 21 日 下午 6:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1221)

                嗯 开启了应该不会慢的 洛杉矶的机房个人感觉最稳定了

                [回复](#comment-1221)
                1.  ![](https://cdn.v2ex.com/gravatar/91c768c4810c0ac1013a364b623ab5cf?s=50&d=mm&r=g) <cite class="fn">leta</cite> 说道： [2018 年 4 月 21 日 下午 6:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1222)

                    好心塞....

                2.  ![](https://cdn.v2ex.com/gravatar/91c768c4810c0ac1013a364b623ab5cf?s=50&d=mm&r=g) <cite class="fn">leta</cite> 说道： [2018 年 4 月 21 日 下午 9:01](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1223)

                    换成日本的节点能流畅 1080p 了，试了一下 ping89ms，之前洛杉矶的是 250ms 而且会丢失

                3.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 21 日 下午 9:34](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1225)

                    那可能是你那里的网络适合日本的机子吧，我用的洛杉矶的 1080 完全没压力。ping 只是延时，服务器越远 ping 值越高，一般洛杉矶的白天 100-200，网上 200-300 吧。晚上一般都会慢些，出去的人多

                4.  ![](https://cdn.v2ex.com/gravatar/91c768c4810c0ac1013a364b623ab5cf?s=50&d=mm&r=g) <cite class="fn">leta</cite> 说道： [2018 年 4 月 21 日 下午 9:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1224)

                    顺便让我问下，多少的 ping 才是健康的？（虽然 250ms 能用但是非常的卡，89 其实也算不上非常流畅，但是基本很少会加载中了）

125.  ![](https://cdn.v2ex.com/gravatar/27fd46361e2a4aab2dcbb40a54d7cb15?s=50&d=mm&r=g) <cite class="fn">Chris</cite> 说道： [2018 年 4 月 21 日 下午 3:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1216)

    为什么第一次设置端口和密码之后还是上不了油管，要再设置一遍才能有反应

    [回复](#comment-1216)
126.  ![](https://cdn.v2ex.com/gravatar/cfb19e74c00abefbe1bae4f5b7af27d2?s=50&d=mm&r=g) <cite class="fn">acan</cite> 说道： [2018 年 4 月 21 日 上午 11:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1211)

    阿里云香港服务器，centos6 的系统有脚本吗？

    [回复](#comment-1211)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 21 日 上午 11:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1212)

        ssr 支持 centos 的 你试试

        [回复](#comment-1212)
127.  ![](https://cdn.v2ex.com/gravatar/2d2a7efc7ec92966af133de22507661d?s=50&d=mm&r=g) <cite class="fn">yuki</cite> 说道： [2018 年 4 月 21 日 上午 10:07](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1204)

    您好，为什么我 vultr 创建好之后没有显示密码？只显示了 ip 地址

    [回复](#comment-1204)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 21 日 上午 11:15](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1206)

        在 instance 详情里有密码的，参考 [Vultr 购买图解步骤](https://www.flyzy2005.com/vps/vultr-deploy/)

        [回复](#comment-1206)
128.  ![](https://cdn.v2ex.com/gravatar/1e820678ef8d5aa4e536dc1e28309f2e?s=50&d=mm&r=g) <cite class="fn">ancenz</cite> 说道： [2018 年 4 月 18 日 上午 1:15](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1150)

    装好了，是要开机一直运行着 Xshell 才可用么

    [回复](#comment-1150)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 18 日 上午 8:13](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1153)

        不用，装好了 Xshell 就可以关闭了。Xshell 相当于一个远程桌面，只要你服务器不要欠费就行了

        [回复](#comment-1153)
129.  ![](https://cdn.v2ex.com/gravatar/1b6df25c774d86f0ec8cb321fa95279d?s=50&d=mm&r=g) <cite class="fn">InsurGency</cite> 说道： [2018 年 4 月 17 日 下午 2:47](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1138)

    博主大大，小白问个问题 .vultr 上买服务器 我是 win10 的话是选 Windows2016 服务器就可以吗还是选哪一个啊

    [回复](#comment-1138)
    1.  ![](https://cdn.v2ex.com/gravatar/1b6df25c774d86f0ec8cb321fa95279d?s=50&d=mm&r=g) <cite class="fn">InsurGency</cite> 说道： [2018 年 4 月 17 日 下午 3:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1139)

        仔细的看了一遍 明白啦 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/arrow.png)

        [回复](#comment-1139)
130.  ![](https://cdn.v2ex.com/gravatar/46019c07801138b71d3152502f3fc7f8?s=50&d=mm&r=g) <cite class="fn">雷佳音</cite>说道： [2018 年 4 月 16 日 下午 10:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1131)

    大佬 你这套程序在谷歌云上能用吗

    [回复](#comment-1131)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 16 日 下午 11:28](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1133)

        ubuntu 系统的应该都可以

        [回复](#comment-1133)
131.  ![](https://cdn.v2ex.com/gravatar/a5e946ed6afb6cd8beef69b4ef4beb97?s=50&d=mm&r=g) <cite class="fn">petitbeau</cite> 说道： [2018 年 4 月 16 日 下午 4:49](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1125)

    博主求救，按照你的步骤都搞好了，mac 可以科学上网，但是手机上 ios 的 shadowrocket 扫码后显示非法的 ss

    [回复](#comment-1125)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 16 日 下午 7:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1126)

        那你用 shadowrocket 手动输入账号密码试试 跟 mac 一样就行了

        [回复](#comment-1126)
132.  ![](https://cdn.v2ex.com/gravatar/96e771806d52f72dfe15aafce29bb535?s=50&d=mm&r=g) <cite class="fn">cdzxc</cite> 说道： [2018 年 4 月 15 日 下午 12:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1105)

    请问我用安卓的 SSR 的时候会遇到如下问题：
    我安卓端设置与电脑设置相同，测试会报错 “失败: unexpected end of stream on connection{127.0.0.1:1082,proxy=DIRET@....”，另外我发现我设置的实际本地端口是 1080 时 报错的时候 中间显示 127.0.0.1:1082，我更改本地端口为 n 的时候，报错中间显示就是 127.0.0.1：n+2 请教一下该如何解决

    [回复](#comment-1105)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 15 日 下午 1:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1108)

        你是设置了端口偏移啥的吗？因为我没有用过安卓的 ssr，不太清楚这个问题

        [回复](#comment-1108)
        1.  ![](https://cdn.v2ex.com/gravatar/96e771806d52f72dfe15aafce29bb535?s=50&d=mm&r=g) <cite class="fn">cdzxc</cite> 说道： [2018 年 4 月 15 日 下午 1:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1109)

            没有做什么设置，就是安装后直接使用，就会出现这样的问题 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

            [回复](#comment-1109)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 15 日 下午 1:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1110)

                这个我没有遇到过 也没有人反应过这个问题

                [回复](#comment-1110)
                1.  ![](https://cdn.v2ex.com/gravatar/96e771806d52f72dfe15aafce29bb535?s=50&d=mm&r=g) <cite class="fn">cdzxc</cite> 说道： [2018 年 4 月 15 日 下午 2:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1111)

                    另外想请教一下，一键配置 SSR 的脚本 是否能在 Centos6 中使用啊？我开启了 BBR 感觉还不是特别满意，我家里电信 200M 租的 vultr 的 5 刀的日本线路，看油管 1080 都有点小卡 看 4K 无力，Connection Speed 最多只有 4Kbps speedtest 白天下行 20M 上行 0.5M 半夜下行 100M 上行 0.8M ... IDM 等多线程下载极限大概 9.5M/S
                    我想流畅的看油管 4K 所以在想是不是应该换 锐速 或者 FinalSpeed 试试看

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 15 日 下午 2:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1113)

                    ssr 脚本是可以在 centos6 运行的 但是 centos 里我这个脚本无法开启 bbr。
                    电信网络建议选择洛杉矶或者欧洲的机房

133.  ![](https://cdn.v2ex.com/gravatar/7b1bb4c8bbb3f2ad2f44c8a9c19d84ae?s=50&d=mm&r=g) <cite class="fn">小男</cite>说道： [2018 年 4 月 15 日 上午 12:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1100)

    博主您好，在一台电脑一键搭建 ssr 服务后，如果换另一台电脑，不通过 Xshell 连接 Linux 只下个 ssr 客户端配置可以么？原信息不变。

    [回复](#comment-1100)
    1.  ![](https://cdn.v2ex.com/gravatar/7b1bb4c8bbb3f2ad2f44c8a9c19d84ae?s=50&d=mm&r=g) <cite class="fn">小男</cite>说道： [2018 年 4 月 15 日 上午 9:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1103)

        还是换电脑又要下载 Xshell 重操作一遍？

        [回复](#comment-1103)
        1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 15 日 下午 1:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1107)

            不用重新操作，服务器端只需要安装一次，换客户端直接下载客户端软件配置就行了

            [回复](#comment-1107)
134.  ![](https://cdn.v2ex.com/gravatar/a55eb7f531354ecc50bf8548d6d234ff?s=50&d=mm&r=g) <cite class="fn">唐经商</cite>说道： [2018 年 4 月 14 日 下午 9:06](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1091)

    博主，想问下我是从你这一键搭建的 SS，太久了后，我记不住我当时设置的密码了，请问下我是直接输入查看状态的代码就可以查看密码了吗，还是要输入其他的代码，还有就是假如我要重新修改密码或者端口的话，我是不是需要先卸载之前搭建好的 SS，然后再重新搭建一遍 ss 脚步代码去修改密码呢？

    [回复](#comment-1091)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 14 日 下午 9:24](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1092)

        1\. `cat /etc/shadowsocks.json`，可以看到密码的
        2\. 卸载 ss，再搭建是可以修改密码

        [回复](#comment-1092)
        1.  ![](https://cdn.v2ex.com/gravatar/5ede99e1de1da3b6f68556c7fcbf0f39?s=50&d=mm&r=g) <cite class="fn">唐经商</cite>说道： [2018 年 4 月 14 日 下午 9:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1095)

            那是不是必须要先卸载后搭建呢？可不可以不卸载重新搭建一个，但是之前的那个是被覆盖了，还是继续保留并且可以使用的呢？

            [回复](#comment-1095)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 14 日 下午 9:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1098)

                可以直接搭建 之前的会被覆盖了

                [回复](#comment-1098)
                1.  ![](https://cdn.v2ex.com/gravatar/a55eb7f531354ecc50bf8548d6d234ff?s=50&d=mm&r=g) <cite class="fn">唐经商</cite>说道： [2018 年 4 月 15 日 上午 9:07](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1101)

                    好的，谢谢博主，为你疯狂点广告😂

135.  ![](https://cdn.v2ex.com/gravatar/ea2c0d05b815215abf274af0223822fe?s=50&d=mm&r=g) <cite class="fn">yunjue</cite> 说道： [2018 年 4 月 13 日 下午 1:10](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1087)

    如果是服务器是多个 IP，可以实现多个 IP 都可以连接么？是不是每一个 IP 都要设置一遍

    [回复](#comment-1087)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 13 日 下午 4:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1088)

        可以的，可以把这些 IP 通过一个网站连接起来的，参考 [shadowsocks-manager 实现 ss 多用户管理与流量限制](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-manager-config/)，可以搭一个 m 端，把所有的 s 端都管理起来

        [回复](#comment-1088)
136.  ![](https://cdn.v2ex.com/gravatar/335d8d194796dfd1002f56c366e0bfe1?s=50&d=mm&r=g) <cite class="fn">一辉</cite>说道： [2018 年 4 月 13 日 上午 10:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1083)

    看这个帖子看了一个半小时，怀疑像我这样的外行人能不能成功，暂时放弃了: mrgreen: ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png)
    我都不知道那个 readme.md 文件怎么用的 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/neutral.png)

    [回复](#comment-1083)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 13 日 上午 11:24](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1085)

        你要看懂那个 readme 干啥，我不是都截图了吗，你直接复制代码回车就可以啊 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png)

        [回复](#comment-1085)
        1.  ![](https://cdn.v2ex.com/gravatar/335d8d194796dfd1002f56c366e0bfe1?s=50&d=mm&r=g) <cite class="fn">一辉</cite>说道： [2018 年 4 月 13 日 上午 11:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1086)

            添加个砖头砸自己的表情，也许是我自己搞复杂了…… 关键还是看着一堆东西有点发懵。
            上一次面对一堆代码是为了魔兽写宏和骑砍修改 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/biggrin.png) 这网站真是太热情了

            [回复](#comment-1086)
137.  ![](https://cdn.v2ex.com/gravatar/452eb3c9faaaccf101343bf8e54ab35f?s=50&d=mm&r=g) <cite class="fn">xiaoxiong</cite> 说道： [2018 年 4 月 10 日 下午 10:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1067)

    mac 上也是按照教程配置的，就是翻不了，win 上配置是可以的，不知道哪里有问题。。。

    [回复](#comment-1067)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 10 日 下午 11:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1068)

        mac 可以换用低版本的试试，我有一次也是 1.71 的那个版本不行，换个 1.6 的就行了

        [回复](#comment-1068)
        1.  ![](https://cdn.v2ex.com/gravatar/452eb3c9faaaccf101343bf8e54ab35f?s=50&d=mm&r=g) <cite class="fn">xiaoxiong</cite> 说道： [2018 年 4 月 10 日 下午 11:06](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1069)

            1.6 的这个也不行。。。

            [回复](#comment-1069)
138.  ![](https://cdn.v2ex.com/gravatar/17fb51187b83006119349520d4637593?s=50&d=mm&r=g) <cite class="fn">阿土</cite>说道： [2018 年 4 月 8 日 下午 8:46](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1049)

    原来用的 OS，老是无缘无故断线，仔细研究博主的文章，一次就成功了，速度好像快了好多，不知道是不是错觉。。哈哈

    [回复](#comment-1049)
139.  ![](https://cdn.v2ex.com/gravatar/8a7b096f9da8079bd68ea0a6c1081f66?s=50&d=mm&r=g) <cite class="fn">MRGE</cite> 说道： [2018 年 4 月 7 日 下午 11:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1036)

    请问开启 BBR 加速这一步也是在 XSHELL 里面完成吗》

    [回复](#comment-1036)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 8 日 下午 2:29](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1039)

        是的

        [回复](#comment-1039)
140.  ![](https://cdn.v2ex.com/gravatar/6da5f02b63bd5952f82364be81b152af?s=50&d=mm&r=g) <cite class="fn">Iris</cite> 说道： [2018 年 4 月 7 日 下午 5:43](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1035)

    首先要感谢版主的脚本，有了它。从开设服务器到架设 SS 以及开启 BBR 的周期不到几分钟。 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cowboy.png) VPS 不经常用时可以随时销毁，账户余额可以更经济的使用。版主回复很快，按照他的步骤如果不能正常使用，可以尝试更换较快的机房 ， ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/drooling.png) 我的已从 2.5🔪/m 的迈阿密换到了 5🔪/m 的洛杉矶，PC 端连接的问题因此解决。 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/biggrin.png) 多多支持下版主哦！

    [回复](#comment-1035)
141.  ![](https://cdn.v2ex.com/gravatar/2740b816b4d8f2a186f9f9ba8a8f003a?s=50&d=mm&r=g) <cite class="fn">刘天麟</cite>说道： [2018 年 4 月 6 日 下午 8:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1026)

    你好~ 我完全按照你的步骤搭建，但是完成后依旧无法上网。。和校园网有关吗？除此之外想不到什么啦。。 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/persevering.png)

    [回复](#comment-1026)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 7 日 下午 2:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1029)

        跟校园网没有关系 我也是校园网。你在公众号左下角常见问题自己先排查下

        [回复](#comment-1029)
142.  ![](https://cdn.v2ex.com/gravatar/d813a197e177a3b1abeced6ed344b7e5?s=50&d=mm&r=g) <cite class="fn">深海提督</cite>说道： [2018 年 4 月 4 日 下午 6:11](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1000)

    root@vultr:~# git clone [https://github.com/Flyzy2005/ss-fly](https://www.flyzy2005.com/go/go.php?url=https://github.com/Flyzy2005/ss-fly)
    fatal: destination path 'ss-fly' already exists and is not an empty directory.
    请问第一步出现这个是什么意思

    [回复](#comment-1000)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 4 日 下午 6:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1001)

        你已经 git 过一次了，本地已经有这个路径了。这个命令只要执行一次就行

        [回复](#comment-1001)
        1.  ![](https://cdn.v2ex.com/gravatar/80e5e57b6b024271566822178f609963?s=50&d=mm&r=g) <cite class="fn">LinkF</cite> 说道： [2018 年 4 月 5 日 上午 8:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1003)

            请问我打开 SS 后，在 SS 里面选择 PAC 代理，浏览器访问墙外网站会显示无法建立安全连接是为啥。

            [回复](#comment-1003)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 5 日 上午 9:07](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1005)

                这个问题需要你自己定位的，一般用一键脚本服务器端没有问题。你确定客户端的配置都正确吗？然后看看服务器日志显示什么`cat /var/log/shadowsocks.log`。建议你可以关注下公众号，看下左下角的常见问题~

                [回复](#comment-1005)
                1.  ![](https://cdn.v2ex.com/gravatar/80e5e57b6b024271566822178f609963?s=50&d=mm&r=g) <cite class="fn">LinkF</cite> 说道： [2018 年 4 月 5 日 上午 9:28](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1006)

                    SS 日志显示目标服务器积极拒绝，然后我在公众号常见问题里面找到了，我怀疑我..... 在乱玩 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png)

                2.  ![](https://cdn.v2ex.com/gravatar/80e5e57b6b024271566822178f609963?s=50&d=mm&r=g) <cite class="fn">LinkF</cite> 说道： [2018 年 4 月 5 日 上午 9:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1007)

                    搞定了，我用的是 Vultr 那个密码，换成 ss 密码就行了，瓜皮玩家 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png)

143.  ![](https://cdn.v2ex.com/gravatar/f94e51f248a179b8aa08a9972f473afe?s=50&d=mm&r=g) <cite class="fn">聪聪</cite>说道： [2018 年 4 月 4 日 下午 4:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-998)

    [root@vultr ~]# git clone [https://github.com/Flyzy2005/ss-fly.git](https://www.flyzy2005.com/go/go.php?url=https://github.com/Flyzy2005/ss-fly.git)
    -bash: git: command not found

    输入第一行代码后是这样的 啥意思啊

    [回复](#comment-998)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 4 日 下午 4:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-999)

        按照 [Vultr 购买图解步骤](https://www.flyzy2005.com/vps/vultr-deploy/)来了吗？系统版本没有选择 Ubuntu16.04 吧？

        [回复](#comment-999)
        1.  ![](https://cdn.v2ex.com/gravatar/e32fe4acf154f0e764e16866516e0bbf?s=50&d=mm&r=g) <cite class="fn">amber</cite> 说道： [2018 年 4 月 19 日 下午 7:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1181)

            博主你好，我是运行第二个代码，即设置密码那里出现了 sss: command not found
            我检查了 vultr 购买设置那里都没有错，这又是什么原因呢？

            [回复](#comment-1181)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 19 日 下午 10:32](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1182)

                运行哪个代码？应该不会出现 sss 啊

                [回复](#comment-1182)
                1.  ![](https://cdn.v2ex.com/gravatar/e32fe4acf154f0e764e16866516e0bbf?s=50&d=mm&r=g) <cite class="fn">amber</cite> 说道： [2018 年 4 月 20 日 上午 6:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1183)

                    就是运行这个后出现的 ss-fly/ss-fly.sh -i flyzy2005.com 1024

144.  ![](https://cdn.v2ex.com/gravatar/f00bdbbf0b80414a2b9be35551c0ff6b?s=50&d=mm&r=g) <cite class="fn">林子</cite>说道： [2018 年 4 月 4 日 下午 1:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-996)

    楼主，这个会不会被封？

    [回复](#comment-996)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 4 日 下午 3:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-997)

        IP 被封了 一美分换一个新的 IP 就行了

        [回复](#comment-997)
145.  ![](https://cdn.v2ex.com/gravatar/4d27ab87a08901dbe3b71e8766ac3c5c?s=50&d=mm&r=g) <cite class="fn">zhaoyang</cite> 说道： [2018 年 4 月 3 日 上午 11:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-980)

    google hangouts 稳定么？ 很多都掉包

    [回复](#comment-980)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 3 日 下午 2:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-983)

        这个我没有用过，我一直用的 Vultr

        [回复](#comment-983)
146.  ![](https://cdn.v2ex.com/gravatar/630e3f10bc1dbd530f9ba0481e40a0f2?s=50&d=mm&r=g) <cite class="fn">浅夏</cite>说道： [2018 年 4 月 2 日 下午 3:55](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-974)

    博主，我已经全部弄好实现科学上网了，那请问现在我的手机设备有办法共享实现科学上网吗

    [回复](#comment-974)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 2 日 下午 4:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-976)

        啥？你手机下个软件不就可以用了吗，又不限制设备数量

        [回复](#comment-976)
        1.  ![](https://cdn.v2ex.com/gravatar/630e3f10bc1dbd530f9ba0481e40a0f2?s=50&d=mm&r=g) <cite class="fn">浅夏</cite>说道： [2018 年 4 月 2 日 下午 5:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-978)

            请问下的是什么软件

            [回复](#comment-978)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 3 日 上午 8:51](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-979)

                参考：[各版本 shadowsocks 客户端下载地址](https://www.flyzy2005.com/fan-qiang/shadowsocks/ss-clients-download/)

                [回复](#comment-979)
147.  ![](https://cdn.v2ex.com/gravatar/dfd07ec6911cf9e35a1d42434e522a10?s=50&d=mm&r=g) <cite class="fn">[monife](https://www.flyzy2005.com/go/go.php?url=http://monife.qq.com)</cite> 说道： [2018 年 4 月 1 日 下午 10:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-969)

    师父，请问多用户配制该输入哪些代码呢？感激不尽！winscp 上可直接修改后保存文件就可以了吗？

    [回复](#comment-969)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 1 日 下午 10:43](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-971)

        多用户配置可以参考：[详解 shadowsocks 配置多用户多密码](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-config-multiple-users/)

        [回复](#comment-971)
        1.  ![](https://cdn.v2ex.com/gravatar/dfd07ec6911cf9e35a1d42434e522a10?s=50&d=mm&r=g) <cite class="fn">[monife](https://www.flyzy2005.com/go/go.php?url=http://monife.qq.com)</cite> 说道： [2018 年 4 月 1 日 下午 11:05](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-972)

            多谢指导，鞠躬 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/smile.png)

            [回复](#comment-972)
148.  ![](https://cdn.v2ex.com/gravatar/d8755e7e6969cbea40a3dcba573896f9?s=50&d=mm&r=g) <cite class="fn">1248197917</cite> 说道： [2018 年 4 月 1 日 下午 8:13](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-968)

    如何看 bbr 已经开启？

    [回复](#comment-968)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 1 日 下午 10:41](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-970)

        执行`sysctl net.ipv4.tcp_available_congestion_control`，如果返回结果里有 bbr 就说明开启了。
        或者你再执行一次`ss-fly/ss-fly.sh -bbr`，如果提示 BBR 已开启成功，就说明开启成功了

        [回复](#comment-970)
149.  ![](https://cdn.v2ex.com/gravatar/94114df3560048f20ad9eef90b02f7f8?s=50&d=mm&r=g) <cite class="fn">曾付出几多心跳</cite>说道： [2018 年 4 月 1 日 上午 8:05](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-963)

    请问带佬 为什么有些网站进不去比如 91 汤不热 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/symbols.png) ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png)

    [回复](#comment-963)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 4 月 1 日 上午 11:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-964)

        参考：[shadowsocks 编辑并使用本地 PAC](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-local-pac-file/)

        [回复](#comment-964)
150.  ![](https://cdn.v2ex.com/gravatar/94114df3560048f20ad9eef90b02f7f8?s=50&d=mm&r=g) <cite class="fn">曾付出几多心跳</cite>说道： [2018 年 4 月 1 日 上午 7:50](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-962)

    感谢带佬 折腾半天发现是 ss 的端口设置错了 现在终于 ojbk 了

    [回复](#comment-962)
151.  ![](https://cdn.v2ex.com/gravatar/94114df3560048f20ad9eef90b02f7f8?s=50&d=mm&r=g) <cite class="fn">曾付出几多心跳</cite>说道： [2018 年 3 月 31 日 下午 11:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-955)

    为什么所有都操作好了 还是没成功 难道是校园网屏蔽了吗

    [回复](#comment-955)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 31 日 下午 11:06](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-957)

        校园网应该没有屏蔽的，我也是校园网的。你关注下公众号看下左下角常见问题，看看问题在哪里，找不到再给我留言

        [回复](#comment-957)
        1.  ![](https://cdn.v2ex.com/gravatar/94114df3560048f20ad9eef90b02f7f8?s=50&d=mm&r=g) <cite class="fn">曾付出几多心跳</cite>说道： [2018 年 3 月 31 日 下午 11:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-958)

            断网了 明天再接着捣鼓

            [回复](#comment-958)
152.  ![](https://cdn.v2ex.com/gravatar/5095a2f2037ea995a6d72221674141e4?s=50&d=mm&r=g) <cite class="fn">tomov4</cite> 说道： [2018 年 3 月 31 日 上午 10:48](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-937)

    博主，我按照步骤连接之后，网特别慢… 图片都很难加载出来 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

    [回复](#comment-937)
    1.  ![](https://cdn.v2ex.com/gravatar/5095a2f2037ea995a6d72221674141e4?s=50&d=mm&r=g) <cite class="fn">tomov4</cite> 说道： [2018 年 3 月 31 日 上午 10:49](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-938)

        我用的是手机终端 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

        [回复](#comment-938)
    2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 31 日 上午 10:52](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-939)

        不会啊 我开 1080 没啥压力啊.. 你开启 bbr 了吗？哪里的服务器？ping 了丢包吗？

        [回复](#comment-939)
153.  ![](https://cdn.v2ex.com/gravatar/b5772bc70bc87d0f19f6d14f910abbb8?s=50&d=mm&r=g) <cite class="fn">唐小菌</cite>说道： [2018 年 3 月 29 日 下午 8:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-901)

    Last login: Thu Mar 29 11:21:43 2018 from 113.91.66.49
    root@vultr:~# git clone https Cloning into 'ss-fly?...
    > remote: Counting objects: 4, done.
    > remote: Compressing objects: 100% (4/4), done.
    > remote: Total 4 (delta 0), reused 4 (delta G), pack-reused Unpacking objects: (4/4), done.
    > Checking connectivity... done.Checking connectivity... done.
    > ss-fly/ss-fly.sh -i D7}pTRSj84vJm7AZ
    >
    > Hit: I [http://security.ubuntu.com/ubuntu](https://www.flyzy2005.com/go/go.php?url=http://security.ubuntu.com/ubuntu) xenial-security InReIease Hit:2 [http://archive.ubuntu.com/ubuntu](https://www.flyzy2005.com/go/go.php?url=http://archive.ubuntu.com/ubuntu) xenial InRelease Hit:3 [http://archive.ubuntu.com/ubuntu](https://www.flyzy2005.com/go/go.php?url=http://archive.ubuntu.com/ubuntu) xenial-updates InRe1ease Hit:4 [http://archive.ubuntu.com/ubuntu](https://www.flyzy2005.com/go/go.php?url=http://archive.ubuntu.com/ubuntu) xenial-backports InReIease Reading package lists... Done
    > Reading package lists... Done
    > Building dependency tree
    > Reading state information... Done
    > The following additional packages will be installed: libpython-stdlib libpython2.7-minimal libpython2.7-stdlib python Suggested packages:
    > python-doc python-tk python2.7-doc binutils binfmt-support
    > RprnmmpnHAH ?
    >
    大神我这代码是不是弄错了？帮看下

    [回复](#comment-901)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 29 日 下午 10:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-903)

        只要复制博文中截图的第一行代码，然后回车就可以了，其他是执行结果

        [回复](#comment-903)
        1.  ![](https://cdn.v2ex.com/gravatar/b5772bc70bc87d0f19f6d14f910abbb8?s=50&d=mm&r=g) <cite class="fn">唐小菌</cite>说道： [2018 年 3 月 29 日 下午 10:07](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-904)

            感谢大神的回复，已经搞定，但电脑无法上 YouTube

            [回复](#comment-904)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 29 日 下午 10:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-907)

                手机可以电脑不可以的话，建议你换一个版本的客户端试试：[shadowsocks 各版本客户端下载地址](https://www.flyzy2005.com/fan-qiang/shadowsocks/ss-clients-download/)

                [回复](#comment-907)
        2.  ![](https://cdn.v2ex.com/gravatar/8d7e5147c4b958be9cc073352c0b61bb?s=50&d=mm&r=g) <cite class="fn">gtx2080</cite> 说道： [2018 年 3 月 31 日 上午 6:48](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-929)

            博主 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png) 假如使用另一個版本或更新了 ss 客戶端 需要重新一鍵或者 bbr 麼 謝謝

            [回复](#comment-929)
            1.  ![](https://cdn.v2ex.com/gravatar/8d7e5147c4b958be9cc073352c0b61bb?s=50&d=mm&r=g) <cite class="fn">gtx2080</cite> 说道： [2018 年 3 月 31 日 上午 6:50](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-930)

                剛剛怎麼變回簡體了 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/persevering.png)

                [回复](#comment-930)
            2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 31 日 上午 10:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-934)

                bbr 只用开一次

                [回复](#comment-934)
154.  ![](https://cdn.v2ex.com/gravatar/79744f7eb838a796c31c5f4da7322e87?s=50&d=mm&r=g) <cite class="fn">噜噜噜</cite>说道： [2018 年 3 月 28 日 下午 9:10](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-890)

    我跟你同样的问题，请问怎么解决？411599088@qq.com 好不容易上来，麻烦说一下，谢谢你

    [回复](#comment-890)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 28 日 下午 9:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-891)

        ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png) 你是问的谁..

        [回复](#comment-891)
        1.  ![](https://cdn.v2ex.com/gravatar/79744f7eb838a796c31c5f4da7322e87?s=50&d=mm&r=g) <cite class="fn">噜噜噜</cite>说道： [2018 年 3 月 28 日 下午 9:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-893)

            刚刚搞定了。谢谢让我发现这样一个平台，博主辛苦了

            [回复](#comment-893)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 28 日 下午 9:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-894)

                ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png) 觉得不错可以向朋友推荐推荐~

                [回复](#comment-894)
155.  ![](https://cdn.v2ex.com/gravatar/4f161f2e3cdd32b3677d93d23ff5ba72?s=50&d=mm&r=g) <cite class="fn">[好推博客](https://www.flyzy2005.com/go/go.php?url=http://www.ht193.com)</cite>说道： [2018 年 3 月 28 日 下午 3:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-880)

    我登陆后输入第一个代码出现

    error: while accessing [https://github.com/Flyzy2005/ss-fly/info/refs](https://www.flyzy2005.com/go/go.php?url=https://github.com/Flyzy2005/ss-fly/info/refs)

    fatal: HTTP request failed

    [回复](#comment-880)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 28 日 下午 3:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-881)

        没有遇到过，帮你在网上搜了下，似乎可能是服务器上 git 版本太低了

        [回复](#comment-881)
156.  ![](https://cdn.v2ex.com/gravatar/fa9b71aa96d980262800cd589658f14d?s=50&d=mm&r=g) <cite class="fn">sanxuan</cite> 说道： [2018 年 3 月 27 日 下午 6:37](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-860)

    刚搭建可以用，服务器重启就不行了？本地可以 PING 通啊

    [回复](#comment-860)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 27 日 下午 7:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-863)

        用一键脚本 16.04 目前是可以增加开机启动的，你执行`ps -aux`看下有没有 ssserver 的进程

        [回复](#comment-863)
157.  ![](https://cdn.v2ex.com/gravatar/f759d691ad2d3e8a11d01a68d361c5fe?s=50&d=mm&r=g) <cite class="fn">古道西风</cite>说道： [2018 年 3 月 25 日 下午 2:52](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-814)

    特来感谢一下~
    一键搭完后，手机端装了 app 就可以上。win7 总是连不了，把客户端从 2.5 换成 4.0.9 的就可以连上了。4.0.9 还是先下到手机上又倒腾到 pc 上的。。 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png)

    [回复](#comment-814)
158.  ![](https://cdn.v2ex.com/gravatar/f9ba5beae3c54e16be75f95856e978b8?s=50&d=mm&r=g) <cite class="fn">Asdess</cite> 说道： [2018 年 3 月 23 日 下午 4:06](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-776)

    2018-03-23 07:45:08 WARNING unsupported addrtype 124, maybe wrong password or encryption method
    2018-03-23 07:45:08 ERROR can not parse header when handling connection from 49.90.178.248:3369
    2018-03-23 07:45:08 WARNING unsupported addrtype 129, maybe wrong password or encryption method
    2018-03-23 07:45:08 ERROR can not parse header when handling connection from 49.90.178.248:3370
    2018-03-23 07:45:09 WARNING unsupported addrtype 93, maybe wrong password or encryption method
    2018-03-23 07:45:09 ERROR can not parse header when handling connection from 49.90.178.248:3368
    2018-03-23 07:45:09 WARNING unsupported addrtype 224, maybe wrong password or encryption method
    2018-03-23 07:45:09 ERROR can not parse header when handling connection from 49.90.178.248:3371
    2018-03-23 07:45:09 WARNING unsupported addrtype 185, maybe wrong password or encryption method
    2018-03-23 07:45:09 ERROR can not parse header when handling connection from 49.90.178.248:3372
    2018-03-23 07:45:09 WARNING unsupported addrtype 143, maybe wrong password or encryption method
    2018-03-23 07:45:09 ERROR can not parse header when handling connection from 49.90.178.248:3373
    2018-03-23 07:45:09 WARNING unsupported addrtype 198, maybe wrong password or encryption method
    2018-03-23 07:45:09 ERROR can not parse header when handling connection from 49.90.178.248:3374
    2018-03-23 07:45:10 WARNING unsupported addrtype 207, maybe wrong password or encryption method
    2018-03-23 07:45:10 ERROR can not parse header when handling connection from 49.90.178.248:3375
    2018-03-23 07:45:10 WARNING unsupported addrtype 229, maybe wrong password or encryption method
    2018-03-23 07:45:10 ERROR can not parse header when handling connection from 49.90.178.248:3376
    2018-03-23 07:45:10 WARNING unsupported addrtype 232, maybe wrong password or encryption method
    2018-03-23 07:45:10 ERROR can not parse header when handling connection from 49.90.178.248:3377
    2018-03-23 07:45:11 WARNING unsupported addrtype 249, maybe wrong password or encryption method
    2018-03-23 07:45:11 ERROR can not parse header when handling connection from 49.90.178.248:3378
    2018-03-23 07:45:11 WARNING unsupported addrtype 25, maybe wrong password or encryption method
    2018-03-23 07:45:11 ERROR can not parse header when handling connection from 49.90.178.248:3379
    2018-03-23 07:45:12 WARNING unsupported addrtype 111, maybe wrong password or encryption method
    博主问下这是什么问题啊，我是一键脚本配置的，ss 客户端也没有错误，我的 ip 地址不是这个，可是一直显示我连接这个 IP 地址错误

    [回复](#comment-776)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 23 日 下午 5:46](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-779)

        这个是服务器在提示由这个 ip 的客户端在请求。你看看是不是本机客户端的密码或者加密方式错了，服务器没有问题，正常运行了。

        [回复](#comment-779)
        1.  ![](https://cdn.v2ex.com/gravatar/ab7f894ad7cfe24e2467a3bf3e3cd78c?s=50&d=mm&r=g) <cite class="fn">Mark</cite> 说道： [2018 年 5 月 11 日 下午 9:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1495)

            同样的问题 密码都是 copy 的 没道理出错啊！ ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

            [回复](#comment-1495)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 5 月 12 日 上午 12:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-1496)

                什么错误

                [回复](#comment-1496)
159.  ![](https://cdn.v2ex.com/gravatar/3bd201d7e846323b3901373563123498?s=50&d=mm&r=g) <cite class="fn">sk</cite> 说道： [2018 年 3 月 22 日 下午 10:11](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-763)

    兄弟 我这个捣鼓两天了 还是不行 自己百度了也不行

    System.Reflection.TargetInvocationException: 操作过程中出现异常，结果无效。有关异常的详细信息，请查看 InnerException。 ---> System.Net.WebException: 无法连接到远程服务器 ---> System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。 127.0.0.1:1024
    在 System.Net.Sockets.Socket.EndConnect(IAsyncResult asyncResult)
    在 System.Net.ServicePoint.ConnectSocketInternal(Boolean connectFailure, Socket s4, Socket s6, Socket& socket, IPAddress& address, ConnectSocketState state, IAsyncResult asyncResult, Int32 timeout, Exception& exception)
    --- 内部异常堆栈跟踪的结尾 ---
    在 System.Net.HttpWebRequest.EndGetResponse(IAsyncResult asyncResult)
    在 System.Net.WebClient.GetWebResponse(WebRequest request, IAsyncResult result)
    在 System.Net.WebClient.DownloadBitsResponseCallback(IAsyncResult result)

    [回复](#comment-763)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 22 日 下午 10:16](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-764)

        你服务器 ip 写的 127.0.0.1？在公众号截图给我看下。然后根据左下角的常见问题，你都检查了吗？

        [回复](#comment-764)
        1.  ![](https://cdn.v2ex.com/gravatar/3bd201d7e846323b3901373563123498?s=50&d=mm&r=g) <cite class="fn">sk</cite> 说道： [2018 年 3 月 22 日 下午 10:16](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-765)

            检查了 没有公众号上的问题

            [回复](#comment-765)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 22 日 下午 10:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-766)

                服务器 restart 正确？
                那你在公众号把你本机的 ss 配置截图给我

                [回复](#comment-766)
            2.  ![](https://cdn.v2ex.com/gravatar/3bd201d7e846323b3901373563123498?s=50&d=mm&r=g) <cite class="fn">sk</cite> 说道： [2018 年 3 月 22 日 下午 10:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-767)

                我用的是你的一键 ss

                [回复](#comment-767)
160.  ![](https://cdn.v2ex.com/gravatar/0154af7dbca5a183914dfe8685923613?s=50&d=mm&r=g) <cite class="fn">哈哈哈</cite>说道： [2018 年 3 月 22 日 下午 8:27](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-756)

    用了一键配置 ss 开启加速之后 PC 端没法用 端口 1024 请问怎么解决

    [回复](#comment-756)
    1.  ![](https://cdn.v2ex.com/gravatar/0154af7dbca5a183914dfe8685923613?s=50&d=mm&r=g) <cite class="fn">哈哈哈</cite>说道： [2018 年 3 月 22 日 下午 8:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-757)

        [2018-03-22 20:38:07] System.Reflection.TargetInvocationException: 调用的目标发生了异常。 ---> System.EntryPointNotFoundException: 无法在 DLL“libsscrypto.dll”中找到名为 “md5_ret” 的入口点。
        在 Shadowsocks.Encryption.MbedTLS.md5_ret(Byte[] input, UInt32 ilen, Byte[] output)
        在 Shadowsocks.Encryption.MbedTLS.MD5(Byte[] input)
        在 Shadowsocks.Encryption.Stream.StreamEncryptor.LegacyDeriveKey(Byte[] password, Byte[] key, Int32 keylen)
        在 Shadowsocks.Encryption.Stream.StreamEncryptor.InitKey(String password)
        在 Shadowsocks.Encryption.Stream.StreamEncryptor..ctor(String method, String password)
        在 Shadowsocks.Encryption.Stream.StreamOpenSSLEncryptor..ctor(String method, String password)
        --- 内部异常堆栈跟踪的结尾 ---
        在 System.RuntimeMethodHandle.InvokeMethod(Object target, Object[] arguments, Signature sig, Boolean constructor)
        在 System.Reflection.RuntimeConstructorInfo.Invoke(BindingFlags invokeAttr, Binder binder, Object[] parameters, CultureInfo culture)
        在 Shadowsocks.Encryption.EncryptorFactory.GetEncryptor(String method, String password)
        在 Shadowsocks.Controller.TCPHandler.CreateRemote()
        在 Shadowsocks.Controller.TCPHandler.StartConnect()

        [回复](#comment-757)
        1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 22 日 下午 8:43](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-759)

            没有遇到过这个问题。换一个客户端版本试试，用一键配置 ss，服务器应该没有问题的

            [回复](#comment-759)
            1.  ![](https://cdn.v2ex.com/gravatar/0154af7dbca5a183914dfe8685923613?s=50&d=mm&r=g) <cite class="fn">哈哈哈</cite>说道： [2018 年 3 月 22 日 下午 9:00](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-760)

                试过您百度网盘的 2.5 版本和最新的 4.0.9 都是失败 端口也尝试从 1024 改成 8388 以及本地端口从 1080 改为 1024 等操作 没有效果 cmd 里 Ping 也能 Ping 通 会是 vultr 那里的问题么? 求反馈

                [回复](#comment-760)
            2.  ![](https://cdn.v2ex.com/gravatar/0154af7dbca5a183914dfe8685923613?s=50&d=mm&r=g) <cite class="fn">哈哈哈</cite>说道： [2018 年 3 月 22 日 下午 9:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-761)

                尝试了一下 手机端的 SS 是可以使用的 那 PC 端的 SS 可能是哪方面出了问题呢？

                [回复](#comment-761)
                1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 22 日 下午 9:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-762)

                    这个问题你问我不如问 google... 帮你搜了下，看下能不能解决你的问题：[https://github.com/shadowsocks/shadowsocks-windows/issues/1555](https://www.flyzy2005.com/go/go.php?url=https://github.com/shadowsocks/shadowsocks-windows/issues/1555)

                2.  ![](https://cdn.v2ex.com/gravatar/0154af7dbca5a183914dfe8685923613?s=50&d=mm&r=g) <cite class="fn">哈哈哈</cite>说道： [2018 年 3 月 23 日 下午 9:32](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-780)

                    谢谢您！从网址里的解决方案成功解决问题！

161.  ![](https://cdn.v2ex.com/gravatar/3e2a714106db5b90b6f99b0cc3b984c2?s=50&d=mm&r=g) <cite class="fn">clh13600</cite> 说道： [2018 年 3 月 22 日 下午 7:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-751)

    博主有一个问题 按照你上面的配置一步步来的 然后重启后不仅不能科学上网 连正常联网都不行了 然后各种试 最后把 ss 客户端的代理端口也改成 1024（原来是 1080）才可以

    [回复](#comment-751)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 22 日 下午 8:21](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-754)

        那可能是你本机的 1080 端口被占用了

        [回复](#comment-754)
162.  ![](https://cdn.v2ex.com/gravatar/3bd201d7e846323b3901373563123498?s=50&d=mm&r=g) <cite class="fn">sk</cite> 说道： [2018 年 3 月 21 日 下午 11:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-734)

    root@vultr:~# git clone [https://github.com/Flyzy2005/ss-fly](https://www.flyzy2005.com/go/go.php?url=https://github.com/Flyzy2005/ss-fly)
    Cloning into 'ss-fly'...
    fatal: unable to access 'https://github.com/Flyzy2005/ss-fly/': Could not resolve host: github.com
    老大 这个怎么办

    [回复](#comment-734)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 22 日 上午 12:08](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-737)

        稍安勿躁，是 vultr 那边的问题，他们工程师正在解决，美美睡一觉，明天起来再搞~ 下面是他们工作人员的回复:
        Hello,

        We are looking into this now.

        Jeff Benfer
        Systems Administrator

        [回复](#comment-737)
163.  ![](https://cdn.v2ex.com/gravatar/582f3913661dc42193458a0ed24b6cb7?s=50&d=mm&r=g) <cite class="fn">mars</cite> 说道： [2018 年 3 月 21 日 下午 10:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-725)

    [root@vultr ~]# git clone [https://github.com/Flyzy2005/ss-fly](https://www.flyzy2005.com/go/go.php?url=https://github.com/Flyzy2005/ss-fly)
    -bash: git: command not found
    这是什么情况呢。

    [回复](#comment-725)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 21 日 下午 11:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-726)

        服务器版本选的是 Centos 不是 Ubuntu 16.04 吧？

        [回复](#comment-726)
164.  ![](https://cdn.v2ex.com/gravatar/7981b98d4c36c3c6e8276919653de919?s=50&d=mm&r=g) <cite class="fn">Trs</cite> 说道： [2018 年 3 月 21 日 下午 9:22](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-723)

    f 服务端怎么做统计，就是看有多少连接的客户端呢

    [回复](#comment-723)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 21 日 下午 11:04](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-728)

        这个好像没有开源的统计软件，只有统计流量的

        [回复](#comment-728)
        1.  ![](https://cdn.v2ex.com/gravatar/7981b98d4c36c3c6e8276919653de919?s=50&d=mm&r=g) <cite class="fn">Trs</cite> 说道： [2018 年 3 月 21 日 下午 11:11](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-730)

            那怎么统计流量的，谢谢了

            [回复](#comment-730)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 21 日 下午 11:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-732)

                参考 [shadowsocks 配置多用户](https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-config-multiple-users/)

                [回复](#comment-732)
165.  ![](https://cdn.v2ex.com/gravatar/c5eb0e4ab12a4625c4f91e01606e1cf8?s=50&d=mm&r=g) <cite class="fn">leeDev</cite> 说道： [2018 年 3 月 21 日 下午 7:28](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-721)

    root@vultr:~# ss-fly/ss-fly.sh -i qwerasd
    Hit:1 [http://security.ubuntu.com/ubuntu](https://www.flyzy2005.com/go/go.php?url=http://security.ubuntu.com/ubuntu) xenial-security InRelease
    Hit:2 [http://archive.ubuntu.com/ubuntu](https://www.flyzy2005.com/go/go.php?url=http://archive.ubuntu.com/ubuntu) xenial InRelease
    Hit:3 [http://archive.ubuntu.com/ubuntu](https://www.flyzy2005.com/go/go.php?url=http://archive.ubuntu.com/ubuntu) xenial-updates InRelease
    Get:4 [http://archive.ubuntu.com/ubuntu](https://www.flyzy2005.com/go/go.php?url=http://archive.ubuntu.com/ubuntu) xenial-backports InRelease [102 kB]
    Fetched 102 kB in 0s (111 kB/s)
    Reading package lists... Done
    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    python-pip is already the newest version (8.1.1-2ubuntu0.4).
    0 upgraded, 0 newly installed, 0 to remove and 84 not upgraded.
    Traceback (most recent call last):
    File "/usr/bin/pip", line 11, in
    sys.exit(main())
    File "/usr/lib/python2.7/dist-packages/pip/__init__.py", line 215, in main
    locale.setlocale(locale.LC_ALL, '')
    File "/usr/lib/python2.7/locale.py", line 581, in setlocale
    return _setlocale(category, locale)
    locale.Error: unsupported locale setting
    Traceback (most recent call last):
    File "/usr/bin/pip", line 11, in
    sys.exit(main())
    File "/usr/lib/python2.7/dist-packages/pip/__init__.py", line 215, in main
    locale.setlocale(locale.LC_ALL, '')
    File "/usr/lib/python2.7/locale.py", line 581, in setlocale
    return _setlocale(category, locale)
    locale.Error: unsupported locale setting
    Traceback (most recent call last):
    File "/usr/bin/pip", line 11, in
    sys.exit(main())
    File "/usr/lib/python2.7/dist-packages/pip/__init__.py", line 215, in main
    locale.setlocale(locale.LC_ALL, '')
    File "/usr/lib/python2.7/locale.py", line 581, in setlocale
    return _setlocale(category, locale)
    locale.Error: unsupported locale setting
    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    python-m2crypto is already the newest version (0.22.6~rc4-1ubuntu1).
    0 upgraded, 0 newly installed, 0 to remove and 84 not upgraded.
    option -d not recognized
    usage: ssserver [-h] [-s SERVER_ADDR] [-p SERVER_PORT] -k PASSWORD
    -m METHOD [-t TIMEOUT] [-c CONFIG] [--fast-open]
    [--workers WORKERS] [-v] [-q]

    optional arguments:
    -h, --help show this help message and exit
    -s SERVER_ADDR server address, default: 0.0.0.0
    -p SERVER_PORT server port, default: 8388
    -k PASSWORD password
    -m METHOD encryption method, default: aes-256-cfb
    -t TIMEOUT timeout in seconds, default: 300
    -c CONFIG path to config file
    --fast-open use TCP_FASTOPEN, requires Linux 3.7+
    --workers WORKERS number of workers, available on Unix/Linux
    -v, -vv verbose mode
    -q, -qq quiet mode, only show warnings/errors

    Online help:

    安装成功~ 尽情冲浪吧

    [回复](#comment-721)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 21 日 下午 7:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-722)

        你是用 mac 运行脚本的吗？先执行代码试试：
        `export LC_ALL=C`
        之后再执行安装脚本

        [回复](#comment-722)
166.  ![](https://cdn.v2ex.com/gravatar/0251c7fae795b91ab388f55626afc191?s=50&d=mm&r=g) <cite class="fn">YYY</cite> 说道： [2018 年 3 月 21 日 下午 1:20](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-717)

    我运气真好尝试着用你的教程搭建第一次的 PING 不通，第二次居然能稳定油管看 8K

    [回复](#comment-717)
167.  ![](https://cdn.v2ex.com/gravatar/5610d6348fec6d579cd5a43b041d24db?s=50&d=mm&r=g) <cite class="fn">a-captain</cite> 说道： [2018 年 3 月 17 日 下午 10:04](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-658)

    [2018-03-17 21:57:05] Shadowsocks started
    [2018-03-17 21:57:05] System.Reflection.TargetInvocationException: 操作过程中出现异常，结果无效。有关异常的详细信息，请查看 InnerException。 ---> System.Net.WebException: 无法连接到远程服务器 ---> System.Net.Sockets.SocketException: 由于目标计算机积极拒绝，无法连接。 127.0.0.1:1080
    在 System.Net.Sockets.Socket.EndConnect(IAsyncResult asyncResult)
    在 System.Net.ServicePoint.ConnectSocketInternal(Boolean connectFailure, Socket s4, Socket s6, Socket& socket, IPAddress& address, ConnectSocketState state, IAsyncResult asyncResult, Int32 timeout, Exception& exception)
    --- 内部异常堆栈跟踪的结尾 ---
    在 System.Net.HttpWebRequest.EndGetResponse(IAsyncResult asyncResult)
    在 System.Net.WebClient.GetWebResponse(WebRequest request, IAsyncResult result)
    在 System.Net.WebClient.DownloadBitsResponseCallback(IAsyncResult result)
    --- 内部异常堆栈跟踪的结尾 ---
    在 System.ComponentModel.AsyncCompletedEventArgs.RaiseExceptionIfNecessary()
    在 System.Net.DownloadStringCompletedEventArgs.get_Result()
    在 Shadowsocks.Controller.UpdateChecker.http_DownloadStringCompleted(Object sender, DownloadStringCompletedEventArgs e)
    [2018-03-17 21:57:31] Shadowsocks started
    [2018-03-17 21:57:57] Shadowsocks started
    [2018-03-17 22:00:11] Shadowsocks started
    ===================
    我 pc 端的 ss 好像连不上 vps，也无法科学上网，楼主麻烦看一下怎么回事？

    [回复](#comment-658)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 17 日 下午 11:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-661)

        你这个根据我公众号左下角的常见问题自己排查下，不行再给我留言吧。只看客户端的日志不知道哪里有问题

        [回复](#comment-661)
168.  ![](https://cdn.v2ex.com/gravatar/205a3cfa0510cf77b561c5b76a57ea84?s=50&d=mm&r=g) <cite class="fn">WenG</cite> 说道： [2018 年 3 月 17 日 下午 4:50](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-649)

    root@vultr:~# git clone [https://github.com/Flyzy2005/ss-fly](https://www.flyzy2005.com/go/go.php?url=https://github.com/Flyzy2005/ss-fly)
    Cloning into 'ss-fly'...
    remote: Counting objects: 17, done.
    remote: Compressing objects: 100% (3/3), done.
    remote: Total 17 (delta 0), reused 3 (delta 0), pack-reused 14
    Unpacking objects: 100% (17/17), done.
    Checking connectivity... done.
    root@vultr:~# ss-fly/ss-fly.sh -i {q1RUM-Ua!ZQaXJd 1024
    -bash: !ZQaXJd: event not found
    root@vultr:~# ss-fly/ss-fly.sh -i {q1RUM-Ua!ZQaXJd
    -bash: !ZQaXJd: event not found
    root@vultr:~#
    这是什么情况呀？

    [回复](#comment-649)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 17 日 下午 4:53](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-650)

        取个简单点的密码 可能是特殊字符冲突了。这种密码你自己记得住吗？不需要跟 vps 的密码一样的

        [回复](#comment-650)
169.  ![](https://cdn.v2ex.com/gravatar/1a046fc6b3106d5902a8bcd81baef74b?s=50&d=mm&r=g) <cite class="fn">芒果加黄桃</cite>说道： [2018 年 3 月 17 日 下午 3:48](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-647)

    老大，按照你的方法完全照搬了，为啥就是连不上呢.... ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

    [回复](#comment-647)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy 小站](https://www.flyzy2005.com)</cite>说道： [2018 年 3 月 17 日 下午 4:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-648)

        我也不知道你哪里错了。你关注公众号在左下角常见问题里自己排查下，不行的话给我留言

        [回复](#comment-648)
170.  ![](https://cdn.v2ex.com/gravatar/129616608f8fcacc10682f175232111f?s=50&d=mm&r=g) <cite class="fn">tt</cite> 说道： [2018 年 3 月 11 日 下午 4:50](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-579)

    这个远程控制要是我把控制的机器关了，美国的服务器还能运行吗

    [回复](#comment-579)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 11 日 下午 8:45](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-580)

        服务器是一直运行的 跟你关不关 xshell 没有关系 除非你自己把服务器关机了

        [回复](#comment-580)
        1.  ![](https://cdn.v2ex.com/gravatar/129616608f8fcacc10682f175232111f?s=50&d=mm&r=g) <cite class="fn">tt</cite> 说道： [2018 年 3 月 12 日 下午 8:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-586)

            好的，谢谢谢，问题解决了

            [回复](#comment-586)
        2.  ![](https://cdn.v2ex.com/gravatar/129616608f8fcacc10682f175232111f?s=50&d=mm&r=g) <cite class="fn">tt</cite> 说道： [2018 年 3 月 12 日 下午 10:00](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-588)

            2018-03-12 21:58:08 INFO loading libcrypto from libcrypto.so.1.0.0
            2018-03-12 21:58:08 ERROR already started at pid 1151
            安装成功~ 尽情冲浪吧

            突然上不了了，然后发现这个

            [回复](#comment-588)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 12 日 下午 10:10](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-589)

                你这个是因为本来 ss 就已经正常启动了，你又执行了一次这个搭建代码。当时没有考虑，直接是默认启动 ss。
                BTW，脚本已经更新过了，不会有这种 already started 的问题了。

                [回复](#comment-589)
                1.  ![](https://cdn.v2ex.com/gravatar/129616608f8fcacc10682f175232111f?s=50&d=mm&r=g) <cite class="fn">tt</cite> 说道： [2018 年 3 月 12 日 下午 10:13](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-590)

                    要手动更新吗？

                2.  ![](https://cdn.v2ex.com/gravatar/129616608f8fcacc10682f175232111f?s=50&d=mm&r=g) <cite class="fn">tt</cite> 说道： [2018 年 3 月 12 日 下午 10:13](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-591)

                    但是我现在 SS 用不了
                    只可以用 SSR

171.  ![](https://cdn.v2ex.com/gravatar/124d8de4f6057434cb9df4d1b0fd71b4?s=50&d=mm&r=g) <cite class="fn">Gosh</cite> 说道： [2018 年 3 月 10 日 下午 7:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-570)

    作者你好，我家里是联通的宽带 服务器和本地的 ss 已经构架好了并且能用的用手机的 4G 网测试过，但是台式机用宽带的时候就不能上了。 怎么办？

    [回复](#comment-570)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 10 日 下午 8:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-572)

        手机用宽带的 WiFi 可以吗？

        [回复](#comment-572)
        1.  ![](https://cdn.v2ex.com/gravatar/124d8de4f6057434cb9df4d1b0fd71b4?s=50&d=mm&r=g) <cite class="fn">Gosh</cite> 说道： [2018 年 3 月 10 日 下午 9:03](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-573)

            嗯可以 不过 买的是迈阿密 速度十分之慢，掉包率有 50% 以上。而且连个推特经常得 1 分钟 有什么好方法吗

            [回复](#comment-573)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 10 日 下午 9:15](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-574)

                掉包率高建议换个 location 的，说明 Miami 的服务器不适合你那里。你可以先测一下速度再选

                [回复](#comment-574)
                1.  ![](https://cdn.v2ex.com/gravatar/124d8de4f6057434cb9df4d1b0fd71b4?s=50&d=mm&r=g) <cite class="fn">Gosh</cite> 说道： [2018 年 3 月 10 日 下午 9:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-575)

                    换了一个 seattle 的服务器 但是速度非常之慢 我 ping 过之后是最快的节点了 150ms 左右 似乎是东西根本加载不出来

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 10 日 下午 10:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-576)

                    试试洛杉矶 开启 BBR

172.  ![](https://cdn.v2ex.com/gravatar/79aca28757bb341be016a7ce06aaf244?s=50&d=mm&r=g) <cite class="fn">小肥羊</cite>说道： [2018 年 3 月 10 日 下午 3:09](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-566)

    博主你好，我已经按照一建安装的教程都设置好了，脚本也安装好了 但是为什么还不能科学上网

    [回复](#comment-566)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 10 日 下午 3:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-567)

        你先根据公众号左下角的常见问题自己先排查下 一般可以自己就解决了

        [回复](#comment-567)
173.  ![](https://cdn.v2ex.com/gravatar/9774fc4535a4606e91be7b0fc97807ee?s=50&d=mm&r=g) <cite class="fn">caimen</cite> 说道： [2018 年 3 月 9 日 下午 3:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-550)

    已经安装完成了，不过还是上不了 youtube，怎么回事求救！！！！！！！！！！

    [回复](#comment-550)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 9 日 下午 6:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-552)

        公众号左下角常见问题排查下

        [回复](#comment-552)
174.  ![](https://cdn.v2ex.com/gravatar/f49198936d09ba408a2b394b37810bd2?s=50&d=mm&r=g) <cite class="fn">佳佳佳</cite>说道： [2018 年 3 月 9 日 上午 10:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-546)

    vultr 东京的 vps，5 刀一个月的，BBR 加速也开了，但测速最高也就 1.2M 1.3M 的下载速度，属于慢吗？大佬一般网速能到 5-6 甚至 10M 往上吗？ ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/persevering.png)

    [回复](#comment-546)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 9 日 上午 10:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-549)

        这个跟自己的网络也有关系的。你看下你的 YouTube 能看多少清晰度的 应该还是可以的

        [回复](#comment-549)
175.  ![](https://cdn.v2ex.com/gravatar/23f85dcd466d34c7d705af31726afc57?s=50&d=mm&r=g) <cite class="fn">hugh</cite> 说道： [2018 年 3 月 6 日 下午 8:04](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-529)

    搞定了 但就是速度有点慢，有办法提升上网速度吗？ ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png)

    [回复](#comment-529)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 6 日 下午 9:10](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-530)

        开启 BBR 加速

        [回复](#comment-530)
176.  ![](https://cdn.v2ex.com/gravatar/6365e90c2017fe1e6b3edb522117228b?s=50&d=mm&r=g) <cite class="fn">airboss</cite> 说道： [2018 年 3 月 6 日 上午 7:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-525)

    问一下 LZ，本机配置 SS 的时候，添加了 2 个服务器（NJ 和 TOKYO 的）地址密码等，到时候上网到底走哪个服务器的地址？永远是第一个么？

    [回复](#comment-525)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 6 日 上午 9:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-528)

        你使用哪一个就走哪个。这两个服务器的 ip 肯定不一样啊，你在本机的 ss 客户端设置的哪个服务器的 ip 就走哪个服务器的流量

        [回复](#comment-528)
177.  ![](https://cdn.v2ex.com/gravatar/ee7d523e9aa76863c087076046394e75?s=50&d=mm&r=g) <cite class="fn">tiger</cite> 说道： [2018 年 3 月 5 日 上午 10:39](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-518)

    ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cowboy.png) 昨晚根据 fly 的教程已经建好了 ss 在冲浪，但是早上起来发现 ip 就用不了了。请问有什么具体原因会导致 ip 被侦测到并封禁么？(P.S. 之前买的 Tokyo 今天换了 NY 的服务器。感觉快了不少)

    [回复](#comment-518)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 5 日 下午 4:05](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-521)

        建议卸载 360，QQ 管家啥的

        [回复](#comment-521)
178.  ![](https://cdn.v2ex.com/gravatar/bc5e32b70eeba6e04a2dffa3ac129d05?s=50&d=mm&r=g) <cite class="fn">123</cite> 说道： [2018 年 3 月 4 日 下午 5:10](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-509)

    怎样 把一键脚本删除。我想重新弄..

    [回复](#comment-509)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 4 日 下午 6:04](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-510)

        直接再运行一次脚本，之后执行
        `ssserver -c /etc/shadowsocks.json -d restart`就行了

        [回复](#comment-510)
        1.  ![](https://cdn.v2ex.com/gravatar/bc5e32b70eeba6e04a2dffa3ac129d05?s=50&d=mm&r=g) <cite class="fn">123</cite> 说道： [2018 年 3 月 4 日 下午 10:31](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-515)

            那怎样可以把设置都抹掉吗。我发现我的 PS4 链接不了 wifi 了... 还有我设置都没错，但是 SS 就是不行...

            [回复](#comment-515)
            1.  ![](https://cdn.v2ex.com/gravatar/bc5e32b70eeba6e04a2dffa3ac129d05?s=50&d=mm&r=g) <cite class="fn">123</cite> 说道： [2018 年 3 月 4 日 下午 10:37](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-516)

                "server":"0.0.0.0",
                "server_port":1024,
                "local_address": "127.0.0.1",
                "local_port":1080,
                "password":"qwerasd",
                "timeout":300,
                "method":"aes-256-cfb"
                参数这样的

                [回复](#comment-516)
179.  ![](https://cdn.v2ex.com/gravatar/c95eb2ac99ab1b0d2b66bffa7598124a?s=50&d=mm&r=g) <cite class="fn">哥斯拉蛋蛋</cite>说道： [2018 年 3 月 3 日 下午 12:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-497)

    502 Read from server failed: Unknown error

    The following error occurred while trying to access [http://www.google.com/](https://www.flyzy2005.com/go/go.php?url=http://www.google.com/):

    502 Read from server failed: Unknown error

    Generated Sat, 03 Mar 2018 12:58:28 中国标准时间 by Polipo on windows10.microdone.cn:8123.
    请问出现这个问题是怎么回事

    [回复](#comment-497)
    1.  ![](https://cdn.v2ex.com/gravatar/c95eb2ac99ab1b0d2b66bffa7598124a?s=50&d=mm&r=g) <cite class="fn">哥斯拉蛋蛋</cite>说道： [2018 年 3 月 3 日 下午 1:10](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-498)

        手机端没有问题可以

        [回复](#comment-498)
    2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 3 日 下午 2:26](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-499)

        手机端没有问题的话你换一个版本的 shadowsocks 客户端试试

        [回复](#comment-499)
180.  ![](https://cdn.v2ex.com/gravatar/5ce5bca42120117d91b4cdc3b6314e9e?s=50&d=mm&r=g) <cite class="fn">宫房友</cite>说道： [2018 年 3 月 2 日 下午 8:35](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-488)

    您好：

    我用 ssserver -c /etc/shadowsocks.json -d restart 以及 cat /etc/shadowsocks.json 查看都没有问题，但是始终无法连接，不知道还应该检查什么。

    [回复](#comment-488)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 2 日 下午 8:46](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-489)

        `cat /var/log/shadowsocks.log`，看看你服务器有没有接收到你的请求。

        [回复](#comment-489)
        1.  ![](https://cdn.v2ex.com/gravatar/5ce5bca42120117d91b4cdc3b6314e9e?s=50&d=mm&r=g) <cite class="fn">宫房友</cite>说道： [2018 年 3 月 2 日 下午 8:50](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-490)

            您好
            2018-03-02 12:43:09 WARNING unsupported addrtype 240, maybe wrong password or encryption method
            2018-03-02 12:43:09 ERROR can not parse header when handling connection from 222.26.160.146:43738
            主要是显示这个，这是哪里出了问题呢，非常感谢

            [回复](#comment-490)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 2 日 下午 8:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-491)

                应该还是你客户端的问题 ip 是你 vps 的 ip 密码是你 json 里的密码 加密方式是否正确。
                实在不行就换个客户端或者先在手机上试试

                [回复](#comment-491)
                1.  ![](https://cdn.v2ex.com/gravatar/5ce5bca42120117d91b4cdc3b6314e9e?s=50&d=mm&r=g) <cite class="fn">宫房友</cite>说道： [2018 年 3 月 2 日 下午 9:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-492)

                    您好：

                    我在手机上试了一下没有问题，但是只能使用流量，链接 wifi 就不可以。我觉得可能是校园网封掉了 SS？

181.  ![](https://cdn.v2ex.com/gravatar/3d706f9290a127f866d079d6f550504b?s=50&d=mm&r=g) <cite class="fn">[余生](https://www.flyzy2005.com/go/go.php?url=http://无)</cite>说道： [2018 年 3 月 1 日 上午 12:57](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-438)

    用的一键安装，安装好后没法用，查看日志是 wrong password，这种情况怎么改？改哪些？

    [回复](#comment-438)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 1 日 上午 8:00](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-439)

        1\. 运行`ssserver -c /etc/shadowsocks.json -d restart`，看下日志是不是 stoped,started，如果是的话，说明服务器 ss 配置应该没有问题。
        2\. cat /etc/shadowsocks.json，与你客户端的 ss 配置比较，看加密方式、端口、密码有没有写错。

        [回复](#comment-439)
        1.  ![](https://cdn.v2ex.com/gravatar/3d706f9290a127f866d079d6f550504b?s=50&d=mm&r=g) <cite class="fn">[余生](https://www.flyzy2005.com/go/go.php?url=http://无)</cite>说道： [2018 年 3 月 1 日 下午 12:40](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-451)

            第一项只有一个 started

            [回复](#comment-451)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 3 月 1 日 下午 4:36](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-457)

                那就是你服务器根本没有接受到请求，确认 ip + 端口是否正确。ip 是你购买的 VPS 的 ip

                [回复](#comment-457)
182.  ![](https://cdn.v2ex.com/gravatar/7783dc2758180860370fa523de90f243?s=50&d=mm&r=g) <cite class="fn">lala</cite> 说道： [2018 年 2 月 28 日 下午 4:12](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-434)

    现在不能用支付宝了吗

    [回复](#comment-434)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 28 日 下午 4:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-435)

        可以啊 选择 Alipay

        [回复](#comment-435)
183.  ![](https://cdn.v2ex.com/gravatar/0a2786fd2e4d193c704dcefa59b250a6?s=50&d=mm&r=g) <cite class="fn">咸鱼</cite>说道： [2018 年 2 月 25 日 下午 11:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-361)

    大佬，这个必须要用 Ubuntu 安装吗

    [回复](#comment-361)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 25 日 下午 11:58](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-362)

        是的 我的脚本暂时只测试了 Ubuntu

        [回复](#comment-362)
184.  ![](https://cdn.v2ex.com/gravatar/02d4ac04c38b2360643e7c961f59ba6d?s=50&d=mm&r=g) <cite class="fn">噜啦啦</cite>说道： [2018 年 2 月 23 日 下午 10:57](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-328)

    大佬求问，，手机小火箭要科学上网还要加协议和混淆，这东西应该使用啥吖 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/neutral.png)

    [回复](#comment-328)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 24 日 上午 12:02](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-329)

        协议是啥？加密方式吗？混淆选 none。

        [回复](#comment-329)
185.  ![](https://cdn.v2ex.com/gravatar/7bedbf3effc157246b1b956d5d098517?s=50&d=mm&r=g) <cite class="fn">[爱钻牛角尖的萌新](https://www.flyzy2005.com/go/go.php?url=http://无)</cite>说道： [2018 年 2 月 17 日 下午 11:22](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-262)

    大佬，请问一下，我这边服务器里面东西被弄得太乱了，想格式化成最开始刚买服务器的时候的样子怎么操作，就是把以前那些 ss 信息和配置都删掉，怎么操作 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

    [回复](#comment-262)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 17 日 下午 11:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-263)

        在 **Vultr** 的官网，点击左侧的 **Servers**，找到你要重置的 **Cloud Instance**，最后有三个点的按钮，点击那个按钮，选择 **Server Reinstall** 就行了

        [回复](#comment-263)
        1.  ![](https://cdn.v2ex.com/gravatar/7bedbf3effc157246b1b956d5d098517?s=50&d=mm&r=g) <cite class="fn">[爱钻牛角尖的萌新](https://www.flyzy2005.com/go/go.php?url=http://无)</cite>说道： [2018 年 2 月 17 日 下午 11:38](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-264)

            尴尬了，我用的不是这个服务商的服务器，我这边这个好像没有这个按钮

            [回复](#comment-264)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 17 日 下午 11:42](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-265)

                那你就找重装系统的按钮在哪里。一般服务商都有的

                [回复](#comment-265)
                1.  ![](https://cdn.v2ex.com/gravatar/7bedbf3effc157246b1b956d5d098517?s=50&d=mm&r=g) <cite class="fn">[爱钻牛角尖的萌新](https://www.flyzy2005.com/go/go.php?url=http://无)</cite>说道： [2018 年 2 月 17 日 下午 11:47](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-266)

                    您能帮我看下吗，alpharacks 这个供应商的，我找了很久真的没找到，只找到个撤销服务器。。

                2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 17 日 下午 11:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-267)

                    …… 这个还是要靠你自己。实在不行问问客服吧

                3.  ![](https://cdn.v2ex.com/gravatar/7bedbf3effc157246b1b956d5d098517?s=50&d=mm&r=g) <cite class="fn">[爱钻牛角尖的萌新](https://www.flyzy2005.com/go/go.php?url=http://无)</cite>说道： [2018 年 2 月 18 日 上午 12:23](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-269)

                    嗯，我找到了重置的办法了，第一步下载脚本文件显示 not found，怎么办

186.  ![](https://cdn.v2ex.com/gravatar/12f4eeac96b4e85ab262d86efbd30e32?s=50&d=mm&r=g) <cite class="fn">花生</cite>说道： [2018 年 2 月 12 日 上午 11:51](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-218)

    ERROR: found an error in config.json: No JSON object could be decoded
    安装成功~ 尽情冲浪吧
    这个错误 一键安装的问题 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png)

    [回复](#comment-218)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 12 日 下午 12:19](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-220)

        你是不是直接运行的 ss-fly/ss-fly.sh -i password [port] 你看下我下面括号里的代码示例，不是直接运行这个的 [port] 要换成你的 port 或者留空

        [回复](#comment-220)
187.  ![](https://cdn.v2ex.com/gravatar/36a13445a7293e606cbbe229732ad686?s=50&d=mm&r=g) <cite class="fn">truman</cite> 说道： [2018 年 2 月 9 日 上午 9:56](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-161)

    博主大人，我在 Ubuntu 上实现了上述的步骤，就是不能 Google，您给的看日志的指令，在终端输入没有看到日志，是不是在 Ubuntu 终端输入 cat/var/log/shadowsocks, 希望博主大人指导一下!

    [回复](#comment-161)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 9 日 上午 9:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-162)

        是 cat /var/log/shadowsocks.log cat 后面有个空格

        [回复](#comment-162)
        1.  ![](https://cdn.v2ex.com/gravatar/4db4235165bcb06c6aa54bd6051dfb8d?s=50&d=mm&r=g) <cite class="fn">truman</cite> 说道： [2018 年 2 月 9 日 上午 10:15](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-165)

            博主，返回的信息是三个不同登录时间 (我登录了三次了) 的 info， 后面都是跟的 starting server at 0.0.0.0:8100。。然后怎么做？感谢博主!

            [回复](#comment-165)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 9 日 上午 10:28](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-166)

                你在公众号截图给我看下吧 公众号搜 flyzy 小站

                [回复](#comment-166)
188.  ![](https://cdn.v2ex.com/gravatar/d6216d348ee074e4661a37376b3637ac?s=50&d=mm&r=g) <cite class="fn">蛤蛤蛤</cite>说道： [2018 年 2 月 9 日 上午 4:17](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-156)

    请问我搭好服务器之后用 shadowsocks 能连接上 但是显示 ssl 握手超时 是什么情况

    [回复](#comment-156)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 9 日 上午 9:37](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-158)

        你是用的 443 端口吗？换个端口试试

        [回复](#comment-158)
        1.  ![](https://cdn.v2ex.com/gravatar/d6216d348ee074e4661a37376b3637ac?s=50&d=mm&r=g) <cite class="fn">蛤蛤蛤</cite>说道： [2018 年 2 月 9 日 上午 10:05](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-164)

            换了好几个端口好像也不行啊 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)

            [回复](#comment-164)
            1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 2 月 9 日 上午 10:28](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-167)

                你在公众号截图给我看下吧 公众号搜 flyzy 小站

                [回复](#comment-167)
189.  ![](https://cdn.v2ex.com/gravatar/58f9b8b95df28e9566f53fce800f3162?s=50&d=mm&r=g) <cite class="fn">留个言感谢</cite>说道： [2018 年 1 月 31 日 下午 12:59](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-105)

    感谢博主一步一步的截图，全部照着粘贴就搞定了 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cowboy.png) 别的地方看了一早上也没弄好，打赏了点给博主喝茶 ![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/biggrin.png)

    [回复](#comment-105)
190.  ![](https://cdn.v2ex.com/gravatar/b41c64d8869c356976b67f01046b0665?s=50&d=mm&r=g) <cite class="fn">桥桥</cite>说道： [2018 年 1 月 22 日 下午 8:04](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-69)

    博主，你好，请假问题：第一次开启 BBR 成功，但是 vultr IP 好像被封啦，打不开。 最近两次开启 BBR 总是失败，net.ipv4.tcp_available_congestion_control = cubic reno

    [回复](#comment-69)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 1 月 22 日 下午 9:27](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-70)

        ip 被封了可以直接用 snapshot 功能的~ [Vultr 的 Snapshots 快照](https://www.flyzy2005.com/vps/snapshot-vultr)。你给我这个信息我也不知道问题在哪里

        [回复](#comment-70)
191.  ![](https://cdn.v2ex.com/gravatar/24fbf701f88507c70abaa88aee78b4db?s=50&d=mm&r=g) <cite class="fn">诶咯威</cite>说道： [2018 年 1 月 21 日 上午 1:33](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-58)

    您好 ，我在 Vultr 上建立了 SS
    但是输入 ssserver -c /etc/shadowsocks.json -d start
    提示 option -d not recognized
    只能用 ssserver -c /etc/shadowsocks.json，一旦断开链接后，就上不了，该怎么解决呢

    [回复](#comment-58)
    1.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 1 月 21 日 上午 9:14](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-59)

        你这个不是跟着我的教程来的吧？不同的安装方式可能参数不一样的

        [回复](#comment-59)
    2.  ![](https://cdn.v2ex.com/gravatar/c5448f138330cd0d96c1d56d93eee594?s=50&d=mm&r=g) <cite class="fn">[flyzy2005](https://www.flyzy2005.com)</cite> 说道： [2018 年 1 月 23 日 上午 9:44](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-71)

        后来我帮别人远程看了下，你这个的原因是 shadowsocks 的版本太老了，以前版本没有 - d 这个选项的

        [回复](#comment-71)
        1.  ![](https://cdn.v2ex.com/gravatar/24fbf701f88507c70abaa88aee78b4db?s=50&d=mm&r=g) <cite class="fn">诶咯威</cite>说道： [2018 年 1 月 27 日 上午 12:25](https://www.flyzy2005.com/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#comment-81)

            非常感谢第二次回复：） 我把服务器重置了，按着你的教程搞定了~！谢谢你！

            [回复](#comment-81)

<script type="text/javascript" language="javascript">function grin(tag) { var myField; tag = ' ' + tag + ' '; if (document.getElementById('comment') && document.getElementById('comment').type == 'textarea') { myField = document.getElementById('comment'); } else { return false; } if (document.selection) { myField.focus(); sel = document.selection.createRange(); sel.text = tag; myField.focus(); } else if (myField.selectionStart || myField.selectionStart == '0') { var startPos = myField.selectionStart; var endPos = myField.selectionEnd; var cursorPos = endPos; myField.value = myField.value.substring(0, startPos) + tag + myField.value.substring(endPos, myField.value.length); cursorPos += tag.length; myField.focus(); myField.selectionStart = cursorPos; myField.selectionEnd = cursorPos; } else { myField.value += tag; myField.focus(); } }</script>

#### 发表评论 <small>[取消回复](/fan-qiang/shadowsocks/install-shadowsocks-in-one-command/#respond)</small>

<form action="https://www.flyzy2005.com/wp-comments-post.php" method="post" id="commentform" class="comment-form">

电子邮件地址不会被公开。 必填项已用 * 标注

[![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/razz.png)](javascript:grin(':razz:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/evil.png)](javascript:grin(':evil:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/exclaim.png)](javascript:grin(':exclaim:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/smile.png)](javascript:grin(':smile:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/redface.png)](javascript:grin(':redface:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/biggrin.png)](javascript:grin(':biggrin:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/surprised.png)](javascript:grin(':surprised:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/eek.png)](javascript:grin(':eek:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/confused.png)](javascript:grin(':confused:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/idea.png)](javascript:grin(':idea:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/lol.png)](javascript:grin(':lol:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mad.png)](javascript:grin(':mad:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/twisted.png)](javascript:grin(':twisted:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/rolleyes.png)](javascript:grin(':rolleyes:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/wink.png)](javascript:grin(':wink:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cool.png)](javascript:grin(':cool:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/arrow.png)](javascript:grin(':arrow:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/neutral.png)](javascript:grin(':neutral:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cry.png)](javascript:grin(':cry:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/mrgreen.png)](javascript:grin(':mrgreen:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/drooling.png)](javascript:grin(':drooling:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/cowboy.png)](javascript:grin(':cowboy:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/persevering.png)](javascript:grin(':persevering:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/symbols.png)](javascript:grin(':symbols:')) [![](https://www.flyzy2005.com/wp-content/themes/Kratos/images/smilies/shit.png)](javascript:grin(':shit:'))

<textarea class="form-control" id="comment" placeholder=" " if(event.ctrlkey){if(event.keycode="=13){document.getElementById('submit').click();return" false}};"=""></textarea><label for="math" style="margin-top: 15px">请输入 _7 + 3 = ?_ 的计算结果：</label> <input class="form-control" type="text"> <input type="hidden"> <input type="hidden"><input class="form-control" placeholder="昵称" id="author">*<input class="form-control" placeholder="邮箱" id="email">*<input class="form-control" placeholder="网站" id="url">

<input> <input type="hidden"> <input type="hidden">

</form>

</article>