const express = require('express')
const app = express()
const port = 5000

app.listen(port, () => {
  console.log(`Server is running at ${ port }`)
})

// 实现CORS(跨域)
app.all("*", (req, res, next) => {
	// 配置跨域请求头
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Content-type, Accept, X-Access-Token, X-Key"
	);
	if ("OPTIONS" == req.method) res.status(200).end();
	else next();
});

// app.get('/', (req, res) => {
//   res.send('test success')
// })
app.post('/phonelocation', (req, res) => {
  setTimeout(() => {
    res.json({
      success: true,
      obj: {
        province: '江苏',
        city: '无锡'
      }
    })
  }, 3000)
})

app.post('/topup', (req, res) => {
  setTimeout(() => {
    res.json({
      success: true,
      obj: ['20元', '30元', '40元']
    })
  }, 2000);
})