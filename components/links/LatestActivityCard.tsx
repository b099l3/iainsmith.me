import type { StravaLatestActivity } from 'lib/types';
import { FiActivity, FiArrowUpRight, FiClock, FiHeart, FiZap } from 'react-icons/fi';
import type { ReactNode } from 'react';
import useSWR from 'swr';

type LatestActivityCardProps = {
  athleteUrl: string;
  onClick: (label: string, url: string) => void;
};

const UPDATE_INTERVAL_MS = 15 * 60 * 1000;
const metaFontStyle = {
  fontFamily: "'Victor Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
};

type LatestActivityApiResponse = {
  activity: StravaLatestActivity | null;
  message?: string;
};

async function fetchLatestActivity(
  url: string
): Promise<LatestActivityApiResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    return { activity: null };
  }

  return (await response.json()) as LatestActivityApiResponse;
}

function getUnavailableMessage(apiMessage?: string): string {
  if (!apiMessage) {
    return 'Latest activity is temporarily unavailable.';
  }

  const normalized = apiMessage.toLowerCase();
  if (normalized.includes('activity:read_permission')) {
    return 'Reconnect Strava with activity:read permission to show latest activity.';
  }

  if (normalized.includes('missing strava credentials')) {
    return 'Missing Strava credentials in env config.';
  }

  return 'Latest activity is temporarily unavailable.';
}

function formatDistance(distanceInMeters: number): string {
  const km = (distanceInMeters / 1000).toFixed(2);
  const miles = (distanceInMeters * 0.000621371192).toFixed(2);
  return `${km} km (${miles} mi)`;
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

function formatPace(
  activityType: string,
  distanceInMeters: number,
  movingTimeInSeconds: number
): string | null {
  if (
    !activityType.toLowerCase().includes('run') ||
    distanceInMeters <= 0 ||
    movingTimeInSeconds <= 0
  ) {
    return null;
  }

  const secondsPerKm = movingTimeInSeconds / (distanceInMeters / 1000);
  let minutes = Math.floor(secondsPerKm / 60);
  let seconds = Math.round(secondsPerKm % 60);

  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  return `${minutes}:${String(seconds).padStart(2, '0')} /km`;
}

function formatDate(dateIso: string): string {
  const date = new Date(dateIso);

  if (Number.isNaN(date.getTime())) {
    return 'Recent activity';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

function formatHeartRate(heartRate: number | null): string | null {
  if (!heartRate || heartRate <= 0) {
    return null;
  }

  return `${Math.round(heartRate)} bpm`;
}

function CardShell({ children }: { children: ReactNode }) {
  return (
    <section className="mt-3 border border-zinc-900/20 bg-white p-4 shadow-[0_5px_12px_rgba(0,0,0,0.04)]">
      {children}
    </section>
  );
}

export default function LatestActivityCard({
  athleteUrl,
  onClick
}: LatestActivityCardProps) {
  const { data, error } = useSWR<LatestActivityApiResponse>(
    '/api/strava/latest-activity',
    fetchLatestActivity,
    {
      revalidateOnFocus: false,
      refreshInterval: UPDATE_INTERVAL_MS
    }
  );

  if (typeof data === 'undefined' && !error) {
    return (
      <CardShell>
        <p
          className="text-[11px] uppercase tracking-[0.14em] text-zinc-500"
          style={metaFontStyle}
        >
          [Latest Activity]
        </p>
        <p className="mt-2 text-sm text-zinc-600">Loading your latest Strava activity...</p>
      </CardShell>
    );
  }

  if (error || !data?.activity) {
    const unavailableMessage = getUnavailableMessage(data?.message);

    return (
      <CardShell>
        <p
          className="text-[11px] uppercase tracking-[0.14em] text-zinc-500"
          style={metaFontStyle}
        >
          [Latest Activity]
        </p>
        <p className="mt-2 text-sm font-[440] text-zinc-600">{unavailableMessage}</p>
        <a
          href={athleteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onClick('strava-profile', athleteUrl)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-[560] uppercase tracking-[0.08em] text-zinc-900 transition-colors hover:text-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          [Open Strava Profile]
          <FiArrowUpRight className="h-4 w-4" />
        </a>
      </CardShell>
    );
  }

  const activity = data.activity;
  const pace = formatPace(activity.type, activity.distance, activity.movingTime);
  const dateLabel = formatDate(activity.startDateLocal || activity.startDate);
  const activityName = activity.name || `${activity.type} activity`;
  const averageHeartRate = formatHeartRate(activity.averageHeartRate);
  const sufferScore =
    activity.sufferScore && activity.sufferScore > 0
      ? Math.round(activity.sufferScore)
      : null;

  return (
    <CardShell>
      <p
        className="text-[11px] uppercase tracking-[0.14em] text-zinc-500"
        style={metaFontStyle}
      >
        [Latest Activity]
      </p>

      <a
        href={activity.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onClick('latest-strava-activity', activity.url)}
        className="mt-2 block border border-transparent p-1 -m-1 transition-colors hover:border-zinc-900/20 focus:outline-none focus-visible:border-zinc-900/35"
      >
        <p className="text-base font-[650] uppercase tracking-[0.06em] text-zinc-900">
          {activityName}
        </p>
        <p className="mt-1 text-sm font-[440] text-zinc-600">
          [{activity.type}] [{dateLabel}]
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 border border-zinc-900/20 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-800">
            <FiActivity className="h-3.5 w-3.5" />
            {formatDistance(activity.distance)}
          </span>
          <span className="inline-flex items-center gap-1 border border-zinc-900/20 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-800">
            <FiClock className="h-3.5 w-3.5" />
            {formatDuration(activity.movingTime)}
          </span>
          {pace ? (
            <span className="inline-flex items-center border border-zinc-900/20 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-800">
              {pace}
            </span>
          ) : null}
          {averageHeartRate ? (
            <span className="inline-flex items-center gap-1 border border-zinc-900/20 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-800">
              <FiHeart className="h-3.5 w-3.5" />
              {averageHeartRate}
            </span>
          ) : null}
          {sufferScore ? (
            <span className="inline-flex items-center gap-1 border border-zinc-900/20 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-800">
              <FiZap className="h-3.5 w-3.5" />
              Suffer {sufferScore}
            </span>
          ) : null}
        </div>

        <span className="mt-3 inline-flex items-center gap-1 text-sm font-[560] uppercase tracking-[0.08em] text-zinc-900">
          [View On Strava]
          <FiArrowUpRight className="h-4 w-4" />
        </span>
      </a>
    </CardShell>
  );
}
