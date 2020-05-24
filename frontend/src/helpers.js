import store from './redux/store';
import {clearUser} from './redux/actions';
import docCookies from 'doc-cookies';
import { TOKEN, EMAIL } from './constants/cookies';
import {URL} from './constants/API';

// Taken from https://stackoverflow.com/questions/8064691/how-do-i-pass-along-variables-with-xmlhttprequest
export const formatParams = (params) => {
    return "?" + Object
    .keys(params)
    .map(function(key){
      return key+"="+encodeURIComponent(params[key])
    })
    .join("&");
}

export const clearSession = () => {
        store.dispatch(clearUser());
        docCookies.removeItem(TOKEN);
        docCookies.removeItem(EMAIL);
        docCookies.removeItem('id');
}

export const sendRequest = (request, method, url, params, async=true) => {
  const token = docCookies.getItem(TOKEN);

  if (method === "POST") {
    console.log("POSTing");
    if(async) {
      request.open(method, URL + url);
    }
    else {
      request.open(method, URL + url, false);
    }
    request.setRequestHeader("Authorization", token);
    console.log(JSON.stringify(params));
    request.send(JSON.stringify(params));
  }
  else {
    console.log("not POSTing");
    if (async) {
      request.open(method, URL + url + formatParams(params));
    }
    else {
      request.open(method, URL + url + formatParams(params), false);
    }
    request.setRequestHeader("Authorization", token);
    request.send();
  }
}