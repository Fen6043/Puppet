import express from 'express'
import { Pool } from 'pg'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const connectResult = dotenv.config()
const router = express.Router()

const pool = new Pool({
  connectionString : process.env.DBSTRING
});

function checkToken(req,res,next){
  //console.log(req.cookies)
  const token = req.cookies.token

  if(!token){
    console.log("no token")
    return res.status(401).json({message:"invalid token",success:false})
  }

  try{
    req.user = JWT.verify(token,process.env.JWT_SECRET)
    //console.log(req.user)
    next()
  }
  catch{
    console.log("token failed")
    res.status(401).json({message:"invalid token",success:false})
  }
}

router.get("/",async (req,res) => {
    const result = await pool.query("Select * from parts")
    //console.log(result.rows)
})

router.post("/addParts",checkToken,async (req,res)=>{
  try {
    const parts = req.body
    const userID = req.user.user_id
    await pool.query("Delete from parts where user_id = $1",[userID])
    for (const key in parts)
    {
      //console.log("key - ",key,"parts - ",parts[key])
      await pool.query("Insert into parts(user_id,component,part_name) values($1,$2,$3)",[userID,key,parts[key]])
    }
    console.log("inserted")
    res.json(true)
  } catch (error) {
    res.json(false)
  }
})

router.get("/getParts",checkToken,async (req,res)=>{
  const ID = req.user.user_id
  //console.log(ID)
  const returnObject = {}
  const results = await pool.query(`select * from parts where user_id = ${ID}`)
  for (const result of results.rows){
    returnObject[result.component] = result.part_name
  }
  //console.log(returnObject)
  res.json(JSON.stringify(returnObject))
})

router.get("/checkUser", async (req,res)=>{
  const username = req.query.username
  const userIdRow = await pool.query("Select user_id from users where user_name = $1",[username])
  //console.log(userIdRow.rowCount)
  if (userIdRow.rowCount > 0) {
    res.json(false)
  }
  else{
    res.json(true)
  }
})

router.post("/addUser",async (req,res)=>{
  const {username,password} = req.body
  const hashpassword = await bcrypt.hash(password,10)
  const result1 = await pool.query("Select MAX(user_id) AS max_user_id FROM users")
  const maxUserID = result1.rows[0].max_user_id ? result1.rows[0].max_user_id + 1 : 1000
  const result2 = await pool.query("Insert into users(user_id,user_name,password) values($1,$2,$3)",[maxUserID,username,hashpassword])
  if(result2.rowCount > 0){
    res.json(true)
  }
  else
    res.json(false)
})

router.post("/loginUser",async (req,res)=>{
  const {username,password} = req.body
  const userResult = await pool.query("select user_id,password from users where user_name = $1 LIMIT 1",[username])
  if(userResult.rowCount <= 0){
    return res.json(false)
  }
  const hashPass = userResult.rows[0].password
  const isMatch = await bcrypt.compare(password,hashPass)
  if(isMatch){
    const token = JWT.sign({user_id:userResult.rows[0].user_id},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.cookie("token",token,{httpOnly:true, sameSite:'lax',secure:process.env.NODE_ENV === 'production',maxAge:3600000})
    res.json(true)
  }
  else
    res.json(false)
})

router.get("/checkLogin",checkToken,(req,res)=>{
  res.status(200).json({success:true})
})

router.post("/logoutUser",(req,res)=>{
  try{
    res.clearCookie("token",{httpOnly:true, sameSite:'lax',secure:process.env.NODE_ENV === 'production'})
    res.status(200).json({success:true})
  }
  catch(err){
    console.log(err)
    res.status(500).json({success:false})
  }
})

export default router