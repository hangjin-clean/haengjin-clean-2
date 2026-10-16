import { keywordSets } from './keywords.js';
import { regions, services, descriptions } from './catalog.js';
const template = "<!doctype html><html lang=\"ko\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>%%REGION%% %%SERVICE%% 업체 | %%SUBKEYWORD%% | 행진크린</title><meta name=\"description\" content=\"%%REGION%% %%SERVICE%% 상담 안내. 청소 범위, 정기관리, 작업 시간, 비용 및 견적은 현장 조건에 따라 안내합니다. 행진크린 1811-7431.\"><meta name=\"robots\" content=\"noindex,follow\"><link rel=\"stylesheet\" href=\"/regional.css\"></head><body><header><a href=\"/\"><strong>행진크린</strong> <small>친환경 청소전문회사</small></a><a href=\"tel:18117431\">☎ 1811-7431</a></header><main><div class=\"hero\"><div class=\"eyebrow\">HAENGJIN CLEAN · 전국 청소 서비스</div><h1>%%REGION%% %%SERVICE%%<br>전문 청소 상담</h1><p>%%SERVICE_DESCRIPTION%%</p><p class=\"muted\">행진크린은 전국 현장별 작업 여건에 맞춰 청소 계획과 견적을 상담합니다. 실제 작업 가능 여부는 상담 시 확인해 주세요.</p><div class=\"btns\"><a class=\"btn\" href=\"https://app.haengjin.co.kr/\" target=\"_blank\" rel=\"noopener\">무료방문견적신청 →</a><a class=\"btn alt\" href=\"tel:18117431\">전화 상담 1811-7431</a><a class=\"btn\" href=\"/\">행진크린 메인페이지</a></div></div><section><h2>%%REGION%% %%SERVICE%% 진행 안내</h2><div class=\"grid\"><article class=\"card\"><h3>현장 확인</h3><p>%%REGION%%의 시설 유형과 면적, 오염 상태, 출입 및 작업 여건을 확인합니다.</p></article><article class=\"card\"><h3>맞춤 견적</h3><p>청소 범위와 빈도, 장비·인력 필요 여부에 따라 견적을 안내합니다.</p></article><article class=\"card\"><h3>일정 협의</h3><p>영업시간과 이용자 동선을 고려해 야간·새벽·주말 작업 가능 여부를 협의합니다.</p></article><article class=\"card\"><h3>작업 및 검수</h3><p>전문 장비와 세제를 사용해 작업하고 전후 사진 및 검수 과정을 안내합니다.</p></article></div></section><section><h2>자주 찾는 청소 상담 주제</h2><p class=\"muted\">아래는 관련 검색 주제이며, 실제 가격이나 고객 후기를 임의로 작성하지 않습니다.</p><div class=\"tags\"><span>%%REGION%% %%SERVICE%% 업체 비용</span><span>%%REGION%% %%SERVICE%% 업체 견적</span><span>%%REGION%% %%SERVICE%% 업체 가격</span><span>%%REGION%% %%SERVICE%% 업체 정기관리</span><span>%%REGION%% %%SERVICE%% 업체 야간청소</span><span>%%REGION%% %%SERVICE%% 업체 오픈청소</span><span>%%REGION%% %%SERVICE%% 업체 마감청소</span><span>%%REGION%% %%SERVICE%% 업체 청소범위</span><span>%%REGION%% %%SERVICE%% 업체 청소주기</span><span>%%REGION%% %%SERVICE%% 업체 전문관리</span></div></section><section class=\"card\"><h2>상담 전 확인하면 좋은 내용</h2><p>시설 면적, 청소를 원하는 구역, 작업 빈도, 희망 일정, 현장 사진을 알려주시면 상담에 도움이 됩니다. 견적은 현장별 조건에 따라 달라집니다.</p><div class=\"btns\"><a class=\"btn\" href=\"https://app.haengjin.co.kr/\">무료방문견적신청</a><a class=\"btn alt\" href=\"tel:18117431\">1811-7431</a></div></section></main><footer>행진크린 · 전국 청소 상담 1811-7431<br><a href=\"https://xn--sy2b170ac4etyf.com/\">메인 홈페이지</a><a href=\"https://blog.naver.com/goldvine\">블로그 1</a><a href=\"https://blog.naver.com/kjopl1\">블로그 2</a><a href=\"https://blog.naver.com/whottvkn94478y\">블로그 3</a></footer></body></html>";
function escapeHtml(v) { return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
export async function onRequest(context) {
  const u = new URL(context.request.url);
  const parts = u.pathname.split('/').filter(Boolean);
  if (parts.length !== 3 || parts[0] !== 'region') return new Response('Not found',{status:404});
  let region,service;
  try {region=decodeURIComponent(parts[1]);service=decodeURIComponent(parts[2]);} catch {return new Response('Invalid URL',{status:400});}
  const ri=regions.indexOf(region), si=services.indexOf(service);
  if(ri<0 || si<0) return new Response('Not found',{status:404});
  const sub=descriptions[si];
  const [primary, costKeyword, quoteKeyword, careKeyword] = keywordSets[ri * services.length + si];
  const page=template.replaceAll('%%REGION%%',escapeHtml(region)).replaceAll('%%SERVICE%%',escapeHtml(service)).replaceAll('%%SERVICE_DESCRIPTION%%',escapeHtml(sub)+' 등 현장 조건에 맞춘 작업 범위를 상담합니다.').replaceAll('%%SUBKEYWORD%%',escapeHtml(sub));
  const tags = `<span>${escapeHtml(primary)}</span><span>${escapeHtml(costKeyword)}</span><span>${escapeHtml(quoteKeyword)}</span><span>${escapeHtml(careKeyword)}</span>`;
  const seoTitle = `${primary} | 행진크린`;
  const seoDescription = `${primary}. ${costKeyword}, ${quoteKeyword}, ${careKeyword} 관련 작업 범위와 상담 안내. 실제 비용과 가능 지역은 상담 후 확인하세요. 1811-7431.`;
  const enriched = page
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seoTitle)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(seoDescription)}">`)
    .replace(/<div class="tags">[\s\S]*?<\/div>/, `<div class="tags">${tags}</div>`)
    .replace('<h1>'+escapeHtml(region)+' '+escapeHtml(service)+'<br>전문 청소 상담</h1>', '<h1>'+escapeHtml(primary)+'</h1>');
  const isPilot = region === '강남구' && service === '사무실청소';
  const isHospitalPilot = service === '병원청소' && (region === '강남구' || region === '광명시');
  const isIndexable = isPilot || isHospitalPilot;
  const pilotDetails = `<section class="card"><h2>강남구 사무실청소 작업 범위</h2><p>사무실의 책상 외부, 파티션, 바닥, 회의실, 탕비실, 공용 화장실 등 업무공간을 중심으로 현장별 청소 범위를 협의합니다. 컴퓨터와 개인 물품, 서류 등은 사전 협의 없이 이동하거나 내부를 청소하지 않습니다.</p><h2>작업 진행 순서</h2><p>현장 확인 → 견적 → 일정 협의 → 청소 → 검수 순서로 진행합니다. 영업시간에 영향을 줄이기 위한 야간·새벽·주말 작업도 일정에 따라 상담할 수 있습니다.</p><h2>사무실청소 견적은 어떻게 정해지나요?</h2><p>면적, 책상과 파티션 수, 회의실·탕비실·화장실 범위, 오염 정도, 작업 빈도, 희망 시간에 따라 달라집니다. 정확한 금액은 현장 조건 확인 후 안내합니다.</p><h2>자주 묻는 질문</h2><h3>정기청소와 일회성 청소를 모두 상담할 수 있나요?</h3><p>정기관리 주기와 일회성 청소 범위를 각각 상담할 수 있습니다.</p><h3>세금계산서 발행이 가능한가요?</h3><p>카드결제 및 세금계산서 발행을 상담할 수 있습니다.</p><h3>청소 후 확인은 어떻게 하나요?</h3><p>작업 후 검수와 전후 사진 제공 범위를 협의할 수 있습니다.</p></section>`;
  const canonicalUrl = `https://haengjin-clean-1.pages.dev/region/${encodeURIComponent(region)}/${encodeURIComponent(service)}`;
  const metaExtras = `<link rel="canonical" href="${escapeHtml(canonicalUrl)}"><meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(seoTitle)}"><meta property="og:description" content="${escapeHtml(seoDescription)}"><meta property="og:url" content="${escapeHtml(canonicalUrl)}">`;
  const seoPage = enriched.replace('</head>', metaExtras + '</head>');
  const hospitalDetails = `<section class="card"><h2>${escapeHtml(region)} 병원청소 상담 범위</h2><p>개인의원 및 진료공간의 대기실, 접수대 외부, 진료실 바닥, 출입구, 공용 화장실 등 실제 작업 구역을 확인한 후 상담합니다. 의료기기와 의료폐기물은 일반 청소 범위에 포함하지 않으며 별도 협의가 필요합니다.</p><h2>오픈 전·마감 후 청소</h2><p>진료 일정과 환자 동선을 고려해 작업 시간을 협의합니다. 진료실과 대기실의 오염 상태, 사용 재질, 청소 주기, 현장 출입 조건에 따라 작업 범위와 견적이 달라집니다.</p><h2>상담 및 진행 절차</h2><p>현장 확인 → 견적 → 일정 협의 → 청소 → 검수 순서로 진행하며 야간 작업 가능 여부, 카드결제 및 세금계산서 발행 여부도 상담할 수 있습니다.</p></section>`;
  let finalPage = seoPage;
  if (isPilot) finalPage = finalPage.replace('</main>', pilotDetails+'</main>');
  if (isHospitalPilot) finalPage = finalPage.replace('</main>', hospitalDetails+'</main>');
  if (isIndexable) finalPage = finalPage.replace('<meta name="robots" content="noindex,follow">','<meta name="robots" content="index,follow">');
  return new Response(finalPage,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'public, max-age=3600','X-Content-Type-Options':'nosniff'}});
}
