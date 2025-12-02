import * as fs from 'fs'
import { join } from 'path'

export function getInput(path: string, test: boolean = false) {
  const fileName = test ? "input_test.txt" : "input.txt"
  const filePath = join('src', path, fileName)

  console.log('filePath', filePath)

  const fileContent = fs.readFileSync(filePath, 'utf-8')

  return fileContent
}