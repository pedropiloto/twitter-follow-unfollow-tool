require("dotenv").config();
const {TwitterApi} = require('twitter-api-v2')

const start = async () => {

const userClient = new TwitterApi({
  appKey: process.env.TWIITER_API_KEY,
  appSecret: process.env.TWIITER_API_SECRET,
  accessToken: process.env.TWIITER_ACCESS_TOKEN, // oauth token from previous step (link generation)
  accessSecret: process.env.TWIITER_ACCESS_SECRET, // oauth token secret from previous step (link generation)
});

const actorID = process.env.TWITTER_USER_ID

 const followersAsPaginator = await userClient.v2.followers(actorID, { asPaginator: true });
 const followers  = []
 for await (const follower of followersAsPaginator) {
  // Iterate until rate limit is hit
  // or API calls returns no more results
  followers.push(follower['id'])
}
 console.log(`followers: ${followers.length}`)
 
 const followingsAsPaginator = await userClient.v2.following(actorID, { asPaginator: true });
 const followings  = []
 for await (const following of followingsAsPaginator) {
  // Iterate until rate limit is hit
  // or API calls returns no more results
  followings.push(following['id'])
 }
 console.log(`followings: ${followings.length}`)

 const nonFollowers = followings.filter(item => !followers.includes(item))
 console.log(`Non-followers: ${nonFollowers.length}`)

 for (const userID of nonFollowers) {
  try{
    await userClient.v2.unfollow(actorID, userID);
  }catch(e){
    console.log(`ERROR when unfollowing: ${e}`)
  }
  await(sleep(15000))
 }
}


const sleep = ms => new Promise(r => setTimeout(r, ms));


start()