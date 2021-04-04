import jwt_decode from 'jwt-decode';

const JWTDATA = () => {
    const jwtCode = localStorage.getItem('token');
    if (!jwtCode)
      return null;
    console.log(jwtCode.split(' ')[1]);
    return jwt_decode(jwtCode.split(' ')[1]);
  }

  export {
    JWTDATA
  };