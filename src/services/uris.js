const host = process.env.NODE_ENV==='development' ? 'http://192.168.20.4:8080' : ''

var makeUri = (finalParams) => {
        return host + '/rest/json.jhtml?req=' + encodeURIComponent(finalParams)
    },
    addParam = (params, methodName) => {
        var i, j, finalParams = {}
        if(params!==undefined){
            for (i in params) {
                finalParams[i] = (params[i] ===undefined || params[i]===null ? '' : params[i])
            }            
        }
        methodName && (finalParams.methodName = methodName)
        return JSON.stringify(finalParams)
    },
    makeUglyUri = (params, methodName) => {
        return makeUri(addParam(params, methodName))
    }

const uris = {
        peccancyQuery: {
            cities: (params) => {
                return makeUglyUri(params, 'QuerySuppoetCitys')
            },
            result: (params) => {
                return makeUglyUri(params, 'QueryTrafficViolation')
            }
        }
 }

export default uris
