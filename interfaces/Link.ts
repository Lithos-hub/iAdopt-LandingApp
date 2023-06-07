export interface Link {
  description: string;
  email: string;
}

export interface LinkDTO extends Link {
  isSubmitted: boolean;
}
