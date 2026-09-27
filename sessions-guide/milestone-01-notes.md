# Milestone 1 Notes — Props, State & useState (Beginner-Friendly)

These notes use the real code from this project (`App.tsx`, `SearchBar.tsx`, `MovieList.tsx`, `MovieCard.tsx`) so you can look at the actual files while reading.

---

## 1. What is a functional component?

Think of a component like a little factory that builds a piece of UI. You give it some inputs, and it hands back some HTML-looking code.

In React, that "factory" is just a normal JavaScript function:

```jsx
const SearchBar = ({ query, onChange }) => {
  return <input value={query} />
}
```

`SearchBar`, `MovieCard`, `MovieList`, and `App` are all just functions like this. Nothing magic — you already know how to write a function, and that's 90% of what a component is.

---

## 2. What are props? (and why data only flows one way)

**Props = the inputs you pass into a component**, like arguments into a function.

```jsx
// App.tsx
<SearchBar query={query} onChange={setQuery} />
```

Here, `App` is saying: "Hey `SearchBar`, here's a `query` value and an `onChange` function — use them."

The important rule: **props flow one direction — from parent down to child.** `SearchBar` can *read* `query`, but it can never reach back up and change `App`'s data directly. It's like a parent handing a kid an allowance — the kid can spend it, but can't just decide to give themselves more.

So how does typing in the search box ever update anything in `App`? The trick: `App` also passes down a **function** (`onChange={setQuery}`). The child calls that function when something happens:

```jsx
// SearchBar.tsx
<input onChange={(event) => onChange(event.target.value)} />
```

This is like the parent saying: "You can't change your allowance yourself, but here's a phone number — call me and *I'll* update it." That's why it's still "one-way" even though it feels like the child is "sending data up."

---

## 3. What is local state, and why do components need it?

Every time a component re-renders, all its normal variables get wiped and recreated from scratch. So if you wrote `let isFavorite = false` inside a component, it would reset to `false` every single render — it could never "remember" a click.

**State is React's way of giving a component memory.** It's a value that survives across re-renders.

```jsx
// MovieCard.tsx
const [isFavorite, setIsFavorite] = useState(false)
```

This is **local** to each card — like each movie card has its own personal notebook. Clicking the heart on one card doesn't affect any other card's heart, because each `MovieCard` has its own separate `isFavorite`.

---

## 4. The `useState` hook

```jsx
const [isFavorite, setIsFavorite] = useState(false)
```

Break this down piece by piece:

- `useState(false)` — "Start this piece of state at `false`."
- It gives back **two things** in an array: the current value (`isFavorite`) and a function to change it (`setIsFavorite`). We use array destructuring (the `[a, b] = ...` syntax) to grab both at once — this is just a naming convention, you could call them anything.
- Whenever you call the setter — e.g. `setIsFavorite(true)` — React does two things: (1) saves the new value, and (2) **re-renders the component** so the screen updates.

In this project:

```jsx
onClick={() => setIsFavorite((prev) => !prev)}
```

Instead of writing `setIsFavorite(!isFavorite)`, we pass a small function `(prev) => !prev` meaning "take whatever the current value is, and flip it." This is a slightly safer habit for when the new value depends on the old one.

**Key idea:** you never write `isFavorite = true` directly. You always go through the setter function. That's the whole rule of `useState`.

---

## 5. Controlled components (controlled inputs)

Normally, an `<input>` remembers what you type all by itself — the browser handles it. React calls this "uncontrolled."

A **controlled** input means: *React state is in charge of what's shown*, not the browser.

```jsx
// SearchBar.tsx
<input
  value={query}
  onChange={(event) => onChange(event.target.value)}
/>
```

Here's the loop that happens on every keystroke:

1. You type a letter.
2. `onChange` fires, grabs what you typed (`event.target.value`).
3. That gets sent up to `App`, which calls `setQuery(...)`.
4. `App` re-renders with the new `query`.
5. That new `query` gets passed back down into `value={query}`.
6. The input now displays what you typed.

It looks instant, but technically the letter only appears because React put it there — not because the browser remembered it. This matters because it lets `App` use that same `query` value to filter the movie list at the same time, so the search box and the movie list are always in sync.

---

## 6. Rendering lists with `.map()` and the `key` prop

If you have an array of movies and want a card for each one, you use `.map()` — it's the same `.map()` you already know from JavaScript arrays, just now it returns pieces of UI instead of numbers or strings.

```jsx
// MovieList.tsx
{movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} />
))}
```

This says: "For every movie in the list, make one `MovieCard`."

**Why the `key` prop?** React needs a way to tell cards apart when the list changes (e.g., when you search and the list gets shorter). `key` is like a name tag — it tells React "this card is Movie #42," so React can update just that one card instead of throwing away and rebuilding the whole list every time.

Rule of thumb: use something unique and stable, like `movie.id` — **not** the position in the array (`index`), because the position can change when items are added, removed, or reordered (like when you filter by search), and that confuses React about which card is which.

---

## 7. What is JSX, really?

JSX is the HTML-looking syntax you write inside a component:

```jsx
<div className="app-layout">Hello</div>
```

It *looks* like HTML, but it's not — it's a shorthand that gets translated by a build tool into plain JavaScript function calls, roughly:

```js
React.createElement("div", { className: "app-layout" }, "Hello")
```

You never write that longhand version yourself — JSX is just nicer to read. But knowing this explains a few "weird" rules:

- You write `className` instead of `class` — because under the hood it's a JavaScript object property, not real HTML.
- You can drop JavaScript values into your markup using curly braces `{ }`, because that's just a function argument slot: `{movie.vote_average.toFixed(1)}` in `MovieCard.tsx` is regular JS being evaluated and inserted.
- A block of JSX needs one single "wrapping" element, because a function call can only return one thing.

---

## 8. React Developer Tools (browser extension)

Install it, open your browser's DevTools, and you'll see two new tabs:

- **⚛️ Components** — shows your component tree, like a family tree: `App` → `MovieList` → `MovieCard`. Click on any `MovieCard` in the tree and you'll see its current props and state on the side (e.g. `isFavorite: false`). Click the heart button in the app and watch that value flip live — great for building intuition about what state actually is.
- **⚛️ Profiler** — records what happens when you interact with the app, and shows which components re-rendered and why. Useful later on when you're curious about performance.

Beginner-friendly tip: turn on **"Highlight updates when components render"** (a small gear/settings icon in the DevTools panel). It flashes a colored outline around any component that just re-rendered. Try typing in the search bar and watching which parts of the screen light up — it's a great way to *see* re-renders happening instead of just imagining them.
