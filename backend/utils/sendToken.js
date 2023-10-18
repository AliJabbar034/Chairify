const sendToken = async (user, statusCode, res) => {
  const token = await user.getjwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 86400000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
   

    user,
  
  });
};

export default sendToken;
