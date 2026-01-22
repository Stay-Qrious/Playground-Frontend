import React, { useEffect } from 'react'
import { BaseURL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();
  
  // Get feed and user from store
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const getFeed = async () => {
    // If we already have items in the feed, don't fetch again
    if (feed && feed.length > 0) return;

    try {
      const res = await axios.get(BaseURL + "/feed", { withCredentials: true });
      // Dispatch the data array to the store
      dispatch(setFeed(res.data?.data || res.data));
    }
    catch (e) {
      console.error("Error fetching feed:", e.message);
    }
  }

  useEffect(() => {
    // We only fetch the feed if a user is actually logged in
    if (user) {
      getFeed();
    }
  }, [user]); // Trigger whenever 'user' state changes (login/signup)

  // 1. If feed hasn't been fetched yet
  if (!feed) {
    return (
      <div className="flex justify-center my-40">
        <span className="loading loading-dotted loading-lg text-indigo-500"></span>
      </div>
    );
  }

  // 2. If feed was fetched but is empty
  if (feed.length === 0) {
    return (
      <div className="flex justify-center my-20">
        <div className="text-center p-10 bg-[#1e293b] rounded-3xl border border-slate-700 shadow-xl">
          <h1 className="font-bold text-2xl text-white mb-2">No More Developers!</h1>
          <p className="text-slate-400">You've seen everyone in your area. Check back later.</p>
        </div>
      </div>
    );
  }

  // 3. Show the first user in the feed
  return (
    <div className="flex justify-center my-10">
      {/* We pass a handler to the card so it can trigger the 
         next card by updating the Redux store 
      */}
      <UserCard user={feed[0]} />
    </div>
  );
}

export default Feed;