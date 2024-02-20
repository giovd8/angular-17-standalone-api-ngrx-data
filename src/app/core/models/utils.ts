export interface AppResponse<T> {
  payload: T;
}


export interface MenuOption {
  label: string;
  path: string;
  icon: string;
  selected: boolean;
}
