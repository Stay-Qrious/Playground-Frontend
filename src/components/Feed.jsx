import React, { useEffect } from 'react'
import { BaseURL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

// STEP 1: Import your creative sports image
import FeedBg from "../images/Feed.jpg"; 

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BaseURL + "/feed", { withCredentials: true });
      dispatch(setFeed(res.data?.data || res.data));
    } catch (e) {
      console.error("Error fetching feed:", e.message);
    }
  }

  useEffect(() => {
    if (user) { getFeed(); }
  }, [user]);

  // Loading State
  if (!feed) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a]">
        <span className="loading loading-dotted loading-lg text-primary"></span>
      </div>
    );
  }

  // STEP 2: Apply the background to the main return
  return (
  <div 
    className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center pt-10 pb-40"
    style={{ backgroundImage: `url(${FeedBg})` }}
  >
    {feed.length === 0 ? (
      <div className="z-10 text-center p-10 bg-white/10 rounded-3xl border border-white/20 shadow-2xl max-w-md mx-4">
        <h1 className="font-bold text-2xl text-white mb-2">No More Players!</h1>
        <p className="text-white/60">You've seen everyone in your area. Check back later.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary mt-6 rounded-full"
        >
          Refresh Arena
        </button>
      </div>
    ) : (
      <div className="z-10 w-full flex justify-center px-4">
        <UserCard user={feed[0]} />
      </div>
    )}
  </div>
);

}

export default Feed;