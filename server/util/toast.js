function Toast(status, message, onlyMessage = false) {
    this.status = status;
    this.message = message;

    if (onlyMessage) return { status: this.status, message: this.message };

    switch (status) {
        case "create":
            this.message = `${message} created successfully`;
            break;

        case "update":
            this.message = `${message} updated successfully`;
            break;

        case "delete":
            this.message = `${message} deleted successfully`;
            break;

        case "error":
            this.message = `An error occurred ${message}`;
            break;

        default:
            this.message = message;
            break;
    }
    return { status: this.status, message: this.message };
}

module.exports = Object.freeze({
    Toast,
});
