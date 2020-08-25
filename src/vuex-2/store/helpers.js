export function mapState(stateArr) {
    let obj = {}
    for (let i = 0; i < stateArr.length; i++) {
        let stateName = stateArr[i]
        obj[stateName] = function () {
            return this.$store.state[stateName]
        }
    }
    return obj
}

export function mapGetters(gettersArr) {
    let obj = {}
    for (let i = 0; i < gettersArr.length; i++) {
        let gettersName = gettersArr[i]
        obj[gettersName] = function () {
            return this.$store.state[gettersName]
        }
    }
    return obj
}