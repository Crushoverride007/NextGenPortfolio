import KliperCover from './KliperCover';
import HomeLabCover from './HomeLabCover';
import AzureCover from './AzureCover';
import ElasticCover from './ElasticCover';
import PentestCover from './PentestCover';
import ThmCover from './ThmCover';
import IacCover from './IacCover';
import CicdCover from './CicdCover';

/*
 * Every featured cover is a native canvas, keyed by the `interactive`
 * frontmatter field. All render inside the same 1400x875 CoverFrame, so the
 * eight cards share one aspect ratio, radius and shadow. Two of them (iac,
 * cicd) carry click state; the rest are static compositions.
 */
const covers = {
  kliper: KliperCover,
  homelab: HomeLabCover,
  azure: AzureCover,
  elastic: ElasticCover,
  pentest: PentestCover,
  thm: ThmCover,
  iac: IacCover,
  cicd: CicdCover,
};

export default covers;
