// 가이드 문서 콘텐츠 모델 — 문서는 데이터로 정의하고 렌더러가 그린다.
// 새 문서 추가 = DocPage 하나 추가. 레이아웃·내비·검색·이전/다음은 자동.
import { IconName } from '../kit/Icon';

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'callout'; icon?: IconName; title: string; body?: string; items?: string[]; tone?: 'orange' | 'blue' | 'green' }
  | { t: 'steps'; items: { title: string; body: string }[] }
  | { t: 'cards'; cols?: 2 | 3 | 4; items: { icon: IconName; title: string; body: string }[] }
  | { t: 'flow'; items: { label: string; sub?: string }[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'quote'; text: string; cite?: string }
  | { t: 'stats'; items: { k: string; v: string; d?: string }[] }
  | { t: 'shot'; label: string; tone?: 'warm' | 'cool' | 'neutral'; h?: number }
  | { t: 'img'; src: string; alt?: string; caption?: string };

export interface DocPage {
  id: string;
  title: string;
  /** 페이지 상단 리드 문단 */
  summary: string;
  blocks: Block[];
}

export interface DocSection {
  id: string;
  /** 사이드바 그룹 라벨 (대상/용도) */
  label: string;
  icon: IconName;
  /** 대상 소개 한 줄 (홈 카드 등에서 사용) */
  desc: string;
  pages: DocPage[];
}
