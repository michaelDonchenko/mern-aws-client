import cookie from 'js-cookie'

// set in cookie
export const setCookie = (key, value) => {
  if (typeof window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1,
    })
  }
}

// remove from cookie
export const removeCookie = (key) => {
  if (typeof window !== 'undefined') {
    cookie.remove(key)
  }
}

// get from cookie such as stored token
// will be useful when we need to make request to server with auth token
export const getCookie = (key) => {
  if (typeof window !== 'undefined') {
    return cookie.get(key)
  }
}

// set in localstoarge
export const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// remove from localstorage
export const removeLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  setCookie('token', response.data.token)
  setLocalStorage('user', response.data.user)
  next()
}

// access user info from localstorage
export const isAuth = () => {
  if (typeof window !== 'undefined') {
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      } else {
        return false
      }
    }
  }
}

export const logout = () => {
  removeCookie('token')
  removeLocalStorage('user')
}
