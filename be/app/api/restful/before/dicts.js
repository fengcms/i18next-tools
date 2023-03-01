module.exports = {
  put (ctx, { params }) {
    console.log(params)
    params.time = +new Date()
    return params
  }
}
