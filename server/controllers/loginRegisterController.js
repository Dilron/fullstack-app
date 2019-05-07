const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {email, firstname, lastname, username, password, profileRef} = req.body
        const {session} = req
        let emailTaken = await db.checkEmail({email})
        emailTaken = +emailTaken[0].count
        if (emailTaken !== 0){
            return res.sendStatus(409)
        }
        // let userNameTaken = await db.checkUserName({username})
        // userNameTaken = +userNameTaken[0].count
        // if(userNameTaken !== 0){
        //     return res.sendStatus(409)
        // }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const user = await db.registerUser({
            username,
            hash,
            firstname,
            lastname,
            email,
            profileRef
        })
        session.user = {
            username,
            userId: user[0].user_id
        }
        res.sendStatus(200)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {loginUsername : username} = req.body
        const {session} = req
        try{
            let user = await db.login({username})
            session.user = user[0]
            let authenticated  = bcrypt.compareSync(req.body.loginPassword, user[0].password)
            if(authenticated){
                return res.status(200).send({authenticated, userId: user[0].login_id})
            } else {
                throw new Error(401)
            }
        }catch(err){
            return res.sendStatus(401)
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}