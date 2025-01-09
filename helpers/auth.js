const removeAuth = () =>{
    localStorage.removeItem('userData')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('code');
    localStorage.removeItem('activeTab');
    localStorage.removeItem('activeTab2');
    
  }
  export {removeAuth}