# 면역이야기 작성 규칙

새로운 면역이야기(`.mdx`)에는 반드시 커버 이미지를 추가합니다.

- 권장 크기: `1280 × 720px`
- 필수 비율: 16:9 (`1600 × 900px` 등도 가능)
- 형식: WebP
- 권장 용량: 100~200KB
- 최대 용량: 300KB
- 저장 위치: `public/images/stories/<slug>.webp`
- 커버는 선택사항입니다. 사용할 때만 frontmatter에 `cover: "/images/stories/<slug>.webp"`를 추가합니다.
- 이미지 안에는 제목이나 긴 문구를 넣지 않습니다.

예시:

```yaml
---
title: "글 제목"
description: "글 설명"
date: "2026-08-12"
slug: "example-story"
published: true
category: "감염과 면역"
tags:
  - 면역
cover: "/images/stories/example-story.webp"
featured: false
---
```

`npm run validate:story-covers`로 지정된 커버의 경로, 크기, 형식과 용량을 확인할 수 있습니다. 커버가 없는 글은 검사를 건너뛰며, 전체 빌드에서도 이 검사가 자동 실행됩니다.
