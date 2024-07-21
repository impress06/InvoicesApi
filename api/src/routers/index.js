const router=require('express').Router()
const userRouter=require('./user')
const authRouter=require('./auth')
const tokenRouter=require('./tokens')
const resetRouter=require('./resetpassword')
const invicesRouter=require('./invoices')
const billRouter=require("./bill")

router.use('/user',userRouter)
router.use('/auth',authRouter)
router.use('/token',tokenRouter)
router.use('/reset',resetRouter)
router.use('/bill',billRouter)
router.use('/invoice',invicesRouter)


module.exports=router