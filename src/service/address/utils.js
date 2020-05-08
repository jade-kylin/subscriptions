import { address } from './address'
import { execute } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
function request(config) {
  config = Object.assign({}, {
    url: '',
    body: undefined,
    method: 'POST',
    hasCert: false,
    isJson: true,
    isBlob: false,
    hasHeader: true,
    token: null,
  }, config)
  let elements = {
    method: config.method,
    body: config.body,
    headers: undefined
  }
  if (config.hasHeader) {
    if (config.token) {
      elements.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'authorization': `Bearer ${config.token}`
      }
    } else {
      elements.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }
  }
  if (config.hasCert) {
    // elements.headers.Authorization = fixedData.token
  }
  return (
    fetch(config.url, elements)
      .then((response) => {
        if (!response.ok) {
          let error = new Error(response.statusText || 'Something bas happen')
          error.response = response
          throw error
        }
        if (config.isBlob) return response.blob()
        if (config.isJson) return response.json()
        return response.text()
      }).then(jsonText => {
        return jsonText
      })
  )
}

function login(loginInfo, returnFun, errFun, errMessage) {
  request({
    url: `${address.authUrl}login`,
    body: JSON.stringify(loginInfo),
  }).then(res => {
    returnFun(res)
  }).catch(err => {
    if (err.response.status === 400) {
      return err.response.json()
    }
    errFun(err)
  }).then(res => {
    errMessage(res)
  })
}
function register(signUpInfo, returnFun, errFun, errMessage) {
  request({
    url: `${address.authUrl}signup`,
    body: JSON.stringify(signUpInfo)
  }).then(res => {
    returnFun(res)
  }).catch(err => {
    if (err.response.status === 400) {
      return err.response.json()
    }
    errFun(err)
  }).then(res => {
    errMessage(res)
  })
}
function email(emailInfo, returnFun, errFun) {
  request({
    url: address.emailUrl,
    body: JSON.stringify(emailInfo),
  }).then(res => {
    returnFun(res)
  }).catch(err => {
    errFun(err)
  })
}
function setNewPassword(newPasswordInfo, returnFun, errFun, errMessage) {
  request({
    url: `${address.authUrl}modifyPassowrd`,
    body: JSON.stringify(newPasswordInfo),
  }).then(res => {
    returnFun(res)
  }).catch(err => {
    console.log(err)
    if (err.response) {
      if (err.response.status === 400) {
        return err.response.json()
      }
    }
    errFun(err)
  }).then(res => {
    errMessage(res)
  })
}
function socketData(wsUrl, SUBSCRIBE_QUERY, token) {
  let fun = new Promise((resolve) => {
    const client = new SubscriptionClient(
      wsUrl,
      {
        reconnect: true,
        connectionParams: {
          headers: {
            Accept: 'application/json',
            ContentType: 'application/json;charset=UTF-8',
            authorization: `Bearer ${token}`,
          }
        }
      }, WebSocket
    )
    const link = new WebSocketLink(client)
    // 使用推送
    const subscriptionClient = execute(
      link,
      {
        query: SUBSCRIBE_QUERY,
      })

    subscriptionClient.subscribe(response => {
      resolve(response)
    }, (err) => {
      if (err.message === 'cannot start as connection_init failed with : Could not verify JWT: JWTExpired') {
        resolve('token过期')
      }
    })
  })
  return fun
}



export {
  request,
  login,
  email,
  register,
  setNewPassword,
  socketData,
}