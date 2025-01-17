export const getParentKey = (path, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item) => item.path === path)) {
        parentKey = node.path
      } else if (getParentKey(path, node.children)) {
        parentKey = getParentKey(path, node.children)
      }
    }
  }
  return parentKey
}

export function isMdFile(path) {
  return /\.mdx?$/.test(path)
}
export function isJsFile(path) {
  return /\.js?$/.test(path)
}
export function isCssFile(path) {
  return /\.css?$/.test(path)
}

export function isImageFile(path) {
  return /\.(png|gif|jpg|jpeg|webp|bmp)$/.test(path)
}

export function supportTextFile(path) {
  return /\.(js|css|mdx?)$/.test(path)
}

export function supportFile(path) {
  return /\.(png|gif|jpg|jpeg|webp|bmp|js|css|mdx?)$/.test(path)
}

/** 文件名称双链找path */
export function findPathInTree(name, data) {
  let result
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    if (node.name === name) {
      result = node.path
      break
    }
    if (node.children) {
      result = findPathInTree(name, node.children)
      if (result) {
        break
      }
    }
  }
  return result
}

export function sortFile(array) {
  return array.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()

    const isFolderA = !nameA.includes('.')
    const isFolderB = !nameB.includes('.')

    if (isFolderA && !isFolderB) {
      return -1 // 文件夹在前，文件在后
    }

    if (!isFolderA && isFolderB) {
      return 1 // 文件在前，文件夹在后
    }

    if (isFolderA && isFolderB) {
      // 两个元素都是文件夹，按照字母顺序排序
      if (nameA < nameB) {
        return -1
      }

      if (nameA > nameB) {
        return 1
      }
    } else {
      // 两个元素都是文件，排除掉后缀部分后按字母顺序排序
      return nameA.localeCompare(
        nameB,
        navigator.languages[0] || navigator.language,
        { numeric: true, ignorePunctuation: true }
      )
    }

    return 0
  })
}

export function renamePath(filePath, newName) {
  // 使用正则表达式匹配文件名
  const regex = /(\\|\/)([^\\\/]*)$/
  const match = filePath.match(regex)

  if (match) {
    // 获取文件名及文件路径
    //const separator = match[1] // 获取路径分隔符
    const fileName = match[2]
    const filePathWithoutFileName = filePath.replace(fileName, '')

    // 创建新路径
    const newFilePath = filePathWithoutFileName + newName

    return newFilePath
  } else {
    // 如果无法匹配文件名，返回原始路径
    return filePath
  }
}

// 给定文件路径中获取当前文件名称
export function getCurrentFolderName(filePath) {
  // 使用正则表达式匹配文件夹名
  const separator = filePath.includes('/') ? '/' : '\\' // 检测路径分隔符
  const parts = filePath.split(separator) // 将路径分割成数组
  const lastPart = parts[parts.length - 1] // 获取路径中的最后一个部分
  return lastPart
}

export const isMacOS = navigator.userAgent.includes('Mac OS X')
