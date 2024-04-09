Component({
    properties: {
        data: Object
    }, 
    methods: {
        toUpdate(e) {
            const { info } = e.currentTarget.dataset;
            console.log(info);
            this.triggerEvent('getupdate', info);
        },
        toDelete(e) {
            const { id } = e.currentTarget.dataset;
            console.log(id);
            this.triggerEvent('getdelete', id);
        }

    }
})