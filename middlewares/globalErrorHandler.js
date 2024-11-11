export const globalErrorHandler = (err, req, res, next) => {
  //stack
  // message
  const stack = err?.stack;
  const message = err?.message;

  res.status(err?.statusCode || 500).json({
    stack,
    message,
  });
};

// Url not found;
// 404 handler
export const notFound = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  next(err);
};
