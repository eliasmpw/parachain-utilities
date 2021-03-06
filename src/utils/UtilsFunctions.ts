import moment, { Moment } from "moment"
import { encodeAddress } from "@polkadot/util-crypto/address"
import { SubstrateAddress, TransformedSubstrateAddress } from "../types"
import * as prefixes from "../utils/ss58-registry.json"

export const replaceText = (
  key: string,
  value: string,
  options: { ns: string; replace: Record<string, string> }
): string => {
  if (options.replace) {
    let newValue = value
    for (const key in options.replace) {
      newValue = newValue.replace(`{{${key}}}`, options.replace[key])
    }
    return newValue
  }
  return value || key
}

export const transformDate = (
  unixTimestamp: number,
  transformUtc: boolean
): Moment => {
  let auxMoment
  if (transformUtc) {
    auxMoment = moment.utc(unixTimestamp)
  } else {
    auxMoment = moment(unixTimestamp)
  }
  return auxMoment
}

export const formatDate = (
  unixTimestamp: number,
  transformUtc: boolean,
  format = "YYYY-MM-DD HH:mm:ss"
): string => {
  return transformDate(unixTimestamp, transformUtc).format(format)
}

export const toUnixTimestamp = (
  dateTime: Moment,
  transformUtc: boolean
): number => {
  const simpleDateTime = dateTime.format("YYYY-MM-DD HH:mm:ss")
  let timestamp
  if (transformUtc) {
    timestamp = moment.utc(simpleDateTime)
  } else {
    timestamp = moment(simpleDateTime)
  }
  return timestamp.valueOf()
}

export const transformAddress = (
  key: string
): TransformedSubstrateAddress[] => {
  const publicKey = Uint8Array.from(Buffer.from(key.substring(2), "hex"))
  const newFormats: TransformedSubstrateAddress[] = []
  for (const auxPrefix of prefixes.registry) {
    if (auxPrefix.prefix !== 46 && auxPrefix.prefix !== 47) {
      newFormats.push({
        prefix: auxPrefix.prefix,
        value: encodeAddress(publicKey, auxPrefix.prefix),
      })
    }
  }
  return newFormats
}

export const findAuthorName = (
  savedAddresses: SubstrateAddress[],
  address: string
): string | undefined => {
  for (const auxAddress of savedAddresses) {
    for (const auxTransformed of auxAddress.transformed) {
      if (auxTransformed.value === address) {
        return auxAddress.name
      }
    }
  }
  return undefined
}
