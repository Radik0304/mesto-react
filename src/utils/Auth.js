export const BASE_URL= 'https://auth.nomoreparties.co/';

//проверка ответа от сервера
function checkResponse(res){ 
  if(res.ok){
    return res.json();
  }
  return Promise.reject(res.status)
}

//регистрация
export const register = (password, email) => { 
  return fetch(`{BASE_URL}/signup`, {
    method:'POST',
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({
      "password": password,
      "email": email
    })

  })
  .then(checkResponse)
}

//авторизация
export const login =(password, email) => {
  return fetch(`{BASE_URL}/signin`, {
    method:'POST',
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({
      "password": password,
      "email": email
    })

  })
  .then(checkResponse)
}

//проверка токена
export const token =(token) => {
  return fetch(`{BASE_URL}/users/me`, {
    method:'GET',
    headers: {
      "Content-Type": "application/json" , 
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(checkResponse)
}

