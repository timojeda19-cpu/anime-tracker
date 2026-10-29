// Anime Tracker widget for Scriptable (iPhone)
// Pulls live numbers from El's tracker so updates show up automatically.
const URL = "https://timojeda19-cpu.github.io/anime-tracker/data.json";
let d = {total:63, finished:58, top3:[{title:"Mashle: Magic and Muscles",status:"Watching now"},{title:"The Misfit of Demon King Academy",status:"Up next"},{title:"The Eminence in Shadow",status:"On HIDIVE"}]};
try { const r = new Request(URL + "?t=" + Date.now()); d = await r.loadJSON(); } catch (e) {}

const orange = new Color("#FF8A1F"), green = new Color("#3DDC97"), dim = new Color("#9AA0B4");
const w = new ListWidget();
const g = new LinearGradient(); g.colors = [new Color("#1B1830"), new Color("#0B0B14")]; g.locations = [0,1];
w.backgroundGradient = g;
w.setPadding(12,14,12,14);
w.url = "https://timojeda19-cpu.github.io/anime-tracker/";
const fam = config.widgetFamily || "medium";

const head = w.addText("ANIME TRACKER"); head.font = Font.boldSystemFont(10); head.textColor = dim;
w.addSpacer(6);
const row = w.addStack(); row.centerAlignContent();
function bubble(parent, num, label, color) {
  const s = parent.addStack(); s.layoutVertically();
  const n = s.addText(String(num)); n.font = Font.heavyRoundedSystemFont(fam === "small" ? 26 : 30); n.textColor = color;
  const l = s.addText(label); l.font = Font.mediumSystemFont(10); l.textColor = dim;
}
bubble(row, d.total, "titles", orange);
row.addSpacer(16);
bubble(row, d.finished, "finished", green);

if (fam !== "small") {
  w.addSpacer(8);
  d.top3.slice(0,3).forEach((t, i) => {
    const r = w.addStack(); r.centerAlignContent();
    const num = r.addText((i+1) + "  "); num.font = Font.boldSystemFont(12); num.textColor = i === 0 ? orange : dim;
    const tt = r.addText(t.title); tt.font = Font.semiboldSystemFont(12); tt.textColor = Color.white(); tt.lineLimit = 1;
    w.addSpacer(2);
  });
} else {
  w.addSpacer(6);
  const now = w.addText("▶ " + d.top3[0].title); now.font = Font.semiboldSystemFont(11); now.textColor = Color.white(); now.lineLimit = 2;
}
w.addSpacer();
w.refreshAfterDate = new Date(Date.now() + 60*60*1000);
if (config.runsInWidget) Script.setWidget(w); else await w.presentMedium();
Script.complete();
