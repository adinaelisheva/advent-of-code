const testInput1 = ['aaa: you hhh', 'you: bbb ccc', 'bbb: ddd eee', 'ccc: ddd eee fff', 'ddd: ggg', 'eee: out', 'fff: out', 'ggg: out', 'hhh: ccc fff iii', 'iii: out'];
const testInput2 = ['svr: aaa bbb','aaa: fft','fft: ccc','bbb: tty','tty: ccc','ccc: ddd eee','ddd: hub','hub: fff','eee: dac','dac: fff','fff: ggg hhh','ggg: out','hhh: out'];
const input = ['nxl: rqe jfg ife', 'gdt: bcf qyo bea rbl fsm qxe uri ath nav jjm bzs vbo', 'tqj: pgj mci', 'mzn: azn', 'tut: cix wzd jfv', 'rde: yyn mnd crn', 'frl: okl', 'wmb: hlf', 'xdw: tpv ajn gdt', 'pqw: qhc', 'ckb: yzn poo aae', 'sww: rcu', 'mti: sjt qsw', 'yat: aae hsb poo vir', 'pgj: ufj abz nqy', 'xpb: vxg lyd znh', 'ofg: gat ldr eqj', 'uyf: sqc ecr cbu urw ygw', 'qzt: vxg hdl lin znh', 'ied: out', 'tnu: nxf osm', 'tov: irt xpb phr ara tol', 'ogd: ajn gdt tpv prd ckr', 'dpp: czx yqu', 'dpx: rro', 'pnv: dkt mpe xbp', 'hty: tlg dbn xrw', 'ict: aae hsb', 'swz: prd ckr tpv gdt', 'tlg: lvg sls buk rib', 'irt: vxg znh', 'smf: ulc iwo hix zvx hvf', 'ohl: cmi weg', 'jpj: chu yqu wqk', 'xbp: gdt prd ckr tpv', 'okc: tgh', 'ick: hhx nxf osm', 'aim: kkf mkf', 'ncs: znh lin vxg', 'pya: ftn', 'apu: yzn vir aae hsb', 'jbe: out', 'bea: gat bbp eqj iiw ldr', 'xsv: xma', 'dkt: gdt ajn prd', 'iuq: nyh nym jek', 'azq: znh vxg lyd lin', 'lad: raf ezu', 'vmt: ero hff', 'inf: hmw mst rso', 'rxr: nxl xjz', 'lye: tzi', 'dqv: hkd', 'ezu: lzj ozu', 'vmk: awc wzq', 'new: zsq', 'afy: pin', 'mci: cnc ufj', 'bgp: hsb yzn', 'vln: fpt', 'pmd: jek bos wof nyh', 'tst: fir', 'yff: sjt you', 'wxr: rqe', 'ife: qyx lad weq rzu gxy ojl ste afy owe', 'vlv: jfg', 'fjz: pqv', 'xfv: xdw', 'uvl: dks csx jax', 'oai: mur you sjt', 'uey: rer fft', 'hzt: dtf', 'psd: goa say', 'crr: smp mcy yff', 'wzq: bld rbn rxr', 'czx: nsn', 'fpt: qtc yqd', 'jbp: xrw tlg wem', 'yxq: yuh kdn', 'sxi: xdw cbw', 'kgm: qsw sjt you', 'hbj: see sue pya', 'hmw: kli aau pic', 'ish: cqm uir ebe jur', 'alf: ckr prd ajn gdt', 'tax: atz wag', 'kvc: lyd hdl lin', 'whg: out', 'prd: gai duo bea rbl ofg bcf bzs vbo mni uri evw jjm uyu', 'cxe: ife jfg rqe', 'mte: yfl xak', 'miz: ajn tpv', 'ylp: hhx osm nxf', 'tpy: ife jfg rqe', 'mnd: wif', 'qyx: jdk', 'hpd: vxg lyd hdl lin', 'zve: tol irt xpb', 'ryj: euz rsy rer', 'rby: lus agc', 'fia: gfa hzt fzi', 'yzi: qtb new ljn tax', 'ngj: ood ubr mcs', 'fge: dks jax csx', 'cqm: ife jfg', 'rxc: wzd', 'raf: fjz lzj', 'jur: jfg rqe ife', 'oiy: wce', 'jwg: tpv ckr gdt', 'ecr: zli mbu wgg', 'ngl: ngj goa fiw', 'ohr: rwi jep qrp ghk', 'awc: bld', 'gqm: out', 'pud: zot hbf', 'mst: pic aau whg kli bln', 'jtx: mur sjt', 'cjy: jum', 'nqy: bgx', 'nvs: vir aae', 'pir: ara irt xpb phr', 'ijv: zkm', 'ycr: crr opi', 'xky: hcl bgp', 'sqc: nnm mbu zli ann', 'euz: wuk hlo', 'qtc: sjt you qsw', 'yja: hkd pdj', 'itl: qsw', 'tdc: lus agc bkw', 'qle: yyn rjn crn mnd', 'ykm: rei kgm', 'hau: jep ghk', 'iix: xma opa lye', 'lwb: pdj', 'bjy: weg oln cmi', 'ood: ero tpy hff', 'pkq: out', 'wmi: tst', 'csx: qle rde', 'waq: mcn alf xce bpo kzn', 'ygw: ann mbu nnm', 'fcz: sww', 'nmt: lin lyd hdl vxg znh', 'hlf: fem ncs kvc azq', 'xsu: you mur qsw', 'rfa: dbn tlg wem', 'xhk: lin hdl vxg', 'cbs: fcz ijo lwb yja', 'oej: mkf', 'puo: edn', 'hfk: rgb wzq', 'dkx: umr', 'spn: mst', 'tfv: gdt tpv prd ckr', 'ggh: weg cmi oln', 'sjt: opc dkx lzq qsn jbz tnu mis sbd', 'jyh: awc', 'see: ftn pud lbx', 'eoi: bwn ryj uey', 'eeh: spn rcm gpj', 'osm: qgk', 'nym: nvs yat', 'rsy: xky wuk', 'cdi: cbs ynv pfr agk', 'uyu: hbj', 'yyn: wif nko', 'ghk: apu dpc oir wqw', 'fir: joj okc qqx kqs', 'mtc: aqd', 'jax: rde igg brl', 'hkd: srp uov pkq rcu', 'skq: agk pzu ynv cbs', 'rvm: cmi', 'nav: rns', 'hvf: xfv jby sxi', 'ubr: hff', 'vbo: tmv hbj', 'jep: oir apu wqw', 'vxg: zfi drm lfa rvm ijv iuq', 'tcv: mmg', 'xrw: rib sls', 'atv: wce dac', 'zhu: waq ilz bbl', 'qsg: csx dks', 'pnb: zuf hlf aca', 'plw: sjt', 'you: xhi vui myp mis qsg sis fge jln', 'qsw: uvl mis tnu nxi ick jln ylp nqh jbz lzq', 'gfa: dtf nis', 'rxi: ied', 'tol: lin', 'ljn: atz', 'gai: say xyg ngj', 'bug: swz gyc box', 'yqf: oiy lyz', 'wuk: bgp swt hcl', 'uir: rqe jfg', 'msc: out', 'dac: ccs vmv', 'gyc: ajn gdt prd tpv', 'pmc: ied pib', 'rcg: wqk', 'tmv: sue see pya', 'pdj: srp', 'auf: wxr mmg', 'asb: rsy rer fft', 'aca: kvc ncs', 'edn: dve wsu vlw fxp', 'bjf: nft', 'ste: klc fmx', 'xmn: new qtb', 'fiw: vmt ood mcs hih ubr', 'oiv: mci', 'wqk: qpf nsn bug', 'xqh: yuh', 'yzg: bby mmg', 'sjb: qhc via seh', 'wag: uco vfg xmw', 'znh: ggh zfi drm slg ohl rvm ijv ydg pfh gol jfy xsv iix iuq pmd yfm lfa zid bjy add rnh eoi', 'cix: out', 'rmg: tpb', 'hsu: kkf', 'oie: hix iwo', 'svr: kdv fty pni vxl ywz', 'fup: rqe jfg', 'vtj: xak ubl', 'mgg: mmg wxr bby', 'rem: azn egr nft', 'hfy: wem dbn', 'weq: opi', 'wfg: dtf ced nis', 'zkm: iaf grz', 'apd: wqt', 'kgy: gfa', 'qxe: fiw ngj say', 'tse: cbs pfr ynv pzu', 'txg: zuf aca', 'hwd: ish mwf', 'sfa: cbw zhn', 'lwj: jum raf', 'ket: oiv', 'opc: skq', 'hix: sfa', 'hcf: oej fud aim hsu', 'mcy: qsw sjt', 'hih: hff tpy ero', 'oxn: yzn hsb aae poo', 'sxb: pcw edn', 'mpe: ajn prd ckr tpv', 'xcr: bkw', 'mlg: awc', 'agc: hpd xhk gws', 'hqo: out', 'grz: qqx', 'xma: zya tzi yxq xqh', 'tpv: ofg bcf qyo bea ngl psd vbo uyu rgj nav evw uri mni', 'wce: vmv yvs ccs', 'evw: tcv', 'rjn: ewj wif', 'lzj: pqv', 'hdl: pfh ydg wmi rvm ohl slg drm zfi yfm ggh iuq eoi rnh add xsv iix jfy gol zid', 'ozu: itl pqv qma', 'jfv: out', 'byg: jfv', 'pfr: yja', 'pcm: aca', 'zot: jfg rqe ife', 'tgh: hsb vir yzn', 'yif: pqv qma', 'qpf: gyc iob swz', 'xyg: ood ubr hih', 'cmi: ohr acd hau', 'sab: atv lyz jdk', 'xak: mtc tbo oqe', 'gpj: hmw', 'kwq: sxb jmi', 'hff: jfg', 'akb: ttz', 'ldr: hwd iye', 'roc: wzd jfv', 'vxl: kqx pcm gle dkf tdc wmb dzj ufb xtq xcr apd', 'ydg: opa lye dso xma', 'agk: lwb fcz', 'kqx: xmn yzi bpq', 'rcm: rso hmw mst', 'pfh: gnq tst zkm', 'ani: cqm jur ebe vlv', 'jfy: tst gnq', 'lyz: wce dpx', 'tpb: xam pqw sjb', 'lzy: sjb xam', 'egr: uxb', 'wsu: rxc', 'add: dso', 'ric: qsw', 'dbn: sls buk', 'rzu: vln fmx', 'bzs: hbj rns', 'rbl: vmk hfk ngm jyh', 'jvw: ani mwf ish', 'abz: oai zyt bgx', 'wgg: nmt qzt gzm', 'chu: nsn', 'xce: ckr prd', 'nsu: zhu qai uzd tki', 'vvp: nmn tnr', 'cam: sqc', 'iob: tpv prd ckr ajn', 'gws: hdl lyd lin znh', 'bwn: euz rer', 'oua: cix', 'pcw: kyq wsu fxp vlw', 'sbd: knu puo', 'ttz: ekn', 'exc: uyf wqt', 'zid: gnq', 'uco: lyd hdl', 'wzd: out', 'oqe: pnv', 'myb: oiv tqj mys bod', 'pib: out', 'ajn: bzs psd rgj nav rbl', 'acd: qrp jep rwi acg ghk', 'ojl: jum', 'crn: ewj nko wif', 'szy: qsw mur you', 'yqd: you mur qsw', 'fnd: wfg fzi', 'mwf: vlv ebe cqm uir', 'ekn: out', 'cbw: gdt ajn ckr prd', 'iwo: xfv', 'xjz: rqe', 'lfa: asb uey', 'kpk: xmn', 'vpd: bod mys oiv', 'ynv: dqv fcz', 'umr: brl rde', 'mcn: prd', 'rza: lyz jdk', 'zyq: dbn tlg', 'vmv: plw xsu', 'joj: peu', 'lus: hpd', 'aau: out', 'qrp: apu', 'srp: out', 'yfl: dzg', 'bdo: phr tol', 'qhc: ekn', 'hsb: nsu xke mzn dpp hcf smf rmx oie pqk', 'lbx: fup hbf', 'zya: kdn', 'rqe: ojl ket htm myb wac rza weq flf lwj yqf owe vpd kzv cjy sab qyx', 'iiw: hwd', 'jek: yat', 'gnq: iaf', 'uri: ngj xyg say', 'bos: yat oxn nvs', 'qsn: hhx osm', 'xam: via ttz', 'fud: frl kkf', 'oln: zuy lfh', 'seh: gqm bvu ekn', 'cnc: zyt', 'nxi: hty rfa hfy zyq', 'sds: ilz waq', 'kun: wyn fia', 'tki: bbl ilz waq', 'ccs: uqf epz', 'ztq: qai uzd sds tki', 'lfh: rwi qrp ghk acg', 'rei: qsw mur', 'say: vmt mcs hih', 'vui: rmg', 'ulc: xfv sfa sxi', 'mcs: ero tpy', 'wem: rib fxk buk lvg', 'fmx: fpt ykm', 'xhi: ijz', 'azn: uxb tfv', 'kzn: tpv', 'bvu: out', 'bqr: mys oiv', 'nft: qrj', 'hhx: cth qgk eeh', 'ara: lyd', 'eqj: iye jvw', 'mmg: ife', 'wqw: vir aae', 'bbl: mcn alf bpo xce kzn', 'mdz: lyd lin', 'bpq: tax new ljn qtb', 'kbb: hfy zyq jbp rfa', 'itw: wqt uyf', 'qgk: spn rcm', 'okl: ckr prd tpv', 'tnr: yzn', 'zli: iea', 'nyh: nvs yat', 'yvs: plw qzp epz', 'qtb: wag atz', 'jby: zhn cbw', 'bbp: iye', 'ebe: rqe jfg ife', 'mur: nxi uvl myp ylp jln nqh kbb sis qsn qsg sbd ick xhi kwq opc dkx fge jbz', 'mni: iiw bbp gat', 'pni: dkf wmb txg xtq kpk rby itw ufb', 'ijo: sww pdj', 'aae: mzn ztq bjf cjt', 'rer: wuk xky', 'acg: wqw apu dpc', 'duo: gat bbp', 'bld: pmf tiy nxl', 'mkf: miz', 'cbu: zli mbu ann wgg', 'ath: auf mgg yzg', 'qai: ilz', 'oir: vir yzn hsb aae poo', 'bby: jfg rqe ife', 'fxp: roc byg', 'ufb: bkw', 'nko: ais hqo msc gty', 'htm: wyn fnd fia kgy', 'yzn: oie npv smf vtj mte kca vnp rem qbe jsb ztq rmx cjt pqk bjf dpp jpj nsu rcg xke mzn', 'rnh: oln', 'kdn: ckb', 'kli: out', 'vir: cjt pqk rmx bjf jpj hcf dpp xke rcg mzn nsu npv oie kca smf mte vnp qbe ztq jsb rem', 'vlw: tut rxc oua byg', 'mzx: jwg', 'igg: crn rjn yyn bkt', 'wif: ais hqo gty', 'npv: yqu', 'dve: tut oua byg rxc', 'ang: xpb', 'wac: vln fmx', 'ufm: vlw kyq', 'fft: xky wuk', 'ewj: hqo msc yln', 'xke: egr azn', 'jsb: azn nft', 'lzq: cdi tse skq', 'mys: mci pgj', 'yln: out', 'bcf: rns', 'ngm: wzq rgb', 'goa: hih', 'jln: hfy rfa jbp', 'wyn: fzi gfa', 'fem: znh lin lyd hdl', 'opi: mcy jtx mti', 'bln: out', 'gcm: znh hdl lyd lin', 'zhn: prd ckr tpv ajn gdt', 'mis: dks umr jax', 'hbf: ife', 'hgg: mzx pnv', 'sue: pud lbx', 'ilz: kzn xce bpo mcn', 'fzi: ced', 'uzd: ilz', 'ckr: qxe fsm gai psd ngl bea duo qyo bcf ofg bzs vbo mni ath uri jjm evw nav rgj uyu', 'zsq: xmw mdz vfg gcm', 'rwi: apu oir dpc', 'qyo: vmk ngm jyh mlg hfk', 'kzv: fnd pqs', 'lyx: xam akb pqw', 'xmw: hdl lyd lin vxg znh', 'fxk: vhe', 'pqv: qsw mur', 'yyf: kdn vvp', 'yuh: nmn ckb tnr', 'zyt: qsw sjt you', 'rib: rxi', 'gat: hwd', 'brl: crn rjn bkt', 'box: prd ckr tpv ajn', 'flf: jdk lyz oiy', 'klc: ggp', 'dks: igg brl qle', 'hjc: kkf mkf', 'cjt: hjc aim hsu fud oej', 'qqx: jvn rlu', 'nxf: cth', 'xei: pud lbx', 'vnp: fud aim', 'ywz: ufb hvp pnb apd rby itw pcm kpk gle txg dkf wmb dzj', 'atz: uco gcm vfg mdz xmw', 'rlu: poo', 'dtf: ric iza', 'cth: inf gpj spn', 'buk: rxi', 'hcl: vir poo aae hsb', 'jjm: bbp eqj ldr', 'kyq: oua roc', 'ero: rqe jfg', 'rso: whg aau pic', 'jbz: osm hhx', 'dqh: sjb', 'jsg: yzi xmn', 'gol: uey', 'pzu: fcz', 'bkw: xhk', 'peu: yzn vir poo', 'rns: pya xei', 'day: you mur sjt', 'vhe: ied jbe', 'gty: out', 'tiy: jfg ife', 'nsn: box gyc iob swz', 'dzj: cam wqt uyf', 'mbu: iea', 'owe: fmx vln', 'kqs: tgh rlu jvn peu', 'wqt: ecr urw ygw', 'nnm: gzm', 'iea: znh lin hdl vxg', 'knu: edn', 'qzp: qsw', 'gzm: znh lin hdl lyd vxg', 'bpo: gdt tpv prd ckr', 'dkf: bdo ang tov', 'pqs: hzt fzi', 'smp: you mur qsw', 'jum: yif', 'gle: ang pir bdo', 'jmi: ufm', 'nis: szy', 'yqu: bug', 'zuf: ncs fem', 'vfg: lyd hdl vxg', 'sis: puo knu jmi', 'yfm: ryj uey', 'pin: mti smp yff mcy', 'dzg: mzx pnv aqd', 'phr: vxg lin hdl', 'ftn: fup', 'swt: hsb poo yzn vir', 'lyd: ydg wmi eoi pfh rnh drm lfa zfi add slg', 'xtq: cam', 'bkt: ewj wif', 'kkf: ogd okl miz', 'kdv: apd jsg pnb kqx itw dkf tdc wmb dzj txg gle', 'ann: gzm nmt qzt', 'wof: nvs yat', 'jfg: kun htm ycr ojl rza rzu weq myb flf afy bqr qyx sab cjy', 'poo: rmx kca vtj smf jpj dpp rcg qbe rem', 'pqk: xak yfl', 'iza: mur sjt', 'tbo: mzx aqd', 'ced: szy iza', 'pic: out', 'uqf: mur you', 'myp: cdi', 'jdk: wce', 'lin: add zid bjy jfy iix xsv iuq slg ohl pmd ggh yfm zfi drm wmi ydg pfh ijv rvm', 'rbn: nxl xjz cxe pmf tiy', 'sls: vhe rxi pmc', 'bod: wub', 'opa: zya yyf', 'uov: out', 'hlo: hcl swt bgp ict', 'gxy: ezu jum', 'rmx: ulc iwo hvf hix', 'hvp: zve ang bdo', 'drm: uey bwn ryj asb', 'rro: qzp', 'rgb: rbn rxr', 'rcu: out', 'dso: yxq tzi', 'slg: lye opa dso', 'nqh: rmg fan ijz', 'nmn: vir aae hsb', 'iaf: kqs', 'fan: dqh lzy tpb', 'zuy: jep qrp ghk acg', 'epz: you mur sjt', 'ufj: oai', 'pmf: rqe', 'ais: out', 'iye: ani', 'ubl: oqe tbo hgg mtc dzg', 'fty: tdc txg rby jsg pnb hvp exc ufb', 'aqd: dkt jwg xbp', 'qbe: zhu tki uzd sds', 'kca: ubl yfl xak', 'rgj: vmk mlg', 'zfi: nyh nym wof', 'lvg: rxi vhe', 'bgx: mur you', 'zvx: xfv', 'uxb: prd ckr tpv ajn gdt', 'via: bvu gqm', 'ggp: qtc day kgm', 'weg: acd zuy hau ohr', 'jvn: vir aae', 'dpc: aae hsb poo yzn vir', 'ijz: lzy tpb lyx', 'qma: mur you sjt', 'qrj: ajn', 'urw: mbu ann wgg', 'wub: abz ufj', 'fsm: auf yzg', 'tzi: kdn yuh'];
const testInputs = [testInput1, testInput2];
const realInputs = [input];
const INPUT_TO_USE = realInputs;

let graph = {};
for (const node of INPUT_TO_USE[0]) {
  const parts = node.split(':');
  const start = parts[0].trim();
  const nexts = parts[1].trim().split(' ');
  graph[start] = nexts;
}

// Part 1
let tested = {};
let nodesToTest = [];
let nextNodes = ['you'];
let level = -1;
let paths = 0;
while (nextNodes.length) {
  console.log(Object.keys(tested).length);
  nodesToTest = [...nextNodes];
  nextNodes = [];
  level++;
  for (const node of nodesToTest) {
    tested[node] = true;
    for (const neighbor of graph[node]) {
      if (neighbor === 'out') {
        paths++;
        continue;
      }
      if (!tested[neighbor]) {
        nextNodes.push(neighbor);
      }
    }
  }
}

console.log(`Found ${paths} paths from 'you' to 'out'`);

// Part 2
// Update the graph if the input has changed
if (INPUT_TO_USE[1]) {
  graph = {};
  for (const node of INPUT_TO_USE[1]) {
    const parts = node.split(':');
    const start = parts[0].trim();
    const nexts = parts[1].trim().split(' ');
    graph[start] = nexts;
  }
}

// const nodesToSquash = {};
// // For each node, find its "root" and replace it with that (deduplicating)
// for (let node of Object.keys(graph)) {
//   let oldNode = null;
//   let neighbors = graph[node];
//   if (neighbors.length === 1) {
//     // Potentially squash the neighbor and all its children
//     oldNode = neighbors[0];
//   }
//   while (node !== 'out' && node !== 'fft' && node !== 'dac' && neighbors.length === 1) {
//     node = neighbors[0];
//     neighbors = graph[node];
//   }
//   if (node !== oldNode) {
//     nodesToSquash[oldNode] = node;
//   }
// }
// for (let node of Object.keys(nodesToSquash)) {
//   squashNode(node, nodesToSquash[node]);
// }

// // Replace this node in all neighbors with its new root
// function squashNode(oldNode, newNode) {
//   console.log(`${oldNode} squashed to ${newNode}`);
//   for (const key of Object.keys(graph)) {
//     const ind = graph[key].indexOf(oldNode);
//     if (ind >= 0) {
//       graph[key][ind] = newNode;
//       graph[key] = [...new Set(graph[key])];
//     }
//   }
// }

// console.log(graph);

// const savedPaths = {};
// const loggedPaths = {};
// nodesToTest = [];
// nextNodes = [['svr',['svr']]];
// level = -1;
// paths = 0;
// while (nextNodes.length) {
//   console.log(nextNodes.length);
//   nodesToTest = [...nextNodes];
//   nextNodes = [];
//   level++;
//   for (const info of nodesToTest) {
//     const node = info[0];
//     let path = info[1];
//     // We can abort early here
//     if (savedPaths[node]) {
//       console.log('found before, using saved path');
//       const newPath = [...path, ...savedPaths[node]];
//       const pathStr = newPath.join(',');
//       console.log(`found ${pathStr}`);
//       if (!loggedPaths[pathStr] && newPath.indexOf('fft') > 0 && newPath.indexOf('dac') > 0) {
//         paths++;
//         console.log(path);
//       }
//       console.log(`loggd ${pathStr}`);
//       loggedPaths[pathStr] = true;
//       continue;
//     }
//     for (let neighbor of graph[node]) {
//       // No loops allowed
//       if (path.indexOf(neighbor) >= 0) {
//         continue;
//       }
//       path = [...path, neighbor];
//       const pathStr = path.join(',');
//       if (neighbor === 'out' && !loggedPaths[pathStr]) {
//         console.log(`found ${pathStr}`);
//         if (path.indexOf('fft') > 0 && path.indexOf('dac') > 0) {
//           paths++;
//           console.log(path);
//         }
//         console.log(`loggd ${pathStr}`);
//         loggedPaths[pathStr] = true;
//         // Save every subpath for future use
//         for (let i = 0; i < path.length; i++) {
//           savedPaths[path[i]] = path.slice(i+1);
//         }
//         continue;
//       }
//       nextNodes.push([neighbor, path]);
//     }
//   }
// }

// console.log(`Found ${paths} paths from 'svr' to 'out'`);

// seenPaths[node] = stats on paths that look like [node, blah, ..., out]

// returns an object as such: [blankPaths, dacPaths, fftPaths, bothPaths]
const seenPaths = {};
function findPathsFromNode(node) {
  if (node === 'out') {
    return [1,0,0,0];
  }
  let retPaths = [0, 0, 0, 0];
  for (const n of graph[node]) {
    if (!seenPaths[n]) {
      seenPaths[n] = findPathsFromNode(n);
    }
    [blanks, dacs, ffts, boths] = seenPaths[n];
    if (node === 'dac') {
      boths = ffts + boths;
      dacs = blanks;
      blanks = ffts = 0;
    } else if (node === 'fft') {
      boths = dacs + boths;
      ffts = blanks;
      blanks = dacs = 0;
    }
    retPaths[0] += blanks;
    retPaths[1] += dacs;
    retPaths[2] += ffts;
    retPaths[3] += boths;
  }
  return retPaths;
}

const finalPaths = findPathsFromNode('svr');
const total = finalPaths[0] + finalPaths[1] + finalPaths[2] + finalPaths[3];
console.log(`Found ${total} paths, of which ${finalPaths[3]} have both 'dac' and 'fft'`);