export const getTweets = async (ids = []) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  const queryParams = new URLSearchParams({
    ids: ids.join(','),
    expansions:
      'author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id',
    'tweet.fields':
      'attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text',
    'user.fields': 'id,name,profile_image_url,protected,url,username,verified',
    'media.fields':
      'duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics'
  });

  let response: Response;
  try {
    response = await fetch(`https://api.twitter.com/2/tweets?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_KEY}`
      },
      signal: AbortSignal.timeout(5000)
    });
  } catch (_error) {
    return [];
  }

  if (!response.ok) {
    return [];
  }

  const tweets = await response.json();
  const includedUsers = Array.isArray(tweets?.includes?.users)
    ? tweets.includes.users
    : [];
  const includedTweets = Array.isArray(tweets?.includes?.tweets)
    ? tweets.includes.tweets
    : [];
  const includedMedia = Array.isArray(tweets?.includes?.media)
    ? tweets.includes.media
    : [];
  const data = Array.isArray(tweets?.data) ? tweets.data : [];

  const getAuthorInfo = (author_id) => {
    return includedUsers.find((user) => user.id === author_id);
  };

  const getReferencedTweets = (mainTweet) => {
    return (
      mainTweet?.referenced_tweets?.map((referencedTweet) => {
        const fullReferencedTweet = includedTweets.find(
          (tweet) => tweet.id === referencedTweet.id
        );

        if (!fullReferencedTweet) {
          return null;
        }

        return {
          type: referencedTweet.type,
          author: getAuthorInfo(fullReferencedTweet.author_id),
          ...fullReferencedTweet
        };
      }).filter(Boolean) || []
    );
  };

  return data.reduce((allTweets, tweet) => {
    const tweetWithAuthor = {
      ...tweet,
      media:
        tweet?.attachments?.media_keys?.map((key) =>
          includedMedia.find((media) => media.media_key === key)
        )?.filter(Boolean) || [],
      referenced_tweets: getReferencedTweets(tweet),
      author: getAuthorInfo(tweet.author_id)
    };

    return [tweetWithAuthor, ...allTweets];
  }, []);
};
