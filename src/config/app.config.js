const morganFormat =
  "● [:date[iso]] [:remote-addr :remote-user] :method :url HTTP/:http-version :status :response-time ms - :res[content-length]\n";
const nodeEnvironment = process.env.NODE_ENV || "development";
const port = process.env.PORT || 0;

export { morganFormat, nodeEnvironment, port };
