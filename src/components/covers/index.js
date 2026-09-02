import IacCover from './IacCover';
import CicdCover from './CicdCover';

/*
 * Interactive featured covers, keyed by the `interactive` frontmatter field.
 * A featured entry sets either `cover` (a static image) or `interactive` (one
 * of these keys); the Featured section renders whichever is present into the
 * same unified 1400x875 slot.
 */
const covers = {
  iac: IacCover,
  cicd: CicdCover,
};

export default covers;
