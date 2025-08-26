export async function fakelogin(email: string, password: string): Promise<string> {
  if (email === "text@exemple.com" && password === '123') {
    return Promise.resolve('fake-jwt-token');
  }
  return Promise.reject('Invalid credentials');
}