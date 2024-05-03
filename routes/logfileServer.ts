import path = require('path')
import { Request, Response, NextFunction } from 'express'

module.exports = function serveLogFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    if (!file.includes('/') && !file.includes('..')) {
      res.sendFile(path.resolve('logs/', file))
    } else {
      res.status(403)
      next(new Error('File names cannot contain forward slashes or ".."!'))
    }
  }
}
