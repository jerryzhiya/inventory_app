function adminCheck(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  // Option A: just send text
  return res.status(403).send('Forbidden: Admin Only');

  // Option B: render an error view
  // return res.status(403).render('error', { message: 'Forbidden: Admin Only' });
}

export default adminCheck;