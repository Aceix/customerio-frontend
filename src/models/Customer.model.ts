export default interface Customer {
  id: string;
  attributes: { [key: string]: string };
  events?: { [key: string]: number };
  last_updated?: number;
}
