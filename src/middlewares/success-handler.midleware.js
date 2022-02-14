module.exports = function(req, res, next) {
  const oldSend = res.send
  res.send = function(data) {
    const message = {
      payload: JSON.parse(data),
      status: {
        success: true,
        code: res.statusCode || 200,
        message: 'Operation successful'
      }
    }
    res.send = oldSend
    return res.send(message)
  }
  next()
};