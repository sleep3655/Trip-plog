Component({
    properties: {
        data: Object
    }, 
    methods: {
        toUpdate(e) {
            const { info } = e.currentTarget.dataset;
            this.triggerEvent('getupdate', info);
        },
        toDetail(e) {
            const { info } = e.currentTarget.dataset;
            this.triggerEvent('getdetail', info);
        },
        toDelete(e) {
            const { id } = e.currentTarget.dataset;
            this.triggerEvent('getdelete', id);
        }

    }
})