import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from 'components/LoadingSpinner';
import SuccessMessage from 'components/SuccessMessage';
import fetcher from 'lib/fetcher';
import { Form, FormState, Subscribers } from 'lib/types';
import Link from 'next/link';
import { useRef, useState } from 'react';
import useSWR from 'swr';


export default function Subscribe() {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef(null);
  const { data } = useSWR<Subscribers>('/api/subscribers', fetcher);
  const subscriberCount = new Number(data?.count);

  const subscribe = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error
      });
      return;
    }

    inputEl.current.value = '';
    setForm({
      state: Form.Success,
      message: `Hooray! You're now on the list.`
    });
  };

  return (
    <div className="w-full p-6 my-4 border border-gray-200 rounded-xl dark:border-gray-800 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 animated-text">
      <p className="text-lg font-bold text-white md:text-xl">
        Subscribe to the newsletter
      </p>
      <p className="my-1 text-slate-50">
        Get emails from me about mobile development, tech, and more.
      </p>
      <form className="relative my-4" onSubmit={subscribe}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="eric.seidel@google.com"
          type="email"
          autoComplete="email"
          required
          className="block w-full px-4 py-2 pr-32 mt-1 text-gray-900 border-gray-300 rounded-md bg-white/50 focus:ring-white focus:border-white"
        />
        <button
          className="absolute flex items-center justify-center h-8 px-4 font-medium text-gray-900 rounded bg-gray-100/80 right-1 top-1 w-28"
          type="submit"
        >
          {form.state === Form.Loading ? <LoadingSpinner /> : 'Subscribe'}
        </button>
      </form>
      {form.state === Form.Error ? (
        <ErrorMessage>{form.message}</ErrorMessage>
      ) : form.state === Form.Success ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : (
        <p className="text-sm text-slate-50">
          {`${
            subscriberCount > 0 ? subscriberCount.toLocaleString() : '-'
          } Subscribers – `}
          <Link href="/newsletter">
            <a>View all issues</a>
          </Link>
        </p>
      )}
    </div>
  );
}
