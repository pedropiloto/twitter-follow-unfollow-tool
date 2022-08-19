# Twitter follow / unfollow script

This is an open source tool to follow/unfollow on twitter using the official API.

⚠️ This is implemented in bit of a lazy way and it relies on sync sleeps to avoid hit rate limits but Twitter still has ways to understand bad usage of their APIs. So be careful and run this with caution. ⚠️

Feel free to contribute to this project with code or a follow on twitter

[!["Twitter"](https://i.imgur.com/ZEKLC7l.png)](https://twitter.com/ppilotNFT)

# Setup

## Pre-requisites:

- [Install NodeJS](https://nodejs.org)

## Setup Twitter API Keys
1. Access Twitter developer portal - https://developer.twitter.com/en/portal
2. Setup a project
3. Setup an App with `OAuth 2.0` + `OAuth 1.0a` + `Read and write`
 (you can whatever you want in the fields `Callback URI / Redirect URL` and `Website URL`, they are mandatory but useless for this kind of use case.)
4. Access the `Keys and tokens` tab of the App
5. Generate API Key and Secret
6. Generate Access Token and Secret
7. Find your twitter user id in https://tweeterid.com
## Env vars

|   |
|---|
| TWITTER_API_KEY   |
| TWITTER_API_SECRET |
| TWITTER_ACCESS_TOKEN |
| TWITTER_ACCESS_SECRET |
| TWITTER_USER_ID |
# Run

 
1. Install dependencies

```bash
npm install
```

2. Setup env

```bash
cp .env.example .env
```

3. Run Follow
```bash
node follow.js <<hastag|text to search>> <<max_follow>>
```

3. Run Unfollow
```bash
node unfollow.js
```