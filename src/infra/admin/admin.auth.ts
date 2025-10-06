export function createAuthAdmin() {
  return {
    authenticate: (email: string, _password: string) => {
      return { email: email };
    },
    cookieName: 'secret-cookie',
    cookiePassword: 'cookie-password',
  };
}
