function authenticate(req, res, next) {
  if (req.originalUrl === '/pluraltask/register') {
    req.user = 'dev_willyy';
    next();
  } else {
    res.send('Middleware is faulty');
  }
}

export { authenticate };
