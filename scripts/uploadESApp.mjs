import {execSync}  from 'child_process'

/**
 * 上传扩展屏应用到
 * @param packageName
 * @param outputName
 * @param version
 * @param filePath
 */
export default function uploadESApp(packageName,outputName,version,filePath,isProduction){
    // let upload = `curl --location --request POST 'http://api.extscreen.com/v1/tvpver/deploy' \\
    //       -F'package_name="${packageName}"' \\
    //       -F 'package_ver="${version}"' \\
    //       -F 'files=@"${filePath}"'`
    // let url = isProduction ? 'http://api.extscreen.com/v1/tvpver/deploy'
    //     : 'http://test-api.extscreen.com/v1/tvpver/deploy'
    // let upload = `curl --location --request POST '${url}' \\
    //      --header 'token: 2effc5a07c0007d7d5b078752348617d' \\
    //     --form 'package_name="${packageName}"' \\
    //     --form 'package_ver="${version}"' \\
    //     --form 'files=@"${filePath}"'`
    // console.log(`start upload cmd :${upload}`)
    // execSync(upload,{ stdio:'inherit' })
    let url = isProduction ? 'http://api.extscreen.com/v1/tvpver/deploy'
        : 'http://test-api.extscreen.com/v1/tvpver/deploy'
    let header = isProduction ? 'deploy-token: 109ebfb45f1114fa5043cd93b7e7fa79' : 'deploy-token: 91e7c97817accef360029d09752db0c4'
    console.log(`uploadESApp upload url :${url}`)
    let upload = `curl --location --request POST '${url}' \\
         --header '${header}' \\
        --form 'package_name="${packageName}"' \\
        --form 'package_ver="${version}"' \\
        --form 'files=@"${filePath}"'`
    console.log(`start upload cmd :${upload}`)
    execSync(upload,{ stdio:'inherit' })
}


