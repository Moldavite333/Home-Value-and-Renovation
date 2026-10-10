// Clickable renovation project detail windows for Home Headquarters.
// Loaded after app.js. Keeps the core tracker simple while adding deeper project guidance.

const RENOVATION_DETAILS = {
  punch: {
    what: 'A whole-house cleanup pass focused on the small visible defects that make a home feel neglected: wall scuffs, chipped trim, nail holes, loose hardware, sticky doors, damaged caulk, stained paint, worn outlet covers, broken latches, obvious patchwork and other unfinished details.',
    means: 'The goal is not a remodel. It is to make the house feel maintained, finished and cared for. Buyers tend to mentally add up every visible flaw; a long list of little problems can make them assume there are larger hidden problems too.',
    value: 'This usually adds value by removing buyer objections rather than by creating new square footage. It improves first impressions, photographs, showing quality and inspection confidence. It can also reduce the chance that buyers discount the house for perceived deferred maintenance.',
    tasks: ['Patch nail holes, cracks and damaged drywall','Touch up or repaint visibly worn walls and trim','Re-caulk tubs, sinks, windows and exterior penetrations where needed','Tighten loose knobs, hinges, railings and cabinet hardware','Repair sticky doors, broken latches and damaged screens','Replace visibly worn switch/outlet covers and similar inexpensive finish items','Create one final room-by-room punch list and close every easy item'],
    sweat: 'Easy',
    sweatWhy: 'Mostly time, patience and basic hand-tool work. Painting and patching are highly DIY-friendly. Anything involving live electrical wiring, structural damage or moisture intrusion should move to a professional.',
    diy: 'Excellent sweat-equity project. The material cost is low compared with the labor you can contribute yourself.',
    pro: 'Bring in a pro only for electrical, plumbing leaks, rot, structural movement, significant drywall failure or anything you cannot diagnose confidently.'
  },
  fire: {
    what: 'Defensible-space and wildfire-risk work around the house: removing ladder fuels, thinning vegetation, clearing dead material, managing branches near structures, improving access and reducing combustible material immediately around buildings.',
    means: 'For a mountain property, this is both a safety project and a marketability project. The objective is to make the property easier to defend and less likely to create insurance or inspection concerns.',
    value: 'It can protect value by improving insurability, lowering perceived wildfire risk and making the acreage look intentional instead of overgrown. It may not produce a dollar-for-dollar appraisal bump, but it can prevent insurance and buyer objections that are far more expensive.',
    tasks: ['Remove dead limbs and accumulated combustible debris','Thin ladder fuels and crowded understory vegetation','Maintain separation between trees and structures where appropriate','Keep roofs, gutters, decks and foundation edges clear of debris','Relocate combustible storage away from structures','Document completed mitigation work for future buyers and insurers'],
    sweat: 'Medium',
    sweatWhy: 'A lot can be done with hand tools and property maintenance skills, but slope, chainsaw use, large trees and hauling can turn this into physically demanding work.',
    diy: 'Good sweat equity for clearing, pruning small material, raking and cleanup.',
    pro: 'Use qualified tree professionals for large trees, overhead hazards, technical felling or work near utilities.'
  },
  deck: {
    what: 'Repairing the deck as a structural and lifestyle feature: surface condition, stairs, railings, fasteners, ledger connections, posts, framing, drainage, staining and finish.',
    means: 'On a mountain house the deck is part of the living experience. Buyers read it as outdoor square footage even though it is not living-area GLA. A tired or unsafe deck creates an immediate inspection and liability concern.',
    value: 'A safe, attractive deck supports the mountain-living appeal of the property, improves first impressions and removes one of the most obvious exterior maintenance objections. Structural safety matters more than cosmetic stain color.',
    tasks: ['Inspect decking, stairs, rails, posts and framing','Replace rotten or split boards','Correct loose railings and stair movement','Address water traps and poor drainage','Refasten or replace failed hardware where appropriate','Clean and refinish sound wood after repairs','Document any permitted structural work'],
    sweat: 'Medium',
    sweatWhy: 'Cleaning, sanding, staining and individual board replacement are DIY-friendly. Structural framing, ledger issues, elevated work and major stair/rail reconstruction increase the difficulty quickly.',
    diy: 'Strong sweat-equity opportunity if the structure is already sound.',
    pro: 'Use a contractor or engineer for structural movement, ledger problems, major rot, elevated framing or code-related guard/stair reconstruction.'
  },
  windows: {
    what: 'Targeted window and building-envelope improvements rather than automatically replacing every window. This can include larger view windows, egress-compliant openings, failed glazing, air sealing, flashing and weatherproofing.',
    means: 'The purpose is to improve light, comfort, views, ventilation and code utility where those improvements matter most. On this property, strategic openings can matter more than a generic whole-house window package.',
    value: 'Good windows can reduce a buyer objection around comfort and maintenance while improving the emotional experience of the house. A well-placed view window can make a small room feel substantially better. Proper egress can also create legal utility where applicable, although a window alone never establishes legal bedroom or living-area status.',
    tasks: ['Identify windows with failed seals, rot or air leakage','Prioritize openings that improve views and natural light','Confirm structural header requirements before enlarging openings','Verify current egress requirements where relevant','Install proper flashing and exterior water management','Air-seal and insulate around new units','Finish interior/exterior trim cleanly'],
    sweat: 'Hard',
    sweatWhy: 'Simple trim and air sealing are approachable, but enlarging openings, flashing exterior walls and altering structural framing have real water-intrusion and structural consequences.',
    diy: 'Best DIY contribution is demolition preparation, trim, painting and air-sealing after the critical installation is correct.',
    pro: 'Use professionals for structural openings, major window replacement, exterior flashing and any egress work where code compliance matters.'
  },
  kitchen: {
    what: 'A restrained kitchen refresh aimed at condition and usability rather than an expensive luxury gut renovation. Think paint, lighting, hardware, surfaces, flooring, storage improvements and selective appliance/fixture replacement.',
    means: 'The existing layout stays unless there is a strong functional reason to change it. Money is concentrated where a buyer notices condition, cleanliness and everyday usability.',
    value: 'Kitchens heavily influence buyer perception, but expensive custom work can outrun what the property supports. A disciplined refresh can make the whole house feel newer without tying up excessive capital.',
    tasks: ['Keep serviceable cabinets and improve finish/hardware','Repair damaged doors, drawers and hinges','Improve task lighting and general lighting','Refresh counters or backsplash only if existing surfaces are a clear objection','Address worn flooring','Improve storage where inexpensive','Use durable, neutral finishes rather than trend-heavy luxury choices'],
    sweat: 'Medium',
    sweatWhy: 'Painting, hardware, backsplash, trim and some flooring can be DIY projects. Counter fabrication, new circuits, plumbing relocation and cabinet layout changes are more technical.',
    diy: 'Very good sweat equity if the project remains a refresh rather than a gut renovation.',
    pro: 'Use licensed trades for electrical and plumbing changes and specialists for stone fabrication or complex cabinetry.'
  },
  bath1: {
    what: 'Renovating the existing bathroom so the only current bath is clean, durable, waterproof, functional and visually current.',
    means: 'Because this is the house’s existing full bath, reliability matters more than fancy finishes. Waterproofing, ventilation and plumbing condition should be solved before cosmetic upgrades.',
    value: 'A worn only-bath can become a major buyer objection. Improving it can support condition, photographs and showing quality, but overbuilding a luxury bath in a small house may not be fully recovered.',
    tasks: ['Correct leaks or moisture problems first','Verify subfloor and wall condition','Improve ventilation','Repair or replace worn tub/shower components','Use a reliable waterproofing system for tiled wet areas','Refresh vanity, lighting, mirror and fixtures','Choose durable easy-to-clean finishes'],
    sweat: 'Hard',
    sweatWhy: 'Demolition and finish work can be DIY, but waterproofing failures and plumbing errors are expensive. Bathrooms combine several trades in a small space.',
    diy: 'Good sweat equity in demolition, painting, trim, accessories and some finish installation if you are comfortable with it.',
    pro: 'Use qualified trades for hidden plumbing, electrical, difficult tile/waterproofing and structural/subfloor damage.'
  },
  roof: {
    what: 'Replacing the roof when condition, age, leaks or insurance requirements justify it. This is a protection-of-value project rather than a decorative upgrade.',
    means: 'A roof nearing failure can block financing, insurance and buyer confidence. Replacement should solve the weatherproofing system as a whole: roofing, flashing, penetrations, ventilation and damaged decking.',
    value: 'A sound roof protects the entire structure and removes one of the largest inspection objections a buyer can encounter. It usually protects value more than it creates speculative upside.',
    tasks: ['Document current roof age and condition','Inspect for leaks, damaged decking and flashing issues','Check ventilation and penetrations','Obtain comparable contractor bids','Verify permit and insurance requirements','Keep invoices, warranties and permit records for resale'],
    sweat: 'Hard',
    sweatWhy: 'Steep/elevated roof work carries serious fall risk and mistakes can cause hidden water damage. Mountain weather adds another layer of difficulty.',
    diy: 'Limited. Ground cleanup and documentation are reasonable DIY contributions.',
    pro: 'Roof replacement should generally be handled by an insured roofing contractor, especially on steep or elevated mountain roofs.'
  },
  bath2: {
    what: 'Adding a fully permitted second bathroom in a location that works with the existing plumbing, structure and septic/wastewater capacity.',
    means: 'This changes the functional category of a 2-bed/1-bath home. The best version is legal, documented and sensibly located rather than squeezed into the house solely to claim another fixture count.',
    value: 'A second legal bath can widen the buyer pool and remove a meaningful objection for couples, guests and families. It may also improve comparable-property matching because many buyers filter searches by bathroom count.',
    tasks: ['Choose a location close to practical plumbing routes','Verify septic/wastewater implications before design','Confirm permit and code requirements','Plan ventilation, electrical and moisture protection','Build with durable finishes rather than luxury overspend','Retain permits, inspections and final documentation'],
    sweat: 'Hard',
    sweatWhy: 'A new bathroom involves plumbing, electrical, ventilation, framing, waterproofing and code inspections. DIY labor can help, but the critical systems are technical.',
    diy: 'Demolition, framing assistance, painting, trim and finish work can reduce cost depending on permit rules and skill level.',
    pro: 'Use licensed trades and permit professionals for plumbing/electrical and any work required by the jurisdiction.'
  },
  adu: {
    what: 'Converting the existing powered garage and finished/heated upper bonus room into documented, permitted guest/in-law or ADU-style utility while preserving useful garage function where the final design allows it.',
    means: 'This is not simply decorating the upstairs room. It means resolving legal use, fire separation, egress, insulation/energy requirements, plumbing, wastewater capacity and any zoning or occupancy requirements that apply.',
    value: 'The potential value comes from documented legal utility: guest space, multi-generational flexibility, office/studio use or rental potential where legally allowed. Finished but undocumented bonus area is useful; permitted legal living utility is much easier for buyers and appraisers to understand and value.',
    tasks: ['Verify zoning and legal-use options before design spending','Pull permit history for the garage/bonus structure','Measure actual usable floor area and ceiling heights','Confirm egress and emergency escape requirements','Evaluate fire separation between garage and occupied space','Verify electrical capacity and existing 220V service','Evaluate plumbing route and septic/wastewater capacity','Design bath/kitchenette only after feasibility is known','Keep complete permits, plans, inspections and invoices'],
    sweat: 'Hard',
    sweatWhy: 'There is plenty of owner labor available in demolition, finish carpentry, painting and fixtures, but the project crosses structural, fire, electrical, plumbing, sanitation and land-use issues.',
    diy: 'Potentially substantial sweat equity in non-critical finish work after the legal and technical design is established.',
    pro: 'Use professionals for permitting, structural work, fire separation, plumbing, electrical and any design decisions tied to legal habitation.'
  }
};


const RENOVISION_VIDEOS = {
  punch: [
    {
      title: 'How to Patch Drywall',
      url: 'https://www.youtube.com/watch?v=MYyN_h-X5vE',
      fit: 'DIY: excellent',
      summary: 'Useful for holes and damaged wall sections before paint. The practical sequence is patch, compound, feather, sand, prime as needed, then paint.'
    },
    {
      title: 'DIY How to Paint Like a Pro — A to Z',
      url: 'https://www.youtube.com/watch?v=2eUxz_or2Qs',
      fit: 'DIY: excellent',
      summary: 'Covers surface prep, fixing wall imperfections, sanding, cutting, rolling, a second coat and baseboard trim — exactly the kind of low-cost owner labor that belongs in the pre-sale punch list.'
    },
    {
      title: 'How to Paint a Room in a Weekend',
      url: 'https://www.youtube.com/watch?v=HLQCd3bQvPM',
      fit: 'DIY: excellent',
      summary: 'A shorter room-focused workflow covering brush loading, cutting, rolling, back-rolling, sanding between coats and trim.'
    }
  ],
  deck: [
    {
      title: 'The Best Way to Stain Your Deck PERIOD!!!!',
      url: 'https://www.youtube.com/watch?v=HLb527FWg0A',
      fit: 'DIY: excellent if structure is sound',
      summary: 'A good match for cleaning and refinishing a structurally sound deck. Keep structural framing, ledger, major rot and elevated safety issues separate from cosmetic refinishing.'
    },
    {
      title: "Easiest Deck You'll Ever Build | Anyone Can Do This",
      url: 'https://www.youtube.com/watch?v=H596PLvg2AY',
      fit: 'DIY: useful reference',
      summary: 'Shows the framing and assembly logic behind a simple floating deck. Useful background for board replacement and understanding deck structure even when the existing deck is being repaired rather than rebuilt.'
    }
  ],
  windows: [
    {
      title: 'How to Replace a Window EASY',
      url: 'https://www.youtube.com/watch?v=BbEMx_2huWc',
      fit: 'DIY: selective',
      summary: 'Shows replacement-window removal and installation, including water/air sealing. Good for understanding the work; enlarging openings, structural changes, egress and exterior flashing still need a project-specific code and risk check.'
    },
    {
      title: 'How to Install a New Window | Quick and Easy',
      url: 'https://www.youtube.com/watch?v=ISmYpOQHPSs',
      fit: 'DIY: selective',
      summary: 'Useful for new-window installation details and sequencing. Treat weatherproofing and opening changes as the critical risk points.'
    }
  ],
  kitchen: [
    {
      title: 'DIY Kitchen Remodel That Will Save You Money!',
      url: 'https://www.youtube.com/watch?v=VM-lc8rYolQ',
      fit: 'DIY: strong',
      summary: 'Especially relevant to our resale-first plan: cabinet painting, countertop work, tile-over-tile, sink installation and vinyl plank flooring while keeping the project budget-conscious.'
    },
    {
      title: 'How To Install Vinyl Plank Flooring Like a Pro',
      url: 'https://www.youtube.com/watch?v=waCiOUOaR_A',
      fit: 'DIY: strong',
      summary: 'A practical flooring install reference for a cosmetic refresh where the subfloor is already sound and flat.'
    }
  ],
  bath1: [
    {
      title: 'Completely Redo Your Bathroom on a Small Budget!',
      url: 'https://www.youtube.com/watch?v=1xHeYVUQxD8',
      fit: 'DIY: demolition / prep',
      summary: 'Good owner-labor material for fixture removal and controlled demolition. This is where sweat equity can reduce cost before plumbing, electrical or waterproofing work becomes critical.'
    },
    {
      title: 'DIY How to Renovate the Tub / Shower from A to Z',
      url: 'https://www.youtube.com/watch?v=NS6TPiHaN2Y',
      fit: 'DIY: intermediate',
      summary: 'Long-form tub/shower renovation guide covering demolition, plumbing transitions, tub installation, waterproofing board, tile, fixtures, silicone and finish repairs. Use it as a system guide, with local permit/code checks for plumbing and electrical.'
    }
  ],
  bath2: [
    {
      title: 'DIY How to Renovate the Tub / Shower from A to Z',
      url: 'https://www.youtube.com/watch?v=NS6TPiHaN2Y',
      fit: 'DIY: mixed',
      summary: 'Useful for understanding the full wet-area build sequence. We can self-perform demo, framing assistance, board, paint, trim and selected finish work while separating permit-critical trades.'
    },
    {
      title: 'DIY How to Frame Your Basement A to Z',
      url: 'https://www.youtube.com/watch?v=wN7ftczQfok',
      fit: 'DIY: strong for non-structural framing',
      summary: 'Covers interior walls, door framing, bottom plates, walls, bulkheads and framing around utilities — highly relevant to creating a new bathroom enclosure without treating structural or utility work casually.'
    }
  ],
  adu: [
    {
      title: 'DIY | How To Renovate an Unfinished Basement | A To Z',
      url: 'https://www.youtube.com/watch?v=RIzNQhfVFWA',
      fit: 'DIY: strong reference',
      summary: 'A broad start-to-finish renovation reference spanning framing and finish work. Useful for planning which garage/loft conversion tasks can be owner labor after legal-use, fire-separation and utility requirements are settled.'
    },
    {
      title: 'DIY How to Frame Your Basement A to Z',
      url: 'https://www.youtube.com/watch?v=wN7ftczQfok',
      fit: 'DIY: strong for non-structural framing',
      summary: 'A practical framing guide for walls, doors and bulkheads. Good candidate for owner labor once the permitted layout is known.'
    },
    {
      title: 'My 20 Steps To A Perfect Renovation',
      url: 'https://www.youtube.com/watch?v=KnMe4LC22lc',
      fit: 'DIY: planning',
      summary: 'Useful for sequencing the project so demolition, rough trades, inspections, insulation/drywall and finish work happen in the right order instead of creating rework.'
    }
  ]
};

function renovationVideosFor(project){
  return RENOVISION_VIDEOS[project.id] || [];
}

function renderRenovisionVideos(project){
  const videos=renovationVideosFor(project);
  if(!videos.length) return '';
  return `
    <div class="projectDetailSection">
      <h3>Home RenoVision DIY guides</h3>
      <p class="tiny">Matched from Home RenoVision DIY videos and transcript/chapter research. These are owner-labor candidates, not substitutes for local permits, inspections or a qualified trade where required.</p>
      <div class="renoVideoList">
        ${videos.map(v=>`
          <a class="renoVideoCard" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">
            <div class="renoVideoTop"><strong>${esc(v.title)}</strong><span class="badge good">${esc(v.fit)}</span></div>
            <div class="tiny">${esc(v.summary)}</div>
            <div class="renoVideoLink">Watch on YouTube ↗</div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

function sweatClass(level){
  return level === 'Easy' ? 'detailEasy' : level === 'Hard' ? 'detailHard' : 'detailMedium';
}

function projectDetailFor(project){
  return RENOVATION_DETAILS[project.id] || {
    what: project.why || 'A custom renovation or maintenance project added to your roadmap.',
    means: 'Define the finished scope clearly before spending money so the project can be judged against cost, resale value and personal usefulness.',
    value: project.why || 'Value depends on whether the project removes a buyer objection, protects the structure, improves legal utility or materially improves everyday function.',
    tasks: ['Define the exact scope','Get realistic material and labor costs','Identify permit or trade requirements','Document the finished work for future resale'],
    sweat: 'Medium',
    sweatWhy: 'Custom projects vary. Rate this up or down once the actual scope and required trades are known.',
    diy: 'DIY potential depends on the final scope.',
    pro: 'Use qualified professionals for structural, electrical, plumbing, roofing, gas, major tree work or other safety/code-critical work.'
  };
}

function ensureProjectDetailStyles(){
  if(document.getElementById('projectDetailStyles')) return;
  const style=document.createElement('style');
  style.id='projectDetailStyles';
  style.textContent=`
    .projectOpen{cursor:pointer;text-decoration:underline;text-decoration-color:rgba(154,198,157,.34);text-underline-offset:3px}
    .projectOpen:hover{color:var(--green2)}
    .projectDetailHint{margin-top:7px;color:var(--green2);font-size:12px;font-weight:800;cursor:pointer;display:inline-flex;gap:5px;align-items:center}
    #projectDetailModal{position:fixed;inset:0;z-index:10020;background:rgba(0,0,0,.76);display:none;align-items:center;justify-content:center;padding:18px}
    #projectDetailModal.open{display:flex}
    #projectDetailCard{width:min(760px,100%);max-height:min(88vh,900px);overflow:auto;background:#152219;border:1px solid #3a5140;border-radius:20px;padding:18px;box-shadow:0 30px 90px rgba(0,0,0,.55)}
    .projectDetailTop{display:flex;gap:12px;align-items:flex-start}.projectDetailTop>div:first-child{flex:1}
    .projectDetailTitle{font-size:26px;line-height:1.06;font-weight:950;letter-spacing:-.035em;margin:3px 0 9px}
    .projectDetailSection{margin-top:14px;padding-top:13px;border-top:1px solid var(--line)}
    .projectDetailSection h3{font-size:15px;margin:0 0 5px;color:var(--green2)}
    .projectDetailSection p{margin:0;color:#dce3d9}
    .projectDetailTasks{margin:6px 0 0;padding-left:20px;color:#dce3d9}.projectDetailTasks li{margin:5px 0}
    .sweatCard{margin-top:12px;border:1px solid var(--line);border-radius:15px;padding:13px;background:#101a13}
    .sweatRating{display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin:5px 0 7px}.sweatWord{font-size:25px;font-weight:950}
    .detailEasy{color:#9ac69d}.detailMedium{color:#e0bd75}.detailHard{color:#e89a93}
    .detailMiniGrid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}.detailMini{background:#0d160f;border:1px solid #263b2b;border-radius:12px;padding:10px;font-size:12px;color:var(--muted)}
    .renoVideoList{display:grid;gap:8px;margin-top:9px}
    .renoVideoCard{display:block;text-decoration:none;background:#0d160f;border:1px solid #2d4733;border-radius:13px;padding:11px;color:#dce3d9}
    .renoVideoCard:hover{border-color:#6f9b76;background:#122017}
    .renoVideoTop{display:flex;gap:8px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;margin-bottom:5px}
    .renoVideoLink{margin-top:7px;color:var(--green2);font-size:12px;font-weight:900}
    @media(max-width:560px){#projectDetailModal{padding:8px}#projectDetailCard{max-height:94vh;border-radius:15px;padding:14px}.projectDetailTitle{font-size:22px}.detailMiniGrid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

function ensureProjectDetailModal(){
  ensureProjectDetailStyles();
  let modal=document.getElementById('projectDetailModal');
  if(modal) return modal;
  modal=document.createElement('div');
  modal.id='projectDetailModal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML='<div id="projectDetailCard" role="dialog" aria-modal="true" aria-labelledby="projectDetailTitle"></div>';
  document.body.appendChild(modal);
  modal.addEventListener('click',e=>{if(e.target===modal) closeProjectDetail()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && modal.classList.contains('open')) closeProjectDetail()});
  return modal;
}

function closeProjectDetail(){
  const modal=document.getElementById('projectDetailModal');
  if(!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

function openProjectDetail(project){
  const modal=ensureProjectDetailModal();
  const card=document.getElementById('projectDetailCard');
  const detail=projectDetailFor(project);
  const tasks=(detail.tasks||[]).map(x=>`<li>${esc(x)}</li>`).join('');
  card.innerHTML=`
    <div class="projectDetailTop">
      <div>
        <div class="label">Renovation detail</div>
        <div id="projectDetailTitle" class="projectDetailTitle">${esc(project.name)}</div>
        <div class="badgeRow">
          <span class="badge">${esc(project.tier||'project')}</span>
          <span class="badge ${Number(project.score)>=5?'good':''}">leverage ${Number(project.score)||0}/5</span>
          <span class="badge blue">${esc(project.type||'Custom')}</span>
          <span class="badge">planning budget ${money(Number(project.budget)||0)}</span>
        </div>
      </div>
      <button id="projectDetailClose" class="btn small ghost" aria-label="Close project detail">×</button>
    </div>
    <div class="projectDetailSection"><h3>What this item is</h3><p>${esc(detail.what)}</p></div>
    <div class="projectDetailSection"><h3>What it means for this property</h3><p>${esc(detail.means)}</p></div>
    <div class="projectDetailSection"><h3>Why / how it can add value</h3><p>${esc(detail.value)}</p></div>
    <div class="projectDetailSection"><h3>Typical scope</h3><ul class="projectDetailTasks">${tasks}</ul></div>
    <div class="sweatCard">
      <div class="label">Sweat equity difficulty</div>
      <div class="sweatRating"><span class="sweatWord ${sweatClass(detail.sweat)}">${esc(detail.sweat)}</span><span class="badge ${detail.sweat==='Easy'?'good':detail.sweat==='Hard'?'bad':'warn'}">DIY rating</span></div>
      <p class="tiny">${esc(detail.sweatWhy)}</p>
      <div class="detailMiniGrid"><div class="detailMini"><strong>Good owner-labor opportunity</strong><br>${esc(detail.diy)}</div><div class="detailMini"><strong>Where to use a professional</strong><br>${esc(detail.pro)}</div></div>
    </div>
    ${renderRenovisionVideos(project)}
    <div class="note" style="margin-top:12px">The budget and planning value-add shown here remain editable in the project card. Value impact is a planning estimate, not an appraisal or guarantee.</div>
  `;
  document.getElementById('projectDetailClose').onclick=closeProjectDetail;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function decorateProjectCards(){
  const box=document.getElementById('projectList');
  if(!box || typeof state==='undefined' || !Array.isArray(state.projects)) return;
  [...box.querySelectorAll('.project')].forEach(card=>{
    const title=card.querySelector('.projectHead label.check strong');
    if(!title || title.dataset.detailReady==='1') return;
    const project=state.projects.find(p=>String(p.name)===title.textContent.trim());
    if(!project) return;
    const detail=projectDetailFor(project);
    title.dataset.detailReady='1';
    title.classList.add('projectOpen');
    title.setAttribute('role','button');
    title.setAttribute('tabindex','0');
    title.setAttribute('aria-label',`Open details for ${project.name}`);
    const open=e=>{e.preventDefault();e.stopPropagation();openProjectDetail(project)};
    title.addEventListener('click',open);
    title.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){open(e)}});
    const reason=card.querySelector('p.tiny');
    if(reason){
      const hint=document.createElement('div');
      hint.className='projectDetailHint';
      hint.innerHTML=`View details <span class="badge ${detail.sweat==='Easy'?'good':detail.sweat==='Hard'?'bad':'warn'}">sweat equity: ${esc(detail.sweat)}</span>`;
      hint.addEventListener('click',open);
      reason.insertAdjacentElement('afterend',hint);
    }
  });
}

// Wrap the existing renderer so detail links return every time the cards re-render.
if(typeof renderRenovations==='function'){
  const baseRenderRenovations=renderRenovations;
  renderRenovations=function(){
    baseRenderRenovations();
    decorateProjectCards();
  };
}

document.addEventListener('DOMContentLoaded',()=>{
  ensureProjectDetailModal();
  decorateProjectCards();
});
