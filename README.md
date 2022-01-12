# Spacestagram

## Getting started

You will need:

- Node.js (built on and tested on 16.13.0)

### Clone the repository

```
git clone https://github.com/GarvinH/spacestagram.git
```

### Install all the dependencies

```
npm i
```

### Dotenv

ensure you have a file called `.env` in the root folder.

You will need a key-value pair using an API key from the [NASA open api](https://api.nasa.gov/).

with that key, put this into the `.env` file:

```
API_KEY="{YOUR NASA API KEY HERE}"
```

### Run the server

```
npm run start
```

### Go to your browser

At `http://localhost:3000`

### Dev for the react code

Or if you want to run the react code only

```
npm run react-start
```
