---
title: "그림 작업 메모"
slug: "figure-worklog"
published: false
---

# 그림 작업 메모

이 파일은 사이트에 공개하지 않는 내부 작업 메모다. 글을 쓰거나 고치다가 새로 그려야 할 그림, 기존 그림을 수정해야 할 지점, 논문 도표를 참고하되 직접 다시 그려야 할 내용을 기록한다.

위치: `worklog/figure-worklog.md`

## 기록 규칙

- `상태`: 예정 / 진행 / 완료 / 보류
- `종류`: 신규 그림 / 수정 / 재사용 / 확인 필요
- `분야`: 면역치료 / 대사와 면역 / 비만 다이어트 / 영양 보충 / 생활면역 / 기타
- 논문 원본 그림을 그대로 쓰기보다, 독자에게 필요한 구조만 새로 그린다.
- 수치가 들어가는 그림은 반드시 원 논문과 대조한 뒤 파일명 옆에 근거 논문을 적는다.

## 작업 목록

| 상태 | 분야 | 종류 | 관련 글 | 필요한 그림 또는 수정 | 메모 |
|---|---|---|---|---|---|
| 예정 | 면역치료 | 신규 그림 | `2010-ipilimumab-phase3-melanoma-os` | 이필리무맙 3상 설계도 | gp100 단독군, ipilimumab 단독군, 병용군의 3군 구조를 한눈에 보이게 정리 |
| 예정 | 면역치료 | 신규 그림 | `2010-ipilimumab-phase3-melanoma-os` | 전체 생존기간(OS) 결과 요약 | Kaplan-Meier 원도표를 그대로 쓰기보다 OS 중앙값과 HR 중심의 단순 도식으로 재구성 |
| 예정 | 면역치료 | 신규 그림 | `2013-chen-mellman-cancer-immunity-cycle` | cancer-immunity cycle 순환도 | 항원 방출, 항원제시, T세포 priming, 침윤, 암세포 살상, 재방출의 순환 구조 |
| 예정 | 면역치료 | 신규 그림 | `2015-robert-pd1-vs-ctla4-phase3` | CTLA-4 차단과 PD-1 차단의 작동 위치 비교 | 림프절 priming 단계와 종양미세환경 effector 단계의 차이를 분리 |
| 예정 | 면역치료 | 신규 그림 | `2015-rizvi-nsclc-tmb-pd1` | TMB와 PD-1 반응성의 관계 | TMB가 반응성을 설명하지만 완전한 예측자는 아니라는 메시지 중심 |
| 예정 | 면역치료 | 신규 그림 | `2017-le-mmr-deficient-pd1-tissue-agnostic` | MMR 결핍, MSI-H, neoantigen 증가, PD-1 반응성 연결도 | 조직 종류보다 DNA 수선 결함이 치료 반응을 설명하는 흐름 |
| 예정 | 면역치료 | 신규 그림 | `2017-ott-personal-neoantigen-vaccine` | 개인맞춤 신생항원 백신 제작 흐름 | 종양 시퀀싱, 변이 선별, 백신 제작, T세포 반응 확인 |
| 예정 | 면역치료 | 신규 그림 | `2023-mrna4157-pembrolizumab-melanoma-phase2b` | mRNA-4157과 pembrolizumab 병용 논리 | 백신은 보이게 만들고, PD-1 차단은 죽지 않게 붙잡는다는 구조 |
| 예정 | 면역치료 | 확인 필요 | `2010-early-cd19-car-t-crs` | CAR-T와 CRS 기전 도식 | IL-6, 대식세포 활성화, 발열/저혈압 흐름을 너무 단순화하지 않도록 확인 |
| 예정 | 면역치료 | 신규 그림 | `rosenberg-cytokine-immunotherapy-clinical-history` | IL-2, LAK, TIL, ACT의 역사 흐름 | 로젠버그 계열 치료법의 발전선을 연표로 정리 |
| 예정 | 생활면역 | 신규 그림 | [고지혈증과 스타틴의 역사](../content/docs/daily-immunity/hyperlipidemia-statin/hyperlipidemia-statin-history.mdx) | 4S → WOSCOPS → HPS → JUPITER → CANTOS 임상 흐름도 | 스타틴이 고지혈증 약에서 심혈관 위험 약으로 확장되는 흐름을 연표로 정리 |
| 예정 | 생활면역 | 신규 그림 | [JUPITER 임상](../content/docs/daily-immunity/hyperlipidemia-statin/jupiter-rosuvastatin-normal-ldl-high-crp.mdx) | LDL 낮음 + hs-CRP 높음 → rosuvastatin → LDL/CRP 감소 → 사건 감소 도식 | 신약 허가가 아니라 이미 허가된 rosuvastatin의 적응증 확장 임상이라는 점을 그림 안에 명시 |
| 예정 | 생활면역 | 신규 그림 | [CANTOS 임상](../content/docs/daily-immunity/hyperlipidemia-statin/2017-cantos-canakinumab-inflammation-atherosclerosis.mdx) | PAMP/DAMP → PRR/inflammasome → IL-1β → IL-6/CRP → 혈관 염증 도식 | LDL을 낮추지 않고 IL-1β 축을 낮춘 임상이라는 점, LPS는 PAMP 후보 중 하나라는 점을 과장 없이 표시 |
| 예정 | 생활면역 | 신규 그림 | [만성염증과 심혈관질환 draft](../content/draft/chronic-inflammation-cardiovascular-disease-cantos.mdx) | LDL 부담 + 선천면역 염증 축이 심혈관 사건으로 이어지는 큰 지도 | 스토리텔링용 핵심 그림. 나중에 공개 전 반드시 추가 |

## 전역 후보

- 면역관문억제제 계보: CTLA-4에서 PD-1/PD-L1, 병용요법, 바이오마커 시대로 이어지는 큰 흐름
- 암면역치료 방식 비교: BCG, cytokine therapy, checkpoint blockade, TIL/ACT, CAR-T, cancer vaccine
- 반응 환자와 비반응 환자 차이: neoantigen, T세포 침윤, 항원제시, 면역억제성 미세환경, exhaustion
- 독성 그림: CTLA-4/PD-1 차단 후 면역관련 부작용(irAE)이 왜 생기는지
- 대사와 면역 지도: 에너지 배분, 염증, 자율신경, 식욕, 체온을 연결하는 큰 지도
- 비만 다이어트 지도: 인슐린, 지방산, 식욕, 에너지 소비, 식후 지질반응을 연결하는 큰 지도
- 영양 보충 지도: 결핍 교정, 면역세포 증식, 장내미생물, 염증 해소를 구분하는 도식

## 파일명 후보

- `public/images/docs/imm-therapy/ipilimumab-phase3-trial-design.png`
- `public/images/docs/imm-therapy/ipilimumab-overall-survival-summary.png`
- `public/images/docs/imm-therapy/cancer-immunity-cycle.png`
- `public/images/docs/imm-therapy/ctla4-vs-pd1-site-of-action.png`
- `public/images/docs/imm-therapy/tmb-pd1-response-model.png`
- `public/images/docs/imm-therapy/mmr-msi-neoantigen-pd1.png`
- `public/images/docs/imm-therapy/personal-neoantigen-vaccine-workflow.png`
- `public/images/docs/imm-therapy/mrna4157-pembrolizumab-logic.png`




https://immunecube.com/docs/2013-gordon-twins-microbiota-obesity-transfer
제프리 고든의 장이식 마우스 모델

참고로 제프리 고든은 

케빈홀 그림 넣기 [케빈홀](content\docs\obesity-diet\kevin-hall\2021-plant-low-fat-animal-ketogenic-ad-libitum.mdx)
