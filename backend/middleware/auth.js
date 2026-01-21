const basicAuth = require("basic-auth")

module.exports = (req, res, next) => {
  const user = basicAuth(req)

  if (!user || user.name !== process.env.AUTH_USER || user.pass !== process.env.AUTH_PASS) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  next()
}
