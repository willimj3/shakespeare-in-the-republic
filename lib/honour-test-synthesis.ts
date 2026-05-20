/**
 * Per-target synthesis text for the honour-test explorer. Each entry
 * describes the diagnostic contrast between the Founders' collocational
 * world and Shakespeare's for one of the 14 abstract-noun targets in
 * tables/cs3_*.csv. The contrast is the substantive content of the
 * conceptual-inheritance argument (see reports/paper.md §3.3 / §4.3).
 */
export type TargetSynthesis = {
  founders_title: string;
  founders_subtitle: string;
  shakespeare_title: string;
  shakespeare_subtitle: string;
  reading: string;
};

const SYNTHESIS: Record<string, TargetSynthesis> = {
  honour: {
    founders_title: "The Founders' honour",
    founders_subtitle: "Epistolary — what one has when corresponding with a Sir",
    shakespeare_title: "Shakespeare's honour",
    shakespeare_subtitle: "Chivalric — pawnable, stainable, lord-bound",
    reading:
      "The diagnostic case for the whole conceptual-inheritance argument. Shakespeare's honour can be pawned (Coriolanus 5.6: 'I pawn'd mine honour for his truth'); it lives in the company of mine, lord, love, come, kept. The Founders' honour lives in epistolary openings and closings — sir, respect, esteem, excellency, letter ('We have the honour to be, Sir, your most obedient humble Servants'). The word travelled across the Atlantic; the chivalric concept did not. The Founders inherited the lexis and rebuilt the meaning.",
  },
  power: {
    founders_title: "The Founders' power",
    founders_subtitle: "Institutional — vested in offices and departments",
    shakespeare_title: "Shakespeare's power",
    shakespeare_subtitle: "Personal — held by named sovereigns",
    reading:
      "Shakespeare's power is the personal possession of named individuals: Richard, Brutus, Cassius, the King. It is wielded; it is lost; it passes from one named person to another. The Founders' power is institutional: it lives with congress, executive, states, treasury, foreign, war. It is exercised, executed, superintended. Hamilton's 24,998 uses of the word are almost all of this second kind — the same English word doing an entirely different conceptual job.",
  },
  love: {
    founders_title: "The Founders' love",
    founders_subtitle: "Domestic and patriotic — for country, family, children",
    shakespeare_title: "Shakespeare's love",
    shakespeare_subtitle: "Romantic and sexual — sweet, lord, fair, dear",
    reading:
      "The Founders' love is for country, family, children, dear and tenderest correspondents. Shakespeare's love is romantic — sweet, lord, fair, why, o. The collocates do not overlap. When Adams writes of his love for John Quincy, the conceptual neighbours are domestic. When Romeo speaks of love, the neighbours are erotic. The shared vocabulary is doing different work in each corpus.",
  },
  death: {
    founders_title: "The Founders' death",
    founders_subtitle: "Legal and military — sentence, suffer, commander",
    shakespeare_title: "Shakespeare's death",
    shakespeare_subtitle: "Dramatic and personal — come, die, let",
    reading:
      "Shakespeare's deaths are dramatic events: come, die, love, let, sweet. The Founders' deaths are legal and military: sentence, sentenced, suffer, commander, case. A death in Shakespeare's drama is a fated personal moment; a death in the Founders' correspondence is a sentence imposed, a battle casualty, or a procedural matter. The grammatical environment around the noun reveals two entirely different relationships to mortality.",
  },
  friend: {
    founders_title: "The Founders' friend",
    founders_subtitle: "Epistolary — the close of a letter",
    shakespeare_title: "Shakespeare's friend",
    shakespeare_subtitle: "Political ally — king, Antony, Caesar",
    reading:
      "The Founders' friend is the close of a letter — dear, esteem, sincere, servant, regards. Shakespeare's friend is a political ally on the eve of an assassination — king, Antony, Caesar, sweet, lord. Brutus calls Caesar friend ten lines before stabbing him. Adams calls Jefferson friend at the bottom of a letter. The word means something so different in each corpus that they nearly cannot be read against each other without footnotes.",
  },
  mind: {
    founders_title: "The Founders' mind",
    founders_subtitle: "Enlightenment psychology — public, human, impression",
    shakespeare_title: "Shakespeare's mind",
    shakespeare_subtitle: "Dramatic interiority — lord, lady, know, bears",
    reading:
      "Shakespeare's mind is the interior of a named character — lord, lady, know, bears. The Founders' mind is a category for political psychology — public, human, own, impression. The Enlightenment psychology that produced Federalist No. 10 is visible at the collocate level: 'the public mind', 'the human mind', 'impressions on the mind'. Shakespeare's mind, by contrast, is always someone's.",
  },
  virtue: {
    founders_title: "The Founders' virtue",
    founders_subtitle: "Political — civic, public, republican",
    shakespeare_title: "Shakespeare's virtue",
    shakespeare_subtitle: "Personal — go, show, lord, fair",
    reading:
      "The Founders' virtue is civic and republican — political, virtues, qualities, public. Shakespeare's virtue is personal display — go, show, lord, fair. The republican-virtue tradition that runs from Cato through the Federalist has its own collocational fingerprint, distinct from anything in Shakespeare. Different word, different concept, same English lemma.",
  },
  government: {
    founders_title: "The Founders' government",
    founders_subtitle: "Comparative-political — state, new, British, French",
    shakespeare_title: "Shakespeare's government",
    shakespeare_subtitle: "Hardly present — only 24 uses in all his works",
    reading:
      "Shakespeare uses the word government 24 times across his complete works — once per play on average, almost never as a target of distinctive collocates. The Founders use it across the corpus with a vocabulary of comparative politics: state, new, British, French, general, form, seat. The conceptual category of government as a designed institution — something one can frame, found, alter — is essentially a Founders' word. It did not arrive in their writing through Shakespeare.",
  },
  law: {
    founders_title: "The Founders' law",
    founders_subtitle: "Codified — common, constitution, nations, passed",
    shakespeare_title: "Shakespeare's law",
    shakespeare_subtitle: "Dramatic — duke, death, mercy, love",
    reading:
      "Shakespeare's law lives in the world of dukes, capital sentence, and mercy — duke, death, mercy, love, son. The Founders' law lives in the world of statutes — common, constitution, nations, passed, states. The transition from law-as-pronouncement to law-as-codified-text is visible directly in the change of collocational neighbourhood. Federalist No. 78's law is not Measure for Measure's law.",
  },
  people: {
    founders_title: "The Founders' people",
    founders_subtitle: "American collective — states, government, united",
    shakespeare_title: "Shakespeare's people",
    shakespeare_subtitle: "Roman plebs — Sicinius, tribunes, Coriolanus",
    reading:
      "Shakespeare's people is the plebs of Coriolanus's Rome — Sicinius, tribunes, Coriolanus, Brutus, Menenius. The Founders' people is the American electorate — states, America, government, representatives, united. Two collective nouns, two political imaginaries. The Founders' political vocabulary inherits the word but installs an entirely new referent.",
  },
  nature: {
    founders_title: "The Founders' nature",
    founders_subtitle: "Enlightenment abstraction — human, public, government",
    shakespeare_title: "Shakespeare's nature",
    shakespeare_subtitle: "Moral and cosmic — noble, fortune, heaven, sweet",
    reading:
      "Shakespeare's nature is moral and cosmic — noble, fortune, heaven, sweet. The Founders' nature is an Enlightenment abstraction — human, admit, public, government. 'The nature of our government', 'the nature of human affairs' — these are Founders' constructions; Shakespeare's nature is always the world's own.",
  },
  truth: {
    founders_title: "The Founders' truth",
    founders_subtitle: "Argumentative — public, every, evident",
    shakespeare_title: "Shakespeare's truth",
    shakespeare_subtitle: "Dramatic — sweet, lord, my",
    reading:
      "Shakespeare's truth is personal, addressed — sweet, lord, my, gentle. The Founders' truth is argumentative — public, every, evident, self-evident. 'We hold these truths to be self-evident' is a Founders' grammar; Shakespeare's truths are always someone's testimony.",
  },
  time: {
    founders_title: "The Founders' time",
    founders_subtitle: "Administrative — same, mean, ago, letter",
    shakespeare_title: "Shakespeare's time",
    shakespeare_subtitle: "Dramatic — o, lord, love, night, supper",
    reading:
      "Shakespeare's time has the night, supper, love, lord, o — it sits inside the apostrophe-rich dramatic moment. The Founders' time is the time of correspondence — same, mean, ago, congress, letter. 'At the same time', 'in the mean time', 'some time ago' — the Founders' time is bureaucratic and procedural. Shakespeare's is lyrical.",
  },
  liberty: {
    founders_title: "The Founders' liberty",
    founders_subtitle: "Political — religious, civil, public",
    shakespeare_title: "Shakespeare's liberty",
    shakespeare_subtitle: "Hardly distinctive — the word is not a Shakespeare key term",
    reading:
      "Liberty is one of the few targets in this set for which Shakespeare produces almost no distinctive collocates. The word is not central to his lexical world. For the Founders, by contrast, liberty has a dense political collocational neighbourhood: religious, civil, public, blessing, cause. The political vocabulary of liberty was built largely without Shakespeare's help.",
  },
};

export default SYNTHESIS;
