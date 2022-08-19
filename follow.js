require("dotenv").config();
const { TwitterApi } = require('twitter-api-v2')

const start = async () => {
  const userClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });

  const userID =process.env.TWITTER_USER_ID

  const args = process.argv.slice(2);

  const search = args[0]
  const maxFollow = Number(args[1])

 const followingsAsPaginator = await userClient.v2.following(userID, { asPaginator: true });
 const followings  = []
 for await (const following of followingsAsPaginator) {
  followings.push(following['id'])
 }
 console.log(`followings: ${followings.length}`)

 const followersAsPaginator = await userClient.v2.followers(userID, { asPaginator: true });
 const followers  = []
 for await (const follower of followersAsPaginator) {
  followers.push(follower['id'])
}
 console.log(`followers: ${followers.length}`)

 await sleep(10000)

  const jsTweets = await userClient.v2.search(search, { 'media.fields': 'url', 'tweet.fields': ['public_metrics', 'author_id', 'referenced_tweets'] });

  // Consume every possible tweet of jsTweets (until rate limit is hit)
  const auhtorIDs = []
  for await (const tweet of jsTweets) {
    try{
    console.log(tweet)
    const likeCount = tweet['public_metrics']['like_count']
    if (likeCount >= 0 && likeCount <= 15) {
      if (!auhtorIDs.includes(tweet['author_id'])) {
        if(!followings.includes(tweet['author_id'])){
          console.log(`following ${tweet['author_id']}`);
          await userClient.v2.follow(userID, tweet['author_id']);
          auhtorIDs.push(tweet['author_id'])
          await sleep(180000)
        }else{
          console.log(`1-already following ${tweet['author_id']}`);
        }
      }else{
        console.log(`2-already following ${tweet['author_id']}`);
      }
      await sleep(2000)
    }
    const shouldLike = getRandomInt(4)
    if (shouldLike === 1) {
      console.log(`liking ${tweet['id']}`);
      await userClient.v2.like(userID, tweet['id']);
      await sleep(30000)
    }
    await sleep(2000)
    if (auhtorIDs.length === maxFollow) {
      break
    }
  }catch(e){
    console.log(`ERROR on interating tweets - ${e}`)
    await sleep(900000)
  }
  }

  console.log('-----FINISH-----')
  console.log(auhtorIDs.length)

}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

start()
