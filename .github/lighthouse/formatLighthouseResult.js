module.exports = ({ type, links, manifest, core }) => {
  const runs = [
    {
      links,
      results: manifest.filter(result => result.isRepresentativeRun)
    }
  ]

  const gradeScore = res => (res >= 90 ? '🟢' : res >= 50 ? '🟠' : '🔴')

  const formatRun = ({ links, results }) =>
    results
      .map(result => {
        const summary = result.summary
        const url = new URL(result.url)

        return `
## ${url.pathname}
🌎 [${url}](${url})
⚡️ [Report](${links[url.toString()]})

| Category | Score |
| --- | --- |
${Object.keys(summary)
  .map(key => {
    const percentage = Math.round(summary[key] * 100)
    return `| ${gradeScore(percentage)} ${key} | ${percentage} |`
  })
  .join('\n')}
`
      })
      .join('')

  const comment = `
# ${type} Lighthouse Results
${runs.map(formatRun).join('')}
    `

  core.setOutput('comment', comment)
}
