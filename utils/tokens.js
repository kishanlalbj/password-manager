import jwt from "jsonwebtoken";

const generateAccessToken = (payload, type) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      type === "refresh"
        ? process.env.JWT_REFRESh_SECRET
        : process.env.JWT_ACCESS_SECRET,
      { expiresIn: type !== 'refresh' ? 60 * 60: '7d' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(token);
      }
    );
  });
};

export default generateAccessToken;
