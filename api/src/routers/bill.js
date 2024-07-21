const router=require('express').Router()

const bill=require('../controllers/bill')

router.route('/')
.post(bill.create)
.get(bill.list)


router.route('/:id')
.put(bill.update)
.get(bill.read)
.delete(bill.delete)





module.exports=router