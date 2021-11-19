export interface MenuModel extends MenuChildModel {
  children?: MenuChildModel[];
}

export interface MenuChildModel {
  id: string;
  title: string;
  icon?: any;
  url?: string;
}
