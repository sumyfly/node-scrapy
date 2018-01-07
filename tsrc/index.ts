import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'

import { fsUtils } from './utils/fsUtils'

function requestForHttpContent(url, fileDirName) {
  const fileName = path.basename(url)

  const callback = res => {
    const contentLength = parseInt(res.headers['content-length'])
    const fileBuff: Buffer[] = []

    res.on('data', chunk => {
      const buffer = new Buffer(chunk)
      fileBuff.push(buffer)
    })

    res.on('end', async () => {
      if (isNaN(contentLength)) {
        console.warn(url + 'contentLenght error')
        return
      }

      const totalBuff = Buffer.concat(fileBuff)
      if (totalBuff.length < contentLength) {
        console.warn('error contentLength ')
      }
      if (!(await fsUtils.isExits(fileDirName))) {
        await fsUtils.makeDir(fileDirName)
      }
      fs.appendFile(fileDirName + '/' + fileName, totalBuff, { flag: 'a' }, err => console.warn(err + ':' + fileName))
    })

  }

  return callback
}

function startScrapyTask(url, dirName) {
  const req = http.request(url, requestForHttpContent(url, dirName))
  req.on('error', e => {
    console.log(`http request ${url} error!`, e)
  })
  req.end()
}
//main
startScrapyTask('http://content.battlenet.com.cn/wow/media/wallpapers/patch/fall-of-the-lich-king/fall-of-the-lich-king-1920x1080.jpg', path.resolve('output/img').toString())
