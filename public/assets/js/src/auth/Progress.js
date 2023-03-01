import fetch from "../helpers/fetch";
import { formatProgress } from "../helpers/formater";

export default new (class ProgressAuth {
    constructor() {
        if (!ProgressAuth.instance) {
            ProgressAuth.instance = this;
        }

        return ProgressAuth.instance;
    }

    async getProgress () {
        const response = await fetch('/progress/fetch');

        if (response.progress)
            return formatProgress(response.progress);

        $('#no-student-progress').show()
    }

    async downloadReport () {
        try {
            const response = await fetch(`/progress/download-report`);

            if (response.progressFile) {
                const progressLink = $('#progress-report-link')[0];

                progressLink.href = `/assets/downloads/tmp/${response.progressFile}`;

                progressLink.click();
            }
        } catch (error) {  }
    }
})