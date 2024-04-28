import { redirect } from 'next/navigation'
import { supabase } from '@/utils/supabase.js'

export default async function PrivatePage() {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/loginoptions')
  }

  return <p>Hello {data.user.email}</p>
}

//ithoru private page, that can be accessed only by the user thats logged in and only for their session