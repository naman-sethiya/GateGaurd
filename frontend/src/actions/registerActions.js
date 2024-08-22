import axios from "axios";


export class RegisterActions {
    async createOutEntry(rollNo){
        const response=await axios.post(`api/register/create-out-entry`,{rollNo},{
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response.data;
    }

    async createInEntry(rollNo){
        const response=await axios.patch(`api/register/create-in-entry`,{rollNo},{
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response.data;
    }
}

const registerActions=new RegisterActions();
export default registerActions;