export type Confidence = 'High' | 'Medium' | 'Low';

export type Category =
  | 'Direct Quotation'
  | 'Close Paraphrase'
  | 'Distinctive Phrase'
  | 'Named Reference'
  | 'Thematic Echo';

export type Author =
  | 'Hamilton'
  | 'Madison'
  | 'Jay'
  | 'Hamilton and Madison'
  | 'Disputed (Hamilton or Madison)';

export interface Match {
  id: number;
  federalistNo: number;
  author: Author;
  category: Category;
  confidence: Confidence;
  federalistPassage: string;
  shakespearePlay: string;
  shakespeareLocation: string;
  shakespearePassage: string;
  explanation: string;
}

export interface MatchData {
  matches: Match[];
  metadata: {
    totalPapers: number;
    totalShakespeareWorks: number;
    federalistWordCount: number;
    shakespeareWordCount: number;
  };
}
