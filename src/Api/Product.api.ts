import { Filter } from "../Types/Filter.type";
import { Product } from "../Types/Products.type";
import http from "../Utils/Http";
// api get
export const getProducts = () => http.get<Product[]>("Product");
// api post
export const postProduct = (product: Omit<Product, "product_id">) =>
  http.post<Product[]>("Product", product);
// api get
export const getProduct = (id: string) => http.get<Product>(`Product/${id}`);
// api delete
export const deleteProduct = (id: string) => http.delete(`Product/${id}`);
// api put
export const updateProduct = (id: string, product: Product) =>
  http.put<Product[]>(`Product/${id}`, product);
// api post
export const getProductFilter = (filter: Filter) =>
  http.post("Product/filter", filter);
// api xoá nhiều
export const deleteMultiple = (listId: string[]) =>
  http.post("Product/bulk_delete", listId);
// , {
//   params: {
//     _page: page,
//     _limit: limit,
//   },
// }
