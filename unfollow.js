require("dotenv").config();
const {TwitterApi} = require('twitter-api-v2')

const start = async () => {

const userClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const actorID = process.env.TWITTER_USER_ID

 const followersAsPaginator = await userClient.v2.followers(actorID, { asPaginator: true });
 const followers  = []
 for await (const follower of followersAsPaginator) {
  followers.push(follower['id'])
}
 console.log(`followers: ${followers.length}`)
 
 const followingsAsPaginator = await userClient.v2.following(actorID, { asPaginator: true });
 const followings  = []
 for await (const following of followingsAsPaginator) {
  followings.push(following['id'])
 }
 console.log(`followings: ${followings.length}`)

 const nonFollowers = followings.filter(item => !followers.includes(item))
 console.log(`Non-followers: ${nonFollowers.length}`)

 for (const userID of nonFollowers) {
  try{
    await userClient.v2.unfollow(actorID, userID);
    console.log(`unfollowing ${userID}`);

  }catch(e){
    console.log(`ERROR when unfollowing: ${e}`)
    await(sleep(900000))
  }
  await(sleep(180000))
 }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

start()