export interface ILink {
  description: string;
  email: string;
  url: string;
  isSubmitted: boolean;
}

export interface LinkDTO extends ILink {
  _id: string;
  createdAt: string;
  isSubmitted: boolean;
}
