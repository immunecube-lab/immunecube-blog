# 내부 링크 감사 — RelatedPosts / ArticleLink (2026-08-28)

> **상태 (2026-08-28 갱신): 전부 해결됨.**
> - **C (21블록)** — `components/mdx/RelatedPosts.tsx`가 각 글의 인덱스 `basePath`로 href를 만들도록 수정됨(ChatGPT). 콘텐츠 수정 불필요. ✅
> - **A (죽은 slug 3건)** — `cell-culture-to-immunotherapy-history.mdx`, `biotech/animal-cell-culture-biopharmaceutical-history.mdx` 모두 실제 slug로 교정됨. ✅
> - **B (`posts=` prop)** — `content/` 전체에 `posts={` 잔존 0건. ✅
> - 현재 `content/` 내 모든 RelatedPosts slug가 해석됨(재스캔 확인).
>
> 아래는 발견 당시 기록. `RelatedPosts.tsx` 변경은 아직 커밋 전(working tree). 남은 정리 항목은 맨 아래 "후속 정리" 참조.


`content/` 전체 559편의 실제 `slug:`를 수집한 뒤, 모든 `<RelatedPosts>` / `<ArticleLink>` 참조가 해석되는지 대조한 결과.

- 내부 참조 항목 총 **1,755건** (ArticleLink + RelatedPosts 배열 항목)
- `<RelatedPosts>` 블록 총 **465개**
- **문제 블록 23개** — 아래 A/B/C

> 참고: 이 세션 중 다른 작업자가 `content/` 다수 파일을 이미 수정했고(작업트리에 ~89개 modified), 이전 감사(`ai-phrasing-audit.md` A1)에서 지적한 만성염증 시리즈의 `2007-metabolic-endotoxemia-cani` 등은 **이미 고쳐졌음**. 아래는 그 수정 이후 현재 상태 기준.

---

## 근본 원인 (컴포넌트 동작)

`components/mdx/RelatedPosts.tsx`:

1. **각 링크 href를 `${basePath}/${slug}`로 만든다.** `basePath` prop 기본값은 `"/docs"`이고, 인덱스에 저장된 각 글의 실제 `basePath`(`/docs` vs `/stories`)를 **무시한다.**
   → docs 글에서 stories 글을 `slugs`에 넣고 `basePath`를 안 주면 `/docs/<stories-slug>` 링크가 생성되어 **조용히 404** (빌드 에러 없음).
2. **모르는 slug는 조용히 버린다** (`.filter(Boolean)`). 오타·파일명 형태를 넣어도 에러 없이 그 항목만 사라진다.
3. **`slugs` prop만 읽는다.** `posts={[...]}`로 쓰면 `slugs`가 undefined → **블록 전체가 렌더되지 않는다.**

대조적으로 `components/mdx/ArticleLink.tsx`는 인덱스에서 slug를 못 찾거나 `basePath`가 안 맞으면 **에러를 던진다** → 그래서 **ArticleLink 참조는 현재 문제 0건** (빌드가 강제로 잡아줌).

### 권장 근본 수정 (파일 1개로 클래스 전체 제거)

`RelatedPosts.tsx`를 `ArticleLink`처럼 **인덱스의 `post.basePath`로 href를 만들게** 변경:

```tsx
// 현재:  href={`${prefix}/${post.slug}`}
// 변경:  href={`${post.basePath}/${post.slug}`}
```

그러면 `basePath` prop 자체가 불필요해지고, 아래 C의 21개 블록이 **소스 수정 없이 전부 해결**됨. 추가로 개발 모드에서 버려진 slug를 `console.warn` 하면 B·오타류가 빌드 로그에 드러남.

이 수정을 하면 남는 작업은 **A(존재하지 않는 slug) 3건 + B(prop) 1건**뿐.

---

## A. 존재하지 않는 slug (파일명 형태를 slug로 착각) — 3건 / 2블록

해당 글은 존재하지만 참조가 **파일명**을 썼고 실제 `slug:`는 다름.

| 파일 | 잘못된 참조 | 실제 slug |
|---|---|---|
| `content/docs/imm-classic/imm-therapy/cell-culture-to-immunotherapy-history.mdx:104` | `1975-kohler-milstein-1975-monoclonal-antibodies` | `kohler-milstein-1975-monoclonal-antibodies` |
| 〃 | `1967-mishell-dutton-spleen-cell-culture-immunology` | `mishell-dutton-spleen-cell-culture-immunology` |
| `content/stories/biotech/animal-cell-culture-biopharmaceutical-history.mdx:97` | `1985-tnf-cachectin-identity-1985` | `tnf-cachectin-identity-1985` |

---

## B. `posts=` prop (블록 전체 미표시) — 1건

| 파일 | 문제 |
|---|---|
| `content/docs/imm-classic/imm-therapy/cell-culture-to-immunotherapy-history.mdx:104` | `<RelatedPosts posts={[...]}>` → `slugs={[...]}` 로. 현재 이 블록은 전혀 렌더되지 않음. (+ 위 A의 slug 2건 동시 수정) |

> 이전 감사에서 `posts=`로 지적했던 `content/stories/biotech/animal-cell-culture-biopharmaceutical-history.mdx`는 **이미 `slugs=`로 수정됨** (A의 slug 1건만 남음).

---

## C. basePath 404 — stories 글을 `/docs/...`로 링크 — 21블록

`basePath` 근본 수정을 안 할 경우, 각 블록에서 아래 stories slug들을 **`basePath="/stories"`를 가진 별도 `<RelatedPosts>` 블록으로 분리**하거나(혼재 블록), **블록에 `basePath="/stories"` 추가**(순수 stories 블록).

### C-1. 순수 stories 블록 → `basePath="/stories"` 한 줄 추가로 끝 (2건)

| 파일:줄 | 대상 stories slug |
|---|---|
| `content/docs/daily-immunity/hyperlipidemia-statin/2024-ldl-cholesterol-j-shaped-risk.mdx:116` | why-cholesterol-should-be-controlled, ldl-not-important-myth, cholesterol-misinterpretation-lbc1936, lipid-hypothesis-subjective-validation |
| `content/stories/statin-anti-inflammatory-mechanism.mdx:104` | pre-drug-lifestyle-immunity, why-cholesterol-should-be-controlled, ldl-not-important-myth |

### C-2. 혼재 블록 (docs + stories 섞임) → stories 항목을 `basePath="/stories"` 블록으로 분리 (19건)

**소스 = docs (15건)**

| 파일:줄 | 잘못 링크되는 stories slug |
|---|---|
| `content/docs/cancer-history/cancer-related-fatigue-inflammation.mdx:106` | cancer-cachexia-lps-inflammation-history, cancer-tumor-microenvironment-inflammation-history |
| `content/docs/critics/research-statistics/hormone-replacement-therapy-effect-illusion.mdx:79` | cholesterol-misinterpretation-lbc1936 |
| `content/docs/critics/research-statistics/reverse-causality-in-health-research.mdx:91` | cholesterol-misinterpretation-lbc1936 |
| `content/docs/daily-immunity/everyday-immunity-balanced-view.mdx:138` | pre-drug-lifestyle-immunity |
| `content/docs/daily-immunity/immunosenescence-and-inflammaging-history.mdx:86` | pre-drug-lifestyle-immunity |
| `content/docs/daily-immunity/sleep-and-immunity-circadian-rhythm.mdx:92` | pre-drug-lifestyle-immunity |
| `content/docs/daily-immunity/hyperlipidemia-statin/2017-cantos-canakinumab-inflammation-atherosclerosis.mdx:132` | statin-anti-inflammatory-mechanism, why-cholesterol-should-be-controlled |
| `content/docs/daily-immunity/hyperlipidemia-statin/hyperlipidemia-statin-history.mdx:180` | why-cholesterol-should-be-controlled, statin-anti-inflammatory-mechanism, ldl-not-important-myth, lipid-hypothesis-subjective-validation |
| `content/docs/daily-immunity/hyperlipidemia-statin/jupiter-rosuvastatin-normal-ldl-high-crp.mdx:130` | statin-anti-inflammatory-mechanism, why-cholesterol-should-be-controlled, ldl-not-important-myth |
| `content/docs/metabolism-immunity/selfish-immunity/autonomic-dysfunction.mdx:59` | pre-drug-lifestyle-immunity |
| `content/docs/obesity-diet/diet-theories/nusi-rise-and-fall.mdx:77` | lipid-hypothesis-subjective-validation |
| `content/docs/obesity-diet/foods-nutrients/butter-vs-margarine-modern-view.mdx:76` | ldl-not-important-myth, why-cholesterol-should-be-controlled |
| `content/docs/obesity-diet/guidelines-policy/harvard-diet-key-figures-and-criticism.mdx:108` | lipid-hypothesis-subjective-validation |
| `content/docs/obesity-diet/guidelines-policy/harvard-plate-vs-usda-myplate.mdx:108` | ldl-not-important-myth |
| `content/docs/obesity-diet/influencer/cate-shanahan-seed-oil-claims-review.mdx:146` | ldl-not-important-myth, why-cholesterol-should-be-controlled |

**소스 = stories (4건)** — "고지혈증과 스타틴의 오해와 진실" 시리즈가 서로를 링크하는데 `basePath` 없이 → `/docs/`로 빠짐

| 파일:줄 | 잘못 링크되는 stories slug | (같은 블록 docs slug — 유지) |
|---|---|---|
| `content/stories/cholesterol-misinterpretation-lbc1936.mdx:119` | why-cholesterol-should-be-controlled, ldl-not-important-myth, lipid-hypothesis-subjective-validation | ldl-cholesterol-j-shaped-risk |
| `content/stories/ldl-not-important-myth.mdx:115` | why-cholesterol-should-be-controlled, lipid-hypothesis-subjective-validation | ldl-cholesterol-j-shaped-risk, harvard-diet-key-figures-and-criticism |
| `content/stories/lipid-hypothesis-subjective-validation.mdx:107` | cholesterol-misinterpretation-lbc1936, ldl-not-important-myth | reverse-causality-in-health-research, harvard-diet-key-figures-and-criticism |
| `content/stories/why-cholesterol-should-be-controlled.mdx:140` | ldl-not-important-myth, cholesterol-misinterpretation-lbc1936, lipid-hypothesis-subjective-validation | ldl-cholesterol-j-shaped-risk |

---

## 요약 / 권장 순서

1. **`RelatedPosts.tsx`를 `post.basePath` 기준으로 변경** → C 전체(21블록) 소스 수정 없이 해결. `ArticleLink`와 동작 통일.
2. **A 3건** — 참조 slug를 파일명 → 실제 slug로 교정 (2개 파일).
3. **B 1건** — `cell-culture-to-immunotherapy-history.mdx`의 `posts=` → `slugs=` (A와 같은 줄).
4. (근본 수정을 안 할 경우에만) C-1 2건 `basePath` 추가, C-2 19건 블록 분리.

> ArticleLink 참조는 현재 이상 없음. 중복 slug 없음(559 파일 = 559 고유 slug). basePath ↔ 대상 컬렉션 하드 불일치(빌드 에러급) 0건.

---

## RelatedPosts.tsx 변경 검토 (ChatGPT 수정, 2026-08-28)

**결론: 올바름.** `ArticleLink`의 fail-loud 방식과 일관됨.

핵심 변경:
- `href={\`${post.basePath}/${post.slug}\`}` — prop `basePath` 대신 인덱스의 각 글 `basePath` 사용. `PostIndexItem.basePath`는 실제로 존재하고 채워져 있음(`/docs` 510, `/stories` 45, `/blog` 4). → **C 클래스 소멸.**
- 모르는 slug → `throw` (조용히 버리던 것 → 빌드 에러). A·오타류가 이제 빌드에서 잡힘.
- `slugs`가 배열이 아니면 → `throw`. `posts=` 오용을 잡음.
- 함수에서 `basePath` 인자 제거, Props 타입에는 `@deprecated` no-op으로 유지.

주의/함의:
- **이제 빌드 하드 게이트.** 모든 published/draft 파일의 RelatedPosts slug가 해석돼야 `next build`가 통과. 현재는 전부 해석됨(확인). 이후 오타는 조용히 사라지지 않고 빌드를 깸 — 의도된 동작.
- `missingSlugs` 검사는 `.slice(max)` 이전 전체 배열 대상 → `max` 밖의 죽은 slug도 빌드를 깸(죽은 참조는 죽은 참조이므로 타당).
- `RelatedPosts.tsx`는 서버 컴포넌트(‘use client’ 없음) → SSG 렌더 중 throw = 해당 라우트 생성 실패 = 빌드 실패. `ArticleLink`가 이미 같은 패턴.

## 후속 정리 (선택, 버그 아님)
- `basePath="/docs"`가 아직 붙은 RelatedPosts 블록 **8개** (전부 `content/stories/chronic-inflammation/…` — alzheimer, cancer-cachexia, cancer-tme, copd, heart-failure, kidney, lps-chronic-mechanisms, sarcopenia). 이제 무시되는 죽은 prop. 제거해도 되고 둬도 무해.
- `Props`의 `basePath?: string` deprecated 필드 — 유지/삭제 자유.
- 빌드 통과 확인: `npm run build`(velite + next build, 다소 김) 또는 최소 `npm run velite:build && npm run gen:index` 후 `next build`.
