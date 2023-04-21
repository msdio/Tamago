interface CookieProps {
  key: string;
  value: string;
  expiration?: number;
}

export const setCookie = ({ key, value, expiration = 0 }: CookieProps) => {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + expiration);

  const expirationTime = expiration == 0 ? '' : '; expires=' + expirationDate.toString();

  const cookieValue = value + expirationTime + '; path=/;';
  document.cookie = key + '=' + cookieValue;
};
