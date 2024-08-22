import axios from "axios";

export class HomeActions {

    async getStudents() {
        const response = await axios.get(`api/home/get-students`);
        const data = response.data.data;
        return data;
    }

    async getOutStudents() {
        const response = await axios.get(`api/home/get-out-students`);
        const data = response.data.data;
        return data;
    }

    async getEntriesByDate(date) {
        const response = await axios.post(`api/home/get-entries-by-date`, { date }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = response.data.data;
        return data;
    }
}

const homeActions = new HomeActions();
export default homeActions;
