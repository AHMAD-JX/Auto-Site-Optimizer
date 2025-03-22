const SiteOptimizer = (() => {
    let state = {};
    const listeners = [];

    // DOM Helpers
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // Event Management with Debounce and Throttle
    const on = (element, event, callback) => {
        if (element && event && callback) {
            element.addEventListener(event, callback);
        }
    };

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return (...args) => {
            const context = this;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    };

    // Lazy Loading for Images and Iframes (بدون تغيير التصميم)
    const lazyLoad = () => {
        const lazyElements = $$('[data-lazy]');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        if (element.tagName === 'IMG') {
                            element.src = element.dataset.src;
                        } else if (element.tagName === 'IFRAME') {
                            element.src = element.dataset.src;
                        }
                        observer.unobserve(element);
                    }
                });
            }, { rootMargin: '50px', threshold: 0.1 });

            lazyElements.forEach(el => observer.observe(el));
        } else {
            lazyElements.forEach(el => {
                if (el.tagName === 'IMG' || el.tagName === 'IFRAME') {
                    el.src = el.dataset.src;
                }
            });
        }
    };

    // Service Worker for Caching and Offline Support
    const enableCaching = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    };

    // Performance Monitoring with Web Vitals
    const trackPerformance = () => {
        import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
            getCLS(console.log);
            getFID(console.log);
            getLCP(console.log);
        });
    };

    // Async Data Fetching with Retry and Timeout
    const fetchData = async (url, options = {}, retries = 3, timeout = 5000) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            if (retries > 0) {
                console.log(`Retrying... ${retries} attempts left`);
                return fetchData(url, options, retries - 1, timeout);
            }
            console.error('Fetch error:', error);
            return null;
        }
    };

    // Defer Non-Critical Scripts
    const deferScripts = () => {
        $$('script[data-defer]').forEach(script => {
            if (script.dataset.src) {
                const newScript = document.createElement('script');
                newScript.src = script.dataset.src;
                newScript.defer = true;
                document.body.appendChild(newScript);
                script.remove();
            }
        });
    };

    // Smooth Scroll with Polyfill for Older Browsers
    const smoothScroll = () => {
        if ('scrollBehavior' in document.documentElement.style) {
            document.documentElement.style.scrollBehavior = 'smooth';
        } else {
            import('smoothscroll-polyfill').then((module) => {
                module.polyfill();
            });
        }
    };

    // Initialize the Library
    const init = () => {
        lazyLoad();
        enableCaching();
        trackPerformance();
        deferScripts();
        smoothScroll();
        console.log('SiteOptimizer initialized!');
    };

    // Public API
    return {
        init,
        $,
        $$,
        on,
        debounce,
        throttle,
        fetchData,
    };
})();

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => SiteOptimizer.init());