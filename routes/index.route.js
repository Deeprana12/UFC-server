const router  = require('express').Router()
const express = require('express')

router.get('/',(req,res,next)=>{
    res.send('h')
})

module.exports = router;