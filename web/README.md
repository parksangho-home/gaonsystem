# 가온시스템 홈페이지

Next.js App Router 기반 B2B 제품 탐색 사이트. 실행 위치는 `web`이다. 루트 `index.html`과 `tech-stack-draft.md`는 과거 시안이며 개발 기준에서 제외한다.

## 실행 및 검증

개발·검증 환경: Node.js 24. 테스트는 Node의 TypeScript 타입 제거 기능을 사용한다.
```sh
npm ci
npm run dev
npx tsc --noEmit --incremental false
npm run lint -- --max-warnings=0
npm test
npm run build
npm run start
```

## 구조와 확장
- app: 메인, 제품 목록, products/[slug], 문의, sitemap/robots.
- components: 공통 Header/Footer, 카테고리, 제품 카드, 문의 CTA.
- data/company.ts: 확인된 회사정보. 충돌하는 이메일·계좌는 제외.
- data/categories.ts: 기존 제품 분류 및 이전 URL.
- data/products.ts: 제품 타입, 검색 함수, 제품별 출처.
- public/images: 실제 이미지. docs/content-sources.md에서 출처 관리.

제품 추가 시 취급 여부와 공식 사양을 확인하고 대표 이미지를 로컬 저장한다. data/products.ts에 고유 id/slug, category, brand, 특징·사양·문서·sources를 등록한다. specificationModels는 모델 컬럼 배열이고 specifications의 values는 같은 순서의 값이다. 동적 상세 템플릿과 목록은 이 데이터를 사용한다. 다른 제품군의 비교 제목·개요 등 편집 문구도 제품 데이터에 함께 관리한다.

## 현재 범위
문의는 전화 연결이다. 개인정보 수집·온라인 접수·이메일 전송은 없다.
GP10/GP20과 기존 사이트에서 가져온 46개 제품을 공개한다. 빈 카테고리는 공급 불가나 단종을 의미하지 않는다.
검색/필터는 GET 쿼리로 유지한다. 회사소개·고객지원은 메인 섹션, 기술자료는 제품 상세 섹션으로 연결한다.
기존 제품/분류 URL은 next.config.ts에서 연결한다. 공지사항·독립 자료실·CMS·온라인 문의는 후속 범위다.
기본 도메인은 data/company.ts의 siteUrl. 배포·도메인 전환은 별도 단계다.


## 기존 제품 본문 가져오기와 누락 검사

루트에서 `python tools/import-product-content.py`를 실행한다. Python 3와 web의 설치된 sharp 의존성이 필요하다.
저장된 crawl-output/manifest.json 및 HTML에서 goods_summary, prodDetailPC 본문 전체를 추출하며 원본은 수정하지 않는다.
생성 결과는 data/imported-product-content.json, docs/product-content-audit.json, public/images/products/legacy에 저장한다.
`npm test`는 저장소에 포함된 제품 데이터·이미지와 검증 기준의 일치 여부를 검사한다. 원본 수집본이 있는 로컬 환경에서는 `npm run test:source`로 46개 제품의 전체 텍스트, 이미지 순서와 파일 동일성을 추가 대조한다. 수집본과 참고 HTML은 Git에 포함하지 않는다.
SEO 설명과 gallery 배열은 상세 본문으로 사용하지 않는다. GP10/GP20은 별도 편집된 HTML 상세페이지를 유지한다.

현재 대조 기준은 2026-09-24 수집본이다. 이미지에만 포함된 문구는 이미지로 보존했고 별도 OCR/HTML 전환은 하지 않았다.
216번 제품은 원본 상세 본문이 비어 있다. GL260(217)의 일부 표 제목은 원본부터 표 밖 텍스트로 저장되어 있으며 임의로 의미를 추정해 재배치하지 않았다.
기존 사이트 주소는 내부 출처로만 보관하고 상세페이지의 '기존 제품정보 확인' 링크는 제거했다.
