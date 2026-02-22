import dynamic from 'next/dynamic';

const ConfidenceChart = dynamic(() => import('@/components/charts/ConfidenceChart'), { ssr: false });
const CategoryChart = dynamic(() => import('@/components/charts/CategoryChart'), { ssr: false });
const AuthorChart = dynamic(() => import('@/components/charts/AuthorChart'), { ssr: false });
const PlaysChart = dynamic(() => import('@/components/charts/PlaysChart'), { ssr: false });
const TimelineChart = dynamic(() => import('@/components/charts/TimelineChart'), { ssr: false });
const HeatmapChart = dynamic(() => import('@/components/charts/HeatmapChart'), { ssr: false });

interface ChartSection {
  title: string;
  interpretation: string;
  chart: React.ReactNode;
}

export default function VisualizationsPage() {
  const sections: ChartSection[] = [
    {
      title: 'Confidence Breakdown',
      interpretation:
        'The vast majority of identified connections (33 of 47) are low-confidence thematic echoes \u2014 shared metaphors and rhetorical patterns that may derive from classical tradition rather than Shakespeare specifically. Only 2 matches achieve high confidence: both from John Jay.',
      chart: <ConfidenceChart />,
    },
    {
      title: 'Matches by Category',
      interpretation:
        'Thematic echoes dominate overwhelmingly (39 of 47), reflecting how Shakespeare\u2019s influence operates through absorbed cultural patterns rather than direct citation. Only one direct quotation exists in the entire corpus.',
      chart: <CategoryChart />,
    },
    {
      title: 'Matches by Author',
      interpretation:
        'Hamilton accounts for the lion\u2019s share of connections (29 of 47), consistent with his prolific output (he authored 51 of the 85 papers). Jay, despite writing only 5 papers, produced both high-confidence matches.',
      chart: <AuthorChart />,
    },
    {
      title: 'Top Shakespeare Plays',
      interpretation:
        'The Roman plays \u2014 Julius Caesar and Coriolanus \u2014 dominate, reflecting the Founders\u2019 intense engagement with questions of republican governance, popular sovereignty, and political ambition that Shakespeare dramatized through Roman history.',
      chart: <PlaysChart />,
    },
    {
      title: 'Timeline',
      interpretation:
        'Matches cluster in the early papers (Nos. 1\u201316) and in Hamilton\u2019s later papers on executive and judicial power (Nos. 67\u201381). The middle papers on federalism show fewer connections.',
      chart: <TimelineChart />,
    },
    {
      title: 'Heatmap',
      interpretation:
        'Hamilton draws most heavily on Julius Caesar and Coriolanus. Madison\u2019s connections span Coriolanus, Troilus and Cressida, and Julius Caesar. Jay\u2019s small but high-quality contribution centers on Henry VIII and Julius Caesar.',
      chart: <HeatmapChart />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-serif font-bold text-navy mb-2">
        Visualizations
      </h1>
      <p className="text-base font-serif text-navy-400 mb-10">
        Six interactive charts exploring the patterns within 47 identified
        Shakespeare&ndash;Federalist connections.
      </p>

      <div className="space-y-10">
        {sections.map((section) => (
          <section
            key={section.title}
            className="bg-white rounded-lg shadow-md border border-navy-50 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-serif font-bold text-navy mb-6">
                {section.title}
              </h2>
              {section.chart}
            </div>
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <p className="text-sm font-serif text-navy-500 leading-relaxed bg-cream rounded-lg p-4">
                {section.interpretation}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
