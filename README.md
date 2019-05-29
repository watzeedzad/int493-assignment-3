# int493-assignment-3

## Setup environment
### Express server
- create .env file in server folder by using .env.example file as an example
```
DB_URI="your-mongo-connection-uri"
S3_ACCESS_KEY="your-s3-access-key"
S3_SECRET="your-s3-secret"
S3_REGION="your-s3-region"
S3_BUCKET_NAME="you-s3-bucket-name"
JWT_SECRET="your-jwt-secret"
```
### Expo
- edit configure.js file by enter your computer ip address that run express server on
```
const config = {
    BASE_URL: 'http://192.168.1.54:3001', //your express server ip address and port
}
export default config
```

## Installation
- install yarn global by by using this command
```
npm install -g yarn
```
- clone KMUTT Restaurant Project
```
git clone https://github.com/watzeedzad/KMUTTRestaurent.git
```
- open KMUTT Restaurant Project folder
```
cd ./KMUTTRestaurent
```
- use yarn to install dependency on both react native and express server
  - install dependency for react native
  ```
  yarn install
  ```
  - install dependency for express server
  ```
  cd ./server && yarn install
  ```
- start both expo and express server
```
cd ../ && yarn start-dev
```

## Created by
- 58130500098 Phanupong Wongpiyapaiboon
- 58130500107 Jirawat Boonsumret

### This project is the part of INT493 - Hybrid Mobile App Developer Work Shop
### School of Information Technology, King Mongkut's University of Technology Thonburi
