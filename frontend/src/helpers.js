import store from './redux/store';
import {clearUser} from './redux/actions';
import docCookies from 'doc-cookies';
import { TOKEN, EMAIL } from './constants/cookies';

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
}