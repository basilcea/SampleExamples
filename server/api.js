const express = require('express');
const dotenv = require('dotenv');
const https=require("https");
const jwt = require('jsonwebtoken')

dotenv.config();

const cors = require('cors');
const server = express();

server.use(cors());

server.use(express.json());


server.get('/', (req, res) => {
  return res.json({ message: 'API is up 🚀' });
});
server.get('/login',async(req,res) =>{

  const {code} = req.query
  const url=`https://slack.com/api/oauth.access?client_id=${process.env.REACT_APP_client_id}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&code=${code}`;
  const reqt = https.request(url, res=>{
    res.on('data', async (chunk) => {
      const data = JSON.parse(chunk)
      //check if user already exists
      // let user = await Users.findBy(newUser.slack_id);
      // if (!user) {
      //   user = await Users.insert({
      //     userId: data.user.user_id,
      //     name:data.user.name,
      //     email:data.user.email,
      //     image:data.user.image_192,
      //   });
      // }
        // await generateToken(res, user.id, user.full_name);
        // console.log(data)
       
    });
    // reqt.end()
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=`+data.access_token)
    
  });

});


const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log("Server is running")
})

module.exports = server;