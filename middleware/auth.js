import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        let decodedData = jwt.verify(token, 'oVzgxmDXFR6OEutq9e8iQFOIyedDpURD')
        req.userId = decodedData?.id

        console.log(req.userId)

        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth