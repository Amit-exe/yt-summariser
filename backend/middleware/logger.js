function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    // this runs after response is sent
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );
  });

  next();
}

module.exports = logger;
