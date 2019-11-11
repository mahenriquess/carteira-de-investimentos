const { authSecret } = require('../../.env');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;
const Usuario = require('../models/Usuario');

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    const strategy = new Strategy(params, (payload, done) => {
        Usuario.findOne({where: { id: payload.id}})
            .then(usuario => {
                if(usuario){
                    const {email, id} = usuario;
                    done(null, {id, email});
                }else{
                    done(null, false);
                }
            }).catch(err => done(err,false));
        // .catch(err => done(err,false));
        // app.db('users')
        //     .where({ id: payload.id })
        //     .first()
        //     .then(user => {
        //         if(user){
        //             done(null, { id: user.id, email:user.email });
        //         }else{
        //             done(null, false);
        //         }
        //     })
        //     .catch(err => done(err,false));
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false })
    }

}