import { records } from '../../data.js';
import { template } from '../../template.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const scopeMap={
'병원청소':'진료실·대기실·복도·공용 화장실의 청소 범위를 확인하고, 진료 종료 후 작업 가능 일정을 협의합니다.',
'사무실청소':'책상 외부·파티션·회의실·탕비실·바닥·공용 화장실을 중심으로 작업 범위를 협의합니다.',
'학원청소':'강의실·책상 외부·복도·출입구·화장실 등 수업 전후 이용 공간의 청소 범위를 협의합니다.',
'식당청소':'식사 공간·홀 바닥·주방 외부·출입구 등 영업 마감 후 청소 범위를 협의합니다.',
'음식점청소':'홀·테이블 주변·주방 외부·바닥의 기름때 및 오염 상태를 확인합니다.',
'매장청소':'판매 공간·진열대 외부·출입구·바닥 등 고객 동선에 따른 청소 범위를 협의합니다.',
'카페청소':'고객 좌석·테이블 주변·바닥·카운터 외부·공용 화장실 등 영업 후 청소 범위를 확인합니다.',
'헬스장청소':'운동기구 외부·운동 공간·탈의실·샤워실·바닥 등 시설별 청소 범위를 협의합니다.',
'필라테스청소':'기구 외부·매트 공간·거울·탈의실·바닥 등 수업 전후 청소 범위를 협의합니다.',
'스터디카페청소':'열람 좌석·책상 외부·출입구·복도·화장실 등 학습 공간의 청소 범위를 협의합니다.',
'빌라계단청소':'계단·난간·공용 출입구·복도 등 공동주택 공용 공간의 청소 범위를 협의합니다.',
'상가청소':'공용 복도·계단·출입구·로비·화장실 등 상가 이용 동선에 맞는 청소 범위를 확인합니다.',
'화장실청소':'세면대·변기 외부·칸막이·바닥·거울 등 오염 상태에 따른 청소 범위를 협의합니다.',
'바닥청소':'바닥재 종류와 오염 정도를 확인해 세척·오염 제거 및 필요한 장비를 협의합니다.',
'주차장청소':'주차면·차량 통로·배수 주변·먼지와 오염 상태를 확인해 작업 범위를 협의합니다.',
'교회청소':'예배당·의자 외부·로비·복도·공용 화장실 등 행사 일정에 맞는 청소 범위를 협의합니다.',
'미용실청소':'시술 공간·거울·바닥·대기석·세면 공간 등 영업 마감 후 청소 범위를 협의합니다.',
'목욕탕청소':'탈의실·세면 공간·타일 바닥·공용 시설의 물때와 오염 상태를 확인합니다.',
'사우나청소':'휴게 공간·탈의실·타일·바닥·공용 구역의 청소 범위와 작업 시간을 협의합니다.',
'공장청소':'작업 구역 주변·바닥·통로·공용 시설의 오염 상태와 안전 조건을 확인합니다.',
'유치원청소':'교실·놀이 공간·복도·화장실 등 이용 시간과 안전을 고려한 청소 범위를 협의합니다.',
'어린이집청소':'보육실·놀이 공간·출입구·화장실 등 시설 이용 시간에 맞춘 청소 범위를 협의합니다.',
'화재청소':'그을음·분진·오염 잔여물과 현장 안전 상태를 확인해 가능한 복구 청소 범위를 협의합니다.',
'입주청소':'실내 바닥·창틀·수납장 외부 및 접근 가능한 내부·욕실 등 입주 전 청소 범위를 협의합니다.',
'준공청소':'공사 분진·바닥·유리·출입구·공용 공간 등 준공 현장별 청소 범위를 확인합니다.',
'리모델링후청소':'공사 후 분진·바닥·창틀·유리·실내 마감재 주변 청소 범위를 확인합니다.',
'이사청소':'퇴거 또는 입주 일정에 맞춰 주방·욕실·바닥·창틀 등 작업 범위를 협의합니다.',
'침수청소':'침수 범위·잔여 오염·바닥 상태·현장 안전을 확인하고 가능한 청소 범위를 협의합니다.',
'유리창청소':'내부·외부 유리와 프레임의 오염도, 높이 및 접근 조건을 확인합니다.',
'외벽청소':'외장재 종류·높이·오염도·작업 접근 및 안전 조건을 먼저 확인합니다.',
'에어컨청소':'에어컨 기종·설치 위치·필터 및 내부 세척 가능 범위를 확인합니다.',
'후드청소':'후드 외부·필터·접근 가능한 부위의 기름때와 설치 조건을 확인합니다.',
'덕트청소':'덕트 구조·접근구·오염 상태와 작업 가능 범위를 사전 확인합니다.',
'기름때청소':'주방·바닥·설비 외부 등 기름때 부착 부위와 재질에 따른 청소 방법을 협의합니다.',
'곰팡이청소':'발생 위치·면적·표면 재질·습기 원인을 확인하고 가능한 제거 범위를 안내합니다.',
'악취제거청소':'냄새 발생 공간·오염원·환기 조건을 확인하고 청소 및 관리 범위를 협의합니다.',
'폐기물청소':'현장 잔여물 종류·분리 배출·반출 가능 여부와 작업 범위를 사전 확인합니다.',
'고압세척청소':'표면 재질·배수 환경·오염 상태를 확인하고 고압세척 적용 가능 여부를 협의합니다.',
'바닥왁스코팅':'바닥재·기존 코팅 상태·면적·사용 일정에 따라 세척 및 왁스 코팅 범위를 협의합니다.',
'카페트청소':'카페트 소재·면적·얼룩·건조 시간을 확인해 세척 범위를 협의합니다.',
'소파청소':'소파 소재·크기·오염 정도를 확인하고 세척 가능 부위를 안내합니다.',
'대리석청소':'대리석 표면 상태·오염·광택 관리 필요 여부를 확인하고 작업 범위를 협의합니다.',
'방역소독':'시설 용도·사용 인원·현장 조건에 따라 적용 가능한 소독 범위를 협의합니다.'
};
const category=service=>/병원|의원|치과|한의원|요양|동물병원/.test(service)?1:/사무실|오피스|빌딩|건물|관공서|지식산업|연구소/.test(service)?2:/학원|학교|독서실|도서관|유치원|어린이집|스터디/.test(service)?3:/식당|음식점|주방|후드|덕트|카페|기름때|목욕탕|사우나/.test(service)?4:/헬스|필라테스|체육|매장|미용실|상가|교회/.test(service)?6:5;
const scope=service=>scopeMap[service]||`${service} 대상 시설의 재질, 면적, 오염 상태, 출입 및 작업 안전 조건을 확인해 청소 범위와 장비 사용 여부를 상담합니다.`;
export async function onRequestGet({params,request}){
 const raw=params.id;
 if(!/^\d+$/.test(raw))return new Response('Not found',{status:404});
 const idx=Number(raw)-1;
 if(!Number.isSafeInteger(idx)||idx<0||idx>=records.length)return new Response('Not found',{status:404});
 const [province,region,display,service,keywords]=records[idx];
 const heading=`${display} ${service} 업체`;
 const base=new URL(request.url).origin;
 const canonical=`${base}/region/${idx+1}`;
 const desc=`${heading} 청소 범위, 비용 상담, 작업 일정 안내. 행진크린 무료견적 1811-7431.`;
 const intro=`${display} 지역 ${service}를 알아보시는 분을 위해 작업 대상, 범위, 상담 절차와 일정 확인 사항을 안내합니다.`;
 const banner=`<section class="regional-hero"><div class="regional-hero-inner"><div><div class="eyebrow" style="color:#61ceff">HAENGJIN CLEAN · ${esc(province)}</div><h1>${esc(heading)}</h1><p>${esc(display)} 지역에 맞는 ${esc(service)} 작업 범위와 견적을 안내합니다.</p><div class="hero-cta"><a href="https://app.haengjin.co.kr/">무료견적 신청 →</a><a href="tel:18117431">전화 1811-7431</a></div></div><img src="/assets/service${category(service)}.webp" alt="${esc(service)} 관련 시설 참고 이미지"></div></section>`;
 const css=`<style>.regional-hero{background:#061f42;color:white;padding:50px 0}.regional-hero-inner{max-width:1320px;margin:auto;padding:0 28px;display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center}.regional-hero h1{font-size:clamp(27px,3.5vw,49px);line-height:1.2;margin:16px 0}.regional-hero p{font-size:17px;line-height:1.8}.regional-hero img{width:100%;height:330px;object-fit:cover;border-radius:14px}.hero-cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.hero-cta a{background:#086bf0;padding:14px 19px;color:#fff;border-radius:7px;font-weight:bold}.hero-cta a+a{background:transparent;border:1px solid #a8c4e7}@media(max-width:700px){.regional-hero-inner{grid-template-columns:1fr;padding:0 16px}.regional-hero img{height:210px}}</style>`;
 const vars={'%%TITLE%%':`${heading} 비용·작업범위 안내`,'%%META%%':desc,'%%CANONICAL%%':canonical,'%%HEADING%%':heading,'%%INTRO%%':intro,'%%TAGS%%':keywords.map(k=>`<span>${esc(k)}</span>`).join(''),'%%SERVICE%%':service,'%%REGION%%':display,'%%SCOPE%%':scope(service)};
 let page=template.replace(/%%(?:TITLE|META|CANONICAL|HEADING|INTRO|TAGS|SERVICE|REGION|SCOPE)%%/g,k=>k==='%%TAGS%%'?vars[k]:esc(vars[k]||''));
 page=page.replace(/<section class="hero">[\s\S]*?<\/section>/,banner).replace('</head>',css+'</head>');
 return new Response(page,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public,max-age=1800'}});
}
