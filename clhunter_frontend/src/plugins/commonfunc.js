import VueThis from '../main'

function pushToCellDetail(cid) {
  const {href} = VueThis.$router.resolve({
    path: `/celllinelist/${cid}`
  });
  window.open(href, '_blank');
}

function goOuterLinkPubmed(t) {
  window.open('https://pubmed.ncbi.nlm.nih.gov/' + t, '_blank')
}

function goOuterLinkCellsaurus(t) {
  window.open('https://web.expasy.org/cellosaurus/' + t, '_blank')
}

function goOuterLinkDBSNP(t) {
  window.open('https://www.ncbi.nlm.nih.gov/snp/' + t, '_blank')
}

function snpStatusKey2Color(k) {
  if (k == '0') {
    return '#D93945'
  } else if (k == '1') {
    return '#407796'
  } else if (k == '2') {
    return '#A4D4D6'
  } else if (k == '3') {
    return '#183455'
  }
  else if (k == '4') {
    return '#6a6f6f'
  }
}


export default {
  snpStatusKey2Color,
  pushToCellDetail,
  goOuterLinkPubmed,
  goOuterLinkCellsaurus,
  goOuterLinkDBSNP,

}