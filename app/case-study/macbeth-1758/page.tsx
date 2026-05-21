import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Kwic from "@/components/Kwic";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title:
    "The 1758 Macbeth Study · Case Study · Shakespeare in the Republic",
  description:
    "In one diary entry late in 1758, the 23-year-old John Adams works his way through Macbeth, transcribing sixteen separate passages and writing his own commentary in the margins. The single densest Shakespeare-reading event in the entire corpus, captured live on the page.",
};

/**
 * The sixteen Macbeth quotations from Adams's diary entry
 * "Shakespeare's Characters and Figurative Language" (October-December
 * 1758), ordered as they appear in the document. That is also the
 * order they appear in Macbeth (Act V Sc. 5 first, then Act II/III,
 * then Act I material at the end). The order tracks Adams's eye
 * across the play, not the play's own sequence.
 */
const cascade = [
  {
    note: "Adams opens with Macbeth's reaction to news of his wife's death, the 'Tomorrow' soliloquy, Act 5 Scene 5.",
    matched: "Lifes but a walking Shadow, a Poor Player That struts and frets his Hour upon the Stage And then is heard no more! It is a Tale Told by an Ideot, full of Sound and Fury Signifying Nothing.",
    match: ["walking Shadow", "struts and frets his Hour", "heard no more", "Sound and Fury Signifying Nothing"],
    scene: "Macbeth 5.5",
  },
  {
    note: "Adams's gloss: 'Here he compares Life, 1st to a Candle, then to a Shadow, an Image taken from scripture, then to a Player on the stage…' He has read this passage as a string of similes nested inside a single mood.",
    matched: "Mackbeth and his Wife and Iago are Characters of Fiends, not of men. The times have been, that when the Brains were out, the man would die, and there an End, but now they rise again with 20 mortal murders on their Crowns, and push us from our stools.",
    match: ["when the Brains were out", "rise again with 20 mortal murders"],
    scene: "Macbeth 3.4 (the banquet scene)",
  },
  {
    note: "Then the omens around Duncan's murder. Adams works through Macbeth Act II Scene IV systematically.",
    matched: "a faulcon towering in her Pride of Place, was by a mousing Owl haukt at and killed. The faulcon is Duncan, the mousing Owl is Mackbeth. The old man observed the Omen.",
    match: ["faulcon towering in her Pride of Place", "mousing Owl"],
    scene: "Macbeth 2.4",
  },
  {
    note: "Adams continues with Rosse's report of Duncan's horses.",
    matched: "Duncans Horses, beauteous and swift, the Minions of their Race, turned wild in Nature, broke their stalls, flung out, contending gainst Obedience, as they would make War with man. Thriftless Ambition that will raven up thy own lifes means.",
    match: ["beauteous and swift", "wild in Nature, broke their stalls", "contending gainst Obedience", "Thriftless Ambition"],
    scene: "Macbeth 2.4",
  },
  {
    note: "Adams's quotation glides into Act II Scene III, the witches' weather, the unnatural night of the murder.",
    matched: "Lamentings heard i'the air, strange screams of Death. Of dire Combustion and confusd Events New hatchd to the woeful time. The obscure bird clamourd the livelong night Some say the Earth was feverous and did shake.",
    match: ["Lamentings heard", "strange screams of Death", "the livelong night", "the Earth was feverous and did shake"],
    scene: "Macbeth 2.3",
  },
  {
    note: "The 'Sleep no more' passage, Macbeth 2.2. Adams's commentary now in the margin: 'Mackbeths Imagination was [struck?] and afraid, was as lively and teemed with Notions…'",
    matched: "His imagination created 100 things, a Voice crying, Sleep no more, Mackbeth doth Murder Sleep; the innocent Sleep. Sleep that knits up the ravelled sleeve of Care, the Death of each days life sore Labours Bath, Balm of Hurt minds, great natures second Course, chief Nourisher in Lifes feast.",
    match: ["Sleep no more", "Mackbeth doth Murder Sleep", "innocent Sleep", "Balm of Hurt minds", "second Course, chief Nourisher"],
    scene: "Macbeth 2.2",
  },
];

export default function Macbeth1758CaseStudy() {
  return (
    <CaseStudyLayout
      title="The 1758 Macbeth Study"
      subtitle="One diary entry. Sixteen quotations. The 23-year-old Adams thinking through Macbeth in real time."
      anchorFinding={
        <>
          In a single diary entry titled{" "}
          <em>Shakespeare&rsquo;s Characters and Figurative Language</em>{" "}
          (late 1758), the project&rsquo;s catalogue finds{" "}
          <strong>sixteen</strong> direct quotations from <em>Macbeth</em>:
          the densest Shakespeare reading event in the entire
          corpus across all six Founders, and the foundation of the
          Macbeth thread that runs through Adams&rsquo;s writing for
          the next sixty years.
        </>
      }
      heroImage={asset("/images/historical/first-folio-macbeth-p738.jpg")}
      heroAlt="First Folio (1623): Macbeth."
      heroCaption="Macbeth in the First Folio (1623). The play Adams worked through in his late-1758 diary."
      relatedEssay={{ href: "/essay/two-modes", title: "Two Modes of Shakespearean Influence" }}
    >
      <div className="has-dropcap">
        <p>
          The 1758 diary entry titled{" "}
          <em>Shakespeare&rsquo;s Characters and Figurative
          Language</em> is, by the project&rsquo;s measure, the
          densest single moment of Shakespearean reading in the
          entire six-Founder corpus. In one document (running
          to roughly a thousand words of Adams&rsquo;s own writing
          interleaved with sixteen verbatim passages from{" "}
          <em>Macbeth</em>) the 23-year-old Adams works his way
          through the play, transcribing the passages that struck
          him and writing his own commentary in the margin. It is a
          piece of historical reading captured live on the page.
        </p>
      </div>

      <p>
        The entry is dated &ldquo;October-December 1758,&rdquo; which
        is to say Adams probably wrote it over several sittings.
        He is in his father&rsquo;s house in Braintree, recently
        admitted to the Massachusetts bar, building a law practice,
        and reading prodigiously. He has just turned twenty-three.
        Forty years before he will become President, he is doing
        what every literate young man of his generation was
        supposed to do, and very few left such complete records of:
        sitting alone with a copy of Shakespeare and a notebook,
        and thinking his way through.
      </p>

      <p>
        What the diary entry captures, and what the catalogue
        flags as sixteen distinct direct quotations, is the
        difference between reading Shakespeare and{" "}
        <em>working</em> Shakespeare. Adams isn&rsquo;t reading the
        play; he&rsquo;s taking it apart. The cascade below is the
        first six of those sixteen passages, in the order they
        appear in his diary, not the order they appear in
        the play. Which order Adams chose to copy them in is
        itself a story about how a young lawyer reads dramatic
        verse for the first time.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        The cascade, in his order
      </h2>

      {cascade.map((c, i) => (
        <div key={i}>
          <p className="text-sm text-ink-muted italic mt-8 mb-2 leading-relaxed">
            <span className="text-folio font-display mr-2 not-italic">
              {i + 1}.
            </span>
            {c.note}
          </p>
          <Kwic
            text={c.matched}
            match={c.match}
            source="John Adams, Diary"
            date="October–December 1758"
            shakespeareSource={c.scene}
            docId="Adams/02-01-02-0010-0007-0005"
          />
        </div>
      ))}

      <p className="text-sm text-ink-muted italic mt-6 leading-relaxed">
        The diary continues for ten more verbatim Macbeth passages
        after these. The full catalogue lists sixteen in
        total. Adams writes his own analytical glosses between
        them: he is, in real time, building his theory of how
        Shakespeare layers his images, how Lady Macbeth and her
        husband and Iago all belong to the same class of
        &ldquo;Characters of Fiends, not of men.&rdquo; The same
        speeches he is studying here at twenty-three will surface
        in his writing for the rest of his life.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        What sixty years of Shakespeare flow from this entry
      </h2>

      <p>
        Every other Adams Shakespeare reference in the project
        catalogue is, in some sense, an echo of this 1758 entry.
        The Lady Macbeth thread (<em>I have given suck</em>)
        that Adams returns to in 1765, 1782, 1799, and 1818
        is the same Lady Macbeth Adams is reading here, twenty-two
        years younger. The <em>Tomorrow</em> soliloquy that Adams
        invokes in 1813 to attack a political opponent (&ldquo;a
        Tale told by an Ideot full of sound and fury Signifying
        Nothing&rdquo;) is exactly the passage at the top of his
        1758 cascade. The Macbeth-banquet-scene image about brains
        being out and men rising again with murders on their
        crowns is one Adams will quote across his life. The
        Macbeth-soliloquy on sleep (<em>Sleep no more</em>) is
        one he will paraphrase to his children.
      </p>

      <p>
        The 1758 cascade, in other words, is the source layer of
        the Lady Macbeth, Tomorrow, and Sleep threads that
        criss-cross Adams&rsquo;s prose for the next sixty years.
        Without this single multi-session diary entry, three of
        the project&rsquo;s case studies would lose most of their
        material. With it, you can almost watch the citational
        habit form.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Other reading episodes in the catalogue
      </h2>

      <p>
        The 1758 Macbeth study is the densest reading episode in
        the corpus, but it is not the only one. The catalogue
        records four other Adams documents that each contain three
        or more direct Shakespeare quotations:
      </p>

      <ul className="my-6 text-base text-ink-soft space-y-3 pl-6 list-disc">
        <li>
          <strong>1758 Othello to Cranch.</strong> A letter
          to Richard Cranch the same year as the Macbeth diary
          entry, with six Othello quotations. Adams as a young
          lawyer trying his hand at literary discussion in a
          letter to a friend, working from <em>Othello</em> the way
          he worked from <em>Macbeth</em> in the diary.
        </li>
        <li>
          <strong>1794 Tempest to Abigail.</strong> A letter
          to Abigail, 17 May 1794, with eleven <em>Tempest</em>{" "}
          quotations. Adams is fifty-eight, Vice President, in
          Philadelphia. The letter is a meditation on a play he
          has been re-reading; the citation density rivals the
          1758 cascade.
        </li>
        <li>
          <strong>1805 Henry V/VI to John Quincy.</strong> A
          letter to his son, 20 January 1805, with five
          quotations from the Henry plays. Adams in retirement,
          guiding his son&rsquo;s political reading.
        </li>
        <li>
          <strong>1812 Julius Caesar to Smith.</strong> A
          letter to William Stephens Smith, 15 October 1812, with
          three direct Julius Caesar quotations. The play that
          will furnish Adams&rsquo;s late masterpiece quotation
          (the <em>Cry havoc</em> letter to his grandson; see the{" "}
          <Link href="/case-study/cry-havoc-1822">
            Cry Havoc case study
          </Link>
          ).
        </li>
      </ul>

      <p>
        Five reading episodes, all Adams. No comparable episode
        exists for any other Founder in the catalogue. The 1758
        Macbeth study is the originating moment; the four others
        are continuations of a habit that the diary entry made.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        Read about the threads that flow forward from this entry in
        the{" "}
        <Link href="/case-study/lady-macbeth-and-herod" className="underline">
          Lady Macbeth and Herod
        </Link>{" "}
        case study, see the same dot cluster from the data side at
        the densest point of the{" "}
        <Link href="/explorer/timeline" className="underline">
          Quotation Timeline
        </Link>
        , or read the original diary entry on{" "}
        <a
          href="https://founders.archives.gov/documents/Adams/02-01-02-0010-0007-0005"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Founders Online
        </a>
        .
      </p>
    </CaseStudyLayout>
  );
}
