> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://www.cnblogs.com/cathsfz/archive/2012/06/19/2553431.html

最近看《[REST in Practice](http://www.amazon.com/gp/product/B0046RERXY/ref=as_li_ss_tl?ie=UTF8&tag=baindo-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B0046RERXY)》，发现 HTTP 如此之多的状态码都有各自的含义，要准确使用并不难，但现实当中很少人能够做得到。大多数人熟悉的状态码就那几个，平时也不会去阅读 RFC 2616，结果反复使用的也就是那几个状态码。其实很多 REST 中可能遇到的情况，在 HTTP 状态码中都已经有考虑到，不需要自己去发明新的状态码，也不需要在 header 或者 body 自定义错误信息。

在说状态码之前，首先建议大家还是先阅读一下 [RFC 2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) 中的相关章节，看看已有的状态码描述都是什么。我相信有部分状态码是你看了描述也不知道用来干什么的，这时候就需要有更具体的例子来告诉你怎么用了。（我准备详细说的是那些比较少人知道但又实际上应该被更广泛使用的状态码。）

#### 2xx

##### 200 OK

所有人都知道 `200 OK` 是什么。这估计是最经常被滥用的状态码。很多人在应该使用其它 `2xx` 状态码时都选用了 `200 OK` 来表示。

##### 201 Created

如果你在设计一个 REST API，或者一个 CRUD API，当你使用 `POST`（或者 `PUT`）成功创建一个新的资源后，服务器应该返回 `201 Created` 同时在 header 的 `Location` 字段给出刚刚创建好的这个资源的 URI。

例如说，如果你使用 `POST` 请求通过 `\comments` URI 创建了一个新的评论，那么服务器应该返回 `201 Created`，同时带上形如 `Location: \comments\1234` 的字段表明新创建的评论的 URI。

##### 202 Accepted

如果服务器在接受请求后，需要进行一个异步处理才能有结果，并且觉得不需要让 TCP 连接保持到结果出来再返回，它可以返回 `202 Accepted`，意思是请求已接受，但没有立即可返回的结果。

##### 204 No Content

在一个 REST API 或者 CRUD API 里面，当你使用 `PUT` 成功更新一个资源后，如果服务器完整接受了客户端的更新，没有拒绝也没有额外更新，那实际上是不需要返回任何东西的，因为现在客户端和服务器端已经拥有完全一致的状态。在这种情况下，服务器可以返回 `204 No Content`，同时 body 为空，客户端就知道它的状态已经跟服务器端同步了。

##### 206 Partial Content

断点续传和多线程下载都是通过 `206 Partial Content` 实现的。

请求的 header 必须包含一个 `Range` 字段，表明自己请求第几个字节到第几个字节的内容。如果服务器支持的话，就返回 `206 Partial Content`，然后使用 header 的 `Content-Range` 指明范围，并在 body 内提供这个范围内的数据。

#### 3xx

##### 301 Moved Permanently

永久性重定向。目标由 header 的 `Location` 字段给出，同时 body 中也应该有指向目标的链接。新请求使用的方法应该和原请求的一致。如果用户使用 `HEAD` 和 `GET` 以外的方式发起原请求，客户端在遇到 `301 Moved Permanently` 后应当询问用户是否对新的 URI 发起新请求。

##### 302 Found

临时性重定向。

这应该是浏览器实现最不符合标准的一个状态码了。理论上，除了临时性这一点，`302 Found` 跟 `301 Moved Permanently` 应该是完全一样的。然而实质上，很多浏览器在遇到 `302 Found` 后就会使用 `GET` 去请求新的 URI，而无论原请求使用的是何种方法。由于这种现象的普遍存在，使得这成为了一个与书面标准相违背的事实标准，新的客户端在实现时很难选择应该遵守哪一个标准，所以 RFC 2616 专门新增了 `303 See Other` 和 `307 Temporary Redirect` 两个状态码来消除二义性。

##### 303 See Other

临时性重定向，且总是使用 `GET` 请求新的 URI。

##### 304 Not Modified

如果客户端发起了一个「条件 `GET`」，同时资源确实没被修改过，那么服务器端就应该返回 `304 Not Modified`，同时 body 不包含任何内容。

所谓的「条件 `GET`」，是指 `GET` 的 header 带上了 `If-Modified-Since` 或 `If-None-Match` 字段。这两个 header 就是「条件」，如果条件符合了 `GET` 就应该正常执行，否则就应该返回 `304 Not Modified`，以便告诉客户端它想要请求的资源在上一次请求之后没有被更新过，客户端可以继续使用之前的版本。

##### 307 Temporary Redirect

临时性重定向，且总是使用原请求的方法来进行新请求。

#### 4xx

##### 400 Bad Request

服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。

##### 401 Unauthorized

请求未授权。如果请求 header 没有 `Authorization` 字段，服务器端应该在返回 `401 Unauthorized` 的同时在 header 中用 `WWW-Authorization` 字段指出授权方式，以便客户端带上登录信息重新发起请求。如果 `Authorization` 字段已经存在，则表明登录信息不正确。

##### 402 Payment Required

需要支付。这是一个在任何浏览器中都没有被实现的状态码，仅预留将来使用。

百度曾经有一个部门印过一批背上写着 `402 Payment Require` 的衣服，并且开玩笑说这批衣服最适合在互联网企业员工讨薪时穿。

##### 403 Forbidden

禁止访问。即使使用 `Authorization` 字段提供登录信息也会得到相同的结果。

如果客户端使用 `HEAD` 以外的方法请求，`403 Forbidden` 必须同时在 body 中返回禁止访问的原因。如果原因不能够公开，则应该使用 `404 Not Found`。

##### 404 Not Found

找不到如何与 URI 相匹配的资源。服务器无需指出资源是临时性不存在还是永久性不存在，但如果服务器端知道该资源已经被永久性删除则应该返回 `410 Gone`。

`404 Not Found` 是服务器端在不愿意提供理由的情况下拒绝提供资源的最佳借口。

##### 405 Method Not Allowed

请求的方法被拒绝。

如果你有一个 REST API 或 CRUD API 被设计为只读，那么在遇到 `PUT`、`POST` 或者 `DELETE` 方法时服务器端都应该返回 `405 Method Not Allowed`，同时在 header 的 `Allow` 字段说明允许的方法（如 `GET` 和 `HEAD`）。

##### 409 Conflict

冲突，且需要用户手工解决。

如果你使用 git（或者其他源代码管理软件），你已经知道「冲突」是什么了。`409 Conflict` 通常发生在 `PUT` 请求时，如果要更新的资源已经被其他人更新过了，你再更新就可能产生冲突。

##### 410 Gone

如果服务器端将此资源标记为已被永久性删除，则应该使用 `410 Gone` 而非 `404 Not Found`，其用意在于告诉客户端资源是被有意删除的，而且删除是永久性的，客户端不应该再保留这个 URI 的链接。

举例来说，你有一个 REST API 或 CRUD API 用于向用户提供优惠信息。有一则优惠的 URI 是 `/promotions/1234`，但由于优惠活动已经结束了，所以这一则优惠信息不再有效且应当被永久性删除，那么这时候服务器端就应该让该 URI 永远返回 `410 Gone` 了。

##### 412 Precondition Failed

条件判断失败，操作不会被执行。

在解释 `304 Not Modified` 时提到了「条件 `GET`」的概念，但「条件」本身也可以应用于非 `GET` 请求，这时候如果条件判断失败服务器端就应该返回 `412 Precondition Failed`，同时拒绝执行客户端请求的方法。

条件请求可以被看作是一种乐观锁。它不需要服务器端有任何逻辑判断操作是否存在冲突，服务器端只要记录资源的时间戳（或其它版本信息）即可。

#### 5xx

##### 500 Internal Server Error

最常见的服务器端错误。

##### 503 Service Unavailable

服务器端暂时无法处理请求（可能是过载或维护）。

返回 `503 Service Unavailable` 的意思是当前的状况是临时性的，客户端可以稍后重试。服务器端可以在返回时通过 header 的 `Retry-After` 字段告诉客户端多久后可以重试。如果不提供这个字段的话，客户端应当把 `503 Service Unavailable` 等同于 `500 Internal Server Error` 处理。

#### 总结

在看完这篇文章后，你有发现经常用错的状态码吗？如果有的话，将来在设计 REST API 或 CRUD API 时就应该改过来。由于状态码和 header 字段数目众多，所以我建议一般用户尽可能复用主流的 REST 框架或 CRUD 框架，而不要自己重新实现一遍。

如果你喜欢这篇文章，欢迎[订阅](http://feeds.catchen.me/CatChen/dotNET)或者[捐赠](http://gum.co/BWTR)。如果我有时间的话，我会再写写常见的 header 字段详解。