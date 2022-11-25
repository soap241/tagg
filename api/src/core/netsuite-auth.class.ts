import * as path from 'path'
import  axios from 'axios'
import * as fs from 'fs'
import * as qs from 'qs'
import * as jwt from 'jsonwebtoken'
import { ServerData  } from '../db/models/ServerData'

export class NetsuiteClass {

    private async getAppPath(){
      if (true) {
        return path.resolve('.'); //use when testing in dev
        } else {
        return path.dirname(process.execPath); //use when packaged
        }
    }

    
    private async buildKey() {
      
        let token_header = {
            "alg": "PS256", //The value of the alg parameter is PS256, PS284, PS512, RS256, RS384, or RS512. The value you choose determines the algorithm used for signing of the token.
            "typ": "JWT", //The value of the typ parameter is always JWT.
            "kid":  process.env.CERTIFICATE_ID // "rmlOH6uCUXZYB60UWpYnG0rauKHIMDLLro-Srzk4SLo" //The value of the kid parameter is the value of the Certificate ID generated during the mapping of the application
         }

         let token_payload = {
            "iss": process.env.CONSUMER_ID, // "baba89a3865b1170318d4f3eee065ba5637a923a14bfbd03c3c0cdc618888d13", //client ID
            "scope": "restlets", // restlets, rest_webservices, suite_analytics, or all of them, separated by a comma.
            "iat": Math.floor(Date.now() / 1000), //The value of the iat parameter represents when the token was issued. The value of the parameter is in seconds, since January 1, 1970.
            "exp": Math.floor(Date.now() / 1000) + (60 * 60), //The value of the exp parameter represents the number of seconds since January 1, 1970, until the token’s expiration.
            "aud": "https://4891605.suitetalk.api.netsuite.com/services/rest/auth/oauth2/v1/token",
          }
    
          const privateKeyPath = path.join(
            await this.getAppPath(),
            'credentials', 'ns-auth-key.pem'
          );
    
          var privateKey = fs.readFileSync(privateKeyPath).toString();
          var jwtToken = jwt.sign(token_payload, privateKey, { algorithm: 'PS256', header: token_header });
          
          return jwtToken;
    }

    async getNewToken() {
        const jwtToken = await this.buildKey()
        return new Promise((resolve, reject) => {
            //Request for the Access Token
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            
            const body = {
                "grant_type": "client_credentials",
                "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
                "client_assertion": jwtToken
            }

            const host = "https://4891605.suitetalk.api.netsuite.com/services/rest/auth/oauth2/v1/token";

            axios.post(host, qs.stringify(body), { headers })
                .then(response => {
                    console.log(response)

                //save the access token in the database file
                ServerData.update({
                    data: {
                      'access_token': response.data.access_token,
                      'expires_in': response.data.expires_in,
                      'token_type': response.data.token_type
                    }
                  }, { where: { key: 'ns-token' } }).then(() => {
                      console.log('NS Tokens updated successfully');
                  });
                // this.saveToken({
                //     "token": response.data.access_token,
                //     "issued_at": moment().format('DD-MM-YYYY HH:mm:ss.SSS')
                // })

              //   return resolve(response.data.access_token)
                 return resolve(response.data)
                })
                .catch(error => {
                 console.error(error);
                return resolve(null)
                });
        })
    }



}