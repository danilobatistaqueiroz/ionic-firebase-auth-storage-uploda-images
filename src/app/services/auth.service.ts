import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async register(cr:Credentials) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, cr.email, cr.password);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(cr:Credentials) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, cr.email, cr.password);
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}

class Credentials {
  constructor(public email:string, public password:string){}
}