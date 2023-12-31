export type Analysis = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  entry?: Entry;
  mood: string;
  subject: string;
  sentimentScore: number;
  summary: string;
  color: string;
  negative: boolean;
};

export type Entry = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  analysis?: Analysis | null;
  userId: string;
};

export type QAEntry = {
  id: string;
  content: string;
  createdAt: Date;
};

export type HistoryChartProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  userId: string;
  mood: string;
  summary: string;
  color: string;
  negative: boolean;
  subject: string;
  sentimentScore: number;
};
