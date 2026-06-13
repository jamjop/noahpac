const DATA = {
  meta: {
    facility: "Trinity Hospital",
    city: "Minot, ND",
    period: "January 1 – December 31, 2022",
    published: "2023",
    source: "ND HHS Antibiogram Archive",
    note: "% Susceptible · 1st isolate/patient/year"
  },
  antibiotics: [
    {id:"pen", name:"Penicillin G",              abbr:"PEN G"},
    {id:"amp", name:"Ampicillin",                abbr:"AMP"},
    {id:"oxa", name:"Oxacillin",                 abbr:"OXA"},
    {id:"ams", name:"Ampicillin / Sulbactam",    abbr:"AMP/SUL"},
    {id:"ptz", name:"Pip / Tazobactam",          abbr:"PIP/TAZ"},
    {id:"cfz", name:"Cefazolin",                 abbr:"CFZ"},
    {id:"cfx", name:"Cefoxitin",                 abbr:"CFX"},
    {id:"cxm", name:"Cefuroxime",                abbr:"CXM"},
    {id:"ctx", name:"Cefotaxime",                abbr:"CTX"},
    {id:"cro", name:"Ceftriaxone",               abbr:"CRO"},
    {id:"caz", name:"Ceftazidime",               abbr:"CAZ"},
    {id:"fep", name:"Cefepime",                  abbr:"FEP"},
    {id:"mem", name:"Meropenem",                 abbr:"MEM"},
    {id:"gen", name:"Gentamicin",                abbr:"GEN"},
    {id:"tob", name:"Tobramycin",                abbr:"TOB"},
    {id:"cip", name:"Ciprofloxacin",             abbr:"CIP"},
    {id:"lvx", name:"Levofloxacin",              abbr:"LVX"},
    {id:"van", name:"Vancomycin",                abbr:"VAN"},
    {id:"tet", name:"Tetracycline",              abbr:"TET"},
    {id:"cli", name:"Clindamycin",               abbr:"CLI"},
    {id:"azi", name:"Azithromycin",              abbr:"AZI"},
    {id:"sxt", name:"TMP / SMX",                abbr:"TMP/SMX"},
    {id:"rif", name:"Rifampin",                  abbr:"RIF"},
    {id:"dap", name:"Daptomycin",                abbr:"DAP"},
    {id:"lzd", name:"Linezolid",                 abbr:"LZD"},
    {id:"nit", name:"Nitrofurantoin (urine)",     abbr:"NIT"}
  ],
  organisms: [
    // Gram-positive
    {
      name:"Staph aureus (MSSA)", gram:"positive", isolates:483,
      s:{pen:"nr",oxa:100,ams:100,ptz:"nr",cfz:"nr",cfx:"nr",cxm:"nr",ctx:"nr",cro:"nr",caz:"nr",fep:"nr",mem:"nr",gen:99,tob:"nr",cip:89,lvx:90,van:100,tet:94,cli:81,azi:69,sxt:100,rif:100,dap:100,lzd:100,nit:100}
    },
    {
      name:"Staph aureus (MRSA)", gram:"positive", isolates:162,
      s:{oxa:0,ams:0,mem:98,gen:"nr",cip:32,lvx:35,van:100,tet:96,cli:80,sxt:98,rif:99,dap:99,lzd:100,nit:93}
    },
    {
      name:"Staph aureus (All strains)", gram:"positive", isolates:645,
      s:{amp:"nr",oxa:75,ams:75,ptz:"nr",cfz:"nr",cfx:"nr",cxm:"nr",ctx:"nr",cro:"nr",caz:"nr",fep:"nr",mem:98,gen:"nr",cip:75,lvx:76,van:100,tet:95,cli:81,azi:56,sxt:99,rif:100,dap:100,lzd:100,nit:98}
    },
    {
      name:"Staph, Coagulase Negative", gram:"positive", isolates:280,
      s:{oxa:50,ams:50,mem:96,gen:"nr",cip:85,lvx:85,van:100,tet:87,cli:64,azi:42,sxt:83,rif:99,dap:100,lzd:100,nit:100}
    },
    {
      name:"Streptococcus pneumoniae", gram:"positive", isolates:39,
      s:{pen:93,amp:"nr",ctx:100,cro:100,fep:"nr",mem:89,lvx:97,van:100,tet:76,cli:86,azi:75,sxt:79}
    },
    {
      name:"Enterococcus faecalis", gram:"positive", isolates:353,
      s:{amp:100,cip:84,lvx:89,van:100,tet:31,sxt:50,rif:100,dap:100,nit:100}
    },
    {
      name:"Enterococcus faecium", gram:"positive", isolates:45,
      s:{amp:33,cip:20,lvx:36,van:67,tet:64,rif:100,dap:98,nit:83}
    },
    // Gram-negative
    {
      name:"E. coli", gram:"negative", isolates:2424,
      s:{amp:64,ams:68,ptz:100,cfz:93,cfx:97,cxm:93,ctx:95,cro:95,caz:96,fep:96,mem:100,gen:94,tob:97,cip:"nr",lvx:"nr",sxt:84,nit:98}
    },
    {
      name:"Klebsiella pneumoniae", gram:"negative", isolates:421,
      s:{ptz:98,cfz:97,cfx:96,cxm:94,ctx:97,cro:97,caz:98,fep:98,mem:100,gen:99,tob:99,sxt:94,nit:48}
    },
    {
      name:"Klebsiella oxytoca", gram:"negative", isolates:133,
      s:{ams:72,ptz:97,cfz:19,cfx:94,cxm:89,ctx:95,cro:95,caz:97,fep:96,mem:100,gen:96,tob:98,sxt:97,nit:93}
    },
    {
      name:"Proteus mirabilis", gram:"negative", isolates:166,
      s:{amp:89,ptz:95,cfz:100,cfx:93,cxm:99,ctx:97,cro:99,caz:98,fep:100,mem:99,gen:95,sxt:86}
    },
    {
      name:"Enterobacter cloacae", gram:"negative", isolates:137,
      s:{ptz:85,ctx:69,cro:69,caz:79,fep:94,mem:100,gen:99,tob:99,sxt:96,nit:26}
    },
    {
      name:"Klebsiella aerogenes", gram:"negative", isolates:63,
      note:"formerly Enterobacter",
      s:{ptz:90,cxm:84,ctx:84,cro:83,caz:98,fep:100,mem:100,gen:100,sxt:98,nit:24}
    },
    {
      name:"Serratia marcescens", gram:"negative", isolates:28,
      s:{ptz:89,cxm:93,ctx:93,cro:93,caz:96,fep:100,mem:100,gen:100,sxt:100}
    },
    {
      name:"Citrobacter freundii", gram:"negative", isolates:35,
      s:{ptz:89,cfx:80,cxm:80,ctx:80,cro:100,caz:100,fep:97,mem:97,sxt:89,nit:96}
    },
    {
      name:"Pseudomonas aeruginosa", gram:"negative", isolates:192,
      s:{ptz:96,caz:96,fep:96,mem:98,gen:87,tob:99}
    },
    {
      name:"Stenotrophomonas maltophilia", gram:"negative", isolates:24,
      s:{sxt:100}
    },
    {
      name:"H. influenzae", gram:"negative", isolates:22,
      note:"68% beta-lactamase negative",
      s:{}
    }
  ]
};

const abxById = Object.fromEntries(DATA.antibiotics.map(a => [a.id, a]));

let activeGram = "positive";

function cellCls(val) {
  if (val === null || val === undefined) return "na";
  if (val === "nr") return "nr";
  if (val >= 90) return "hi";
  if (val >= 70) return "mid";
  return "lo";
}

function cellTxt(val) {
  if (val === null || val === undefined) return "—";
  if (val === "nr") return "~";
  return val;
}

function getAbxForGram(orgs) {
  const seen = new Set();
  orgs.forEach(o => Object.keys(o.s).forEach(id => seen.add(id)));
  return DATA.antibiotics.filter(a => seen.has(a.id));
}

function render() {
  const orgs = DATA.organisms.filter(o => o.gram === activeGram);
  const abxList = getAbxForGram(orgs);

  const head = document.getElementById("thead");
  const body = document.getElementById("tbody");

  head.innerHTML = `<tr>
    <th class="col-org">Organism</th>
    <th class="col-n">n</th>
    ${abxList.map(a => `<th title="${a.name}">${a.abbr}</th>`).join("")}
  </tr>`;

  body.innerHTML = orgs.map(org => `
    <tr>
      <td class="col-org">
        ${org.name}${org.note ? `<span class="org-note">${org.note}</span>` : ""}
      </td>
      <td class="col-n">${org.isolates.toLocaleString()}</td>
      ${abxList.map(a => {
        const v = org.s[a.id] ?? null;
        return `<td class="c-${cellCls(v)}">${cellTxt(v)}</td>`;
      }).join("")}
    </tr>
  `).join("");
}

document.querySelectorAll(".gram-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".gram-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeGram = btn.dataset.gram;
    render();
  });
});

render();
