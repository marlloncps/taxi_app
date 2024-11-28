
export type ErrorResponse = {
  error_code?: string;
  error_description?: string;
}

export interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

export type AutoCompleteProps = {
  label: string,
  value: number,
}