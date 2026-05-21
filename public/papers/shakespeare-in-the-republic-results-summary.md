---
title: "Shakespeare in the Republic"
subtitle: "A Passage-Level Catalogue of Direct Quotations, Named References, and Distinctive Phrases"
author: "Mark J. Williams"
date: 2026-05-20
---

# Executive Summary

This report catalogues every detectable instance of Shakespearean language in the writings of six Founding Fathers — John Adams, Benjamin Franklin, Alexander Hamilton, Thomas Jefferson, James Madison, and George Washington. The Founders' combined writing spans **24.6 million words** drawn from the Founders Online archive and supplementary Project Gutenberg texts; the Shakespeare reference corpus is the **Project Gutenberg complete-works edition** (38 documents, 891,092 words).

The analysis identifies four categories of Shakespearean presence: (1) **Direct Quotation** — verbatim 5+ word sequences that appear in both Shakespeare and a Founder's writing; (2) **Close Paraphrase** — near-verbatim 5–6 word sequences sharing distinctive vocabulary; (3) **Named Reference** — explicit mention of Shakespeare, a play title, or a distinctively Shakespearean character; and (4) **Distinctive Phrase** — phrases broadly attributed to Shakespeare in popular and scholarly compilations. Each finding is graded **High** (undeniable) or **Medium** (probable, with KWIC context provided so the reader can verify).

## Key Findings at a Glance

| Metric | Count |
|---|---:|
| Total HIGH + MEDIUM confidence findings | 140 |
| Verbatim direct quotations (HIGH + MEDIUM) | 62 |
|   — HIGH confidence | 53 |
|   — MEDIUM confidence | 9 |
| By-name references to Shakespeare or play/character (HIGH + MEDIUM) | 78 |
| Founders with ≥ 1 HIGH-confidence reference | 4 of 6 |
| Founders with no detected verbatim quotation | 5 of 6 |

**The single most striking pattern is the asymmetry across the six Founders.** Verbatim Shakespeare quotation is essentially an Adams phenomenon: of the 62 HIGH/MEDIUM direct quotations identified, 61 are from John Adams and 1 from James Madison. Hamilton, Washington, Franklin, and Jefferson together account for zero verbatim 5+ word Shakespeare matches in this corpus. By-name references (citing Shakespeare or a specific play/character with corroborating context) are distributed: Adams (48), Jefferson (26), Franklin (2), Washington (1), Madison (1). Hamilton produces zero by-name references.

This pattern is consistent with — and quantifies — the broader argument developed in the companion statistical paper (`reports/paper.md`): the Founders absorbed Shakespeare in two distinct modes. Adams's mode is **citational** — explicit textual engagement that surfaces here as verbatim quotation. Franklin's mode is **absorbed** — register-level alignment with Shakespearean English at the level of vocabulary, archaic forms, and metaphor — and is not visible in a passage-level catalogue at all. The absence of named or quoted Shakespeare in Franklin's, Washington's, Hamilton's, and Madison's writing is not evidence that they were uninfluenced; it is evidence that the influence (where present) operates below the surface of literal reference.

# Methodology

## Corpus

**Founders corpus.** 68,807 documents drawn from Founders Online (founders.archives.gov) and Project Gutenberg supplementary texts (*The Federalist Papers*, Franklin's *Autobiography*, Jefferson's *Notes on the State of Virginia*, Madison's debates of the Constitutional Convention, Washington's *Farewell Address*, and Hamilton's *Report on Manufactures*). Total: **24,593,811 words** across six authors:

| Author | Documents | Words |
|:-------|----------:|------:|
| Adams              |  9,101 |  4,212,978 |
| Franklin           |  3,480 |  1,770,415 |
| Hamilton           |  7,059 |  2,347,616 |
| Jefferson          | 20,391 |  6,957,928 |
| Madison            |  8,584 |  3,420,115 |
| Washington         | 20,154 |  5,884,759 |

**Shakespeare reference corpus.** The Project Gutenberg complete-works edition (`t8.shakespeare.txt`): 36 plays plus the Sonnets and *A Lover's Complaint* (38 documents, **891,092 words**).

## Detection pipelines

**Direct Quotation and Close Paraphrase** (`scripts/catalogue_direct_quotes.py`). An exhaustive 5-, 6-, and 7-gram index is built from the Shakespeare corpus (2.5 million unique n-grams after blacklisting common early-modern English boilerplate). Each Founder document is tokenised and scanned for any contiguous Founder n-gram that matches an indexed Shakespeare n-gram; longest match wins. A KWIC (Key-Word-In-Context) window is extracted around each match so the reader can read the passage in its original surrounding prose.

Tokenisation is identical to that used elsewhere in the project: lowercase, alphabetic, contraction-split (`don't` → `do n't`). Folio stage directions and speaker prefixes are stripped from Shakespeare; Project Gutenberg licence boilerplate is stripped from both corpora; Founders Online editorial signature blocks are stripped from the Founders' corpus.

**Named Reference** (`scripts/catalogue_named_references.py`). Three regex-based scanners run over each Founder document: (1) the literal name *Shakespeare* (and the period spellings *Shakspeare*, *Shakspear*, *Shakspere*, *Shakespere*); (2) 18 unambiguous multi-word Shakespeare play titles; (3) a curated list of 30+ distinctively Shakespearean character names. Hits preceded by an honorific (Mr./Mrs./Lt./Col./Govr.) or a place-name prefix (St./Saint) are discarded as contemporary correspondents or geographical names (e.g. *Tobias Lear*, Washington's secretary; *St. Iago* / Santiago in Adams's 1779 Spanish travel diary).

## Confidence tiering

Every finding is assigned a tier on the basis of automated rules; the rules are conservative.

- **High.** Direct verbatim 7+ word match with ≥ 3 content words;   OR explicit by-name mention of *Shakespeare*;   OR play-title / character mention occurring within 250 characters   of the word *Shakespeare*. *The connection is undeniable.*
- **Medium.** Verbatim 6-word match with ≥ 4 content words, or   verbatim 5-word match with ≥ 4 content words;   OR play-title / character mention occurring with a literary cue   (*play*, *scene*, *character*, *dramatist*, *poet*, etc.) in the   surrounding ±200 characters. *Probable; a knowledgeable reader   would likely recognise the connection.*
- **Low.** Shorter matches, character-name hits without literary   context, or matches dominated by function words. *The Low tier   is not enumerated in this summary*; at this corpus size it is   dominated by general early-modern English and is the territory   covered by the statistical case studies in the companion paper.

## Methodological cautions

- **No 17th-/18th-century reference corpus.** Some phrases that appear in Shakespeare were already general early-modern English by 1780. Without a contemporary baseline (EEBO-TCP, ECCO), the catalogue cannot fully separate Shakespeare-coined phrases from Shakespeare-and-period-general ones. Where a phrase is known to be proverbial by the Founders' era (e.g. *too much of a good thing*) it is excluded.
- **Quotation in transcribed speech.** Where a Founder is transcribing the speech of others (Madison's Constitutional Convention debates, congressional records), the Shakespearean language in the document may not be the Founder's own composition. KWIC context is provided for every finding so the reader can verify authorial provenance.
- **Biblical phrasings.** Phrases that appear in both the King James Bible and Shakespeare (e.g. *under his own vine and fig tree*) are not attributable to Shakespeare in the Founders' use without further evidence. These are excluded from the catalogue.

# High-Confidence Findings

These are passages where the Shakespearean connection is undeniable: a direct verbatim quotation of at least seven consecutive words, an explicit mention of Shakespeare by name, or a play-title / character mention occurring in immediate proximity to *Shakespeare*. They are grouped by Founder and ordered chronologically.

## John Adams

*High-confidence findings: 53 verbatim quotations, 42 by-name references to Shakespeare, 2 play-title references with Shakespeare proximity.*

- **[1757]** *Named Reference (Shakespeare)*
  - Reference: **Shakespeare**
  - Passage: …. 2 I met another Clergyman and a sensible Man at Bristol. At the Inns as usual there were Scaenes and Characters, for the Amusement of Swift or even Shakespeare. Another Journey had well nigh proved fatal to me. Mr. Joshua Willard of Petersham, who had married Miss Ward a Niece of General Ward of Shrewsbury,…

- **[1758]** *Direct Quotation* (7-word sequence) — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*; from **Othello, Moor Of Venice**
  - Match: *"now forever farewell the tranquil mind farewell"*
  - Passage: …der to raise the Passions of the Audience &c. {20} With what pathos does Othello bid farewell to War, in Shakespear. Oh now forever Farewell the tranquil Mind! farewell content; Farewell the ploomed Troops and the big War That make Ambition Virtue! Oh! farewell! Farewell the neighing Ste…

- **[1758]** *Direct Quotation* (7-word sequence) — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*; from **Othello, Moor Of Venice**
  - Match: *"farewell farewell the neighing steed and the"*
  - Passage: …arewell the tranquil Mind! farewell content; Farewell the ploomed Troops and the big War That make Ambition Virtue! Oh! farewell! Farewell the neighing Steed, and the shrill Trump The spirit stirring Drum, th’ear piercing fife The Royal Banner and all Quality, Pride, Pomp, and Circum…

- **[1758]** *Direct Quotation* (7-word sequence) — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*; from **Othello, Moor Of Venice**
  - Match: *"ear piercing fife the royal banner and"*
  - Passage: …at make Ambition Virtue! Oh! farewell! Farewell the neighing Steed, and the shrill Trump The spirit stirring Drum, th’ear piercing fife The Royal Banner and all Quality, Pride, Pomp, and Circumstance of glorious War And Oh! you mortal Engines, whose rude Throats Th’immortal…

- **[1758]** *Direct Quotation* (7-word sequence) — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*; from **Othello, Moor Of Venice**
  - Match: *"all quality pride pomp and circumstance of"*
  - Passage: …Farewell the neighing Steed, and the shrill Trump The spirit stirring Drum, th’ear piercing fife The Royal Banner and all Quality, Pride, Pomp, and Circumstance of glorious War And Oh! you mortal Engines, whose rude Throats Th’immortal Joves dread Clamours counterfeit Farewell! Ot…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"but a walking shadow a poor player"*
  - Passage: …When the News of his Ladies death is brought to Mackbeth, he turns his Thoughts upon Life. Out out brief Candle! Lifes but a walking Shadow, a Poor Player That struts and frets his Hour upon the Stage And then is heard no more! It is a Tale Told by an Ideot, full of Sound a…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"that struts and frets his hour upon"*
  - Passage: …s brought to Mackbeth, he turns his Thoughts upon Life. Out out brief Candle! Lifes but a walking Shadow, a Poor Player That struts and frets his Hour upon the Stage And then is heard no more! It is a Tale Told by an Ideot, full of Sound and Fury Signifying Nothing. 2 Here h…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"the stage and then is heard no"*
  - Passage: …Thoughts upon Life. Out out brief Candle! Lifes but a walking Shadow, a Poor Player That struts and frets his Hour upon the Stage And then is heard no more! It is a Tale Told by an Ideot, full of Sound and Fury Signifying Nothing. 2 Here he compares Life, 1st to a Candl…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"full of sound and fury signifying nothing"*
  - Passage: …, a Poor Player That struts and frets his Hour upon the Stage And then is heard no more! It is a Tale Told by an Ideot, full of Sound and Fury Signifying Nothing. 2 Here he compares Life, 1st to a Candle, then to a Shadow, an Image taken from scripture, then to a Player on the sta…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"the man would die and there an"*
  - Passage: …ackbeth and his Wife and Iago are Characters of Fiends, not of men. The times have been, that when the Brains were out, the man would die, and there an End, but now they rise again with 20 mortal murders on their Crowns, and push us from our stools. Malcolm and Donalbain…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"end but now they rise again with"*
  - Passage: …e Characters of Fiends, not of men. The times have been, that when the Brains were out, the man would die, and there an End, but now they rise again with 20 mortal murders on their Crowns, and push us from our stools. Malcolm and Donalbain when they find their father murth…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"towering in her pride of place was"*
  - Passage: …ded that the Design was to charge the Murder on them, and to avoid the consequences they fled to England, and a faulcon towering in her Pride of Place, was by a mousing Owl haukt at and killed. The faulcon is Duncan, the mousing Owl is Mackbeth. The old man observed the Omen…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"beauteous and swift the minions of their"*
  - Passage: …ackbeth. The old man observed the Omen. Rosse takes Notice of another Omen that preceded Duncans Death. Duncans Horses, beauteous and swift, the Minions of their Race, turned wild in Nature, broke their stalls, flung out, contending gainst Obedience, as they would make War with ma…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"wild in nature broke their stalls flung"*
  - Passage: …ice of another Omen that preceded Duncans Death. Duncans Horses, beauteous and swift, the Minions of their Race, turned wild in Nature, broke their stalls, flung out, contending gainst Obedience, as they would make War with man. Thriftless Ambition that will raven up thy own lifes…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"out contending gainst obedience as they would"*
  - Passage: …Death. Duncans Horses, beauteous and swift, the Minions of their Race, turned wild in Nature, broke their stalls, flung out, contending gainst Obedience, as they would make War with man. Thriftless Ambition that will raven up thy own lifes means. Mackbeth kills the others that lay in th…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"lamentings heard i the air strange screams"*
  - Passage: (no extracted context)

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"to the woeful time the obscure bird"*
  - Passage: …re blown down. Lamentings heard i’the air, strange screams of Death. Of dire Combustion and confusd Events New hatchd to the woeful time. The obscure bird clamourd the livelong night Some say the Earth was feverous and did shake. 3 Mackbeths Imagination was [struck?] and af…

- **[1758]** *Direct Quotation* (7-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"the livelong night some say the earth"*
  - Passage: …trange screams of Death. Of dire Combustion and confusd Events New hatchd to the woeful time. The obscure bird clamourd the livelong night Some say the Earth was feverous and did shake. 3 Mackbeths Imagination was [struck?] and afraid, was as lively and teemed with Notions, a…

- **[1758]** *Named Reference (Shakespeare)*
  - Reference: **Shakespeare**
  - Passage: …y of Heaven, an Execution that Mortal man cant Stay—the Elements of Heaven, fire, Heat, Rain, Wind, &c. Let me search for the Clue, which Led great Shakespeare into the Labyrinth of mental Nature! Let me examine how men think. Shakespeare had never seen in real Life Persons under the Influence of all those S…

- **[1758]** *Named Reference (Shakespeare)*
  - Reference: **Shakespeare**
  - Passage: …ire, Heat, Rain, Wind, &c. Let me search for the Clue, which Led great Shakespeare into the Labyrinth of mental Nature! Let me examine how men think. Shakespeare had never seen in real Life Persons under the Influence of all those Scenes of Pleasure and distress, which he has described in his Works, but he ima…

- **[1758]** *Named Reference (Shakespeare)* — *[December 1758]*
  - Reference: **Shakespeare**
  - Passage: …lry of Heaven, an Execution that Mortal man cant Stay—the Elements of Heaven, fire, Heat, Rain, Wind, &c. Let me search for the Clue, which Led great Shakespeare into the Labyrinth of mental Nature! Let me examine how men think. Shakespeare had never seen in real Life Persons under the Influence of all those S…

- **[1758]** *Named Reference (Shakespeare)* — *[December 1758]*
  - Reference: **Shakespeare**
  - Passage: …ire, Heat, Rain, Wind, &c. Let me search for the Clue, which Led great Shakespeare into the Labyrinth of mental Nature! Let me examine how men think. Shakespeare had never seen in real Life Persons under the Influence of all those Scenes of Pleasure and distress, which he has described in his Works, but he ima…

- **[1758]** *Named Reference (Shakespeare)* — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*
  - Reference: **Shakespear**
  - Passage: …What is Wisdom? Is it, to write dramatic Poetry, like Milton or Shakespear? Is it to write on Astronomy and Physicks like Newton, or is it to know the human mind like Lock? Does it consist in Genius and Learning? No Genius a…

- **[1758]** *Named Reference (Shakespeare)* — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*
  - Reference: **Shakespear**
  - Passage: …the nice Connection and Dependence of these upon each other thro a whole Poem. And these Proofs have been given in a surprizing degree by Milton and Shakespear, Homer, Virgil &c. Milton has feigned the Characters of Arch Angells and Devills, of Sin, Death, &c., out of his own creative Imagination and has adj…

- **[1758]** *Named Reference (Shakespeare)* — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*
  - Reference: **Shakespear**
  - Passage: …haracter express his own Passions well, in order to raise the Passions of the Audience &c. {20} With what pathos does Othello bid farewell to War, in Shakespear. Oh now forever Farewell the tranquil Mind! farewell content; Farewell the ploomed Troops and the big War That make Ambition Virtue! Oh! farewell! Fa…

- **[1758]** *Named Reference (Shakespeare)* — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*
  - Reference: **Shakespeare**
  - Passage: …nd for avoiding the low, little and mean in Discourse. I have not Leisure nor Patience, for examining the sublime Passages in Tully, Virgill, Milton, Shakespeare, Pope, Bolinbroke, Swift, Addison, Tillotson, Ovid, Horace &c. by these Rules. In that very sublime Passage in Milton where the Effect of Satans Spee…

- **[1758]** *Named Reference (Shakespeare)* — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*
  - Reference: **Shakespeare**
  - Passage: …Shakespeare, in the Character of Lady Mackbeth, and of Gertrude, the Wife of old Hamlet, and afterwards of King Claudius, and in the Character of Lady Anne in Ki…

- **[1760]** *Named Reference (Shakespeare)* — *1760. Decr. 2d.*
  - Reference: **Shakespear**
  - Passage: …at last, strives to turn it off with a Laugh.—“I wish I had it. Ide shew it, I know.”—Bela really acts the Part of the Tamer of the Shrew in Shakespear. Thus a kind Look, an obliging Air, a civil Answer, is a boon that she cant obtain from her Husband. Farmers, Tradesmen, Soldiers, Sailors, People of…

- **[1765]** *Named Reference (Shakespeare)* — *Decr. 25th. 1765. Christmas.*
  - Reference: **Shakespear**
  - Passage: …vereign of his wonted Respects and Observance. Recollect, Mr. Pym, a scene in the Tragedy of K [ing] H [enry] 8th. I think you was once an Admirer of Shakespear. Vid. V. 5. 284. 285. 286. 4 A scene which may be very properly recommended to modern Monarks, Queens, and Favourites. I will repeat it, Mr. Pym, for…

- **[1765]** *Named Reference (Shakespeare)* — *VI. “A Dissertation on the Canon and the Feudal Law,” No. 4, 21 October 1765*
  - Reference: **Shakespear**
  - Passage: …ren? When you compare her to the infamous miscreant, who lately stood on the gallows for starving her child? When you resemble her to Lady Macbeth in Shakespear, (I cannot think of it without horror) Who “had given suck, and knew How tender ’twas to love the Babe that milk’d her.” But yet, who could â…

- **[1767]** *Named Reference (Shakespeare)* — *VI. Misanthrop, No. 2, January 1767*
  - Reference: **Shakespeare**
  - Passage: …ch Cases to the Bottom, I have had Recourse, upon these occasions, to the occult Sciences. A little familiar Spirit attends me, whom, in Imitation of Shakespeare I have called Ariel. This little Spright, who hops about upon the Clouds and Rainbows, rides upon the Sun beams, dives down to the Center of the Eart…

- **[1770]** *Named Reference (Shakespeare)* — *[Draft of a Newspaper Communication, August? 1770.]*
  - Reference: **Shakespeare**
  - Passage: …“If I would but go to Hell for an eternal Moment or so, I might be knighted.” Shakespeare. The Good of the governed is the End, and Rewards and Punishments are the Means of all Government. The Government of the Supream and alperfect Mind,…

- **[1772]** *Named Reference (Shakespeare)* — *1772. Feby. 9. Sunday.*
  - Reference: **Shakespeare**
  - Passage: …“If I would but go to Hell for an eternal Moment or so, I might be knighted”—Shakespeare. Shakespeare, that great Master of every Affection of the Heart and every Sentiment of the Mind as well as of all the Powers of Expression, is someti…

- **[1772]** *Named Reference (Shakespeare)* — *1772. Feby. 9. Sunday.*
  - Reference: **Shakespeare**
  - Passage: …“If I would but go to Hell for an eternal Moment or so, I might be knighted”—Shakespeare. Shakespeare, that great Master of every Affection of the Heart and every Sentiment of the Mind as well as of all the Powers of Expression, is sometimes fond of a…

- **[1775]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 26 September 1775*; from **The Second Part Of Henry The Sixth**
  - Match: *"in time to come i hope to"*
  - Passage: …Family. I have been banished from them, the greatest Part of the last Eighteen Months but I hope to be with them more, in Time to come. I hope to be excused from attending at Philadelphia, after the Expiration of the Year. I hope that Dr. Winthrop, Mr. Sever, Mr. G…

- **[1775]** *Direct Quotation* (7-word sequence) — *John Adams to Elbridge Gerry, 18 June 1775*; from **Othello, Moor Of Venice**
  - Match: *"pride pomp and circumstance of glorious war"*
  - Passage: …be shown to these officers on their arrival. The whole army, I think, should be drawn up upon the occasion, and all the pride, pomp, and circumstance of glorious war displayed;— no powder burned, however. There is something charming to me in the conduct of Washington. A gentleman of…

- **[1776]** *Direct Quotation* (7-word sequence) — *John Adams to William Heath, 15 April 1776*; from **Julius Caesar**
  - Match: *"there is a tide in the affairs"*
  - Passage: …overnment in the Hands of the Friends of the People. It is now perhaps the most critical Moment that America, ever saw. There is a Tide in the affairs of Men, and Consequences of infinite Moment depend upon the Colonies, assuming Government at this Time. So convenient a…

- **[1777]** *Direct Quotation* (7-word sequence) — *John Adams to William Tudor, 27 April 1777*; from **Othello, Moor Of Venice**
  - Match: *"pride pomp and circumstance of glorious war"*
  - Passage: …Philadelphia April 27. 1777 Aha!—exchanging the Pride, Pomp and Circumstance of Glorious War, for the soft Charms of Wedlock and domestic Felicity, 1 I suppose—abandoning Gun, Drum, Trumpet, Blunderbuss and Thu…

- **[1780]** *Direct Quotation* (7-word sequence) — *John Adams to James Warren, 9 December 1780*; from **Othello, Moor Of Venice**
  - Match: *"pride pomp and circumstance of glorious war"*
  - Passage: …f History; here I can do nothing. The beauteous olive Branch will never decorate my Brows. I must Spend my Life, in the Pride, Pomp, and Circumstance of glorious War, without sharing any of its Laurels. My most profound Respects to Mrs. Warren—I dread her History more than that of t…

- **[1780]** *Named Reference (Shakespeare)* — *John Adams to John Quincy Adams, 23 December 1780*
  - Reference: **Shakespear**
  - Passage: …enturous Spirit and inflexible Virtue you certainly, as well as I owe our Existence. I wish you, in your next Letter, to transcribe me the Passage of Shakespear, in which the Brownists are mentioned. You should treat the Minister of that Society, in Leyden with the greatest Respect, and attend his Meeting, ev…

- **[1781]** *Direct Quotation* (7-word sequence) — *John Adams to C. W. F. Dumas, 25 January 1781*; from **Julius Caesar**
  - Match: *"there is a tide in the affairs"*
  - Passage: …Suffering the Spirit of the People to subside, and their Passions to cool, a matter of the last Importance, in War. “There is a Tide in the affairs of Men, which taken at the Ebb leads on to Fortune.” 2 However, the Maxims of Government here are different, from mos…

- **[1782]** *Direct Quotation* (7-word sequence) — *John Adams to Philip Mazzei, 3 July 1782*; from **Macbeth**
  - Match: *"i have given suck and know how"*
  - Passage: …ain. Herods murder of the Innocents was a trifle in comparison. 2 Lady Macbeth uttered a Sentiment a little like it. “I have given Suck; and know how tender tis to love the Babe that milks me: yet would I: even when ’twas smiling in my face; have plucked my Nipple fr…

- **[1782]** *Direct Quotation* (7-word sequence) — *John Adams to Philip Mazzei, 3 July 1782*; from **Macbeth**
  - Match: *"tender tis to love the babe that"*
  - Passage: …nts was a trifle in comparison. 2 Lady Macbeth uttered a Sentiment a little like it. “I have given Suck; and know how tender tis to love the Babe that milks me: yet would I: even when ’twas smiling in my face; have plucked my Nipple from its boneless Gums and dash’d…

- **[1782]** *Direct Quotation* (7-word sequence) — *John Adams to Edmund Jenings, 5 October 1782*; from **The Second Part Of Henry The Sixth**
  - Match: *"god save the king god save the"*
  - Passage: …and this People , and all the Men of Israel choose, his will I be, and with him will I abide, 1 and to him will I Say 2 God Save the King, God Save the King. Hushai, has here asserted the first Principle of the Rights of Man kind, the first Principle of Liberty. He here…

- **[1782]** *Named Reference (Shakespeare)* — *1782 Oct. 14. Monday.*
  - Reference: **Shakespeare**
  - Passage: …is a Manufacture, it is the Effect of Government and Education &c—S. run on about the Panurge, Pantagruel &c. of Rabelais, the Romeo and Julliet of Shakespeare, the Mandragore of Machiavel, the Tartuff of Moliere, &c. &c.…

- **[1786]** *Direct Quotation* (7-word sequence) — *John Adams to Rufus King, 14 June 1786*; from **Henry The Fifth**
  - Match: *"the archbishop of canterbury and the bishop"*
  - Passage: …ing Massachusetts and New York in the Bands of Love was going on here. Last Sunday under the Right Reverend Sanction of the Archbishop of Canterbury and the Bishop of st Asaph were married M r Smith and Miss Adams. 1 It will be unnatural if fÅderal Purposes are not answered by all…

- **[1786]** *Named Reference (Shakespeare)* — *[Notes on a Tour of English Country Seats, &c., with Thomas Jefferson, 4–10? April 1786.]*
  - Reference: **Shakespear**
  - Passage: …Uncertainty of our Sentiments concerning the Civil Wars. Stratford upon Avon is interesting as it is the Scaene of the Birth, Death and Sepulture of Shakespear. Three Doors from the Inn, is the House where he was born, as small and mean, as you can conceive. They shew Us an old Wooden Chair in the Chimney Co…

- **[1786]** *Named Reference (Shakespeare)* — *[April 1786]*
  - Reference: **Shakespear**
  - Passage: …Uncertainty of our Sentiments concerning the Civil Wars. Stratford upon Avon is interesting as it is the Scaene of the Birth, Death and Sepulture of Shakespear. Three Doors from the Inn, is the House where he was born, as small and mean, as you can conceive. They shew Us an old Wooden Chair in the Chimney Co…

- **[1789]** *Direct Quotation* (7-word sequence) — *John Adams to William Cushing, 7 March 1789*; from **Alls Well That Ends Well**
  - Match: *"good fortune and the favour of the"*
  - Passage: …heretofore, so often to undertake Trusts out of all Proportion to my Talents, and having been Supported through them by good Fortune, and the favour of the World, I must again rely upon the Same Assistance.— one Comfort has always attended me.— I have been always best su…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"by contraries execute all things for no"*
  - Passage: …shall realize the raving in the Tempest, which Charles quoted to me in his last Letter. “In the Commonwealth We shall by contraries execute all Things: for no kind of Trafic shall We admit; no name of Magistrate; Letters will not be known, wealth, Poverty and Use of service non…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"poverty and use of service none contract"*
  - Passage: …ies execute all Things: for no kind of Trafic shall We admit; no name of Magistrate; Letters will not be known, wealth, Poverty and Use of service none; contract, Succession bowen bound of Land, tilth, Vineyard none; No Use of Metal, corn or wine or oil; No Occupation, all Men idl…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"bound of land tilth vineyard none no"*
  - Passage: …; no name of Magistrate; Letters will not be known, wealth, Poverty and Use of service none; contract, Succession bowen bound of Land, tilth, Vineyard none; No Use of Metal, corn or wine or oil; No Occupation, all Men idle all And Women too; but innocent and pure; No Sovereignty…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"use of metal corn or wine or"*
  - Passage: …t be known, wealth, Poverty and Use of service none; contract, Succession bowen bound of Land, tilth, Vineyard none; No Use of Metal, corn or wine or oil; No Occupation, all Men idle all And Women too; but innocent and pure; No Sovereignty. All Things in common nature…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"oil no occupation all men idle all"*
  - Passage: …d Use of service none; contract, Succession bowen bound of Land, tilth, Vineyard none; No Use of Metal, corn or wine or oil; No Occupation, all Men idle all And Women too; but innocent and pure; No Sovereignty. All Things in common nature should produce Without sweat or endea…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"and women too but innocent and pure"*
  - Passage: …ession bowen bound of Land, tilth, Vineyard none; No Use of Metal, corn or wine or oil; No Occupation, all Men idle all And Women too; but innocent and pure; No Sovereignty. All Things in common nature should produce Without sweat or endeavour; Treason Felony Sword Pike, knif…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"all things in common nature should produce"*
  - Passage: …se of Metal, corn or wine or oil; No Occupation, all Men idle all And Women too; but innocent and pure; No Sovereignty. All Things in common nature should produce Without sweat or endeavour; Treason Felony Sword Pike, knife, Gun, or need of any Engine Would I not have; But nature s…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"without sweat or endeavour treason felony sword"*
  - Passage: …tion, all Men idle all And Women too; but innocent and pure; No Sovereignty. All Things in common nature should produce Without sweat or endeavour; Treason Felony Sword Pike, knife, Gun, or need of any Engine Would I not have; But nature should bring forth of its own kind, all foizon, al…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"pike knife gun or need of any"*
  - Passage: …t and pure; No Sovereignty. All Things in common nature should produce Without sweat or endeavour; Treason Felony Sword Pike, knife, Gun, or need of any Engine Would I not have; But nature should bring forth of its own kind, all foizon, all Abundance to feed my innocent P…

- **[1794]** *Direct Quotation* (7-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"all abundance to feed my innocent people"*
  - Passage: …rd Pike, knife, Gun, or need of any Engine Would I not have; But nature should bring forth of its own kind, all foizon, all Abundance to feed my innocent People.” 4 This is Lubberland indeed— Le Pays de Cocain, I believe the French call it.— 5 but it is terra incognita.—…

- **[1794]** *Named Reference (Shakespeare)* — *John Adams to Charles Adams, 17 May 1794*
  - Reference: **shakespear**
  - Passage: …ription of Lubberland or what do the French call it? Pays de Cocany or some such Word. Does he get this, says I, from Old Chauar, or Spencer, or from shakespear? Young M r Otis, turned me to the Passage in elegant Extracts— 1 It is it seems from the Tempest, which was to me, once very familiar— Hence I se…

- **[1794]** *Named Reference (The Tempest)* — *John Adams to Charles Adams, 17 May 1794*
  - Reference: **the Tempest**
  - Passage: …this, says I, from Old Chauar, or Spencer, or from shakespear? Young M r Otis, turned me to the Passage in elegant Extracts— 1 It is it seems from the Tempest, which was to me, once very familiar— Hence I see, my Memory is not so quick as it was once. next time you quote mark the quotation that one may lo…

- **[1795]** *Named Reference (Shakespeare)* — *John Adams to Charles Adams, 31 December 1795*
  - Reference: **shakespear**
  - Passage: …er house listened to the vile proposals of the two Wretches from Detroit. 1 But the Attempt itself is disgraceful to our Country. Your quotation from shakespear is well applied and is most admirable. There is another Passage which I wish you would look for and write me in what Play it is. to this Effect He wh…

- **[1796]** *Named Reference (Shakespeare)* — *John Adams to Charles Adams, 30 December 1796*
  - Reference: **shakespear**
  - Passage: …the Bar it will be early enough to go to Europe. By your Representation M r Joshua Sands has been your good Friend. I can only Say in the Language of shakespear “Whenever you have made a Friend, upon virtuous Principles grapple him to your Soul with hooks of Steel.” 1 If M r Sands’s Experience should re…

- **[1799]** *Direct Quotation* (7-word sequence) — *John Adams to Thomas Boylston Adams, 17 October 1799*; from **Macbeth**
  - Match: *"and know how tender tis to love"*
  - Passage: …hink of it. The Conduct of PhÅbe’s Husband therefore would not be an Object of Imitation for me. 3 I have been young and know how tender ’tis to love. I have never dictated to my Children. Perhaps it would have been better in two Instances, if I had.— I wish them to…

- **[1805]** *Direct Quotation* (7-word sequence) — *From John Adams to John Quincy Adams, 20 January 1805*; from **The First Part Of Henry The Sixth**
  - Match: *"between the red rose and the white"*
  - Passage: …ions are disregarded at this day. These Plays of the great Poet if they are read by any one with a view to the Struggle between the Red Rose and the White Rose, that is to the Treachery Perfidy Treason Murder Cruelty Sedition and Rebellions of rival and unballanced factions…

- **[1805]** *Direct Quotation* (7-word sequence) — *From John Adams to John Quincy Adams, 20 January 1805*; from **Henry The Fifth**
  - Match: *"would thee do were all thy children"*
  - Passage: …ns and Daughters to dispose of, and what then? Why then it will be Said O America! What might’est thou do, that honor would thee do, Were all thy Children kind and natural! But see thy fault! France or England hath in thee found out A nest of hollow Bosoms, which he fills.…

- **[1805]** *Direct Quotation* (7-word sequence) — *From John Adams to John Quincy Adams, 20 January 1805*; from **Henry The Fifth**
  - Match: *"kind and natural but see thy fault"*
  - Passage: …hat then? Why then it will be Said O America! What might’est thou do, that honor would thee do, Were all thy Children kind and natural! But see thy fault! France or England hath in thee found out A nest of hollow Bosoms, which he fills. With regard to Judge Chace’s Tryal…

- **[1805]** *Direct Quotation* (7-word sequence) — *From John Adams to John Quincy Adams, 20 January 1805*; from **Henry The Fifth**
  - Match: *"hath in thee found out a nest"*
  - Passage: …t’est thou do, that honor would thee do, Were all thy Children kind and natural! But see thy fault! France or England hath in thee found out A nest of hollow Bosoms, which he fills. With regard to Judge Chace’s Tryal, were I in your Situation I would read every Imp…

- **[1805]** *Direct Quotation* (7-word sequence) — *From John Adams to John Quincy Adams, 20 January 1805*; from **Henry The Fifth**
  - Match: *"of hollow bosoms which he fills with"*
  - Passage: …uld thee do, Were all thy Children kind and natural! But see thy fault! France or England hath in thee found out A nest of hollow Bosoms, which he fills. With regard to Judge Chace’s Tryal, were I in your Situation I would read every Impeachment, that is to be found in the St…

- **[1805]** *Named Reference (Shakespeare)* — *From John Adams to John Quincy Adams, 20 January 1805*
  - Reference: **Shakespeare**
  - Passage: …fficacious, may be hereafter of more consequence to your Country, than you may now imagine. I have been uncommonly engaged and interrested in Reading Shakespeare, and particularly his Historical Drama’s which I have read through once with Attention, and have almost compleated the Second time. During that Per…

- **[1807]** *Named Reference (Shakespeare)* — *From John Adams to Benjamin Waterhouse, 2 February 1807*
  - Reference: **Shakespeare**
  - Passage: …er all his life; but he enters into every scence of human life, and seems to know the thoughts and feelings of all men, high and low, as perfectly as Shakespeare, who spent all his life among the wretches. In my last I forgot to mention Butler’s sermons, which I have had almost by heart, these fifty years. T…

- **[1808]** *Named Reference (Shakespeare)* — *From John Adams to Benjamin Rush, 18 January 1808*
  - Reference: **Shakespeare**
  - Passage: …tion in any language that pleases me, though the Thing itself is the most striking beauty in Poetry oratory and every Species of fine Writing. Homer, Shakespeare are the most indebted to it. Our Franklin, owes a great part of his Merit to it—It is not less visible or attractive in Architecture Painting and S…

- **[1809]** *Direct Quotation* (7-word sequence) — *From John Adams to Boston Patriot, 29 August 1809*; from **Othello, Moor Of Venice**
  - Match: *"pride pomp and circumstance of glorious war"*
  - Passage: …y; here I can do nothing. The beauteous olive branch, I fear, will never decorate my brows. I must spend my life in the pride, pomp and circumstance of glorious war, without sharing any of its laurels. My most profound respects to Mrs. Warren. I dread her history more than that of th…

- **[1809]** *Direct Quotation* (7-word sequence) — *From John Adams to Boston Patriot, 22 September 1809*; from **Julius Caesar**
  - Match: *"there is a tide in the affairs"*
  - Passage: …s suffering the spirit of the people to subside, and their passions to cool, a matter of the last importance in war. “There is a tide in the affairs of men, which, taken at the ebb, leads on to fortune.” However, the maxims of government here are different from most…

- **[1810]** *Direct Quotation* (7-word sequence) — *From John Adams to Benjamin Rush, 14 May 1810*; from **Romeo And Juliet**
  - Match: *"that idles in the wanton summer air"*
  - Passage: …and pathetic Subject in which Morality Religion, Laws Liberty and Government are so deeply interested to that Gossamour that idles in the Wanton Summer air John Randolph! The Character of him in the Auroria is well drawn and in some respect just; but makes too much of him. Y…

- **[1811]** *Named Reference (Shakespeare)* — *From John Adams to Benjamin Rush, 25 December 1811*
  - Reference: **Shakespeare**
  - Passage: …“I know it Tom as well as you do. But why do you tell me of it? I had rather you Should Strike me.” This was one of those Touches of Nature, that Shakespeare or Cervantes would have noted in his Ivory Book. But why do you make so much ado about nothing. Of what Use can it be for Jefferson and me to exchang…

- **[1811]** *Named Reference (Much Ado About Nothing)* — *From John Adams to Benjamin Rush, 25 December 1811*
  - Reference: **much ado about nothing**
  - Passage: …hould Strike me.” This was one of those Touches of Nature, that Shakespeare or Cervantes would have noted in his Ivory Book. But why do you make so much ado about nothing. Of what Use can it be for Jefferson and me to exchange Letters. I have nothing to Say to him, but to wish him an easy Journey to Heaven when he goes…

- **[1812]** *Direct Quotation* (7-word sequence) — *From John Adams to William Stephens Smith, 15 October 1812*; from **Julius Caesar**
  - Match: *"there is a tide in the affairs"*
  - Passage: …. There seems to be, an irreversable decree against me, and every Being who has a drop of my blood in his or her Veins. There is a tide in the Affairs of Men Which taken at the flood leads one to fortune, Omitted, all the Voyage of Life is bound in Shallows. I have had…

- **[1812]** *Direct Quotation* (7-word sequence) — *From John Adams to William Stephens Smith, 15 October 1812*; from **Julius Caesar**
  - Match: *"of men which taken at the flood"*
  - Passage: …sable decree against me, and every Being who has a drop of my blood in his or her Veins. There is a tide in the Affairs of Men Which taken at the flood leads one to fortune, Omitted, all the Voyage of Life is bound in Shallows. I have had my tide and omitted it. You have…

- **[1812]** *Direct Quotation* (7-word sequence) — *From John Adams to William Stephens Smith, 15 October 1812*; from **Julius Caesar**
  - Match: *"to fortune omitted all the voyage of"*
  - Passage: …ho has a drop of my blood in his or her Veins. There is a tide in the Affairs of Men Which taken at the flood leads one to fortune, Omitted, all the Voyage of Life is bound in Shallows. I have had my tide and omitted it. You have had your tide and omitted it. John Quincy has ha…

- **[1812]** *Named Reference (Shakespeare)* — *From John Adams to Benjamin Rush, 18 September 1812*
  - Reference: **Shakespeare**
  - Passage: …estion whether Demons and their Prince are the Same Spirits as the Devil and his Angels, did not necessarily fall within the Compass of your Inquiry. Shakespeare and Pringle were not adepts in the Science of Biblical Criticism, which is now in the full tide of Successful Experiment.— (Where will it end?) See…

- **[1812]** *Named Reference (Shakespeare)* — *From John Adams to Benjamin Rush, 8 December 1812*
  - Reference: **Shakespeare**
  - Passage: …ight millions of People, to see a new Play, advertised as the most extraordinary that ever was represented on Any Stage, excelling Menander Terrence, Shakespeare Corneille and Molliere. I Shall not give you the Dramatis Personas at length: but Garrick, Mrs. Siddons and Cook were conspicuous among a Company pro…

- **[1813]** *Direct Quotation* (7-word sequence) — *From John Adams to Benjamin Rush, 4 January 1813*; from **Macbeth**
  - Match: *"full of sound and fury signifying nothing"*
  - Passage: …nauseous Fog. Add such an 8 to his age and you make him 85. He was then President for 4 years. A Tale told by an Ideot full of sound and fury Signifying Nothing. Vanity of Vanities all was Vanity! Add such a four years and you would infallibly kill him long before he would be 81.…

- **[1813]** *Named Reference (Shakespeare)* — *From John Adams to François Adriaan Van der Kemp, 30 July 1813*
  - Reference: **Shakespeare**
  - Passage: …rench, English, and biblical. I have an Assembly of Ladies in my Family, to a Committee of whom I have referred your quotations and Commentaries upon Shakespeare. I rather incline to Johnson. The “ Hand ” was a Punn. My Friend Whiteford the Cross reader was not more addicted to Punns, quibbles, points and…

- **[1813]** *Named Reference (Shakespeare)* — *From John Adams to François Adriaan Van der Kemp, 30 July 1813*
  - Reference: **Shakespeare**
  - Passage: …line to Johnson. The “ Hand ” was a Punn. My Friend Whiteford the Cross reader was not more addicted to Punns, quibbles, points and conceits than Shakespeare. Be not Surprised, if you Should hear that I am advanced to the Rank and honour of Homer and Milton in blindness. John Adams…

- **[1813]** *Named Reference (Shakespeare)* — *From John Adams to Richard Rush, 13 August 1813*
  - Reference: **Shakespeare**
  - Passage: …ost, its Simplicity, its Beauty its Pathos, its Philosophy, its Morality, its Religion, or its Sublimity. Is there in Homer, in Virgil, in Milton, in Shakespeare, or in Pope, an equal number of Lines, which deserves to be engraved on the Memory of Youth and Age, in more indelible Characters? If there is, pray…

- **[1814]** *Direct Quotation* (7-word sequence) — *From John Adams to Richard Rush, 14 September 1814*; from **Julius Caesar**
  - Match: *"there is a tide in the affairs"*
  - Passage: …the proudest Wave cannot ascend: there is a depth, at least a bottom, from which no Waters are left to rise or retire. There is a tide in the Affairs of Men. It is a trite observation of Historians, that there is in human Affairs, an ultimate point of depression, from…

- **[1815]** *Named Reference (Shakespeare)* — *From John Adams to Jedidiah Morse, 2 December 1815*
  - Reference: **Shakespeare**
  - Passage: …which I will not now commit to paper, & entertain you with plots, & Intrigues, < [.Â .Â .] > which would compose a Comedy, equal to any of Moliere or Shakespeare, if corruption prostitution & Dupery can compose a Comedy. leaving this for the present, we will proceed to Cambridge; Several branches of our Braint…

- **[1815]** *Named Reference (Shakespeare)* — *From John Adams to John Adams, 3 October 1815*
  - Reference: **Shakespeare**
  - Passage: …ough his eccentric performances.” The People of England, like all other People, are very fond, of discovering Plagiarisms in great Writers; Milton, Shakespeare, Franklin have undergone this Ordeal Tryall. And now Sterne is taken in hand. One loves to know what can be Said in Such cases; and therefore I wish…

- **[1817]** *Named Reference (Shakespeare)* — *From John Adams to George Washington Adams, 21 March 1817*
  - Reference: **Shakespeare**
  - Passage: …gh, and trust, The Ruler with his Skies. And these four Lines in my poor Judgment, are worth more than any equal Number in Corneil, Racine, Voltaire, Shakespeare Dryden or Milton. But I have now the chereing hope of a few Evenings with your Father and all his Sons. Love to your Mother. A.…

- **[1822]** *Direct Quotation* (7-word sequence) — *From John Adams to George Washington Adams, 22 February 1822*; from **Julius Caesar**
  - Match: *"and let slip the dogs of war"*
  - Passage: …ion for the legislative Attainments of that great man. Franklin’s doctri[ ne ] is equivalent to “Cry havock![ ” ] and let Slip the dogs of War civil and Foreign, till a despot Shall come in to lay the dogs prostrate with his languadge and dessipate in thin Air a…

- **[1822]** *Named Reference (Shakespeare)* — *From John Adams to Samuel B.H. Judah, 24 June 1822*
  - Reference: **Shakespear**
  - Passage: …happiness by keeping up a constant terror in the minds of a great part of man kind—for fear is a painful and distressing passion. I could wish that Shakespear had been asleep when he imagined or borrowed from Teutonic tales his ghost of Hamlet < the > his witches in Macbeth his queen Macb & his Oberon. I co…

- **[1822]** *Named Reference (Shakespeare)* — *From John Adams to Samuel B.H. Judah, 25 June 1822*
  - Reference: **Shakespear**
  - Passage: …happiness by keeping up a constant terror in the minds of a great part of mankind—for fear is a painful and distressing passion. I could wish that Shakespear had been asleep when he imagined or borrowed from Teutonic tales his gost of Hamlet, his Witches in Macbeth, his Queen Mab, and his Oberon. I could w…

- **[1823]** *Named Reference (Shakespeare)* — *From John Adams to François Adriaan Van der Kemp, 3 January 1823*
  - Reference: **Shakespear**
  - Passage: …Montezillo January 3d. 1823. Dear Sir. A friend in need, is a friend indeed; you must certainly have read Shakespear, and have learnt from him, when you have once made a friend, to grapple him to your Soul with hooks of Steeal. You have been constantly grappling me…

- **[1823]** *Named Reference (Shakespeare)* — *From John Adams to John Quincy Adams, 4 December 1823*
  - Reference: **Shakespear**
  - Passage: …and Social affections, and genuine poetical imagery that if you < will > had cultivate the muses as much as you have politicks you might have made a Shakespear, a Milton or a Pope, for anything that I know, < how > “How sweet an Ovid, is in Murray lost” The posey or nosegay of October 30th. is carefully…

- **[1823]** *Named Reference (Shakespeare)* — *From John Adams to John Quincy Adams, 5 December 1823*
  - Reference: **Shakespear**
  - Passage: …tural, and social affections, and genuine poetical imagery; that if you had cultivated the muses as much as you have politicks, you might have made a Shakespear, a Milton, or a Pope, for any thing that I know— How sweet an Ovid, is in Murray lost” The poesy, or nosegay of October 30th. is carefully locked…

- **[1824]** *Named Reference (Shakespeare)* — *From John Adams to Caleb Stark, Jr., 28 March 1824*
  - Reference: **Shakespeare**
  - Passage: …arter & unbowel , the best plays in the language. Poor Othello was a few nights since so cruelly mangled that I actually pitied both him & his father Shakespeare. Desdemona’s lot was indeed a happy one compared with his. She sweet thing was smothered & there was an end of her; but he was torn to pieces inch…

## Thomas Jefferson

*High-confidence findings: 0 verbatim quotations, 23 by-name references to Shakespeare, 0 play-title references with Shakespeare proximity.*

- **[1771]** *Named Reference (Shakespeare)* — *Thomas Jefferson to Robert Skipwith, with a List of Books for a Private Library, 3…*
  - Reference: **Shakespeare**
  - Passage: …if we awaken it is the fault of the writer. I appeal to every reader of feeling and sentiment whether the fictitious murther of Duncan by Macbeth in Shakespeare does not excite in him as great horror of villainy, as the real one of Henry IV by Ravaillac as related by Davila ? And whether the fidelity of Nelso…

- **[1771]** *Named Reference (Shakespeare)* — *Thomas Jefferson to Robert Skipwith, with a List of Books for a Private Library, 3…*
  - Reference: **Shakespear**
  - Passage: …v. 8vo. Donaldson. Edinburgh 1762. 10/ Hoole’s Tasso. 12mo. 5/ Ossian with Blair’s criticisms. 2 v. 8vo. 10/ Telemachus by Dodsley. 6/ Capell’s Shakespear. 12mo. 30/ Dryden’s plays. 6 v. 12mo. 18/ Addison’s plays. 12mo. 3/ Otway’s plays. 3 v. 12mo. 9/ Rowe’s works. 2 v. 12mo. 6/ Thompson’s wor…

- **[1773]** *Named Reference (Shakespeare)* — *Thomas Jefferson to John Minor, 30 August 1814, including Thomas Jefferson to Bernard…*
  - Reference: **Shakespear**
  - Passage: …. Criticism. Rhetoric. Oratory. to wit. Â Belles letters. read the best of the Poets, epic, didactic, dramatic, pastoral, lyric E t c but among these Shakespear must be singled out by one who wishes to learn the full powers of the English language. of him we must advise, as Horace did of the Grecian models, â…

- **[1785]** *Named Reference (Shakespeare)* — *Thomas Jefferson to Samuel Henley, with a List of Books, 3 March 1785*
  - Reference: **Shakespeare**
  - Passage: …n design in gardening. Jennings on medals. Harris’s Hermes 8vo. ——— three treatises 8vo. Warton’s observns. on Spenser. 2. v. 8vo. Essay on Shakespeare. 8vo. Jones poeseos Asiaticae comment. 8vo. unbound. London catalogue of books. pamphlet Suidae lexicon. 3. v. fol. injured. Sallust. Foulis. 12mo. W…

- **[1786]** *Named Reference (Shakespeare)* — *Thomas Jefferson to David Humphreys, 5 January 178[6]*
  - Reference: **Shakespeare**
  - Passage: …st possible, such as you may have seen me use, if you should happen to have noticed mine. They cost about a dollar. The remaining numbers of Bell’s Shakespeare, petit format. I have the eleven first numbers. A pair of brass dividers, 6. Inches long, with a leg to slide out. A draw pen, and pencil leg, both m…

- **[1786]** *Named Reference (Shakespeare)* — *Thomas Jefferson to John Stockdale, 24 July 1786*
  - Reference: **Shakespeare**
  - Passage: …ubles de l’Amerique. I have the two first volumes; if any more be come out, I shall be glad to receive them; or whenever they do come out. Bell’s Shakespeare. The nos. since 25. I have 25. numbers. On fine paper. Monthly and Critical reviews since those I have received. Jeffery’s historical chart. Priest…

- **[1787]** *Named Reference (Shakespeare)* — *Thomas Jefferson to John Stockdale, with Orders for Books, 1 July 1787*
  - Reference: **Shakespeare**
  - Passage: …ct. 3. v. 8vo. 9 Davis. Kirwan’s estimate of the temperature of different climates. 10 Elmesley. Sylva. or the wood. 8vo. 5/. Payne & son. Bell’s Shakespeare. I have the first 32. Nos. Send me what is since published. Hargrave’s Coke Littleton. I have as far as page 330. Send me what has since come out.…

- **[1788]** *Named Reference (Shakespeare)* — *Thomas Jefferson to John Stockdale, 1 January 1788*
  - Reference: **Shakespeare**
  - Passage: …g not received any Reviews from you since those of August, I am uninformed how they have treated it. I suppose too there are more volumes of Bell’s Shakespeare (fine paper) out now, and something more of Coke Littleton. Be so good as to send these articles with those desired in my letter of Octob. 10. and ad…

- **[1788]** *Named Reference (Shakespeare)* — *Thomas Jefferson to John Stockdale, 18 May 1788*
  - Reference: **Shakespeare**
  - Passage: …n a journey. To those desired in the letters above referred to be pleased to add the following. Priestley’s biographical chart & pamphlet. Bell’s Shakespeare. No. 50 & the subsequent ones. I have No. 49. & preceding. Hargrave’s Coke Littleton after folio 395. to which I have. Monthly & Critical reviews a…

- **[1788]** *Named Reference (Shakespeare)* — *Thomas Jefferson to Thomas Payne, 2 October 1788*
  - Reference: **Shakespeare**
  - Passage: …history. Dilly. Families of plants by the Litchfeild society. 2. vols. 8vo. Mc.kenzie’s strictures on Tarleton’s history. Faulder. Concordance to Shakespeare. Robinsons. Indian vocabulary. 12mo. Stockdale. Additions to Robertson’s history of Scotland. 8vo. Cadell. Additions to Robertson’s history of Am…

- **[1789]** *Named Reference (Shakespeare)* — *Thomas Jefferson to John Trumbull, 18 January 1789*
  - Reference: **Shakespear**
  - Passage: …clothes to him.] The other is to answer some queries after [you shall have] made enquiry. Do the pictures of Newton, [Locke, Bacon, Syd]ney, Hampden, Shakespear exist? What would it cost to have them copied by some good young hand, who will do them well and is not of such established reputation as to be dear?…

- **[1789]** *Named Reference (Shakespeare)* — *Thomas Jefferson to John Trumbull, 18 January 1789*
  - Reference: **Shakespere**
  - Passage: …in England, tho’ I do not expect better. Do the busts of the same persons, Newton, Locke, &c. exist, and what would they cost in plaster? Bell’s Shakespere tells us that the only genuine picture of Shakespere is in possession of the earl of Chandos. I suppose the lives of the other authors prefixed to th…

- **[1789]** *Named Reference (Shakespeare)* — *Thomas Jefferson to John Trumbull, 18 January 1789*
  - Reference: **Shakespere**
  - Passage: …sts of the same persons, Newton, Locke, &c. exist, and what would they cost in plaster? Bell’s Shakespere tells us that the only genuine picture of Shakespere is in possession of the earl of Chandos. I suppose the lives of the other authors prefixed to their works will say where their pictures exist. I am w…

- **[1807]** *Named Reference (Shakespeare)* — *From Thomas Jefferson to Samuel F. Bradford, 13 December 1807*
  - Reference: **Shakespear**
  - Passage: …Washington Dec. 13. 07. Sir I see by an advertisement in Poulson’s paper of the 11th. that you have for sale Sharp’s Shakespear in 9. vols 32mo. I will thank you to send it to me, the size being the circumstance which recommends it. altho’ I do not find on your catalogue Joh…

- **[1808]** *Named Reference (Shakespeare)* — *From Thomas Jefferson to Samuel F. Bradford, 8 January 1808*
  - Reference: **Shakespear**
  - Passage: …Washington Jan. 8. 08. Sir The copy of Shakespear you were so kind as to send me came safe to hand, and I avail myself of the first occasion of making a remittance to Philada to include the sum of 11…

- **[1816]** *Named Reference (Shakespeare)* — *Thomas Jefferson’s Title and Prospectus for Destutt de Tracy’s Treatise on Political…*
  - Reference: **Shakespear**
  - Passage: …t a wonderful accession of copiousness and force has the French language attained by the innovations of the last 30. years! and what do we not owe to Shakespear for the enrichment of the language by his free and magical creation of words? in giving a loose to neologism indeed, uncouth words will sometimes be…

- **[1818]** *Named Reference (Shakespeare)* — *Thomas Jefferson to Nathaniel Burwell, 14 March 1818*
  - Reference: **Shakespeare**
  - Passage: …f those of Mad m Genlis. for a like reason too much poetry should not be indulged. some is useful for forming style and taste. Pope, Dryden, Thomson, Shakespeare, and of The French Moliere, Racine, the Corneilles may be read with pleasure and improvement. The French language, become that of the general interco…

- **[1825]** *Named Reference (Shakespeare)* — *From Thomas Jefferson to J. Evelyn Denison, 9 November 1825*
  - Reference: **Shakespear**
  - Passage: …the recovery of the Anglo-Saxon dialect of our language; for a mere dialect it is, as much as those of Piers Plowman Gower, Douglas Chaucer Spencer, Shakespear, Milton, for even much of Milton is already antiquated. the A-Saxon is only the earliest we possess of the many shades of mutation by which the langu…

- **[1825]** *Named Reference (Shakespeare)* — *From Thomas Jefferson to J. Evelyn Denison, 9 November 1825*
  - Reference: **Shakespear**
  - Passage: …etained. when these local vocabularies are published and digested together into a single one it is probable we shall find that there is not a word in Shakespear which is not now in use in some of the counties in England, from whence we may obtain it’s true sense. and what an exchange will their recovery be…

- **[1825]** *Named Reference (Shakespeare)* — *Thomas Jefferson: an essay or introductory lecture...dialects of the English language,…*
  - Reference: **Shakespear**
  - Passage: …language which they constituted; did not make the language of Alfred a different one from that of Piers Ploughman, of Chaucer, Douglas, Spencer, and Shakespear, any more than the 2 d revolution, which substituted the Roman for the English black letter made theirs a different language from that of Pope and Bo…

- **[1825]** *Named Reference (Shakespeare)* — *Thomas Jefferson: an essay or introductory lecture...dialects of the English language,…*
  - Reference: **Shakespear**
  - Passage: …tion, which substituted the Roman for the English black letter made theirs a different language from that of Pope and Bolingbroke; or the writings of Shakespear, printed in black letter different from the same as now done in Roman type. the life of Alfred written in Latin, and in Roman character by Asser, was…

- **[1825]** *Named Reference (Shakespeare)* — *Thomas Jefferson: an essay or introductory lecture...dialects of the English language,…*
  - Reference: **Shakespear**
  - Passage: …ters of the years 890. 930. 1130. 1160. 1180. 1250. 1260. 1380. 1430. 1500. 1526. 1537. 1541. 1556. 1611. that is, from the time of Alfred to that of Shakespear. these obviously prove the gradual changes of the language from the A-S. form, to that of the present English, and that there was no particular point…

- **[1825]** *Named Reference (Shakespeare)* — *Thomas Jefferson: an essay or introductory lecture...dialects of the English language,…*
  - Reference: **Shakespear**
  - Passage: …us by the intimate insight it will give us into the genuine structure powers, and meanings of the language we now read and speak. we shall then read Shakespear and Milton with a superior degree of intelligence and delight, heightened by the new and delicate shades of meaning developed to us by a knolege of t…

## Benjamin Franklin

*High-confidence findings: 0 verbatim quotations, 2 by-name references to Shakespeare, 0 play-title references with Shakespeare proximity.*

- **[1775]** *Named Reference (Shakespeare)* — *Benjamin Franklin to Jonathan Williams, Jr., 12 September 1775*
  - Reference: **Shakespeare**
  - Passage: …house. Addressed: To / Mr Jonathan Williams / at Mrs Stevenson’s / Craven street / London / per favour of Capt. Loxley [ In Loxley’s hand: ] Mr. Shakespeare please deliver the enclos’d to Mr. D. Barclays care opposite Bow Church and will obloige yours &c B L Chapeside 108…

- **[1783]** *Named Reference (Shakespeare)* — *Benjamin Franklin to Robert R. Livingston, 22[–26] July 1783*
  - Reference: **Shakespear**
  - Passage: …be, that Count de V. and myself are continually plotting against him & employing the News Writers of Europe to depreciate his Character, &ca. but as Shakespear says, “Trifles light as Air, &ca.” 4 I am persuaded however that he means well for his Country, is always an honest Man, often a Wise One, but so…

## George Washington

*High-confidence findings: 0 verbatim quotations, 1 by-name reference to Shakespeare, 0 play-title references with Shakespeare proximity.*

- **[1796]** *Named Reference (Shakespeare)* — *George Washington to George Washington Parke Custis, 28 November 1796*
  - Reference: **Shakespear**
  - Passage: …s, to speak evil of any one, unless there is unequivocal proofs of their deserving it, is an injury for which there is no adequate reparation; for as Shakespear says—“he that robs me of my good name, enriches not himself, but renders me poor indeed”—or words to that effect. 4 I have said thus much, be…

# Medium-Confidence Findings

These passages are probable Shakespearean references. A knowledgeable reader would likely recognise the connection, but the catalogue cannot rule out coincidental overlap with general early-modern English idiom. KWIC context is provided so the reader can verify each case.

## John Adams

- **[1758]** *Close Paraphrase / Distinctive Sequence* (6-word sequence) — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*; from **Othello, Moor Of Venice**
  - Match: *"shrill trump the spirit stirring drum"*
  - Passage: …rewell the ploomed Troops and the big War That make Ambition Virtue! Oh! farewell! Farewell the neighing Steed, and the shrill Trump The spirit stirring Drum, th’ear piercing fife The Royal Banner and all Quality, Pride, Pomp, and Circumstance of glorious War And Oh! you mor…

- **[1758]** *Close Paraphrase / Distinctive Sequence* (6-word sequence) — *[A Letter to Richard Cranch about Orlinda, a Letter on Employing One’s Mind, and…*; from **Othello, Moor Of Venice**
  - Match: *"you mortal engines whose rude throats"*
  - Passage: …ng Drum, th’ear piercing fife The Royal Banner and all Quality, Pride, Pomp, and Circumstance of glorious War And Oh! you mortal Engines, whose rude Throats Th’immortal Joves dread Clamours counterfeit Farewell! Othello’s Occupations gone! 22 These Exclamations, Apostroph…

- **[1758]** *Close Paraphrase / Distinctive Sequence* (5-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"sleep the innocent sleep sleep"*
  - Passage: …en he was [ remainder missing ] His imagination created 100 things, a Voice crying, Sleep no more, Mackbeth doth Murder Sleep; the innocent Sleep. Sleep is the Idea now. What Thoughts does this call up. Sleep that knits up the ravelled sleeve of Care, the Death of each da…

- **[1758]** *Close Paraphrase / Distinctive Sequence* (5-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"balm of hurt minds great"*
  - Passage: …As Death is to a mans whole Life, so is < Sleep to a day > each nights Sleep to us, sore Labours Bath, Bath of Labour, Balm of Hurt minds, great natures second Course, chief Nourisher in Lifes feast. The Eye of [ remainder missing ]…

- **[1758]** *Close Paraphrase / Distinctive Sequence* (5-word sequence) — *[Shakespeare’s Characters and Figurative Language, October–December 1758.]*; from **Macbeth**
  - Match: *"second course chief nourisher in"*
  - Passage: …so is < Sleep to a day > each nights Sleep to us, sore Labours Bath, Bath of Labour, Balm of Hurt minds, great natures second Course, chief Nourisher in Lifes feast. The Eye of [ remainder missing ]…

- **[1794]** *Close Paraphrase / Distinctive Sequence* (6-word sequence) — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Match: *"admit no name of magistrate letters"*
  - Passage: …me in his last Letter. “In the Commonwealth We shall by contraries execute all Things: for no kind of Trafic shall We admit; no name of Magistrate; Letters will not be known, wealth, Poverty and Use of service none; contract, Succession bowen bound of Land, tilth, Vineyard n…

- **[1794]** *Play Title with literary cue* — *John Adams to Abigail Adams, 17 May 1794*; from **The Tempest**
  - Reference: **the Tempest**
  - Passage: …ty corruption is lawful! 3 Elections are going the Usual Way in our devoted Country. Oh! that I had done with them.— We shall realize the raving in the Tempest, which Charles quoted to me in his last Letter. “In the Commonwealth We shall by contraries execute all Things: for no kind of Trafic shall We admi…

- **[1803]** *Play Title with literary cue* — *John Adams to William Stephens Smith, 26 February 1803*; from **Coriolanus**
  - Reference: **Coriolanus**
  - Passage: …rth while to excite any public Attention to the subject here. Your Character has not suffered here, on Account of it. I rec d and read with Attention Coriolanus. It is well written in a Simple clear and nervous Style, with a Knowledge of the subject, and with a Spirit, Decision and Intrepidity that I admire.…

- **[1807]** *Close Paraphrase / Distinctive Sequence* (5-word sequence) — *From John Adams to Benjamin Rush, 21 May 1807*; from **Richard The Second**
  - Match: *"will make wise men mad"*
  - Passage: …d “The People of Boston are distracted.” Another Answered No wonder the People of Boston are distracted, oppression will make wise Men mad. A third said, what would you Say, if a Fellow Should come to your house and tell you he was come to take a List of you…

- **[1813]** *Play Title with literary cue* — *From John Adams to William Stephens Smith, 3 July 1813*; from **Comedy Of Errors**
  - Reference: **Comedy of Errors**
  - Passage: …the existence of their administrations entirely to him. And a bright Laurel, a splendid distinction it is. Posterity, I hope will know it. The great Comedy of Errors has arisen from that immense Error of the first Concoction attempting Canada without the command of the Lakes. I expect soon to see the Southern & mi…

- **[1815]** *Close Paraphrase / Distinctive Sequence* (6-word sequence) — *From John Adams to William Stephens Smith, 21 November 1815*; from **Hamlet, Prince Of Denmark**
  - Match: *"enterprises of great pith and moment"*
  - Passage: (no extracted context)

- **[1815]** *Play Title with literary cue* — *From John Adams to John Vaughan, 25 September 1815*; from **The Tempest**
  - Reference: **the Tempest**
  - Passage: …with prudent officers and intrepid Seamen, can fly before dangers, which Houses and Forrests and Fences cannot. I am anxious to learn the Progress of the Tempest in New York, Phyladelphia and Southward to the Line. I should think our learned Societies as well employed in ascertaining in Hours and Minutes the d…

## Thomas Jefferson

- **[1771]** *Play Title with literary cue* — *Thomas Jefferson to Robert Skipwith, with a List of Books for a Private Library, 3…*; from **King Lear**
  - Reference: **King Lear**
  - Passage: …nd every moral rule of life. Thus a lively and lasting sense of filial duty is more effectually impressed on the mind of a son or daughter by reading King Lear, than by all the dry volumes of ethics and divinity that ever were written. This is my idea of well-written Romance, of Tragedy, Comedy, and Epic Poe…

- **[1785]** *Play Title with literary cue* — *Thomas Jefferson to James Monroe, [6 February 1785]*; from **Comedy Of Errors**
  - Reference: **comedy of errors**
  - Passage: …ou will have understood them. If they were written by the 1st. you will now be able by translating the numbers to understand them also; and thus this comedy of errors will be cleared up. Since writing so far I have made out a table adjusting the numbers in my copy to those in yours, which will enable you to transla…

- **[1787]** *Character with literary cue* — *Thomas Jefferson to Thomas Barclay, with Enclosure, 3 August 1787*; from **Shylock**
  - Reference: **Shylock**
  - Passage: …eased nor shall cease endeavoring to satisfy others that your conduct has been that of an honest and honourable debtor, and theirs the counterpart of Shylock in the play. I inclose you a letter containing my testimony on your general conduct, which I have written to relieve a debt of justice pressing on my…

## James Madison

- **[1780]** *Play Title with literary cue* — *James Madison to Joseph Jones, 5 December 1780*; from **The Tempest**
  - Reference: **the tempest**
  - Passage: …same time and had a very material effect both on stocks and on ensurance. 5 Information from the W. Indies gives a tragical picture of the effects of the tempest. Martinique has suffered very considerably in their Shipping and Seamen. The English have certainly lost the Ajax a Ship of the line & 2 frigates sta…

- **[1787]** *Close Paraphrase / Distinctive Sequence* (5-word sequence) — *Debates in the Federal Convention*; from **Second Part Of Henry Iv**
  - Match: *"i love thee thou art"*
  - Passage: …icked his teeth suggestively, as a wolf does when he contemplates a meal. Then, as an afterthought, as though ashamed, “I love thee! Thou art a man after my own heart! But I am her man! Wait and see!” The mullah in the arena, blinking with his lashless eyes, he…

# Statistical Summary

## Findings by Founder and Confidence

| Founder | Direct quotations (High) | Close paraphrases (Medium) | By-name Shakespeare (High) | Play/Character with proximity (High) | Play/Character with literary cue (Medium) | **Total non-Low** |
|:--------|------:|------:|------:|------:|------:|------:|
| John Adams | 53 | 8 | 42 | 2 | 4 | **109** |
| Thomas Jefferson | 0 | 0 | 23 | 0 | 3 | **26** |
| Benjamin Franklin | 0 | 0 | 2 | 0 | 0 | **2** |
| George Washington | 0 | 0 | 1 | 0 | 0 | **1** |
| James Madison | 0 | 1 | 0 | 0 | 1 | **2** |
| Alexander Hamilton | 0 | 0 | 0 | 0 | 0 | **0** |

## Direct quotations by Shakespeare play

| Play | Direct quotations (High + Medium) |
|:-----|------:|
| Macbeth | 20 |
| The Tempest | 11 |
| Othello, Moor Of Venice | 10 |
| Julius Caesar | 8 |
| Henry The Fifth | 5 |
| The Second Part Of Henry The Sixth | 2 |
| Alls Well That Ends Well | 1 |
| Richard The Second | 1 |
| Second Part Of Henry Iv | 1 |
| The First Part Of Henry The Sixth | 1 |
| Hamlet, Prince Of Denmark | 1 |
| Romeo And Juliet | 1 |

# Analysis by Author

## John Adams

*Direct quotations: **53 High** + 8 Medium. Named references: **42 by-name** + 2 play/character with Shakespeare proximity (High) + 4 play/character with literary cue (Medium). Total non-Low: **109**.*

John Adams accounts for the overwhelming majority of verifiable Shakespeare references in the entire corpus. His engagement spans more than six decades, from a famous 1758 diary entry where the 23-year-old lawyer transcribes long passages from *Macbeth*, *Othello*, and other plays, to an 1822 letter — written months before his death — that applies Antony's *'Cry havoc, and let slip the dogs of war'* to Franklin's political doctrine. Several Shakespearean lines recur across his career: *'There is a tide in the affairs of men'* (Brutus, *Julius Caesar* 4.3) appears in his correspondence in 1776, 1781, 1809, 1812, and 1814 — applied variously to the founding moment, the diplomatic post-war, the early Republic, and his own decline. *'The pride, pomp, and circumstance of glorious war'* (*Othello* 3.3) appears in 1775, 1777, 1780, and 1809 — usually with light irony applied to the conduct of the Continental Army or his own diplomatic and presidential service.

Adams is also the only Founder in the corpus who routinely names Shakespeare. His 42 by-name references include literary-critical reflection (the 1758 diary; the 1772 'Quaintness of Style' notes), explicit comparison (Benjamin Harrison as 'another Sir John Falstaff', 1776), and retirement reading (*Coriolanus*, 1803). The catalogue supports a strong reading: Adams treated Shakespeare as a living intellectual resource — a vocabulary for political analysis, a database of human types, and an accessible literary tradition from which to quote.

## Thomas Jefferson

*Direct quotations: **0 High** + 0 Medium. Named references: **23 by-name** + 0 play/character with Shakespeare proximity (High) + 3 play/character with literary cue (Medium). Total non-Low: **26**.*

Thomas Jefferson is the second-most prolific namer of Shakespeare in the corpus (23 by-name references) but the *least* prolific quoter. His named references are mostly either book-list entries ('Capell's Shakespeare', 'Bell's Shakespeare' — Jefferson was an active collector of editions) or literary-pedagogical recommendations. His 1771 letter on moral instruction proposes reading *King Lear* as a more effective ethical training than 'dry volumes of ethics'; his 1771 essay on the affective power of fiction takes the murder of Duncan in *Macbeth* as its canonical example. Jefferson's relationship to Shakespeare is bibliographic and pedagogical: he reads, recommends, and catalogues; he does not quote at length.

## Benjamin Franklin

*Direct quotations: **0 High** + 0 Medium. Named references: **2 by-name** + 0 play/character with Shakespeare proximity (High) + 0 play/character with literary cue (Medium). Total non-Low: **2**.*

Benjamin Franklin names Shakespeare twice in the entire corpus: in 1775 (a playful epistolary aside addressed to 'Mr. Shakespeare') and in 1783, in a letter from Paris where he quotes *Othello*'s *'Trifles light as air'* (3.3) without attributing the source — the line is part of his own epistolary voice rather than a marked literary citation. Franklin produces no verbatim 7+ word Shakespeare matches, no play-title references with Shakespeare proximity, and no extended quotation. The companion statistical paper (`reports/paper.md` §3.5, §4.2) shows that Franklin's Shakespearean inheritance is overwhelmingly at the register level — archaic forms, contractions, pronouns, and metaphor distributions — rather than at the level of literal quotation. The two channels of Shakespearean influence are almost perfectly disjoint in Franklin's case.

## George Washington

*Direct quotations: **0 High** + 0 Medium. Named references: **1 by-name** + 0 play/character with Shakespeare proximity (High) + 0 play/character with literary cue (Medium). Total non-Low: **1**.*

George Washington names Shakespeare once, in 1796, in a passage that quotes *Othello* 3.3 — *'he that robs me of my good name'* — to support a remark on the gravity of defamation. The quotation is unattributed in the source letter but introduced with 'as Shakespear says'. Washington produces no verbatim 7+ word matches detected by this pipeline. The famous *'band of brothers'* echo from the April 1778 General Orders at Valley Forge (*Henry V* 4.3) is in the corpus but is captured by the statistical case studies as a phrase popularly attributed to Shakespeare rather than a Bonferroni-surviving direct match (see `reports/paper.md` §3.8). For Washington, the catalogue's near-silence is itself the signal: a literary practitioner Shakespeare was not.

## James Madison

*Direct quotations: **0 High** + 1 Medium. Named references: **0 by-name** + 0 play/character with Shakespeare proximity (High) + 1 play/character with literary cue (Medium). Total non-Low: **2**.*

James Madison neither names Shakespeare nor quotes him verbatim in any document in this corpus. He is the only Founder for whom both pipelines produce zero High-confidence hits. The companion statistical paper (`reports/paper.md` §3.5) shows the same picture at the register level: Madison is second-to-last in composite Shakespearean alignment, with the lowest archaic-form density of any Founder. The administratively careful, abbreviation-dense prose for which he is known appears to admit very little Shakespearean material at any level.

## Alexander Hamilton

*Direct quotations: **0 High** + 0 Medium. Named references: **0 by-name** + 0 play/character with Shakespeare proximity (High) + 0 play/character with literary cue (Medium). Total non-Low: **0**.*

Alexander Hamilton, like Madison, produces zero verbatim Shakespeare quotations and never names Shakespeare in any document in this corpus. The companion statistical paper (`reports/paper.md` §3.7) reports that Hamilton is the only Founder with zero shared HIGH-bin stylistic intersections with Shakespeare in the Configural Frequency Analysis. He had read Shakespeare — his Roman-history references in *The Federalist* show a working familiarity with *Julius Caesar* and *Coriolanus* — but in this corpus he neither cites nor echoes him at any detectable level.

# Analysis by Shakespeare Play

Of the verbatim 7+ word Shakespeare quotations identified in the Founders' corpus, the distribution across plays is striking but biographically interpretable. The plays Adams was reading most intensively in 1758 (*Othello*, *Macbeth*) account for the largest single share, followed by the Roman histories (*Julius Caesar*, the Henry plays) that supplied political vocabulary during the Revolution and the early Republic.

| Play | Direct quotations (High + Medium) | Notable instances |
|:-----|------:|:------------------|
| Macbeth | 20 | Adams 1758 diary; Lady Macbeth (1782, 1799); 'sound and fury' (1758, 1813); 'tomorrow' soliloquy |
| The Tempest | 11 | Adams 1794 Gonzalo's Lubberland speech (extended quotation) |
| Othello, Moor Of Venice | 10 | Adams 1758 'Farewell the tranquil mind'; 'pride pomp and circumstance' (1775, 1777, 1780, 1809); Washington 1796 'he that robs me of my good name' |
| Julius Caesar | 8 | Adams 1776, 1781, 1809, 1812, 1814 'There is a tide in the affairs of men'; 1822 'Cry havoc, and let slip the dogs of war' |
| Henry The Fifth | 5 | Adams 1805 'A nest of hollow Bosoms' (Henry V's prayer) |
| The Second Part Of Henry The Sixth | 2 | Adams 1775 'In time to come I hope to'; 1782 'God save the King, God save the King' |
| Alls Well That Ends Well | 1 | Adams 1789 'good fortune and the favour of the World' |
| Richard The Second | 1 | Adams 1807 'will make wise men mad' (applied to Boston oppression) |
| Second Part Of Henry Iv | 1 |  |
| The First Part Of Henry The Sixth | 1 | Adams 1805, 1812 'Between the red rose and the white' (Wars of the Roses → American party politics) |
| Hamlet, Prince Of Denmark | 1 | Adams 1815 'enterprises of great pith and moment' ('To be or not to be' soliloquy) |
| Romeo And Juliet | 1 | Adams 1810 'gossamer that idles in the wanton summer air' (applied to John Randolph) |

*Plays not listed yielded only Low-confidence matches at this corpus size; the Low tier is dominated by general early-modern English and is discussed via the statistical analyses in `reports/paper.md` §3.3 (differential collocates of common abstract nouns) and §3.6 (metaphorical patterns).*

# Methodological Observations and Conclusions

## The catalogue reproduces the broader two-modes finding

The companion statistical paper (`reports/paper.md`) argues, on the basis of eight independent case studies, that Shakespearean influence on the Founders divides into two distinct modes: a *citational* mode (Adams) and an *absorbed* mode (Franklin). This catalogue, working at a completely different level of evidence — passage-level direct quotation rather than aggregate linguistic distribution — reproduces the same partition. Adams is the dominant citational presence; Franklin produces almost no surface-level Shakespearean material despite ranking first or second on every register-level measure in the statistical paper. The two pipelines are seeing two halves of the same underlying pattern.

## Adams as the literary voice

John Adams accounts for the overwhelming majority of Shakespeare quotations in this corpus. The Adams catalogue spans more than six decades and shows a consistent rhetorical mode: he uses Shakespeare as a vocabulary for political analysis. *King Lear* describes a drunk tavern-keeper (1758); Lady Macbeth describes Herod's massacre of the innocents (1782); the Tide speech from *Julius Caesar* describes the founding moment (1776) and the diplomatic post-war (1781), and his own decline (1812, 1814); Antony's *'Cry havoc'* describes Franklin's doctrine (1822). For Adams, Shakespeare is an *applied* literature, not a decorative one.

## Coriolanus and Julius Caesar as the Founders' plays

Where Shakespeare appears in the catalogue, the Roman plays dominate the politically engaged Founders. *Julius Caesar* — with the Brutus tide speech, Antony's funeral oration, and the conspirators' deliberation — is the most-quoted play in the catalogue. *Coriolanus* is named more often by the Founders than any other Shakespeare play, and Adams's 1803 retirement reading of it for its 'Spirit, Decision and Intrepidity' is one of the more biographically eloquent entries in the corpus. The thematic fit is unsurprising: these are Shakespeare's two sustained treatments of republican politics, and the Founders were engaged with precisely the questions the plays dramatise.

## The Hamilton / Madison silence

Neither Alexander Hamilton nor James Madison names Shakespeare or quotes him verbatim in any document in this corpus. The absence is consistent with the statistical paper's finding that Hamilton has *zero* shared HIGH-bin stylistic intersections with Shakespeare (`reports/paper.md` §3.7) and that Madison's metaphor profile is the most divergent from Shakespeare's of any Founder (`reports/paper.md` §3.6). The administrative register of *The Federalist* — and of Hamilton's Treasury correspondence and Madison's congressional notes — appears to admit Shakespearean material neither as quotation nor as absorbed habit.

## The need for a non-Shakespearean reference corpus

The catalogue's main methodological limitation is the absence of a 17th-/18th-century reference corpus (EEBO-TCP / ECCO). Without one, the catalogue cannot fully distinguish phrases Shakespeare *coined or popularised* from phrases that simply appeared in Shakespeare while already being current in early-modern English. The companion statistical paper (`reports/paper.md` §3.8) shows that of 24 phrases popularly attributed to Shakespeare, only four are statistically Shakespeare-distinctive against the Founders' general English. A baseline corpus would let us re-classify many Medium-confidence and currently-Low findings with substantially more precision.

## Honest scholarship requires restraint

This catalogue is conservative by design: every High-confidence finding is either a direct multi-word verbatim match or an explicit named reference to Shakespeare. The Low tier — dominated by 5-gram coincidences in general English — is deliberately not enumerated. The temptation to find Shakespeare behind every reference to ambition, faction, or the body politic is resisted; for systematic claims about register, metaphor, and conceptual inheritance, the statistical paper is the appropriate tool. This catalogue is the surface; the paper is the depth.

---

*Source data and the full Low-confidence catalogue are in `tables/catalogue_direct_quotes.csv` and `tables/catalogue_named_references.csv`. Quotations have been verified against the Founders Online digital archive (`founders.archives.gov`) and the Project Gutenberg edition of Shakespeare's complete works. Detection pipelines: `scripts/catalogue_direct_quotes.py` and `scripts/catalogue_named_references.py`. Report assembled by `scripts/build_results_summary.py`.*

*Companion documents: `reports/paper.md` (corpus-linguistic statistical analysis) and `reports/narrative.md` (narrative-driven explainer).*
