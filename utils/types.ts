export interface FullTweet {
    tweet: Tweet;
}

export interface Tweet {
    edit_info:                  EditInfo;
    retweeted:                  boolean;
    source:                     string;
    entities:                   Entities;
    display_text_range:         string[];
    favorite_count:             string;
    id_str:                     string;
    truncated:                  boolean;
    retweet_count:              string;
    id:                         string;
    created_at:                 string;
    favorited:                  boolean;
    full_text:                  string;
    lang:                       Lang;
    possibly_sensitive?:        boolean;
    extended_entities?:         ExtendedEntities;
    in_reply_to_user_id?:       string;
    in_reply_to_screen_name?:   string;
    in_reply_to_user_id_str?:   string;
    in_reply_to_status_id_str?: string;
    in_reply_to_status_id?:     string;
}

export interface EditInfo {
    initial: Initial;
}

export interface Initial {
    editTweetIds:   string[];
    editableUntil:  Date;
    editsRemaining: string;
    isEditEligible: boolean;
}

export interface Entities {
    hashtags:      Hashtag[];
    symbols:       any[];
    user_mentions: UserMention[];
    urls:          URL[];
    media?:        Media[];
}

export interface Hashtag {
    text:    string;
    indices: string[];
}

export interface Media {
    expanded_url:    string;
    indices:         string[];
    url:             string;
    media_url:       string;
    id_str:          string;
    id:              string;
    media_url_https: string;
    sizes:           Sizes;
    type:            Type;
    display_url:     string;
    video_info?:     VideoInfo;
}

export interface Sizes {
    large:  Large;
    thumb:  Large;
    small:  Large;
    medium: Large;
}

export interface Large {
    w:      string;
    h:      string;
    resize: Resize;
}

export type Resize = "fit" | "crop";

export type Type = "photo" | "animated_gif";

export interface VideoInfo {
    aspect_ratio: string[];
    variants:     Variant[];
}

export interface Variant {
    bitrate:      string;
    content_type: string;
    url:          string;
}

export interface URL {
    url:          string;
    expanded_url: string;
    display_url:  string;
    indices:      string[];
}

export interface UserMention {
    name:        string;
    screen_name: string;
    indices:     string[];
    id_str:      string;
    id:          string;
}

export interface ExtendedEntities {
    media: Media[];
}

export type Lang = "en" | "zxx" | "sv" | "cs" | "qst" | "und" | "de" | "cy" | "art" | "es" | "fi" | "in" | "no" | "ht" | "pl" | "qme" | "eu" | "it" | "fr" | "nl" | "tl";
