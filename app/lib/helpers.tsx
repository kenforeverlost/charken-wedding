import crypto from 'crypto'
import { supabase } from '@lib/supabase'

export const setRsvpPassword = async (password: string) => {
  let salt = crypto.randomBytes(16).toString('hex')
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`)

  let { data: login, error } = await supabase
    .from('login')
    .update({ password: hash, secret_key: salt })
    .eq('username', 'rsvpLogin')
}

export const validateRsvpPassword = async (password: string) => {
  let { data: login, error } = await supabase
    .from('login')
    .select('*')
    .eq('username', 'rsvpLogin')

  let { password: rsvpPassword, secret_key: secret_key } = login[0]

  let hashedPassword = crypto
    .pbkdf2Sync(password, secret_key, 1000, 64, `sha512`)
    .toString(`hex`)

  let result = hashedPassword == rsvpPassword
  let message = result ? 'Success!' : 'Incorrect password'

  return { result: result, message: message }
}

export const searchForGuest = async (
  first_name: string,
  last_name: string,
  check_soft_rsvp: boolean,
) => {
  let result = false
  let matchType = ''
  let data: any = {}
  let groupData: any = {}

  if (first_name.length >= 2 || last_name.length >= 2) {
    let { data: guestRecord, error } = check_soft_rsvp
      ? await supabase
          .from('guestlist')
          .select('*')
          .ilike('first_name', `${simplifyName(first_name)}%`)
          .ilike('last_name', `${simplifyName(last_name)}%`)
          .neq('soft_rsvp', 'no')
      : await supabase
          .from('guestlist')
          .select('*')
          .ilike('first_name', `${simplifyName(first_name)}%`)
          .ilike('last_name', `${simplifyName(last_name)}%`)

    if (
      guestRecord.length !== 0 &&
      (simplifyName(first_name) !== simplifyName(guestRecord[0]?.first_name) ||
        simplifyName(last_name) !== simplifyName(guestRecord[0]?.last_name))
    ) {
      result = true
      matchType = 'partial'
      data = guestRecord[0]
    } else if (guestRecord.length === 1) {
      let guestData = guestRecord[0]

      let { data: groupRecord, error } = check_soft_rsvp
        ? await supabase
            .from('guestlist')
            .select('*')
            .eq('rsvp_group', guestData.rsvp_group)
            .neq('soft_rsvp', 'no')
        : await supabase
            .from('guestlist')
            .select('*')
            .eq('rsvp_group', guestData.rsvp_group)

      result = true
      matchType = 'exact'
      data = guestData
      groupData = groupRecord
    }
  }

  return {
    result: result,
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

  return now < deadline
}
