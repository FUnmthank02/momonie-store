import Users from "@/models/users"
import jwt  from "jsonwebtoken"

export async function handleLogin(req, res) {
    try {
        const bodyData = req.body
        const user = await Users.findOne({username: bodyData.username})
        if (!user) return res.status(404).json({ error: 'User not found' })

        const comparePassword = (bodyData.password === user.password)

        if(!comparePassword) 
            res.status(404).json({ error: 'Username or password is wrong!'})
            
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE +'m'})
        res.status(200).json({ message: 'Login successfully', token: token})

    } catch (e) {
        res.status(404).json({ error: 'Error when fetching data' })
    }
}
