# LPS Saga History Roadmap (3-file plan)

## Goal
- `content/docs/imm-classic/lps-saga`의 3개 파일을 LPS 역사 축으로 재작성하기 위한 뼈대.
- `content/docs/imm-classic/1998-tlr4-lps-beutler-1998-science.mdx`는 고정 기준 문서로 유지.
- 즉, lps-saga 3편은 1998 TLR4 문서로 자연스럽게 이어지는 "프리퀄" 역할을 수행.

## Recommended 3-file structure

1. `1892-pfeiffer-endotoxin-dead-bacteria.mdx`
- Focus: endotoxin 개념의 출발과 pyrogen 문제의 정식화
- order: `1892`
- section: `lps-saga`
- Candidate history flow:
  - 1892 Pfeiffer: 세균 사멸과 독성(내독소 개념의 기원)
  - 1925 Seibert: pyrogen 검출/통제의 필요성
  - 1942 Freund: 면역증강(adjuvant) 맥락에서 세균 성분의 의미 확장
  - 1952/1954 Westphal-Luederitz: LPS 화학적 정체 확립
  - End hook: "그러나 숙주가 LPS를 어떤 수용체로 인식하는지는 미해결"

2. `1925-pyrogen-discovery-seibert-endotoxin.mdx`
- Focus: 화학/제제학 관점에서 LPS가 "독성물질"에서 "면역도구 후보"로 이동한 과정
- order: `1925`
- section: `lps-saga`
- Candidate history flow:
  - pyrogen 표준화 이슈(주사제 안전성 역사)
  - lipid A 독성 핵심으로 수렴한 1960s-70s 연구 축
  - Ribi 계열 detoxified endotoxin -> MPLA로 이어지는 adjuvant 번역
  - End hook: "분자 실체는 보이지만, 수용체는 여전히 보이지 않음"

3. `1942-freund-adjuvant-origin-1942.mdx`
- Focus: 수용체 후보 탐색의 혼선에서 TLR4 발견 직전까지의 빌드업
- order: `1942`
- section: `lps-saga`
- Candidate history flow:
  - 1990 CD14 (LPS recognition co-receptor 축)
  - 1998 TLR4 (Poltorak/Beutler)는 별도 고정 문서로 연결
  - 1999-2003 MD-2, MyD88/TRIF 이중경로 정리
  - 2007 MPLA의 TRIF-biased 개념
  - 2013 Eritoran 실패 + caspase-11(non-canonical)로 재해석
  - End hook: `1998-tlr4-lps-beutler-1998-science` 링크로 마무리

## Papers to include (timeline shortlist)

## Core classics (strongly recommended)
- 1892, Pfeiffer: cholera vibrio 관련 내독소 개념의 출발점
- 1925, Seibert: pyrogen 문제를 실험/제제 안전 관점으로 제도화
- 1952/1954, Westphal and Luderitz: LPS 분리/정제와 구조적 실체화
- 1998, Poltorak et al., Science: TLR4 유전학적 입증

## Bridge papers (if adding detail)
- 1990, Wright et al.: CD14와 LPS 인식 연결
- 1999, Hoshino et al.: TLR4 결손 모델 기능 검증
- 1999/2000, Shimazu et al.: MD-2 필수성
- 1999-2003, Kawai/Akira 계열: MyD88/TRIF 경로 분리
- 2009, Park et al., Nature: TLR4-MD-2-LPS 구조
- 2013, Opal et al., JAMA: Eritoran 패혈증 임상 실패
- 2013, Kayagaki et al., Nature: caspase-11 기반 non-canonical LPS sensing

## Mapping to existing repo docs
- Existing:
  - `content/docs/imm-classic/lps-saga/1892-pfeiffer-endotoxin-dead-bacteria.mdx`
  - `content/docs/imm-classic/lps-saga/1925-pyrogen-discovery-seibert-endotoxin.mdx`
  - `content/docs/imm-classic/lps-saga/1942-freund-adjuvant-origin-1942.mdx`
  - `content/docs/imm-classic/1954-westphal-luederitz-lps-1952.mdx`
  - `content/docs/imm-classic/1998-tlr4-lps-beutler-1998-science.mdx`
  - `content/docs/immunology/eritoran-tlr4-caspase11-sepsis-classic.mdx`
  - `content/docs/daily-immunity/mpla-controlled-lps-immunity.mdx`

## Editorial rules (for consistency)
- title prefix: `YYYY년 - ...`
- slug는 변경 최소화(기존 slug 유지 우선)
- section 통일: `lps-saga`
- `order`는 실제 연도 사용 (예: 1892, 1925, 1942)
- 각 글 마지막에 다음 글/이전 글 상호 링크 추가
 - lps-saga 3편의 마지막 문단에서 `1998-tlr4-lps-beutler-1998-science`로 명시적 연결

## Note
- `content/docs/imm-classic/1998-tlr4-lps-beutler-1998-science.mdx`는 현재 상태를 유지.
- 섹션 이동 없이도, lps-saga 문서의 내부 링크/서사 연결로 충분히 하나의 흐름을 만들 수 있음.
