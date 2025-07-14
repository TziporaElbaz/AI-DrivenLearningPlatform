// מידלוור ולידציה בסיסי – בודק שכל שדות החובה קיימים בבקשה
export default function validateRequest(requiredFields) {
  return (req, res, next) => {
    const missing = requiredFields.filter(field => !(field in req.body));
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
    }
    next();
  };
}
