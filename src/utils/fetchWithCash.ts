// import axios from "axios";
//
// export const fetchWithCache = async<T> (key: string, fetchFunction: () => Promise<T>, ttl = 3600000): Promise<T> => {
//   const cachedItem = localStorage.getItem(key);
//
//   if (cachedItem) {
//     const { data, timestamp } = JSON.parse(cachedItem);
//     if (Date.now() - timestamp < ttl) {
//       return data;
//     }
//   } catch (error) {
//     console.error("Ошибка при чтении кеша:", error);
//   }
// }
//
//   try {
//     const data = await fetchFunction(); // Запрашиваем данные через переданную функцию
//     localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
//     return data;
//   } catch (error) {
//     console.error("Ошибка загрузки данных:", error);
//     throw error;
//   }
// };