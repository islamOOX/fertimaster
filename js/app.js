const $=s=>document.querySelector(s),app=$("#app"),q=$("#q");
const norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const ph=(t,h)=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h},35%,90%)"/><stop offset="1" stop-color="hsl(${h+30},40%,72%)"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><text x="400" y="260" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#2d4a3e" opacity=".7">${t}</text></svg>`);
const img=(src,t,h)=>`<img loading="lazy" src="assets/img/${src}" alt="${t}" data-f="${ph(t,h)}" onerror="this.onerror=null;this.src=this.dataset.f">`;
const rg=(r,p=100)=>Math.round(r[0]*p/100)+"–"+Math.round(r[1]*p/100);
function home(){const t=norm(q.value.trim()),l=CROPS.filter(c=>norm(c.nom+" "+c.sci).includes(t));
app.innerHTML=`<h1>Nutrition des cultures</h1><p class="sub">Besoins en N, P, K et autres éléments par stade phénologique.</p><div class="grid">${l.map(c=>`<a class="card" href="#${c.id}">${img(c.id+".jpg",c.nom,c.h)}<div><h3>${c.nom}</h3><i>${c.sci}</i></div></a>`).join("")||"<p>Aucune culture trouvée.</p>"}</div>`}
function detail(c){const n=["N","P","K"],u=["N","P₂O₅","K₂O"];
app.innerHTML=`<a class="back" href="#">← Toutes les cultures</a><h1>${c.nom}</h1><i style="color:var(--mut)">${c.sci}</i>
<div class="hero">${img(c.id+".jpg",c.nom,c.h)}</div>
<div class="tot">${n.map((k,i)=>`<div><b>${rg(c.tot[k])}</b><span>${u[i]} kg/ha (total)</span></div>`).join("")}<div><b style="font-size:1rem">${c.aut}</b><span>Autres éléments</span></div></div>
<p class="note">${c.note}</p><h2 style="font-weight:300">Stades phénologiques</h2>
${c.st.map((s,j)=>`<article class="st">${img(c.id+"-"+(j+1)+".jpg",s[0],c.h+j*12)}<div><h3>${s[0]}</h3><small>${s[1]}</small>
${n.map((k,i)=>`<div class="bar"><span>${u[i]}</span><s><i style="width:0" data-w="${s[2+i]}%"></i></s><span>${s[2+i]}% · ${rg(c.tot[k],s[2+i])}</span></div>`).join("")}
<div class="mi"><b>Autres éléments :</b> ${s[5]}</div></div></article>`).join("")}
<p class="note">Références de cette culture : ${c.refs.map(r=>"["+r+"]").join(" ")} (détail en bas de page).</p>`;
requestAnimationFrame(()=>document.querySelectorAll("[data-w]").forEach(e=>e.style.width=e.dataset.w))}
function route(){const c=CROPS.find(c=>"#"+c.id==location.hash);c?detail(c):home();scrollTo(0,0)}
q.addEventListener("input",()=>{if(location.hash)location.hash="";else home()});
addEventListener("hashchange",route);
$("#refs").innerHTML=Object.entries(REFS).map(([k,v])=>`<li value="${k}">${v}</li>`).join("");route();
