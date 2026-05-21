---
title: "Shakespeare in the Republic"
subtitle: "A Narrative Reading of Six Lives in Twenty-Five Million Words"
author: "Mark J. Williams"
date: 2026-05-20
---

## A note on this companion piece

This is the narrative version of the analysis. The full statistics, formulas, contingency tables, effect sizes, and caveats are in the companion scholarly paper (`paper.md` in this directory). What follows is the same story told differently: with the people behind the data, the specific scenes the corpus lets us reconstruct, and just enough methodology to know that the claims are accountable. The structure mirrors the scholarly paper at one level removed: an *Introduction* that frames the question, a brief *How we asked* section that names the methods, a *What we found* section in seven biographical scenes, and a *What it adds up to* section that puts the findings together.

Anyone who wants the underlying numbers can follow the references back. Anyone who wants to know what the corpus is *saying* should be able to read this.

---

## 1. Introduction: the puzzle

### What is the question?

The men who built the American republic wrote constantly. Six of them (John Adams, Benjamin Franklin, Alexander Hamilton, Thomas Jefferson, James Madison, and George Washington) left behind nearly twenty-five million words of letters, diaries, drafts, debates, speeches, and essays. They had no shared style. Hamilton's prose marches; Jefferson's drifts; Adams's argues with itself; Franklin's smiles. But they had one thing in common: they all grew up reading Shakespeare.

The question is not whether they read Shakespeare. They all did. The question is what *survived*. Two centuries after Shakespeare died, an ocean away, did anything of his English persist in the Founders' writing? And if so, in whose?

### Why it matters

This is a question with two audiences. For legal and political-theory readers, it bears on the intellectual genealogy of American constitutional vocabulary. *Power*, *liberty*, *honour*, *people*, *government*, *law*: these are inherited words. Whether they are inherited *concepts* is an empirical question with concrete implications for how we read the Constitution. For corpus linguists, the question is a worked example of a methodologically rigorous influence analysis at a 25-million-word scale, where the answers don't depend on what we hoped to find.

### What we set out to test

Four specific propositions, in plain language:

- **The vocabulary claim.** When two corpora are different sizes, naïve comparisons of vocabulary diversity can be misleading. Under a proper size-matched comparison, does Shakespeare's vocabulary really stand apart from the Founders', or is the apparent difference an artefact of corpus size?
- **The coinage claim.** Of phrases popularly attributed to Shakespeare (think of Bernard Levin's famous "On Quoting Shakespeare" passage, or the kind of list that turns up in any Shakespeare-in-the-modern-world essay), how many appear distinctively often in Shakespeare versus the Founders? Or have most of them long since become general English?
- **The convergence claim.** Do several independent ways of measuring influence agree on the same per-Founder ranking, or do they disagree and reveal that no single ranking exists?
- **The conceptual-inheritance claim.** When the same word appears in both corpora, does it appear in the same conceptual world?

The seven scenes below answer each of these in turn, with the corpus showing its work as we go.

---

## 2. How we asked the question

This section is short on purpose. Anyone who wants the methods in full detail can read §2 of the scholarly companion. The essentials are these:

- **The corpus.** 68,807 documents totalling 24.6 million words for the six Founders, drawn from the Founders Online archive and supplemented with the Federalist Papers, Franklin's *Autobiography*, Jefferson's *Notes on the State of Virginia*, Madison's Convention debates, Washington's *Farewell Address*, and Hamilton's *Report on Manufactures*. 38 documents and 891,092 words for Shakespeare, the Project Gutenberg complete-works edition.
- **The cleanup.** Folio stage directions are stripped; archaic spellings (*hath* → *has*) are folded for the comparison analyses; clitic contractions (*don't*) are split consistently in both corpora; Project Gutenberg licence boilerplate is removed (it had been contaminating earlier runs); proper names (Hamlet, Iago, Lafayette) are filtered for the keyword analyses where they would otherwise dominate.
- **The methods.** Eight analyses, each measuring a different facet of influence: keyword distinctiveness, lexical richness with sample-size correction, collocational worlds around common abstract nouns, pronoun profiles, archaic-form survival, metaphor types, statistical-stylistic intersections, and named-phrase usage. Each analysis reports effect sizes (not just p-values) because at this corpus size, almost everything is "highly significant". The work is in seeing which differences are *substantial*.
- **The reproducibility.** Every claim in this narrative traces to a specific row in a specific CSV file in the project's `tables/` directory. Every figure traces to a script in `scripts/`. Every random sample uses a fixed seed (42). Anyone can reproduce the run from a fresh clone.

The composite ranking the analysis produces puts John Adams at the top (0.88) with Benjamin Franklin a step behind (0.76), Jefferson (0.68) and Washington (0.28) in the middle, and Hamilton (0.22) and Madison (0.18) at the bottom. Adams ranks first on six of the eleven methods, including the three new evidence-based measures added in the methodology-v2 expansion; Franklin ranks first on five of the statistical/stylistic methods.

![Composite Shakespeare-likeness ranking. Adams leads (0.88), Franklin second (0.76), with Jefferson, Washington, Hamilton, and Madison following.](../data/figures/paper_01_composite_ranking.png)

What follows are the seven scenes the data lets us reconstruct, organised by Founder. Each scene names the specific finding it is illustrating and indicates the case study (CS1 to CS8) where the full numbers live.

---

## 3. What we found: seven scenes

### Scene 1: a young lawyer reads Shakespeare in Massachusetts, 1758

**(CS1 keyword analysis; CS3 collocates; CS8 coinage usage. Finding: Adams as the *citational* Shakespearean.)**

It is the night of 21 December 1758. John Adams is twenty-three years old, recently admitted to the bar, living in his father's house in Braintree, Massachusetts. He has been keeping a diary for two and a half years. He has just spent the evening, the diary tells us, listening to a tavern-keeper named Crosby rave about his daughter's disobedience. Adams writes:

> Crosby was as drunk as a Beast. He raves, against his Daughters Disobedience and Ingratitude … in as wild mad a manner as King Lear raves.

Then, in the same diary entry, he stops to think about the playwright who gave him the comparison:

> Let me search for the Clue, which Led great Shakespeare into the Labyrinth of mental Nature! Let me examine how men think.

The twenty-three-year-old in Braintree is using Shakespeare as a *theorist of human motivation*. Not as entertainment, not as a literary touchstone, but as an applied psychology: a way of understanding why a drunk tavern-keeper rages against his ungrateful daughters. King Lear is not a character in a play. Lear is a diagnostic category.

This is the beginning of Adams's lifelong Shakespearean reading. He returns to it in 1772, in literary-critical reflection on Shakespeare's "Quaintness of Style"; in 1776, comparing Benjamin Harrison to Falstaff in a letter to James Warren; in 1803, in retirement, reading *Coriolanus* and praising "a Spirit, Decision and Intrepidity that I admire." The diary entries trace a single intellectual line across forty-five years of Adams's life: Shakespeare is the writer he comes back to when he wants to think about how people behave.

The corpus shows this in the data. Adams uses the word *noble*, Shakespeare's chivalric virtue word, 421 times across his writing. Most uses cluster in the early diaries:

- *1756*: "the spirits, but commendation enlivens and stimulates them to a **noble** ardor and emulation."
- *1758*: "I find it, a **noble** Exercise. It exercises my Lungs, raises my Spirits …"
- *1761*: "a **noble** Adventure. But on further Consideration the Design seemed impracticable."

These are the words of a young man reading Shakespeare and imitating the syntax. *Noble ardor*, *noble exercise*, *noble adventure*: these are Shakespeare's adjectival constructions, transplanted into the Massachusetts diary of a colonial lawyer.

Adams's most distinctive Shakespearean tic is one specific construction: **methinks I hear you**. He uses it as an indirect-address frame across thirty-two years:

- *1756*, age 20, private diary: "**Methinks** I hear you say, this is odd talk for J. Adams."
- *1765*, age 30, "Dissertation on the Canon and the Feudal Law": "**methinks** there has not appeared in New England a stronger veneration for their fathers …"
- *1775*, age 40, to the Inhabitants of Massachusetts: "**Methinks** I hear his lordship upon this occasion, in a soliloquy somewhat like …"
- *1776*, age 41, to James Warren: "**methinks** I hear you Say We want to compleat our Form and Plan …"
- *1788*, age 53, to his son-in-law William Stephens Smith: "**Methinks** I hear you whisper, it won't be long ere they erect their …"

The word *methinks* was already archaic in 1756. By 1788 (Adams about to become Vice President) it was nearly extinct in spoken or written American English. But Adams keeps using it. He learned the trick from Shakespeare (*Hamlet*: "Methinks I see my father"; *Hamlet*: "Methinks I hear him still") and he never gives it up.

This is what the corpus shows when we ask the influence question carefully. It is not a list of phrases Adams copied. It is a literary frame, learned at twenty, deployed across the rest of his life as part of the texture of his prose. **Adams's Shakespeare is *citational*. He reaches for it deliberately, with awareness, as a literary resource.** When we count named-Shakespeare-coined phrases (CS8), Adams leads dramatically: 15 of 24 candidate phrases used, 139 total hits, the most of any Founder by a wide margin.

---

### Scene 2: a sixteen-year-old printer's apprentice in Boston, 1722

**(CS5 archaic-form survival; CS6 metaphor profile; CS7 CFA. Finding: Franklin as the *absorbed* Shakespearean.)**

In April 1722, an apprentice in his half-brother's print shop in Boston published a satirical essay under the pseudonym "Silence Dogood." The author was Benjamin Franklin. He was sixteen years old. The first Dogood essay imitates the *Spectator*'s opening: the reader is introduced to an imagined widow who will offer commentary on the social world of New England. The prose is unusual for a sixteen-year-old in 1722 not because it is witty (Franklin would always be witty) but because it is *archaic*. It contains, in its first published essays, a specific Shakespearean contraction that was already two-hundred years out of date:

- Silence Dogood No. 5: "**'tis** only the Error of this inhumane Custom that hindred them …"
- Silence Dogood No. 7: "**'tis** Pity that such an Excellent Piece should not be dignify'd …"
- Silence Dogood No. 9: "**'Tis** not inconsistent with Charity to distrust a Religious Man in his Office …"
- Silence Dogood No. 10: "**'tis** to be supposed at least as many Women shall die …"
- Silence Dogood No. 12: "**'Tis** true, drinking does not improve our Faculties …"

The contraction *'tis* is Shakespeare's. It appears 1,913 times per million words in Shakespeare's corpus, saturating the text. In general 18th-century English it was vanishing. In Franklin's corpus it persists at 375 times per million words across his lifetime of writing: by far the highest rate of any Founder. Hamilton uses it at 150/M; Adams at 34; Washington at 31; Jefferson at 34. Madison almost never.

The natural inference is that Franklin learned to write English by reading Shakespeare and never re-learned. His brother's print shop received books to typeset; one of them was the *Spectator* (which Franklin says he copied out by hand to teach himself prose composition); others would have included Shakespeare. By sixteen he was already writing 18th-century essays in 17th-century English, and he never lost the rhythm.

The corpus shows that Franklin's Shakespearean register is not a Silence-Dogood-period quirk. It persists into his adulthood and old age:

- 1725, age 19, philosophical tract on free will: "this Objection destroys itself; for whatever an infinitely good God **hath** wise Ends in suffering to be, must be good."
- 1725, same tract: "to say Somewhat **hath** contradicted His Will."
- 1778, age 72, Paris diplomatic mission, formal correspondence about the King of Sicily: "his Majesty the King of the two Sicilies, **hath** ordered the Ports of his Dominions to be open to …"

Fifty-six years separate the first *hath* from the last. The word was archaic in 1722. It was *aggressively* archaic by 1778. Franklin uses it anyway, in formal diplomatic prose, addressing one of the great courts of Europe.

Across every category of archaic form we measured, Franklin leads the Founders by a wide margin:

![Diachronic stylistic-marker survival as a fraction of Shakespeare's rate (CS5). Franklin's row is consistently the darkest, the highest preservation rate of Shakespeare-era forms across categories.](../data/figures/paper_04_archaic_survival.png)

- Shakespeare's second-person archaic (*thou, thee, thy, thine, ye*): Franklin uses these at 444 per million words. Washington uses them at 10. Adams uses them at 96. The next-closest Founder (Madison) uses them at 140, still less than a third of Franklin's rate.
- Shakespeare's archaic verb forms (*hath, doth, art, hast, dost, mayst,* etc.): Franklin: 391/M. The closest Founder (Adams): 264/M. Hamilton: 49/M.
- Shakespeare's archaic contractions (*'tis, 'twas, 'twere*): Franklin: 375/M. Hamilton (second): 150/M. Everyone else: 20-34/M.

The Founder with the *least* formal education writes the *most* archaic English. Franklin never attended a university; he was apprenticed at twelve. The other five Founders had Harvard, Princeton, or William & Mary educations. The natural reading is that Franklin absorbed Shakespearean English by *reading*, not by being taught, and that the absorption stuck because it happened during the years when his prose habits were being formed.

This is a different kind of literary influence from Adams's. Franklin does not quote Shakespeare. He almost never refers to Shakespeare by name. Of twenty-four phrases popularly attributed to Shakespeare that we tested, Franklin writes only five: the *fewest* of any Founder. But his English itself is the most Shakespearean in the Founders' corpus, by every measure of register, archaism, density, metaphor, pronoun distribution, and statistical style. **Franklin's Shakespeare is *absorbed*, not *cited*.** He sounds like Shakespeare because Shakespeare is the English he learned.

---

### Scene 3: Washington at Valley Forge, 6 April 1778

**(CS8 coinage analysis; per-Founder coinage table. Finding: a single literary phrase travelling 179 years to a frozen Pennsylvania field.)**

On 6 April 1778, in winter quarters at Valley Forge, George Washington issued General Orders to his suffering army. The Continental Army had spent four months camped in temperatures regularly below freezing. Approximately one in four soldiers who entered camp in December was now dead. The army's survival as a fighting force was an open question.

In the General Orders that day, Washington wrote a phrase that had not appeared, so far as our corpus shows, in formal American military writing before:

> [The Continental Army should] consider themselves as a **band** of brothers cemented by the Justice of the …

The phrase is *Henry V*, Act 4, Scene 3, the St. Crispin's Day speech, the most famous extended passage of patriotic militaria in English drama:

> We few, we happy few, we band of brothers;
> For he to-day that sheds his blood with me
> Shall be my brother …

Washington, who had no Latin, no university education, and (by his own assessment in correspondence) no literary pretensions, wrote his General Orders during the worst winter of the Revolution by paraphrasing the speech of an English king two centuries dead.

The corpus shows four other uses of *"band of brothers"* in Washington's writing, and four in Adams's. Whether Washington reached for *Henry V* deliberately, or absorbed the phrase from someone else who had absorbed it from Shakespeare (or from one of the eighteenth-century poets who had absorbed it from Shakespeare), the line of transmission is the same. The Continental Army's commander, addressing freezing soldiers, paraphrased a speech written in 1599 for the London stage.

Our coinage analysis (CS8) adds a useful caveat about phrases like this one. *Band of brothers* is widely listed in popular compilations of Shakespearean phrases, but under proper statistical testing against the Founders' general English it does not survive as Shakespeare-distinctive. By 1778, the phrase had become general English. (A 17th-18th-century reference corpus would help separate Shakespeare-coined phrases from phrases that were already current in early-modern English by Shakespeare's time; we discuss this limitation in the scholarly companion.) But the *route* by which "band of brothers" became general English passes through Shakespeare. The phrase travelled across two centuries, an ocean, and a class divide, and ended up in a document signed by the future first president of the United States. The rest of Washington's distinctive vocabulary in our corpus is military (*quarters, head, officers, army, troops, enemy, regiment, brigade*) and unsurprising for a commander writing across an eight-year war. But the *Henry V* phrase reaches outside that vocabulary. It is the moment when Washington, perhaps unconsciously, becomes a Shakespearean.

---

### Scene 4: Hamilton in the Treasury Department, 1790

**(CS3 differential collocates; CS7 CFA. Finding: the same word, an entirely different conceptual world.)**

In the early 1790s, Alexander Hamilton served as the first Secretary of the Treasury of the United States. His correspondence from these years is dense, technical, often beautiful in its precision, and (by every measure of influence we ran) the *least* Shakespearean of any Founder's prose.

The corpus surfaces specific examples. Hamilton, writing to Richard Harison on 10 March 1790:

> if a question arises in the **Treasury** Department how far a **power** executed by one partner, or person interested, on behalf of the rest or other person …

And again, writing to George Washington on 19 November 1792:

> there is little doubt that it will be in the **power** of the Treasury to furnish the sum; yet …

Or in a circular from the Treasury Department to the Collectors of the Customs:

> at the Treasury respecting the nature of the **power** of the head of the department "to superintend …

The word *power* appears 24,998 times in Hamilton's writing. Shakespeare uses *power* 348 times. The difference in usage, though, is sharper than the difference in frequency.

Shakespeare's *power* is held by *people*. Its most distinctive collocates are *Richard, Brutus, Cassius, father, king*. Power, in Shakespeare's dramatic world, is a property of an individual sovereign. It is wielded; it is lost; it passes from one named person to another. It can be defended in single combat. *Caesar's power*, *Richard's power*, *the King's power*.

Hamilton's *power* is institutional. Its most distinctive collocates are *treasury, department, executive, federal, congress, exercise*. Power, in his world, is held by *offices*. It is *executed*, *superintended*, *exercised*. It flows from statute and constitution. It is delegated to partners, to heads of departments, to interested persons. *The power of the Treasury* is not the power of any individual treasurer; it is the institutional capacity of the department itself.

This is the same English word doing two entirely different conceptual jobs. Hamilton inherited the vocabulary; he did not inherit the world the vocabulary described. He did not need to. The world he was helping to design (a federal republic with an executive department empowered by statute) did not exist in Shakespeare's England, and Shakespeare's *power* would not have been the right tool for describing it.

Hamilton's prose, accordingly, is the most un-Shakespearean of the Founders'. The CS7 Configural Frequency Analysis confirms it visually:

![Shared significant stylistic types per Founder (CS7), partitioned by bin direction. Franklin and Adams lead on shared HIGH-bin types. Hamilton has zero shared HIGH-bin types: the only Founder for whom this is true.](../data/figures/paper_06_cfa_shared_types.png)

He absorbs the fewest Shakespeare-distinctive words at high frequency (61, vs Adams's 145). He uses the fewest Shakespeare-distinctive contextual patterns (49, vs Adams's 82). Among the twenty per-document stylometric features we tested (sentence length, word length, vocabulary richness, sentiment, punctuation rates) Hamilton has *zero* high-end stylistic intersections with Shakespeare. He is the only Founder for whom this is true.

The reading is not that Hamilton was unliterary. He was extremely literate. His Federalist essays are works of rhetorical density. He had read Shakespeare; he certainly knew the Roman plays. But his intellectual models were Hume and Montesquieu, not the dramatists. His English was the English of late-eighteenth-century continental political philosophy: abstract, hedged, institutional, lawyerly. Shakespeare's language of personal sovereignty was not the resource he needed.

**The corpus, in this sense, is biographically accurate.** The Founder furthest from Shakespeare is the Founder whose intellectual project was furthest from Shakespeare's dramatic world.

---

### Scene 5: Madison records a speech, sometime in the 1810s

**(CS5 archaic forms; CS1 per-Founder keywords. Finding: the data showing a word that *isn't really Madison's*.)**

Of all the Founders, James Madison is the most administratively careful writer. His correspondence is dense with abbreviation: *agst* for *against*, *govt* for *government*, *recd* for *received*, *congs* for *congress*. His prose is the most efficient and the least decorative in the corpus. He runs second-to-last in our composite Shakespeare-likeness ranking.

But Madison has one striking individual feature in our data: the highest rate of the archaic affirmative *ay* (yes, 149 occurrences). Almost every other Shakespeare-distinctive word in Madison's writing is rare. Why is *ay* so frequent?

The answer is hidden in plain view. Madison's corpus includes his transcripts of debates: both the Constitutional Convention of 1787 and decades of congressional and diplomatic proceedings. *Ay* appears in his writing because Madison was *recording the speech of other people who said* it. The word survives in Madison's corpus not as a feature of his own English but as a feature of the deliberative speech he was diligently transcribing. It is the only Shakespearean trace in his data that is not really *his*, and the trace exists because Madison was an extraordinarily faithful recorder.

This is a different kind of corpus-linguistic finding. It is a reminder that the *source* of language matters as much as its presence. Madison did not absorb *ay* from Shakespeare. He absorbed it from the floor of the House of Representatives, from members who absorbed it from somewhere else, possibly from Shakespeare, possibly from older English usage. The data can locate the word in Madison's corpus; only the historian can locate it in Madison's mouth.

The case is the methodological caveat made concrete. When we count a Shakespeare-distinctive word in a Founder's corpus, we are counting its presence in the *text*. We are not counting its presence in the *Founder's own composition*. For most words in most Founders this distinction does not matter; none of the other top items in the per-Founder keyword tables (CS1) turn out to be quoted speech in any systematic way. For *ay* in Madison it matters a great deal.

The same caveat would apply, with less drama, to any quotations the Founders made of each other, of Shakespeare, of the Bible, of Cicero, or of any other source. The corpus is a record of what they *wrote down*. It is a less direct record of what they *said*, and a still less direct record of what they *thought*.

---

### Scene 6: Jefferson writes to a young woman, 1763

**(CS5 archaic forms; CS8 coinage usage. Finding: strategic Shakespeareanism.)**

In 1763 (the year of the Treaty of Paris that ended the Seven Years' War, and the year Thomas Jefferson turned twenty) Jefferson wrote a letter to his friend John Page that contains a Shakespearean construction so rare in his later prose that it stands out:

> how I was charmed to see Orpheus's music all in **thee**.

*Thee*. The second-person archaic. By 1763, in colonial American English, *thee* was largely confined to Quaker speech, religious usage, and poetic register. Jefferson was none of those things; he was a Virginia gentleman writing to a friend about a young woman they both admired. The construction is a Shakespearean flourish (half-quotation, half-stylistic gesture) used because Jefferson is twenty and wants to sound literary in a letter about being charmed by music.

Jefferson uses *thou*, *thee*, *thy*, and *thine* across his correspondence at one of the higher rates among the Founders (128 per million for the category as a whole, compared with Washington's 10 or Hamilton's 74). But almost all of his uses are: (a) very early career, deployed for literary effect; (b) quotations of biblical or classical sources; or (c) carefully placed in formal contexts that call for them.

Jefferson is the most strategically Shakespearean of the Founders. He absorbed less than Franklin and Adams; he used less than Adams; but what he absorbed he deployed with great care. He is the second-most prolific user of the 24 popularly-attributed Shakespearean phrases we tested (9 of 24), and the only Founder in our corpus to write the phrase *et tu, Brute*: Caesar's last words in Shakespeare's *Julius Caesar*, deployed in correspondence in a single instance where its political resonance is unmistakable.

If Adams's Shakespeare is *citational* and Franklin's is *absorbed*, Jefferson's is somewhere in between: he knows Shakespeare well enough to quote him precisely when he wants to, and he chooses his moments. His prose is not soaked in Shakespearean register the way Franklin's is; it is dotted with Shakespearean signals deployed with awareness.

The composite ranking puts Jefferson third, behind Franklin and Adams and ahead of Washington. This is consistent both with his biography (the most-educated Founder, the most widely-read in his generation) and with his prose style (literary, but disciplined; not flamboyant, but precise).

---

### Scene 7: the honour test

**(CS3 differential collocates across 14 abstract nouns; CS6 metaphor profile. Finding: vocabulary inherited, concepts rebuilt.)**

If the previous scenes were about what survived, this one is about what didn't. Shakespeare uses the word *honour* seven hundred and twenty-six times. The Founders use it eighteen thousand nine hundred and fifty times. Both corpora are full of the word. So the question is not whether the word travelled. It travelled massively. The question is whether the *meaning* travelled with the word.

Three Shakespearean passages from our corpus search:

- *Coriolanus*, Act 5, Scene 6: *"I rais'd him, and I **pawn'd** Mine **honour** for his truth; who being so heighten'd, He watered his new plants with dews of …"*
- *Cymbeline*: *"Willingly; And **pawn** mine **honour** for their safety. Since My lord hath interest in them, I will keep them In …"*
- *2 Henry IV*: *"Alas, sweet wife, my **honour** is at **pawn**; And but my going nothing can redeem it."*

In each case Shakespeare's *honour* is something that can be *pawned*: staked, pledged, wagered like a coin, redeemed by action. It is a chivalric concept, half-physical, transferable between persons, recoverable by demonstration. The Renaissance reader knew exactly what it meant to pawn one's honour.

Three passages from the Founders, on roughly the same word:

- Adams, 13 January 1766: *"the **Honour** of attending me might at any Time dispense …"*
- Adams, 23 May 1775: *"We have the **honour** to be, Sir your most obedient humble Servants …"*
- Adams, 25 May 1775: *"We have the **honour** to be, with great respect, Sir &c."*

Same word. Entirely different conceptual world. The Founders' *honour* lives in epistolary openings and closings. It is what one *has* when corresponding with a *Sir*, an *Excellency*, an *Esteemed gentleman*. It is bureaucratic: the formal recognition of social hierarchy in the politeness of correspondence. It is impossible to *pawn*.

This pattern recurs across every politically loaded abstract noun we tested. Below is the contrast between the collocational worlds of each word in Shakespeare and in the Founders. (*Collocational world* = the words that appear most distinctively within five tokens of the target.)

| Word           | Shakespeare's world                              | Founders' world                                          |
|:---------------|:-------------------------------------------------|:---------------------------------------------------------|
| **honour**     | chivalric: *pawn, lord, gentle, mine, kept*      | epistolary: *sir, respect, esteem, excellency, letter*   |
| **power**      | personal: *king, lord, Richard, Cassius, father* | institutional: *congress, executive, states, foreign, treasury* |
| **law**        | dramatic / capital: *duke, death, mercy, love, son* | codified: *states, common, nations, constitution, passed* |
| **love**       | romantic / sexual: *sweet, lord, why, o*         | domestic / patriotic: *country, family, children, tenderest, mrs* |
| **death**      | dramatic: *come, die, love, let*                 | legal / military: *suffer, sentence, sentenced, commander, case* |
| **mind**       | dramatic interiority: *lord, lady, know, bears*  | Enlightenment psychology: *public, human, own, impression* |
| **friend**     | political ally: *king, Antony, Caesar, sweet, lord* | epistolary: *dear, esteem, sincere, servant*          |
| **people**     | Roman plebs: *Sicinius, tribunes, Coriolanus, Brutus* | American collective: *states, America, government, representatives, united* |
| **nature**     | moral / cosmic: *noble, fortune, heaven, sweet*  | Enlightenment: *human, admit, public, government*        |
| **government** | (only 24 hits in Shakespeare)                    | comparative-political: *general, state, new, British, French* |

In every case the Founders inherited the English vocabulary and re-purposed what it meant. *Love* became patriotic and familial, not romantic. *Power* became institutional, not personal. *Law* became constitutional, not dramatic. *Death* became legal, not tragic. *Friend* became the close of a letter. *People* became the American electorate, not the plebs of Coriolanus's Rome.

There is a corresponding pattern in metaphor. The Founders write constantly about the *foundation* of liberty, the *pillar* of government, the *cornerstone* of the constitution, the *body politic*. These are EDIFICE and BODY metaphors. Shakespeare uses zero EDIFICE metaphors for any of these political-target nouns in our entire corpus.

![Per-Founder metaphor profile vs Shakespeare's grey-filled baseline. Franklin's outline traces Shakespeare's shape most closely. EDIFICE and PLANT axes show metaphor types the Founders invented for political institutions Shakespeare never wrote about.](../data/figures/paper_05_metaphor_radar.png)

The "foundation of liberty" / "pillar of government" / "ship of state" complex of metaphors that runs through Hamilton's, Madison's, and Adams's political prose is a *Founders' invention*, not a Shakespearean inheritance. They learned from Shakespeare the *habit* of thinking abstractly with concrete source-domain words; they did not inherit the specific conceptual mappings.

**This is the largest substantive finding.** The Founders received Shakespeare's English not as a tradition to extend but as a vocabulary to remake. The words came across the Atlantic. The world the words described had to be invented anew. Their political vocabulary is, in this precise sense, a *re-purposed* English: the lexis of Elizabethan and Jacobean drama deployed in service of a constitutional republic Shakespeare could not have imagined.

---

## 4. What it adds up to

### The two-modes finding

The temptation, with a question like this, is to ask who *the* most Shakespearean Founder is and assign a winner. The corpus declines to give one. Adams and Franklin are essentially tied at the top of the composite ranking (separated by 3% on a measure that combines seven independent components) and they occupy the top two slots on six of those seven measures. But they got there differently, and the difference is the substantive finding:

- **John Adams absorbed Shakespeare as a text.** He referred to Shakespeare by name. He compared political opponents to Falstaff. He used King Lear as a vocabulary for describing drunk tavern-keepers. He used the construction *methinks I hear you* across thirty-two years of letters. He used the Shakespearean phrase *I had rather* a hundred and two times. He used *give me leave* ninety-three times. He used *by sea and land* fifty-eight times in martial and diplomatic correspondence. His Shakespearean absorption is citational, deliberate, biographically traceable. He went looking for Shakespeare and brought him home.

- **Benjamin Franklin absorbed Shakespeare as a habit.** He almost never mentioned Shakespeare by name. He used fewer of the popularly-attributed Shakespearean phrases than any other Founder. But his English itself sounds Shakespearean by every register-level measure we ran. He used the contraction *'tis* more than twice as often as any other Founder. He used the archaic verb forms *hath*, *doth*, *art*, *hast*, *dost* at rates an order of magnitude above his peers. He used the second-person archaic *thou*, *thee*, *thy* at thirty times Washington's rate. His metaphorical reach, his pronoun profile, and his stylistic intersections all sit closer to Shakespeare's than anyone else's. He sounded like Shakespeare because Shakespeare is the English he learned, as a teenager in a print shop in Boston in 1722.

These are not contradictory modes; they are two distinct ways the same broader claim can be true. Shakespeare's English persists in the Founders. Adams absorbed it as a text. Franklin absorbed it as a habit. Any analysis that collapses influence to a single number will average the two modes together and lose the actual story.

### The six-method convergence

Six independent methodologies, each applied to a different aspect of the corpus, agree on the same broad ranking.

![Six independent methodologies, each applied to a different aspect of the corpus, agree on the same broad ranking. Green = high rank (more Shakespearean), red = low. Franklin and Adams trade first place across most methods; Hamilton (rightmost column) is consistently red.](../data/figures/paper_08_six_method_convergence.png)

The other Founders fit into a clean ordering behind Franklin and Adams:

- **Thomas Jefferson**: middle of the pack. The most strategically Shakespearean: knows the texts, deploys quotations with care, but is not soaked in Shakespearean register the way Franklin is.
- **George Washington**: also middle. Surprisingly Shakespearean for a man with no formal literary education; the *band of brothers* moment at Valley Forge is the corpus's most striking single piece of Shakespearean evidence in his writing.
- **James Madison**: second-to-last. The most administratively careful prose stylist of the Founders, with the fewest Shakespearean traces in his own composition. His one striking exception (*ay*) is borrowed from the speech of others he was transcribing.
- **Alexander Hamilton**: last. His prose is the most thoroughly un-Shakespearean in the corpus. *Power* is institutional, not personal; vocabulary is technical, not literary; stylistic profile shares zero high-bin intersections with Shakespeare. Hamilton is the Founder whose intellectual project was furthest from Shakespeare's, and the corpus shows it.

### The conceptual-inheritance finding

The substantive finding behind the rankings, the *honour test*, may be the most important thing the analysis turned up. Shared vocabulary is not shared meaning. The Founders inherited Shakespeare's English; they rebuilt the conceptual content. Their *love* is for country and family, not for a sweet lord; their *power* is constitutional, not personal; their *death* is legal, not dramatic; their *friend* is the close of a letter. They kept the vocabulary. They invented the world they used it inside of.

### Two methodological notes worth keeping in mind

A pair of findings that don't fit neatly into the per-Founder narrative but matter for how to read the rest of the analysis (and for how to read any future analysis of this kind):

- **Vocabulary diversity, properly measured, does not separate Shakespeare from the Founders.** A naïve comparison of vocabulary-richness across our seven corpora produces a result that looks substantive: Shakespeare's ratios are noticeably lower than the Founders'. But Shakespeare's corpus is two to eight times smaller than any individual Founder's, and at unequal sizes these measures are *guaranteed* to favour the larger corpus. When we sample each Founder down to Shakespeare's size, the gap collapses: every author falls within 0.03 of every other on the main measure, and a second measure (Yule's K) reverses the direction, making Shakespeare the most globally diverse author in the corpus. The lesson is general: any single vocabulary-richness number should be reported alongside at least one orthogonal one, on size-matched samples.
- **Most "Shakespearean phrases" aren't statistically Shakespearean.** Popular catalogues of Shakespeare-coined phrases (Bernard Levin's column, the kind of compilation you find in any newspaper essay celebrating Shakespeare) list dozens of expressions on the theory that we still owe them all to *Hamlet* or *Macbeth*. Of the 24 such phrases we tested, only four (*I had rather, flesh and blood, pound of flesh, et tu Brute*) appear distinctively in Shakespeare relative to the Founders. Several (*pomp and circumstance, laughing stock, in a pickle*) appear *more* often in the Founders than in Shakespeare. The catalogues are useful for popular essays. They are less useful for empirical claims about linguistic inheritance.

### What we cannot say (yet)

- We cannot fully separate "Shakespeare-distinctive" from "Shakespeare-and-general-early-modern-distinctive" without a 17th–18th-century reference corpus. A future round of analysis using EEBO-TCP or ECCO would discriminate Shakespeare-specific idiom from period-general English.
- We cannot rule out that some apparent Shakespearean traces in Madison are quotation rather than composition (the *ay* case). The same caveat could in principle apply to other Founders, though spot-checks haven't surfaced it.
- The metaphor analysis (CS6) is regex-extracted, with high precision and moderate recall. A future round with manually annotated samples and inter-annotator reliability checks would tighten the recall estimate.

These limits are recorded in detail in the scholarly companion (§4.4).

---

This is, on present evidence, what the corpus most clearly shows: two centuries of English literature surviving into American political writing, but not as a tradition. As a vocabulary the Founders rebuilt the world inside of.

---

*Source data and full analyses are reproducible from the project repository. Statistical methodology is described in the scholarly companion (`paper.md`). Quotations verified against the original documents on `founders.archives.gov` and the Project Gutenberg edition of Shakespeare's complete works. All tables underlying the claims in this narrative are in `tables/`.*
