import { Heart, MessageCircle, Repeat2, Search } from "lucide-react";
import type { Route } from "./+types/_index";
import { useEffect, useState } from "react";
import tweets from '../../data/tweets.json';
import type { FullTweet } from "utils/types";
import { format } from "date-fns";
import Tweet from "components/tweet";

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
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    setFilteredTweets(loaderData.filter(tweet => tweet.full_text.toLowerCase().includes(searchKey.toLowerCase())));
  }, [searchKey]);

  return <div className="max-w-lg border-l border-r border-l-border border-r-border m-auto">
    <div className="px-3 py-4 border-b border-b-border">
      <h1>Tweets</h1>
    </div>
    <div className="px-3 py-4 border-b border-b-border">
      <div className="bg-muted flex gap-2 rounded-full items-center border focus-within:border-accent focus-within:bg-white flex-row-reverse">
        <input value={searchKey} onChange={e => setSearchKey(e.target.value)} type="text" placeholder="Search" className="peer bg-transparent border-none placeholder:text-muted-foreground h-10 flex-1 rounded-r-full outline-none caret-text text-text pr-3" />
        <Search className="text-muted-foreground ml-3 peer-focus:text-accent w-4 h-4" />
      </div>
    </div>
    <div className="py-2">
      {filteredTweets.map(tweet => <Tweet key={tweet.id_str} tweet={tweet} />)}
    </div>
  </div>;
}
