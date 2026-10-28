import { notFound, permanentRedirect } from 'next/navigation';
import { getMotorById, motorPad } from '@/lib/motors';

export default async function OudeMotorUrl({ params }: { params: Promise<{ slug: string }> }) {
  const m = await getMotorById((await params).slug);
  if (!m) notFound();
  permanentRedirect(motorPad(m));
}
