import { format } from "date-fns";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useMemo } from "react";
import type { Tweet as TweetType } from "utils/types";

const replaceHtmlSymbols = (text: string) => text.replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&'); 
const removeTwitterUrls = (text: string, tweet: TweetType) => {
  for(let m of tweet.entities.media || []) {
    text = text.replace(m.url, '');
  }

  return text;
}

export default function Tweet({ tweet} : { tweet: TweetType }) {
    const textPortions = useMemo(() => {
        let portions = [];
        let media = [];

        for(let i = 0; i < tweet.entities.urls.length; i++) {
            const url = tweet.entities.urls[i];
            const nextUrl = i + 1 < tweet.entities.urls.length ? tweet.entities.urls[i + 1] : null;

            if(url.expanded_url.endsWith('png') || url.expanded_url.endsWith('jpg')) {
              media.push(<img key={url.expanded_url} src={url.expanded_url} className="w-full rounded-lg" />);
            }

            portions.push({
              type: "url",
              text: url.display_url,
              href: url.expanded_url,
            });

            if(nextUrl) {
                portions.push({
                    type: "text",
                    text: removeTwitterUrls(replaceHtmlSymbols(tweet.full_text.slice(parseInt(url.indices[1]), parseInt(nextUrl.indices[0]))), tweet),
                });
            }
        }

        if(portions.length === 0) {
            portions.push({
                type: "text",
                text: removeTwitterUrls(replaceHtmlSymbols(tweet.full_text), tweet),
            });
        }

        return {
          portions,
          media
        };
    }, [tweet]);

    const media = useMemo(() => {
      const gifs = tweet.entities.urls.filter(x =>
        x.expanded_url
        .endsWith('.gif'));
      
      const yt_videos = tweet.entities.urls.filter(x =>
        x.expanded_url
        .includes('youtube.com/watch'))
        .map(x => {
          let url = x.expanded_url;
          url = url.replace('watch?v=', 'embed/');
          if(url.includes('&')) {
            url = url.slice(0, url.indexOf('&'));
          }
          
          return url;
        });

        const short_yt_videos = tweet.entities.urls.filter(x =>
          x.expanded_url
          .includes('youtu.be'))
          .map(x => {
            let url = x.expanded_url;
            url = url.replace('youtu.be/', 'youtube.com/embed/');

            return url;
        });

      const videos = tweet.extended_entities?.media.filter(x => x.video_info)
      .map(x => `/images/tweets/${tweet.id_str}-${x.video_info?.variants[0].url.split('/').pop()}`) || [];
      
      const images = tweet.entities.media?.filter(x => !x.media_url.includes('video_thumb') && (x.media_url.endsWith('jpg') || x.media_url.endsWith('png')))
      .map(x => `/images/tweets/${tweet.id_str}-${x.media_url.split('/').pop()}`) || [];

      return [
        ...images.map(image => <img key={image} src={image} className="w-full rounded-lg" />),
        ...gifs.map(gif => <img key={gif.expanded_url} src={gif.expanded_url} className="w-full rounded-lg" />),
        ...videos.map(video => <video key={video} src={video} className="w-full rounded-lg" controls />),
        ...yt_videos.map(video => <iframe key={video} src={video} className="w-full rounded-lg aspect-video" />),
        ...short_yt_videos.map(video => <iframe key={video} src={video} className="w-full rounded-lg aspect-video" />),
      ];
    }, [tweet]);

    return <div className="border-b border-b-border px-3 py-2 text-text flex flex-col gap-2">
      <div className="flex gap-2">
        <img
          src={(new Date(tweet.created_at).getMonth() === 5 ? "/images/profile_gay.jpg" : "/images/profile.png")}
          alt="Profile picture" className="min-w-12 w-12 min-h-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="font-bold">Ryan Is Funny</span>
          <span className="text-muted-foreground text-sm">@RyanIsFunnyBot</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg break-all">{textPortions.portions.map(p => p.type === 'url' ?
            <a key={p.text} href={p.href} target="_blank" className="hover:underline text-blue-500">{p.text}</a> :
            p.text)}
        </span>
        <div className="flex w-full flex-col">
            {[...textPortions.media, ...media]}
        </div>
      </div>
      <span className="text-muted-foreground text-sm">
        {format(new Date(tweet.created_at), "h:mm a · LLL d, yyyy")}
      </span>
      <div className="flex justify-between border-t border-border pt-2 px-2">
        <MessageCircle className="w-6 h-6 text-muted-foreground" />
        <div className="flex gap-1 items-center">
          <Repeat2 className="w-6 h-6 text-muted-foreground" />
          <span className="text-muted-foreground font-semibold text-sm">{tweet.retweet_count}</span>
        </div>
        <div className="flex gap-1 items-center">
            <Heart className="w-6 h-6 text-muted-foreground" />
          <span className="text-muted-foreground font-semibold text-sm">{tweet.favorite_count}</span>
        </div>
      </div>
  </div>
}