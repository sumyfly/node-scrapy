import * as fs from 'fs'

export const fsUtils = {
  isExits(path) {
    console.warn('path', path)
    fs.stat(path, (err, stat) => {
      console.warn('xxx', err, stat)
      if (err == null) {
        if (stat.isDirectory()) {
          //directory
          return true
        } else if (stat.isFile()) {
          //file
          return true
        } else {
          return false
        }
      } else {
        console.log('isExists err:' + err)
        return false
      }
    })
  }


}
