import { Status } from "../enum/status.enum";


//Creating the interface for the server so it can be mapped in the front end

export interface Server {
    id: number;
    ipAddress: string;
    name: string;
    memory: string;
    type: string;
    imageUrl: string;
    status: Status;
}