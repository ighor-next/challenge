const logoutUser = () => {
  Cookies.remove('token');
  window.location.href = '/login';
};

export default logoutUser;
