export interface IRoutes {
  path: string;
  includeHeader: boolean;
  element: React.ReactElement;
  isProtected: boolean;
  key: string;
}
