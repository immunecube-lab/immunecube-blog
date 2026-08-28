# 문체·서식 패턴 감사 (repetitive / artificial phrasing audit)

- 생성: 2026-08-27
- **이 작업은 "AI가 썼는지" 판별이 아니다.** 반복적이고 인공적으로 느껴지는 문체·서식 패턴을 찾아 기록한다. 작성 주체를 단정하지 않는다.
- 담당: 스캔·기록은 Claude, 수정 판단·실행은 사용자.
- **규칙: 원본 `.mdx`는 수정하지 않는다. 이 파일만 갱신한다.**
- 범위: `content/docs`, `content/stories`, `content/posts` 중 `published: true`.
- 과학적 정확성 / 이해관계 / 제품 홍보 가능성은 본 감사와 분리한다. 발견 시 아래 `## 별도 과학·COI 검토 필요`에만 기록하고, 본 표에 섞지 않는다. 과학적으로 탄탄하다/정확하다는 평가도 팩트체크 없이 하지 않는다.
- "원문" 칸은 실제 원문 그대로 + 정확한 행 번호. 문장을 합치거나 `…`로 재구성한 것은 직접 인용으로 표시하지 않는다.
- **`slug` ≠ 파일명은 의도된 것이다(사용자가 관리 편의를 위해 파일명만 조정). 수정 대상이 아니다.** 각 섹션의 `A1 — slug ≠ 파일명` 항목은 무시하되, `RelatedPosts`가 실제 `slug`가 아닌 파일명 형태를 참조해 링크가 깨지는 경우와 `posts=`/`slugs=` 같은 prop 오류는 별개의 실제 결함으로 유지한다.

## 사용자 검토·대응 — 2026-08-28

감사 항목을 실제 원문과 대조했다. 아래 수정 이후 이 문서에 기록된 기존 행 번호는 일부 달라질 수 있다.

### 수용·반영

- `metabolism-immunity/nrf2-keap1-antioxidant-addiction-cancer.mdx`: 연속된 마무리 절 4개를 단일 `## 정리` 절로 통합했다.
- `nutrition-supplement`: A1–A5의 오탈자, 깨진 표, 편집 잔여 문장, 매달린 부제, 뒤바뀐 결론 위치를 수정했다.
- `new`: A1–A6의 비문, 표 헤더·번역, 매달린 부제와 전환 문장을 수정했다.
- `medicine-history`: A1–A8 중 닫히지 않은 마크다운, 부제 구조, frontmatter 날짜, 고유명사·개수·오탈자, 인라인 마크업 간격, 추적 URL을 수정했다.
- `vaccine-society`: A1·A2의 깨진 문자열·역사 오류와 A3의 실제 매달린 부제, A4의 frontmatter·접근성·링크 오류, A5의 음역 불일치를 수정했다.
- `inflammation-resolution-nutrients-foods.mdx`: 잘못된 E/D-계열 "류코트리엔" 표를 E/D-계열 리졸빈·프로텍틴·마레신 표로 교체하고, 아라키돈산 유래 리폭인을 포함해 오메가-3/오메가-6의 단순 이분법을 바로잡았다. 참고문헌도 보강했다.

### 일부 수용 또는 보류

- B 항목의 볼드, 구분선, 교육용 비유, "A가 아니라 B" 표현은 대부분 취향과 편집 정책의 영역이다. 반복이 독해나 구조를 실제로 해치는 경우가 아니면 일괄 수정하지 않았다.
- `2016-adrenal-fatigue-scientific-critique.mdx`와 `adrenal-fatigue-hpa-axis-chronic-fatigue.mdx`는 **병합하지 않고 유지**한다. 전자는 Cadegiani·Kater 논문을 중심으로 부신피로 개념을 검토하는 논문 설명글이고, 후자는 부신피로 담론을 비판하며 피로 증상을 신경·면역·내분비 관점에서 해석하는 비판 글이다. 후속 편집에서는 각 글의 도입부와 결론에서 이 역할 차이를 더 선명하게 드러낸다.
- `clinical-judgment-vs-statistical-model.mdx`의 과학·통계 논의와 민주주의에 관한 연결은 저자의 사회·정치 철학을 담은 에세이적 논평으로 **유지**한다. 과학적 사실 또는 보편적 결론처럼 제시하지 않는다는 전제에서, 별도 글로 분리하거나 완화하지 않는다.
- `acupuncture-trials-methodology-bias.mdx`의 문장별 강제 줄바꿈은 렌더링 오류가 아니라 편집 스타일에 가까워 일괄 제거하지 않았다. `scid-bubble-boy-origins.mdx`의 참고문헌은 근거를 새로 선정해야 하므로 보류했다.
- `jenner-cowpox-vaccinia-origin.mdx`의 `### 핵심 요약`과 `독감과 백신` section은 각각 정상적인 계층·의도된 하위 분류여서 수정하지 않았다. 나머지 C 항목은 별도 과학·COI·서지 검토 대상으로 유지한다.
- `gut-immunity-environmental-enrichment.mdx`의 뮤신 표는 렌더링 결함만 복구했다. 빈 `대상` 셀과 일부 화합물명은 원자료 확인 전까지 임의로 보완하지 않았다.
- C 항목 중 단일 출처 의존, 제품 이해관계, 비표준 화합물명, 임상 주장 등은 별도의 과학·COI 감사가 필요하므로 이번 문체 수정 범위에서는 유지했다.

## 심각도 기준 (엄격 적용)

**명확**
- 실제 문장·마크다운 오류
- 다른 글과 거의 동일한 문단의 재사용
- 한 글 전체를 지배하는 확장 비유
- 같은 마무리·문구가 한 글 안에서 또는 여러 글에서 반복
- 독해를 실제로 방해하는 시행형 줄바꿈

**경계**
- 수사적 질문 1~2회
- 일반적인 교육용 비유
- 정상적인 굵은 강조
- `---` 구분선
- "A가 아니라 B", "~에 가깝다" 등이 한두 번 사용

`---`·볼드·질문형 소제목이 있다는 이유만으로 "명확" 판정하지 않는다.

## 유형 코드

A 상투적 은유 · B 억지 비유 · C 공허한 연결어 · D 3항 병렬 강박 · E 공허한 강조어 ·
F "A가 아니라 B" / "질문을 바꿔야 한다" 리프레임 · G 용어 병기 후 즉시 재설명 ·
H 메타 서술 · I 문단 끝 요약 습관 · J 수사적 질문 · K 소제목이 완결 문장 아님 ·
L 과잉 완충 · M AI 특유 어휘("~의 여정", "핵심은 바로") · N 과잉 볼드 ·
O 서식(절마다 `---`, 시행형 줄바꿈, 느슨한 목록) · P 아포리즘 클로저 · Q 의인화("몸이/뇌가/생명이 선택했다")

---

# docs / metabolism-immunity — 완료 2026-08-27 (재검사 반영)

- 검토 파일: 16
- **명확: 1** · 경계: 파일별 표 생략(섹션 패턴으로 묶음)
- **주의: 이 섹션 원문 11편은 다른 작업자가 이번 세션 중 수정했다.** 최초 감사에서 지적한 대부분(항산화 5부작의 시행형 줄바꿈·블록쿼트 수사·이중 마무리·진화 의인화, `why-glp-1`의 전쟁 확장 비유, `autonomic-dysfunction`의 "A가 아니라 B" 단정 프레임)은 **해결됨**.

### 수정 우선순위 Top 5

1. **`nrf2-keap1-antioxidant-addiction-cancer.mdx`** — 끝부분에 마무리 절이 연속 4개. `## 항산화 패러독스는 여기서 완성된다`(85) / `## 정리하며`(90) / `## 다음 글 예고`(97) / `이제 질문은 이것입니다.` + 블록쿼트(102–104). 유형 I·H, 심각도 **명확**. (같은 시리즈의 나머지 4편은 단일 `## 정리`로 정리됨 — 이 파일만 옛 형식)
2. `nrf2-keap1` 96행: `동시에 암세포를 **가장 불안정한 상태에 묶어두는 족쇄**이기도 합니다.` — 유형 P, 경계
3. `body-temperature-immunity.mdx` 88행: `왜 몸이 그런 선택을 했는지부터 이해하는 것, 그것이 진짜 면역 관리의 출발점입니다.` — 유형 P·Q, 경계
4. `body-temperature-immunity.mdx` 83행 소제목 `## 결론: 체온은 목표가 아니라 신호다` + `selfish-immunity-energy-priority.mdx` 45행 `따라서 체온은 목표가 아니라 신호입니다.` — 두 글에 같은 문구, 유형 F, 경계
5. `mitochondria-regeneration-autophagy-fasting.mdx` — 절마다 `---` 구분선(34·48·67·79·87·101·109·119) + 18행 미토콘드리아=가축/사료 확장 비유. 유형 O·B, 경계

### 깨끗 (특이사항 없음 / 이번 재검사 기준)

`immunometabolism-nutrient-sensing` · `vitamin-c-immunity-evidence` · `2025-bensalem-itre-human-autophagy` ·
`ros-antioxidant-clinical-failure` · `achim-peters-selfish-brain-energy-hierarchy` ·
`antioxidant-paradox-metabolism`\* · `exercise-antioxidant-paradox-mitochondria`\* ·
`aging-antioxidant-paradox-longevity`\* · `cancer-cells-hydrogen-peroxide-paradox`\* ·
`why-glp-1-reduces-inflammation`\* · `autonomic-dysfunction`\* · `postprandial-somnolence-orexin-inflammation`\* ·
`selfish-immunity-energy-priority`(4번 항목 제외)

\* = 다른 작업자가 이번 세션에 정리함

### 섹션 공통 패턴 (남은 것, 대부분 경계)

- `mitochondria-regeneration`·`body-temperature`: 절마다 `---`, 수동 줄바꿈 잔재, 한 문단 다중 볼드(`body-temperature` 57행).
- 여러 파일에 "질문을 바꿔야 한다" / "X는 A가 아니라 B" / "~에 가깝습니다" 문단 클로저가 1~2회씩. 각각은 경계지만 사이트 전반에서 반복되므로 다음 섹션들에서 계속 추적.
- `cancer-cells-h2o2` 27–28행, `exercise-antioxidant` 26–27행: 수사적 질문 1회 + 블록쿼트. 경계.

---

# docs / nutrition-supplement — 상세 근거 (사용자 검토용, 2026-08-27)

검토 7편: `innate-immunity-foods-limitations` · `adaptive-immunity-cell-proliferation-nutrients` ·
`adaptive-immunity-foods-indirect-mechanisms` · `inflammation-resolution-nutrients-foods` ·
`epifood-immune-diet-diversity` · `gut-immunity-environmental-enrichment` ·
`doctor-youtube-supplement-vascular-health-critique`.

**검토용 기록. 원본 미수정.** 이 섹션 원문은 이번 세션 중 변경되지 않음.
- **A. 객관적 항목** — 오타·조사 오류·문장 붕괴·표 붕괴·렌더링/구조 결함.
- **B. 문체 판단 항목** — 미확정. 반복 사실만으로 수정 대상 아님.
- **C. 별도 과학·COI** — 문체 감사와 분리, 수정 안 함.

이 7편 중 4편(`innate-…`, `gut-immunity-…`, `inflammation-resolution-…`, 일부 `adaptive-…`)은 저자의 지식 정리형 서술이며 표가 많고, **AI 문투보다 실제 오타·표 붕괴가 주 문제**다.

## A. 객관적 항목

### A1 — `gut-immunity-environmental-enrichment.mdx` · 다수
> **45행** `… 각각의 요인이 **장관 면역에 어떤 방식으로 작용하는가**에 대한 보다 이해이며 무엇보다 …`
> **47행 소제목** `## 장관면역에 영향을 미치는 직접적인 인자를 4종류.`
> **79행** `반면에 트립신은 아르기진과 라이신을 부위를 잘라서 전하를 띤 펩타이드가 만들어집니다.`
> **109–122행** 표 (`## 뮤신 점액층에 영향을 주는 식품들`) — 헤더 행이 `|   |   |   |`, 실제 헤더가 본문 행(111행)에 있음. 115–118행은 셀 1개짜리 행(`|(Sialyl-3′-lactose)|` 등)으로 표가 깨짐. 120행 `|갈조류|황산다당체(Sulfated polysaccharides|` 괄호·셀 미완. 122행 `|아보카도장비과|탄닌(폴리페롤, 탄닌류)|`
- 구분: **객관적**
- 이유: 45행 "보다 이해" 단어 누락(비문). 47행 소제목이 "…4종류."로 끝나 문장·제목 어느 쪽도 아님. 79행 "아르기진"(→아르기닌), "라이신을 부위를"(조사 중복). 109–122행 표 문법 붕괴로 렌더 깨짐. 122행 "아보카도장비과", "폴리페롤"(→폴리페놀) 오타.
- 제안: 45행 "보다 깊은 이해이며"; 47행 "## 장관 면역에 직접 영향을 주는 네 가지 인자"; 79행 "아르기닌과 라이신 부위를 잘라"; 109–122행 표를 `|식품|대상|성분|` 3열로 재작성하고 다중 성분은 한 셀에 줄바꿈; 오타 수정.
- 영향: 없음 (표 재작성 시 성분 대응은 원자료 확인 필요 → C).

### A2 — `inflammation-resolution-nutrients-foods.mdx` · 다수
> **29행** `오메가-3와 오메가-6의 염증반응, 드이 퉁터 : 참고문헌1.`
> **31행** `위의 그림을 보시면 오메가-3로 부터 만들어지는 물질들은 …` (문서에 `<Figure>` 없음)
> **60행 소제목** `## 염증 매개 물질을 만들어내는 효소인 Oxygenease와 저해 식품`
> **62행** `다만 약이 있으면 약이 섭취하는 것이 더 좋은 방법이며 …`
> **23행** `1) 오메가-3 지방산: 염증 종결 신호의 '원료'` (일반 텍스트) ↔ **78·87·96행** `### 2) …`, `### 3) …`, `### 4) …` (H3)
- 구분: **객관적**
- 이유: 29행 "드이 퉁터"는 뜻 없는 깨진 문자열. 31행이 없는 그림을 가리킴(29–30행에 그림이 있어야 함). 60행 "Oxygenease" → "Oxygenase". 62행 "약이 섭취하는" → "약을 섭취하는". 4가지 축 중 1번만 소제목 서식이 다름.
- 제안: 29행 삭제 또는 정정 후 `<Figure>` 삽입/링크; 60행 "Oxygenase"; 62행 조사 수정; 23행을 `### 1) 오메가-3 지방산: …`으로 통일.
- 영향: 없음 (그림 내용은 별도).

### A3 — `innate-immunity-foods-limitations.mdx` · 다수
> **62행** `탐식작용(phagocytosis)는 선천성 면역세포가 외부의 미생물에 대응하는 가장 기본적인 방법입니다.`
> **66행** `특히 헤파린은 황산기가 결합되어 있으서 음전하가 매우 강합니다.`
> **100행 소제목** `### 탐식작용에 영향을 미치는 식품들` ↔ **121행 소제목** `### 탐식작용에 영향을 미치는 식품들` (동일 소제목 2회)
> **106행** `어것의 일부 사례만 정리하면 다음과 같습니다.`
> **111행** 표 헤더 `||주의사항|` (첫 셀 비어 있음)
> **160행** `항염증성 식품과 그것이 들어있는 식`
- 구분: **객관적**
- 이유: 62행 "탐식작용는"→"탐식작용은". 66행 "있으서"→"있어서". 100·121행 동일 H3 중복(내용은 다른 표). 106행 "어것의"→"이것의". 111행 표 헤더 첫 셀 누락. 160행 문장이 "…식"에서 잘림(식품/식단?).
- 제안: 조사·오타 정정; 121행 소제목을 내용에 맞게 변경(예: "### 탐식작용을 직접 활성화하는 제품군"); 111행 헤더 `|제품|주의사항|`; 160행 문장 완성 또는 삭제.
- 영향: 없음.

### A4 — `adaptive-immunity-foods-indirect-mechanisms.mdx`
> **110–113행** (`## 요약`)
> ```
> 대표적인 예로는 면역증강제, 모유 올리고당, 단쇄지방산(특히 부틸산), 유익균과 프로바이오틱스가 있습니다. `␠␠`
>     가 있으며, 이들 모두는 **특이성과 균형**이라는 적응면역의 핵심 원리를 벗어나지 않는 방식으로 작용합니다.
> ```
> **36–37행** `… 적응면역의 핵심은 "강함"이 아니라 **특이성**입니다.  ⏎ 필요한 항원에 대해서만, 필요한 정도로 활성화되어야 합니다.`
> **44–46행** `적응면역 전체를 자극한다는 뜻이 아니라  ⏎ 특정 보조 T세포 반응이 더 잘 형성되도록 환경을 만든다  ⏎ 는 의미로 이해하는 것이 정확합니다.`
- 구분: **객관적** (편집 잔여물 / 독해 방해 시행 줄바꿈)
- 이유: 113행이 "가 있으며"로 시작 — 앞 문장 삭제 후 남은 조각. 44–46행은 한 문장이 세 줄로 쪼개져 "는 의미로"가 줄 첫머리에 옴.
- 제안: 112–113행을 한 문장으로 통합; 44–46행을 한 문장으로 이어 붙임.
- 영향: 없음.

### A5 — `doctor-youtube-supplement-vascular-health-critique.mdx`
> **22–24행**
> ```
> ## 한 의사의 유튜브 영상이 놓치고 있는 것들
>
> ― 혈관 건강을 영양제로 설명할 수 있을까
> ```
> **76–78행** `의사가 말하는 건강 정보일수록, 이 구조적 관점은 더욱 분명하게 제시되어야 합니다.` ⏎⏎ `이제 구체적으로 무엇이 문제인지 살펴보겠습니다.`
- 구분: **객관적** (렌더링/구조) + 구성
- 이유: 24행 "― …"가 H2와 무관한 독립 문단으로 렌더(뉴스 3편 A4와 같은 패턴, 여기선 `―` U+2015). 68–76행이 결론처럼 읽힌 뒤 78행에서 "이제 …살펴보겠습니다"로 재시작 — 앞 절(`## 혈관 건강은 숫자가 아니라 '시스템'의 문제입니다`)과 순서가 꼬임.
- 제안: 24행 부제를 `description`으로 이전 또는 이탤릭 처리; 결론부(68–76행)를 실제 결론 위치(영양소 각론 뒤)로 이동.
- 영향: 없음 (표시·구성만).

### A6 — 소규모
- `adaptive-immunity-cell-proliferation-nutrients.mdx` 25–26행, 30–33행 — 시행형 줄바꿈 + 항목 사이 빈 줄 있는 번호 목록. 경미.
- `epifood-immune-diet-diversity.mdx` 16–17행 등 시행형 줄바꿈. 경미.

## B. 문체 판단 항목 (미확정)

### B1 — "특정 식품 하나로 면역 못 올린다" 단일 논지 반복 (시리즈 5편)
- 제목: `innate-…` "한 가지 식품으로 면역을 올릴 수 없는 이유" / `adaptive-…cell-proliferation` "특별한 면역식품이 필요하지 않은 이유" / `adaptive-…indirect` "왜 직접 자극하지 않는가" / `gut-immunity-…` "장관 면역은 한두 가지 식품으로 좋아지지 않습니다"
- 본문 반복: `gut-immunity-…` 14·163·169·171행 / `innate-…` 193행 / `adaptive-…cell` 67·99행
- 구분: **문체 판단** (시리즈 공통 프레임). 각 글에서 타당한 결론이며 개별 수정 대상 아님. 빈도만 기록.

### B2 — 절 끝 볼드-아포리즘 클로저
- `doctor-youtube-…` 38·47·57·65·70·74행 / `gut-immunity-…` 171행(문장 전체 볼드) / `adaptive-…indirect` 112행 / `adaptive-…cell` 71행(블록쿼트+볼드)
- 구분: **문체 판단**. 뉴스 섹션 B1과 동일 패턴.
- 제안(선택): 형태가 겹치는 2~3곳만 볼드 해제.

### B3 — 서식
- `adaptive-…indirect`: 절마다 `---`(30·48·70·80·92·101행), 이모지 번호 소제목 `### 1️⃣ … 4️⃣`(52·72·82·94행), 문장 시행 분리(36–37·44–46행)
- `inflammation-resolution-…`: 시행형 줄바꿈(15·80·91·105–106행)
- `innate-…`, `gut-immunity-…`: 표 다수, 일부 붕괴(→ A), 긴 나열형 한 문장(`gut` 67행 약 200자 한 문장)
- 구분: **문체 판단** (서식). 일관성 부여는 별도 작업.

### B4 — 교육용 비유
- `epifood-…` 19행 "유전자는 고정된 설계도 / 후생유전학은 스위치 시스템" · `innate-…` 193행 "버튼 스위치가 아니라 여러 페달과 브레이크" — 일반적 교육 비유, 각 1회. 경계.

### 깨끗
- `adaptive-immunity-cell-proliferation-nutrients.mdx` — 객관적 오류 없음(A6 경미만). B2·B3 형태 소수.
- `epifood-immune-diet-diversity.mdx` — 객관적 오류 경미. 문체 항목 적음.

## C. 별도 과학·COI 검토 필요 (수정 안 함)

- **단일 출처 의존** — 7편 중 5편(`innate-…`, `adaptive-…cell`, `adaptive-…indirect`, `inflammation-resolution-…` 일부, `gut-immunity-…`)이 참고문헌으로 `Beermann C. Food and the Immune System (Springer 2023)` **한 권만** 제시. 근거 다양성 검토 권장.
- **면역증강제 제품 표** — `innate-…` 111–119행, `adaptive-…indirect` 58–66행에 "미강발효분말·흑미강발효분말·후코이단·폴리감마글루탐산·PLAG" 등 상용 제품군 표. `innate-…` 102행 "PLAG도 여기에 해당되는 제품으로 생각됩니다", 191행 "면역증강제는 … 면역 부스터를 안전하게 섭취". 이해관계·근거 검토 별도.
- **`inflammation-resolution-…` 46–54행 표** — "E-시리즈 류코트리엔(EPEs)", "D-시리즈 류코트리엔(DPEs)" 등으로 표기. 오메가-3 유래 SPM은 리졸빈/프로텍틴/마레신이며 류코트리엔이 아님. 72행 `Caffeic acid | 알칼로이드` — caffeic acid는 페놀산(폴리페놀). 내용 오류 확인 필요.
- **`epifood-…` 51·70행** — "엽산 (vitamin B9, B11)". B9=folate가 표준, "B11"은 비표준/구식 표기. 확인 권장.
- **`gut-immunity-…` 95행** — "Acetyl acid, Formyl acid, Malto acid" 등 비표준 화합물명(각각 acetic/formic/maltobionic으로 추정). 91행 "Chamzulen"(→Chamazulene). 원자료 확인.
- **`doctor-youtube-…` 92행** — "약(스타틴)을 복용할 경우 (오메가-3의) 추가적인 이득 … 현재까지 임상결과는 추가적인 이익이 없다는 쪽" — 임상 주장 확인 권장. (또한 이 파일은 `nutrition-supplement/` 폴더에 있으나 frontmatter `category`/`section`이 `critics` — 위치/분류 불일치.)

---

# docs / medicine-history — 상세 근거 (사용자 검토용, 2026-08-27)

검토 14편. 최초 기록 당시에는 원본을 수정하지 않았으며, 2026-08-28 사용자 검토 후 객관적 항목 일부를 반영함.
전반적으로 **nutrition-supplement보다 깨끗**하다. 짧은 서술형 역사 글이 다수이고, 오류는 흩어져 있고 대부분 경미하다.

## A. 객관적 항목

### A1 — `acupuncture-trials-methodology-bias.mdx` · 시행형 줄바꿈 + 마크다운
- **49–116행 전반**: 본문 대부분이 문장 끝 두 칸(`  `) 강제 줄바꿈 + 한 문장 한 문단 구조. 글 전체가 한 줄짜리 문장 나열로 읽힘. 유형 O, 심각도 **명확**(독해 방해 수준).
- **139행**: `Cochrane A. Effectiveness and Efficiency: Random Reflections on Health Services_.` — 닫히지 않은 이탤릭 마커 `_`. 마크다운 오류.
- 제안: 강제 줄바꿈 제거하고 문단으로 통합; 139행 `_` 삭제.
- 영향: 없음.

### A2 — H2 다음의 매달린 부제 줄 (여러 파일, 재발 패턴)
> `who-founded-cochrane-collaboration.mdx` 13–15행
> ```
> ## 코크란 협력체는 누가 만들었을까
>
> ### ― 아치 코크란의 업적과 이언 챌머스, 피터 괴체의 정확한 역할
> ```
> `robert-koch-tuberculosis-tuberculin.mdx` 15–21행 — `## 로베르트 코흐와 결핵` → `<AuthorBio>` → `### 실패한 치료제에서 살아남은 진단법…` (부제용 H3) → `### 인류를 위협한 오래된 감염병`
> `anthrax-biological-terror-koch.mdx` 19–21행 — 동일 구조
- 구분: **객관적** (구조) — H2(대개 frontmatter 제목 반복) 바로 뒤에 부제 성격의 `### …` 또는 `― …`. `new` 섹션 A4, `doctor-youtube` A5와 같은 패턴이 medicine-history에도 반복.
- 제안: 부제를 `description`으로 이전하거나 이탤릭 한 줄로. 파일 간 동일 처리.
- 영향: 없음.

### A3 — `nobel-2025-treg-foxp3-three-laureates.mdx`
- **12행**: `updated : 2025.12.17` — 다른 파일은 `updated: 2025-12-17` 형식. 공백·구분자 불일치.
- **58행 소제목**: `## 3. 2001년 FOXP3 발견: 분자적 조절인자등장` — "조절인자등장" 붙임 (→ "조절인자 등장").
- **82–90행**: 결론부 전체가 강제 줄바꿈으로 시행화.
- 구분: **객관적**(frontmatter·오타) + 문체(결론부 줄바꿈).
- 영향: 없음.

### A4 — `robert-koch-tuberculosis-tuberculin.mdx` 51행 · 고유명사 오기
> `1907년, 오스트리아의 소아과 의사 **클렘렌스 폰 피르케트**는 …`
- 구분: **객관적** — Clemens von Pirquet. "클렘렌스"→"클레멘스", "피르케트"→"피르케"(관용) 권장.
- 영향: 없음(인물 동일).

### A5 — `anthrax-biological-terror-koch.mdx` 25행 · 개수 불일치
> `탄저균이 생물학 테러에 적합하다고 평가되는 이유는 크게 다섯 가지로 정리할 수 있습니다.`
- 구분: **객관적** — 이후 소제목은 4개(27·35·41·47행)뿐. "다섯 가지" ↔ 4개 항목.
- 제안: "네 가지"로 수정하거나 다섯 번째 항목 보강.
- 영향: 없음.

### A6 — `pasteur-anthrax-rabies-vaccine.mdx` 26행 · 비문 + 오타
> `<KeyPoint>` 내부: `위의 사진은 Paul Nadar가 촬영한 것은 그는 유명한 Nadar의 아들입니다. Nadar는 사진의 역사에서 시진의 역할을 정의한 사람이라고 받아들여집니다.`
- 구분: **객관적** — "촬영한 것은 그는"이 비문. "시진"→"사진". 또 37행 "**로베르 코흐**"는 같은 문서·다른 문서와 달리 "로베르트" 아님.
- 제안: "위의 사진은 Paul Nadar가 촬영했다. 그는 사진사 Nadar의 아들로, …"; "사진"; "로베르트 코흐".
- 영향: 없음.

### A7 — `yersin-and-the-identity-of-black-death.mdx` · 마크업–명사 붙임
- 31행 `<b>카파(Caffa)</b>포위전`, 43행 `**약 550년**동안`, 57행 `<b>부풀어 오른 림프절(임파선)</b>조직을` — 인라인 요소 뒤 조사/명사 사이 공백 없음(렌더 시 붙음). 22–23행 `<AuthorBio … />` 다음 줄에 바로 `## …`.
- 구분: **객관적**(경미, 렌더링).
- 영향: 없음.

### A8 — 경미 (여러 파일)
- `scurvy-…`, `cotton-dyes-…`, `des-…`, `robert-koch-…`: 문단 뒤 빈 줄 없이 `## ` 시작(일관됨, CommonMark는 처리).
- `cotton-dyes-…` 100행 참고문헌 URL에 `?utm_source=chatgpt.com` 파라미터 잔존.
- `scid-bubble-boy-origins.mdx` — `## 참고문헌` 절 자체가 없음(본문에서 끝남).

## B. 문체 판단 항목 (미확정)

### B1 — "결론/정리하며/마무리하며" + 격언형 클로저
거의 모든 파일이 마지막 절을 교훈형 한 문장으로 닫음:
- `scurvy-…` 65행 "…비교와 기록이라는 기본 원칙을 얼마나 성실히 지키는가에서 비롯된다"
- `who-founded-…` 87행 "이 배경을 알고 코크란 리뷰를 읽으면, 단순한 결론 이상의 역사적 맥락이 보이기 시작합니다"
- `yersin-…` 82행 "과학은 질병을 없애기 전에 먼저 설명합니다"
- `cotton-dyes-…` 74행 "풍요로운 원료보다, 기술로 돌파해야 했던 절박함이 과학을 더 빠르게 진화시킨 셈입니다"
- `robert-koch-…` 69행, `anthrax-…` 97행, `pasteur-…` 80행, `des-…` 79·85행, `nobel-…` 89–90행 등
- 구분: **문체 판단**. 개별로는 타당. 시리즈 전체에서 형태가 균일하다는 점만 기록.

### B2 — 소제목이 모두 완결 서술문 (K)
`cotton-dyes-…`("## 퍼킨의 우연은 '염료를 산업으로 만든 사건'이었다" 등), `des-…`("## 1부: 경고는 있었지만, 처방은 멈추지 않았습니다"), `acupuncture-…`("## '많은 나쁜 연구'는 '하나의 좋은 연구'를 대체할 수 없습니다"). 파일별 일관된 선택.

### B3 — 이모지 번호 소제목
`who-founded-…` 31·42·51행 `### 1️⃣ … 2️⃣ … 3️⃣`. (`adaptive-immunity-foods-indirect` 등과 동일.)

### B4 — "이유는 분명합니다 / 단순합니다 / 메시지는 분명합니다" 반복
`des-…` 47·79·83행, `acupuncture-…`, `anthrax-…` 등에서 단정 도입구로 반복. 문체 판단.

### B5 — 수사적 질문을 독립 줄로
`cotton-dyes-…` 23·55·58행("이 많은 흰 천을 어떻게 팔 것인가?", "병원균에만 달라붙는 화학물질도 만들 수 있지 않을까?"), `scurvy-…`. 각 1~2회, 경계.

### 깨끗 (특이사항 없음)
- `blood-types-transfusion-history.mdx` — 객관적 오류 없음, 문체 절제.
- `aids-hiv-immunology-catalyst-history.mdx` — 동일.
- `transplantation-history-self-nonself.mdx` — 동일(참고문헌 #3 연도/서지 경미).
- `scid-bubble-boy-origins.mdx` — 서술 깨끗(참고문헌 절 없음은 A8). "TMI"/"부록" 캐주얼 소제목은 저자 선택.
- `des-diethylstilbestrol-saga.mdx` — 산문 깨끗(29행 만연체 1곳, B1·B2 형태).
- `cotton-dyes-…`, `scurvy-…` — 산문은 무난, B2·B5 형태.

## C. 별도 과학·COI·서지 검토 필요 (수정 안 함)

- **약한 참고문헌** — `robert-koch-tuberculosis-tuberculin`(bare URL + Wikipedia ×2), `anthrax-biological-terror-koch`(저널명만 + Wikipedia ×2), `who-founded-cochrane-collaboration`(#2 서지 불완전, #3 "공식 역사 자료"), `pasteur-anthrax-rabies-vaccine`(제목만), `cotton-dyes`(전부 웹링크, 100행에 `utm_source=chatgpt.com` 잔존). 서지 보강 검토.
- **`nobel-2025-treg-foxp3-three-laureates.mdx`** — 파일은 `medicine-history/` 폴더인데 frontmatter `category: 면역학` / `section: immunology` (분류 불일치). 79행 "시몬 사카구치가 없었어도 … Treg 세포를 찾아내는 것이 어렵지 않았을 것" — 사카구치 기여를 낮추는 강한 반사실 견해(편집자 의견). 2025년 노벨 수상 사실관계는 별도 확인 권장(참고문헌 절 없음).
- **`scurvy-and-birth-of-clinical-trials.mdx` 26행** — 앤슨 원정 사상자 수치("약 1,400명 중 1,000명 이상")는 출처별 편차 큼. 60행 "아시아권에서는 대조군 임상시험 방법론이 체계적으로 정착되지 못했다"는 일반화(같은 취지가 `acupuncture-…`에도) — 근거·표현 검토.
- **`acupuncture-trials-methodology-bias.mdx` 23행** — "베일러에 의해서 당시까지의 항암치료가 큰 효과가 없다는 것이 밝혀지면서 대체의학이 국가의 지원을 받고 연구되기 시작" — Bailar 1986 → NCCAM 예산의 인과를 단순화. 확인 권장.
- **`pasteur-…` 47행** — 푸이이-르-포르 실험에 투쌩식 화학 사균 백신이 쓰였을 가능성 서술은 타당(Geison). 원자료 확인은 사용자 몫.

---

# docs / vaccine-society — 상세 근거 (사용자 검토용, 2026-08-27)

검토 18편. 최초 기록 당시에는 원본을 수정하지 않았으며, 2026-08-28 사용자 검토 후 객관적 항목 일부를 반영함.
이 섹션은 **하나의 매우 일관된 하우스 스타일**이 지배한다(아래 B1). 하드 오류는 적다.

## A. 객관적 항목

### A1 — `jenner-cowpox-vaccinia-origin.mdx` 36행 · 깨진 문자열
> `약 6주 후, 제너는 보다 निर्ण निर्ण적인 시험을 감행했습니다.`
- 구분: **객관적** — "결정적인"이 들어갈 자리에 데바나가리 문자 `निर्ण निर्ण`가 삽입됨(입력·인코딩 사고).
- 제안: `보다 결정적인 시험을 감행했습니다.`
- 영향: 없음.

### A2 — `polio-and-salk-vaccine-history.mdx` 16행 · 누락 어절 + 만연체
> `… 마크 클라크 장군의 회고록을 읽어보면 우리나라에 최대로 투여할 수 인력이 최대 매년 80만 정도였으며, 3년간 우리나라에 투입된 병사가 연인원 기준 1,789,000명이므로 사실 당시 가용한 인력이 거의 전부 투입되었다고 볼 수 있으므로 당연히 전쟁에 대한 공포가 매우 심했을 것입니다.`
- 구분: **객관적** — "투여할 수 인력이"에 어절 누락(→ "투입할 수 있는 인력이"). 한 문장이 지나치게 길고, 소아마비 글에 한국전쟁 병력 수 여담이 큼(주제 이탈은 C).
- 제안: 문장 분할 + 어절 보완.
- 영향: 없음(수치 주장은 C).

### A3 — H2 다음의 매달린 부제(`###` 또는 `―`) · 재발 패턴
`wakefield-mmr-autism` 18–20행, `thimerosal-and-vaccine-mercury` 18–20행,
`hib-vaccine-panic-virus-story` 15–17행, `jenner-cowpox-vaccinia-origin` 18–20행(`### 핵심 요약`),
`cutter-hiv-hemophilia-blood-products` 16–18행.
- 구분: **객관적**(구조). `new`·`medicine-history`와 동일 패턴. `AuthorBio` 바로 뒤에 `##`가 붙는 경우도 다수(예: `wakefield` 17행, `jenner` 17행).
- 제안: 부제를 `description`으로 옮기거나 이탤릭 한 줄로. 파일 간 일괄.

### A4 — frontmatter 위생
- `elderly-influenza-vaccine-effectiveness-not-coverage.mdx` — `status` 필드 없음, `#cover: []` 주석 줄, `section: "독감과 백신"`(다른 파일은 `vaccine-society`).
- `polio-and-salk-vaccine-history.mdx` 12행 `updated : 2025-12-24` — 콜론 앞 공백(다른 파일/`nobel`과 같은 오식).
- `flu-2025-2026-subclade-k-cdc-update.mdx` 17–23행 `<Figure … alt="" caption="" />` — alt/caption 빈 값. 65행 참고문헌: 표시 텍스트는 전체 URL인데 실제 링크는 단축주소(`ym.care/bfcn`)로 불일치.

### A5 — 음역 불일치 (섹션 간)
`조너스 솔크`(polio-and-salk, iron-lung) ↔ `조너스 소크`(cutter-incident). `로베르트 코흐` ↔ `로베르 코흐`(pasteur-…, medicine-history 참조). 한 사이트 내 표기 통일 필요.

## B. 문체 판단 항목 (미확정)

### B1 — "백신과 사회" 시리즈의 단일 템플릿 (약 10편)
`no-perfect-vaccine-risk-and-benefit`, `vaccination-choice-and-herd-immunity`,
`cost-of-natural-immunity`, `vaccines-success-and-forgotten-diseases`,
`future-of-society-without-vaccine-trust`, `iron-lung-polio-fear-history`,
그리고 `wakefield`·`thimerosal`·`cutter-incident`·`hib` 일부.

공통 구성(파일별 행 표기 생략):
- `<Series>` 컴포넌트 + frontmatter 제목을 그대로 반복한 H2.
- **거의 모든 절이 "X는 A가 아니라 B" 리프레임으로 전개·마무리**됨(한 글에 6~8회). 예:
  - `no-perfect-vaccine` — "부작용은 실패의 증거가 아니다" / "백신이 미완성이라서가 아니라 … 확률적이기 때문" / "완벽하지 않기 때문에 쓰이는 것이 아니라, … 가장 많은 생명을 지켜왔기 때문에" 등.
  - `cost-of-natural-immunity` — "면역은 결과이지, 과정이 아니다" / "단점이 아니라, 의도된 설계" / "자연면역을 대체하기 위해 등장한 것이 아니라, 대가가 너무 컸기 때문에" 등.
  - `vaccines-success` — 소제목 "백신은 위험을 없애지 않고, 기억을 없앤다".
- 모든 소제목이 완결 서술문(유형 K).
- 절마다 격언형 클로저(유형 P) + 마지막 큰 클로저 단락.
- `  ` 두 칸 강제 줄바꿈이 도입 단락에 반복.
- 참고문헌이 기관·책 제목만(연도·URL 없음) → C.
- 구분: **문체 판단**. 각 문장은 타당하고 사실관계도 무난. **다만 "A가 아니라 B"가 개별 표현이 아니라 글의 유일한 전개 장치로 반복**되는 점, 한 시리즈 전체가 동일 골격인 점을 기록. 일괄 수정 대상으로 확정하지 않음.

### B2 — 서식
- `elderly-influenza`, `flu-2025-2026`: 절마다 `---` + 느슨한 목록 + 강제 줄바꿈.
- `vaccine-society.mdx`(허브): 전체가 강제 줄바꿈 레이아웃(짧은 안내 페이지라 경계).

### B3 — 이모지·번호 소제목
`jenner` 18행 `## 1. 에드워드 제너(1796) — … : …`(번호+대시+콜론 결합 장문 소제목).

### 깨끗 (문체 관점 특이사항 적음)
- `hygiene-hypothesis-antibiotics-history.mdx` — **이 섹션에서 가장 탄탄**. 1차 문헌 8건(Strachan 1989, Ege 2011 NEJM, Rook, Bach, Akdis 등), 경쟁 가설을 균형 있게, 헤지 양호. `<Series>`·이모지·매달린 부제 없음.
- `smallpox-eradication-history-of-vaccine.mdx` — 산문·연대 정확, 매달린 부제 없음(P 클로저만).
- `iron-lung-polio-fear-history.mdx` — 연대 정확(F·P 클로저 + 강제 줄바꿈만).

## C. 별도 과학·COI·서지·구성 검토 필요 (수정 안 함)

- **약한 참고문헌** — 시리즈 대다수가 "WHO, _제목_" / "CDC, _제목_" / 저자·책 제목만 제시(연도·권호·URL 없음). 서지 보강 검토.
- **`polio-and-salk-vaccine-history.mdx` 44행** — "솔크 박사는 … **베로 세포(Vero cell)**를 이용해 바이러스를 대량 배양했습니다" — 시대 오류로 보임. Vero 세포주는 1962년 수립. 솔크(1954)는 1차 원숭이 신장세포를 사용. 확인 필요.
- **`elderly-influenza-…mdx` 96행** — "코딧 사이트에 이 이슈페이퍼 검색해도 보이지 않아 본문은 확인하지 못했습니다" — 글 전체가 미확인 이슈페이퍼의 2차 기사에 근거. 61행 예방효과 수치(한국 13.5% vs 미·영·호 40~50%)도 이 경로. 원자료 확인 필요.
- **`flu-2025-2026-subclade-k-cdc-update.mdx`** — 25행 2025–26 시즌 통계는 지식 컷오프(2026-01) 이후 갱신 데이터. 59행 "우리나라는 노인층 접종률이 높아 문제가 적다"는 여담은 `elderly-influenza-…`의 논지(접종률 높아도 예방효과 낮음)와 상충 — 사이트 내 일관성 확인. 또 `new/2025-2026-flu-season-harder-than-usual`와 주제·내용이 크게 겹침.
- **`cutter-hiv-hemophilia-blood-products.mdx` 70–74행** — 일본 녹십자 창립 인사–731부대 연관 주장. 본문은 "사법적으로 확정된 사실이 아님"으로 헤지했으나, 실명 기업에 대한 논쟁적 역사 서술이므로 별도 확인 권장. 파일 주제(혈액제제)도 `vaccine-society` 폴더와 적합성 느슨.
- **`future-of-society-without-vaccine-trust.mdx` 36행** — 백신 거부 공동체를 "아나키 성향" 등으로 규정(편집자 판단, 일부 헤지).
- **폴더/분류 적합성** — `hygiene-hypothesis-…`(마이크로바이옴), `elderly-influenza`·`flu-2025`(`section: 독감과 백신`)가 `vaccine-society` 아래에 있음.

---

# docs / daily-immunity — 상세 근거 (사용자 검토용, 2026-08-27)

검토 21편(하위 폴더 `hyperlipidemia-statin/` 4편 포함). **검토용 기록, 원본 미수정.**
이 섹션은 **지금까지 중 객관적 오류가 가장 많다.** 또한 여러 글이 저자의 편집적 논지("염증 없이 선천면역·탐식작용을 활성화할 수 있고, 그런 면역보조제가 있다/올 것이다")를 공유한다(→ C).

## A. 객관적 항목

### A1 — 문장·제목·소제목 오류
- `mistletoe-pseudoscience-narrative.mdx` 2행 제목 `… 사이비과학은 어떻게 '그럴듯한 이야기'를 만든다` — 의문형인데 "만든다"로 끝나 문장 미완(→ "만드는가"). 88행 소제목 `## 미슬토 요법이 기능의학 등에서 받아들여진 이유가` — "이유가"로 끝나 미완. 28행 `자신의 깨달았다고하며`(조사·띄어쓰기).
- `everyday-immunity-balanced-view.mdx` 57행 `세째,`(→ 셋째). 34–37행 필리프 데트머 관련 문단 2개가 거의 동일 내용 연속(편집 잔여물).
- `colon-cleansing-why-it-worked-before.mdx` 56·58행 `이러한 일반화가 문제였던 것입니다.` 연속 중복.
- `inflammation-understanding-and-misconceptions.mdx` 153행 볼드 구절 `염증을 키우는 자극이 아니라, 염증이 필요 없도록 만드는 작용기전에 대해서 그 동안 잘 알려져 있지 않았다는 점` — 비문.
- `2024-ldl-cholesterol-j-shaped-risk.mdx` 30행 `LDL이너무 낮을 경우`(띄어쓰기). `<Paper journal="Advanced Research">` — 실제 저널은 `Journal of Advanced Research`(참고문헌 1과 불일치).
- `hyperlipidemia-statin-history.mdx` 213행 `심혈관질환이 감소한다.에제티미브로` — 마침표 뒤 공백 없이 두 문장 결합.

### A2 — 본문 속 H1 / 매달린 부제 / 깨진 컴포넌트
- `coffee-dementia-risk-2-3-cups-jama-2026.mdx` 32행 `# 하루 몇 잔의 커피가 …` — 본문 한가운데 H1(`#`). 다른 소제목은 모두 `##`. 헤딩 계층 깨짐.
- `ddm-innate-immunity-antibiotic-resistant-influenza.mdx` 23행 `# 선천면역 활성 물질, …`(본문 H1) + 25행 `— 한국생명공학연구원 연구 보도의 의미`(매달린 부제). 35·43·53행 이모지 소제목 `### 1️⃣ … 3️⃣`. 118–119행 `…있습니다.---`(구분선이 문장에 붙어 hr 미형성).
- `omnivory-inflammation-and-food-culture.mdx` 67행 `#<RelatedPosts` — JSX 컴포넌트 앞에 `#`가 붙어 렌더 깨질 소지. 68행 `slugs=` 들여쓰기·`##` 라벨 없음.
- `diet-cancer-korea-paf-interpretation.mdx` 32–34행 `## 음식은 암의 원인일까` 다음 줄 `— 한 편의 논문에서 시작해, …`(매달린 부제).
- `mistletoe-…` 102행 / `colon-cleansing-…` 89행 — `## RelatedPosts`라는 라벨 소제목 뒤에 실제 컴포넌트(불필요).

### A3 — 구조
- `senescence-resistant-mesenchymal-progenitor-anti-aging-primates.mdx` — 문서에 `##`가 하나도 없음. 모든 소제목이 `###`(H2 없이 H3만).
- `hyperlipidemia-statin-history.mdx` — 본문(114–166행)에서 IMPROVE-IT·FOURIER를 상세 서술한 뒤, 말미 `<KeyPoint>` 2개(200–240행)에서 같은 내용을 거의 전문 재서술(**한 글 안 중복**). `<KeyPoint>`가 `## 참고문헌`·`<RelatedPosts>` 뒤에 위치. `## 정리`(168–176행)는 확장된 본문 범위(IMPROVE-IT/FOURIER/CANTOS)를 반영하지 않고 4개 임상만 언급.

### A4 — 고유명사
- `vitamin-c-risk-serum-level-mortality.mdx` — `프랜시스 클릭 (Francis Crick)`이 25·27·29·35·44·46·56·58행 반복. 음역이 "크릭"이어야 함. **인물 자체가 틀렸을 가능성**은 C 참조.

### A5 — frontmatter / 폴더·분류
- `coffee-…`, `vitamin-c-risk-…`, `diet-cancer-…` — `status` 필드 없음, `#cover: []` 주석 줄, `category: 면역과 영양학` / `section: 식품과 영양소`인데 파일은 `daily-immunity/` 폴더.
- `ddm-…` — `status` 없음, `#cover: []`.
- `mitochondria-endosymbiosis-history.mdx` — `category: 면역학` / `section: 면역학 기초`인데 `daily-immunity/` 폴더.

### A6 — 참고문헌 없음
`inflammation-understanding-and-misconceptions.mdx`, `mpla-controlled-lps-immunity.mdx`,
`prr-mediated-homeostatic-modulation-everyday-immunity.mdx` — `## 참고문헌` 절 자체가 없음.

## B. 문체 판단 항목 (미확정)

### B1 — 전면 시행형 줄바꿈 (독해 방해 수준)
`mpla-controlled-lps-immunity`, `lps-endotoxemia-history`, `inflammation-understanding-and-misconceptions`,
`everyday-immunity-balanced-view`, `diet-cancer-korea-paf-interpretation` — 본문 대부분이 문장 끝 두 칸 강제 줄바꿈 + 블록쿼트 수사 + `---` 절 구분선으로 시행화됨. 유형 O, **명확에 가까움**.

### B2 — "X는 A가 아니라 B" 리프레임이 글의 유일한 전개 장치
거의 모든 파일이 절 제목·본문·클로저를 이 형태로 구성(한 글에 5~8회). 예: `everyday-immunity`("어떤 면역이 더 중요한가가 아니라, 일상에서 영향을 줄 수 있는 면역은 무엇인가"), `prr-mediated`("PRR은 자극 스위치가 아니라 조율 장치다" 등 소제목 3개), `mpla-controlled-lps`("버려진 것이 아니라 다듬어졌다", "구조가 아니라 전하 하나", "약하게 만든 물질이 아니라 … 언어로 바꾼 첫 사례"), `diet-cancer`·`mitochondria-endosymbiosis`·`hyperlipidemia-statin-*` 전반.
- 구분: **문체 판단**. 개별로는 타당. 시리즈 전체가 동일 골격.

### B3 — 반복되는 특정 문구·은유
- `스타틴은 고지혈증 약이지만, 고지혈증만의 약은 아니다` — `hyperlipidemia-statin-history` 176행 / `jupiter-rosuvastatin-…` 126행에 동일.
- `~의 언어로 바꿨다` / `~를 설계하게 만드는 언어` — `mpla-controlled-lps`(치료 가능한 언어로 바꾼 첫 사례), `jupiter-…`(스타틴 치료의 언어를 바꿨다). metabolism-immunity 항산화 시리즈와도 연결.
- `세포 내 가축` 은유 — `mitochondria-endosymbiosis-history`(중심 장치, 저자가 비유임을 명시) + metabolism-immunity `mitochondria-regeneration-autophagy-fasting`(가축/사료).

### B4 — 서식
`---` 절 구분선(대다수), 이모지 번호 소제목(`ddm`), 느슨한 번호 목록.

### 깨끗 (문체 항목 적음)
- `sleep-and-immunity-circadian-rhythm.mdx` — **강함**. 1차 문헌 7건(Besedovsky 2019, Prather 2015, Spiegel 2002, Irwin 2019, Scheiermann). 시행 줄바꿈·`---`·매달린 부제 없음.
- `immunosenescence-and-inflammaging-history.mdx` — 1차 문헌 5건, 헤지 양호.
- `2017-cantos-canakinumab-inflammation-atherosclerosis.mdx` — **모범적**. 참고문헌 10건, 수치·규제 결과·비용까지 정밀, FDA/EMA 반려까지 서술. 102행에서 자신의 LPS 논지로의 과확대를 스스로 차단.
- `jupiter-rosuvastatin-normal-ldl-high-crp.mdx` — 엄밀. 3건 인용, "LDL이 중요하지 않다는 뜻일까 → 아닙니다" 등 방어절.
- `hidden-toxin-endotoxin-in-sterile-injection.mdx` — 사례 서술 깨끗.
- `senescence-resistant-…` — 산문·한계 서술 양호(A3 구조 제외).

## C. 별도 과학·COI·구성 검토 필요 (수정 안 함)

- **저자의 편집적 논지가 여러 글에 삽입됨** — "염증을 일으키지 않고 선천면역·탐식작용을 활성화하는 것이 가능하며, 그런 면역보조제가 존재하거나 곧 나온다"는 관점이 `everyday-immunity`(50·58행: 마치오키·데트머 반박 + 크레스틴/렌티난 언급), `inflammation-understanding`(151–153행), `mpla-controlled-lps`(글 전체), `prr-mediated-homeostatic-modulation`(저자가 "PRR 기반 항상성 조절"이라는 용어를 만들어 "면역디톡스"를 재브랜딩, 50·59행 "탐식작용을 활성화하는 물질"), `ddm`(116행: 동물실험을 "경구 면역보조 제품" 시장과 연결), `omnivory`(63행), `diet-cancer`(103–105행: 역학 논문을 "면역이 약해진 뒤 음식이 방향만" 틀로 재해석), `colon-cleansing`(48행 LPS 각도)에 반복. 이해관계·근거 수준 별도 감사 권장.
- **`vitamin-c-risk-serum-level-mortality.mdx` — 인물 오류 가능성.** "DNA 이중나선 공동 발견자 프랜시스 크릭이 말년에 고용량 항산화제에 회의적이었다"는 서술. 크릭의 후기 연구는 의식·신경과학이었고, 항산화제가 암을 촉진할 수 있다고 공개적으로 주장한 DNA 공동 발견자는 **제임스 왓슨**(Watson 2013). 인물·음역 모두 확인 필요. 112행 저자 개인 기전 가설(글루타치온 고갈)은 본문에 의견으로 표시됨.
- **최신 데이터 글(지식 컷오프 2026-01 이후)** — `coffee-…`(JAMA 2026), `ddm-…`(EBioMedicine 2026), `diet-cancer-…`(Epidemiology & Health 2025). 수치·결론 원문 확인 필요.
- **약한 참고문헌** — `lps-endotoxemia-history`(리뷰 1건으로 Lieber–Szabo–Cani–Tilg 전체를 다룸), `diet-cancer-…`(논문 1건).
- **폴더/분류 적합성** — `senescence-resistant-…`(재생의학·세포치료), `mitochondria-endosymbiosis-history`(진화생물학사)가 `daily-immunity` 아래.
- **`2024-ldl-cholesterol-j-shaped-risk.mdx` 112–114행 / `vitamin-c-risk` 111행** — 특정 유튜브 채널(닥터 쓰리, 장항준 내과 TV)과의 논쟁을 본문 절로 포함. 사실관계는 무난하나 편집 톤·출처(유튜브 링크) 검토.

---

# docs / new — 상세 근거 (사용자 검토용, 2026-08-27)

검토 6편: `2025-2026-flu-season-harder-than-usual` · `ai-future-immunology-precision-medicine` ·
`hangover-metabolic-immune-neuro-model` · `norovirus-why-dangerous-mechanism-oyster-blood-type` ·
`tuberculosis-antibody-news-korea` · `ultrasound-immune-oasis-cancer`.

**아래는 검토용 기록이며 원문을 수정하지 않았다. 다른 작업자가 수정한 파일도 없음(6편 모두 이번 세션 미변경).**

- **A. 객관적 항목** — 오타 · 문장 붕괴 · 렌더링/구조 결함.
- **B. 문체 판단 항목** — 반복 · 아포리즘 · 볼드 · 구분선 · 비유 · "A가 아니라 B". **미확정. 반복된다는 사실만으로 수정 대상 아님.**
- **C. 별도 과학·COI** — 문체 감사와 분리, 수정 안 함.

행 번호는 감사 시점 기준. 인용은 원문 그대로.

## A. 객관적 항목

### A1 — `hangover-metabolic-immune-neuro-model.mdx` 43행 · 오타
> **41–45행**
> ```
> ## 숙취란 무엇인가?
>
> 알코올의 과잉 섭취로 인하여 발생합니다. 영어로는 Hangover 라고 하고 학술적이 명칭은 Veisalgia 입니다.
>
> 숙취의 증상은 여러가지 원인이 있습니다.
> ```
- 구분: **객관적** (어미 오류 + 주술 불일치)
- 이유: "학술적이 명칭은" → 관형형 "학술적인". 45행 "증상은 … 원인이 있습니다"는 주어와 서술어가 어긋남.
- 제안: `… 학술 명칭은 Veisalgia입니다.` / `숙취 증상은 여러 원인으로 나타납니다.`
- 영향: 없음 (의미·주장 불변).

### A2 — `hangover-…` 52행 · 문장 붕괴
> **52행**
> ```
> … 아세트알데히드가 직접 독성이 되어서 숙취가 일어나는 것은 아닙니다. 또한 혈중 아세트알데히드는, 주로 간에서 만들어진 아세트알데히드(혈중 아세트알데히드)는 때문인데, 주요 숙취가 가장 심할 때 거의 없어진 상태입니다.
> ```
- 구분: **객관적** (비문: 괄호구 중복, "…는 때문인데"가 비문, 주어 불명확)
- 이유: "주로 간에서 만들어진 아세트알데히드(혈중 아세트알데히드)는 때문인데" 구간이 문장으로 성립하지 않음. 54행이 같은 취지("술을 마신 다음날 아세트알데히드가 거의 없는 상태에서 일어나기 때문에")를 더 명확히 서술.
- 제안(재구성): `또한 혈중 아세트알데히드는 주로 간에서 생성되며, 숙취가 가장 심한 다음 날 아침에는 이미 거의 사라진 상태입니다.`
- 영향: **과학적 주장 포함** — "아세트알데히드가 숙취 정점 시점에 이미 제거됨". 제안문은 원문 재구성이므로 저자 의도 확인 필요 (→ C).

### A3 — `hangover-…` 66행 · 표 헤더 오타 + 서식
> **62–68행**
> ```
> 숙취 증상에서 가장 대표적인 것은 다음과 같은 10가지 입니다.
>
>
>
> |증상상|빈도 (%)|심각성|
> |---|---|---|
> |피곤함|96.2|6.75|
> ```
- 구분: **객관적** (오타 + 빈 줄 과다 + 미번역)
- 이유: 헤더 셀 "증상상" → "증상". 62–66행 사이 빈 줄 3개. 표 75·77행에 "weakness", "Reduced Alertness"가 한글 행과 섞임.
- 제안: 헤더 `|증상|빈도 (%)|심각도|`; "weakness"→"무력감", "Reduced Alertness"→"각성도 저하".
- 영향: 없음.

### A4 — 뉴스 3편 · H2 다음의 매달린 "—" 부제 줄
> **`norovirus-…` 25–28행**
> ```
> ## 노로바이러스는 왜 이렇게 위험한가
> — 염증 없이 사람을 무력화시키는 바이러스의 정체
>
> 노로바이러스는 흔히 '겨울철 장염 바이러스' 정도로 …
> ```
> **`tuberculosis-…` 15–19행**
> ```
> ## 결핵을 다시 생각하게 만든 한 가지 뉴스
>
> — 항체는 정말 결핵에서 쓸모없을까
>
> 최근 해외 연구진이 …
> ```
> **`ultrasound-…` 18–22행**
> ```
> ## 암 속 '면역 오아시스'라는 발상은 무엇을 해결하려는가
>
> — 초음파, 면역, 그리고 우리가 놓치고 있는 질문들
>
> 최근 국내 연구진이 …
> ```
- 구분: **객관적** (렌더링/구조) — 저자가 부제로 의도한 줄이 마크다운상 H2와 무관한 독립 문단으로 렌더되어, 본문에 "—"로 시작하는 줄이 생김. 세 파일 동일.
- 제안(택1): (a) 부제 줄 삭제하고 `description`에 반영 / (b) 소제목 텍스트에 합침 / (c) `*…*` 이탤릭 한 줄로 명시. 3편 동일 처리.
- 영향: 없음 (표시 형태만).

### A5 — `tuberculosis-…` 88행 · 문장 붕괴
> **86–90행**
> ```
> 둘째는 **항생제 치료**입니다. 치료 기간이 길고, 복약 순응도가 낮으며, 내성 결핵이라는 또 다른 문제를 만들어 왔습니다.
>
> 그런데 이제 너무 어려운 문제 대신 결핵을 통제만 해도 환자들에게 도움이 될 수 있다는 것입니다.
>
> ---
> ```
- 구분: **객관적** (비문: "너무 어려운 문제"의 실체 생략, "~다는 것입니다"가 앞 문장과 연결 안 됨)
- 이유: 뒤에 이어지는 "항체" 논의로의 전환 문장인데, 문장 자체가 성립하지 않음.
- 제안(재구성): `그런데 최근에는, 결핵균을 완전히 박멸한다는 어려운 목표 대신 결핵을 안정적으로 통제하는 것만으로도 환자에게 도움이 될 수 있다는 관점이 제시되고 있습니다.`
- 영향: **논지 전환 문장** — 재구성이므로 저자 의도 확인 필요 (→ C).

### A6 — `ultrasound-…` 127행 · 어색한 문장
> **126–127행**
> ```
> … 아직 넘어야 할 단계가 많다는 뜻입니다. 보통 동물 실험에서는 어렵지만 어떻게 해서라도, 완전관해까지 나오도록 실험하는 것이 바람직하기 때문입니다.
> ```
- 구분: **객관적** (구어체 "어떻게 해서라도", 무엇이 어려운지 불명확, 앞 문장과 "때문입니다" 인과 연결 어색)
- 제안: `동물 실험에서 완전관해(complete response)까지 유도하기는 쉽지 않지만, 가능하다면 그 수준까지 확인하는 편이 바람직합니다.`
- 영향: 없음 (의미 유지, 명료화만).

---

## B. 문체 판단 항목 (미확정 — 사용자 결정)

### B1 — 절 끝 "… 아니라, **[볼드]** …" 마무리 형태 반복 (norovirus 중심)
- 위치·원문(norovirus):
  - 45행 `즉, 노로바이러스 감염은 **면역계가 본격적인 전쟁 상태에 들어가는 감염이 아닙니다.**`
  - 59행 `다시 말해 노로바이러스는 장을 '염증으로 손상시키는' 것이 아니라, **기능적으로 무력화시키는 방식**을 택합니다.`
  - 106행 `결국 굴은 소독으로 안전해지는 식품이 아니라, **충분히 가열했을 때만 안전해지는 식품**이라는 점이 분명해집니다.`
  - 122행 `이는 면역력이 강해서라기보다는, **바이러스가 들어올 '분자적 입구'가 애초에 열려 있지 않기 때문**입니다.`
  - 134행 `노로바이러스는 강력해서 막기 어려운 바이러스가 아니라, **우리가 너무 쉽게 전파를 허용하기 때문에 퍼지는 바이러스**입니다.`
  - 172행 `이 바이러스를 이해하는 핵심은 면역력의 강약이 아니라, **바이러스의 구조와 전파 전략**에 있습니다.`
  - (`tuberculosis`·`ultrasound`에도 유사 형태 존재)
- 구분: **문체 판단**.
- 관찰: 여러 절이 같은 통사(대조 + 볼드 강조 + 단정)로 닫혀 리듬이 단조롭고 볼드의 강조 기능이 희석됨. 개별 문장은 정확하고 문제 없음.
- 제안(선택): 형태가 특히 겹치는 2~3곳만 볼드 해제 또는 평서형으로. 전면 교체 불필요.
- 영향: 없음.

### B2 — `norovirus-…` "완성" 은유 반복
- 위치·원문:
  - 86행 `이유는 단순합니다. **겨울에만 전파 조건이 '완성'되기 때문입니다.**`
  - 88행 소제목 `### 겨울: 노로바이러스 전파 조건이 완성되는 계절`
  - 90행 `… 겨울에는 노로바이러스의 전파 사슬이 쉽게 완성됩니다.`
  - 94행 `… 바이러스가 없어져서가 아니라, **전파를 완성시키는 조건들이 동시에 무너져 전파 사슬이 끊어지기 때문**입니다.`
  - (127행 `이 네 가지 조건이 동시에 맞아떨어질 때에만 노로바이러스 감염이 완전히 성립합니다.`)
- 구분: **문체 판단**.
- 관찰: 약 8행 구간(86–94)에 "완성"이 조직 은유로 4회. 88(소제목)–90이 특히 근접.
- 제안(선택): 90행을 "겨울철 전파 사슬이 쉽게 이어집니다" 등으로 변주. 86행·소제목은 유지 가능.
- 영향: 없음.

### B3 — "X는 A가 아니라 B" / "질문을 바꾸다" (6편 중 5편) — 집계만
- `flu` 18행 `… 바이러스 자체의 급격한 독성 증가 때문이라기보다는, **면역 환경의 변화와 유행 양상의 복합 효과**로 …` · 60행 `… 독감 바이러스가 갑자기 더 사악해졌기 때문이 아니라 **…동시에 작용한 결과**입니다.`
- `tuberculosis` 116행 `균이 독해서라기보다, 면역 반응이 항상 효율적으로 작동하지 않았기 때문에 …` · 132행 `결핵은 여전히 균의 문제가 아니라 **면역의 문제**입니다.`
- `ultrasound` 98행 `이제 문제는 "면역을 켤 수 있는가"가 아니라, "면역을 어떻게 다룰 것인가"입니다.`
- `ai-future` 28행 `AI는 후보를 줄여주는 도구이지, 면역반응을 보장하는 기계가 아닙니다.` · 52행 `AI의 가장 큰 가치는 "정답을 대신 내는 것"보다 질문의 크기를 바꾸는 데 있습니다.`
- 구분: **문체 판단**.
- 관찰: 사이트 전반의 서술 습관. 각 사용은 타당하고 내용 전달에 유효.
- 제안: 없음. **개별 수정 대상으로 확정하지 않음** — 다음 섹션들에서 빈도만 계속 집계.
- 영향: —

### B4 — `tuberculosis-…` 중심 주장 반복 (소제목·마무리)
- `## 결핵은 왜 아직도 끝나지 않았을까`(27) · `## 한국의 결핵은 줄고 있지만, 끝났다고 말하기는 어렵습니다`(44) · `## 결핵은 여전히 '면역과 사회 구조의 병'입니다`(73) · `## 마무리: 결핵은 면역의 문제입니다`(130). 본문 56·75·77·116·132행에서 같은 취지 반복.
- 구분: **문체 판단** (구성).
- 관찰: "결핵은 균이 아니라 면역·사회의 문제"라는 한 논지가 소제목 4개와 본문 다수에 재진술되어, 글이 여러 번 결론에 도달했다가 다시 시작하는 인상.
- 제안(선택): 마무리 절 통합(120·130행), 소제목은 각 절의 새 정보를 반영하도록 조정.
- 영향: 없음 (주장 불변, 구조만).

### B5 — 서식: `---` 구분선 + 수동 줄바꿈 + 느슨한 목록
- `tuberculosis`: 절마다 `---`(50·58·90·118행), 항목 사이 빈 줄 있는 목록(35–41·107–113행), 문장 끝 두 칸 줄바꿈(19·22행 등)
- `ultrasound`: `---`(31·41·51·64·74·94·103행), 수동 줄바꿈(24·55·78·100행)
- `norovirus`: 절 사이 빈 줄 2개 다수, 166–168행 수동 줄바꿈
- 구분: **문체 판단** (서식). 렌더링은 되나 일관성 없음.
- 제안(선택): 문서 전반 서식 규칙을 정해 일괄 적용(별도 작업).
- 영향: 없음.

### B6 — 뉴스 3편 끝부분 마무리 절 다수
- `norovirus`: `### 요약하면`(164) + `## 한 문장으로 정리하면`(170)
- `tuberculosis`: `## 이 뉴스가 한국에서 중요한 이유`(120) + `## 마무리: …`(130)
- `ultrasound`: `## 요약`(14, 서두) + `## 마무리하며`(96) + `## 추가 정보`(105) + `## 덧붙여 생각해볼 점`(115) + 생존률 절(115 이후)
- 구분: **문체 판단** (구성).
- 제안(선택): 마무리 1개 + 필요한 부록 1개로 정리.
- 영향: 없음.

### 깨끗 (문체 항목 없음/극소)
- `ai-future-immunology-precision-medicine.mdx` — B3 형태 2회 외 특이사항 없음. 구성·헤지 양호(문체 관점 한정, 과학 검토는 별도).
- `2025-2026-flu-season-harder-than-usual.mdx` — 객관적 오류 없음. 거의 모든 문단에 볼드 1개 + B3 2회가 유일한 패턴(경계).

---

## C. 별도 과학·COI 검토 필요 (문체 감사와 분리, 수정 안 함)

- **`new/ultrasound-immune-oasis-cancer.mdx` 107–111행** — 뉴스 해설 중 저자가 "적절히 조절된 조건에서는 TLR4가 오히려 더 예측 가능하고 관리 가능한 수용체가 될 수 있다", "세포막에 존재하는 TLR4를 활용한 접근과의 비교 자료가 있었다면 이 연구의 설득력은 더 높아졌을 것"이라는 개인 견해를 삽입. 사이트 내 다른 글의 "면역조절 소재" 논의와 함께 이해관계·근거 확인 필요.
- **`new/hangover-metabolic-immune-neuro-model.mdx`** — 제목/설명이 "대사·면역·신경 통합 모델 / 장–간–뇌 축 / 신경염증"을 표방하나 본문은 이를 다루지 않고 정의·탈수·위장·대사성 산증·피로를 나열. 저자 개인 경험·추정 다수(102행 메탄올 영향 축소, 144행 한국/서양 음주 문화 대비). 내용·구성·근거 검토 별도.
- **A2 · A5의 제안 수정문** — 원문 재구성이므로 채택 전 저자 의도(과학적 주장 포함) 확인 필요.
- **`new/norovirus-…mdx` 90행** — "일조량 감소로 인한 비타민 D 저하는 장 점막 면역을 약화시키고"를 단정. 노로바이러스 계절성에서 비타민 D 기여는 가설 수준 — 근거 확인 권장.
- **`new/norovirus-…mdx` 115행** — ABO 혈액형별 감수성(O형 높음/B형 낮음) 서술. 노로바이러스 유전자형 의존적이며 본문도 일부 헤지("유전자형에 따라"). 확인 권장.
- (해결됨) `metabolism-immunity/…/postprandial-somnolence` 이전 판 `## 면역조절 소재와 식곤증` — 이번 세션 재작성으로 제거됨.

---

# docs / cancer-history — 상세 근거 (사용자 검토용, 2026-08-28)

검토 30편. **검토용 기록, 원본 미수정. 이번 세션에서 이 30편은 모두 미변경(다른 작업자 수정분 없음).**
이 섹션은 **medicine-history와 함께 사이트에서 가장 깨끗한 축**이다. 대부분 1차 문헌을 갖춘 의학사 서술이고, 객관적 오류는 캡션 오타·`<Figure>` 번호·참고문헌 누락에 몰려 있다.
과학·COI 우려는 `cancer-related-fatigue-inflammation` 1편에 집중된다(→ C).

## A. 객관적 항목

### A1 — 문장·캡션·고유명사 오류
- `001-earlist-record-of-cancer-imhotep.mdx` 17행 `### 생활면역` — H1 성격의 `## 암에 대한 가장 오래된 기록` 바로 아래에 카테고리명("생활면역")이 소제목으로 남음(템플릿 잔여물, 본문과 무관). 52행 캡션 `에드윈 스미가가 구입한`(→ 스미스가), `적해 있다`(→ 적혀 있다). 52행 캡션 "1862년" vs 55행 본문 "1858년" — 파피루스 구입 연도 글 안에서 불일치.
- `002-atossa-earliest-known-breast-tumor.mdx` 80행 `[https://en.wikipedia.org/wiki/Atossa` — 대괄호 안 닫힘, 참고문헌 링크 깨짐.
- `1775-chimney-sweep-children-george-brewster-occupational-cancer.mdx` 31행 캡션 `조지 브르스터의 명판`(→ 브루스터).
- `1927-radiation-therapy-carcinogenesis-history.mdx` 36행 `베르렐 등에 의한`(→ 베크렐 / Becquerel), `그뒤`(띄어쓰기).
- `1943-bari-raid-mustard-gas-and-chemotherapy-origin.mdx` 57행 alt `독일군 폭력에 위해서`(→ 폭격에 의해서), 60행 캡션 `폭격에 위해서`(→ 의해), 128행 `바라 항구`(→ 바리), 131행 `하리 항구`(→ 바리).
- `1948-sidney-farber-folate-antagonist-childhood-leukemia.mdx` — 최초 투여 환자를 61행 "8세 소년"으로 서술(→ C, 사서와 상충).

### A2 — `<Figure number>` / 헤딩 계층 / 매달린 부제
- `<Figure>`/`<FigureGroup>`가 파일에 하나뿐인데 `number={2}`로 매겨진 편 3건: `1907-history-of-radical-mastectomy.mdx`(43행), `1911-rous-sarcoma-virus-retrovirus-history.mdx`(86행), `1986-bailar-smith-progress-against-cancer.mdx`(기존 확인). 모두 `number={1}`이어야 함 — 동일 오류 패턴.
- `1907-…mdx` 86행 표는 "**1894년** … 홀스테드 논문 발표 … 근치적 유방절제술의 표준화"인데 제목·본문·`<Paper>`는 **1907년**을 대표 연도로 씀(둘 다 실존 논문이나 글 안에서 대표연도가 상충).
- `1977-tamoxifen-breast-cancer-history.mdx` 84행 `---` 구분선 뒤 `### 참고문헌`(H3) — 다른 소제목은 전부 H2. 계층 불일치.
- `1999-malmo-mammography-overdiagnosis-history.mdx` 31행 `### ― '말뫼 이야기'로 다시 읽는 과잉진단의 역사` — `## 유방암 조기 진단의 두 얼굴` 바로 아래 매달린 부제(em-dash 시작 H3). 본문에서 `<strong>`·`<b>` 혼용(36·46·60·62행).
- 다수 파일에서 `##` 소제목 앞 빈 줄 누락(`1911-rous`, `1976-src-ras`, `1941-papanicolaou`, `1943-bari`, `1965-blumberg`, `1998-herceptin` 등). 대부분 파서에서 렌더되지만 하우스 스타일과 어긋남.
- `1986-bailar-smith-…mdx` 119행 — 한 줄에 slug 2개(기존 확인).

### A3 — 참고문헌 절 없음
- `1927-radiation-therapy-carcinogenesis-history.mdx` — `status: "final"`인데 `## References`/참고문헌 절이 아예 없음(Muller 1927, Despeignes 1896, Freund 1897 등 인용 다수). 시행형 줄바꿈(유형 O)도 본문 전반.
- `cancer-related-fatigue-inflammation.mdx` — 참고문헌 절 없음. 31행 `생생리학적`(→ 생리학적). 본문 곳곳 느슨한 목록의 시행 줄바꿈(37–48행, 91–102행).

### A4 — frontmatter / 분류
- `cancer-related-fatigue-inflammation.mdx` — `section: "암과 만성염증"`. 나머지 29편은 전부 `section: "cancer-history"` — 섹션 내 유일한 불일치.

### A5 — 약한 참고문헌 (경계, 수정 대상 아님)
`001-imhotep`(브리태니커·위키), `002-atossa`(위키·브리태니커·Perseus), `1775-chimney-sweep`(길드 블로그·위키), `1986-bailar-smith`(온라인서점 책 링크 2건), `cancer-tumor-neoplasia-terminology`(교과서명, 연도 없음), `1998-herceptin`(1차 논문 2건뿐 — Ullrich·Coussens·Shepard·4D5·FDA 날짜·환자 수 등 다수 주장 미인용).

## B. 문체 판단 항목 (미확정 — 반복된다는 사실만으로 수정 대상 아님)

### B1 — 소제목이 완결 문장 (유형 K) — 이 섹션 최다 패턴
- `1953-gertrude-elion-6mp-…mdx` — 소제목 7개 전부 "~입니다"로 끝나는 평서문("작은 연구실에서 시작된 조용한 혁신입니다", "남아 있는 유산입니다" 등). 제목으로는 어색.
- `1965-baruch-blumberg-…mdx` — 소제목 8개 전부 "~입니다/~니다".
- `1775-chimney-sweep-…mdx` — 소제목 7개 전부 완결 평서문("낭만으로 소비된 직업, 현실은 달랐습니다" 등).
- `1976-src-ras-oncogene-history.mdx` — 소제목 대부분 완결 문장. `1948-sidney-farber` 31행 `## 메토트렉세이트의 출발점입니다`.
- `dna-sequencing-hgp-cancer-history.mdx` — 4개("인간 게놈 프로젝트는 기술의 가속기였다", "variant calling은 통계 문제다" 등).
- 구분: **문체 판단**. 개별로는 허용. 섹션 다수 파일이 동일 골격.

### B2 — 극적 콜론 부제 (유형 K)
- `1943-bari-raid-…mdx` — 소제목 9개 전부 "극적 문구: 부제" 형태("지옥이 열리다: …", "비극에서 싹튼 생각: …", "결론: 파괴의 현장에서 시작된 …").
- `1983-helicobacter-pylori-…`(기존), `1950-smoking-lung-cancer-…`("서막:", "결론:").

### B3 — 아포리즘 클로저 (유형 P) — 거의 전 파일
예: `1907-radical-mastectomy`("치료는 기술의 문제가 아니라, 질병을 어떻게 이해하느냐의 문제"), `1976-src-ras`("작은 변화가 큰 결과를 만든다는 사실은 두려운 메시지이기도 하지만, 동시에 … 희망의 근거"), `1943-bari`("겨자가스는 살상 무기였습니다. 그러나 … 역설적으로 암 치료라는 새로운 길"), `dna-sequencing`("DNA 서열은 답안지가 아니라 질문지입니다").
- 구분: **문체 판단**.

### B4 — "A가 아니라 B" / 역설 리프레임 (유형 F) — 한 글에 반복되는 편
- `1979-p53-…mdx` — "가속 페달이 아니라, 망가진 브레이크"가 45·57행 한 글에 2회.
- `1977-tamoxifen-…mdx` — 한 글에 3회("조직의 위치가 아니라 분자적 의존성", "\"얼마나 공격적으로 제거할 것인가\"에서 \"어떤 신호를 차단할 것인가\"로", "단순한 오래된 항암제가 아니라 … 출발점").
- `dna-sequencing-…mdx` — 33·268행 "현미경이 세포 모양을 보여주었다면, 시퀀싱은 …" 반복 + "단순하게 만든 것이 아니라 더 정확하게 복잡하게".
- `1927-radiation-therapy` — "이중성/이중적" 프레임이 글 전체를 4회 이상 구조화(경계 → 명확 쪽).

### B5 — 위인전 상투어 (교차 파일)
- `집요한 관찰 / 집요한 질문 / 집요한 연구 / 집요한 질문과 임상적 용기` — `1941-papanicolaou`(53·59행), `1948-sidney-farber`(81행), `1911-rous`(142행), `1998-herceptin`(29·99행).
- `우연한 발견, 집요한 연구, 냉소적인 시선, 그리고 … 환자들의 목소리`류 3~4항 병렬(유형 D) — `1998-herceptin` 29·99행에 거의 동형 반복(한 글 안 중복).

### B6 — 전면 시행형 줄바꿈 (유형 O) — 명확에 가까움
`1927-radiation-therapy`, `1977-tamoxifen`, `1998-herceptin`, `1911-rous` — 본문 대부분이 문장 끝 두 칸 강제 줄바꿈.

### 깨끗 (문체 항목 적음/없음)
- `immune-surveillance-history.mdx` — **모범적**. 1차 문헌 7건(Burnet 1957, Prehn·Main, Stutman 1974, Shankaran 2001, Dunn·Schreiber 2004 등).
- `1999-malmo-mammography-overdiagnosis-history.mdx` — **모범적**. USPSTF 2024·IARC 2023·NHS·Cochrane·Gøtzsche, 수치 정밀, 헤지 최상급.
- `1979-p53-guardian-of-genome-history.mdx` — 1차 문헌 6건(Lane·Crawford 1979, Linzer·Levine, DeLeo, Baker 1989, Malkin 1990, Lane 1992), 타임라인 표.
- `1983-cancer-epigenetics-history.mdx` — 1차 문헌 5건, 헤지 양호.
- `1983-hpv-cervical-cancer-history.mdx` — 1차 문헌 5건(Dürst·zur Hausen 1983 등), 정확.
- `1971-angiogenesis-judah-folkman-history.mdx` — 1차 문헌 5건, "승리담으로만 읽기 어렵다" 방어절.
- `dna-sequencing-hgp-cancer-history.mdx` — 1차 문헌 8건, 기술적으로 치밀(B4·K 외 특이사항 없음).
- `2000-hallmarks-of-cancer-history.mdx`, `2024-thyroid-cancer-overdiagnosis-korea.mdx`, `1950-smoking-lung-cancer-doll-hill.mdx`, `1971-war-on-cancer-nixon-history.mdx`, `cancer-tumor-neoplasia-terminology.mdx`(참고문헌만 약함) — 특이사항 없음.

## C. 별도 과학·COI 검토 필요 (문체 감사와 분리, 수정 안 함)

- **`cancer-related-fatigue-inflammation.mdx` 99–102행** — 암 환자에게 "상류 면역증강 전략" / "면역증강제"를 권고. 사이트 전반의 저자 편집적 논지(비염증성 선천면역·탐식작용 활성 보조제)와 연결된 임상적 주장. 참고문헌 절도 없음. 근거·이해관계 별도 감사 권장.
- **`1948-sidney-farber-…mdx` 61행** — 아미노프테린 최초 투여 환자를 "8세 소년"으로 서술. 여러 사서(예: Mukherjee)는 2세 전후 유아(Robert Sandler)로 기술. 확인 필요.
- **`1998-herceptin-…mdx` 60행** — "허셉틴 = HER2 + perception(지각)" 어원을 단정. 흔히 인용되나 확정된 명명 근거 아님. 참고문헌 2건뿐으로 다수 서술 미검증 — 확인 권장.
- **`1999-malmo-mammography-…mdx` 62행** — 곤도 마코토(近藤誠)의 '착한 암/나쁜 암' 개념을 긍정적으로 인용. 인물의 논쟁적 위치 고려해 맥락 검토.
- **`1907-history-of-radical-mastectomy.mdx` 표(86행)** — 홀스테드 대표연도 1894 vs 1907 정합성(A2와 동일 건, 과학사 서술 관점에서 재확인).

---

# docs / immunology — 상세 근거 (사용자 검토용, 2026-08-28)

검토 38편(하위 폴더 `hsp/` 6편 포함). **검토용 기록, 원본 미수정. 이번 세션에서 38편 모두 미변경.**
이 섹션은 **두 층으로 갈린다.** ① `section: "immunology"` 계열 역사·개관 글과 `hsp/` 6편은 1차 문헌 4~8건 + 헤지가 모범적이다. ② `section: "NF-kB"` 클러스터와 번호 붙은 `면역 기초` 교육 시리즈는 참고문헌이 없고, "A가 아니라 B" 리프레임이 글 전체를 지배하며, 저자의 면역증강제 논지로 수렴한다(→ C).

## A. 객관적 항목

### A1 — 참고문헌 절 없음 / 극빈
- `## 참고문헌` 절 자체가 없는 편(7): `allergy-immune-misdirection-th2`, `helper-t-cell-differentiation-adaptive-immunity`, `immune-cells-overview-for-beginners`, `immune-response-to-gram-negative-bacteria`, `pathogen-recognition-and-phagocytosis`, `wound-healing-immunology-phases`, `tumor-microenvironment-immune-response` (전부 번호 붙은 `면역 기초` 시리즈).
- `## 참고문헌` 절 없음(3): `lps-tlr4-chronic-inflammation-disease-modifier`(`status: "final"`, DAMP 근거등급 표까지 있음), `lps-tlr4-inflammation-initiation-resolution`, `lps-tlr4-innate-immunity-signal`.
- 단일 교과서/평문: `antigen-presentation-in-lymph-node` — `### 참고자료`에 "쿠비 면역학 8판" 한 줄(H3). `cd8-t-cell-cytotoxic-immunity` — 교과서 3권, 판·연도·링크 없음. `what-is-complement-innate-immunity` 71행 — `참고문헌`이 `##` 없는 평문 줄.
- 참고문헌 1건: `galectin-9-tim3-immune-switch`(Zhu 2005만), `immune-checkpoint-inhibitor-autoimmunity`(Postow 2018만) — 둘 다 미인용 구체 주장 다수.

### A2 — 참고문헌 오류
- `a20-negative-feedback-nfkb.mdx` 99행 — ref 3: "Vereecke et al. … *Journal of Experimental Medicine* … 2009"인데 붙은 DOI `10.1016/j.it.2009.05.007`는 *Trends in Immunology*. 제목·저널·DOI 불일치.

### A3 — 깨진 마크다운 / 컴포넌트 / 문장 붕괴
- `nfkb-immunology-introduction.mdx` 100행 — ResearchGate `.gif`를 외부 핫링크 `![URL](URL)`로 삽입(alt가 URL 자체). 사이트에서 렌더 안 됨. 137행 `**NIK*(NF-κB-inducing kinase)` — 별표 불일치(`**` 열고 `*` 하나로 닫음). 96·102행 `canoical`(→ canonical).
- `galectin-9-tim3-immune-switch.mdx` 20행 — "이러한 면역반응은 결국 자기 항원에 대해서도 항원제시가 시작되기 때문에 면역반응을 억제하고, 면역 반응의 목표가 …" 주술·논리 붕괴. 37행 `이 방식의 싸움은 더 이상 이롭지 않다` — 마침표 없이 홀로 뜬 조각 문단(누락된 소제목/인용부호로 보임).
- `lps-tlr4-innate-immunity-signal.mdx` 40행 — `**거짓 양성(false positive)”의 위험이…` — `**`로 열고 곡선따옴표 `”`로 닫아 굵게 처리 깨짐. 85행 캡션 `GRA의 구조`(→ GLA, 98행 본문은 GLA).
- `tolerogenic-memory-treg-immune-regulation.mdx` 47–74행 — 나머지 본문과 톤·서식이 급변하는 삽입 블록(`### 1. 억제성 사이토카인` … `### 4. 직접적인 세포 살해` + 요약표 2개). "'연료'를 빼앗거나 '독성 물질'을 살포", "'입막음' 전략", "스펀지처럼 흡수" 등 이질적 전투 비유 나열체. `### 1.` 번호가 한 문서에서 두 번 리셋(35행 "핵심 메커니즘", 48행 "억제성 사이토카인"). 65행 `Granyzme`(→ Granzyme). 123–129행 `<RelatedPosts>` 들여쓰기 깨짐.
- `treg-from-discovery-to-cancer-and-autoimmune-therapy.mdx` — `updated` 필드 없음. 106행 RelatedPosts 첫 slug 앞 공백. 전면 시행형 줄바꿈(O).
- `immune-checkpoint-inhibitor-autoimmunity.mdx` — `updated` 필드 없음.

### A4 — 본문 목록을 문장으로 뭉침 (반복 습관)
`immune-cells-overview-for-beginners`, `immune-response-to-gram-negative-bacteria`, `helper-t-cell-differentiation`, `tumor-microenvironment-immune-response` 등 `면역 기초` 여러 편 — "다음과 같습니다.\n항목1이고, 항목2이며, 항목3입니다." 형태로 목록을 산문에 뭉쳐 씀.

### A5 — frontmatter / section 분류 혼란
- 한 폴더(`immunology/`)에 `section` 값 5종: `"immunology"`, `"면역 기초"`, `"NF-kB"`, `"류마티스 관절염"`, `"hsp"`. `galectin-glycan-immune-tolerance`·`galectin-9-tim3-immune-switch`는 갈렉틴/글리칸 글인데 `section: "NF-kB"`.
- `1994-whitesell-hsp90-oncogenic-transformation.mdx` — `category: "암의 역사"`(나머지 `hsp/` 5편은 `"면역학"`).
- 제목 앞 번호 프리픽스("01." … "07.", "01-1.", "01-2", "02.")가 `면역 기초`·`NF-kB` 시리즈에 붙되 `01-2`만 마침표 없음.

## B. 문체 판단 항목 (미확정 — 반복 자체로 수정 대상 아님)

### B1 — "A가 아니라 B" 리프레임(유형 F)이 글 전체를 지배 — NF-kB 클러스터 공통 골격
- `nrf2-post-inflammation-cellular-choice` — **가장 강한 사례.** 소제목 7개 전부 F/K형("NRF2는 염증을 '억제'하기 위해 켜지지 않는다", "면역 반응이 약해지는 것이 아니라, 세포가 버티기로 전환된다") + 아포리즘 블록쿼트 3회 + 의인화("세포가 스스로에게 내리는 선언").
- `phagocytosis-immune-reprogramming` — F 7회 이상("단순한 결과가 아니라 신호", "수동적인 억제가 아니라 전환", "실패나 반대 개념이 아닙니다") + "공격자에서 정리자로" 의인화.
- `immune-checkpoint-inhibitor-autoimmunity` — 소제목 전부 수사의문/단정("암은 사라지는데, 왜 몸이 망가질까", "이것은 실패인가, 아니면 대가인가") + F가 글 전체 구조 + 블록쿼트 아포리즘 2회.
- `treg-from-discovery-…` — F 다수 + 블록쿼트 5회 + "브레이크" 은유 반복.
- `galectin-9-tim3` — 짧은 글에 F 4~5회("억제가 아니라 전환", "종료 신호라기보다 전략 변경 신호", "실패가 아니라 전략적 전환")가 유일한 전개 장치.
- `tolerogenic-memory`, `allergy-immune-misdirection-th2`, `helper-t-cell`, `cd8-t-cell`, `cytokine-storm` 등도 F 다수.
- 구분: **문체 판단**. 개별로는 타당. 시리즈 전체가 동일 골격 → daily-immunity B2와 같은 지적.

### B2 — 교차 파일 반복 클로저·문구
- "면역은 필요한 반응을 정확히 유도하고, 역할을 마친 뒤 적절히 종결시키는 조절의 시스템" 류 거의 동형 클로저 — `helper-t-cell`, `allergy`, `cd8-t-cell`, `cytokine-storm`, `wound-healing`, `tumor-microenvironment`.
- "면역의 브레이크를 언제·어디서·얼마나 밟을(풀) 것인가" — `immune-checkpoint-inhibitor`, `treg-from-discovery`, `galectin-9`.
- "~의 언어로 번역/바꿨다" — `dendritic-cells`("적응면역의 언어로 번역"), `lps-tlr4-inflammation-initiation-resolution`("지질 언어", "마무리 짓는 언어"), `rheumatoid-arthritis`("사이토카인이라는 언어"), `1974-tissieres`("단백질 합성의 언어"). lps-saga·metabolism-immunity와도 연결(기존 지적).
- "톤(tone)" 은유 — `galectin-glycan`, `galectin-9`, `lps-tlr4-inflammation-initiation-resolution`.

### B3 — 의인화(유형 Q)
"면역계는 공격보다 종료를 더 정교하게 설계했다"(a20), "CD8 T세포는 MHC I을 읽습니다"(cd8), "세포가 스스로에게 내리는 선언"(nrf2), "면역계가 스스로에게 보내는 종료 신호"(phagocytosis). 교육 맥락에서 흔하나 NF-kB 클러스터에서 빈도 높음.

### B4 — 초장문 `<Figure caption>` (유형 O)
`lps-tlr4-inflammation-initiation-resolution` 49행(~200단어), `nrf2` 28행(~180단어), `phagocytosis-immune-reprogramming` 17행(~150단어) — 캡션 안에 본문 한 단락을 통째로 넣음.

### B5 — 블록쿼트를 아포리즘 풀quote로
`nrf2`(3회), `immune-checkpoint-inhibitor`(2회), `treg-from-discovery`(5회), `tolerogenic-memory`(1회). "> 지금은 더 싸울 때가 아니라, 살아남아야 할 때다." 류.

### B6 — 소제목이 완결 문장(유형 K)
NF-kB 클러스터 전반 + `cd8-t-cell`("처음부터 킬러는 아닙니다"), `allergy`, `lps-tlr4-innate-immunity-signal` 등.

### 깨끗 (문체 항목 적음/없음)
- **`hsp/` 6편 전부** — 1차 문헌 중심(각 2~7건), 헤지 모범. `1994-srivastava`("왜 조심해서 읽어야 하나" 절, LPS 오염 caveat), `heat-shock-protein-stress-immunity-history`(오염 논쟁 처리). 사이트에서 가장 정제된 묶음.
- `rheumatoid-arthritis-cytokine-pathogenesis-history` — 1차 문헌 8건(Dayer 1977×2, Beutler/Cerami 1986, Tracey 1987, Brennan 1989, Elliott 1994 등), Dayer→Feldmann 흐름 치밀.
- `microbiome-immune-axis` — 1차 문헌 4건, "연관이 곧 원인은 아니다" 헤지 모범. **면역증강제/제품 홍보로 빠지지 않음**(대조적).
- `psychoneuroimmunology-stress-immunity` — 1차 문헌 4건, "환자에게 책임을 돌리지 않기" 절 모범.
- `cytokine-storm-overreaction-history`, `dendritic-cells-ralph-steinman-history`, `evolution-of-immunity-rag-gene-history`, `gender-differences-in-immunity-x-chromosome`, `immune-privilege-brain-eye-testis`, `pregnancy-and-immune-tolerance-mystery` — 각 1차 문헌 4건, 정확·헤지 양호.
- `immunity-and-immunity-power-as-metaphor` — 1차 문헌 4건, 은유론 에세이로 타당(전면 시행형 줄바꿈 O + RelatedPosts는 C 참조).
- `nfkb-immunology-introduction`, `nrf2`, `phagocytosis-immune-reprogramming` — 참고문헌은 실재(3~4건). 문체(B)만 무거움.

## C. 별도 과학·COI 검토 필요 (문체 감사와 분리, 수정 안 함)

- **NF-kB / LPS 클러스터가 저자 편집적 논지로 수렴.** `lps-tlr4-innate-immunity-signal.mdx` 76–110행이 가장 노골적 — MPLA/MPL을 "안전하고 좋은 Th1면역증강제"로 서술("GSK를 단숨에 백신의 첨단 회사로 만들었습니다", "꽃가루 알레르기용 백신에도 사용" 등 미인용 구체 주장), "이것보다 더 안전하고 경구용 투여가 가능한 물질이 필요"→ P-LPS/A-LPS, *Bacteroides dorei*, "사균체에서 A-LPS만 농축한 제품으로 판매될 가능성이 매우 높습니다"로 이어짐(참고문헌 없음). 같은 논지: `helper-t-cell`(55행 Th1>Th2 단정, 65–71행 콜리독소=LPS→MPLA), `wound-healing`(15–19행 M1>M2·Th1>Th2 교육), `pathogen-recognition`(52–56행 "모든 면역은 탐식작용의 보조 수단"), `phagocytosis-immune-reprogramming`(60행 "염증 없이도 면역력 유지"), `lps-tlr4-chronic-inflammation`(102행 "탐식 촉진 접근이 피로·악액질 완화"). daily-immunity·cancer-history C와 동일 축. 이해관계·근거 수준 별도 감사.
- **`what-is-complement-innate-immunity.mdx` 51–65행** — 보체 해설이 효모/버섯 베타글루칸, 비타민 D, 상품명(웰뮨/Wellmune, Biothera, PGG-glucan, Odetiglucan)으로 확장. "가설은 비교적 설득력이 있습니다"로 헤지되나 제품·성분 서술 검토.
- **`galectin-9-tim3` / `immunity-and-immunity-power-as-metaphor`** — RelatedPosts가 `how-to-choose-immune-booster-mechanism`·`immune-booster-characteristics-mechanism`(저자의 면역증강제 선택 가이드)로 연결. "면역력은 은유"라고 논한 글이 면역증강제 가이드로 링크되는 구성 검토.
- **`immune-checkpoint-inhibitor-autoimmunity.mdx` 52행** — "면역 관련 부작용이 발생한 환자일수록 암 치료 반응이 더 좋은 경우가 많다"를 단정하나 참고문헌 1건뿐. irAE–반응 상관은 연구마다 편차 — 확인 권장.
- **엔도좀 "이중막" 오류(반복)** — `pathogen-recognition-and-phagocytosis.mdx` 31행 / `immune-response-to-gram-negative-bacteria.mdx` 57행 — "세포질과 엔도좀이 이중막 구조로 분리"라고 서술. 엔도좀은 단일막. 두 글에 반복되는 개념 오류.
- **`helper-t-cell-differentiation-adaptive-immunity.mdx` 69–71행** — "콜리의 독소의 핵심 성분이 LPS임이 밝혀졌고" — 단순화(콜리 독소는 가열사균 혼합물; LPS 단일 활성성분 서술은 과함). 확인 권장.

---

# docs / critics — 상세 근거 (사용자 검토용, 2026-08-28)

검토 42편(하위 폴더 5개: `alternative-medicine-health-marketing/` 23 · `cancer-chronic-inflammation/` 3 · `everyday-immunity-misconceptions/` 8 · `research-statistics/` 6 · `testing-diagnosis/` 2). **검토용 기록, 원본 미수정. 이번 세션에서 42편 모두 미변경.**

이 섹션은 **구조적 정합성 문제**가 있다. "대체의학과 건강상술 비판"으로 표방되지만 두 이질적 유형이 섞여 있다.
① **근거를 갖춘 스켑틱 글**(belgium-herb, 2016-adrenal-fatigue, placebo, hygiene-hypothesis, immune-tests, smith-glass, cancer-statistics 등) — 1차 문헌·EFSA·코크란 인용, 균형 양호.
② **저자 자신의 "면역증강제" 제품군을 옹호하는 글** — `how-to-choose-immune-booster-mechanism` 등 3편은 참고문헌 0건에 `status: "final"`, 구체적 미검증 효능 주장. 타사 보충제는 RCT 기준으로 엄격 비판하면서 자기 카테고리에는 같은 잣대를 적용하지 않는다(→ C, 이 섹션 최우선 쟁점).

## A. 객관적 항목

### A1 — 참고문헌 절 없음 (15편)
- `alternative-medicine-health-marketing/`: **`how-to-choose-immune-booster-mechanism`, `immune-booster-characteristics-mechanism`, `immune-products-classification-booster-support`** (3편 모두 `status: "final"`, 구체적 효능·용량 주장 다수), `adrenal-fatigue-hpa-axis-chronic-fatigue`, `grape-juice-cancer-prevention-critique`, `food-drug-boundary-and-functional-food`, `omega3-cardiovascular-clinical-trials`.
- `cancer-chronic-inflammation/`: `cancer-cachexia-inflammation`, `causes-of-cancer-chronic-inflammation`.
- `everyday-immunity-misconceptions/`: `how-to-improve-immunity-realistic`, `long-covid-tlr4-innate-immunity`, `atopic-dermatitis-immune-balance`, `microbiome-from-gut-bacteria-history`.
- `research-statistics/`: `who-manipulated-fake-randomness-coin-runs`.

### A2 — 참고문헌 서지정보 부실 (경계)
- `sod-supplement-scientific-limitations`, `spermidine-supplement-effectiveness`, `vitamin-supplements-effect-illusion`, `hormone-replacement-therapy-effect-illusion`, `reverse-causality-in-health-research`, `product-effect-cognitive-pattern`, `medical-testing-incidental-findings`, `overselling-microbiome-award` — 저자·제목·저널만, 연도·권·호·링크 없음.
- `clinical-judgment-vs-statistical-model` — 참고문헌 1건(Leli/Filskov 1981)뿐인데 Faust·Einhorn·DeVaul·APACHE II/III/IV·텍사스/시카고 의대 등 다수 연구 인용. 110행 `Journal of Clinical Psychobgy`(→ Psychology) 오타.
- `melatonin-supplement-brain` 88행 — ref 2 URL 뒤 `Digital` 잔여 문자열.

### A3 — 깨진 마크다운 / 문장 붕괴 / 오타
- `lycopene-health-benefits-evidence` 99행 · `product-effect-cognitive-pattern` 75행 — `#<RelatedPosts` (JSX 컴포넌트 앞에 `#`). daily-immunity `omnivory`와 동일 오류.
- `reverse-causality-in-health-research` 65–66행 `같은 변화가 나타날 수 있습니다.`(고아 조각 문단) / 77–78행 `를 동시에 변화시킵니다.`(조사 `를`로 시작 — 편집 중 앞부분 삭제). 문장 붕괴 2건.
- `vitamin-supplements-effect-illusion` 76행 `의학이 실패証明한` — 한자 `証明` 혼입(→ 증명).
- `smith-glass-1977-psychotherapy-meta-analysis` 77행 `그 뒤로오`, 84행 `시각마져`(→ 마저).
- `sod-supplement-scientific-limitations` 29행 `Supoeroxide`, 37행 `SOD의 분해될 수 밖에`, 87행 `이것은 잘못된 전혀 다릅니다`(비문).
- `how-to-identify-pseudoscience` 91행 `장 정소설`(→ 장 청소설, 79행은 맞음). 14·23행 `##` 뒤 두 칸 공백.
- 본문 첫머리에 `##` 두 개 연속(제목 반복 + 부제): `product-effect-cognitive-pattern`, `vitamin-supplements-effect-illusion`, `hormone-replacement-therapy-effect-illusion`, `melatonin-supplement-brain`, `medical-testing-incidental-findings`, `atopic-dermatitis-immune-balance`.
- `product-effect-cognitive-pattern` 2행 제목 `한느가?`(→ 하는가).
- `liver-detox-gallbladder-flush-myth-origin` 48행 `이 장치는생리학적`(붙임). `<Figure number={3}>`인데 파일에 fig 1·2 없음.
- `food-drug-boundary-and-functional-food` — 소제목 번호가 `## 2.` `## 3.` `## 4.` `## 10.`만 존재(1·5~9 없음), 번호 없는 `##`와 혼재.
- `who-manipulated-fake-randomness-coin-runs` 15·17행 `#` H1 + 매달린 `##` 부제. 240행 `# 20번 던질 때 4연속…` — 본문 중간 H1(다른 절은 전부 `##`).
- `atopic-dermatitis-immune-balance` 14행 `#` H1 + 16행 `###` 매달린 부제.
- `thymosin-alpha1-damp-immunology` — 본문에 `(1)` `(5)` 인용 번호를 쓰지만 참고문헌 목록은 번호 없는 나열(불일치).

### A4 — frontmatter / 분류 대혼란
- `critics/` 폴더 전체에서 `category` 값이 5종 혼재: `"critics"`, `"면역학"`, `"면역과 영양학"`, `"암의 역사"`, `"생활면역"`.
- `everyday-immunity-misconceptions/` 8편 **전부** `category: "생활면역"` / `section: "생활면역"` — critics 표시 전무.
- `alternative-medicine-health-marketing/`의 booster·thymosin 4편은 `category: "면역학"`.
- `section` 값 3종 이상: `"대체의학과 건강상술"`(대다수), `"대체의학과 건강마케팅"`(`2026-vegetable-nitrate` 하나만), `"연구와 통계"`, `"검사와 진단"`, `"생활면역"`.
- `order` 필드 — `alternative-medicine-health-marketing/` 23편 중 대다수가 `order: 1` (정렬 불가).
- `how-to-improve-immunity-realistic`·`long-covid-tlr4-innate-immunity`·`allergic-rhinitis-foods-immunity`·`atopic-dermatitis-immune-balance`·`microbiome-from-gut-bacteria-history` — `category`/`section` 모두 `"생활면역"`이고 폴더와 불일치(내용도 비판이 아님 → C).

### A5 — 연도 / 중복
- `vitamin-c-anticancer-mechanism-revisited` — 본문에서 6회 이상 "2016년 연구"라 지칭하나 1차 연구는 Yun et al. *Science* **2015**(참고문헌 1). 2016(Van Der Reest/Gottlieb)은 해설 논문.
- `lycopene-health-benefits-evidence` 61행 "2007년 발표된 대규모 연구"라 하나 참고문헌 1은 Kristal **2011**(PCPT).
- `2016-adrenal-fatigue-scientific-critique` (order 2016) vs `adrenal-fatigue-hpa-axis-chronic-fatigue` (order 3) — 주제와 인용이 겹치나, 전자는 논문 설명글·후자는 비판 글로 **별도 유지 결정**. 후속 편집에서 역할 차이를 도입부·결론에 더 분명히 표시한다.

## B. 문체 판단 항목 (미확정)

### B1 — 전면 시행형 줄바꿈(유형 O) + 절마다 `---` 구분선
`how-to-identify-pseudoscience`, `sod-supplement-…`, `spermidine-supplement-…`, `omega3-cardiovascular-clinical-trials`(절마다 `---` ~10개), `how-to-improve-immunity-realistic`, `vitamin-supplements-effect-illusion`, `hormone-replacement-therapy-effect-illusion`, `melatonin-supplement-brain`, `reverse-causality-…`, `who-manipulated-…`. **명확에 가까움.**

### B2 — 블록쿼트를 아포리즘 풀quote로
`atopic-dermatitis-immune-balance`("핵심 정리"), `smith-glass-…`("핵심 정리 문단"), `who-manipulated-…`. 짧은 문장을 의도적 줄바꿈으로 강조하는 습관도 `product-effect`·`vitamin-supplements`·`hormone-replacement`에 반복.

### B3 — "X는 A가 아니라 B" 리프레임(유형 F)
거의 전 파일("검사 자체를 믿을 수 없다는 뜻은 아니지만…", "가짜 약일 수 있지만… 가짜라고 부르는 것은 부정확", "치료 자체가 아니라 해석 방식"). 스켑틱 장르 특성상 자연스러움 — **문체 판단**.

### B4 — 저자 1인칭 권위·경험 삽입
- `sod-supplement-…` 82–83행 `## 전문가?` 절 — "저는 활성산소에 대해서는 좀 자세히 알고 있는 사람입니다. 활성산소를 가장 초기에 연구한 연구팀에서 공부했으며…".
- `echinacea-immunostimulant-evidence-lps` 70행 — "개인적으로는 이러한 접근이 … 현실적인 면역 조절 전략이 될 가능성도 있다고 생각합니다".
- `allergic-rhinitis-foods-immunity` 72·84행 — "개인적인 경험으로는", "지금은 … 생각합니다".
- `cancer-statistics-prevention-alternative-medicine` 14–16행 — "저희는 통계학이나 예방의학의 전문가 집단이 아닙니다 … 일반인의 관점에서의 관찰 기록".

### B5 — 유튜브 채널·인물 실명 겨냥
`grape-juice-cancer-prevention-critique`(약들약), `overselling-microbiome-award`(데이비드 펄머터·조셉 머콜라·마틴 블레이저), `how-to-identify-pseudoscience`(닐 버나드/PCRM), `liver-detox-…`(훌다 클라크·안드레아스 모리츠), RelatedPosts `doctor-youtube-supplement-vascular-health-critique`. 대체로 근거 제시가 동반되나 톤·표적 검토 권장.

### 깨끗 (문체 항목 적음, 근거 견고)
- `belgium-herb-nephropathy-thmpd-novel-food` — 1차 문헌 6건(Grollman 2016 EMBO Rep, EMA, Directive 2004/24/EC, Reg 2015/2283), 균형·정확. **모범.**
- `2016-adrenal-fatigue-scientific-critique` — Cadegiani/Kater 2016 + Tate 2022 원문 제시, 헤지 모범.
- `placebo-effect-real-or-fake` — 1차 문헌 6건(Benedetti 2005, Hróbjartsson/Gøtzsche 코크란 2010, Kaptchuk 2010 등).
- `hygiene-hypothesis-still-valid` — 1차 문헌 4건(Strachan 1989 BMJ, Rook 2013 PNAS 등), 제품 유도 없음.
- `2026-can-immune-tests-really-show-your-immune-status` — 1차 문헌 3건(AAAAI, Bonilla 2015 Practice Parameter), NK/IgG/사이토카인 정확(33행 건기식 예시는 C).
- `smith-glass-1977-…`, `cancer-statistics-prevention-…`, `vitamin-c-anticancer-…`(연도 제외), `lycopene-…`(연도 제외), `2026-vegetable-nitrate-…`, `overselling-microbiome-award` — 참고문헌 실재, 내용 견고.

## C. 별도 과학·COI·구성 검토 필요 (이 섹션의 핵심 쟁점)

- **`critics/` 폴더가 저자 자신의 "면역증강제" 카테고리를 홍보하는 글을 포함한다 — 이중 잣대.**
  타사 보충제(에키네시아·베타시토스테롤·SOD·스퍼미딘·비타민C·포도주스·라이코펜·부신피로 보충제·오메가3)는 EFSA·코크란·RCT 기준으로 엄격히 비판. 반면 저자의 "면역증강제"(베타글루칸·후코이단·감마PGA·버섯다당체·BioBRB·MGN-3·진산)는:
  - 전용 옹호글 3편(`how-to-choose-immune-booster-mechanism`, `immune-booster-characteristics-mechanism`, `immune-products-classification-booster-support`)이 **참고문헌 0건**에 `status: "final"`.
  - 구체적·미검증 임상 주장: "알레르기 비염 … 섭취 후 30분 이내 증상 완화, 몇 시간 지속"(`immune-booster-characteristics` 73행), "60세 이상이면 평소 상시 섭취가 가장 효율적"(85행), "숙취 다음날 컨디션 / 반려동물·양돈 사용 여부로 가성비 판단"(`how-to-choose` 44–58행).
  - `allergic-rhinitis-foods-immunity` — 일반 식품·민간요법(지골피·배)을 먼저 기각한 뒤 "실제로 효과가 확인된 것은 면역증강제 계열"(77행)로 유도하는 애드버토리얼 구조. 인용 4건(Talbott 2013 등)은 비염 RCT급 근거 아님.
  - 각 글 말미 논지 삽입: `cancer-cachexia-inflammation`(52–55·74–76행, FAQ Q3 "면역증강제가 악액질에 도움"), `causes-of-cancer-chronic-inflammation`(52행), `atopic-dermatitis-immune-balance`(71행), `thymosin-alpha1-damp-immunology`(64행), `echinacea-immunostimulant-evidence-lps`(68–70행), `how-to-improve-immunity-realistic`(79–86행: 4단계 = "면역증강제의 영역").
  - **이 사이트 자신의 `2026-vegetable-nitrate-and-health-marketing` 33행이 정확히 이 구조를 비판함** — "생리학을 설명하는 사람이 동시에 관련 제품을 판매하고 있다면 … 시장을 설계하는 사람". 자기 적용 필요.
  - `immunology` 섹션의 `galectin-9-tim3`·`immunity-and-immunity-power-as-metaphor`도 이 3편으로 링크.
  - **이해관계 공개·근거 수준·`critics` 분류 적절성 별도 감사 권장.**
- **`how-to-identify-pseudoscience` 34행** — "COVID-19 백신 … 정말로 위험했다고 말하는 과학자들은 거의 없습니다", "더 큰 위험을 위해서는 어쩔 수 없었다" 단정. 사이비 판별 글의 논지로는 타당하나 표현 강도 검토.
- **`clinical-judgment-vs-statistical-model` 64–99행** — 통계 vs 임상판단 주제가 입학사정관 제도·조국 사태·한국 민주주의론으로 확장. 정치적 입장이 강하고 참고문헌 1건뿐. 과학·정치 논평 분리 검토.
- **`food-drug-boundary-and-functional-food` 149행** — "개념적으로 약과 식품을 구분하는 사람은 … 진정한 과학자라고 보기 어렵다" — 의사·약사 겨냥 ad hominem. 참고문헌 절 없음.
- **`causes-of-cancer-chronic-inflammation` 46행** — "탄수화물 섭취 비중이 지나치게 높고 단백질·지방 섭취가 부족한 구조"를 한국 식단의 핵심 암 위험으로 제시. 논쟁적 영양 주장, 참고문헌 없음.
- **`long-covid-tlr4-innate-immunity` / `adrenal-fatigue-hpa-axis-chronic-fatigue` / `2016-adrenal-fatigue`** — SARS-CoV-2 스파이크→TLR4→만성 신경염증을 확립된 사실처럼 서술("가능성이 크다" 반복하나 인용 부실/없음). 저자 TLR4 논지 — 근거 수준 확인 권장.
- **최신 데이터 글(지식 컷오프 이후)** — `2026-can-immune-tests-…`, `2026-vegetable-nitrate-…`(Tan 2024 Nutrients는 실재). 수치·결론 원문 확인.

---

# docs / lps-saga — 상세 근거 (사용자 검토용, 2026-08-28)

검토 44편(하위 5개: `overview/` 1 · `early-history/` 5 · `immune-polysaccharides/` 8 · `disease-impact/` 20 · `tlr4-signaling-adjuvants/` 10). **검토용 기록, 원본 미수정. 이번 세션 44편 모두 미변경.**

**이 섹션은 사이트에서 근거가 가장 탄탄하다.** 거의 모든 글이 `<Paper>` 프론트매터(DOI/PMID) + 1차 문헌 2~9건을 갖춘 단일/복수 논문 심층분석이고, 특히 `disease-impact/` 20편의 헤지("원인 아닌 증폭기", "관찰연구", "확증 단계 아님")는 모범적이다. 문체도 절제적이다(F-리프레임이 NF-kB/critics 클러스터보다 훨씬 적음). 문제는 (1) frontmatter 위생, (2) 편집 잔여물, (3) 섹션 전체가 저자의 LPS·면역증강제 논지의 과학적 토대로 기능한다는 구성 차원(→ C).

## A. 객관적 항목

### A1 — slug ≠ 파일명 (10편 이상)
- `early-history/1998-tlr4-discovery-lps-sepsis.mdx` → `slug: "lps-sepsis-innate-immunity"`
- `immune-polysaccharides/2022-polysaccharide-tlr4-3d-interaction-model.mdx` → `slug: "polysaccharide-tlr4-3d-interaction-model-2022"`
- `disease-impact/2007-metabolic-endotoxemia-cani.mdx` → `slug: "metabolic-endotoxemia-cani-2007"`
- `disease-impact/2024-akkermansia-good-gram-negative-docent.mdx` → `slug: "2024-akkermansia-muciniphila-good-gram-negative"`
- `disease-impact/2007-tilg-nafld-gut-liver-axis.mdx` → `slug: "2007-tilg-day-management-alcoholic-liver-disease"` — **게다가 파일명은 "nafld"인데 내용은 100% 알코올성 간질환(ALD)**.
- `disease-impact/2009-tenascin-c-tlr4-midwood-arthritis.mdx` → `slug: "tenascin-c-tlr4-midwood-arthritis"`
- `disease-impact/2017-trimethylamine-n-oxide-tmao-cvd-gut-microbiota.mdx` → `slug: "2017-tmao-dose-response-meta-analysis"`
- `disease-impact/2019-trimethylamine-n-oxide-tmao-platelet-hyperreactivity.mdx` → `slug: "2019-tmao-af-thrombus-risk"` (내용은 Gong 2019 심방세동 혈전 연구 — 파일명과 초점 다름)
- `tlr4-signaling-adjuvants/2009-tlr4-nfkb-nlrp3-licensing-mechanism.mdx` → `slug: "tlr4-nfkb-nlrp3-licensing-mechanism"`
- `tlr4-signaling-adjuvants/2013-eritoran-tlr4-caspase11-sepsis-classic.mdx` → `slug: "eritoran-tlr4-caspase11-sepsis-classic"`

### A2 — 참고문헌 오류
- `overview/lps-saga-innate-immunity-history` — 참고문헌 3건이 DOI·링크·연도 없이 저자·제목만. 섹션 내 다른 파일은 전부 DOI+PMID 완비인데 이 허브 문서만 부실.
- `disease-impact/2008-lps-depression-endotoxemia` 68행 — Maes 2008(*Neuro Endocrinology Letters*)에 붙은 DOI `10.1016/j.jad.2006.08.021`는 *Journal of Affective Disorders* DOI. 저널·DOI 불일치.
- `tlr4-signaling-adjuvants/2013-eritoran-tlr4-caspase11-sepsis-classic` 81행 — "Kayagaki … *Nature*, 2013"으로 인용하나 해당 논문은 *Science* 341:1246 (형제 글 `noncanonical-inflammasome-caspase11-lps`은 Science로 올바로 인용). Opal 2013 JAMA는 서지정보 없이 "jamanetwork.com"만.

### A3 — 메타 누락 / 편집 잔여물
- `tlr4-signaling-adjuvants/2012-trained-immunity-candida-monocyte-reprogramming` — 2행 설명 "Quintin 2012 원문(nihms-511112.pdf)를 중심으로", 113행 "**제공하신** nihms-511112 원문 기준으로 보면" — 로컬 PDF 파일명·대화체("제공하신")가 발행 텍스트에 남음. Figure 3개 `alt=""` `caption=""` 비어 있음.
- `early-history/1968-levin-bang-lal-test-scientific-foundation` 80행 — "따라서 블로그 글에서는 '1968년 원 논문 + 레빈 챕터'라는 이중 근거 구조가 가장 탄탄한 구성이라고 할 수 있습니다." — 글 작성 방법론에 대한 메타 서술이 본문에 남음(유형 H).
- `disease-impact/2007-metabolic-endotoxemia-cani` — `> [!WARNING]` / `> [!NOTE]` GitHub 콜아웃 문법(Nextra 렌더 불확실). `<Figure number="1">` 문자열. `<InlineFlow steps={[...]}>` — 다른 파일은 `text=` prop(컴포넌트 API 불일치).
- `tlr4-signaling-adjuvants/2013-eritoran-…` 26행 — "합성 지질 A 유사체로 … 합성 분자로" 구절 반복(편집 잔여물).

### A4 — frontmatter `date` 필드가 두 의미로 혼용
`date`를 **원 논문 발행연도로 백데이트**한 편(~11): `1954-08-20`, `1968-01-01`, `1982-10-10`, `1998-01-01`, `2003-02-01`, `2007-07-01`(cani), `2007-10-21`(seki), `2007-01-01`(tilg), `2007-06-15`(mpla), `2009-11-15`(fendrix), `2015-05-28`(zoster). 나머지(2001·2016·2017·2022 immune-poly, disease-impact 대다수)는 `2026-02-XX`. 한 섹션에서 `date`가 발행일/논문일로 혼용 → 시간순 정렬·"최신 글" 기능에 영향.

### A5 — 소제목 계층 / 서식 (immune-polysaccharides)
- `1969-lentinan-mushroom-beta-glucan-antitumor-history`, `1978-lentinan-schizophyllan-drug-approval-history`, `1999-yeast-beta-glucan-cr3-immunomodulation-history` — **모든 절 소제목이 `#`(H1)**. `2001-dectin1-…`만 `##`(H2). 같은 하위폴더 내 불일치.
- `1998-tlr4-discovery`, `2007-mpla`, `2009-fendrix`, `2015-zoster`, immune-poly 3편 — 절마다 `---` 구분선 다수(유형 O).
- `immune-polysaccharides/2001-dectin1-beta-glucan-prr-discovery` 14행 — `<Paper DOI="…">` 대문자 속성(다른 파일은 소문자 `doi=`). 렌더 안 될 소지.
- `## 관련 문헌 (MLA Style)` — 참고문헌 제목에 "(MLA Style)" 라벨 잔존(1969·1978·1982·2007-mpla·2015-zoster 등 다수).

## B. 문체 판단 항목 (미확정)

### B1 — 1인칭 견해·경험 삽입
- `disease-impact/2024-akkermansia-good-gram-negative-docent` 53–55행 `## 필자 해석` 절 ("필자는 TLR4 신호 강도의 1차 결정요인이 … lipid A 인산화·아실화 패턴일 가능성이 더 크다고 봅니다").
- `disease-impact/2016-gram-negative-bacterial-molecules-alzheimer-pathology` 64행 — "개인적으로도 상당히 인상적인 연구라고 생각됩니다".
- 구분: docent 형식에서 의견을 명시적으로 분리한 것은 정직하나 반복 패턴.

### B2 — 블록쿼트 아포리즘 클로저
`disease-impact/2018-serum-lps-rheumatoid-arthritis-disease-activity`, `disease-impact/2023-lps-atherosclerosis-gut-vs-oral-origin`, `tlr4-signaling-adjuvants/2012-trained-immunity` 등 결론을 `>` 인용문 한 문장으로.

### B3 — 절마다 `---` + 시행형 줄바꿈 (유형 O)
`early-history/1998-tlr4-discovery`, `tlr4-signaling-adjuvants/2007-mpla`, `2009-fendrix`, `2015-zoster`, `immune-polysaccharides` 3편.

### B4 — "A가 아니라 B" 리프레임 (절제적)
이 섹션은 다른 섹션보다 훨씬 드묾. "LPS는 위험 분자 자체라기보다 … 면역 입력값"(akkermansia), "MPLA는 '약한 LPS'가 아니라 … 정교한 작용제"(2007-mpla) 정도.

### 깨끗 (모범)
- **`disease-impact/` 20편 대다수** — 각 `<Paper>` + 1차 문헌 1~9건, 헤지 최상급. 특히 `2011-circulating-endotoxemia-ckd-dialysis`("LPS는 CKD 원인 아님"을 반복 명시), `2024-lps-alzheimer-endotoxin-docent`(9편 근거, "데이터와 해석 구분"), `2013-gordon-twins`("LPS 직접 측정 안 함" 명시), `2001-chronic-infections-…bruneck`, `2004-tlr4-myd88-apoe`, `2023-gut-derived-low-grade-endotoxaemia`.
- **`early-history/` 5편** — Levin/Bang, Qureshi/Ribi/MPL, Beutler/Rietschel, Poltorak 1998 등 1차 문헌 정확.
- **`tlr4-signaling-adjuvants/` 10편** — Mata-Haro 2007, Kayagaki 2013(Science), Bauernfeind 2009, Lal 2015 등 정확.
- **`immune-polysaccharides/` 8편** — Chihara 1969, Ross 1999, Brown 2001 Nature 등 1차 문헌 + DOI(A5 서식 제외).

## C. 별도 과학·COI·구성 검토 필요

- **섹션 전체가 저자 편집적 논지의 과학적 토대를 축적한다.** 세 갈래:
  1. `disease-impact/` 20편 — LPS/저강도 내독소혈증을 동맥경화·비만·당뇨·우울·불안·RA·알츠하이머·CKD·NAFLD·ALD·혈전 등 광범위 질환의 "악화 축"으로 연결. **개별 글은 잘 헤지되어 있으나**, 폴더 수준의 선택·강조가 "장 유래 LPS 관리가 광범위하게 유익하다"는 인상을 만든다.
  2. `immune-polysaccharides/` 2016·2017·2022 + 1969·1978 — "다당체(후코이단·베타글루칸)가 TLR4로 작동하는 면역조절자"라는 서사 구축. 저자 면역증강제 카테고리의 기전 근거.
  3. `tlr4-signaling-adjuvants/` 2007-mpla·2009-fendrix·2015-zoster — MPLA/AS04/AS01의 "안전한 조작된 TLR4 작용제" 성공 서사 3편 = "LPS를 다듬으면 좋은 면역증강제가 된다"는 논지.
  각 글은 사실관계상 정확한 논문·백신 역사이나, 섹션 전체가 daily-immunity·critics·immunology의 C에서 지적한 면역증강제 논지와 같은 방향으로 수렴. **이해관계 공개·선택 편향 관점에서 검토 권장.**
- **`disease-impact/2023-lps-atherosclerosis-gut-vs-oral-origin` 44행** — "일부 공생균은 MPLA 형태에 가까운 구조를 가지며 … 강한 염증 반응을 유도하지 않습니다"(A-LPS 개념). 균형 잡힌 논의 맥락이나 저자 A-LPS 제품 논지와 연결.
- **`tlr4-signaling-adjuvants/2013-eritoran-tlr4-caspase11-sepsis-classic` 64행** — 패혈증 치료 전략 논의 중 "그 후보 경로로 탐식작용 활성화가 자주 거론됩니다"를 미인용으로 삽입(저자 탐식 활성화 논지).
- **`tlr4-signaling-adjuvants/2000-asea-hsp70-…` / `2006-park-hmgb1-…`** — HSP70·HMGB1의 TLR4/DAMP 활성은 이후 LPS 오염·파트너 분자 논쟁으로 상당 부분 재해석됨. 두 글 모두 오염 통제 실험은 언급하나 후속 회의론은 다루지 않음. `immunology/hsp/heat-shock-protein-stress-immunity-history`가 이 논쟁을 잘 다뤘던 것과 깊이 불일치.
- **`disease-impact/2008-lps-depression-endotoxemia`** — Michael Maes(염증-우울 가설 강력 지지자, 방법론 비판도 받음)에 의존. 글은 "장-면역 축 활성화 흔적"으로 적절히 헤지.
- **최신 데이터 글(지식 컷오프 이후)** — `disease-impact/2024-akkermansia-…`(Garcia-Vello 2024 Nat Commun), `2023-gut-derived-…`(Violi 2023). 수치·결론 원문 확인 권장.

---

# docs / il2-saga — 상세 근거 (사용자 검토용, 2026-08-28)

검토 54편(하위 7개: `00-overview/` 1 · `01-cytokine-language/` 16 · `02-t-cell-growth/` 9 · `03-il2-receptor-signaling/` 8 · `04-cell-cycle/` 7 · `05-treg-tolerance/` 9 · `06-antigen-and-innate-context/` 4). **검토용 기록, 원본 미수정. 이번 세션 54편 모두 미변경.**

**내용·서지 정확도는 lps-saga와 동급으로 높다.** 거의 전편이 단일 논문 심층분석 + `<Paper>` 카드(DOI/저자/저널) 형식이고, 특히 `05-treg-tolerance/`의 헤지("질병은 한 덩어리가 아니다")는 모범적이다. 그러나 **실행 위생은 lps-saga보다 거칠다** — 편집 잔여물·대화체 누출·비문·`<Paper>` 서지 오타가 더 많다. **중요: 이 섹션에는 면역증강제·탐식작용 논지 삽입이 없다** (daily-immunity·immunology NF-kB·critics·lps-saga에서 반복된 편집적 논지가 여기엔 없음 — 순수 사이토카인/IL-2/Treg 역사).

## A. 객관적 항목

### A1 — slug ≠ 파일명 (체계적: `YYYY-` 접두 파일 전부 slug에서 연도 탈락)
`1983-monoclonal-antibodies-human-il2` → `monoclonal-antibodies-human-il2` · `1984-tcr-ti-t3-triggering-il2-system` → `tcr-ti-t3-triggering-il2-system` · `1986-3t3-cells-il2-tcell-cellcycle-history` → `3t3-cells-il2-tcell-cellcycle-history` · `2001-tlr3-dsrna-nfkb-alexopoulou-flavell-2001` → `tlr3-dsrna-nfkb-alexopoulou-flavell-2001` 외 다수. `order:` 필드에 연도가 있어 정렬은 유지되나, RelatedPosts 배열은 연도 없는 slug를 써야 하고 일부 배열이 두 형태를 혼용.

### A2 — 참고문헌 절 자체가 없음 (`<Paper>` 카드 + RelatedPosts만)
- `01-cytokine-language/`: `1985-ohara-paul-bsf1-il4`, `1985-tnf-cachectin-identity-1985`, `1986-interleukin-6-bsf2-cloning-1986`, `1992-il2-receptor-gamma-chain`, `1995-glucocorticoid-immunosuppression-nfkb-ikb-karin`
- `02-t-cell-growth/`: `1984-cytolytic-t-cell-granules-perforin-1984`, `1998-1998-immunity-ahmed-tetramer`
- `03-il2-receptor-signaling/`: `1984-tcr-ti-t3-triggering-il2-system`
- `06-antigen-and-innate-context/`: `1985-peptide-binding-to-mhc-class-ii-unanue`
- 1건만 있는 편: `1986-cachectin-tnf-shock`, `1986-interleukin-4-b-cell-help`

### A3 — 참고문헌 heading 표기 난립
`## 참고문헌` / `## 참고 문헌` / `## 참고논문` / `### 참고논문` / `## 관련 논문` / `## 관련 문헌` / `## 관련 문헌 (MLA Style)` / `## 참고자료` 가 파일마다 다름.

### A4 — `<Paper>` 서지 오류
**저자명 왜곡:**
- `04-cell-cycle/1993-il2-induced-immediate-early-genes-1993-pnas` — `authors="Carol Biedler, Kirk Johnson, Kendall A. Smith"` → 실제 Beadling C, Johnson KW, Smith KA (PNAS 1993;90:2719–2723). "Carol Biedler"는 "Carol Beadling" 왜곡. **참고문헌 리스트는 "90(9), 4094–4098"로 페이지도 틀림**(DOI `10.1073/pnas.90.7.2719`은 2719쪽).
- `03-il2-receptor-signaling/1984-tcr-ti-t3-triggering-il2-system` — `authors="Stephen M. Moyer, Rebecca J. Hussey, …"` → 실제 Meuer SC, Hussey RE, … Reinherz EL (PNAS 1984;81:1509). "Stephen M. Moyer"→Stefan C. Meuer, "Rebecca J. Hussey"→Rebecca E. Hussey.
- `06-antigen/1985-peptide-binding-to-mhc-class-ii-unanue` — `authors="… Gary Matsuda, Edgar Haber …"` → 실제 Matsueda G. "Gary Matsuda"→Gregory Matsueda.
- `01/1965-birth-of-lymphokine` — `authors="S Kasakura, L LowensteinC"` / `authors="J.GordonS, Lloyd MacLean"` 깨진 이니셜.
- `01/1985-tnf-cachectin-identity-1985` — 중간저자 성만 나열.

**DOI 오류/복붙:**
- `06-antigen/1987-hla-a2-mhc-structure-nature` — `doi="10.2210/pdb1hla/pdb"` (PDB 등록 DOI). 저널 논문 DOI는 `10.1038/329506a0`. 참고문헌도 DOI·페이지 없이 3건, 3번째 "Wilson, Ian A., and Don C. Wiley. 'Structure of the MHC class I antigen HLA-A2.' Nature, 1987"은 실재 확인 안 됨(유령 문헌 의심).
- `01/1970-origin-of-cytokine-concept-mlc` — `doi="10.1038/226943a0"` (Nature DOI)인데 논문은 *Cellular Immunology*.
- `01/1986-t-cell-replacing-factor-il5` — `doi="10.1038/324070a0"` = IL-6(BSF-2) 논문 DOI 복붙.
- `01/1972-lymphocyte-activating-factor-origin-il1` — `<Paper>` doi ≠ 참고문헌 리스트 doi.
- `01/1979-glucocorticoids-il2` — `<Paper>` doi 페이지 vs 참고문헌 페이지(1624–1631) 불일치.

### A5 — `<Figure number={2}>` (그림 1 없이 유일 그림)
`01/1976-long-term-growth`, `01/1980-laf-tcgf-birth-of-interleukins`, `03/2006-il2-signaling`, `03/1983-monoclonal-antibodies-human-il2`(`<FigureGroup number={2}>`), `06/1998-tlr4-lps-beutler-1998-science`(FigureGroup).

### A6 — 편집 잔여물 / 대화체 누출 (본문에 실제 렌더됨)
- `02/2016-adult-ctla4-deletion-autoimmunity-pnas-2016` 38행 — "**제공해주신 원고에는** 저자 이름이 'Catherine Clock'처럼 들리는 부분이 있었는데, 실제 논문의 제1저자는 Katrin Klocke입니다" (프롬프트 대화가 발행문에 남음).
- `01/1979-unlimited-t-cell-growth-clonal-t-cells` 43행 — 키릴 문자 깨짐 "암세포나 чуж чуж한(allogeneic) 세포".
- `03/1981-il2-receptor-discovery` 175행 — "A. L. L. A. N. Munck" (ALLAN 한 글자씩 분해). 4행 설명 오타 "Scatchard 분석으 통해".
- `01/1980-laf-tcgf-birth-of-interleukins` 66행 — 본문에 이미지 경로 문자열 "public/images/photo/kendallsmith-pla.jpg" 노출. 제목 자체가 비문("면역세포간의 대화를 해독이 시작된 발견").
- `02/1975-discovery-of-tnf` 67행 · `01/1976-long-term-growth` 88행 · `02/1977-long-term-culture-tumor-specific-ctl` 72행 — 리터럴 `## RelatedPosts` 제목이 본문 텍스트로 남음(컴포넌트 미실행).

### A7 — 비문 / 문장 붕괴
- `01/1965-birth-of-lymphokine` 203행 — "이 후의 연구를 발견된 것이 이것이".
- `01/1980-laf-tcgf` 제목 — "면역세포간의 대화를 해독이 시작된 발견".
- `01/1986-t-cell-replacing-factor-il5` 105행 — "T-cell replacing factor란 무엇인가?그 답은," (물음표 뒤 공백 없음 + 문장 미완).
- `02/1984-cytolytic-t-cell-granules-perforin` 78행 — "충분하 자랐을".
- `01/1965-gamma-interferon-immune-interferon-1965` — 블록쿼트 볼드 깨짐 "\*\*는 사실을", 공백 없음 "\*\*인간 세포에서만\*\*바이러스".

### A8 — `date` 필드 3형식 혼용
평문 `2026-01-0X` / ISO 타임스탬프 `2026-01-02T00:00:00.000Z` / 논문연도 백데이트(`2006-09-01`, `2008-10-01`, `2025-11-01`, `2025-12-25` 등). `2008-ctla4-foxp3-treg-wing`는 `date: 2008-10-01`인데 `updated: 2026-01-06`.

### A9 — 파일명 자체 이상
`02/1998-1998-immunity-ahmed-tetramer` ("1998" 중복). `04/1991-il2-raf1-cell-cycle-1991-mcb` · `04/…-turner-1993` · `04/…-1993-pnas` (연도 중복).

### A10 — 상호 인용 불일치
- Gordon & MacLean 1965 — `1965-birth-of-lymphokine`에서 *Nature*, `1970-mlc`에서 *J Exp Med*로 인용.
- `05/2008-il2-foxp3-reciprocity-…-popmihajlov-smith` 37행 "Ritz 논문" vs 참고문헌 "Zorn" — `2006-il2-regulates-foxp3` `<Paper>`가 "Zorn et al.; Jerome Ritz (senior author)"로 확인되므로 사실오류 아님(비공식 표기).

### A11 — 근접 중복 문서
`06/1998-tlr4-lps-beutler-1998-science` ≈ `lps-saga/early-history/1998-tlr4-discovery-lps-sepsis` (동일 Poltorak 1998 Science, 상당 부분 병렬). 두 saga가 각각 필요로 하는 구조지만 중복 범위 확인 권장.

## B. 문체 판단 항목 (미확정)

- **B1 (F "A가 아니라 B" 리프레임)** — il2-saga 전반의 주력 수사. "IL-2는 생존 인자가 아니라 세포주기를 밀어주는 신호"(`1986-cmyb`·`3t3`·`immediate-early` 반복), "TCR과 IL-2 중 하나가 아니라 둘이 연결"(`1984-tcr-ti-t3`), "RAF1은 암 표지자가 아니라 정상 세포주기 프로그램의 일부"(`1991-raf1`), "IL-2라는 엑셀이 있다면 브레이크는?"(`1995-sakaguchi`). 교육적 맥락에선 자연스러우나 거의 모든 글의 도입·결론 골격.
- **B2 (K 소제목이 완결문/의문문)** — 섹션 표준. `2007-pandiyan`은 소제목 전체가 "질문 1~5" 형식.
- **B3 (블록쿼트 클로저)** — `1991-raf1` 36–37행, `1995-sakaguchi` 38·56·65행, `1993-turner` 43행 등 핵심 질문을 `>` 인용문으로.
- **B4 (문단 끝 요약 I + "정리하며"/"마무리하며")** — 거의 전편 보유. 여러 글이 "## 7. 이 논문의 의미" + "## 8. 정리하며" 이중 요약.
- **B5 ("노벨상 수상자" 프레이밍 빈도)** — Beutler(2011)·Honjo(2018)·Steinman(2011)·Dulbecco(1975)·Köhler·Milstein(1984)·Tim Hunt(2001)·Brunkow·Ramsdell·Sakaguchi(2025 말초 면역관용). 대체로 사실이나 권위 강조로 반복.
- **B6 (과장 표현)** — `02/1975-discovery-of-tnf` 36행 "이 논문 하나로 답변이 완전히 마무리되었습니다"; `1984-interleukin-2-t-cell-system` Smith 모델을 정설처럼 단정; `1993-turner` "단독 저자 논문이라는 형식 자체가 … 실험적 완결성을 잘 보여 줍니다"(형식→내용 추론).

## C. 별도 과학·COI 검토 필요

- **면역증강제·탐식작용 논지 삽입 없음.** 이 섹션은 중립 영역 — 별도 COI 우려는 낮음.
- `04/1995-glucocorticoid-immunosuppression-nfkb-ikb-karin` — 글루코코르티코이드가 IκBα 전사를 유도해 NF-κB를 가둔다는 1995년 모델(Auphan/Scheidereit)을 정설처럼 서술. 이후 상당한 반론(세포유형 의존, 유일 기전 아님) 제기됨. 참고문헌 절 없음.
- `04/1993-il2-induced-immediate-early-genes` — "## 참고자료 > 보조 섹션: CR1–CR8" 8개 유전자에 각 1문단씩 "연구자들은 ~로 보았습니다"류 추정 해설. 저자 스스로 "확정된 기능을 정리한다기보다 … 읽기 쉽게 풀어 쓴 것"이라 명시. 정보가치 낮은 확장부이며 원문에 없는 해석이 사실처럼 읽힐 소지. heading 계층도 뒤섞임(### 항목들이 ## 참고자료 아래, 이후 ## 다시 등장).
- `00-overview/il2-saga-conceptual-introduction` — docent, 참고문헌 없음, 구어체 장황한 도입, F-리프레임을 논지 골격으로. "2025년 Treg 노벨상"을 기정사실로 서술(지식 컷오프 내 실재하나 서사적 권위로 사용).
- `02/2016-adult-ctla4-deletion-autoimmunity-pnas-2016` — 본문 편집 잔여물(A6) 외에 성체 유도성 CTLA-4 결손 표현형 해석 원문 대조 권장.

### 깨끗 (모범)
- **`01-cytokine-language/` 대다수** — Morgan/Ruscetti/Gallo 1976, Gillis, Beutler/Cerami TNF, Kishimoto IL-6 등 1차 문헌 정확 + `<Paper>` 카드 완비. `1972-schimpl-wecker`, `1984-il1-cdna`, `1986-il6`, `1991-tcell-memory` 특히 정돈.
- **`02-t-cell-growth/`** — `1977-long-term-culture-tumor-specific-ctl`, `1978-t-cell-growth-factor-quantitative-assay`, `1982-clonal-analysis`, `1983-human-t-cell-antigen-receptor` 서지 정확.
- **`03-il2-receptor-signaling/`** — `1982-anti-tac-il2-receptor-nature-1982`, `1987-il2-receptor-bimolecular-structure`, `1983-monoclonal-antibodies-human-il2`(Figure number만) 서지 정확.
- **`05-treg-tolerance/`** — `1995-sakaguchi`, `2003-foxp3`, `2004-ctla4-transgenic`, `2006-zorn`, `2007-pandiyan`, `2008-wing` — 헤지 우수, 특히 `2004`·`2007`은 반환원주의("질병은 한 덩어리가 아니다") 명시.
- **`06-antigen-and-innate-context/`** — `2001-tlr3-alexopoulou-flavell`(Hemmi 2000·Poltorak 1998 정확), `1985-unanue`·`1987-hla-a2`(서지 오류 제외 서사 정확).

---

# docs / obesity-diet — 상세 근거 (사용자 검토용, 2026-08-28)

검토 66편(하위 폴더: `influencer/` 7 · `clinical-trials/` 16 · `kevin-hall/` 11 · `diet-theories/` 9 · `energy-balance/` 8 · `foods-nutrients/` 4 · `guidelines-policy/` 3 · `sugar-sweeteners/` 5 · `people-controversies/` 1 외). **검토용 기록, 원본 미수정. 이번 세션 66편 모두 미변경.**

**서지 품질은 lps-saga·il2-saga와 함께 사이트 최상위권.** `clinical-trials/`·`kevin-hall/`·`diet-theories/` 논문 해설은 `<Paper>` 카드 + 「연구 설계 한눈에 보기」 표 + DOI + 촘촘한 상호참조 + 상급 헤지로 모범적이다. **다만 폴더 전체가 하나의 일관된 편집 논지**를 가진다 — 칼로리·에너지 균형 중심, 케빈 홀 관점(주류적)에 정렬, 탄수화물-인슐린 모델·저탄고지·케토·간헐적 단식·씨드오일 공포론·"설탕=비만 주범"·하버드 식단에 체계적으로 회의적. 개별 글은 대체로 잘 헤지되어 있으나 폴더 수준의 방향성은 뚜렷하다(→ C).

## A. 객관적 항목

### A1 — slug ≠ 파일명
- `clinical-trials/2002-lifestyle-metformin-type-2-diabetes-prevention.mdx` → `slug: "2002-dpp-low-fat-diet-weight-loss-type-2-diabetes-prevention"` (완전히 다른 slug; 형제 글 RelatedPosts는 이 slug로 링크).
- `guidelines-policy/2026-why-usda-2025-dietary-guidelines-changed.mdx` → `slug: "why-usda-2025-dietary-guidelines-changed"` (`2026-` 접두 탈락).

### A2 — 편집 잔여물 / 본문 노출 오류
- `energy-balance/2021-daily-energy-expenditure-life-course-bmr` 57행 — 본문에 이미지 경로 문자열 `public/images/diagram/life-course-energy-expenditure.svg` 노출(바로 아래 `<Figure>` 앞). 24행 "이 하드자 연구는 - " 매달린 대시.
- `foods-nutrients/modern-margarine-trans-fat-myth` 81행 — `#<RelatedPosts` (컴포넌트 앞 스트레이 `#` — critics `lycopene`·`product-effect-cognitive-pattern`와 동일 버그).
- `kevin-hall/kevin-hall-low-carb-low-fat-diet` 49행 — 이미지 경로 `/images/diagram/케빈홀2015 그림1.svg` (공백·한글 파일명, 렌더 실패 소지). 120행 `<KeyPoint>` 안에 `##` 제목 삽입.
- `energy-balance/minnesota-starvation-experiment-lessons` 88–93행 — **RelatedPosts가 `pha-lymphocyte-proliferation-origin`·`hirschhorn-antigen-specific-lymphocyte-response`·`birth-of-lymphokine-1965`** (미네소타 기아실험과 무관한 면역학/il2-saga slug — 복붙 오류).

### A3 — `<Figure number>` 결번
- `sugar-sweeteners/1972-sugar-john-yudkin-reassessment` `number={2}` (그림 1 없음).
- `diet-theories/paleolithic-diet-history-and-critique` `{1}`→`{3}`→`{4}` (그림 2 없음).
- `influencer/sten-ekberg-chiropractor` `<Figure number={2}>` (유일 그림).
- `kevin-hall/kevin-hall-low-carb-low-fat-diet` `number={2}`~`{7}` (그림 1 없음).

### A4 — `order` 필드 충돌·아웃라이어
- **`clinical-trials/` (order=논문연도) 연도 중복**: `order: 2019` ×2, `2020` ×2, `2021` ×3. `diet-clinical-trials-from-what-to-eat` `order: 1`.
- **`energy-balance/` `order: 1` ×4** (`doubly-labeled-water`, `respiratory-quotient`, `minnesota-starvation`, `small-daily-calorie-surplus`).
- **`foods-nutrients/` `order: 1` ×4** (전부).
- **`guidelines-policy/` `order: 1` ×2** + `2026`.
- `diet-theories/nusi-rise-and-fall` `order: 100` (아웃라이어).

### A5 — frontmatter `date` 의미 혼용
논문연도 백데이트(`2021-05-07` carbs-insulin, `2024-01-01` dietfits-2차, `2006-09-01`·`2008-10-01` 등 일부) vs 작성일(`2026-04~06` 대다수). 시간순 정렬·"최신 글" 기능에 영향.

### A6 — `category`/`section` ↔ 폴더 불일치
- `people-controversies/brian-wansink-mindless-eating-scandal` → `category: "critics"`, `section: "연구와 통계"`. RelatedPosts도 전부 critics slug.
- `foods-nutrients/dietary-fiber-calorie-scfas` → `category: "면역과 영양학"`, `section: "영양학"`.

### A7 — 참고문헌 서식 오류 / 부실
- `diet-theories/nusi-rise-and-fall` ref 3 — `[논문 링크] (https://doi:10.1001/…)` 대괄호-괄호 사이 공백 + `https://doi:` 형식 오류. ref 2 "assay 링크"("essay" 오타). `### 참고문헌`(다른 파일은 `##`).
- `energy-balance/respiratory-quotient-diet-metabolism` — 참고문헌에 연도·권·DOI 전부 없음(저널명만).
- `energy-balance/1865-liebig-meat-extract-protein-myth` ref 3 — 실제 문헌 아님("Historical descriptions of LEMCO, Fray Bentos production…").
- `foods-nutrients/dietary-fiber-calorie-scfas` — 학술 1차 문헌 0건(식약처 PDF 1건).
- `influencer/brian-johnson-brand` — 참고문헌 3건 모두 대상 인물 상업 사이트(blueprint.bryanjohnson.com).
- `influencer/ken-berry-doctor` ref 5 URL 없음. `diet-theories/twinkie-diet-calorie-vs-quality` — 유튜브 링크 1건이 유일 참고자료.

### A8 — 비문 / 오타
- `energy-balance/small-daily-calorie-surplus-weight-gain-one-year` 49행 — "…타당할까요>" (물음표 대신 `>`) + "너는" 반말 전환.
- `energy-balance/respiratory-quotient-diet-metabolism` 15행 — "거슬로"(→거슬러).
- `sugar-sweeteners/cgm-does-not-directly-measure-blood-glucose` 66행 — "훨씬 컷습니다"(→컸습니다).
- `foods-nutrients/dietary-fiber-calorie-scfas` — "부틸산" ×2 (butyric acid = 부티르산 오기).
- `energy-balance/2021-daily-energy-expenditure-life-course-bmr` 11행 — "일부 다이어트를 지도자들은".
- `influencer/david-sinclair-genetist` — slug·파일명 "genetist"(geneticist 오타).
- `influencer/ben-bikman-scientist` — "틀렸다기 보다" 띄어쓰기, 17행 제목 끝 공백.

### A9 — 음역 불일치
`허만 폰처` vs `허먼 폰처` — `paleolithic-…`(허만), `twinkie-diet`(허만), `daily-energy-expenditure-life-course-bmr`(21행 허만 · 62행 허먼, **한 문서 내 혼용**), `minnesota-…`(허먼). 폴더 전반.

### A10 — 제목이 본문 첫 H2로 반복
`twinkie-diet`, `doubly-labeled-water-dlw-principle-tee`, `weight-loss-is-determined-by-calorie-restriction`, `butter-vs-margarine-modern-view`, `2026-why-usda-2025-…`, `harvard-diet-key-figures-and-criticism` 등 다수.

### A11 — `<Paper>` / 서지 이슈
- `guidelines-policy/2026-why-usda-2025-…` `<Paper journal="Federal Dietary Guidance" year={2026}>` — 저널 아님(정부 문서).
- `diet-theories/paleolithic-diet-history-and-critique` — `<Paper>` 닫는 `/>` 들여쓰기 이상 + `doi` 누락.
- 인라인 `<Paper>` (16-8, anabolic-window의 Hatori 2012·Ivy 1988·Tipton 2001 등) `doi` 누락.
- **인라인 영어 미번역 "modest"** — `ben-bikman`, `2005-dansinger`(×2), `2007-atoz`(×2), `diet-clinical-trials-from-what-to-eat` 등 한글 문장 중간에 그대로.

### A12 — `version: "1.0.0"` frontmatter 필드
`energy-balance/respiratory-quotient-diet-metabolism`, `guidelines-policy/harvard-plate-vs-usda-myplate`만 보유(다른 문서에 없는 비표준 필드).

## B. 문체 판단 항목 (미확정)

- **B1 (F "A가 아니라 B" + 반증 프레이밍)** — 폴더 전반 주력 수사. "체중감량은 다이어트 이름이 아니라 칼로리 제한", "16:8은 마법이 아니라 생활 구조", "지방조직은 창고가 아니라 완충 장치/교통망", "기회의 창은 좁은 문이 아니라 넓은 맥락", "칼로리는 필요조건, 영양은 충분조건". 교육적으로 자연스러우나 거의 모든 글의 골격.
- **B2 (K 소제목이 완결문/의문문)** — 섹션 표준. "왜 운동 후 30분이 중요하다고 믿게 되었을까", "그렇다면 버터는 다시 안전해진 걸까요?".
- **B3 (아포리즘 클로저/오프너)** — `2026-why-usda-2025-…` "과학은 틀렸던 것이 아니라, 멈춰 있었던 것이다"(도입), "과학은 실패의 기록이 아니라 갱신의 기록"; `nusi-rise-and-fall` "데이터는 우리의 기대를 따르지 않을 권리가 있다"; `twinkie-diet` "칼로리는 칼로리입니다."
- **B4 (1인칭 논쟁·구어체 삽입)** — `2026-why-usda-2025-…` 35행 "제가 볼 때는 전혀 그렇지 않습니다. 오히려 아직도 그들의 주장은 틀린 내용이 많고"; `nusi-kevin-hall-ketogenic-diet-study` "훨씬 더 깊이 있고 결정적인 논문이라고 판단됩니다"; `kevin-hall-low-carb-low-fat-diet` "혈액에 지방이 충분한데 왜 지방을 분해하겠습니까?"; `small-daily-calorie-surplus…` "너는 너무 많이 먹어서 살쪘다"; `2024-sciarrillo` 137행 "논문을 대충 읽는 사람들은".
- **B5 (인플루언서·업계 겨냥 폴레믹 클로저)** — `twinkie-diet` "이들은 곧 자기만의 노하우를 비싼 돈을 주고 사라고 말하기 시작할 겁니다"; `1865-liebig` 전체가 "과학→상품→확신" 구조 반복; `influencer/` 7편 모두 "너무 확신에 차 있다" 결론.
- **B6 (과잉 볼드/이질적 형식체)** — `diet-theories/2021-ludwig-carbohydrate-insulin-model-obesity` — 용어마다 `**bold**`, "재질의했기·포섭·회계학적 명제" 등 한자어 밀도 높은 형식체로 다른 obesity-diet 글과 문체가 이질적. `2021-daily-energy-…`도 볼드 다수.
- **B7 ("연구자의 취향/COI" 공개 KeyPoint)** — `2018-dietfits`(Gardner 채식), `2021-buga-volek`(Volek·Metagenics COI), `2020-treat`(Weiss가 TRE 실천), `2005-dansinger`(Biggest Loser 컨설턴트). 정직한 관행이나 반복 패턴.

## C. 별도 과학·COI·구성 검토 필요

- **폴더 전체가 일관된 편집 논지를 가진다.** 케빈 홀의 에너지 균형 관점(주류적)에 정렬 — "칼로리·에너지 균형이 중심, 탄수화물-인슐린 모델/저탄고지/케토/간헐적 단식/씨드오일 공포/'설탕=비만 주범'/하버드 식단은 과장". 개별 글은 대체로 헤지 우수하나:
  1. 거의 모든 CIM/저탄수 글이 결론에서 홀 편을 든다 — `2021-ludwig-carbohydrate-insulin-model` 마지막 "케빈 홀 박사의 복합 조절 가설이 다소 더 뛰어난 실험적 일관성"; `2024-sciarrillo` "여전히 탄수화물-인슐린 가설은 성립되기 어렵다는 것은 확실합니다".
  2. `sugar-sweeteners/1972-sugar-john-yudkin-reassessment` — "2000년 이후 설탕 소비 감소 vs 비만 증가" 생태학적 상관 그래프로 "설탕이 비만 주범 아님" 결론. 사이트가 `critics/2026-vegetable-nitrate-and-health-marketing`·`critics/reverse-causality-in-health-research`에서 명시적으로 경계한 논증 방식.
  3. `clinical-trials/2002-lifestyle-metformin-…` — DPP의 저열량·저지방 식이를 ~10개 소제목에서 "저지방 식단 중심"으로 반복 강조(저지방 옹호 프레이밍).
  4. `guidelines-policy/` 3편 — **반(反)하버드 식단 / 친 USDA-MyPlate 편집 클러스터.** `harvard-diet-key-figures-and-criticism`은 Teicholz·Ioannidis·Harcombe 등 저탄수 정렬 비평가만 인용.
- **저자 TLR4/탐식작용/내독소혈증 논지 삽입** (daily-immunity·immunology·critics·lps-saga의 C와 같은 방향):
  - `kevin-hall/nusi-kevin-hall-ketogenic-diet-study` 65–70행 — "지방 섭취 많은 식단 → 장에서 LPS(면역독소) 유입 가능성" 미인용 삽입. (또한 `[이중표지수법](/doubly-labeled-water-dlw-principle-tee)` `/docs/` 접두 누락 링크 ×2, "캐빈홀" 오타, `<Paper>` 카드 없음.)
  - `clinical-trials/2004-liposuction-subcutaneous-fat-metabolic-health` 84–102행 — "LPS는 피하지방보다 내장지방 축과 더 가깝다" 절 + 지지 문헌 추가, 지방흡입 논문을 저자 내독소혈증 논지로 재구성.
  - `kevin-hall/kevin-hall-low-carb-low-fat-diet` 155행 — "면역세포는 감염 시 지방산화 안 하고 해당과정에서만 에너지" (부정확·미인용).
  - `foods-nutrients/butter-vs-margarine-modern-view` KeyPoint / `foods-nutrients/modern-margarine-trans-fat-myth` 67행 / `guidelines-policy/2026-why-usda-2025-…` 117행 — 팔미트산·트랜스지방 → TLR4/탐식작용 삽입.
  - `energy-balance/2023-weight-cycling-innate-immune-memory` — 요요→지방조직 대식세포→TLR4→trained immunity. **단 이 글은 실제 논문(Caslin 2023) 기반 + "사람의 요요를 설명하는 최종 답은 아니다" 명시적 헤지**로 가장 문제 적음.
  - `energy-balance/small-daily-calorie-surplus-…` 53·64행 — 체중조절 실패를 "만성염증·스트레스가 몸을 보호하려" (미인용, "나중에 다른 글로 정리").
- **인물·개념 검증 필요**:
  - `diet-theories/paleolithic-diet-history-and-critique` — "문화연구자 Catherine Milestone이 팔레오를 문화현상으로 분석" 서술. 이 이름의 학자·저작 실재 확인 안 됨(Marlene Zuk *Paleofantasy*, Adrienne Rose Bitar 등과 혼동 가능성). 참고문헌에 없음. 참고문헌 2번은 `blog.immunecube.com` 자기 블로그 인용.
  - `energy-balance/minnesota-starvation-experiment-lessons` — `## 실험과 관련된 의문 사항` 부록: "기록된 1,560kcal는 실제 흡수량보다 상당히 높게 계산" + 아트워터 과대추정·섬유질 흡수불량·기아 중 장 위축 논증. 특정 수치(하루 3,000kcal 소비, 1,500kcal 적자) 미인용, 상당한 원저작적 추론을 확정형으로 서술. 41행 "위키 요약에는 …" 본문에서 위키백과 인용.
- **최신 데이터 글(지식 컷오프 이후/근처)** — `guidelines-policy/2026-why-usda-2025-dietary-guidelines-changed`(USDA 2025-2030 지침 발표·내용 원문 확인), `influencer/cate-shanahan-seed-oil-claims-review`(Nagra 2026 *Crit Rev Food Sci Nutr* 리뷰 — 저자 콩·Cargill 이해관계는 글에 공개됨), `diet-theories/2021-ludwig-…`, `energy-balance/2023-weight-cycling-…`. 수치·결론 대조 권장.

### 깨끗 (모범)
- **`clinical-trials/` 16편 전부** — `<Paper>` + 연구설계 표 + 헤지. 특히 `2005-dansinger`, `2007-atoz`, `2008-direct`, `2009-pounds-lost`, `2018-dietfits`, `2019-direct-diabetes`, `2019-calerie`, `2020-diet-gastric-bypass`, `2021-once-weekly-semaglutide`, `2022-tre`, `2023-gardner-twins`, `2024-dietfits-2차`, `diet-clinical-trials-from-what-to-eat`(허브, `featured`).
- **`kevin-hall/` 대다수** — `2021-carbohydrates-insulin`, `2021-plant-low-fat-animal-ketogenic`, `2024-sciarrillo`, `kevin-hall-biggest-loser-deeper-lessons`, `kevin-hall-persistent-metabolic-adaptation`, `kevin-hall-diet-research-synthesis`(`published: false`), `modern-food-environment-breaks-body-weight-defense`.
- **`diet-theories/`** — `2011-dietary-fatty-acids-postprandial-lipaemia`(4 refs DOI, 그림 완비), `1949-pennington-dupont-low-carb-diet-history`(폴더 최상급 `<Paper>` — volume/issue/pages/doi/pmid), `anabolic-window-and-diet-timing`, `16-8-diet-origin-time-restricted-eating-history`.
- **`influencer/`** — `david-sinclair-genetist`(11 refs), `cate-shanahan-seed-oil-claims-review`(8 refs, `<Paper>` 기반), `ben-bikman-scientist`, `eric-westman-doctor` — 균형·근거 양호.
- **`foods-nutrients/`** — `1977-apple-food-matrix-satiety-glucose-insulin`(`<Paper>` + 3 refs), `butter-vs-margarine-modern-view`(3 refs DOI).
- **`energy-balance/`** — `doubly-labeled-water-dlw-principle-tee`(개념 해설 정확), `daily-energy-expenditure-life-course-bmr`(A2 잔여물 제외 내용 정확).

---

# docs / imm-classic — 상세 근거 (사용자 검토용, 2026-08-28)

검토 152편(하위 11: `antibody/` 16 · `cell-immunology/` 31 · `imm-therapy/` 37 · `mhc/` 18 · `treg/` 10 · `pd-1/` 9 · `CTLA4/` 9 · `Cd28/` 7 · `interferon/` 7 · `lps-saga/` 5 · `B7/` 3). **약 60편 정독, 나머지는 하위 11개 폴더 전반에서 표본 검토해 패턴 확인. 검토용 기록, 원본 미수정. 이번 세션 미변경.**

**사이트의 대표(flagship) 섹션.** 대부분 단일 논문 심층분석으로, `<Paper>` 카드 + `<Concept>`/`<KeyPoint>` 컴포넌트 + "얼마나 맞았고 어디서 틀렸는가" 상급 헤지 + "한 줄 정리"/"일반인을 위한 정리" 클로저. 내용·사실관계 정확도는 il2-saga·lps-saga와 동급 최상. **논지 삽입은 딱 1편** (`lps-saga/tlr4-inflammation-phagocytosis-myd88-trif` — 오배치된 면역증강제 글, → C). 주된 문제는 (1) 메타데이터 정합성(slug/order/section/date), (2) 몇몇 파일의 깨진 마크다운·서지 오류, (3) 섹션 경계를 넘는 RelatedPosts.

## A. 객관적 항목

### A1 — slug ≠ 파일명 (섹션 내에서 규칙이 일관되지 않음)
- **연도 접두 유지**(파일명과 일치): `mhc/` 대다수, 일부 `cell-immunology/`, `pd-1/1992-`, `CTLA4/1987-`, `treg/` 일부, `imm-therapy/` 연도 파일 다수.
- **연도를 접미로 이동하거나 삭제**: `antibody/` 전부(`1890-...` → `von-behring-kitasato-birth-of-serology`; `1900-...` → `ehrlich-side-chain-theory-antibody-1900`), `interferon/` 전부, `Cd28/`, `B7/`, `lps-saga/` 대다수, `treg/` 대다수, `cell-immunology/` 다수.
- **파일명 연도 중복**: `1959-edelman-porter-...-1959`, `1965-dreyer-bennett-...-1965`, `1980-cd28-93-...-1980`, `1989-nadler-freeman-1989-...`, `1983-nathan-1983-...`, `1974-zinkernagel-doherty-...-1974`, `1963-jerne-plaque-assay-1963`, `1982-sakaguchi-1982-...`, `1985-sakaguchi-1985-...`, `1996-asano-sakaguchi-1996-...`, `2003-foxp3-...-2003`, `1945-chase-1945-...`(×2), `1957-burnet-1957-...`, `1957-talmage-...-1957`, `1968-brunner-...-1968`, `1968-unanue-askonas-...-1968`, `1993-cd28-...-1993`, **`1998-1998-immunity-ahmed-tetramer`**.
- **`1954-westphal-luederitz-lps-1952`** — 파일명 `1954-`, slug `...-1952`, 제목 "1954년", `<Paper year={1954}>`, `order: 1954`, 본문 반복 "1952년" — **연도 5중 불일치**.
- RelatedPosts 배열이 두 slug 형태를 섞어 쓰고, 파일명형 slug(`1975-kohler-milstein-1975-monoclonal-antibodies` 등)를 링크해 **다수 내부 링크가 깨짐**. 예: `imm-therapy/1985-rosenberg-high-dose-il2-lak`의 RelatedPosts `1986-miescher-von-fliedner-til-functional-properties-solid-tumors` → 실존 파일 없음(실제 `1986-von-fleidner-til-suppression-solid-tumor.mdx`, 게다가 파일명 "von-fleidner"는 "von Fliedner" 오타). `imm-therapy/cell-culture-to-immunotherapy-history` → **`<RelatedPosts posts={[...]}>`** 잘못된 prop(다른 파일은 `slugs=`) + 연도 접두 slug.

### A2 — `order` 필드 혼란
- **`order: 1` 아웃라이어**(연도여야 함): `von-behring-kitasato`(→1890), `pfeiffer-endotoxin`(→1892), `nathan-1983-ros`(→1983), `richet-anaphylaxis`(→1902), `1969-georges-mathe`(→1969).
- **`order: 2025` 충돌** — imm-therapy 도센트 3편(`coley-bcg-tnf`, `rosenberg-cytokine`, `cell-culture-to-immunotherapy`).
- **소수점 order** — `antibody/` 1965.1/1965.2, `mhc/` 1987.1/1987.2, `mccafferty` 1990.5(임의).
- **연도 충돌** — 1957 ×4(`isaacs`, `burnet`, `talmage`, `what-is-hla`), 2010 ×2(`early-cd19-car-t`, `ipilimumab`), 1985 ×2, 1945 ×2(chase).

### A3 — `section` 필드가 자유 텍스트, 폴더별 불일치
- 폴더명 리터럴: `imm-classic`(pfeiffer, seibert, westphal, nathan, chase, richet).
- 한국어 라벨: `항체 역사`, `MHC 역사`, `Treg`, `세포면역학`, `인터페론`.
- 체크포인트: `보조신호-CD28` / `보조신호-B7` / `보조신호-CTLA4` / `보조신호-PD1`.
- imm-therapy 자유 텍스트: `초기연구`, `LAK와 TIL`, `세포배양`, `면역관문`, `암백신`, `CAR-T`.
- `category`: 대부분 `면역학 고전`, imm-therapy는 `면역치료`, **`tlr4-inflammation-...`은 `면역학`**(→ A6/C).

### A4 — 깨진 마크다운 / 컴포넌트
- **`B7/1989-nadler-freeman-1989-b7-discovery`** — 본문에 H1 2개(`# 1989년 – Nadler & Freeman...` 제목 중복 + `# 📚 검증된 참고문헌 (MLA 9판 형식)`), 이모지 번호 헤딩(`### 1️⃣`), **~2,500자짜리 만료된 AWS presigned URL**이 참고문헌 1번 링크, `- **Linsley` 스트레이 볼드.
- **`Cd28/1993-cd28-nfkb-rel-il2-promoter-1993`** — 본문 H1(`# 1993년 – Howard Young...`), 이모지 헤딩(`## 🔁 NF-κB는 하나의 단백질이 아니다`), `## 참고 문헌 (확인된 1차 논문)` 라벨 잔재.
- **`cell-immunology/1983-nathan-1983-ros-macrophage-killing`** — "실험 구성 요약" 표 전체가 한 줄(파이프 미개행 → 렌더 안 됨), 참고문헌 뒤 `90079-G)` 쓰레기 문자.
- **`cell-immunology/1974-zinkernagel-doherty-mhc-restriction-1974`** — Table 1 전체가 한 줄(렌더 안 됨).
- `imm-therapy/2013-chen-mellman-cancer-immunity-cycle` — `<Figure>` `number` prop 누락.
- `CTLA4/1996-ctla4-allison-checkpoint-origin` — `#### <strong>기존 항암제 vs...</strong>` (h4 + 볼드 중첩).
- `cell-immunology/1902-richet` — `<Paper doi="N/A (pre-DOI era)">` — 리터럴 문자열이 doi 속성값.

### A5 — `<Paper>` / 참고문헌 오류
- **`interferon/1993-jak-interferon-nuclear-signalling-darnell`** — 파일명·slug가 "darnell"이나 실제 논문(Nature 366:583)의 저자는 Silvennoinen·Ihle·Schlessinger·Levy로 **Darnell 미포함**(본문·`<Paper>`는 올바르게 귀속). 잘못된 저자명 slug.
- **`cell-immunology/1965-discovery-of-b-cells-and-bursa`** — `<Paper journal="Nature">`(맞음)인데 참고문헌 리스트는 "Journal of Experimental Medicine"(틀림). 참고문헌 3건 모두 권·연도·쪽수 없음. 본문 오타 "파브리시우스낭가"·"파브리시우스이".
- **`cell-immunology/1961-origin-of-t-cells-and-thymus`** — **"Arnold J. Gross"**(→ Ludwik Gross 오기). 참고문헌 3건 전부 절단(`Miller JFAP. Immunological function of the thymus. Lancet. 90693-6`처럼 권·연도 없음).
- `cell-immunology/1893-coley-1893-immunotherapy-origin` — 제목 `"1893년 - 1893 - 윌리엄 콜리..."`(1893 두 번), 본문 L38 문장 절단("아니었습니"), Fehleisen 음역 3종(펠라이젠/페일라이젠), "Spronk" 라이덴 연구자 귀속 불확실. RelatedPosts에 무관한 slug 1개(`why-cd25-became-treg-marker-sakaguchi`)만.
- `1975-kohler-milstein` — Figure 캡션 "퀠러"(→쾰러), 참고문헌 "Burnet, S. F. M."(→F. M. Burnet 이니셜 뒤섞임).
- `1965-dreyer-bennett` — 참고문헌 2번에 편집자 주석 혼입("이 논문에 따르면 Dreyer을 Bennett의 멘토로... 2004년에 사망...").
- `imm-therapy/2003-sadelain-cd19-car-t-preclinical` — `<Paper>` 제목·저널·DOI 조합(JEM 2003 "Targeting primary B cell malignancies...")과 참고문헌 서지가 어긋남. 원문 대조 필요.
- `<Paper>` doi 누락 다수: `1892-pfeiffer`, `1942-freund`, `1954-westphal`, `1982-sakaguchi`, `1987-ctla4-discovery`, `1969-georges-mathe`, `1993-cd28-...`, `1996-asano`, `1957-burnet`(정당) 등.

### A6 — 대화체 / 편집 잔여물 (본문 렌더)
- **`mhc/1987-hla-a2-structure-bjorkman-wiley` L64** — "바로 이 지점에서 **당신의 해석**, 즉 MHC는 표지가 아니라 선택자라는 말이 힘을 얻습니다." — 저자/독자 지칭 대화체 누출(il2-saga "제공해주신 원고", lps-saga "제공하신"과 동류).
- **`lps-saga/tlr4-inflammation-phagocytosis-myd88-trif`** — 폴더는 `imm-classic/lps-saga/`인데 `category: 면역학`, `section: NF-kB`, `order: 2007` — **폴더/카테고리/섹션 완전 불일치**(docs/immunology NF-kB 클러스터 소속이어야 함). (내용은 → C)

### A7 — frontmatter `date` 백데이트
`1958-05-17`(nossal), `1959-01-01`(edelman, scurfy), `1974-01-01`(zinkernagel), `1976-01-01`(tonegawa) — 나머지 대다수는 작성일 `2026-XX`.

### A8 — 잘못된 `<AuthorBio>`
`imm-therapy/2010-ipilimumab-phase3-melanoma-os` — `<AuthorBio person="steven-rosenberg" />` (Hodi 2010 NEJM 논문에 Rosenberg는 저자 아님).

### A9 — 제목/연도 불일치
- `imm-therapy/2010-early-cd19-car-t-crs` — 제목 "2010년" vs `<Paper year={2011}>`(Brentjens Blood 2011).
- `imm-therapy/2023-mrna4157-pembrolizumab-melanoma-phase2b` — 제목·slug "2023" vs `<Paper year={2024}>`(Lancet 2024).

### A10 — 반복 상투 표현
"노벨 생리의학상을 받은 노벨상 수상자"(동어반복) — `1957-burnet`, `1992-pd1`, `1974-zinkernagel`, `1959-scurfy`, `1961-thymus` 등.

## B. 문체 판단 항목 (미확정)

- **B1 (I 마무리 요약 — house style이 폴더별로 갈림)** — `antibody/`·`mhc/`·`interferon/` = "한 줄 정리"; 체크포인트(CTLA4/CD28/PD1/B7)·CAR-T·rosenberg = "일반인을 위한 정리/요약"; 한 파일에 둘 다 있는 경우도 있음. 마무리 관행이 하위폴더마다 달라 일관성이 낮음.
- **B2 (F "A가 아니라 B" 리프레임)** — "T세포는 항원이 아니라 자기 위의 항원을 본다", "면역은 방어가 아니라 자기 인식", "자가면역은 면역의 실패가 아니라 조절의 실패", "CD28은 가속 페달·CTLA-4는 브레이크" — 도입·결론 골격.
- **B3 (아포리즘 클로저)** — "면역이 화학을 무기로 삼은 순간"(nathan), "T세포는 이렇게 태어났다", "혈액은 특별한 액체였다", "발견이 아니라 분리였다".
- **B4 (K 소제목 완결문/의문문)** — "왜 이 논문이 특별한가", "T세포는 무엇을 어떻게 인식하는가".
- **B5 (글 앞 요약 bullet 블록)** — `## 핵심 요약`(interferon 다수), `## 요약: 이 글의 핵심`(burnet) — 일부 폴더만.
- **B6 (전기·일화적 확장 — 논문 범위 초과)** — `1961-thymus` KeyPoint의 Miller 젓가락 손기술 추측(미인용), `1939-tiselius`의 Pharmacia→Cytiva 산업사, `coley-bcg-tnf`·`coley-1893` CRI 서사 중복, `1973-steinman`의 자가 치료·사망 서사, `1969-georges-mathe`·`coley-1893`의 현대 BCG 방광암 절. 대체로 출처는 있으나 원논문 범위를 상당히 벗어남.

## C. 별도 과학·구성 검토 필요

- **`lps-saga/tlr4-inflammation-phagocytosis-myd88-trif.mdx` — 이 섹션의 유일한 편집적 논지 삽입 문서이자 오배치 파일.** 폴더는 `imm-classic/lps-saga/`인데 `category: 면역학`, `section: NF-kB`. 1인칭 "저희는 … 탐식작용(phagocytosis)의 활성화가 중요하다고 생각합니다", 후코이단·감마PGA·영지버섯 다당체·**BioBRB**를 "TLR4 결합 + 염증 낮음"으로 나열, 참고문헌 1건(Mata-Haro 2007). daily-immunity·immunology·critics·lps-saga·obesity-diet C에서 지적한 면역증강제/탐식 논지와 동일 방향. **재분류 + 논지 검토.**
- **`cell-immunology/1983-nathan-1983-ros-macrophage-killing` — 리뷰를 1차 실험처럼 서술.** Nathan CF, "Mechanisms of macrophage antimicrobial activity", *J Clin Invest* 1983 은 리뷰/관점 논문에 가까우나, 이 글은 "실험의 핵심 발상", "실험 설계", "결과", 그리고 구체 균주(*S. typhimurium*, *L. monocytogenes*)·시약(SOD/catalase/DPI)·측정법(CFU) 표를 단일 1차 실험으로 제시. 조합·창작으로 보이는 방법론 귀속 — 원문 대조 필요.
- **`cell-immunology/1961-origin-of-t-cells-and-thymus`** — Miller의 손재주를 젓가락 문화와 연결하는 KeyPoint 추측이 미인용. "Arnold J. Gross"(→ Ludwik Gross) 인물 오기.
- **근접 중복 문서** (의도적 다각도 구성일 수 있으나 사용자 확인 권장):
  - `cell-immunology/1945-chase-1945-cellular-transfer-dth` ≈ `cell-immunology/1945-chase-1945-reinterpreted-tcell-immunity` — **동일 Chase 1945 2쪽 논문**, "실험"과 "현대적 재해석" 두 편.
  - `cell-immunology/why-cd25-became-treg-marker-sakaguchi` ≈ il2-saga `il2-signal-cd25-tcell-peripheral-tolerance-1995` (동일 Sakaguchi 1995 *J Immunol*; 한 KeyPoint가 겹침을 명시).
  - `mhc/1987-hla-a2-structure-bjorkman-wiley` + `mhc/1987-foreign-antigen-binding-site-tcell-recognition-regions` + il2-saga `1987-hla-a2-mhc-structure-nature` — Bjorkman 1987 관련 3편.
  - `mhc/1974-mhc-restriction-t-cell-cytotoxicity` + `cell-immunology/1974-zinkernagel-doherty-mhc-restriction-1974` — 동일 Zinkernagel–Doherty.
  - `CTLA4/1995-ctla4-knockout-mouse` + `treg/1995-ctla4-knockout-fatal-autoimmunity-1995` — 동일 1995 CTLA-4 KO.
  - treg/ FOXP3: `2001-foxp3-scurfy-ipex-2001` + `2003-foxp3-molecular-identity-of-treg-2003` + il2-saga `foxp3-regulatory-t-cell-history`.
- **섹션 경계를 넘는 RelatedPosts 전반** — imm-classic 전체가 docs/il2-saga(`birth-of-lymphokine-1965`, `discovery-of-tnf-1975`, `tnf-cachectin-identity-1985`, `monoclonal-antibodies-human-il2`), docs/immunology(`antigen-presentation-in-lymph-node`, `helper-t-cell-differentiation-adaptive-immunity`, `cd8-t-cell-cytotoxic-immunity`), docs/lps-saga slug로 광범위 링크. 섹션 경계가 흐릿하고, 그중 일부는 무관하거나(예: 미네소타 기아실험 문서에 면역학 slug — obesity-diet C에서 지적) slug 형태 불일치로 깨짐.
- **최신/지식컷오프 근처 데이터** — imm-therapy 후기 임상(`2023-mrna4157`, `2015-*`, `2017-*`, `2010-ipilimumab`, `2012-topalian/brahmer`) 수치·해석 원문 대조 권장. imm-classic 역사 문서 대다수는 사실관계 정확.

### 깨끗 (모범)
- **`antibody/` 16편 거의 전부** — `1935-heidelberger`, `1939-tiselius`(A1 제외), `1955-jerne`, `1958-nossal`(원문 방법 부록 포함), `1959-edelman-porter`, `1965-hilschmann`, `1966-ishizaka`, `1975-kohler-milstein`, `1976-tonegawa`, `1990-mccafferty` — 서지·헤지·`<Concept>` 최상급.
- **`mhc/`** — `1937-gorer`, `what-is-hla-human-mhc-concept`, `1987-hla-a2`(A6 한 문장 제외 본문), `1974-zinkernagel`(A4 표 제외 본문).
- **`interferon/` 7편 전부** — `1957-isaacs`, `1993-jak`(A5 slug 제외 본문 매우 정밀), `2003-ifnlambda`(원문 수치 상세).
- **`treg/`** — `1985-sakaguchi`, `1996-asano-sakaguchi`, `2003-foxp3`, `why-cd25-became-treg-marker-sakaguchi`.
- **체크포인트 클러스터 내용** — `1987-ctla4-discovery`, `1996-ctla4-allison`, `1992-pd1`, `2000-freeman-iwai`, `2003-pd1-icos-cd28`, `1980-cd28-93`, `1989-b7`(A4 서식 제외 내용).
- **`imm-therapy/` 단일논문 임상** — `1976-morales`, `1985-rosenberg-high-dose-il2-lak`, `2010-ipilimumab`, `2010-cd19-car-t-crs`, `2012-topalian`, `2013-chen-mellman`, `2023-mrna4157`, 도센트 3편(내용).
- **`cell-immunology/` 역사** — `1893-coley`(A5 제외), `1957-burnet`, `1961-thymus`(A5 제외), `1965-b-cells`(A5 제외), `1973-steinman`, `1945-chase`(중복 논점 제외).

---

# stories + posts — 상세 근거 (사용자 검토용, 2026-08-28)

> 범위: `content/stories/` 46편(mitochondria 15 · chronic-inflammation 12 · cholesterol 6 · loose 9 · ros 2 · biotech 1 · "오해와 진실" 시리즈 6은 loose에 포함) + `content/posts/notice/` 4편.
> **모두 미완성 초안(`status: draft`/`rewrite`, 일부 `final`). 사용자 지시에 따라 문체·구조 비평은 생략하고 오타·표기·깨진 링크·객관적 오류만 기록한다.** slug ≠ 파일명은 의도된 것이므로 지적하지 않되, RelatedPosts가 실제 slug가 아닌 파일명을 참조해 링크가 깨지는 경우는 실제 결함으로 유지한다(헤더 규칙).

## A. 객관적 항목 (오타 · 표기 · 링크)

### A1 — RelatedPosts / ArticleLink 깨진 slug (파일명 형태 참조, 실제 결함)
`content/docs/`의 실제 `slug:` 값과 대조해 확인함.
- **`2007-metabolic-endotoxemia-cani`** → 실제 slug은 `metabolic-endotoxemia-cani-2007`. 깨진 참조 4곳(모두 `<RelatedPosts>` 배열):
  - `chronic-inflammation/heart-failure-lps-gut-heart-axis-history.mdx:154`
  - `chronic-inflammation/sarcopenia-frailty-inflammation-lps-history.mdx:124`
  - `chronic-inflammation/kidney-lps-gut-kidney-axis-history.mdx:115`
  - `chronic-inflammation/lps-chronic-inflammation-mechanisms-history.mdx:145`
  - (정상: `obesity-diabetes-metaflammation-history:143`, `alzheimer-inflammation-lps-glymphatic-history:117`, `mitochondria/02:65`, `modern-food-environment-breaks-body-weight-defense:111`, `ldl-to-plaque-rupture-lps-cardiovascular-history:135` — 모두 올바른 `metabolic-endotoxemia-cani-2007` 사용. 즉 만성염증 시리즈 4편만 파일명 형태로 잘못 참조.)
- **`1998-tlr4-discovery-lps-sepsis`** → 실제 slug은 `lps-sepsis-innate-immunity`. 깨진 참조 1곳: `chronic-inflammation/lps-chronic-inflammation-mechanisms-history.mdx:145`. (이 파일 하나에 깨진 slug 2개.)
- 참고: `tlr4-lps-beutler-1998-science`는 실제 slug로 존재함(`docs/il2-saga/…/1998-tlr4-lps-beutler-1998-science.mdx`) → 다수 story의 이 참조는 정상. `lps-endotoxemia-history`, `lps-saga-innate-immunity-history`, `2011-circulating-endotoxemia-ckd-dialysis`, `1999-endotoxemia-carotid-atherosclerosis-bruneck-study`, `2004-tlr4-myd88-apoe-atherosclerosis`, `2016-gram-negative-bacterial-molecules-alzheimer-pathology`, "오해와 진실" 시리즈의 RelatedPosts(`ldl-cholesterol-j-shaped-risk` 등)도 전부 정상.

### A2 — `<RelatedPosts>` prop 이름 오류
- `biotech/animal-cell-culture-biopharmaceutical-history.mdx:97-108` — `<RelatedPosts posts={[...]}>`. 다른 모든 story는 `slugs={[...]}`. 컴포넌트가 `posts`를 읽지 않으면 목록이 렌더되지 않음. (docs 감사 A2와 동일 유형.)

### A3 — 오타 (철자 · 조사 · 띄어쓰기)
- `chronic-inflammation/cancer-cachexia-lps-inflammation-history.mdx:64` — "핵심 사이토카인으로 **浮각**되었습니다" → 한자 혼입, "부각".
- `chronic-inflammation/cancer-tumor-microenvironment-inflammation-history.mdx:28` — "**암이발생하려면**" → "암이 발생하려면".
- `chronic-inflammation/cancer-tumor-microenvironment-inflammation-history.mdx:91` — "면역 **골의세포**(Myeloid cell)" → "골수세포".
- `chronic-inflammation/copd-lps-innate-immunity-history.mdx:50` — "실제 COPD 환자의 **기획 기도**에서 관찰되는" → 의미 불명(오식).
- `chronic-inflammation/copd-lps-innate-immunity-history.mdx:64` — "기존 **관각**을 크게 넓혔습니다" → "관점".
- `chronic-inflammation/copd-lps-innate-immunity-history.mdx:72` — "**병병원체** 연관 분자 패턴" → "병원체".
- `chronic-inflammation/copd-lps-innate-immunity-history.mdx:108` — "IL-8을 계속 **분해**하게 만듭니다" → 문맥상 "분비".
- `chronic-inflammation/copd-lps-innate-immunity-history.mdx:108` — "ROS(**선 산화물**)" → 표기 오식.
- `chronic-inflammation/kidney-lps-gut-kidney-axis-history.mdx:53` — "**동남매관** 혈관 접근로" → "동정맥루(AV fistula)" 추정.
- `chronic-inflammation/kidney-lps-gut-kidney-axis-history.mdx:71` — "투석 치료 후 **유독** 물질이 일부 제거된" → "요독 물질"(같은 줄 앞은 "요독성 혈장").
- `chronic-inflammation/kidney-lps-gut-kidney-axis-history.mdx:96` — "과도한 체액을 **제수**(ultrafiltration)할 때" → "제거".
- `chronic-inflammation/obesity-diabetes-metaflammation-history.mdx:164`(표) — "지방조직 = 단순 **에너 저장고**" → "에너지 저장고".
- `cholesterol/after-4s-how-low-ldl.mdx:129` — "우연한 성과나 독자적 특성에 기인한 것이 **아니음을**" → "아님을".
- `cholesterol/atkins-taubes-nusi-kevin-hall.mdx:132` — "렙틴, **궤렐린**, GLP-1" → "그렐린"(ghrelin).
- `cholesterol/atkins-taubes-nusi-kevin-hall.mdx:148` — "이기적인 뇌(selfish brain)​의 관점" → ")"와 "의" 사이 폭 없는 문자(zero-width space) 삽입 의심.
- `statin-anti-inflammatory-mechanism.mdx:18` — "스타틴이 염증을 낮춘다는 사실**을** 거의 알려지지 않았습니다" → 조사 오류("사실이").
- `why-cholesterol-should-be-controlled.mdx:23` — "사람들은 이분법적으로만 **소비되어 왔다는** 점" → 주어–서술어 불일치.
- `cholesterol-misinterpretation-lbc1936.mdx:117` — "지속적으로 관측된 것이**서** 맞는 말이지만" → "것이어서".
- `posts/notice/hello.mdx:2`(**title**) — "**네어버**를 떠나, 새로운 곳에 글쓰기" → "네이버"(본문은 전부 정상).
- `posts/notice/hello.mdx:31` — "분명하고,**대**부분의" → 쉼표 뒤 띄어쓰기 누락.
- `posts/notice/blog-publish-date-setup-notice.mdx:22` — "표시된 **날자** 1주일 내" → "날짜".

### A4 — 이미지 경로 (공백 · 철자)
- `mitochondria/02-obesity-insulin-resistance-mitochondria-m1-macrophage.mdx:78` — `<Figure src="/images/diagram/인슐린 저항성 지방산.svg">` — 경로에 공백 2개(다른 diagram은 하이픈). 렌더/빌드 시 깨질 수 있음.
- `cholesterol-misinterpretation-lbc1936.mdx:66` — `src="/images/photo/cholesterol-desease-corrected.svg"` — "**desease**"(disease 오타). 같은 글 `:52`는 "cholesterol-disease-relation.png"(정상). 실제 파일명 확인 필요.

### A5 — frontmatter 형식 불일치 (파싱 위험)
- `posts/notice/blog-publish-date-setup-notice.mdx:11` — `date : 2025.12.18` — (1) 콜론 앞 공백, (2) 날짜가 점 구분(`2025.12.18`). 나머지 전 파일·같은 글 `updated:`는 ISO(`2025-12-18`). Velite 날짜 파싱 실패 가능.
- `posts/notice/hello.mdx:9` — `updated : 2025-12-24` — 콜론 앞 공백.
- `stories/ldl-not-important-myth.mdx:2-3` — `title:`/`description:` 값이 곡선따옴표("…")로 시작하고 YAML 인용부호로 감싸지 않음(다른 story는 곧은 따옴표로 감쌈). 현재는 파싱되나 취약.

### A6 — 참고문헌 섹션 누락 (사실 주장 다수)
- `cholesterol/ldl-receptor-statin-emergence.mdx` — 없음(시리즈 형제편들은 있음).
- `cholesterol/after-4s-how-low-ldl.mdx` — 없음(Pedersen 회고·CTT·개별 임상 다수 인용).
- `innate-adaptive-immunity-aging-diseases.mdx` — 10개 질환 비교·구체 수치 다수인데 없음.

### A7 — frontmatter title과 동일한 본문 첫 H1
- `chronic-inflammation/madonna-kim-taewon-sepsis-endotoxin.mdx:24` — `## 마돈나와 김태원을 쓰러뜨린 병, 패혈증은 무엇인가`가 title과 완전 동일(대부분 story는 본문을 내용 소제목으로 시작).
- `posts/notice/blog-publish-date-setup-notice.mdx:16` — `## 블로그 발행일 표시 관련 안내`가 title과 동일.

### A8 — 시리즈 내 인물·표기 흔들림
- Patrice Cani: "**패**트리스 카니"(chronic-low-grade, obesity-diabetes-metaflammation, sarcopenia) vs "**파**트리스 카니"(alzheimer, heart-failure, lps-chronic-mechanisms, kidney, cancer-*) — 만성염증 한 시리즈 안에서 두 표기.
- Beutler: "보이**트러**"(chronic-inflammation 시리즈) vs "보이**틀러**"(`ldl-to-plaque-rupture`).
- (경미) `heart-failure-lps-gut-heart-axis-history.mdx` — 본문 L92는 "RENAISSANCE/RECOVER/ATTACH", 참고문헌 6은 "RENEWAL trial"(RENAISSANCE+RECOVER 통합명). 오류는 아니나 독자 혼동.

## B. 문체 판단 — 생략
미완성 초안이라 사용자 지시대로 문체·구조는 검토하지 않음. 참고만: 만성염증 12편은 docs 히스토리 문서와 동일한 ProcessFlow/InlineFlow + "A가 아니라 B" 리프레임 + 문단 끝 요약 골격을 공유하므로, 완성 단계에서 docs C의 공통 패턴과 함께 볼 것.

## C. 별도 검토 필요 (제품·COI·과학 — 초안이므로 참고)

- **헤미셀란/Hemicellan · BioBRB · 흑미강(BRB-F) 제품 옹호가 story에도 등장.** docs C(daily-immunity, immunology, critics, lps-saga, obesity-diet, imm-classic)에서 지적한 저자 면역증강제 논지와 동일 방향.
  - `mitochondria/13-mitochondria-supplements-evidence-nmn-coq10-lifestyle.mdx` — 보충제 비교 글에 헤미셀란/흑미강을 "연구 후보"로 포함.
  - `mitochondria/15-hemicellan-mitochondria-sarcopenic-obesity-evidence.mdx` — 글 전체가 단일 연구(Song TW 2025, *J Functional Foods*) 기반 헤미셀란 옹호. 참고문헌 2(Kwon KS 2023, "black rice bran bioprocessed with shiitake mushroom mycelia")는 BioBRB로 연결.
  - `chronic-inflammation/copd-lps-innate-immunity-history.mdx:152-154` — COPD 역사 서술 글 말미에 `## 헤미셀란과 COPD` 절 + 외부 상업 링크 `Hemicellan.com`. "우수한 결과", "주목할 만한 결과" 등 미검증 효능 표현. 또한 `:150`의 `## 함께 읽으면 좋은 전문 학술 문서` 제목 아래 본문 없이 이 절이 먼저 와 구조가 흐트러짐.
  - `immunity-aging-inflammation-recovery.mdx:70-81` — "바로 이런 제품을 섭취하는 것이 건강에 도움이 됩니다. 가장 대표적인 것들이 헤미셀란, BioBRB, 후코이단, 베타글루칸, 아라비노자일란" + "면역소재를 섭취하는 것은 매우 중요합니다" / "특히 피로회복에 도움이 됩니다" 반복. 단 `:32`에 RBAC 논문 공동저자 COI 고지가 있음(모범적).
- **과학 사실 확인 필요:**
  - `modern-food-environment-breaks-body-weight-defense.mdx:121` — "코르티솔은 복부 내장지방세포의 **자일라아제** 및 인슐린 수용체를 자극" — '자일라아제(xylase)'는 이 맥락에서 성립하지 않는 효소명. 11β-HSD1 또는 LPL 의도로 추정, 원문·근거 확인 필요.
  - `modern-food-environment-breaks-body-weight-defense.mdx:89` — 소제목 라벨 "**가소성**(Hyper-palatability)" — 한글 '가소성'(plasticity)과 영문 뜻 불일치. "과다기호성" 취지.

### 깨끗 (오타·객관 오류 없음)
- **mitochondria**: 01, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 14 (02는 A4만, 13·15는 C만).
- **chronic-inflammation**: `chronic-low-grade-inflammation-history`, `alcoholic-nonalcoholic-fatty-liver-history`, `cancer-tumor-microenvironment-...`(A3 2건 제외 본문·서지 우수).
- **cholesterol 시리즈("역사")**: `4s-cholesterol-debate-turning-point`, `cholesterol-hypothesis-1913-1984-debate`, `ldl-receptor-statin-emergence`(A6만).
- **ros**: `ros-is-a-signal-redox-homeostasis`, `why-ros-became-bad-molecule` — 서지·헤지 양호.
- **biotech**: `animal-cell-culture-biopharmaceutical-history`(A2만).
- **loose / "오해와 진실"**: `ldl-to-plaque-rupture-lps-cardiovascular-history`(서지 11건 DOI), `lipid-hypothesis-subjective-validation`, `pre-drug-lifestyle-immunity`.
- **posts**: `about-blog-and-docs`, `blog-and-docs-notice`.

---

# docs 루트 2편 (`about-this-site`, `guide`) — 상세 근거 (2026-08-28)

섹션 체크리스트에 포함되지 않은 `content/docs/` 루트 직속 파일 2편. 내용·사실관계 문제 없음.

## A. 객관적 항목
- `about-this-site.mdx` — 마크다운 서식 경미:
  - 제목 앞 빈 줄 없음(예: `:21`→`:22`, `:31`→`:32` 등 대부분의 `##` 앞). 렌더러에 따라 제목이 앞 문단에 붙을 수 있음.
  - 볼드 뒤 공백 누락 3곳: `:27` "**사용 지침**제시", `:41` "무엇을 **해야 한다보다** '왜…'", `:55` "**다른 깊이와 형식으로**다룹니다".
  - `status: "draft"` (사이트 기준 문서인데 초안 상태).
- `guide.mdx` — 문제 없음. `status: "final"`.

## B / C
해당 없음.

---

## 진행 현황

### docs
- [x] metabolism-immunity (16) — 완료 2026-08-27
- [x] new (6) — 완료 2026-08-27
- [x] nutrition-supplement (7) — 완료 2026-08-27
- [x] medicine-history (14) — 완료 2026-08-27
- [x] vaccine-society (18) — 완료 2026-08-27
- [x] daily-immunity (21) — 완료 2026-08-27
- [x] cancer-history (30) — 완료 2026-08-28
- [x] immunology (38) — 완료 2026-08-28
- [x] critics (42) — 완료 2026-08-28
- [x] lps-saga (44) — 완료 2026-08-28
- [x] il2-saga (54) — 완료 2026-08-28
- [x] obesity-diet (66) — 완료 2026-08-28
- [x] imm-classic (152) — 완료 2026-08-28 (약 60편 정독 + 11개 하위폴더 전반 표본)

### stories (사용자 확인 후)
- [x] mitochondria (15) · chronic-inflammation (12) · cholesterol (6) · loose (9) · ros (2) · biotech (1) — 완료 2026-08-28 (오타·객관 오류 위주, 미완성 초안이라 문체 비평 생략)

### posts
- [x] posts (4) — 완료 2026-08-28

### docs 루트
- [x] about-this-site · guide (2) — 완료 2026-08-28
