class Field {
    constructor(title, type, ref, values = null) {
        this.title = title;
        this.type = type;
        this.ref = ref;
        if (type == "choice") {
            this.values = values;
        }
    }
}

export default Field;