var Services = {
    Event: {
        path: '/even/',
        getAll: function() {
            return axios.get(`${Event.path}event`)
        },
        get: function(id) {
            return axios.get(`${Event.path}${id}`)
        }
    }
}
