export interface Filter {
  v_Page: number;
  v_Size: number;
  v_Where: string;
}
export const initialFilter: Filter = {
  v_Page: 1,
  v_Size: 5,
  v_Where: "",
};
