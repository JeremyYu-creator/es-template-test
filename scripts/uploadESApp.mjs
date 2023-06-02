import { execSync } from 'child_process'
let isWin = process.platform === 'win32';

/**
 * 上传扩展屏应用到
 * @param packageName
 * @param outputName
 * @param version
 * @param filePath
 */
export default function uploadESApp(packageName, outputName, version, filePath, isProduction) {
    // 进行window和mac相关的打包上传判断
    if (isWin) {
        let upload = ""
        if (isProduction) {
            upload = `curl -H "" -F "package_name=${packageName}" -F "package_ver=${version}" -F "files=@${filePath}" -X POST "${url}"`
        } else {
            upload = `curl -H "deploy-token:" -F "package_name=${packageName}" -F "package_ver=${version}" -F "files=@${filePath}" -X POST "${url}"`
        }
        console.log(`start upload cmd :${upload}`)
        execSync(upload, { stdio: 'inherit' })
    } else {
        let url = isProduction ? '' : '' // 上传快应用的后台接口
        let header = isProduction ? 'deploy-token: ' : 'deploy-token: ' //  相关的上传token
        console.log(`uploadESApp upload url :${url}`)
        let upload = `curl --location --request POST '${url}' \\
         --header '${header}' \\
        --form 'package_name="${packageName}"' \\
        --form 'package_ver="${version}"' \\
        --form 'files=@"${filePath}"'`
        console.log(`start upload cmd :${upload}`)
        execSync(upload, { stdio: 'inherit' })
    }
}

