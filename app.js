const FB_URL = "https://www.facebook.com/profile.php?id=61571002991837";
let menuItems = [], siteData = {}, activeCategory = "All", basket = [];
const grid = document.querySelector("#product-grid"), filters = document.querySelector("#filters"), search = document.querySelector("#search");
const toast = document.querySelector("#toast");
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2600)}
function escapeHTML(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function setBusinessData(data){
 siteData=data;document.title=`${data.businessName||"Ladrillo Beans"} — Good food, great moments`;
 document.querySelectorAll("[data-facebook]").forEach(a=>a.href=data.facebook||FB_URL);
 document.querySelector("#announcement").textContent=data.announcement||"";
 document.querySelector("#hero-title").textContent=data.heroTitle||"";
 document.querySelector("#hero-text").textContent=data.heroText||"";
 document.querySelector("#story-title").textContent=data.storyTitle||"";
 document.querySelector("#story-text").textContent=data.storyText||"";
 document.querySelector("#promo-title").textContent=data.promoTitle||"";
 document.querySelector("#promo-text").textContent=data.promoText||"";
 if(data.promoImage)document.querySelector("#promo-image").src=data.promoImage;
 const details=[data.location,data.phone,data.email,data.hours].filter(Boolean);
 document.querySelector("#business-details").textContent=details.length?details.join(" · "):"Additional contact and location details will be added when confirmed.";
}
function renderFilters(){
 const cats=["All",...new Set(menuItems.map(p=>p.category).filter(Boolean))];
 filters.innerHTML=cats.map(c=>`<button class="filter-btn ${c===activeCategory?"active":""}" type="button" data-category="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("");
 filters.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.category;renderFilters();renderMenu()}));
}
function renderMenu(){
 const q=search.value.trim().toLowerCase();
 const visible=menuItems.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q)));
 if(!visible.length){grid.innerHTML='<div class="empty">No menu items match that search. Try another keyword or category.</div>';return}
 grid.innerHTML=visible.map(p=>`<article class="product-card"><div class="product-image"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy"><span class="product-category">${escapeHTML(p.category||"Menu")}</span></div><div class="product-info"><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p><button class="product-action" type="button" data-add="${escapeHTML(p.id)}">Add to enquiry list <span>↗</span></button></div></article>`).join("");
 grid.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToBasket(b.dataset.add)));
}
function addToBasket(id){
 const item=menuItems.find(p=>p.id===id);if(!item)return;
 const existing=basket.find(p=>p.id===id);if(existing)existing.qty++;else basket.push({...item,qty:1});
 updateBasket();notify(`${item.name} added to your enquiry list.`);
}
function updateBasket(){
 let button=document.querySelector("#basket-button");
 if(!button){button=document.createElement("button");button.id="basket-button";button.className="basket-button";button.type="button";button.addEventListener("click",submitEnquiry);document.body.append(button)}
 button.textContent=`Enquiry list · ${basket.reduce((n,p)=>n+p.qty,0)}  ↗`;
 button.style.display=basket.length?"block":"none";
}
async function submitEnquiry(){
 if(!basket.length)return;
 const lines=basket.map(p=>`• ${p.name} x${p.qty}`).join("\n");
 const message=`Hello Ladrillo Beans! I'd like to ask about these menu selections:\n${lines}\n\nPlease share the current prices, availability and ordering details. Thank you!`;
 try{await navigator.clipboard.writeText(message);notify("Your enquiry list was copied. Paste it into your Facebook message.");}
 catch(e){notify("Opening Facebook. Please mention your selected items in your message.");}
 window.open(siteData.facebook||FB_URL,"_blank","noopener,noreferrer");
}
document.querySelector(".menu-toggle").addEventListener("click",e=>{
 const nav=document.querySelector("#nav"),open=nav.classList.toggle("open");
 e.currentTarget.setAttribute("aria-expanded",String(open));
});
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector("#nav").classList.remove("open");document.querySelector(".menu-toggle").setAttribute("aria-expanded","false")}));
search.addEventListener("input",renderMenu);
document.querySelector("#year").textContent=new Date().getFullYear();
Promise.all([fetch("/data/site.json").then(r=>{if(!r.ok)throw Error("site");return r.json()}),fetch("/data/menu.json").then(r=>{if(!r.ok)throw Error("menu");return r.json()})])
.then(([s,m])=>{setBusinessData(s);menuItems=Array.isArray(m)?m:(m.menu||[]);renderFilters();renderMenu();})
.catch(()=>{grid.innerHTML='<div class="empty">The menu could not be loaded. Please refresh or message us on Facebook.</div>';});

function renderReviews(reviews){
 const section=document.querySelector("#reviews"),grid=document.querySelector("#review-grid");
 if(!reviews.length)return;
 section.hidden=false;
 grid.innerHTML=reviews.map(r=>`<article class="review-card"><p>“${escapeHTML(r.quote)}”</p><span>${escapeHTML(r.name||"Customer")}</span></article>`).join("");
}
