const handleProfileGet = (req, res, pg) => {
    const { id } = req.params;
    pg.select('*').from('users').where({id}).then(user => {
        if(user.id){
            res.json(user[0]);
        }
        else{
            res.status(400).json('not found')
        }
        
    }).catch(err => res.status(400).json('not found'))
}

export default handleProfileGet;