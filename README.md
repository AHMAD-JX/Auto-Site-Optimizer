# 🚀 Site Optimizer

Site Optimizer is a lightweight and efficient JavaScript library that automatically enhances your website's performance, speed, and user experience without requiring manual intervention. Simply integrate it, and let it optimize your site on the fly! ⚡

## 🌟 Features

### 🖼️ Lazy Loading for Images & Iframes

- Loads images and iframes only when they are about to be displayed.
- Improves initial load speed and reduces unnecessary data usage.
- Uses `IntersectionObserver` for optimal performance.

**Example:**

```html
<img data-lazy data-src="image.jpg" alt="Lazy Loaded Image">
<iframe data-lazy data-src="video.mp4"></iframe>
```

---

### 💾 Service Worker for Caching & Offline Support

- Registers a Service Worker to cache static assets.
- Enhances load speed for repeat visits.
- Allows offline access for cached pages.

**Setup:**

```js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}
```

---

### 📈 Performance Monitoring with Web Vitals

- Tracks Core Web Vitals like **CLS (Cumulative Layout Shift), FID (First Input Delay), and LCP (Largest Contentful Paint)**.
- Helps diagnose performance issues.

**Example:**

```js
import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
});
```

---

### 📡 Optimized Data Fetching (Retries & Timeout)

- Implements retry logic for network requests.
- Uses timeout to prevent long waits.

**Example:**

```js
SiteOptimizer.fetchData('https://api.example.com/data')
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

---

### 🔥 Script Deferring for Non-Critical Scripts

- Defer loading of non-essential scripts to improve render speed.
- Moves scripts with `data-defer` attribute to the end of `<body>`.

**Example:**

```html
<script data-defer data-src="analytics.js"></script>
```

---

### 🎯 Event Optimization (Debounce & Throttle)

- Prevents excessive function calls by delaying (debounce) or limiting (throttle) execution.

**Debounce Example:** (Executes only after a delay)

```js
const optimizedSearch = SiteOptimizer.debounce(() => {
    console.log('Searching...');
}, 300);

input.addEventListener('input', optimizedSearch);
```

**Throttle Example:** (Executes at most once in a given time frame)

```js
const optimizedScroll = SiteOptimizer.throttle(() => {
    console.log('Scrolling event fired');
}, 500);

window.addEventListener('scroll', optimizedScroll);
```

---

### 📜 Smooth Scrolling Support

- Enables smooth scrolling for all browsers.
- Uses polyfill for older browsers.

---

## 📌 Installation & Usage

### ✅ Installation

```html
<script src="site-optimizer.js"></script>
```

### 🎯 Usage

Simply initialize the optimizer after the page loads:

```js
document.addEventListener('DOMContentLoaded', () => {
    SiteOptimizer.init();
});
```

---

## 🛠️ API Methods

| Method | Description |
|--------|-------------|
| `SiteOptimizer.init()` | Initializes all optimizations. |
| `SiteOptimizer.$(selector)` | Shortcut for `document.querySelector`. |
| `SiteOptimizer.$$(selector)` | Shortcut for `document.querySelectorAll`. |
| `SiteOptimizer.on(element, event, callback)` | Adds an event listener. |
| `SiteOptimizer.debounce(func, delay)` | Returns a debounced function. |
| `SiteOptimizer.throttle(func, limit)` | Returns a throttled function. |
| `SiteOptimizer.fetchData(url, options, retries, timeout)` | Fetches data with retry logic and timeout. |

---

## 🔗 License

This project is open-source and available under the MIT License.

---

## 📬 Contact

For any questions or contributions, feel free to reach out!

Happy Optimizing! 🚀

