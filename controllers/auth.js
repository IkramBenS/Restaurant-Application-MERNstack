const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire} = require ('../config/keys');

exports.signupController = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const user = await User.findOne({ email }); /////////////mail existant
        if (user ) {
            return res.status(400).json({
                errorMessage: 'Email already exists',  ////////display errorMsg
            });

        }
        const newUser = new User();    ////////si non creation nouveau user
        newUser.username = username;
        newUser.email = email;

        const salt = await bcrypt.genSalt(10);
        //// pr le pass on a utilisé la fct salt de la biblio bcrypt pour le hachage du password
        newUser.password = await bcrypt.hash(password, salt); 
        await newUser.save();  /////// sauvegarde dans la base de donnée

        res.json({
            successMessage : 'Registration success . Please signin.',
        });

    }catch (err) {
        console.log('signupController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};

/***************signin controller *********************/
exports.signinController = async (req, res) => {
   const { email, password} =req.body;

   try {
       const user = await User.findOne({ email });
       if (!user) {
           return res.status(400).json({
               errorMessage: 'Invalid credentials',
           });
       }


       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
           return res.status(400).json({
               errorMessage: 'Invalid credentials',
           });

       }

       const payload = {
           user: {
               _id: user._id,
           },
       };

       await jwt.sign(payload, jwtSecret, { expiresIn : jwtExpire}, (err, token) => {
        if (err) console.log('jwt error:', err);
        const { _id, username, email, role } = user;

        res.json ({
            token,
            user: { _id, username, email, role }
        });
       });


   } catch (err) {
     console.log('signinController error: ', err);
     res.status(500).json({
         errorMessage: 'Server error',
     });
   }
    
};