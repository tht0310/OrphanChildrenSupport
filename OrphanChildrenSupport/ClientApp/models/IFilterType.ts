export interface IFilterType {
  
 
  page?: number;
  pageSize?: number;
  sortBy?: string;
  isSortAscending?: boolean;
  filterParams?: string;
}
type FilterParam = {
  name: string;
  value: string | number | boolean;
};
export type FilterParams = FilterParam[];