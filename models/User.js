"use strict";
class User {
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
  }
  async getData(url) {
    const data = await fetch(url)
    .then(res=>res.json())
    return data;
  }
  
}


