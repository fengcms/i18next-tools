const fs = require('fs')
// const NodeRSA = require('node-rsa')
const forge = require('node-forge')
const { RSA_PRIVATE_KEY_PATH, RSA_PUBLIC_KEY_PATH } = require(':config').KEY

// 公钥加密方法
const encrypt = (str) => {
  return new Promise((resolve, reject) => {
    fs.readFile(RSA_PUBLIC_KEY_PATH, (err, data) => {
      if (err) reject(new Error(err))
      const publicK = forge.pki.publicKeyFromPem(data)
      const res = publicK.encrypt(str, 'RSA-OAEP')
      resolve(res)
    })
  })
}
// 私钥解密方法
const decrypt = (str) => {
  return new Promise((resolve, reject) => {
    fs.readFile(RSA_PRIVATE_KEY_PATH, (err, data) => {
      if (err) reject(new Error(err))
      const privateK = forge.pki.privateKeyFromPem(data)
      try {
        const res = privateK.decrypt(str, 'RSA-OAEP')
        resolve(res)
      } catch (e) {
        reject(new Error(e))
      }
    })
  })
}

module.exports = { encrypt, decrypt }
