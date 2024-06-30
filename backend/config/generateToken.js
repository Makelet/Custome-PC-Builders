import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    // console.log(id);
    return jwt.sign(
        {
            id
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d"
        }
    )
}

export default generateToken;