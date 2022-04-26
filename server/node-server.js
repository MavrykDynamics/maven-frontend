import http from 'http'
import { JSDOM } from 'jsdom'
import url from 'url'
import { parseString } from 'xml2js'

const port = process.env.PORT || 3002

const server = http.createServer().listen(port)

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Content-Type',
}

server.on('request', async (req, res) => {
  try {
    if (req.method === 'GET') {

      if(req.url === '/') {
         res.writeHead(200, headers)
         res.end(JSON.stringify({api: '0.1.0'}))
      }

      if(req.url === '/medium-feed') {
        const resFetch = await fetch('https://medium.com/feed/@Mavryk_Finance')
        if (resFetch.ok) {
          const xmldata = await resFetch.text()
          parseString(xmldata, function (err, results) {
            if (results?.rss?.channel?.[0]?.item) {
              const feed = results.rss.channel[0].item
              const data =
                Array.isArray(feed) && feed.length
                  ? feed.map((item, i) => {
                      const dom = new JSDOM(item['content:encoded'])
                      const description = dom.window.document.querySelector('p').textContent || ''
                      const img = dom.window.document.querySelector('img').src || ''
                      return {
                        id: i,
                        title: item.title?.[0] || '',
                        link: item.link?.[0] || '',
                        description,
                        img,
                      }
                    })
                  : []
              res.writeHead(200, headers)
              res.end(JSON.stringify(data))
            } else {
              throw Error('Can not convert xml to json')
            }
          })
        } else {
          throw Error('Can not get data')
        }
      }
    }
  } catch (error) {
    res.writeHead(400, headers)
    res.end()
  }
})

server.on('listening', () => {
  console.log(`Listening on ${port}......`)
})
