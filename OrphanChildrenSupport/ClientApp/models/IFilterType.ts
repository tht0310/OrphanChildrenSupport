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
export type ColType = {
  id?: number;
  name: string;
  label: string;
  type:
    | "text"
    | "input"
    | "textarea"
    | "editor"
    | "checkbox"
    | "radio"
    | "select"
    | "lookup"
    | "dateTime"
    | "number"
    | "yesno"
    | "currency";
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  extra?: string;
  viewOnly?: boolean;
  defaultValue?: string | number;
  isEdit?: boolean;
  isDateOnly?: boolean;
  maximum?: number;
  minimum?: number;
  numberOfDecimalPlaces?: number;
  isPercentages?: boolean;
};
export type FormEditorType = {
  item: ColType;
  isNew?: boolean;
};
export type FilterParams = FilterParam[];