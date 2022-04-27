import http from 'http'
import { JSDOM } from 'jsdom'
import url from 'url'
import { parseString } from 'xml2js'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 3003

const apiMedium = process.env.API_MEDIUM || ''

const server = http.createServer().listen(port)

const writeHeadHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Content-Type',
}
const headers = {
  Authorization: `Bearer ${apiMedium}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Accept-Charset': 'utf-8',
}

server.on('request', async (req, res) => {
  try {
    if (req.method === 'GET') {

      if(req.url === '/') {
         res.writeHead(200, writeHeadHeaders)
         res.end(JSON.stringify({api: '0.1.0'}))
      }

      if (req.url === '/medium-posts') {

        console.log('%c ||||| headers', 'color:yellowgreen', headers);
        // https://github.com/Medium/medium-api-docs#31-users
        const resMe = await fetch('https://api.medium.com/v1/me', { headers })

        // console.log('%c ||||| resMe', 'color:yellowgreen', resMe);
        const me = await resMe.json()
        console.log('%c ||||| me', 'color:yellowgreen', me)

        if (me?.data?.id) {
          //https://github.com/Medium/medium-api-docs#32-publications
          const resPublications = await fetch(`https://api.medium.com/v1/users/${me.data.id}/publications`, { headers })
          const publications = await resPublications.json()
          console.log('%c ||||| publications', 'color:yellowgreen', publications)
          res.writeHead(200, writeHeadHeaders)
          res.end(JSON.stringify(publications?.data))
        } else {
          throw Error('Can not get data')
        }
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
              res.writeHead(200, writeHeadHeaders)
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
