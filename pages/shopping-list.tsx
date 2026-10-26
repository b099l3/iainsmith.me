import Container from 'components/Container';
import { useEffect, useState } from 'react';
import {
  ItemStatus,
  ShoppingItem,
  mealIdeas,
  shoppingGroups,
  shoppingItems
} from 'data/shopping-list';
import styles from 'styles/shopping-list.module.css';

const STORAGE_KEY = 'iainsmith-shopping-list-v1';
type ShoppingState = Record<string, ItemStatus>;

function initialState(): ShoppingState {
  return Object.fromEntries(
    shoppingItems.map((item) => [item.id, item.checkFirst ? 'check' : 'need'])
  );
}

export default function ShoppingList() {
  const [statuses, setStatuses] = useState<ShoppingState>(initialState);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<'home' | 'shop'>('home');
  const [hideBought, setHideBought] = useState(false);
  const [notice, setNotice] = useState('');
  const [storageError, setStorageError] = useState(false);
  const [copyText, setCopyText] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) || 'null'
      );
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        const next = initialState();
        shoppingItems.forEach((item) => {
          if (['check', 'need', 'have', 'bought'].includes(saved[item.id])) {
            next[item.id] = saved[item.id];
          }
        });
        setStatuses(next);
      }
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [ready, statuses]);

  const checks = shoppingItems.filter((item) => item.checkFirst);
  const unchecked = checks.filter(
    (item) => statuses[item.id] === 'check'
  ).length;
  const needed = shoppingItems.filter((item) => statuses[item.id] === 'need');
  const bought = shoppingItems.filter((item) => statuses[item.id] === 'bought');
  const shopping = shoppingItems.filter(
    (item) =>
      statuses[item.id] === 'need' ||
      (!hideBought && statuses[item.id] === 'bought')
  );

  function updateItem(id: string, status: ItemStatus) {
    setStatuses((current) => ({ ...current, [id]: status }));
    setCopyText('');
    setNotice('');
  }

  function resetList() {
    if (
      !window.confirm(
        'Start a new shop? This clears your stock checks and ticks.'
      )
    )
      return;
    setStatuses(initialState());
    setHideBought(false);
    setView('home');
    setCopyText('');
    setNotice('Ready for a new shop.');
  }

  async function copyList() {
    const text = shoppingGroups
      .map((group) => {
        const items = needed.filter((item) => item.group === group);
        return items.length
          ? `${group}\n${items
              .map((item) => `☐ ${item.name} — ${item.quantity}`)
              .join('\n')}`
          : '';
      })
      .filter(Boolean)
      .join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopyText('');
      setNotice('Remaining shopping list copied.');
    } catch {
      setCopyText(text);
      setNotice('Select and copy the list below.');
    }
  }

  function itemDetails(item: ShoppingItem) {
    return (
      <span className={styles.itemDetails}>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.quantity}>{item.quantity}</span>
        {item.note && <span className={styles.itemNote}>{item.note}</span>}
      </span>
    );
  }

  return (
    <Container
      title="Shopping list – Iain Smith"
      description="A simple Aldi shopping list: check the cupboards, pick up the essentials, and keep easy meals ready."
    >
      <div className={styles.page}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>THE EVERYDAY LIST</span>
          <h1>
            Good food.
            <br />
            <span>Less figuring it out.</span>
          </h1>
          <p>Check what’s at home, then take the rest to Aldi.</p>
          <div className={styles.tags}>
            <span>1 person</span>
            <span>4 days</span>
            <span>Simple ingredients</span>
          </div>
        </header>

        <div className={styles.summary} aria-live="polite">
          <div>
            <strong>{unchecked}</strong>
            <span>to check at home</span>
          </div>
          <div>
            <strong>{needed.length}</strong>
            <span>left to buy</span>
          </div>
          <div>
            <strong>{bought.length}</strong>
            <span>in the basket</span>
          </div>
        </div>

        <div className={styles.switcher} aria-label="List view">
          <button
            type="button"
            aria-pressed={view === 'home'}
            onClick={() => setView('home')}
          >
            <span>01</span> Check at home
          </button>
          <button
            type="button"
            aria-pressed={view === 'shop'}
            onClick={() => setView('shop')}
          >
            <span>02</span> Shopping list
          </button>
        </div>

        {!ready && (
          <p className={styles.hint} role="status">
            Loading your saved list…
          </p>
        )}
        {storageError && (
          <p className={styles.warning} role="status">
            Your browser couldn’t save this list. You can still use it here or
            copy it before leaving.
          </p>
        )}

        {view === 'home' ? (
          <section aria-labelledby="home-heading">
            <div className={styles.sectionHeader}>
              <h2 id="home-heading">A quick cupboard check</h2>
              <p>
                Check how much you have. “Need it” adds a refill to your
                shopping list.
              </p>
            </div>
            <fieldset disabled={!ready} className={styles.fieldset}>
              <legend className={styles.srOnly}>Check supplies at home</legend>
              <ul className={styles.items}>
                {checks.map((item) => (
                  <li
                    key={item.id}
                    className={`${styles.stockItem} ${
                      statuses[item.id] === 'have' ? styles.have : ''
                    }`}
                  >
                    {itemDetails(item)}
                    <div
                      className={styles.choices}
                      role="group"
                      aria-label={item.name}
                    >
                      <button
                        type="button"
                        aria-pressed={statuses[item.id] === 'have'}
                        onClick={() =>
                          updateItem(
                            item.id,
                            statuses[item.id] === 'have' ? 'check' : 'have'
                          )
                        }
                      >
                        Have it
                      </button>
                      <button
                        type="button"
                        aria-pressed={
                          statuses[item.id] === 'need' ||
                          statuses[item.id] === 'bought'
                        }
                        onClick={() =>
                          updateItem(
                            item.id,
                            statuses[item.id] === 'need' ||
                              statuses[item.id] === 'bought'
                              ? 'check'
                              : 'need'
                          )
                        }
                      >
                        Need it
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </fieldset>
            <div className={styles.nextStep}>
              <p>
                {unchecked
                  ? `${unchecked} supplies still to check. Fresh groceries are already on the shopping list.`
                  : 'Cupboard check complete. Your groceries and selected refills are ready.'}
              </p>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => setView('shop')}
              >
                Open shopping list →
              </button>
            </div>
          </section>
        ) : (
          <section aria-labelledby="shop-heading">
            <div className={styles.sectionHeader}>
              <h2 id="shop-heading">Your Aldi shop</h2>
              <p>
                Tick items as you pick them up. Skip anything you already have.
              </p>
            </div>
            {unchecked > 0 && (
              <p className={styles.checkReminder}>
                <button type="button" onClick={() => setView('home')}>
                  {unchecked} supplies still need a stock check
                </button>{' '}
                — unchecked refills aren’t added yet.
              </p>
            )}
            <div className={styles.toolbar}>
              <label>
                <input
                  type="checkbox"
                  checked={hideBought}
                  onChange={(event) => setHideBought(event.target.checked)}
                />{' '}
                Hide picked-up items
              </label>
              <button
                type="button"
                disabled={!ready || !needed.length}
                onClick={copyList}
              >
                Copy remaining list
              </button>
            </div>
            <fieldset disabled={!ready} className={styles.fieldset}>
              <legend className={styles.srOnly}>Groceries to buy</legend>
              {shoppingGroups.map((group) => {
                const items = shopping.filter((item) => item.group === group);
                if (!items.length) return null;
                return (
                  <section
                    className={styles.groceryGroup}
                    key={group}
                    aria-label={group}
                  >
                    <h3>
                      {group}
                      <span>{items.length}</span>
                    </h3>
                    {group === 'Training supplies' && (
                      <p className={styles.hint}>
                        These may need your usual supplier rather than Aldi.
                      </p>
                    )}
                    <ul className={styles.items}>
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className={`${styles.buyItem} ${
                            statuses[item.id] === 'bought' ? styles.bought : ''
                          }`}
                        >
                          <label>
                            <input
                              type="checkbox"
                              checked={statuses[item.id] === 'bought'}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  event.target.checked ? 'bought' : 'need'
                                )
                              }
                            />
                            {itemDetails(item)}
                          </label>
                          {statuses[item.id] !== 'bought' && (
                            <button
                              className={styles.skipButton}
                              type="button"
                              aria-label={`Already have ${item.name}`}
                              onClick={() => updateItem(item.id, 'have')}
                            >
                              Have at home
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </fieldset>
            {!needed.length && (
              <div className={styles.empty}>
                <strong>Everything on your list is sorted.</strong>
                <p>
                  {unchecked
                    ? 'Finish the remaining stock checks in case you need any refills.'
                    : 'You’re ready for the next few days.'}
                </p>
              </div>
            )}
            {shoppingItems.some(
              (item) => !item.checkFirst && statuses[item.id] === 'have'
            ) && (
              <details className={styles.skipped}>
                <summary>Groceries already at home</summary>
                <ul>
                  {shoppingItems
                    .filter(
                      (item) => !item.checkFirst && statuses[item.id] === 'have'
                    )
                    .map((item) => (
                      <li key={item.id}>
                        <span>{item.name}</span>
                        <button
                          type="button"
                          onClick={() => updateItem(item.id, 'need')}
                        >
                          Add back
                        </button>
                      </li>
                    ))}
                </ul>
              </details>
            )}
          </section>
        )}

        <p className={styles.notice} role="status">
          {notice}
        </p>
        {copyText && (
          <textarea
            className={styles.copyArea}
            aria-label="Shopping list to copy"
            value={copyText}
            readOnly
            onFocus={(event) => event.target.select()}
            rows={12}
          />
        )}

        <details className={styles.meals}>
          <summary>
            What this shop makes<span>4 easy defaults</span>
          </summary>
          <div className={styles.mealGrid}>
            {mealIdeas.map((meal) => (
              <article key={meal.name}>
                <h3>{meal.name}</h3>
                <p>{meal.ingredients}</p>
              </article>
            ))}
          </div>
          <p className={styles.hint}>
            Keep yogurt and whey for an easy snack. Cupboard packs may last
            beyond four days; adjust meal portions and training fuel to your
            day.
          </p>
        </details>

        <footer className={styles.listFooter}>
          <p>
            Your selections are saved on this browser only.
            <br />
            Check quantities before buying; there’s no need to refill everything
            each trip.
          </p>
          <button type="button" disabled={!ready} onClick={resetList}>
            Start a new shop
          </button>
        </footer>
      </div>
    </Container>
  );
}
