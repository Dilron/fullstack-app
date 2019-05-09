const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {registerEmail : email, 
            registerFirstname :firstname,
            registerLastname : lastname,
            registerUsername : username,
            registerPassword : password,
            registerProfileRef : profileRef} = req.body
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
        res.status(200).send({userId: user[0].user_id})
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {loginUsername : username} = req.body
        const {session} = req
        console.log('log session: ', session)
        try{
            let user = await db.login({username})
            console.log('log user: ', user)
            session.user = {
                username: user[0].username,
                userId: user[0].user_id
            }
            console.log('log session after user call: ', session)
            let authenticated  = bcrypt.compareSync(req.body.loginPassword, user[0].password)
            if(authenticated){
                return res.status(200).send({authenticated,
                    userId: user[0].login_id,
                    firstname: user[0].firstname,
                    lastname: user[0].lastname,
                    profileRef: user[0].profile_ref})
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
    },
    user
}