/* Engine adapter. Isolates engine storage per mode and imports identities once. */
(()=>{
 window.PokiSDK=null;
 const mode=new URLSearchParams(location.search).get('mode')||'career',prefix='rb27:'+mode+':';
 const raw=window.localStorage;
 const storage={getItem:k=>raw.getItem(prefix+k),setItem:(k,v)=>raw.setItem(prefix+k,String(v)),removeItem:k=>raw.removeItem(prefix+k),clear:()=>Object.keys(raw).filter(k=>k.startsWith(prefix)).forEach(k=>raw.removeItem(k)),key:i=>Object.keys(raw).filter(k=>k.startsWith(prefix))[i]?.slice(prefix.length)??null,get length(){return Object.keys(raw).filter(k=>k.startsWith(prefix)).length}};
 Object.defineProperty(window,'localStorage',{value:new Proxy(storage,{get:(t,k)=>k in t?t[k]:typeof k==='string'?t.getItem(k):undefined,set:(t,k,v)=>{t.setItem(k,v);return true},ownKeys:()=>Object.keys(raw).filter(k=>k.startsWith(prefix)).map(k=>k.slice(prefix.length)),getOwnPropertyDescriptor:()=>({enumerable:true,configurable:true})})});
 const notify=message=>parent.postMessage({type:'bridge',message},location.origin);
 window.addEventListener('error',e=>notify('Engine error: '+e.message));
 let rosters=[];fetch('rosters.json').then(r=>r.json()).then(r=>rosters=r).catch(()=>notify('Real roster import unavailable'));
 const abbr=['BUF','MIA','NE','NYJ','DEN','KC','LAC','LV','BAL','CIN','CLE','PIT','HOU','IND','JAX','TEN','DAL','NYG','PHI','WSH','ARI','LAR','SF','SEA','CHI','DET','GB','MIN','ATL','CAR','NO','TB'];
 const positions={1:['QB'],2:['RB','FB'],3:['TE'],4:['WR'],5:['OT','G','C','OG','OL'],6:['DE','DT','NT','DL'],7:['LB','ILB','OLB'],8:['CB'],9:['S','FS','SS','DB'],10:['K','PK']};
 // Existing engine attributes and contracts are deliberately retained.
 setInterval(()=>{try{
  if(!rosters.length||typeof _Qm!=='function'||typeof _yn!=='function')return;
  for(const controller of Object.values(_Qm(92)||{})){
   if(controller._sp==null||controller._sp<0||!Number.isInteger(Number(controller._Er)))continue;
   const t=rosters.find(t=>t.abbr===abbr[Number(controller._Er)]);if(!t)continue;
   let count=0;const used=new Set();const maps=[];for(let i=0;i<_1n(controller._sp);i++){let m=_4n(controller._sp,i);maps.push(m);if(_Vn(m,'real_player_id'))used.add(String(_5n(m,'real_player_id')))}
   for(const m of maps){
    if(_Vn(m,'real_player_id')){count++;continue}
    // Only seed the first career season; preserve generated future draft classes.
    if(Number(controller._bq)>1)continue;
    const pos=positions[Number(_5n(m,'position'))]||[];
    const p=t.players.find(p=>pos.includes(p.position)&&!used.has(p.id)&&p.status==='Active')||t.players.find(p=>pos.includes(p.position)&&!used.has(p.id));
    if(!p)continue;_yn(m,'fname',p.firstName);_yn(m,'lname',p.lastName);if(p.age)_yn(m,'age',p.age);_yn(m,'real_player_id',p.id);used.add(p.id);count++;
   }
   notify(t.name+' • '+count+' real star identities • '+mode.toUpperCase());
  }
 }catch(e){notify('Roster adapter: '+e.message)}},1500);
})();
