module.exports = membership => `
  SELECT DISTINCT ?item ?bare_ps ?term_ps WHERE {
    {
      SELECT DISTINCT ?item ?bare_ps WHERE {
        ?item p:P39 ?bare_ps .
        ?bare_ps ps:P39 wd:${membership} .
        FILTER NOT EXISTS {
          ?bare_ps ?pq_qual [] .
          ?pq_qual ^wikibase:qualifier [] .
        }
      }
    }

    {
      SELECT DISTINCT ?item ?term_ps WHERE {
        ?item p:P39 ?term_ps .
        ?term_ps ps:P39 wd:${membership} ; pq:P580 [] .
      }
    }
  }
`
