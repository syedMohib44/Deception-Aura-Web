export default function authHeader() {
  const token = localStorage.getItem("token");
  if (token) {
    // for Node.js Express back-end
    return {
      "content-type": "application/json",
      'Authorization': token
    };
  } else {
    return {};
  }
}
