// Client-safe: geen server imports

export type DagCode = 'ma' | 'di' | 'wo' | 'do' | 'vr' | 'za' | 'zo';

export const DAG_LABELS: Record<DagCode, string> = {
  ma: 'Maandag', di: 'Dinsdag', wo: 'Woensdag',
  do: 'Donderdag', vr: 'Vrijdag', za: 'Zaterdag', zo: 'Zondag',
};

export const JS_DAY_TO_CODE: Record<number, DagCode> = {
  0: 'zo', 1: 'ma', 2: 'di', 3: 'wo', 4: 'do', 5: 'vr', 6: 'za',
};

export type OpeningsDag = {
  open: string | null;
  sluit: string | null;
  gesloten: boolean;
};

export type Instellingen = {
  openingstijden: Record<DagCode, OpeningsDag>;
  gesloten_dagen: string[];
  gesloten_weken: string[];
  max_afspraken_per_dag: number;
  opmerking: string;
};

export const INSTELLINGEN_FALLBACK: Instellingen = {
  openingstijden: {
    ma: { open: null, sluit: null, gesloten: true },
    di: { open: null, sluit: null, gesloten: true },
    wo: { open: '09:00', sluit: '17:00', gesloten: false },
    do: { open: '09:00', sluit: '17:00', gesloten: false },
    vr: { open: '09:00', sluit: '17:00', gesloten: false },
    za: { open: '10:00', sluit: '15:00', gesloten: false },
    zo: { open: null, sluit: null, gesloten: true },
  },
  gesloten_dagen: [],
  gesloten_weken: [],
  max_afspraken_per_dag: 5,
  opmerking: '',
};

export function isDateGesloten(dateStr: string, inst: Instellingen): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr + 'T12:00:00');
  const dag = JS_DAY_TO_CODE[date.getDay()];
  if (inst.openingstijden[dag]?.gesloten) return 'Wij zijn op die dag gesloten.';
  if (inst.gesloten_dagen.includes(dateStr)) return 'Wij zijn op die datum gesloten.';
  return null;
}

export function formatOpeningsTijden(inst: Instellingen): { label: string; waarde: string }[] {
  const volgorde: DagCode[] = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
  const result: { label: string; waarde: string }[] = [];
  let i = 0;
  while (i < volgorde.length) {
    const dag = volgorde[i];
    const tijden = inst.openingstijden[dag];
    if (!tijden) { i++; continue; }
    let j = i + 1;
    while (
      j < volgorde.length &&
      inst.openingstijden[volgorde[j]]?.gesloten === tijden.gesloten &&
      inst.openingstijden[volgorde[j]]?.open === tijden.open &&
      inst.openingstijden[volgorde[j]]?.sluit === tijden.sluit
    ) j++;
    const groep = volgorde.slice(i, j);
    const label =
      groep.length === 1
        ? DAG_LABELS[groep[0]]
        : `${DAG_LABELS[groep[0]]} – ${DAG_LABELS[groep[groep.length - 1]]}`;
    result.push({
      label,
      waarde: tijden.gesloten ? 'Gesloten' : `${tijden.open} – ${tijden.sluit}`,
    });
    i = j;
  }
  return result;
}
