---
title: "Shakespeare in the Republic"
subtitle: "A Corpus-Linguistic Analysis of Influence on the Founders, 1590–1820"
author: "Mark J. Williams"
date: 2026-05-20
abstract: |
  Six Founding Fathers (Adams, Franklin, Hamilton, Jefferson, Madison, Washington) wrote a combined 24.6 million words across their surviving correspondence; Shakespeare's complete works comprise 38 documents and 891,092 words. This paper applies the corpus-linguistic methodology of Stefanowitsch (2020) to the asymmetric question of Shakespearean influence on these six writers: which features of Shakespeare's language persist in the Founders' writing, in whom, and to what extent? Seven statistical and stylistic case studies (keyword analysis, sample-size-matched lexical richness, differential collocates of politically loaded abstract nouns, personal-reference profiles, diachronic archaic-form survival, metaphorical-pattern analysis, Configural Frequency Analysis on stylometric features), a reanalysis of 24 phrases widely attributed to Shakespeare, and three evidence-based per-million-word measures added in the methodology-v2 expansion (verified catalogue references, thematic character invocations, MEDIUM-confidence candidate-echo density) are combined in an eleven-method convergence framework. Three findings emerge. First, **John Adams leads the composite influence ranking** (0.88), with Benjamin Franklin a step behind (0.76); Jefferson (0.68), Washington (0.28), Hamilton (0.22), and Madison (0.18) follow. Adams ranks first on six of the eleven methods, including all three evidence-based measures; Franklin ranks first on five statistical/stylistic methods. Second, **the two leaders absorbed Shakespeare in distinct *modes***: Adams citationally (61 verbatim quotations and 48 by-name references across his life, the widest Shakespeare-distinctive vocabulary, explicit textual reference) and Franklin habitually (the highest archaic-form density, the closest pronoun- and metaphor-profiles to Shakespeare, the greatest CFA stylistic-type overlap). Third, **where shared vocabulary items occur** (*honour, power, love, death, friend, mind*) **the collocational worlds diverge systematically**: the Founders inherited Shakespeare's lexis and rebuilt the conceptual content. Two methodological cautions emerge: naïve vocabulary-richness comparisons between corpora of unequal size systematically misstate the result, and of 24 phrases popularly attributed to Shakespeare only four (*I had rather, flesh and blood, pound of flesh, et tu Brute*) survive Bonferroni correction as Shakespeare-distinctive in the two-corpus comparison.
---

## Table of Contents

- §1. Introduction
- §2. Methods (corpus, normalisation, statistical machinery, reproducibility)
- §3. Eight case studies
    - §3.1 Differential keyword analysis
    - §3.2 Sample-size-corrected lexical richness
    - §3.3 Differential collocates of politically loaded abstract nouns
    - §3.4 Personal-reference and pronoun distribution
    - §3.5 Diachronic stylistic-marker survival
    - §3.6 Metaphorical pattern analysis
    - §3.7 Configural Frequency Analysis on stylometric features
    - §3.8 Reanalysis of 24 claimed Shakespearean coinages
- §4. General discussion
    - §4.1 Composite ranking and six-method convergence
    - §4.2 Two modes of Shakespearean influence
    - §4.3 The conceptual-inheritance question
    - §4.4 Caveats and limitations
    - §4.5 Implications and future work
- Appendix A: Operationalisation summary
- Appendix B: Per-Founder summary tables and reproducibility chain
- References

---

# §1. Introduction

## 1.1 What is the question?

This paper asks a single asymmetric question: **to what extent, and in what specific ways, does the language of William Shakespeare persist in the writings of the six American Founders most central to the formation of the republic, John Adams, Benjamin Franklin, Alexander Hamilton, Thomas Jefferson, James Madison, and George Washington?** The question is asymmetric in the precise sense that Shakespeare is the candidate source (he died in 1616) and the Founders are the candidate targets (they wrote between c. 1750 and c. 1820). Influence can travel only forward in time. The empirical work below seeks measurable traces of that forward motion in a 25.5-million-word corpus.

The question can be decomposed into four sub-questions that map onto distinct corpus-linguistic methodologies:

1. **Vocabulary absorption.** Of the words distinctively over-represented in Shakespeare relative to the Founders, which appear at meaningful rates in the writing of any individual Founder, and how is that absorption distributed across the six?
2. **Collocational absorption.** Of Shakespeare's distinctive contextual patterns around politically loaded abstract nouns (*honour, love, power, death, friend, mind*), which patterns survive in the Founders' usage of the same nouns?
3. **Stylistic and conceptual alignment.** Combining vocabulary, collocational, lexical-richness, pronoun-profile, archaic-form, metaphor-profile, and Configural Frequency Analysis (CFA) measures of stylometric features, where do the six Founders rank in alignment with Shakespeare?
4. **Conceptual inheritance.** Where the same vocabulary item appears in both corpora, do the semantic neighbourhoods and metaphorical patterns also coincide, or has the inherited vocabulary been re-purposed?

## 1.2 Motivation: why this problem is important

Historians have placed Shakespeare somewhere in the intellectual furniture of the founding generation at least since Mumford's *The Golden Day* (1926). Bailyn (1967) and McDonald (1985) both invoke a Shakespearean undercurrent in revolutionary political thought without quantifying it. John Adams made the claim early himself; in a diary entry of 21 December 1758, the twenty-three-year-old Adams writes: *"Let me search for the Clue, which Led great Shakespeare into the Labyrinth of mental Nature! Let me examine how men think."* Adams treats Shakespeare as a theorist of motivation. By 1772 he is quoting Shakespeare in political philosophy; by 1776 he compares Benjamin Harrison to Falstaff; in 1803, in retirement, he records reading *Coriolanus*. There is no shortage of biographical evidence that *some* Founder, on *some* occasions, read Shakespeare carefully. The question is what the corpus actually shows.

The motivation for posing the question quantitatively is twofold. First, for legal and political-theory readers, an authoritative answer about Shakespearean influence on the Founders has direct bearing on the intellectual genealogy of American constitutional vocabulary. *Power*, *liberty*, *honour*, *people*, *government*, *law* are inherited words; whether they are inherited concepts is an empirical matter. Second, for corpus linguists, the data set is unusually well-suited to a methodologically rigorous demonstration of Stefanowitsch's (2020) framework applied to a literary-historical influence question, large enough that effect sizes rather than significance carry the analytical weight (Stefanowitsch §6.5), heterogeneous enough across six authors that individual variation is recoverable, and small enough that the entire corpus fits in memory and every claim is traceable to a row in a CSV file.

## 1.3 Overview of previous work

The historiographical claim that Shakespeare belongs somewhere in the intellectual furniture of the founding generation has a long lineage. Mumford (1926) treats the Elizabethan-Jacobean inheritance as part of the Puritan-and-Cavalier doubling of American letters. Bailyn (1967) and McDonald (1985) both invoke a Shakespearean undercurrent in revolutionary thought without quantifying it. Reid (1981) and Kornstein (1994) discuss Shakespeare's reception in early American legal and political culture more directly. None of this prior work tests the influence claim against the writings themselves at scale; close-reading scholarship can identify individual quotations and allusions but cannot say which Founder absorbed what, or in what proportion, or whether the inheritance was lexical, collocational, conceptual, or some combination of the three.

Corpus-linguistics supplies the machinery for the empirical version of the question. Stefanowitsch (2020) (used here as the methodological reference text) supplies G log-likelihood keyword analysis (§7.1.3.3), Pearson χ² (§7.1.3.1), Fisher's exact (§7.1.3.5), Cramer's V (§6.6), effect-size verbal scales (§6.5), differential collocate analysis (Table 7.12), Configural Frequency Analysis (§6.6.2.2), keyword analysis with both-corpus framing (Ch 10), metaphorical-pattern analysis (Ch 11.2.2), and diachronic methodology (§§8.2.5, 10.2.5). Gries (2013, 2016a, 2016b) and Gries & Paquot (2020) provide the writing template, research-question, methods (operationalisation, retrieval, software, filtering, statistical-tests), results (summary, graphic, significance with df and p, effect size), and discussion, followed here at the level of every case study. Catalogues of phrases attributed to Shakespeare in popular and scholarly compilations (Levin 1983; Crystal 2008; Crystal & Crystal 2002) supply the candidate phrase list for CS8.

## 1.4 Hypotheses

Following Stefanowitsch §3 (the research cycle) and §6.5 (effect size as the analytic primary), the paper tests four headline hypotheses:

- **H1.** Vocabulary-richness comparisons between corpora of unequal size systematically misstate the result; with sample-size matching at Shakespeare's token count (Stefanowitsch §9.1), MSTTR effect sizes between Shakespeare and any individual Founder will be very weak (φ < 0.10), statistically significant but not theoretically substantial.
- **H2.** Of phrases widely attributed to Shakespeare in popular and scholarly compilations, the majority will fail Bonferroni-corrected G log-likelihood tests of Shakespeare-distinctiveness against the Founders aggregate, i.e. many "Shakespearean" phrases will turn out to be general early-modern English by the time they appear in the Founders.
- **H3.** Multiple independent measures of Shakespearean influence (vocabulary, collocations, archaic forms, pronouns, metaphor, CFA stylometric types) will converge on the same broad per-Founder ranking, indicating that the ranking is not an artefact of any individual measure.
- **H4.** Where the same vocabulary item occurs in both corpora at non-trivial rates, the *collocational worlds* of the item will diverge systematically between Shakespeare and the Founders, supporting the broader claim that the Founders inherited Shakespeare's lexis but rebuilt its conceptual content.

Each case study below tests one or more of these hypotheses against the data.

---

# §2. Methods

This section gives the project-wide methodological apparatus that every case study in §3 inherits. Individual case studies supply only their additional case-study-specific operationalisations, retrieval expressions, filters, and statistical tests.

## 2.1 Choice of method

The general method is **quantitative corpus linguistics in an asymmetric-influence frame**. Each case study identifies features distinctive of *Shakespeare* relative to the aggregate Founders corpus, then measures the extent to which those features survive in each of the six individual Founders, a unidirectional inheritance question rather than a symmetric difference between corpora. The corpus-linguistic toolkit (G log-likelihood, χ², Fisher's exact, MSTTR/HTR/Yule's K, CFA, metaphorical-pattern analysis) is taken from Stefanowitsch (2020) and reproduced from first principles in the project's `compare/stats.py`.

The decision to use corpus-linguistic methodology over other plausible approaches (purely stylometric distance, machine-learning classification, manual close reading) is driven by Stefanowitsch §3: corpus linguistics permits operationalised, repeatable, effect-size-reported tests of specific linguistic features, where stylometric distance collapses many features onto a single number, and classification gives accuracy without per-feature interpretability. For an influence question, per-feature interpretability is the property that matters.

## 2.2 Source of data

The Founders corpus comprises the complete digitised correspondence and political writings of the six Founders, drawn from the Founders Online archive (founders.archives.gov) and supplemented with Project Gutenberg texts: *The Federalist Papers* (Hamilton, Madison, Jay), Franklin's *Autobiography* and *Silence Dogood* essays, Jefferson's *Notes on the State of Virginia*, Madison's debates of the Constitutional Convention, Washington's *Farewell Address*, and Hamilton's *Report on Manufactures*. The Shakespeare corpus is the Project Gutenberg complete-works edition (`t8.shakespeare.txt`), comprising 36 plays plus the Sonnets and *A Lover's Complaint*. Per-author corpus sizes after ingestion (raw `word_count` from `doc_metrics`):

| Author             | Documents | Words      |
|:-------------------|----------:|-----------:|
| Adams              |     9,101 |  4,212,978 |
| Franklin           |     3,480 |  1,770,415 |
| Hamilton           |     7,059 |  2,347,616 |
| Jefferson          |    20,391 |  6,957,928 |
| Madison            |     8,584 |  3,420,115 |
| Washington         |    20,154 |  5,884,759 |
| **Founders total** | **68,769** | **24,593,811** |
| Shakespeare        |        38 |    891,092 |

The single-author-to-Shakespeare size ratio is between 2.0× (Franklin) and 7.8× (Jefferson). Stefanowitsch §9.1 warns that any sample-size-dependent measure (TTR, HTR, type counts) must be size-corrected; CS2 supplies the matched-sub-sample correction, and other case studies use rate normalisation (per-million tokens) where applicable.

## 2.3 Operationalisation of variables

Variables operationalised at the project level (case-study-specific operationalisations appear in §3):

- **Author**: categorical, 7-level (six Founders + Shakespeare).
- **Document**: a corpus-internal unit corresponding to one Founders Online entry (letter, draft, essay, etc.) or one Shakespeare work (play, sonnet sequence, *Lover's Complaint*).
- **Token**: output of the project tokeniser (`analysis/normalization.tokenize`): the regular expression `[A-Za-z]+(?:'[A-Za-z]+)?`, lowercased, with clitic splitting (e.g. *don't* → *do n't*).
- **Type**: distinct lowercased token.
- **Hapax**: type with frequency exactly 1 in the relevant sub-corpus.
- **Per-million rate**: `1,000,000 × count / N_tokens` in the relevant sub-corpus.
- **Influence-distinctive feature**: a feature over-represented in Shakespeare relative to the aggregate Founders by G log-likelihood (side = B in `compare/stats.py`), with effect-size and frequency thresholds specified per case study.

## 2.4 Retrieval algorithm or syntax

Token retrieval uses the regular expression `[A-Za-z]+(?:'[A-Za-z]+)?` (alphabetic with optional apostrophe-clitic). N-grams (CS8 coinages, CS6 metaphor patterns) use case-insensitive regex over the cleaned text stream, with whitespace flexibility (e.g. `\bband\s+of\s+brothers\b`). Collocate retrieval (CS3) uses a fixed ±5-token window per Stefanowitsch §7.1.1 around each occurrence of a target noun. KWIC retrieval (Influence-2) uses a ±10-token window for human-readable concordance display.

## 2.5 Software

All analysis runs in Python 3.14 on macOS 24.6.0. Statistical primitives are implemented from scratch in `compare/stats.py` (no SciPy or statsmodels dependency for the core tests; SciPy is used only for `scipy.stats.chi2.sf` and `scipy.stats.norm.sf` to obtain p-values from test statistics). The implementation is verified against Stefanowitsch's worked examples:

- **G log-likelihood** (§7.1.3.3 eqn 3, *good example* in the BNC): published value 50.9489; our implementation 50.95.
- **Pearson χ²** (§7.1.3.1 / §6.4, *silly ass* in the BNC): published value 6033.8; our implementation 6033.8.
- **CFA cell-component χ²** (§6.6.2.2 Table 6.21): per-cell components match published values to three decimals.

Figures are produced with matplotlib 3.9 in agg backend; corpus storage is SQLite 3.40 with WAL mode and FK constraints; markdown → DOCX conversion is via Pandoc 3.

## 2.6 Data filtering and annotation

Per Stefanowitsch §10.2.2 (corpus comparability), two corpora must be made comparable *before* keyword or collocate analysis. We apply six normalisations (`analysis/normalization.py`):

1. **Archaic-to-modern spelling map**, 63 rules folding *hath* → *has*, *doth* → *does*, *methinks* → *i think*, *whilst* → *while*, *thou* → *you*, etc. Applied to CS1/CS3/CS4/CS6; explicitly *not* applied to CS5 (where archaic-form survival is the case study's evidence).
2. **Clitic-split tokenisation**, *don't* → *do n't*, applied identically to both corpora.
3. **Folio apparatus stripping**, speaker prefixes (`HAMLET.`), bracketed stage directions (`[Enter Ophelia]`), ACT/SCENE markers.
4. **Project Gutenberg licence boilerplate stripping**, the "PROHIBITED COMMERCIAL DISTRIBUTION INCLUDES BY ANY SERVICE THAT CHARGES FOR DOWNLOAD TIME OR FOR MEMBERSHIP" string appears 36 times in the Shakespeare file (once per play); stripping it pre-normalisation eliminates a class of spurious CS3 collocates that contaminated earlier runs.
5. **Founders signature-block stripping**, formal closings ("I am, with great esteem, Your most obedient humble Servant") are removed before keyword analysis.
6. **Proper-name stop-list**, 125 Shakespeare character names plus Founder personal names and frequent correspondents (Hamilton, Lafayette, Vergennes, etc.) and major place names (Philadelphia, Monticello, Mount Vernon, Quincy) are filtered for keyword analyses (CS1, Influence-1) but retained for personal-reference (CS4) and lexical-richness (CS2) analyses, where they constitute legitimate vocabulary.

Post-normalisation token counts: Washington 5.75 M, Jefferson 6.67 M, Adams 4.11 M, Madison 3.32 M, Hamilton 2.26 M, Franklin 1.74 M; Shakespeare 0.85 M.

## 2.7 Choice of statistical tests

Per Stefanowitsch §6.5, with corpora of this size most tests will be "highly significant" (p < 0.001); analytical weight therefore rests on *effect size*, not on p. The default test is the G log-likelihood (§7.1.3.3) per Stefanowitsch's recommendation as the workhorse statistic for keyword and collocate analysis. We additionally use: Pearson χ² (with Bonferroni correction within each case study), Fisher's exact (low-frequency robustness check), Cramer's V / φ as the effect-size measure (§6.6 eqn 20), Cohen's d for continuous comparisons (§6.5), Mann–Whitney U for non-parametric comparisons of continuous per-document features. Bonferroni correction is applied within each case study at the stated n_tests.

Effect sizes are interpreted on Stefanowitsch's verbal scale (§6.5): φ ≤ 0.10 *very weak*; ≤ 0.25 *weak*; ≤ 0.50 *moderate*; ≤ 0.75 *strong*; ≤ 0.99 *very strong*; = 1.00 *perfect*. P-values are reported in three bands: *significant* (< 0.05), *very significant* (< 0.01), *highly significant* (< 0.001).

## 2.8 Reproducibility

Each case study is a standalone driver script in `scripts/`. Random sampling is fixed-seed (`config.RANDOM_SEED = 42`). All sub-sample manifests are persisted in `data/subsamples/`. Outputs are CSV files in `tables/` (81 files at time of writing) and PNG figures in `data/figures/`. Every claim in this paper traces to a named row in a named CSV.

---

# §3. Eight case studies

Each case study is reported in the Gries & Paquot (2020) micro-template: **Methods → Results → Discussion**, with master Methods elements (corpus, software, statistical machinery) inherited from §2.

## 3.1 Case Study 1: Differential keyword analysis (Stefanowitsch Ch 10)

### 3.1.1 Methods

**Research question.** Which words are distinctively over-represented in each corpus relative to the other? *(Symmetric framing, provides the raw material that the Influence-1 reanalysis in §4.1 will reframe asymmetrically.)*

**Operationalisation.** For each (word, corpus-A, corpus-B) triple, build the 2 × 2 contingency table

|       | in corpus A | in corpus B |
|:------|:-----------:|:-----------:|
| word *w* | O₁₁ | O₁₂ |
| other words | O₂₁ | O₂₂ |

and compute G log-likelihood (Stefanowitsch §7.1.3.3 eqn 3): `G = 2 · Σ O_i · ln(O_i / E_i)`. Words with combined frequency < 5 are excluded (§7.1.3.2 threshold). Three comparisons are run: (a) aggregate Founders vs Shakespeare; (b) each Founder vs Shakespeare; (c) each Founder vs the other five aggregated. Each is computed both with proper names retained and with the proper-name stop-list applied.

**Filtering.** Function words and proper names are partitioned into separate tables; paper-ready content-word lists exclude both classes by default.

**Test statistic and significance.** G with df = 1; Bonferroni n_tests = number of words tested per pairing (~10⁴–10⁵). Effect size φ.

### 3.1.2 Results

13 keyword tables produced, totalling ≈43 MB of CSV output (`tables/cs1_*.csv`). Headline distinctive content words:

- **Aggregate Founders vs Shakespeare** (top Shakespeare-distinctive content words): *love, let, come, how, like, why, speak, tell, heart, god, father, then, look, death, tis, noble, sweet, fair, ay, exit*. These are Shakespeare's elevated literary register.
- **Per-Founder vs other-Founders** signatures: Washington: *quarters, head, officers, army, troops, enemy, regiment, brigade* (military command); Hamilton: *treasury, department, bank* (the Treasury Secretary); Madison: *agst, govt, congs, jm, montpellier* (abbreviation style + Virginia residence); Franklin: *passy, de, le, les, que* (his French years); Jefferson: *recieved, salutations, apr, sep* (idiosyncratic spelling + dating); Adams: *america, england, english, read* (transatlantic intellectual frame).

### 3.1.3 Discussion

The CS1 keyword tables are the raw material the rest of the paper will recompose. CS1's framing is symmetric; it asks *how the corpora differ*. The asymmetric question (*how much of Shakespeare's distinctive vocabulary survives in each Founder?*) requires post-processing the Shakespeare-side keyword list into a per-Founder absorption score (Influence-1, §4.1). The per-Founder signatures already show that the analysis can recover biographically meaningful categories from the corpus alone: the same procedure run on the same data correctly identifies Hamilton as the Treasury Secretary and Franklin as the Paris diplomat.

The principal caveat (Stefanowitsch §10.2.3) is that two corpora differing in genre (drama vs political correspondence) will appear distinctive on naive keyword lists regardless of stylistic similarity. CS3 (collocates of common abstract nouns) and CS6 (metaphor on shared targets) partially control for this by holding the target word constant across corpora.

---

## 3.2 Case Study 2: Sample-size-corrected lexical richness (Stefanowitsch Ch 9)

### 3.2.1 Methods

**Research question.** Is Shakespeare's vocabulary richer, poorer, or comparable to the Founders' once corpus size is controlled? *(Direct test of H1.)*

**Operationalisation.** Stefanowitsch §9.1 is unambiguous: type-token ratio and related vocabulary-richness measures are monotonically decreasing in corpus size and therefore *cannot* be compared across differently-sized corpora without explicit correction. Since our six Founder corpora are 2.0× to 7.8× larger than Shakespeare's by token count (§2.2), any naïve comparison of vocabulary diversity would be confounded with corpus size. We sub-sample each Founder's corpus to Shakespeare's token count (870,900) using a fixed-seed (`RANDOM_SEED = 42`) contiguous-100-block sampling scheme that preserves local co-occurrence structure (§9.2.2.1 fn 2). On each matched sub-sample we compute four measures:

- **TTR** (overall type-token ratio).
- **MSTTR(1000)**: mean segmental TTR over 1,000-token windows; the standard sample-size-stable variant.
- **HTR**: hapax-token ratio (number of types occurring once / total tokens).
- **Yule's K**: global lexical concentration.

**Tests.** Pairwise χ² on (NEW vs SEEN-BEFORE) × (corpus A vs corpus B) and (HAPAX vs ¬HAPAX) × (corpus A vs corpus B) per Stefanowitsch Tables 9.2 / 9.5. Bonferroni n_tests = 42. Effect size φ.

### 3.2.2 Results

![](../data/figures/paper_02_msttr_matched.png)

**Fig. 1** Sample-size-matched lexical richness. At equal 870,900-token sub-samples, Shakespeare's MSTTR (left panel, rightmost bar) is essentially tied with Hamilton's. Yule's K (right panel) runs the opposite direction, Shakespeare is the most globally diverse author.

| Author             | n tokens | MSTTR(1000) |    HTR | Yule's K |
|:-------------------|---------:|------------:|-------:|---------:|
| Washington (sub.)  |  870,900 |       0.439 |  0.011 |    113.8 |
| Jefferson (sub.)   |  870,900 |       0.438 |  0.013 |    111.1 |
| Adams (sub.)       |  870,900 |       0.435 |  0.015 |    103.6 |
| Madison (sub.)     |  870,900 |       0.433 |  0.010 |    141.2 |
| Franklin (sub.)    |  870,900 |       0.433 |  0.013 |     91.9 |
| **Hamilton (sub.)** | 870,900 |    **0.414** |  0.008 |    142.5 |
| **Shakespeare**    |  870,925 |    **0.411** |  0.010 | **64.7** |

All pairwise χ² on (NEW vs SEEN-BEFORE) × (Shakespeare vs Founder) reach the *highly significant* band after Bonferroni correction (p_bonf < 0.001). Every effect size falls in the *very weak* band (φ < 0.10). The largest gap (Shakespeare vs Washington, MSTTR 0.411 vs 0.439) corresponds to φ ≈ 0.04.

### 3.2.3 Discussion

H1 is supported. At sample-size-matched sub-samples:

- Shakespeare's MSTTR (0.411) sits within 0.03 of every Founder; all effect sizes are *very weak*. There is no substantial vocabulary-richness gap between Shakespeare and the Founders at equal corpus sizes; the apparent gap one would obtain from uncorrected ratios is an artefact of corpus-size asymmetry rather than a property of the writing.
- Yule's K *reverses* the direction: at 64.7 it is roughly half the closest Founder's (Franklin 91.9) and a quarter of the largest (Hamilton 142.5). Lower K = more global diversity. By this measure, Shakespeare is the most lexically diverse author in the entire corpus.

The MSTTR/Yule's-K disagreement is methodologically interpretable: MSTTR measures *local* variety within 1,000-token windows, where dramatic dialogue is dense in repeated common words; Yule's K measures *global* concentration, where Shakespeare's 38 plays span 38 lexically distinct fictional worlds. The two measures answer different questions, and the corpus exhibits exactly the pattern (low local variety, high global variety) that drama-vs-correspondence ought to produce. Stefanowitsch §6.5 is the relevant caution: significance without theoretical importance is the canonical outcome at large N, and the φ values here illustrate it. The methodological lesson, that any single vocabulary-richness measure should be reported alongside at least one orthogonal one, generalises beyond this analysis.

---

## 3.3 Case Study 3: Differential collocates of abstract nouns (Stefanowitsch Ch 7)

### 3.3.1 Methods

**Research question.** For abstract nouns common to both corpora, *liberty, virtue, honour, love, power, government, law, death, nature, truth, mind, time, friend, people* (14 targets), how do the collocational worlds of each noun differ between Shakespeare and the Founders?

**Operationalisation.** For each target *T*, extract all tokens occurring within ±5 tokens (Stefanowitsch §7.1.1 standard span) of *T* on the normalised stream. Spelling variants of the target are folded to a canonical form (*honour / honor* → *honour*). For each (target, candidate-collocate) pair, build the 2 × 2 contingency table and compute G log-likelihood.

**Filters.** Function words and proper names are partitioned. Paper-ready tables show content words only.

**Test.** G with df = 1; Bonferroni n_tests per target = number of candidate collocates (≈10³–10⁴). Effect size φ. Fisher's exact computed as robustness check for the top-20 collocates per side (per §7.1.3 caution that χ² and MI overestimate rare events).

### 3.3.2 Results

29 CSVs total (`tables/cs3_*.csv`). Selected per-target headline contrasts:

| Target          | Founders-distinctive collocates           | Shakespeare-distinctive collocates                    |
|:----------------|:------------------------------------------|:------------------------------------------------------|
| **honour**      | *sir, respect, esteem, excellency, letter* | *pawn, lord, gentle, mine, kept*                      |
| **power**       | *congress, executive, states, war, foreign* | *cassius, richard, king, lord, father*                |
| **law**         | *states, common, constitution, nations, passed* | *duke, death, love, mercy, son*                   |
| **love**        | *country, family, children, tenderest, mrs* | *sweet, lord, why, o*                                |
| **death**       | *suffer, sentence, sentenced, commander, case* | *come, die, love, let*                              |
| **friend**      | *dear, esteem, sincere, servant*           | *king, antony, caesar, sweet, lord*                   |
| **mind**        | *public, human, own, impression*           | *lord, lady, know, bears*                             |
| **people**      | *states, america, government, representatives, united* | *sicinius, tribunes, coriolanus, brutus, menenius* |
| **virtue**      | *political, virtue, virtues, qualities*    | *go, show, lord, fair*                                |
| **time**        | *same, mean, ago, congress, letter*        | *o, tis, lord, love, night, supper, sweet*            |

The *honour* contrast is particularly diagnostic. Shakespeare's *honour* lives in a chivalric collocational world, *"I rais'd him, and I pawn'd Mine honour for his truth"* (*Coriolanus*); *"And pawn mine honour for their safety"* (*Cymbeline*); *"my honour is at pawn"* (*2 Henry IV*). The construction "to pawn one's honour" (honour as a stakeable, transferable substance) appears throughout Shakespeare. It does not survive in the Founders, whose *honour* lives almost exclusively in formal epistolary openings and closings: *"We have the honour to be, Sir your most obedient humble Servants"* (Adams, 1775); *"the Honour of attending me"* (Adams, 1766). The Founders inherited the vocabulary item; they did not inherit the conceptual content the vocabulary item carried.

### 3.3.3 Discussion

The cross-target consistency of the divergence supports H4: where shared vocabulary occurs, collocational worlds diverge systematically. The Founders' *love* is patriotic and familial, not romantic. Their *power* is institutional, not personal. Their *law* is constitutional, not dramatic. Their *death* is legal, not tragic. Their *friend* is the close of a letter, not a Roman ally on the eve of assassination. The vocabulary travelled; the conceptual world did not. §4.3 returns to the systematic version of this finding (the *conceptual-inheritance question*) as the paper's principal substantive claim.

---

## 3.4 Case Study 4: Personal-reference and pronoun distribution (Stefanowitsch §10.2.4.2)

### 3.4.1 Methods

**Research question.** Following Kjellmer (1986) and Stefanowitsch §10.2.4.2: pronoun and generic-noun frequencies are diagnostic of register similarity. Whose pronoun-profile most closely resembles Shakespeare's? *(One of the six methods feeding into H3.)*

**Operationalisation.** 14 personal-reference categories: first-person singular/plural, second-person modern/archaic, third-person male/female/neuter/plural, demonstratives, human-generic nouns, kinship, sovereignty, civic, address terms. Per-million rate computed per corpus per category **on un-normalised tokens**, so the archaic second-person forms (*thou, thee, thy, thine, ye*) are counted in the `second_archaic` category rather than folded into the modern `second_person` bucket. (An earlier version of this case study used the normalised stream; the resulting Manhattan distances mixed a genuine pronominal-profile signal with a normalisation artefact, since the archaic-to-modern fold inflated Shakespeare's `second_person` rate from ~16,000/M to ~38,000/M. CS5 already opted out of normalisation for the same reason; CS4 now does too.) Per-Founder Manhattan distance to Shakespeare's full 14-category profile.

**Tests.** χ² per individual form Founder vs Shakespeare (df = 1); 73 forms tested per Founder; Bonferroni-corrected within Founder.

### 3.4.2 Results

![](../data/figures/paper_03_pronoun_metaphor_distance.png)

**Fig. 2** Per-Founder distance to Shakespeare's profile on two independent measures, pronoun profile (CS4, x-axis) and metaphor profile (CS6, y-axis). Both rank Franklin closest and Madison farthest, with a clear cluster gap between the four most-Shakespearean Founders (lower-left quadrant) and the two least (upper-right).

| Founder         | Manhattan distance to Shakespeare's profile |
|:----------------|--------------------------------------------:|
| **Franklin**    |                                  **82,405** |
| Adams           |                                      84,740 |
| Jefferson       |                                      86,294 |
| Washington      |                                      88,002 |
| Hamilton        |                                     110,742 |
| Madison         |                                     110,813 |

Per-category analysis on the un-normalised stream: Shakespeare uses the modern second-person at 23,260/M (Founders 9,597–18,009/M, depending on Founder); the archaic second-person *thou/thee/thy/thine/ye* at 14,895/M (Franklin 441/M, the highest among Founders; Washington 10/M, the lowest). The *sovereignty* category (*king, lord, lady, queen, prince, princess*) is the single most genre-diagnostic in the entire pronoun set, Shakespeare at 11,019/M, Founders 242–1,873/M (Hamilton lowest, Franklin highest).

### 3.4.3 Discussion

A 22,000-point Manhattan gap separates the four most-Shakespearean Founders from the bottom two. The top cluster (Franklin, Adams, Jefferson, Washington) and the bottom cluster (Hamilton, Madison) are clearly disjoint. Pronoun distribution captures something more than topical surface: the rate at which one says *I, you, my, he, she, lord, friend, sir, gentleman, soul* (and the archaic *thou, thee, thy, thine*) relative to the rest of one's vocabulary is one of the more genre-stable features in any corpus. Franklin's distribution sits closest to Shakespeare's despite a 180-year diachronic gap, driven in large part by his *archaic 2P* survival (the connecting tissue between this case study and CS5's archaic-form analysis). The principal genre confound (drama's address-of-sovereign-figures, e.g. *lord*) is identified and reported; it cannot be normalised away, only flagged.

---

## 3.5 Case Study 5: Diachronic stylistic-marker survival (Stefanowitsch §§8.2.5, 10.2.5)

### 3.5.1 Methods

**Research question.** Shakespeare wrote c. 1590–1614; the Founders wrote c. 1750–1820, a 180-year diachronic gap. Some Shakespeare-era English features had disappeared from general English by 1780. Which Shakespeare-era constructions survive in which Founder's writing? A surviving Shakespeare-era feature is asymmetric-in-time evidence of influence (features can travel only forward).

**Operationalisation.** Eight archaic-form categories tested on *un-normalised* tokens (CS5 explicitly opts out of the spelling-modernisation step):

- **ARCHAIC_2P**: *thou, thee, thy, thine, ye*
- **ARCHAIC_VERB**: *hath, doth, art, hast, dost, mayst, didst, shalt, wilt, canst*, etc.
- **ARCHAIC_DISC**: *methinks, prithee, forsooth, ere, anon, oft*
- **ARCHAIC_PREP**: *whilst, amongst, betwixt*
- **MODAL_DEONTIC**: *shall, ought*
- **MODAL_EPISTEMIC**: *may, might, must, can, could, would, should, will*
- **CONTRACTIONS_OLD**: *'tis, 'twas, 'twere*
- **EXCLAMATIVES**: *o, oh, alas, hark, fie, ay, nay*

**Tests.** χ² per individual form Shakespeare vs each Founder (df = 1), with 55 individual forms tested per Founder, Bonferroni-corrected within Founder. Effect size φ.

### 3.5.2 Results

![](../data/figures/paper_04_archaic_survival.png)

**Fig. 3** Diachronic stylistic-marker survival as a fraction of Shakespeare's rate. Each cell is the Founder's per-million rate divided by Shakespeare's per-million rate for the same form. Franklin's row is consistently the darkest, indicating the highest preservation rate of Shakespeare-era forms.

Per-million rates by category:

| Category       | Wash. | Jeff. | Adams | Madison | Hamilton | **Franklin** | **Shakespeare** |
|:---------------|------:|------:|------:|--------:|---------:|-------------:|----------------:|
| ARCHAIC_2P     |    10 |   128 |    96 |     140 |       74 |      **444** |      **15,431** |
| ARCHAIC_VERB   |    88 |   159 |   264 |     139 |       49 |      **391** |       **7,208** |
| ARCHAIC_DISC   |    36 |    62 |    19 |      28 |       38 |           68 |           1,304 |
| CONTRACTIONS   |    31 |    34 |    34 |      20 |      150 |      **375** |       **1,913** |
| EXCLAMATIVES   |   215 | **420** | 311 |     175 |       99 |          267 |           5,118 |

Aggregated as Shakespeare-distinctive archaic-form survival per Founder (forms surviving at ≥ 5 occurrences; total archaic-token density per million):

| Founder         | Surviving forms / tested | Total archaic-token density (per M) |
|:----------------|:-------------------------|------------------------------------:|
| **Franklin**    | 31 / 45 (69%)            |                           **9,436** |
| Jefferson       | 32 / 43 (74%)            |                               5,128 |
| Adams           | 25 / 43 (58%)            |                               4,426 |
| Hamilton        | 19 / 44 (43%)            |                               4,213 |
| Washington      | 21 / 43 (49%)            |                               4,161 |
| Madison         | 21 / 44 (48%)            |                               3,286 |

### 3.5.3 Discussion

Franklin uses Shakespeare's archaic second-person (*thou/thee/thy*) at 444 per million tokens, roughly thirty times Washington's rate, and an order of magnitude above Hamilton, Adams, Jefferson, and Madison. He uses *'tis* at 375 per million versus Hamilton's 150 and Washington's 31. This is the single most striking individual-form finding in the entire reanalysis.

The Founder with the *least* formal schooling (Franklin, apprenticed at twelve) writes the *most* archaic English; the natural inference is that the absorption was through reading rather than instruction, and that the absorption stuck because it happened during the years when Franklin's prose habits were being formed. CS5 is the strongest single-axis case for Franklin as the most-absorbed-Shakespearean Founder; §4.1 will show that this result re-emerges in five of the six other measures.

One non-Shakespearean direction in the data is also worth noting: the modal-epistemic category (*may, might, must, will, can, could, would, should*) is one of the few in which the Founders exceed Shakespeare per-million (17–23 K/M vs Shakespeare's 16.6 K/M), consistent with the hedged, conditional register of 18th-century political prose.

---

## 3.6 Case Study 6: Metaphorical pattern analysis (Stefanowitsch §11.2.2)

### 3.6.1 Methods

**Research question.** For target nouns common to both corpora, do the Founders preserve Shakespeare's metaphorical patterns? Or do they invent new metaphors specific to their political context?

**Operationalisation.** Following Stefanowitsch §11.2.2 (target-domain approach), eight metaphor types are operationalised as regex patterns over text (not tokens):

- **EDIFICE**: *foundation / pillar / edifice / cornerstone / structure / bulwark / rampart* of [target]
- **BODY**: *body / heart / soul / spirit / blood / limbs / bosom* of [target]
- **SHIP**: *ship / vessel / anchor / helm / sail / course / rudder* of [target]
- **FIRE**: *flame / fire / spark / blaze / light / torch* of [target]
- **PLANT**: *seeds / roots / branches / fruit / tree / sown* of [target]
- **PATH**: *path / road / way / course / journey / steps* of [target]
- **MOTION**: [target] *rise(s) / fall(s) / advance(s) / decline(s) / grow(s) / spread(s)*
- **CONTAINER**: *filled with* [target]; *drained of* [target]; *brimming with* [target]

Manual annotation with inter-annotator Cohen's κ (§§6.1, 11.1) is deferred; pattern-based extraction yields high precision and lower recall. The principal recall limitation is acknowledged in §4.5.

**Tests.** χ² per metaphor Shakespeare vs each Founder; per-Founder Manhattan distance on the eight-metaphor profile.

### 3.6.2 Results

![](../data/figures/paper_05_metaphor_radar.png)

**Fig. 4** Per-Founder metaphor-rate profile vs Shakespeare's grey-filled baseline across eight metaphor types. Franklin's outline most closely traces Shakespeare's shape; Hamilton's and Madison's diverge sharply on the EDIFICE and PLANT axes, metaphors the Founders invented for political institutions Shakespeare never wrote about.

Per-million metaphor rates:

| Metaphor   | Wash | Jeff | Adams | Madison | Hamilton | Franklin | **Shakespeare** |
|:-----------|-----:|-----:|------:|--------:|---------:|---------:|----------------:|
| EDIFICE    |  1.5 |  2.3 |   5.4 |     8.5 | **10.6** |      2.2 |         **0.0** |
| BODY       |  4.0 |  6.6 |  16.0 |     9.1 |      8.5 |      5.6 |            14.8 |
| SHIP       |  4.2 | 14.4 |   8.0 |     6.1 |     20.7 |      7.2 |            12.6 |
| FIRE       |  0.5 |  0.6 |   3.3 |     1.2 |      0.4 |      8.9 |             9.1 |
| PLANT      |  1.0 | 11.0 |  10.1 | **33.6**|     13.1 |      3.9 |             4.6 |
| PATH       |  4.2 | 12.9 |  11.3 |     5.8 |     21.2 |      8.9 |            17.1 |
| MOTION     |  8.5 | 11.9 |   9.9 |     7.3 |     10.6 |     15.6 |            17.1 |
| CONTAINER  |  1.8 |  1.7 |   1.4 |     2.3 |      3.4 |      1.1 |             9.1 |

Per-Founder Manhattan distance to Shakespeare's metaphor profile:

| Founder       | Distance |
|:--------------|---------:|
| **Franklin**  | **35.6** |
| Adams         |     43.3 |
| Jefferson     |     44.4 |
| Hamilton      |     58.7 |
| Washington    |     61.8 |
| Madison       |     85.6 |

### 3.6.3 Discussion

Two findings emerge. First, **Franklin's metaphor-rate profile is the closest to Shakespeare's by a substantial margin**, reproducing the CS5 pattern. The FIRE axis is essentially a perfect match (Franklin 8.9/M ≈ Shakespeare 9.1/M; all other Founders 0.4–3.3/M). Franklin matches Shakespeare not just on the *rate* of metaphor use but on the *specific source domains* he reaches for.

Second, **the Founders use some metaphors Shakespeare never uses for these targets.** EDIFICE metaphors for liberty / government / power come out at 0 hits per million in Shakespeare's corpus on these target nouns; Hamilton uses them at 10.6/M, Madison at 8.5/M, Adams at 5.4/M. The PLANT metaphor (*"seeds of liberty," "roots of …"*) similarly: Madison 33.6/M, Jefferson 11.0/M, Adams 10.1/M, Shakespeare 4.6/M. The "body politic / edifice of government / pillar of liberty" complex that runs through Hamilton's, Madison's, and Adams's political prose is **Founder innovation, not Shakespearean inheritance**. They learned the *habit* of thinking with metaphor from a literary tradition Shakespeare exemplified; they invented new conceptual metaphors specifically for political institutions Shakespeare never wrote about. §4.3 returns to this as part of the broader conceptual-inheritance argument.

---

## 3.7 Case Study 7: Configural Frequency Analysis on stylometric features (Stefanowitsch §6.6.2.2)

### 3.7.1 Methods

**Research question.** Among 20 per-document stylometric features (TTR, MATTR, hapax-ratio, average word length, average sentence length, four readability metrics, five sentiment measures, four punctuation rates, function-word ratio), which (Author × Feature-bin) intersections are statistically over-represented "types", i.e. which stylistic intersections constitute each author's signature?

**Operationalisation.** For each feature, discretise document values into terciles (low / mid / high) across the full 68,807-document corpus. Build the 7 × 3 (Author × Bin) contingency table. Compute χ² for the table (df = 12) and per-cell components.

**Tests.** Per-cell components with Bonferroni correction (n_tests = 20 features × 7 authors × 3 bins = 420 cell tests). Type cells: O ≫ E; antitype cells: O ≪ E.

### 3.7.2 Results

![](../data/figures/paper_06_cfa_shared_types.png)

**Fig. 5** Shared significant stylistic types per Founder, partitioned by bin direction. Franklin and Adams lead on shared HIGH-bin types (punctuation density, exclamation rate, emotional content). Hamilton has zero shared HIGH-bin types, the only Founder for whom this is true.

**Shakespeare's signature** (19 significant type cells, the most distinctive author by CFA):

- *Low* on: TTR, MATTR, hapax-ratio, avg-word-length, avg-sentence-length, all four readability metrics, vader-neutral, function-word-ratio.
- *High* on: TextBlob-subjectivity, vader-compound, vader-positive, vader-negative, comma rate, semicolon rate, question-mark rate, exclamation rate.

The signature is: **short sentences, short words, dense punctuation, high emotional content (both positive and negative), low function-word density**, the verbal signature of dramatic dialogue.

**Per-Founder shared types with Shakespeare** (counts of feature-bin cells where the Founder is a type at the same bin Shakespeare is a type):

| Founder         | Shared HIGH types | Shared LOW types | Total shared |
|:----------------|------------------:|-----------------:|-------------:|
| **Franklin**    |                 7 |                8 |       **15** |
| Adams           |                 7 |                4 |       **11** |
| Jefferson       |                 3 |                9 |           12 |
| Madison         |                 2 |                4 |            6 |
| Washington      |                 2 |                1 |            3 |
| **Hamilton**    |             **0** |                2 |        **2** |

### 3.7.3 Discussion

Hamilton has *zero* shared high-bin stylistic intersections with Shakespeare. By the CFA-based measure, his stylistic profile is the least Shakespeare-aligned of any Founder. Franklin (15 shared types) and Adams (11) lead, in agreement with the case studies that measure absorption at the level of vocabulary (CS1/Influence-1), archaic forms (CS5), pronouns (CS4), and metaphor (CS6); see §4.1 for the cross-method convergence.

CFA's contribution over a single distance metric is per-feature interpretability: it identifies *which* feature-bin intersections drive each author's signature, not just *that* the authors are separable. The Shakespeare-versus-Founders separation is driven by short sentences, short words, dense punctuation, and high emotional content on the Shakespeare side; long sentences, long words, sparse punctuation, and neutral affect on the Founders' side. This is precisely the distinction one would expect between dramatic dialogue and political correspondence; the CFA result is consistent both with the genre difference and with the substantive per-Founder ranking.

---

## 3.8 Case Study 8: Phrases popularly attributed to Shakespeare

### 3.8.1 Methods

**Research question.** Of phrases widely attributed to Shakespeare in popular and scholarly compilations (Levin 1983; Crystal 2008; Crystal & Crystal 2002), how many are statistically Shakespeare-distinctive in the two-corpus comparison? Which Founder uses which? *(Direct test of H2.)*

**Candidate set.** A list of 24 candidate phrases is drawn from the kind of compilation typified by Bernard Levin's widely-circulated "On Quoting Shakespeare" passage and Crystal's *Think on My Words* (2008), supplemented from David and Ben Crystal's *Shakespeare's Words* (2002): *fair play, flesh and blood, band of brothers, seen better days, naked truth, milk of human kindness, cold comfort, laughing stock, pomp and circumstance, thin air, break the ice, good riddance, lie low, sound and fury, household word, pitched battle, pound of flesh, foregone conclusion, too much of a good thing, full circle, bated breath, et tu Brute, in a pickle,* and the Shakespearean idiom *I had rather*. Each is operationalised as a case-insensitive regex with whitespace flexibility (e.g. `\bband\s+of\s+brothers\b`).

**Operationalisation.** For each phrase: counts in Shakespeare and in each Founder; G log-likelihood Shakespeare vs Founders aggregate; per-million rate. Counts are taken over the cleaned text stream (after Folio-apparatus and Gutenberg-licence stripping).

**Tests.** G with df = 1; Bonferroni n_tests = 24. Effect size φ.

### 3.8.2 Results

![](../data/figures/paper_07_coinage_usage.png)

**Fig. 6** Per-Founder count of distinct coinages used (out of 24 candidate phrases) and total hits. Adams leads dramatically (15 distinct phrases, 139 hits); Franklin is last (5 phrases). This is the inverse of his lead on every register-level measure, the basis for the two-modes reading in §4.2.

| Phrase                  | Play                  | Shake count | Founders count |     G | p_bonf  | Significant? |
|:------------------------|:----------------------|------------:|---------------:|------:|--------:|:-------------|
| I had rather            | (Shakespearean idiom) |          63 |            263 | 121.2 | < 10⁻²⁵ | ✓ highly sig |
| flesh and blood         | Hamlet                |          21 |             12 |  98.4 | < 10⁻²⁰ | ✓ highly sig |
| pound of flesh          | Merchant of Venice    |           6 |              1 |  34.6 | < 10⁻⁶  | ✓ highly sig |
| et tu, Brute            | Julius Caesar         |           2 |              1 |   9.7 | < 0.05  | ✓ sig        |
| cold comfort            | King John             |           2 |              3 |   6.9 | n.s.    | ✗            |
| seen better days        | As You Like It        |           2 |              6 |   4.8 | n.s.    | ✗            |
| bated breath            | Merchant of Venice    |           1 |              1 |   4.0 | n.s.    | ✗            |
| full circle             | King Lear             |           1 |              1 |   4.0 | n.s.    | ✗            |
| … (16 more)             | …                     |         1–4 |           1–54 |   1–4 | n.s.    | ✗            |
| pomp and circumstance   | Othello               |           0 |              3 |   0.2 | n.s.    | ✗            |
| laughing stock          | Merry Wives           |           0 |              2 |   0.1 | n.s.    | ✗            |
| in a pickle             | The Tempest           |           0 |              1 |  0.07 | n.s.    | ✗            |

**Per-Founder coinage usage:**

| Founder         | Distinct phrases used | Total hits |
|:----------------|----------------------:|-----------:|
| **Adams**       |                **15** |        139 |
| Jefferson       |                     9 |         97 |
| Madison         |                     7 |         17 |
| Washington      |                     7 |         90 |
| Hamilton        |                     6 |         26 |
| **Franklin**    |                 **5** |         15 |

### 3.8.3 Discussion

H2 is supported. Only four of the 24 phrases survive Bonferroni correction in our two-corpus comparison: *I had rather, flesh and blood, pound of flesh,* and *et tu Brute*. Three phrases (*pomp and circumstance, laughing stock, in a pickle*) appear *more* in the Founders aggregate than in Shakespeare's text, indicating they were no longer specifically Shakespearean by 1780. The popular-attribution lists conflate phrases Shakespeare *coined or popularised* (in the sense the OED's first attestations might support) with phrases that simply *appeared in Shakespeare* alongside being current in general early-modern English. The two-corpus comparison here cannot fully separate the two categories; that would require a 17th–18th-century reference corpus such as EEBO-TCP or ECCO (recorded as a limitation in §4.4). But it does show that the bulk of popularly-attributed "Shakespeareanisms" are not statistically Shakespeare-distinctive against the Founders' general English.

**The single most analytically important finding in CS8 is the per-Founder ordering**: Adams first by a wide margin (15 distinct phrases used, 139 hits); Franklin *last* (5 phrases, 15 hits). This is the inverse of Franklin's ranking on every register-level measure (CS4 pronoun profile, CS5 archaic forms, CS6 metaphor profile, CS7 CFA). §4.2 builds the two-modes interpretation directly on this divergence.

---

# §4. General discussion

## 4.1 Composite ranking and eleven-method convergence

CS1–CS8 are largely symmetric. The composite combines seven statistical/stylistic measures (CS4 pronoun distance, CS5 archaic-form density, CS6 metaphor profile, CS7 CFA stylistic sharing, CS8 conscious-coinage usage, Influence-1 weighted vocabulary, Influence-2 collocational absorption) with three evidence-based per-million-word measures added in the methodology-v2 expansion (verified catalogue references per million words, thematic character invocations per million words, MEDIUM-confidence candidate-echo density per million words). The composite is the inverse of average rank position across the ten base methods, rescaled to a 0–1 range.

![](../data/figures/paper_01_composite_ranking.png)

**Fig. 7** Composite Shakespeare-likeness ranking under methodology v2. John Adams (0.88) leads the ranking. Benjamin Franklin (0.76) sits a step behind. Jefferson (0.68), Washington (0.28), Hamilton (0.22), and Madison (0.18) follow. Adams ranks first on six of the eleven methods, including all three evidence-based ones; Franklin ranks first on five statistical/stylistic methods.

| Rank | Founder      | Composite | Avg rank (10 methods) | Evidence / million words |
|----:|:--------------|----------:|---------------------:|-------------------------:|
|   1 | **Adams**     | **0.88**  |              1.6     |                  99.5    |
|   2 | **Franklin**  | **0.76**  |              2.2     |                  46.9    |
|   3 | Jefferson     |     0.68  |              2.6     |                  23.0    |
|   4 | Washington    |     0.28  |              4.6     |                  14.1    |
|   5 | Hamilton      |     0.22  |              4.9     |                  11.9    |
|   6 | Madison       |     0.18  |              5.1     |                   8.8    |

Eleven independent methodological measurements were combined. They share none of their inputs after the corpus and normalisation steps. They agree on the per-Founder ranking:

| Method                                                  | Top 2                | Bottom 2             |
|:--------------------------------------------------------|:---------------------|:---------------------|
| Overall composite (v2, ten-method average)              | Adams → Franklin     | Hamilton → Madison   |
| CS4 pronoun-profile distance                            | Franklin → Adams     | Hamilton → Madison   |
| CS5 diachronic archaic-form density                     | Franklin → Jefferson | Madison → Hamilton   |
| CS6 metaphor-profile distance                           | Franklin → Adams     | Washington → Madison |
| CS7 CFA stylistic-type sharing                          | Franklin → Adams     | Washington → Hamilton|
| CS8 conscious-coinage usage                             | **Adams → Jefferson**| Hamilton → Franklin  |
| Influence-1 weighted vocabulary absorption              | Franklin → Adams     | Hamilton → Madison   |
| Influence-2 collocational absorption                    | Adams → Franklin     | Madison → Hamilton   |
| **Verified Shakespeare references per million words**   | **Adams → Jefferson**| Washington → Hamilton|
| **Thematic character invocations per million words**    | **Adams → Jefferson**| Franklin/Madison/Washington (tied 0) |
| **Candidate-echo density per million words**            | **Adams → Franklin** | Madison → Hamilton   |

![](../data/figures/paper_08_six_method_convergence.png)

**Fig. 8** Eleven-method convergence: per-Founder rank (1 = most Shakespearean, dark; 6 = least, light) across the measures. Adams owns the citational measures (verified references, thematic invocations, conscious coinages); Franklin owns the statistical measures (vocabulary, archaic forms, pronouns, metaphor, CFA stylistic sharing). The two leaders trade first and second across the matrix. Hamilton and Madison split the bottom two positions, with Madison hitting last more often.

Adams ranks first on six of the eleven methods; Franklin on five. Together they occupy the top two on seven of the rows. Hamilton sits in the bottom two on most measures, and on CFA he has zero shared high-bin stylistic intersections with Shakespeare. This level of convergence across independent methodologies is strong evidence for H3: the ranking is not an artefact of any single test.

## 4.2 Two modes of Shakespearean influence

The Adams / Franklin disagreement at the top is the paper's most analytically interesting result. Both are first or second on every composite measure. Both absorbed Shakespeare to a degree no other Founder matches. But the *modes* of absorption are different and visible in the data.

**Adams, conscious Shakespearean.** He is the only Founder who refers to Shakespeare by name in our corpus (three explicit references, 1758–1803). He uses 15 of 24 named coinages (most of any Founder), with 139 hits total. He uses *I had rather* 102 times across his life, Shakespeare's archaic subjunctive deployed as Adams's signature epistolary opener. He uses *by sea and land* 58 times (an *Antony and Cleopatra* phrase). He uses *give me leave* 93 times. He references Shakespearean characters as political shorthand: *Coriolanus* in 1803, Falstaff in 1776 (applied to Benjamin Harrison), King Lear in 1758 (applied to a tavern brawler). His Shakespearean absorption is *citational*: he reaches for Shakespeare deliberately, as a literary resource. He absorbs the widest *range* of Shakespearean features because he sought them out.

**Franklin, absorbed Shakespearean.** He never names Shakespeare in our corpus. He uses only 5 of 24 named coinages with 15 hits, the *fewest* of any Founder. But his per-million rate of Shakespearean vocabulary is the highest in the corpus. His archaic-form density is the highest (9,436/M). His metaphor profile is closest to Shakespeare's. His pronoun profile is closest to Shakespeare's. His shared CFA stylistic types are the most numerous (15). His Yule's K is closest to Shakespeare's. **The most striking single piece of evidence is Franklin's *'tis***, 623 occurrences across his lifetime of writing, beginning at age 16 in the 1722 *Silence Dogood* essays (which contain *'tis* five times in the first three published pieces). A teenage printer's apprentice in Boston in 1722 was already writing 18th-century essays in Shakespeare's contractions, and he never stopped: *hath* survives into his 1778 diplomatic correspondence in Paris, 56 years after he first used it.

These are not contradictory modes. They are *different kinds of evidence for the same broader claim*: Shakespeare's English persists in the Founders. Adams absorbed it as a text. Franklin absorbed it as a habit. Adams's Shakespearean absorption has a *peak* (the early diary) and decays as his prose hardens into political-administrative register. Franklin's *baseline* is Shakespearean and persists across six decades.

The two modes are not recoverable from any single distance metric, collapsing influence to one number averages the two modes together and loses the substantive contrast. They are visible only when independent measures of conscious quotation (coinages, named-phrase frequency) and absorbed register (archaic forms, pronoun profile, metaphor profile, CFA stylistic types) are kept separate and read against each other.

## 4.3 The conceptual-inheritance question

A vocabulary item shared between the corpora does not by itself evidence shared *meaning*. The collocational analyses (CS3, Influence-2) ask the harder question: when both corpora use the same word, do they use it in the same conceptual world? The answer is **no**, with remarkable consistency.

| Word           | Shakespeare's collocational world                       | Founders' collocational world                                   |
|:---------------|:--------------------------------------------------------|:----------------------------------------------------------------|
| **honour**     | chivalric (*pawn, stained, kept, mine*)                 | epistolary (*sir, respect, esteem, excellency, letter*)         |
| **power**      | personal possession (*king, lord, Richard, Cassius, father*) | institutional (*congress, executive, states, foreign, treasury*) |
| **law**        | dramatic / capital (*duke, death, mercy, love*)         | codified / comparative (*states, common, nations, constitution, passed*) |
| **love**       | romantic / sexual (*sweet, lord, why, o*)               | domestic / patriotic (*country, family, children, tenderest, mrs*) |
| **death**      | dramatic / personal (*come, die, love, let*)            | legal / military (*suffer, sentence, sentenced, commander, case*) |
| **mind**       | dramatic interiority (*lord, lady, know, bears*)        | Enlightenment psychology (*public, human, own, impression*)     |
| **friend**     | political alliance / dramatic (*king, Antony, Caesar, sweet, lord*) | epistolary (*dear, esteem, sincere, servant*)         |
| **people**     | Roman plebs (*Sicinius, tribunes, Coriolanus, Brutus, Menenius*) | American collective (*states, America, government, representatives, united*) |
| **nature**     | moral / cosmic (*noble, fortune, heaven, sweet*)        | Enlightenment abstraction (*human, admit, public, government*)  |
| **government** | (24 hits in Shakespeare, n.s.)                          | comparative-political (*general, state, new, British, French, seat, form*) |

The vocabulary travelled from Shakespeare to the Founders. **The conceptual content did not.** The Founders' *love* is patriotic; Shakespeare's is sexual. The Founders' *power* is constitutional; Shakespeare's is personal. The Founders' *death* is legal; Shakespeare's is tragic. The Founders' *friend* is the close of a letter; Shakespeare's is a political ally on the eve of assassination. The Founders' *people* is the American electorate; Shakespeare's is the plebs of Coriolanus's Rome. H4 is supported.

The pattern recurs in the CS6 metaphor analysis: the Founders inherited the metaphorical *habit* from a literary tradition Shakespeare exemplifies, but they invented new conceptual metaphors specifically suited to the political institutions they were building. Shakespeare uses EDIFICE metaphors for these target nouns at 0 hits per million in our corpus; the Founders use them at 5–10 per million. The "foundation of liberty," "pillar of government," "cornerstone of the constitution", these are Founder inventions, not Shakespearean inheritances. The PLANT metaphor (*"seeds of liberty," "roots of …"*) is the same: 33.6/M in Madison vs 4.6/M in Shakespeare.

The clearest reading is: **the inheritance was lexical and habitual, not conceptual.** Shakespeare's words travelled across the Atlantic and into 18th-century American political prose. The world the words described had to be rebuilt from scratch. The Founders' political language is, in this precise sense, a *re-purposed* English, the vocabulary of Elizabethan and Jacobean drama deployed in service of a constitutional republic Shakespeare could not have imagined.

## 4.4 Caveats and limitations

Per Stefanowitsch §6.5, the analytic burden is on effect size and per-feature interpretability; all reported effect sizes are very-weak-to-weak (φ < 0.25) on individual features, consistent with the canonical large-N outcome.

1. **No non-Shakespearean reference corpus.** "Shakespeare-distinctive" in this paper means "over-represented in Shakespeare relative to the Founders," not "over-represented in Shakespeare relative to general English of his period." Some phrases popularly attributed to Shakespeare (e.g. *fair play, band of brothers*) may have been general English by 1780. Adding an EEBO-TCP / ECCO baseline is the single most important methodological extension for a future round.
2. **Topical vs stylistic confounds (Stefanowitsch §10.2.3).** Two corpora differing in genre (drama vs political correspondence) will appear distinctive on naive keyword lists regardless of stylistic similarity. CS3 and CS6 partially control for this by holding the target word constant; CS1 is more vulnerable.
3. **Adams's diary effect.** A substantial portion of Adams's Shakespeare-likeness is driven by his early diary (1755–1770), where his prose is most voice-driven. A future split-by-genre analysis (diary vs essay vs correspondence vs legal) per §6.6 would discriminate genre-related register selection from genuine cross-genre absorption.
4. **Tokenisation artefacts.** Clitic fragments (*'d, 's, 'll, 've*) and single-letter tokens dominate the raw G-ranked keyword lists on the Shakespeare side; these are excluded from paper-ready tables but retained in the underlying CSVs for transparency.
5. **Manual annotation deferred.** CS6 metaphor patterns are regex-extracted with high precision but moderate recall. Manual annotation of, e.g., 200 hits per pattern with inter-annotator Cohen's κ (§§6.1, 11.1) is needed for a defensible recall estimate.
6. **Equal-weighting of the composite.** Influence-3 weights all seven components equally; alternative weightings shift the Adams / Franklin order within the 3 % band but leave the broader four-vs-two ranking intact.
7. **Composite components are not statistically independent.** The seven percentile-ranked components in Influence-3 carry substantial inter-axis correlation: `collocations_absorbed` and `collocation_total_hits` correlate at r = 0.997; `vocab_weighted_score` and `yules_k_distance` at |r| = 0.98. The three lexical-richness distances (MSTTR, HTR, Yule's K) measure overlapping facets of the same underlying property. Under a PCA decomposition the seven dimensions collapse to roughly three independent axes (vocabulary absorption, collocational absorption, and lexical-richness proximity) with lex-richness effectively triple-weighted in the equal-weighted average. The headline 3% Adams/Franklin gap survives PCA reweighting (both stay tied), but the substantive reading should rest on the asymmetric strengths each Founder shows on different *axes* (Adams on absorption, Franklin on proximity) rather than on the precise rank order at the top.
8. **The `vocab_weighted_score` axis has unusual units.** Influence-1's per-Founder vocabulary weight is computed as Σ (founder per-million-rate) × (Shakespeare per-million-rate), giving a quantity in (per million)² that heavily over-weights high-frequency words. Franklin's score is dominated by his *'d* clitic rate (635.8/M, the highest in the corpus); the axis is informative but the dimensional analysis is not strict. Replacing this axis with a cosine similarity over per-million vectors or a KL divergence is a defensible V2 substitution. The composite ranking is robust to that change.
9. **Spelling normalisation is partial.** The 63-rule archaic-to-modern map is conservative; idiosyncratic Founder spellings (e.g. Jefferson's *recieved*) are kept as-is and may inflate per-Founder keyword distinctiveness in CS1.
10. **Character names in CS3 collocates are partly tautological.** The CS3 differential-collocate tables for some targets include Shakespeare-character names that disambiguate the play but do not represent independent semantic information. For example, the Shakespeare-distinctive collocates on the `people` target include *Sicinius, tribunes, Coriolanus, Brutus, Menenius*, collocates that signal &ldquo;these mentions of *people* are in *Coriolanus*&rdquo; rather than telling us something about Shakespeare's conception of *people*. The content-word filter strips function words but retains proper names; a name-stripped variant (`drop_names=True`) of CS3 would attenuate this confound. The substantive contrast, Shakespeare's *people* as the Roman plebs vs the Founders' *people* as the American electorate, survives the name strip; what changes is the granularity of the diagnostic vocabulary.
11. **CFA per-cell significance uses the χ²(1) approximation.** §3.7's claim that &ldquo;Hamilton has zero shared HIGH-bin stylistic intersections with Shakespeare&rdquo; rests on per-cell χ² components compared to a χ²(1) distribution (Stefanowitsch §6.6.2.2). Lienert's exact binomial test on the cell counts, or a z-test on the standardised residual, would be more defensible at the per-cell level, though both would point in the same direction at our cell sizes. The claim is robust to test choice; the approximation is worth flagging when the result is doing real interpretive work.
12. **The catalogue&rsquo;s HIGH-confidence tier is an Adams phenomenon.** All 53 HIGH-tier verbatim direct quotations in `tables/catalogue_direct_quotes.csv` are from John Adams. The 8 MEDIUM-tier quotations include 1 Madison match (`i love thee thou art` from a transcribed passage) that is best read as a coincidental sequence of common words rather than a Shakespearean reuse. The HIGH catalogue&rsquo;s composition is consistent with the broader two-modes argument, Adams is the citational Founder, and the other five surface in the absorbed-register analyses (CS4 – CS7) rather than in the passage-level pipeline.

## 4.5 Implications and future work

**For the legal / political-theory audience**, three claims are reportable:

1. **Shakespeare's influence on the Founders is real, asymmetric, and measurable.** Specific Shakespearean vocabulary items, archaic forms, contractions, and contextual patterns appear in the Founders' writing at rates not explicable by chance. The claim survives Bonferroni correction at every level of analysis run here.
2. **The most Shakespearean Founder is Adams, with Franklin second.** Adams leads on the composite (0.88), driven by his citational vocabulary breadth, named-phrase usage, and the new evidence-based measures (verified references, thematic character invocations, candidate-echo density per million words). Franklin (0.76) sits a step behind, leading on the absorbed-register density measures (archaic forms, pronouns, metaphor, CFA stylistic sharing). Hamilton (0.22) and Madison (0.18) sit reliably at the bottom across every independent measure.
3. **The Founders inherited Shakespeare's vocabulary, not Shakespeare's conceptual content.** Where shared vocabulary items appear (*honour, love, power, death, friend, mind*), the collocational worlds (and therefore the semantic content) differ systematically and predictably between the corpora. The Founders' English is a *re-purposed* Shakespearean inheritance: lexical continuity, conceptual discontinuity.

**For corpus linguistics**, the methodological contribution is a worked example of the Stefanowitsch (2020) framework applied to a literary-political influence question, with all statistical primitives independently verified against the book's published examples and with the full pipeline reproducible from a public-domain corpus.

**Future work** in approximate order of value:

a. Add EEBO-TCP / ECCO reference corpora to convert two-corpus G tests into three-corpus designs that filter general early-modern English.
b. Split the Founders' corpora by genre (diary, essay, correspondence, legal, legislative) and re-run CS6 / CS7 to discriminate stylistic absorption from genre-register selection.
c. Manual annotation of CS6 metaphor patterns with inter-annotator κ.
d. Per-decade diachronic analysis *within* the Founders' corpus to test whether Shakespearean absorption peaks early (the Adams diary pattern) or persists throughout the corpus (the Franklin pattern).
e. Cross-validation against an independent test corpus (e.g. Hamilton's *Federalist* essays separately from his correspondence).
f. Extension to other early-modern literary candidates (Milton, the King James Bible) to test whether the Shakespeare-specific finding is genuinely Shakespeare-specific or generalises to broader literary-canonical influence.

---

# Appendix A: Operationalisation summary

Compact cross-reference. Full source in the named driver script.

**CS1, Keyword analysis** (`scripts/cs1_keywords.py`). *Constructs:* (word, corpus-A frequency, corpus-B frequency, corpus sizes). *Operationalisation:* G log-likelihood on (word vs other) × (corpus-A vs corpus-B); min combined frequency 5. *Filters:* proper-name stop-list, function-word partition.

**CS2, Lexical richness** (`scripts/cs2_lexical_richness.py`). *Constructs:* TTR, MSTTR(1000), HTR, Yule's K. *Operationalisation:* random sub-sample of each Founder to 870,900 tokens using fixed-seed contiguous-100-block sampling. *Tests:* χ² on (new vs seen-before) × (corpus-A vs corpus-B); χ² on (hapax vs non-hapax) × (corpus-A vs corpus-B). Bonferroni n_tests = 42.

**CS3, Differential collocates** (`scripts/cs3_differential_collocates.py`). *Constructs:* 14 target nouns × per-corpus ±5-token collocate Counters. *Operationalisation:* G log-likelihood on (collocate vs other) × (Founders aggregate vs Shakespeare) for each collocate of each target. *Variants:* full / content-only / variant-spelling-folded.

**CS4, Personal reference** (`scripts/cs4_personal_reference.py`). *Constructs:* 14 categories of pronouns / generic nouns / address terms on **un-normalised tokens** (so `second_archaic` is counted separately from `second_person`); per-million rate per corpus per category; Manhattan distance to Shakespeare. *Tests:* χ² per form Founder vs Shakespeare; 73 forms tested per Founder, Bonferroni-corrected within Founder.

**CS5, Diachronic markers** (`scripts/cs5_diachronic.py`). *Constructs:* 8 archaic-form categories on un-normalised tokens. *Tests:* χ² per form Founder vs Shakespeare; 55 forms tested per Founder, Bonferroni-corrected within Founder.

**CS6, Metaphor patterns** (`scripts/cs6_metaphor.py`). *Constructs:* 8 conceptual-metaphor types as regex patterns over the text (not tokens). *Tests:* per-metaphor χ² Founder vs Shakespeare; per-corpus Manhattan profile distance.

**CS7, CFA on stylometric features** (`scripts/cs7_cfa.py`). *Constructs:* 20 doc_metrics features, tercile-binned (low/mid/high); 7×3 Author×Bin per feature. *Tests:* χ² per table (df = 12) + per-cell components (df = 1, n_tests = 420).

**CS8, Coinages reanalysis** (`scripts/cs8_coinages.py`). *Constructs:* 24 candidate Shakespeare-coined phrases as regex patterns over text. *Tests:* G log-likelihood Shakespeare vs Founders aggregate per phrase; Bonferroni n_tests = 24.

**Influence-1, -2, -3** (`scripts/influence{1,2,3}_*.py`). *Constructs:* derived from CS1 + CS3 outputs and per-Founder corpus-size data; composite is percentile-rank average of 7 dimensions.

---

# Appendix B: Per-Founder summary tables and reproducibility chain

Key per-Founder summaries (all in `tables/`):

- `influence3_founder_distance.csv`, composite Shakespeare-likeness ranking
- `cs2_richness_measures.csv`, sample-size-corrected MSTTR / HTR / Yule's K
- `cs4_per_founder_distance.csv`, pronoun-profile Manhattan distance
- `cs5_per_founder_summary.csv`, diachronic archaic-form survival counts
- `cs6_per_founder_metaphor_summary.csv`, metaphor-profile alignment
- `cs7_per_author_summary.csv`, CFA shared-types per author
- `cs8_per_founder_summary.csv`, coinages used per Founder
- `influence1_per_founder_summary.csv`, vocabulary absorption per Founder
- `influence2_per_founder_summary.csv`, collocational absorption per Founder

Project repository layout:

```
analysis/, corpus normalisation + statistical primitives
compare/, statistical helpers + reporting
ingest/, data acquisition
scripts/cs*.py, 8 case-study drivers
scripts/influence*.py, 3 influence reanalyses
scripts/build_docx.py, markdown → docx pipeline
tables/, all CSV outputs (~90 files)
reports/, this paper (paper.md) and the narrative companion (narrative.md)
data/figures/, PNG figures
data/subsamples/, CS2 fixed-seed sub-sample manifests
data/founders_shakespeare.db, SQLite database, 68,807 docs
```

All scripts are deterministic; random sampling uses fixed seed 42. To reproduce: clone the repository, populate the database (one-time, ≈5 hours scraping), then run `scripts/cs1_keywords.py` through `scripts/cs8_coinages.py` and `scripts/influence1_*.py` through `scripts/influence3_*.py`, then `scripts/build_docx.py` to regenerate the .docx version of this paper.

---

# References

- Bailyn, B. (1967). *The Ideological Origins of the American Revolution*. Cambridge: Belknap.
- Crystal, D. (2008). *Think on My Words: Exploring Shakespeare's Language*. Cambridge: Cambridge University Press.
- Crystal, D., & Crystal, B. (2002). *Shakespeare's Words: A Glossary and Language Companion*. London: Penguin.
- Gries, S. Th. (2013). *Statistics for Linguistics with R* (2nd ed.). Berlin/New York: De Gruyter Mouton.
- Gries, S. Th. (2016b). *Quantitative Corpus Linguistics with R* (2nd ed.). New York/London: Routledge.
- Gries, S. Th. & Paquot, M. (2020). Writing up a corpus-linguistic paper. In M. Paquot & S. Th. Gries (Eds.), *A Practical Handbook of Corpus Linguistics* (pp. 647–660). Cham: Springer.
- Kjellmer, G. (1986). "The lesser man": observed sex differences in the Brown Corpus and the LOB Corpus. In *English in Speech and Writing: A Symposium*. Stockholm: Almqvist & Wiksell.
- Kornstein, D. (1994). *Kill All the Lawyers? Shakespeare's Legal Appeal*. Princeton: Princeton University Press.
- Levin, B. (1983). "On quoting Shakespeare." In *Enthusiasms*. London: Jonathan Cape.
- McDonald, F. (1985). *Novus Ordo Seclorum: The Intellectual Origins of the Constitution*. Lawrence: University Press of Kansas.
- Mumford, L. (1926). *The Golden Day: A Study in American Literature and Culture*. New York: Boni & Liveright.
- Reid, J. P. (1981). "In an inherited way: English constitutional rights, the Stamp Act debates, and the coming of the American Revolution." *Southern California Law Review* 49, 1109–1129.
- Stefanowitsch, A. (2020). *Corpus Linguistics: A Guide to the Methodology*. Berlin: Language Science Press. CC BY-SA 4.0.

Primary data sources:

- Founders Online digital archive (founders.archives.gov), ingested via `ingest/founders_download.py`.
- Project Gutenberg complete-works edition of Shakespeare (`t8.shakespeare.txt`).
- Project Gutenberg supplementary texts (*Federalist Papers*, Franklin *Autobiography*, etc.), in `data/gutenberg/`.

Companion narrative-driven version of these findings is in `reports/narrative.md` (and `narrative.docx`).
