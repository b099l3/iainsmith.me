import type { StravaLatestActivity } from 'lib/types';
import { FiActivity, FiArrowUpRight, FiClock } from 'react-icons/fi';
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
): Promise<StravaLatestActivity | null> {
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }

  const data: LatestActivityApiResponse = await response.json();
  return data.activity || null;
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

function CardShell({ children }: { children: ReactNode }) {
  return (
    <section className="mt-3 border border-zinc-900/20 bg-white p-4 shadow-[0_8px_18px_rgba(0,0,0,0.06)]">
      {children}
    </section>
  );
}

export default function LatestActivityCard({
  athleteUrl,
  onClick
}: LatestActivityCardProps) {
  const { data, error } = useSWR<StravaLatestActivity | null>(
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

  if (error || data === null) {
    return (
      <CardShell>
        <p
          className="text-[11px] uppercase tracking-[0.14em] text-zinc-500"
          style={metaFontStyle}
        >
          [Latest Activity]
        </p>
        <p className="mt-2 text-sm text-zinc-600">Latest activity is temporarily unavailable.</p>
        <a
          href={athleteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onClick('strava-profile', athleteUrl)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium uppercase tracking-[0.06em] text-zinc-900 transition-colors hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          [Open Strava Profile]
          <FiArrowUpRight className="h-4 w-4" />
        </a>
      </CardShell>
    );
  }

  const pace = formatPace(data.type, data.distance, data.movingTime);
  const dateLabel = formatDate(data.startDateLocal || data.startDate);
  const activityName = data.name || `${data.type} activity`;

  return (
    <CardShell>
      <p
        className="text-[11px] uppercase tracking-[0.14em] text-zinc-500"
        style={metaFontStyle}
      >
        [Latest Activity]
      </p>

      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onClick('latest-strava-activity', data.url)}
        className="mt-2 block border border-transparent p-1 -m-1 transition-colors hover:border-zinc-900/25 focus:outline-none focus-visible:border-zinc-900/35"
      >
        <p className="text-base font-semibold uppercase tracking-[0.04em] text-zinc-900">
          {activityName}
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          [{data.type}] [{dateLabel}]
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 border border-zinc-900/20 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-800">
            <FiActivity className="h-3.5 w-3.5" />
            {formatDistance(data.distance)}
          </span>
          <span className="inline-flex items-center gap-1 border border-zinc-900/20 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-800">
            <FiClock className="h-3.5 w-3.5" />
            {formatDuration(data.movingTime)}
          </span>
          {pace ? (
            <span className="inline-flex items-center border border-zinc-900/20 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-800">
              {pace}
            </span>
          ) : null}
        </div>

        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium uppercase tracking-[0.06em] text-zinc-900 transition-colors hover:text-zinc-700">
          [View On Strava]
          <FiArrowUpRight className="h-4 w-4" />
        </span>
      </a>
    </CardShell>
  );
}
