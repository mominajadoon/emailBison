module.exports = (req, res, next) => {
  if (!req.headers["Authorization"]) {
    return res.status(401).json({ error: "Unauthorized, token missing" });
  }
  next();
};
