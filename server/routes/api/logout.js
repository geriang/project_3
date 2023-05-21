const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../../services/blacklistedTokenService')

const TokenSvc = new BlacklistedToken()

router.post('/', async(req,res)=>{
    console.log("console log req.cookies", req.cookies)
    const refreshToken = req.cookies.refreshToken;
    console.log("refreshToken from payload for logging out", refreshToken)
    if(!refreshToken){
        res.sendStatus(401)
    }else{
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err,user)=>{
            if(err){
                res.sendStatus(401)
            }else{
                const blacklistedToken = await TokenSvc.createNewBlToken(refreshToken)
                res.cookie('refreshToken', "", {
                    httpOnly: true,
                    // secure: false,
                    // sameSite: 'Lax',
                    // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
                    // additional options like secure: true, sameSite: 'None' for secure and cross-site cookies
                  });
                res.send({
                    'message': `logged out, ${blacklistedToken} created` 
                })
            }
        })  
    }
})

module.exports = router;