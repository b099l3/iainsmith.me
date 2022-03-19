export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Subscribers = {
  count: number;
};



export type TopViews = {
  slug: string;
  views: string;
};

export type Views = {
  total: number;
};

export type TopPostViews = {
  topViews: TopViews[];
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

export type YouTube = {
  subscriberCount: number;
  viewCount: number;
};

export type Strava = {
  recentRuns: number;
  recentDistance: number;
  ytdRuns: number;
  ytdDistance: number;
  totalRuns: number;
  totalDistance: number;
};

export type GitHub = {
  stars: number;
};

export type Gumroad = {
  sales: number;
};

export type Unsplash = {
  downloads: number;
  views: number;
};
