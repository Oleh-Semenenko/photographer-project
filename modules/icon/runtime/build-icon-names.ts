import { writeFileSync, readdirSync } from 'fs'
import { join as pathJoin } from 'path'
import { inspect as utilInspect } from 'util'
import { camelCase } from 'change-case'

export function buildIconsNames (rootDir: string, dir = 'assets/icons') {
  const iconsDir = pathJoin(rootDir, dir)
  const icons = readdirSync(iconsDir)
    .reduce((acc, cur) => {
      const fileName = cur.split('.').slice(0, -1).join('')
      acc[camelCase(fileName)] = fileName
      return acc
    }, {})

  writeFileSync(
    pathJoin(__dirname, './icon-names.plugin.ts'),
    String('// THIS FILE IS AUTOMATICALLY GENERATED\n')
      .concat('// DON\'T CHANGE IT IN ORDER TO MAKE IT PROPERLY WORK!\n')
      .concat(`export default defineNuxtPlugin(() => (${utilInspect({
        provide: {
          iconsDir,
          icons
        }
      })}))`)
      .concat('\n')
  )

  console.info('Building icons')
}
