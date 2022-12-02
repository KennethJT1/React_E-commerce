import User from "../models/users.js";
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../helpers/auth.js'


//Register user
export const register = async(req, res) => {
    try {
        //destructure req.body
        const { name,
            email, 
            password } = req.body;

            //all field require validation
            if(!name.trim()) {
                return res.json({error: "Name is required"});
            };

            if(!email) {
                return res.json({error: "Email is taken"});
            };

            if(!password || password.length < 6) {
                return res.json({error: "Password must be at least 6 character"});
            }
 
       //check if email exist
       const existingUser = await User.findOne({email});
       if(existingUser) {
        return res.json({error: "Email already exist"})
       }

    //hash password
    const hashpassword = await hashPassword(password);

    const user = await new User({
        name,
        email, 
        password: hashpassword
    });
    user.save();

    //create sign jwt
    const token = jwt.sign({_id: user._id}, process.env.jwt_secret, {expiresIn: '7d'})

    //send response
    res.status(201).json({
        user: {
            name: user.name,
            email:user.email, 
            role:user.role, 
            address:user.address
        },
        token
    })



    } catch (error) {
        // res.status(500).json({
        //     Error: "Internal server Error",
        //     route: "/users/signup",
        //   });
       console.log(error) 
    }
};

//login user
export const login = async(req, res) => {
    try {
        //destructure req.body
        const { email, 
            password } = req.body;

            //all field require validation
             if(!email) {
                return res.json({error: "Email is wrong"});
            };

            if(!password || password.length < 6) {
                return res.json({error: "Password must be at least 6 character"});
            }
 
       //check if email exist
       const user = await User.findOne({email});
       if(!user) {
        return res.json({error: "User not found"})
       }

    //compare password
    const comparepassword = await comparePassword(password, user.password);

    if(!comparepassword) {
        return res.json({error: "Wrong password"});
    }

    //create sign jwt
    const token = jwt.sign({_id: user._id}, process.env.jwt_secret, {expiresIn: '7d'})

    //send response
    res.status(201).json({
        user: {
            name: user.name,
            email:user.email, 
            role:user.role, 
            address:user.address
        },
        token
    })



    } catch (error) {
       console.log(error) 
    }
};

export const secret = async(req, res)=> {
    res.json("That's so great");
}