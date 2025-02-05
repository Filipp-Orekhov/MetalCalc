import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://679b419e33d31684632334e9.mockapi.io/api/metcalc/",
});


interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache: Record<string, CacheEntry<unknown>> = {};
const TTL = 3600000;

// Запрос: проверяем кеш перед отправкой на сервер
axiosInstance.interceptors.request.use((config) => {
  if (config.method === "get" && config.url) {
    // 1️⃣ Проверяем кеш в памяти
    const cachedMemory = memoryCache[config.url];
    if (cachedMemory && Date.now() - cachedMemory.timestamp < TTL) {
      console.log(`✅ Используем кеш (RAM) для ${config.url}`);
      return Promise.reject({ data: cachedMemory.data, fromCache: true });
    }

    // 2️⃣ Проверяем кеш в `localStorage`
    const cachedLocal = localStorage.getItem(config.url);
    if (cachedLocal) {
      try {
        const { data, timestamp } = JSON.parse(cachedLocal);
        if (Date.now() - timestamp < TTL) {
          console.log(`✅ Используем кеш (localStorage) для ${config.url}`);
          // Сохраняем в память (RAM) для быстрого доступа
          memoryCache[config.url] = { data, timestamp };
          return Promise.reject({ data, fromCache: true });
        }
      } catch (error) {
        console.error("Ошибка при чтении кеша из localStorage:", error);
      }
    }
  }
  return config;
});

// Ответ: сохраняем в кеш
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.method === "get" && response.config.url) {
      console.log(`💾 Кешируем данные для ${response.config.url}`);

      // 1️⃣ Кешируем в память (RAM)
      memoryCache[response.config.url] = {
        data: response.data,
        timestamp: Date.now(),
      };

      // 2️⃣ Кешируем в `localStorage`
      localStorage.setItem(
        response.config.url,
        JSON.stringify({ data: response.data, timestamp: Date.now() })
      );
    }
    return response;
  },
  (error) => {
    // Если данные есть в кеше, возвращаем их
    if (error.fromCache) {
      return Promise.resolve({ data: error.data });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;