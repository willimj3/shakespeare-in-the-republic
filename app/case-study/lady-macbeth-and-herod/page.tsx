import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Kwic from "@/components/Kwic";
import EventTimeline from "@/components/charts/EventTimeline";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title:
    "Lady Macbeth and Herod · Case Study · Shakespeare in the Republic",
  description:
    "John Adams quotes Lady Macbeth's 'I have given suck' speech four times across fifty-three years, pairing it with biblical Herod in 1782, softening it into parental advice in 1799, and turning it into the figure of revolutionary consciousness in 1818.",
};

const events = [
  {
    year: 1765,
    context: "Canon and Feudal Law",
    recipient: "Pamphlet, age 30",
  },
  {
    year: 1782,
    context: "England's war as Lady Macbeth",
    recipient: "to Philip Mazzei",
  },
  {
    year: 1799,
    context: "rewritten as parental advice",
    recipient: "to son Thomas",
  },
  {
    year: 1818,
    context: "the moment of the Revolution",
    recipient: "to Hezekiah Niles",
  },
];

export default function LadyMacbethAndHerodCaseStudy() {
  return (
    <CaseStudyLayout
      title="Lady Macbeth and Herod"
      subtitle="A single Shakespearean speech, reached for four times across fifty-three years."
      anchorFinding={
        <>
          John Adams returns to Lady Macbeth&rsquo;s &ldquo;I have given
          suck&rdquo; speech from <em>Macbeth</em> 1.7 four separate
          times between 1765 and 1818. In 1782 he pairs it with biblical
          Herod to figure England&rsquo;s war. In 1818 the same speech
          becomes his definition of the American Revolution itself.
        </>
      }
      heroImage={asset("/images/historical/first-folio-macbeth-p738.jpg")}
      heroAlt="First Folio (1623): Macbeth."
      heroCaption="Macbeth in the First Folio (1623). The 'given suck' speech is in 1.7."
      relatedEssay={{ href: "/essay/two-modes", title: "Two Modes of Shakespearean Influence" }}
    >
      <div className="has-dropcap">
        <p>
          Of all the passages of Shakespeare that John Adams ever
          quoted, the one he returned to most often, across the most
          years, and in the most different moods, is the one no-one
          would have predicted: Lady Macbeth&rsquo;s vow that she
          would, if she had sworn to it, smash her own infant&rsquo;s
          skull. It is one of the darkest speeches in the canon, and
          Adams carries it with him from age thirty through age
          eighty-three.
        </p>
      </div>

      <p>
        The line he kept returning to is the one Lady Macbeth uses to
        steady her husband&rsquo;s nerve in Act 1, Scene 7, the moment
        before the murder of Duncan. She is reproaching him for
        wavering, for being less resolute than she is. If he
        broke his vow, she says, she could break a worse one of her
        own:
      </p>

      <blockquote className="font-display text-lg text-ink-soft border-l-2 border-folio pl-4 my-6 leading-snug">
        I have given suck, and know<br />
        How tender &rsquo;tis to love the babe that milks me:<br />
        I would, while it was smiling in my face,<br />
        Have pluck&rsquo;d my nipple from his boneless gums,<br />
        And dash&rsquo;d the brains out, had I so sworn as you<br />
        Have done to this.
      </blockquote>

      <p>
        Two centuries later this passage is still read as one of the
        most disturbing in Shakespeare. Adams read it that way too. He
        called it, in 1765, the kind of image &ldquo;I cannot think of
        without horror.&rdquo; And then he kept reaching for it.
      </p>

      <EventTimeline
        events={events}
        yearMin={1760}
        yearMax={1825}
        height={210}
        caption="Four uses of the 'I have given suck' speech across fifty-three years of Adams's writing. Each is in a completely different rhetorical register."
        ariaLabel="Timeline showing John Adams's four uses of Lady Macbeth's 'I have given suck' speech, in 1765, 1782, 1799, and 1818."
      />

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1765: the first sighting
      </h2>

      <p>
        Adams encounters the passage first (or first leaves a
        trace of it) in his pamphlet <em>A Dissertation on the
        Canon and the Feudal Law</em>, written in 1765 in the aftermath
        of the Stamp Act. He is thirty years old, a country lawyer with
        a young family, arguing against an English political culture
        that, he thinks, is preparing to treat the colonies as
        children to be punished. To represent the moral horror of a
        mother who could do that to her own children, he reaches for
        Lady Macbeth:
      </p>

      <Kwic
        text="When you compare her to the infamous miscreant, who lately stood on the gallows for starving her child? When you resemble her to Lady Macbeth in Shakespear, (I cannot think of it without horror) Who 'had given suck, and knew How tender 'twas to love the Babe that milk'd her.' But yet, who could 'Even while 'twas smiling in her Face, Have pluck'd her Nipple from the boneless Gums, And dash'd the Brains out.'"
        match={[
          "Lady Macbeth in Shakespear",
          "I cannot think of it without horror",
          "given suck",
          "dash'd the Brains out",
        ]}
        source="A Dissertation on the Canon and the Feudal Law, No. 4"
        date="21 October 1765"
        shakespeareSource="Macbeth 1.7"
        docId="Adams/06-01-02-0052-0007"
      />

      <p>
        What makes the passage so striking in 1765 is that Adams quotes
        the Lady Macbeth speech in <em>order to refuse</em> the
        comparison. The whole rhetorical move is: don&rsquo;t describe
        England as a Lady Macbeth, because that&rsquo;s an unbearable
        thought, and it isn&rsquo;t true. The unworthy thought is named
        in order to be set aside. He immediately pivots: &ldquo;Let us
        banish forever from our minds, my countrymen, all such unworthy
        ideas of the King, his ministry and parliament.&rdquo;
      </p>

      <p>
        The pamphlet of 1765 records a 30-year-old Adams holding the
        line at moral charity. Seventeen years later he stops holding
        it.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1782: Herod, then Lady Macbeth
      </h2>

      <p>
        The Revolutionary War is in its eighth year. Adams is in
        Holland, exhausted and indignant, working to extract Dutch
        recognition of American independence. He sits down to write
        to Philip Mazzei, the Italian writer who knew Jefferson and
        who had become a kind of European interpreter of the American
        cause. Adams is trying to convey what England has tried to
        do. The 1765 charity is gone:
      </p>

      <Kwic
        text="I never could find an Image to represent the wickedness of this attempt in Britain. Herod's murder of the Innocents was a trifle in comparison. Lady Macbeth uttered a Sentiment a little like it. 'I have given Suck; and know how tender tis to love the Babe that milks me: yet would I: even when 'twas smiling in my face; have plucked my Nipple from its boneless Gums and dash'd the Brains out.' Stop Mother! You may pluck away the Nipple, if you please. But the Boy is too big for the rest — have a Care, Mamma!"
        match={[
          "Herod's murder of the Innocents was a trifle in comparison",
          "Lady Macbeth uttered a Sentiment a little like it",
          "Stop Mother",
        ]}
        source="John Adams to Philip Mazzei"
        date="3 July 1782"
        shakespeareSource="Macbeth 1.7"
        docId="Adams/06-13-02-0091"
      />

      <p>
        This is the rhetorical heart of the case study. Adams reaches
        for the two darkest infanticide images in the Western canon
        (the biblical Herod ordering the slaughter of the
        innocents at Bethlehem, and Lady Macbeth describing what she
        would do to her nursing child) and he <em>ranks
        them</em>. Herod, he says, was a <em>trifle</em> in comparison
        to what England has tried to do. Lady Macbeth gets closer; her
        sentiment was &ldquo;a little like it.&rdquo; The implication
        is that no single image in the canon is dark enough. Adams has
        to layer the biblical and the Shakespearean to approach the
        thing he wants to describe.
      </p>

      <p>
        And then comes the half-comic, half-defiant aside that only
        Adams writes: &ldquo;Stop Mother! You may pluck away the
        Nipple, if you please. But the Boy is too big for the rest
        &mdash; have a Care, Mamma!&rdquo; America, in Adams&rsquo;s
        figuring, is no longer the infant of 1765. The Lady Macbeth
        speech is now the wrong end of the war. The Mother-Country
        is too late to dash anyone&rsquo;s brains out, because the
        Boy has grown.
      </p>

      <p>
        Notice what has happened to the passage between 1765 and
        1782. The same six lines of <em>Macbeth</em> 1.7. The first
        time, Adams quotes them in order to refuse a comparison; in
        the second, he quotes them and says they aren&rsquo;t severe
        enough. The text hasn&rsquo;t changed. Adams&rsquo;s use of
        the text tells the story of seventeen years of escalation.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1799: the same speech, rewritten as parental advice
      </h2>

      <p>
        Seventeen more years pass. Adams is sixty-four, in the third
        year of his presidency, writing to his second son Thomas
        Boylston Adams about a young man Thomas knew who had married
        unwisely. The letter is full of the kind of warm,
        slightly-grumpy parental advice that Adams writes well. And
        then a sentence appears that, on its face, looks like a
        line of Adams&rsquo;s own:
      </p>

      <Kwic
        text="The Conduct of Phoebe's Husband therefore would not be an Object of Imitation for me. I have been young and know how tender 'tis to love. I have never dictated to my Children. Perhaps it would have been better in two Instances, if I had. I wish them to Use a prudent Consideration, and not be led away by a very wild but a very fickle and transient passion to take a step which they never can tread back."
        match={["I have been young and know how tender 'tis to love"]}
        source="John Adams to Thomas Boylston Adams"
        date="17 October 1799"
        shakespeareSource="Macbeth 1.7 (paraphrased)"
        docId="Adams/04-14-02-0014"
      />

      <p>
        It is not a line of Adams&rsquo;s own. It is Lady Macbeth&rsquo;s.
        Adams has dropped &ldquo;given suck&rdquo; and replaced it
        with &ldquo;been young.&rdquo; He has kept &ldquo;know how
        tender &rsquo;tis to love.&rdquo; The corpus catalogue tags
        this as a direct quotation because the second half of the line
        is exact and unmistakable.
      </p>

      <p>
        What Adams has done is more interesting than the
        identification. He has taken the most violent maternal voice
        in Shakespeare and rewritten it into a piece of his own
        avuncular wisdom. The infanticidal vow has become parental
        regret. He keeps the cadence and the second clause; he changes
        only what produces the speaker&rsquo;s authority. Lady Macbeth
        speaks from having nursed a child; Adams speaks from having
        been a young man in love. The line is now safe enough to send
        to his own son. The play is showing through, but only Adams
        is hearing it.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        1818: and now the Revolution itself
      </h2>

      <p>
        Adams is eighty-three. He has been out of the presidency for
        seventeen years, his wife Abigail has been dead for nine
        weeks, and he is writing to the newspaper editor Hezekiah
        Niles in a letter that is now one of the most-quoted
        documents on the early Republic. Niles had asked Adams what
        the American Revolution <em>was</em>. The letter
        Adams sends back contains the famous sentence about the
        Revolution being &ldquo;in the minds and hearts of the
        people&rdquo; long before any shot was fired. And then,
        building toward that sentence, he reaches one more time for
        Lady Macbeth:
      </p>

      <Kwic
        text="The People of America had been educated in an habitual Affection for England as their Mother-Country; and while they Thought her a kind and tender Parent (erroneously enough, however, for She never was Such a Mother,) no Affection could be more Sincere. But when they found her a cruel Beldam willing, like Lady Macbeth, to 'dash their Brains out,' it is no Wonder if their fillial Affections ceased and were changed into Indignation and horror. This radical Change in the Principles, Opinions Sentiments and Affection of the People, was the real American Revolution."
        match={[
          "like Lady Macbeth",
          "dash their Brains out",
          "was the real American Revolution",
        ]}
        source="John Adams to Hezekiah Niles"
        date="13 February 1818"
        shakespeareSource="Macbeth 1.7"
        docId="Adams/99-02-02-6854"
      />

      <p>
        Lady Macbeth, in this last sighting, is no longer an
        unbearable image to be refused (1765), or a measuring stick
        for England&rsquo;s wickedness (1782), or a Shakespearean
        cadence to be re-tooled into parental advice (1799). She is
        the figure for the moment of moral discovery itself. The
        Revolution, in Adams&rsquo;s 1818 telling, is what happened
        in the moment that the American mind <em>recognized</em>
        England as a Lady Macbeth. Not the war, not the Declaration,
        not the constitutional debates: the perceptual flip. The
        sentence that names the discovery is the sentence the rest
        of the paragraph is built around.
      </p>

      <p>
        Adams, in other words, is using Shakespeare to explain the
        American Revolution to America. Lady Macbeth has become a
        figure strong enough to carry the central thesis of his
        late political memory.
      </p>

      <hr />

      <h2 className="font-display text-3xl text-ink mt-10">
        Why this matters
      </h2>

      <p>
        The Lady Macbeth thread is the clearest single instance of
        what the project, in its{" "}
        <Link href="/essay/two-modes">Two Modes essay</Link>, calls
        the citational mode of Shakespearean inheritance. Adams keeps
        the play actively in mind for fifty-three years. He returns to
        the same passage. He names the source. He bends the passage
        to whatever the moment requires (refusal, moral
        ranking, parental advice, historical thesis) and the
        passage bends because it is alive in his head, not because he
        has gone to the shelf to look it up.
      </p>

      <p>
        It is also a clear example of <em>why</em> the project insists
        on biographical case study alongside frequency statistics.
        Adams uses the verb <em>dash</em> 23 times in his collected
        writing and <em>nipple</em> three. No counting protocol would
        find this passage as a Shakespearean signature. The signature
        is in the <em>application</em>. The same six lines from{" "}
        <em>Macbeth</em> 1.7 are doing four entirely different jobs
        of rhetorical work in 1765, 1782, 1799, and 1818, and you
        cannot see that pattern by counting alone. You have to
        read four letters across five decades and watch the same
        Shakespearean speech come up again and again, refitted each
        time to a new moment in the speaker&rsquo;s life.
      </p>

      <p>
        Lady Macbeth, herself, is Adams&rsquo;s diagnostic for the
        moments when ordinary moral language has run out. When he
        cannot otherwise figure how bad something is, he turns to her.
        When he wants to refuse the comparison, he names her. When he
        wants to dignify a piece of parental advice with the cadence
        of high tragedy, he borrows from her. When he wants to define
        the Revolution itself, she is the figure that defines it. No
        other Founder uses any speech of Shakespeare&rsquo;s in any of
        these four ways, much less in all of them.
      </p>

      <div className="ornament" />

      <p className="text-sm text-ink-muted italic text-center">
        See the same Adams citational mode in{" "}
        <Link href="/case-study/tide-in-the-affairs">
          There Is a Tide
        </Link>
        ,{" "}
        <Link href="/case-study/methinks-i-hear-you">
          Methinks I Hear You
        </Link>
        , and the late counterpart in{" "}
        <Link href="/case-study/cry-havoc-1822">
          Cry Havoc, 1822
        </Link>
        . Or read the framing argument in{" "}
        <Link href="/essay/two-modes">Two Modes</Link>.
      </p>
    </CaseStudyLayout>
  );
}
