import React, {useEffect} from "react";
import axios from "axios";
const urlPar = new URLSearchParams(window.location.search);
const code = urlPar.get('code');

const Auth = () => {
  useEffect(() => {
    async function getAuth() {
      const {userId, name , email , profilePicture} = await axios.get(
        `https://slack.com/api/oauth.access?client_id=${process.env.REACT_APP_client_id}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&code=${code}`
      );
      await axios.post(`${process.env.REACT_APP_SERVER}/login`,{
        userId, name, email, profilePicture , code
      })
    };
    getAuth();
  }, []);

  return <div>loading ...</div>;
};
export default Auth