export interface CommonProps<TData, TReturn> {
  data: TData;
  onSave: (data: TData) => Promise<TReturn> | TReturn | void;
  interval?: number;
  saveOnUnmount?: boolean;
}

export interface AutosaveProps<TData, TReturn>
  extends CommonProps<TData, TReturn> {
  element?: JSX.Element | null;
}
