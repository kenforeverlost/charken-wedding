import crypto from 'crypto'
import { supabase } from '@lib/supabase'

export const setRsvpPassword = async (password: string) => {
  let salt = crypto.randomBytes(16).toString('hex')
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`)

  let { data: login, error } = await supabase
    .from('wedding_admin')
    .update({ password: hash, secret_key: salt })
    .eq('username', 'rsvpLogin')
}

export const validateRsvpPassword = async (password: string) => {
  let result = false
  let message = ''
  let { data: login, error } = await supabase
    .from('wedding_admin')
    .select('*')
    .eq('username', 'rsvpLogin')

  if (login && login.length > 0 && !error) {
    let { password: rsvpPassword, secret_key: secret_key } = login[0]

    let hashedPassword = crypto
      .pbkdf2Sync(password, secret_key, 1000, 64, `sha512`)
      .toString(`hex`)

    result = hashedPassword == rsvpPassword
    message = result ? 'Success!' : 'Incorrect password'
  } else {
    message = 'Our site is unavailable :( Check back later!'
  }

  return { result: result, message: message }
}

export const searchForGuest = async (
  first_name: string,
  last_name: string,
  check_soft_rsvp: boolean,
) => {
  let result = false
  let message = ''
  let matchType = ''
  let data: any = {}
  let groupData: any = {}

  if (first_name.length >= 2 || last_name.length >= 2) {
    let { data: guestRecord, error } = check_soft_rsvp
      ? await supabase
          .from('wedding_guestlist')
          .select('*')
          .ilike('first_name', `${simplifyName(first_name)}%`)
          .ilike('last_name', `${simplifyName(last_name)}%`)
          .neq('soft_rsvp', 'no')
      : await supabase
          .from('wedding_guestlist')
          .select('*')
          .ilike('first_name', `${simplifyName(first_name)}%`)
          .ilike('last_name', `${simplifyName(last_name)}%`)

    if (!guestRecord || error) {
      message = 'RSVP is unavailable at this time :( Check back later!'
    } else if (
      guestRecord.length !== 0 &&
      (simplifyName(first_name) !== simplifyName(guestRecord[0]?.first_name) ||
        simplifyName(last_name) !== simplifyName(guestRecord[0]?.last_name))
    ) {
      result = true
      message = `Did you mean ${guestRecord[0]?.first_name} ${guestRecord[0]?.last_name}?`
      matchType = 'partial'
      data = guestRecord[0]
    } else if (guestRecord.length === 1) {
      let guestData = guestRecord[0]

      let { data: groupRecord, error } = check_soft_rsvp
        ? await supabase
            .from('wedding_guestlist')
            .select('*')
            .eq('rsvp_group', guestData.rsvp_group)
            .neq('soft_rsvp', 'no')
            .order('id', { ascending: true })
        : await supabase
            .from('wedding_guestlist')
            .select('*')
            .eq('rsvp_group', guestData.rsvp_group)
            .order('id', { ascending: true })

      result = true
      message = 'Invitation found!'
      matchType = 'exact'
      data = guestData
      groupData = groupRecord
    } else {
      message =
        'We are having trouble finding your invite. Please try another spelling of your name or contact us.'
    }
  } else {
    message = 'Please enter more than 2 characters for you first and last name.'
  }

  return {
    result: result,
    message: message,
    matchType: matchType,
    data: data,
    groupData: groupData,
  }
}

export const simplifyName = (name: string) => {
  return name?.toLowerCase().trim()
}

export const isRoomBlockActive = () => {
  const now = new Date().getTime()
  const deadline = new Date('Aug 26, 2024 00:00:00').getTime()

  return now < deadline
}

export const isRsvpActive = () => {
  const now = new Date().getTime()
  const deadline = new Date('Sep 2, 2024 00:00:00').getTime()

  return (
    now < deadline ||
    process.env.NEXT_PUBLIC_WEDDING_DISABLE_RSVP_DEADLINE === 'true'
  )
}
