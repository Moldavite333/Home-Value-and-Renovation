// Home Headquarters cloud bridge.
// The publishable key below is intentionally safe for browser use. Database access is protected by RLS.
const HOME_SUPABASE_URL = 'https://pabmsxbswjrzfsedfytx.supabase.co';
const HOME_SUPABASE_KEY = 'sb_publishable_5EX-cK1Wv9m90YWyomDL8A_8Xr2aBU9';

let homeCloud = null;
let cloudUser = null;
let cloudPropertyId = null;
let cloudReady = false;
let cloudSaveTimer = null;
let cloudSyncInProgress = false;

const localSaveOnly = save;
save = function(){
  localSaveOnly();
  if(cloudReady) queueCloudSave();
};

function cloudToast(message, kind='info'){
  const el = document.getElementById('cloudMessage');
  if(!el) return;
  el.textContent = message;
  el.dataset.kind = kind;
}

function injectCloudUI(){
  if(document.getElementById('cloudBar')) return;
  const style = document.createElement('style');
  style.textContent = `
    #cloudBar{margin:0 0 9px;padding:10px 12px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(18,30,23,.72);display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    #cloudBar .cloudDot{width:9px;height:9px;border-radius:99px;background:#d3ae62;box-shadow:0 0 0 3px rgba(211,174,98,.13)}
    #cloudBar[data-state="online"] .cloudDot{background:#73b57b;box-shadow:0 0 0 3px rgba(115,181,123,.14)}
    #cloudBar[data-state="offline"] .cloudDot{background:#be6f68;box-shadow:0 0 0 3px rgba(190,111,104,.14)}
    #cloudMessage{font-size:12px;opacity:.75;flex:1;min-width:180px}
    #cloudAuthModal{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9999;display:none;align-items:center;justify-content:center;padding:18px}
    #cloudAuthModal.open{display:flex}
    #cloudAuthCard{width:min(430px,100%);background:#15221a;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:18px;box-shadow:0 24px 80px rgba(0,0,0,.45)}
    #cloudAuthCard h2{margin:0 0 5px}
    #cloudAuthCard input{width:100%;box-sizing:border-box;margin:5px 0 9px}
    #cloudAuthActions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px}
    #cloudAuthError{min-height:18px;font-size:12px;margin-top:8px;color:#e0b0aa}
    #cloudForgot{width:100%;margin-top:8px;background:transparent;border:0;color:#9cc5a0;text-decoration:underline;padding:7px;cursor:pointer}
    #cloudResetModal{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:10000;display:none;align-items:center;justify-content:center;padding:18px}
    #cloudResetModal.open{display:flex}
    #cloudResetCard{width:min(430px,100%);background:#15221a;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:18px;box-shadow:0 24px 80px rgba(0,0,0,.45)}
    #cloudResetCard input{width:100%;box-sizing:border-box;margin:5px 0 9px}
    #cloudResetError{min-height:18px;font-size:12px;margin-top:8px;color:#e0b0aa}
    #cloudSignedIn{font-size:12px;opacity:.78}
  `;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.id = 'cloudBar';
  bar.dataset.state = 'checking';
  bar.innerHTML = `<span class="cloudDot"></span><strong>Home Headquarters</strong><span id="cloudSignedIn">Checking cloud…</span><span id="cloudMessage"></span><button id="cloudAuthButton" class="btn small">Sign in</button>`;
  const header = document.querySelector('header.top');
  header?.insertAdjacentElement('afterend', bar);

  const modal = document.createElement('div');
  modal.id = 'cloudAuthModal';
  modal.innerHTML = `<div id="cloudAuthCard">
    <div class="row"><div class="grow"><h2>Home Headquarters</h2><div class="section-sub">Sign in to sync this device with your private Supabase database.</div></div><button id="cloudAuthClose" class="btn small ghost">×</button></div>
    <label><span class="form-label">Email</span><input id="cloudEmail" type="email" autocomplete="email"></label>
    <label><span class="form-label">Password</span><input id="cloudPassword" type="password" autocomplete="current-password"></label>
    <div id="cloudAuthActions"><button id="cloudSignIn" class="btn primary">Sign in</button><button id="cloudSignUp" class="btn">Create account</button></div>
    <button id="cloudForgot" type="button">Forgot password?</button>
    <div id="cloudAuthError"></div>
    <div class="section-sub">Your password is sent directly to Supabase. It is never stored in the GitHub repo or in this app's data.</div>
  </div>`;
  document.body.appendChild(modal);

  const resetModal = document.createElement('div');
  resetModal.id = 'cloudResetModal';
  resetModal.innerHTML = `<div id="cloudResetCard">
    <div class="row"><div class="grow"><h2>Choose a new password</h2><div class="section-sub">Your recovery link was accepted. Set a new Home Headquarters password.</div></div><button id="cloudResetClose" class="btn small ghost">×</button></div>
    <label><span class="form-label">New password</span><input id="cloudNewPassword" type="password" autocomplete="new-password"></label>
    <label><span class="form-label">Confirm new password</span><input id="cloudNewPassword2" type="password" autocomplete="new-password"></label>
    <button id="cloudSavePassword" class="btn primary" style="width:100%;margin-top:6px">Save new password</button>
    <div id="cloudResetError"></div>
  </div>`;
  document.body.appendChild(resetModal);

  document.getElementById('cloudAuthClose').onclick = ()=>modal.classList.remove('open');
  modal.addEventListener('click', e=>{if(e.target===modal) modal.classList.remove('open')});
  document.getElementById('cloudAuthButton').onclick = async ()=>{
    if(cloudUser){
      await homeCloud.auth.signOut();
    } else modal.classList.add('open');
  };
  document.getElementById('cloudSignIn').onclick = ()=>handleCloudAuth('signin');
  document.getElementById('cloudSignUp').onclick = ()=>handleCloudAuth('signup');
  document.getElementById('cloudForgot').onclick = requestPasswordReset;
  document.getElementById('cloudResetClose').onclick = ()=>resetModal.classList.remove('open');
  document.getElementById('cloudSavePassword').onclick = saveRecoveredPassword;
}

async function requestPasswordReset(){
  const email = document.getElementById('cloudEmail').value.trim();
  const err = document.getElementById('cloudAuthError');
  err.textContent='';
  if(!email){err.textContent='Enter the email for your Home Headquarters account first.';return}
  try{
    const redirectTo = window.location.origin + window.location.pathname;
    const {error}=await homeCloud.auth.resetPasswordForEmail(email,{redirectTo});
    if(error) throw error;
    err.style.color='#bde0bf';
    err.textContent='Password reset email sent. Open it on this device, tap the reset link, then choose a new password here.';
  }catch(e){
    err.style.color='#e0b0aa';
    err.textContent=e?.message || 'Could not send the reset email.';
  }
}

function showRecoveryModal(){
  document.getElementById('cloudAuthModal')?.classList.remove('open');
  const reset=document.getElementById('cloudResetModal');
  if(reset) reset.classList.add('open');
  setTimeout(()=>document.getElementById('cloudNewPassword')?.focus(),50);
}

async function saveRecoveredPassword(){
  const p1=document.getElementById('cloudNewPassword').value;
  const p2=document.getElementById('cloudNewPassword2').value;
  const err=document.getElementById('cloudResetError');
  err.textContent='';
  if(p1.length<8){err.textContent='Use at least 8 characters.';return}
  if(p1!==p2){err.textContent='The two passwords do not match.';return}
  try{
    const {error}=await homeCloud.auth.updateUser({password:p1});
    if(error) throw error;
    err.style.color='#bde0bf';
    err.textContent='Password updated. You are signed in.';
    setTimeout(()=>document.getElementById('cloudResetModal')?.classList.remove('open'),900);
  }catch(e){
    err.style.color='#e0b0aa';
    err.textContent=e?.message || 'Could not update the password.';
  }
}

async function handleCloudAuth(mode){
  const email = document.getElementById('cloudEmail').value.trim();
  const password = document.getElementById('cloudPassword').value;
  const err = document.getElementById('cloudAuthError');
  err.textContent = '';
  if(!email || password.length < 6){err.textContent='Enter your email and a password of at least 6 characters.';return}
  try{
    const result = mode==='signup'
      ? await homeCloud.auth.signUp({email,password})
      : await homeCloud.auth.signInWithPassword({email,password});
    if(result.error) throw result.error;
    if(mode==='signup' && !result.data.session){
      err.textContent='Account created. Supabase may send a confirmation email. Confirm it, then return here and sign in.';
      return;
    }
    document.getElementById('cloudAuthModal').classList.remove('open');
  }catch(e){err.textContent=e?.message || 'Sign-in failed.'}
}

function updateCloudBar(){
  const bar = document.getElementById('cloudBar');
  const who = document.getElementById('cloudSignedIn');
  const btn = document.getElementById('cloudAuthButton');
  if(!bar) return;
  if(cloudUser){
    bar.dataset.state='online';
    who.textContent = cloudReady ? `Synced · ${cloudUser.email||'signed in'}` : `Connecting · ${cloudUser.email||'signed in'}`;
    btn.textContent='Sign out';
  }else{
    bar.dataset.state='offline';
    who.textContent='Local-only mode';
    btn.textContent='Sign in';
    cloudToast('Sign in once to make this device part of your automated home dashboard.');
  }
}

function propertyPayload(){
  let street = state.privateAddress || null, city=null, region=null, postal=null;
  if(street && street.includes(',')){
    const p=street.split(',').map(x=>x.trim());
    street=p[0]||street; city=p[1]||null;
  }
  return {
    label: state.propertyName || 'Home',
    street_address: street,
    city,
    state: region,
    postal_code: postal,
    primary_sqft: Number(state.primarySqft)||null,
    bonus_sqft: Number(state.bonusSqft)||null,
    lot_acres: Number(state.lotAcres)||null,
    beds: Number(state.beds)||null,
    baths: Number(state.baths)||null,
    bonus_legal_status: String(state.bonusLegal||'Unverified').toLowerCase(),
    bonus_notes: state.bonusNotes||null,
    purchase_price: Number(state.purchasePrice)||null,
    purchase_date: state.purchaseDate||null
  };
}

async function ensureCloudProperty(){
  let {data,error}=await homeCloud.from('properties').select('*').order('created_at',{ascending:true}).limit(1).maybeSingle();
  if(error) throw error;
  if(!data){
    const created=await homeCloud.from('properties').insert(propertyPayload()).select('*').single();
    if(created.error) throw created.error;
    data=created.data;
  }
  cloudPropertyId=data.id;
  return data;
}

function normalizeCloudState(incoming){
  const merged={...state,...incoming};
  if(Array.isArray(merged.comps)) merged.comps=merged.comps.map(normalizeComp);
  if(Array.isArray(merged.projects)) merged.projects=merged.projects.map(normalizeProject);
  merged.risks=Array.isArray(merged.risks)?merged.risks:state.risks;
  merged.marketHistory=Array.isArray(merged.marketHistory)?merged.marketHistory:[];
  merged.saleHistory=Array.isArray(merged.saleHistory)?merged.saleHistory:[];
  merged.savedScenarios=Array.isArray(merged.savedScenarios)?merged.savedScenarios:[];
  return merged;
}

async function loadCloudState(){
  const q=await homeCloud.from('app_settings').select('settings').eq('property_id',cloudPropertyId).maybeSingle();
  if(q.error) throw q.error;
  if(q.data?.settings && Object.keys(q.data.settings).length){
    state=normalizeCloudState(q.data.settings);
    localSaveOnly();
    renderAll();
    cloudToast('Loaded your saved Home Headquarters data from Supabase.');
  }else{
    await pushCloudState();
    cloudToast('This device was uploaded as the first Home Headquarters snapshot.');
  }
}

async function pullAutomatedRows(){
  if(!cloudPropertyId) return;
  let changed=false;
  const [mort,market,vals,comps]=await Promise.all([
    homeCloud.from('mortgage_snapshots').select('*').eq('property_id',cloudPropertyId).order('as_of',{ascending:false}).limit(1).maybeSingle(),
    homeCloud.from('market_snapshots').select('*').eq('property_id',cloudPropertyId).order('as_of',{ascending:false}).limit(1).maybeSingle(),
    homeCloud.from('valuation_snapshots').select('*').eq('property_id',cloudPropertyId).order('as_of',{ascending:false}).limit(24),
    homeCloud.from('comparables').select('*').eq('property_id',cloudPropertyId).eq('is_active',true).order('sale_date',{ascending:false})
  ]);
  if(mort.data){
    if(mort.data.principal_balance!=null) state.actualBalance=Number(mort.data.principal_balance);
    if(mort.data.interest_rate!=null) state.loanRate=Number(mort.data.interest_rate);
    if(mort.data.monthly_payment!=null) state.totalMonthly=Number(mort.data.monthly_payment);
    changed=true;
  }
  if(market.data){
    const m=market.data;
    if(m.price_yoy_pct!=null) state.marketYoy=Number(m.price_yoy_pct);
    if(m.forecast_1y_pct!=null) state.marketForecast=Number(m.forecast_1y_pct);
    if(m.inventory_count!=null) state.inventoryCount=Number(m.inventory_count);
    if(m.inventory_yoy_pct!=null) state.inventoryYoy=Number(m.inventory_yoy_pct);
    if(m.days_on_market!=null) state.daysOnMarket=Number(m.days_on_market);
    if(m.mortgage_rate_30y!=null) state.marketRate=Number(m.mortgage_rate_30y);
    if(m.sale_to_list_pct!=null) state.saleToList=Number(m.sale_to_list_pct);
    if(m.price_cut_share_pct!=null) state.priceCutShare=Number(m.price_cut_share_pct);
    changed=true;
  }
  if(vals.data?.length){
    const newest=new Map();
    vals.data.forEach(v=>{if(!newest.has(v.source))newest.set(v.source,v)});
    newest.forEach(v=>{
      const id=`cloud-${String(v.source).toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;
      const existing=state.sources.find(s=>s.id===id || s.name.toLowerCase()===String(v.source).toLowerCase());
      const target=existing||{id,name:v.source,inBlend:true,url:v.source_url||'',date:v.as_of};
      target.value=Number(v.estimated_value)||0; target.date=v.as_of; if(v.source_url)target.url=v.source_url;
      if(!existing)state.sources.push(target);
    });
    changed=true;
  }
  if(comps.data?.length){
    const manual=state.comps.filter(c=>!String(c.id).startsWith('cloud-'));
    const auto=comps.data.map(c=>normalizeComp({id:`cloud-${c.id}`,address:c.address,salePrice:Number(c.sale_price)||0,saleDate:c.sale_date||'',sqft:Number(c.sqft)||0,acres:c.acres??'',beds:c.beds??'',baths:c.baths??'',quality:c.quality||'okay',adjustment:Number(c.adjustment_pct)||0,use:true,notes:c.notes||`Automated comp${c.source?' · '+c.source:''}`}));
    state.comps=[...auto,...manual];
    changed=true;
  }
  if(changed){localSaveOnly();renderAll()}
}

async function pushCloudState(){
  if(!cloudUser || !cloudPropertyId || cloudSyncInProgress) return;
  cloudSyncInProgress=true;
  try{
    const prop=await homeCloud.from('properties').update(propertyPayload()).eq('id',cloudPropertyId);
    if(prop.error) throw prop.error;
    const up=await homeCloud.from('app_settings').upsert({owner_id:cloudUser.id,property_id:cloudPropertyId,settings:state},{onConflict:'owner_id,property_id'});
    if(up.error) throw up.error;
    cloudToast(`Cloud saved ${new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}.`);
  }catch(e){
    console.error('Home Headquarters sync error',e);
    cloudToast('Cloud save failed; your local copy is still safe.','error');
  }finally{cloudSyncInProgress=false}
}

function queueCloudSave(){
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer=setTimeout(pushCloudState,900);
}

async function connectCloudForUser(user){
  cloudUser=user;
  cloudReady=false;
  updateCloudBar();
  try{
    await ensureCloudProperty();
    await loadCloudState();
    await pullAutomatedRows();
    cloudReady=true;
    updateCloudBar();
    await pushCloudState();
  }catch(e){
    console.error('Home Headquarters startup sync error',e);
    cloudReady=false;
    cloudToast('Signed in, but cloud sync could not finish. Local data is unchanged.','error');
    updateCloudBar();
  }
}

async function startHomeCloud(){
  injectCloudUI();
  try{
    const mod=await import('https://esm.sh/@supabase/supabase-js@2');
    homeCloud=mod.createClient(HOME_SUPABASE_URL,HOME_SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    const {data}=await homeCloud.auth.getSession();
    const recoveryHint=window.location.hash.includes('type=recovery') || window.location.search.includes('type=recovery');
    if(data.session?.user){
      if(recoveryHint){cloudUser=data.session.user;updateCloudBar();showRecoveryModal();}
      else await connectCloudForUser(data.session.user);
    }else updateCloudBar();
    homeCloud.auth.onAuthStateChange(async (event,session)=>{
      if(event==='PASSWORD_RECOVERY'){
        cloudUser=session?.user||null;
        updateCloudBar();
        showRecoveryModal();
        return;
      }
      if(session?.user){
        if(!cloudUser || cloudUser.id!==session.user.id) await connectCloudForUser(session.user);
      }else{
        cloudUser=null;cloudPropertyId=null;cloudReady=false;updateCloudBar();
      }
    });
  }catch(e){
    console.error('Supabase client failed to load',e);
    cloudToast('Cloud connection unavailable. The app is still working locally.','error');
    const bar=document.getElementById('cloudBar'); if(bar)bar.dataset.state='offline';
  }
}

document.addEventListener('DOMContentLoaded',startHomeCloud);
