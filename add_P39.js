module.exports = (id, startdate, enddate, replaces, replacedby, ordinal, cabinet) => {
  const qualifiers = { }

  // Seems like there should be a better way of filtering these...
  if (startdate && startdate != "''")   qualifiers['P580']  = startdate
  if (enddate && enddate != "''")       qualifiers['P582']  = enddate
  if (replaces && replaces != "''")     qualifiers['P1365'] = replaces
  if (replacedby && replacedby != "''") qualifiers['P1366'] = replacedby
  if (ordinal && ordinal != "''")       qualifiers['P1545'] = ordinal
  if (cabinet && cabinet != "''")       qualifiers['P5054'] = cabinet

  if (startdate && enddate && startdate != "''" && enddate != "''" &&
    (startdate > enddate)) throw new Error(`Invalid dates: ${startdate} / ${enddate}`)

  return {
    id,
    claims: {
      P39: {
        value: 'Q7460544',
        qualifiers: qualifiers,
        references: {
          P143: 'Q328', // English Wikipedia
          P4656: 'https://en.wikipedia.org/wiki/Shadow_Leader_of_the_House_of_Commons'
        },
      }
    }
  }
}
