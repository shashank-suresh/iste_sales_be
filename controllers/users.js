import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

export const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({email})
        if (!existingUser) return res.status(404).json({message: "User doesn't exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
        }, 'oVzgxmDXFR6OEutq9e8iQFOIyedDpURD', {expiresIn: "1h"})

        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(404).json({message: "User already exists"})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: result._id,
            email: result.email
        }, 'oVzgxmDXFR6OEutq9e8iQFOIyedDpURD', {expiresIn: "1h"})

        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}