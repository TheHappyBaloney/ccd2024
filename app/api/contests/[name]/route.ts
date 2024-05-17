import { authOptions } from '@/lib/auth';
import { CONTEST_PG_PSI_URL, CONTEST_PSI_URL } from '@/lib/constants/be';
import { getServerSession } from 'next-auth';
import { RedirectType, redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const session = await getServerSession(authOptions)
  const { name } = params;
  console.log(name);

  let url = CONTEST_PSI_URL
  if (name === 'psi')
    url = CONTEST_PSI_URL
  else
    url = CONTEST_PSI_URL

  // const response = await fetch(url, {
  //   method: "GET",
  //   cache: 'no-store',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${session?.access}`,
  //   }
  // });
  // let result = await response.json();
  // redirect(`${CONTEST_PG_PSI_URL}?pk=${result.id}`, RedirectType.replace);
  console.log(session?.access)  
  return new Response(null, {
    headers: {
      Location: String(url),
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access}`,
    },
    status: 307
  });
  // return NextResponse.json({ id: 'id' }, { status: response.status });
}