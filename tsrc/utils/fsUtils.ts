import * as fs from 'fs'
import * as pathFun from 'path'

export const fsUtils = {
  isExits(path) {
    return new Promise((resolve, reject) => {

      fs.stat(path, (err, stat) => {
        if (err == null) {
          if (stat.isDirectory()) {
            resolve(true)
          } else if (stat.isFile()) {
            resolve(true)
          } else {
            resolve(false)
          }
        } else {
          console.log('fsUtils.isExists err: ' + err)
          resolve(false)
        }
      })
    })
  },

  // the result is a Promise
  makeDir(pathName: string) {

    const _makeDir = async (path, callback) => {
      const _bIsExits = await fsUtils.isExits(path)

      if (_bIsExits) {
        // final return value, so it's a Promise come from callback
        return callback()
      } else {
        return _makeDir(pathFun.dirname(path), () => {
          return new Promise((resolve, reject) => {
            fs.mkdir(path, async err => {
              const r = await callback() // need await to wait for the callback finished.
              if (!err) {
                console.warn('fsUtils.makeDir err', err)
                resolve(true && r)
              } else {
                resolve(false && r)
              }
            })
          })

        })
      }
    }

    return _makeDir(pathName, () => Promise.resolve(true))
  }


}
