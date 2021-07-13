import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  
  crKeys = { crVike: 'e84ad660c4721ae0e84ad660c4721ae0', crSlke: "U0BMVCZLRVk=", crPake: "UEBAU3cwcmQ=" };

  perpareCryptoData() {
      var iv = CryptoJS.enc.Hex.parse(this.crKeys.crVike);
      //Encoding the Password in from UTF8 to byte array
      var Pass = CryptoJS.enc.Utf8.parse(window.atob(this.crKeys.crPake));
      //Encoding the Salt in from UTF8 to byte array
      var Salt = CryptoJS.enc.Utf8.parse(window.atob(this.crKeys.crSlke));
      var iterations = 1000;
      //Creating the key in PBKDF2 format to be used during the decryption
      var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: iterations });
      return { iv: iv, key128Bits1000Iterations : key128Bits1000Iterations};
  }

  encrptData(data: any) {
      var cy = this.perpareCryptoData();
      var encrypted = CryptoJS.AES.encrypt(data, cy.key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: cy.iv, padding: CryptoJS.pad.Pkcs7 });
      return encrypted.toString();
  }

  decrptData(data: any) {
      var cy = this.perpareCryptoData();
      var clib = CryptoJS.lib;
      //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
      var cipherParams = clib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(data)
      });

      //Decrypting the string contained in cipherParams using the PBKDF2 key
      var decrypted = CryptoJS.AES.decrypt(cipherParams, cy.key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: cy.iv, padding: CryptoJS.pad.Pkcs7 });
      return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
