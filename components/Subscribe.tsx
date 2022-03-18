import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from 'components/LoadingSpinner';
import SuccessMessage from 'components/SuccessMessage';
import fetcher from 'lib/fetcher';
import { event } from 'lib/gtag';
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

    event({
      action: 'signup_newletter',
      category: 'Newsletter',
      label: 'SignUp',
      value: 1
    })
    inputEl.current.value = '';
    setForm({
      state: Form.Success,
      message: `Hooray! You're now on the list.`
    });
  };

  return (
    <div className="w-full p-6 my-4 border border-gray-200 rounded-xl dark:border-gray-800 bg-gradient-to-r from-emerald-500/40 via-blue-500/40 to-purple-500/40">
      <p className="text-lg font-bold text-gray-900 md:text-xl dark:text-gray-100">
        Subscribe to the newsletter
      </p>
      <p className="my-1 text-gray-800 dark:text-gray-200">
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
          className="block w-full px-4 py-2 pr-32 mt-1 text-gray-900 border-gray-300 rounded-md bg-white/50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800/50 dark:text-gray-100"
        />
        <button
          className="absolute flex items-center justify-center h-8 px-4 font-medium text-gray-900 rounded bg-gray-100/80 right-1 top-1 dark:bg-gray-800/90 dark:text-gray-100 w-28"
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
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {`${
            subscriberCount > 0 ? subscriberCount.toLocaleString() : '-'
          } subscribers – `}
          <Link href="/newsletter">
            <a>35 issues</a>
          </Link>
        </p>
      )}
    </div>
  );
}
