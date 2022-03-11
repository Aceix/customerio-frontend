export default interface Customer {
  id: number;
  attributes: { [key: string]: string };
  events: { [key: string]: number };
  last_updated?: number;
}
