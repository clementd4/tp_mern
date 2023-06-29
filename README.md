tp_mern

configuration serveur:
- ajoutez l'URL pour vous connecter à la base MongoDB dans le fichier server/.env, sous la variable ATLAS_URL
- ajoutez TOKEN_SECRET dans le fichier server/.env. C'est le token utilisé avec le JWT
  - example (eae916244f0838ab7995c30135bcb84e1fd110ff564fe3d59c53511446d972c90d8b843476e717403e2c0f35568ed0ce8bec6eb6b73bede22feef222de305f45)

installation serveur:
- cd server
- npm install

lancement serveur:
- cd server
- nodemon


installation client:
- cd client
- npm install

lancement client:
- cd client
- npm start
