import { records } from '../../data.js';
import { template } from '../../template.js';
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const scopes = {'병원청소':'진료실, 대기실, 복도, 바닥, 공용 화장실 등 현장별 범위를 협의합니다.','사무실청소':'책상 외부, 파티션, 바닥, 회의실, 탕비실, 공용 화장실 등을 협의합니다.','학원청소':'강의실, 복도, 출입구, 공용 화장실 등 이용 공간을 중심으로 범위를 협의합니다.','식당청소':'홀, 주방 외부, 바닥, 출입구, 공용 구역 등 작업 범위를 확인합니다.','공장청소':'생산 구역 주변, 바닥, 통로 등 시설별 안전 조건과 작업 범위를 협의합니다.','유리창청소':'내부 및 외부 유리, 프레임 등 현장 접근 조건에 따라 작업 범위를 협의합니다.','에어컨청소':'기종과 설치 환경을 확인한 후 필터, 내부 부품 등 세척 범위를 안내합니다.','방역소독':'시설 용도와 현장 조건을 확인하고 적절한 소독 작업 범위를 협의합니다.'};
export async function onRequestGet(context){
 const raw=context.params.id;
 if(!/^\d+$/.test(raw))return new Response('Not found',{status:404});
 const idx=Number(raw)-1;
 if(!Number.isSafeInteger(idx)||idx<0||idx>=records.length)return new Response('Not found',{status:404});
 const [province,region,display,service,keywords]=records[idx];
 const heading=display+' '+service+' 업체';
 const canonical=new URL(context.request.url).origin+'/region/'+(idx+1);
 const meta=heading+' 비용·견적·청소 범위 안내. 야간 및 주말 작업 상담. 행진크린 1811-7431.';
 const intro=display+' 지역의 '+service+' 작업은 공간의 용도, 면적, 오염도와 희망 일정을 확인한 후 범위 및 견적을 안내합니다.';
 const values={'%%TITLE%%':heading+' 비용·견적 상담','%%META%%':meta,'%%CANONICAL%%':canonical,'%%HEADING%%':heading,'%%INTRO%%':intro,'%%TAGS%%':keywords.map(k=>'<span>'+esc(k)+'</span>').join(''),'%%SERVICE%%':service,'%%REGION%%':display,'%%SCOPE%%':scopes[service]||'현장 이용 목적, 오염 정도, 면적, 접근 조건에 따라 청소 범위와 장비 사용 여부를 상담합니다.'};
 let page=template.replace(/%%(?:TITLE|META|CANONICAL|HEADING|INTRO|TAGS|SERVICE|REGION|SCOPE)%%/g,k=>k==='%%TAGS%%'?values[k]:esc(values[k]||''));
 return new Response(page,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public,max-age=3600'}});
}
