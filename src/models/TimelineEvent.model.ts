export default interface TimelineEvent {
  type: 'attribute-change' | 'page-visit';
  dateTime: string | number | Date;
  data: string;
  userId?: string;
}
