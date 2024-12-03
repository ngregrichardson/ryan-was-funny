import { Heart, MessageCircle, Repeat2, Search } from "lucide-react";
import type { Route } from "./+types/_index";
import { useEffect, useState } from "react";
import tweets from '../../data/tweets.json';
import type { FullTweet } from "utils/types";
import { format } from "date-fns";
import Tweet from "components/tweet";
import { useDebounce } from "@uidotdev/usehooks";
import SearchBar from "components/searchBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ryan Was Funny (Twitter Archive)" },
    { name: "description", content: "DISCLAIMER: Ryan Was Funny is simply the name of the website, it does not make any factually accurate or plausible statements concerning the supposed hilarity of the \"tweets\" contained inside nor their original author." },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const allTweets = tweets as unknown as FullTweet[];
  return allTweets.map(t => t.tweet);
}

export default function Index({
  loaderData,
}: Route.ComponentProps) {
  const [filteredTweets, setFilteredTweets] = useState(loaderData);

  const handleSearch = (searchKey: string) => {
    setFilteredTweets(loaderData.filter(tweet =>
      tweet.full_text.toLowerCase().includes(searchKey.toLowerCase()) ||
      tweet.entities.media?.some(media => media.display_url.toLowerCase().includes(searchKey.toLowerCase()) || media.expanded_url.toLowerCase().includes(searchKey.toLowerCase())) ||
      tweet.entities.urls?.some(url => url.display_url.toLowerCase().includes(searchKey.toLowerCase()) || url.expanded_url.toLowerCase().includes(searchKey.toLowerCase()))
    ));
  }

  return <div className="max-w-lg border-l border-r border-l-border border-r-border m-auto">
    <div className="px-3 py-4 border-b border-b-border">
      <h1>Tweets</h1>
    </div>
    <div className="px-3 py-4 border-b border-b-border">
      <SearchBar onSearch={handleSearch} />
    </div>
    <div className="py-2">
      {filteredTweets.map(tweet => <Tweet key={tweet.id_str} tweet={tweet} />)}
    </div>
  </div>;
}
