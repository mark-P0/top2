/*
 */

const userLogin = prompt('Enter a login: ');

console.log(userLogin);

if (userLogin === 'Admin') {
  const userPassword = prompt('Enter your password: ');

  if (userPassword === 'TheMaster') {
    alert('Welcome!');
  } else if (!userPassword) {
    alert('Canceled');
  } else {
    alert('Wrong password');
  }
} else if (!userLogin) {
  alert('Canceled');
} else {
  alert("I don't know you");
}
